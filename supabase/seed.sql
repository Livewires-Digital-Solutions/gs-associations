-- =============================================================================
-- GS ASSOCIATIONS — SEED DATA
-- Run AFTER schema.sql in: Supabase Dashboard → SQL Editor → New Query → Run
-- Delete or modify these records freely via the Admin panel.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- PROPERTIES (10 sample listings)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.properties
  (title, type, status, price, price_label, location, city, area, bedrooms, bathrooms,
   parking, floor, total_floors, age, furnishing, description, features, images,
   lat, lng, featured, views, saves, agent_name, agent_phone, rera)
VALUES
(
  'Prestige Lakefront Residences — 3BHK',
  'Apartment', 'Available', 9500000, '₹95 Lakhs',
  'Gachibowli, Hyderabad', 'Hyderabad', 1850, 3, 3,
  2, 7, 20, 'New', 'Semi-Furnished',
  'Expansive 3BHK apartment with panoramic views of Durgam Cheruvu lake. Premium finishes, modular kitchen, and world-class amenities.',
  ARRAY['Swimming Pool','Gym','Clubhouse','24x7 Security','Power Backup','Jogging Track','Children Play Area','EV Charging'],
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800','https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800'],
  17.4430, 78.3489, true, 420, 38, 'Rahul Sharma', '+91 98765 43210', 'P01300012345'
),
(
  'Aparna HillPark — 4BHK Penthouse',
  'Penthouse', 'Available', 28000000, '₹2.8 Crores',
  'Manikonda, Hyderabad', 'Hyderabad', 4200, 4, 5,
  3, 18, 18, 'New', 'Furnished',
  'Ultra-luxury 4BHK penthouse with private terrace, sky lounge access, and breathtaking views of the Financial District skyline.',
  ARRAY['Private Terrace','Sky Lounge','Concierge','Swimming Pool','Gym','Home Theater Ready','Smart Home','Spa'],
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
  17.4036, 78.3891, true, 210, 22, 'Priya Nair', '+91 98765 11111', 'P01300054321'
),
(
  'My Home Vihanga — 2BHK Premium',
  'Apartment', 'Available', 5800000, '₹58 Lakhs',
  'Kondapur, Hyderabad', 'Hyderabad', 1280, 2, 2,
  1, 9, 14, 'New', 'Semi-Furnished',
  'Well-connected 2BHK in the heart of Kondapur tech corridor. Walking distance to Mindspace IT Park, shopping malls, and top schools.',
  ARRAY['Clubhouse','Gym','Swimming Pool','24x7 Security','Power Backup','Visitor Parking'],
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800','https://images.unsplash.com/photo-1560448075-bb485b1f9c10?w=800'],
  17.4605, 78.3570, false, 183, 15, 'Arjun Reddy', '+91 98765 22222', NULL
),
(
  'Jubilee Greens Villa — 4BHK Independent',
  'Villa', 'Available', 45000000, '₹4.5 Crores',
  'Jubilee Hills, Hyderabad', 'Hyderabad', 5800, 4, 5,
  0, 2, 2, '2 Years', 'Semi-Furnished',
  'Magnificent independent villa in Jubilee Hills with private garden, home theatre, modular kitchen, and premium Italian marble flooring.',
  ARRAY['Private Garden','Home Theatre','Swimming Pool','Servant Quarters','Premium Kitchen','Landscaped Garden','Smart Security'],
  ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
  17.4239, 78.4098, true, 389, 47, 'Deepa Menon', '+91 98765 33333', 'P01300099999'
),
(
  'Kokapet Commercial Plaza — 2000 sqft Office',
  'Commercial', 'Available', 18000000, '₹1.8 Crores',
  'Kokapet, Hyderabad', 'Hyderabad', 2000, 0, 3,
  2, 5, 8, 'New', 'Unfurnished',
  'Premium Grade-A commercial space in the new CBD of Hyderabad. Ideal for IT/ITES, fintech, or corporate offices. LEED Gold certified building.',
  ARRAY['24x7 Security','Power Backup','High-Speed Elevators','Food Court','Ample Parking','CCTV','Fiber Internet Ready'],
  ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800','https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'],
  17.3850, 78.3550, false, 98, 8, 'Suresh Kumar', '+91 98765 44444', 'P01300077777'
),
(
  'Narsingi Plots — 200 sqyd Premium Layout',
  'Plot', 'Available', 3200000, '₹32 Lakhs',
  'Narsingi, Hyderabad', 'Hyderabad', 1800, 0, 0,
  0, 0, 0, 'New', 'Unfurnished',
  'HMDA approved premium residential plot in a gated layout. North-facing, corner plot with 30ft road access. 100% clear title with registration ready.',
  ARRAY['HMDA Approved','Clear Title','Gated Layout','30ft Road','Water Connection','Electricity','24x7 Security'],
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
  17.3748, 78.3618, false, 67, 5, 'Kiran Varma', '+91 98765 55555', 'P01300066666'
),
(
  'Banjara Hills Row House — 3BHK+Study',
  'Row House', 'Available', 22000000, '₹2.2 Crores',
  'Banjara Hills, Hyderabad', 'Hyderabad', 3200, 3, 4,
  2, 0, 3, '5 Years', 'Semi-Furnished',
  'Elegant row house in the most prestigious address of Hyderabad. Features a private sit-out, terrace garden, and premium wood flooring throughout.',
  ARRAY['Private Sit-Out','Terrace Garden','Servant Quarters','Premium Flooring','Solar Panels','Rain Water Harvesting'],
  ARRAY['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800','https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800'],
  17.4156, 78.4347, true, 245, 28, 'Meera Iyer', '+91 98765 66666', NULL
),
(
  'Nallagandla Smart Studio — 1RK',
  'Apartment', 'Available', 2200000, '₹22 Lakhs',
  'Nallagandla, Hyderabad', 'Hyderabad', 520, 1, 1,
  0, 3, 10, 'New', 'Furnished',
  'Smart studio apartment fully furnished and ready to move in. Perfect for working professionals. Steps away from HITECH City and ORR access.',
  ARRAY['Fully Furnished','Smart Security','High-Speed Internet','Power Backup','Gym'],
  ARRAY['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800'],
  17.4545, 78.3226, false, 125, 11, 'Rohit Pillai', '+91 98765 77777', NULL
),
(
  'Financial District 3BHK — Under Offer',
  'Apartment', 'Under Offer', 12500000, '₹1.25 Crores',
  'Financial District, Hyderabad', 'Hyderabad', 2100, 3, 3,
  2, 11, 25, 'New', 'Semi-Furnished',
  'Premium 3BHK in Hyderabad''s elite Financial District. Negotiation underway. Similar units available — contact agent for details.',
  ARRAY['Rooftop Pool','Gym','Business Lounge','Concierge','24x7 Security','EV Parking'],
  ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
  17.4206, 78.3423, false, 312, 33, 'Anita Saxena', '+91 98765 88888', 'P01300033333'
),
(
  'Tellapur Mega Villa — 5BHK Luxury',
  'Villa', 'Available', 65000000, '₹6.5 Crores',
  'Tellapur, Hyderabad', 'Hyderabad', 7500, 5, 6,
  4, 0, 4, 'New', 'Furnished',
  'Opulent 5BHK luxury villa with private pool, home theatre, gym, and 2 acres of landscaped grounds. The pinnacle of luxury living in Hyderabad.',
  ARRAY['Private Pool','Home Theatre','Gym','Jacuzzi','Servant Quarters','Wine Cellar','Helipad Ready','Smart Home'],
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800','https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
  17.4688, 78.2891, true, 567, 89, 'Vikram Shetty', '+91 98765 99999', 'P01300011111'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- BLOG POSTS (5 sample articles)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.blog_posts
  (slug, title, excerpt, content, category, author, read_time, cover_image, tags, featured, views)
VALUES
(
  'hyderabad-real-estate-2024-trends',
  'Hyderabad Real Estate 2024: What Buyers Need to Know',
  'A comprehensive guide to property trends, price movements, and investment hotspots in Hyderabad this year.',
  '## The Hyderabad Property Market in 2024\n\nHyderabad continues to be one of India''s most dynamic real estate markets. Driven by IT expansion, infrastructure upgrades, and quality of life, the city attracts buyers from across the country.\n\n### Key Trends\n\n1. **Western Corridor Boom**: Areas like Gachibowli, Nanakramguda, and Kokapet continue to see strong demand due to proximity to the Financial District and HITECH City.\n\n2. **Price Appreciation**: Property prices in premium micro-markets rose 12–18% YoY, outpacing most other Tier-1 cities.\n\n3. **Luxury Segment Surge**: The ₹1.5 Crore+ segment saw unprecedented demand as HNIs and NRIs sought trophy assets.\n\n4. **Infrastructure Catalyst**: The upcoming Metro Phase II and Outer Ring Road extensions are creating new investment corridors in Shamshabad and Patancheru.\n\n### Where to Invest in 2024\n\n- **Kokapet**: Emerging CBD with Grade-A commercial and luxury residential.\n- **Narsingi**: Affordable yet appreciating; strong rental demand.\n- **Tellapur**: Villa segment with excellent ROI potential.\n\nContact our advisors for a personalised investment analysis.',
  'Market Trends', 'GS Team', 7,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
  ARRAY['Market Trends', 'Investment', 'Hyderabad', '2024'],
  true, 1240
),
(
  'home-loan-guide-first-time-buyers',
  'The Complete Home Loan Guide for First-Time Buyers in India',
  'Everything you need to know about getting your first home loan — eligibility, documentation, best banks, and smart tips.',
  '## Your Complete Home Loan Roadmap\n\nBuying your first home is one of life''s biggest milestones. Navigating the loan process can feel overwhelming, but with the right knowledge, it''s straightforward.\n\n### Step 1: Check Your Eligibility\n\nLenders assess: salary, credit score (aim for 750+), existing EMIs, and employment stability. Rule of thumb: your home loan EMI should not exceed 40% of take-home salary.\n\n### Step 2: Choose the Right Loan Type\n\n- **Fixed Rate**: Predictable EMIs, good for risk-averse buyers.\n- **Floating Rate**: Lower initial rate, can benefit from RBI rate cuts.\n- **Hybrid**: Fixed for initial years, then floating.\n\n### Step 3: Compare Lenders\n\nDon''t just look at interest rates. Compare: processing fees, prepayment penalties, customer service, and turnaround time.\n\n### Key Documents\n\n- PAN + Aadhaar\n- Last 3 months salary slips\n- 6 months bank statements\n- Form 16 / IT Returns (2 years)\n- Property documents\n\n### Pro Tips\n\n1. Get pre-approved before house hunting.\n2. Pay EMIs via NACH for credit score benefits.\n3. Make a 20–30% down payment to reduce interest burden.',
  'Home Loans', 'GS Finance Team', 9,
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
  ARRAY['Home Loan', 'First-Time Buyers', 'Finance', 'Mortgage'],
  true, 890
),
(
  'vastu-tips-new-home',
  '15 Vastu Shastra Tips for Your New Home',
  'Ancient wisdom meets modern living. Simple Vastu guidelines to ensure positive energy, prosperity, and well-being in your home.',
  '## Vastu Shastra for Modern Homes\n\nVastu Shastra, the ancient Indian science of space, offers timeless principles that can bring harmony and prosperity to your living space.\n\n### Main Entrance\n- North or East facing entrance attracts positive energy.\n- Keep the entrance well-lit and clutter-free.\n- Use wooden doors for the main entrance.\n\n### Bedroom\n- Master bedroom in the South-West corner.\n- Head while sleeping should point South or East.\n- Avoid mirrors facing the bed.\n\n### Kitchen\n- South-East corner (Agni corner) is ideal.\n- Stove should face East.\n- Keep the kitchen clean and clutter-free.\n\n### Living Room\n- North, East, or North-East direction.\n- Keep heavy furniture in the South or West.\n- Natural light and ventilation are key.\n\n### Bathroom\n- North-West or South-East direction.\n- Keep bathroom door closed.\n- Fix any leaking taps immediately.\n\nRemember: Vastu is about creating a space that feels balanced and positive. Modern homes can incorporate these principles flexibly.',
  'Buyer Tips', 'GS Team', 6,
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
  ARRAY['Vastu', 'Home Design', 'Buyer Tips', 'Well-being'],
  false, 456
),
(
  'rera-hyderabad-complete-guide',
  'RERA Hyderabad: How to Verify a Project and Protect Your Investment',
  'A step-by-step guide to using TSRERA to verify properties, check builder compliance, and safeguard your investment.',
  '## Understanding TSRERA\n\nThe Telangana State Real Estate Regulatory Authority (TSRERA) was established under the RERA Act 2016 to bring transparency and accountability to the real estate sector.\n\n### Why RERA Matters\n\nBefore RERA, buyers had little recourse against delayed projects or builder fraud. RERA changed this by:\n- Mandating project registration before sales\n- Requiring builders to maintain separate escrow accounts\n- Setting strict delivery timelines with penalty clauses\n- Empowering buyers to file complaints\n\n### How to Verify a Project\n\n1. Visit: rera.telangana.gov.in\n2. Search by Project Name or RERA Number\n3. Check: Completion date, approved plan, land title\n4. Verify promoter details and past complaints\n\n### Red Flags to Watch\n- No RERA registration\n- Registration expired or suspended\n- Multiple complaints from previous buyers\n- Significant delay from promised completion date\n\n### Buyer Rights under RERA\n- Right to information about the project\n- Right to documents at the time of booking\n- Right to compensation for delays\n- Right to refund with interest if builder defaults',
  'Legal & Compliance', 'Legal Team', 8,
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
  ARRAY['RERA', 'Legal', 'Compliance', 'Buyer Protection'],
  false, 678
),
(
  'investment-hyderabad-it-corridor',
  'Why the Hyderabad IT Corridor is India''s Best Real Estate Bet Right Now',
  'Data-driven analysis of why the Western Hyderabad IT Corridor offers the best risk-adjusted returns for real estate investors in 2024.',
  '## The Case for Hyderabad IT Corridor\n\nAmong all of India''s metro real estate markets, the Hyderabad IT Corridor — stretching from Madhapur through Gachibowli to Kokapet — stands out as the most compelling investment destination.\n\n### The Numbers Don''t Lie\n\n- **Office Absorption**: 18.5 million sqft in 2023 (highest ever)\n- **Price CAGR**: 14.2% over 5 years (2019–2024)\n- **Rental Yield**: 3.2–4.8% (vs. 2–3% in Mumbai/Delhi)\n- **Vacancy Rate**: Under 7% in premium residential segments\n\n### The Demand Drivers\n\n**IT Giants Setting Up**\nGoogle, Microsoft, Amazon, Apple, and 200+ global firms have significant Hyderabad footprint — and growing.\n\n**Infrastructure Investment**\nHyderabad''s airport connectivity, metro expansion, and the proposed Regional Ring Road create new growth vectors.\n\n**Quality of Life**\nRelative affordability vs. Bangalore/Mumbai, excellent infrastructure, and cosmopolitan lifestyle attract talent — and their housing demand.\n\n### Where to Invest\n\n| Micro-Market | Entry Price | Growth Potential |\n|---|---|---|\n| Kokapet | ₹8,000–12,000/sqft | High |\n| Narsingi | ₹5,500–8,000/sqft | Very High |\n| Tellapur | ₹6,000–9,000/sqft | High |\n| Gachibowli | ₹9,000–14,000/sqft | Moderate-High |\n\nContact our investment desk for a personalized portfolio strategy.',
  'Investment Guide', 'Investment Team', 10,
  'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200',
  ARRAY['Investment', 'IT Corridor', 'ROI', 'Hyderabad', 'Data Analysis'],
  true, 2100
);

-- ─────────────────────────────────────────────────────────────────────────────
-- LOAN PROGRAMS (6 sample programs)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.loan_programs
  (name, type, interest_rate, max_amount, tenure, processing_fee, eligibility,
   features, bank_name, logo, popular)
VALUES
(
  'Home Advantage Loan',
  'Home Loan', '8.40% p.a.', 15000000, '30 years', '0.50%',
  'Salaried individuals with minimum ₹50,000/month income. Min. 2 years employment.',
  ARRAY['Balance Transfer Available','No Prepayment Penalty','Top-Up Loan Facility','Digital Processing','Doorstep Service'],
  'State Bank of India', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/SBI_logo.svg/120px-SBI_logo.svg.png',
  true
),
(
  'MaxGain Home Loan',
  'Home Loan', '8.70% p.a.', 20000000, '30 years', '0.25%',
  'Salaried and self-employed with minimum net annual income of ₹6 Lakhs.',
  ARRAY['Overdraft Facility','Saves Interest','Flexible EMI','NRI Eligible','PMAY Subsidy'],
  'HDFC Bank', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/150px-HDFC_Bank_Logo.svg.png',
  true
),
(
  'Smart Home Loan',
  'Home Loan', '8.55% p.a.', 10000000, '25 years', '0.35%',
  'Salaried professionals aged 23–65 with stable income.',
  ARRAY['Instant Sanction in 10 Days','Step-Up EMI Option','Insurance Bundled','Free Legal Advice','Online Account Management'],
  'ICICI Bank', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/150px-ICICI_Bank_Logo.svg.png',
  false
),
(
  'Namma Gruha Loan',
  'Home Loan', '8.35% p.a.', 5000000, '30 years', '0.50%',
  'All Indian citizens including NRIs. Income from salary, business, or agriculture accepted.',
  ARRAY['Lowest Rate in Hyderabad','PMAY Eligible','No Hidden Charges','Regional Language Support','Quick Approval'],
  'Andhra Pradesh Grameena Vikas Bank', 'https://api.dicebear.com/7.x/initials/svg?seed=APGVB',
  false
),
(
  'Lap Business Loan',
  'Loan Against Property', '10.50% p.a.', 50000000, '15 years', '1.00%',
  'Business owners / self-employed with owned commercial or residential property.',
  ARRAY['Up to 70% Property Value','Business and Personal Use','Flexible Repayment','Minimal Documentation','Retain Property Ownership'],
  'Axis Bank', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/150px-Axis_Bank_logo.svg.png',
  false
),
(
  'NRI Home Purchase Loan',
  'NRI Home Loan', '9.20% p.a.', 30000000, '25 years', '0.50%',
  'NRIs / PIOs with foreign salary equivalent to ₹1L+/month. Valid work permit / employment visa required.',
  ARRAY['Foreign Currency Accepted','Power of Attorney Service','NRE/NRO Account Compatible','Tax Benefit Guidance','Dedicated NRI Desk'],
  'Kotak Mahindra Bank', 'https://api.dicebear.com/7.x/initials/svg?seed=Kotak',
  true
);

-- ─────────────────────────────────────────────────────────────────────────────
-- RPC FUNCTION: increment_property_view
-- Used by lib/db/properties.ts → incrementPropertyView
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.increment_property_view(property_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.properties
  SET views = views + 1
  WHERE id = property_id;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- ADMIN SETUP (run separately after signing up your admin account)
-- Replace 'your-email@example.com' with your actual admin email
-- ─────────────────────────────────────────────────────────────────────────────
-- SELECT make_admin('your-email@example.com');
--
-- OR directly:
-- UPDATE public.profiles SET role = 'admin' WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'your-email@example.com'
-- );
