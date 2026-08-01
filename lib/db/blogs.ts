import { createClient } from '@/lib/supabase/client';
import type { BlogPost } from '@/data/mockData';

function sanitizeChennaiText(text: string): string {
  if (!text) return text;
  const map: Record<string, string> = {
    'Jubilee Hills': 'Poes Garden',
    'Banjara Hills': 'Boat Club',
    'Gachibowli': 'Sholinganallur',
    'Kondapur': 'Thoraipakkam',
    'HITEC City': 'Taramani',
    'Miyapur': 'Tambaram',
    'Narsingi': 'Pallavaram',
    'Kokapet': 'Siruseri',
    'Nallagandla': 'Velachery',
    'Tellapur': 'ECR',
    'Manikonda': 'Anna Nagar',
    'Financial District': 'OMR IT Corridor',
    'Hyderabad': 'Chennai',
  };
  let result = text;
  for (const [k, v] of Object.entries(map)) {
    result = result.replace(new RegExp(k, 'gi'), v);
  }
  return result;
}

function rowToBlog(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: sanitizeChennaiText(row.title),
    excerpt: sanitizeChennaiText(row.excerpt),
    content: sanitizeChennaiText(row.content),
    category: row.category,
    author: row.author,
    authorAvatar: row.author_avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.author}`,
    publishedDate: row.published_at?.split('T')[0] ?? '',
    readTime: row.read_time,
    coverImage: row.cover_image ?? '',
    tags: row.tags ?? [],
    featured: row.featured,
    views: row.views,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToBlog);
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(rowToBlog);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return rowToBlog(data);
}

export async function createBlogPost(blog: Omit<BlogPost, 'id' | 'publishedDate' | 'views'>): Promise<BlogPost> {
  const supabase = createClient();
  const slug = blog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      author_avatar: blog.authorAvatar,
      read_time: blog.readTime,
      cover_image: blog.coverImage,
      tags: blog.tags,
      featured: blog.featured,
    })
    .select()
    .single();
  if (error) throw error;
  return rowToBlog(data);
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
  const supabase = createClient();
  const row: any = {};
  if (updates.title !== undefined)      row.title        = updates.title;
  if (updates.excerpt !== undefined)    row.excerpt      = updates.excerpt;
  if (updates.content !== undefined)    row.content      = updates.content;
  if (updates.category !== undefined)   row.category     = updates.category;
  if (updates.author !== undefined)     row.author       = updates.author;
  if (updates.coverImage !== undefined) row.cover_image  = updates.coverImage;
  if (updates.readTime !== undefined)   row.read_time    = updates.readTime;
  if (updates.tags !== undefined)       row.tags         = updates.tags;
  if (updates.featured !== undefined)   row.featured     = updates.featured;
  if (updates.views !== undefined)      row.views        = updates.views;
  const { error } = await supabase.from('blog_posts').update(row).eq('id', id);
  if (error) throw error;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

export async function incrementBlogView(id: string): Promise<void> {
  const supabase = createClient();
  const { data } = await supabase.from('blog_posts').select('views').eq('id', id).single();
  if (data) {
    await supabase.from('blog_posts').update({ views: (data.views ?? 0) + 1 }).eq('id', id);
  }
}
