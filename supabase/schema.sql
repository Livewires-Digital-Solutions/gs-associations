-- =============================================================================
-- GS ASSOCIATIONS — SUPABASE DATABASE SCHEMA
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";


-- =============================================================================
-- TABLE: profiles
-- Extends Supabase Auth users with app-specific fields
-- =============================================================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text not null default '',
  phone         text not null default '',
  role          text not null default 'user' check (role in ('user', 'admin')),
  avatar        text,
  budget        text,
  location      text,
  looking_for   text,
  is_verified   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();


-- =============================================================================
-- TABLE: properties
-- =============================================================================
create table if not exists public.properties (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  type            text not null check (type in ('Apartment', 'Villa', 'Plot', 'Commercial', 'Row House', 'Penthouse')),
  status          text not null default 'Available' check (status in ('Available', 'Sold', 'Under Offer')),
  price           bigint not null,
  price_label     text not null,
  location        text not null,
  city            text not null default 'Hyderabad',
  area            integer not null,
  bedrooms        integer not null default 0,
  bathrooms       integer not null default 0,
  parking         integer not null default 0,
  floor           integer not null default 0,
  total_floors    integer not null default 0,
  age             text not null default 'New',
  furnishing      text not null default 'Unfurnished' check (furnishing in ('Furnished', 'Semi-Furnished', 'Unfurnished')),
  description     text not null default '',
  features        text[] not null default '{}',
  images          text[] not null default '{}',
  lat             double precision,
  lng             double precision,
  featured        boolean not null default false,
  views           integer not null default 0,
  saves           integer not null default 0,
  agent_name      text not null default '',
  agent_phone     text not null default '',
  rera            text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger properties_updated_at
  before update on public.properties
  for each row execute procedure public.set_updated_at();

create index if not exists properties_type_idx     on public.properties(type);
create index if not exists properties_status_idx   on public.properties(status);
create index if not exists properties_city_idx     on public.properties(city);
create index if not exists properties_featured_idx on public.properties(featured);
create index if not exists properties_price_idx    on public.properties(price);


-- =============================================================================
-- TABLE: saved_properties
-- Many-to-many: users to properties
-- =============================================================================
create table if not exists public.saved_properties (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  property_id  uuid not null references public.properties(id) on delete cascade,
  saved_at     timestamptz not null default now(),
  unique(user_id, property_id)
);

create index if not exists saved_properties_user_idx on public.saved_properties(user_id);


-- =============================================================================
-- TABLE: viewed_properties
-- Tracks which properties a user has viewed
-- =============================================================================
create table if not exists public.viewed_properties (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  property_id  uuid not null references public.properties(id) on delete cascade,
  viewed_at    timestamptz not null default now()
);

create index if not exists viewed_properties_user_idx on public.viewed_properties(user_id);
create index if not exists viewed_properties_prop_idx on public.viewed_properties(property_id);


-- =============================================================================
-- TABLE: leads
-- Enquiries and contacts from users
-- =============================================================================
create table if not exists public.leads (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid references public.profiles(id) on delete set null,
  user_name          text not null,
  user_email         text not null,
  user_phone         text not null default '',
  property_id        uuid references public.properties(id) on delete set null,
  property_title     text not null,
  property_location  text not null,
  status             text not null default 'New' check (status in ('New', 'Contacted', 'Qualified', 'Closed')),
  notes              text not null default '',
  source             text not null default 'Property View' check (source in ('Property View', 'Contact Form', 'Loan Inquiry', 'Schedule Visit')),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure public.set_updated_at();

create index if not exists leads_status_idx   on public.leads(status);
create index if not exists leads_user_idx     on public.leads(user_id);
create index if not exists leads_created_idx  on public.leads(created_at desc);


-- =============================================================================
-- TABLE: blog_posts
-- =============================================================================
create table if not exists public.blog_posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  title           text not null,
  excerpt         text not null default '',
  content         text not null default '',
  category        text not null default 'General',
  author          text not null default 'GS Associations',
  author_avatar   text,
  read_time       integer not null default 5,
  cover_image     text,
  tags            text[] not null default '{}',
  featured        boolean not null default false,
  views           integer not null default 0,
  published_at    timestamptz not null default now(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute procedure public.set_updated_at();

create index if not exists blog_posts_slug_idx     on public.blog_posts(slug);
create index if not exists blog_posts_featured_idx on public.blog_posts(featured);
create index if not exists blog_posts_pub_idx      on public.blog_posts(published_at desc);


-- =============================================================================
-- TABLE: loan_programs
-- =============================================================================
create table if not exists public.loan_programs (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  type            text not null default 'Residential',
  interest_rate   text not null,
  max_amount      text not null,
  tenure          text not null,
  processing_fee  text not null default '',
  eligibility     text not null default '',
  features        text[] not null default '{}',
  bank_name       text not null default '',
  logo            text,
  popular         boolean not null default false,
  overview        text,
  benefits        text[],
  documents       text[],
  process         jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger loan_programs_updated_at
  before update on public.loan_programs
  for each row execute procedure public.set_updated_at();

create index if not exists loan_programs_type_idx    on public.loan_programs(type);
create index if not exists loan_programs_popular_idx on public.loan_programs(popular);


-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile"            on public.profiles for update using (auth.uid() = id);

-- properties
alter table public.properties enable row level security;
create policy "Anyone can view properties"   on public.properties for select using (true);
create policy "Admins can insert properties" on public.properties for insert
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update properties" on public.properties for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete properties" on public.properties for delete
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- saved_properties
alter table public.saved_properties enable row level security;
create policy "Users can manage own saved properties" on public.saved_properties for all using (auth.uid() = user_id);

-- viewed_properties
alter table public.viewed_properties enable row level security;
create policy "Users can manage own viewed properties" on public.viewed_properties for all using (auth.uid() = user_id);

-- leads
alter table public.leads enable row level security;
create policy "Anyone can submit a lead"  on public.leads for insert with check (true);
create policy "Admins can view all leads" on public.leads for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update leads"   on public.leads for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- blog_posts
alter table public.blog_posts enable row level security;
create policy "Anyone can view blog posts"   on public.blog_posts for select using (true);
create policy "Admins can insert blog posts" on public.blog_posts for insert
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update blog posts" on public.blog_posts for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete blog posts" on public.blog_posts for delete
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- loan_programs
alter table public.loan_programs enable row level security;
create policy "Anyone can view loan programs"   on public.loan_programs for select using (true);
create policy "Admins can insert loan programs" on public.loan_programs for insert
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update loan programs" on public.loan_programs for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete loan programs" on public.loan_programs for delete
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- =============================================================================
-- HELPER: Promote a user to admin
-- Usage: select make_admin('your-email@example.com');
-- =============================================================================
create or replace function public.make_admin(user_email text)
returns void
language plpgsql security definer as $$
begin
  update public.profiles
  set role = 'admin'
  where id = (select id from auth.users where email = user_email);
end;
$$;


-- =============================================================================
-- DONE
-- Tables: profiles, properties, saved_properties,
--         viewed_properties, leads, blog_posts, loan_programs
-- =============================================================================
