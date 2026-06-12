// ─────────────────────────────────────────────────────────────────────────────
// GS ASSOCIATIONS — COMPLETE MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

export type PropertyType = 'Apartment' | 'Villa' | 'Plot' | 'Commercial' | 'Row House' | 'Penthouse';
export type PropertyStatus = 'Available' | 'Sold' | 'Under Offer';
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed';
export type UserRole = 'user' | 'admin';

// ─── PROPERTY ───────────────────────────────────────────────────────────────
export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  priceLabel: string;
  location: string;
  city: string;
  area: number; // sq ft
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floor: number;
  totalFloors: number;
  age: string;
  furnishing: FurnishingStatus;
  description: string;
  features: string[];
  images: string[];
  lat: number;
  lng: number;
  featured: boolean;
  postedDate: string;
  views: number;
  saves: number;
  agentName: string;
  agentPhone: string;
  rera?: string;
}

// ─── USER ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  joinedDate: string;
  savedProperties: string[];
  viewedProperties: string[];
  budget?: string;
  location?: string;
  lookingFor?: string;
  isVerified: boolean;
}

// ─── LEAD ────────────────────────────────────────────────────────────────────
export interface Lead {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  timestamp: string;
  status: LeadStatus;
  notes: string;
  source: 'Property View' | 'Contact Form' | 'Loan Inquiry' | 'Schedule Visit';
}

// ─── BLOG ────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar: string;
  publishedDate: string;
  readTime: number;
  coverImage: string;
  tags: string[];
  featured: boolean;
  views: number;
}

// ─── LOAN PROGRAM ────────────────────────────────────────────────────────────
export interface LoanProgram {
  id: string;
  name: string;
  type: string;
  interestRate: string;
  maxAmount: string;
  tenure: string;
  processingFee: string;
  eligibility: string;
  features: string[];
  bankName: string;
  logo: string;
  popular: boolean;
  overview?: string;
  benefits?: string[];
  documents?: string[];
  process?: { title: string; desc: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTIES DATA (20 properties)
// ─────────────────────────────────────────────────────────────────────────────

const propertyImages = {
  apt1: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  ],
  apt2: [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  ],
  villa1: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
  ],
  villa2: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  ],
  plot: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80',
  ],
  comm: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=800&q=80',
  ],
  pent: [
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800&q=80',
  ],
  row: [
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
  ],
};

export const properties: Property[] = [
  {
    id: 'prop-001',
    title: 'Skyline Residences — 3BHK Premium Apartment',
    type: 'Apartment',
    status: 'Available',
    price: 9500000,
    priceLabel: '₹95 Lakhs',
    location: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    area: 1820,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    floor: 12,
    totalFloors: 28,
    age: 'New',
    furnishing: 'Semi-Furnished',
    description: 'Experience luxury living at Skyline Residences, a premium gated community in the heart of Gachibowli — Hyderabad\'s thriving IT corridor. The 3BHK apartment offers expansive city views, high-end finishes, and world-class amenities including a rooftop pool, gym, and co-working spaces. Just minutes from major tech parks and the financial district.',
    features: ['Swimming Pool', 'Gymnasium', 'Rooftop Garden', 'Co-Working Space', 'EV Charging', '24/7 Security', 'Power Backup', 'Clubhouse', 'Children\'s Play Area', 'Landscaped Gardens'],
    images: propertyImages.apt1,
    lat: 17.4401,
    lng: 78.3489,
    featured: true,
    postedDate: '2024-01-10',
    views: 847,
    saves: 124,
    agentName: 'Ravi Shankar',
    agentPhone: '+91 98765 43210',
    rera: 'P02400001234',
  },
  {
    id: 'prop-002',
    title: 'Emerald Heights — 4BHK Luxury Villa',
    type: 'Villa',
    status: 'Available',
    price: 32000000,
    priceLabel: '₹3.2 Crore',
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    area: 4200,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    floor: 1,
    totalFloors: 2,
    age: '2 Years',
    furnishing: 'Furnished',
    description: 'A stunning standalone villa in Jubilee Hills — Hyderabad\'s most prestigious residential address. The 4BHK villa features a private pool, home theatre, Italian marble flooring, modular kitchen, and a beautifully landscaped garden. This is an architectural masterpiece designed for the discerning homeowner.',
    features: ['Private Pool', 'Home Theatre', 'Smart Home System', 'Italian Marble Flooring', 'Modular Kitchen', 'Landscaped Garden', 'Staff Quarters', 'Solar Panels', 'Rainwater Harvesting', 'CCTV Surveillance'],
    images: propertyImages.villa1,
    lat: 17.4302,
    lng: 78.4019,
    featured: true,
    postedDate: '2024-01-08',
    views: 1243,
    saves: 289,
    agentName: 'Priya Nair',
    agentPhone: '+91 98765 43211',
    rera: 'P02400001235',
  },
  {
    id: 'prop-003',
    title: 'Prestige Gateway — 2BHK Modern Apartment',
    type: 'Apartment',
    status: 'Available',
    price: 5800000,
    priceLabel: '₹58 Lakhs',
    location: 'Kondapur, Hyderabad',
    city: 'Hyderabad',
    area: 1150,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    floor: 6,
    totalFloors: 15,
    age: 'New',
    furnishing: 'Unfurnished',
    description: 'Prestige Gateway offers smartly designed 2BHK apartments in Kondapur — one of Hyderabad\'s most sought-after localities. Ideal for first-time homebuyers and young professionals. The complex offers excellent connectivity to Hitech City and Gachibowli.',
    features: ['Gymnasium', 'Swimming Pool', 'Children\'s Play Area', 'Club House', 'Power Backup', '24/7 Security', 'Visitor Parking', 'Landscaped Garden'],
    images: propertyImages.apt2,
    lat: 17.4609,
    lng: 78.3609,
    featured: true,
    postedDate: '2024-01-15',
    views: 623,
    saves: 87,
    agentName: 'Ravi Shankar',
    agentPhone: '+91 98765 43210',
    rera: 'P02400001236',
  },
  {
    id: 'prop-004',
    title: 'GreenFields Plot — 250 Sq Yd Premium Plot',
    type: 'Plot',
    status: 'Available',
    price: 7500000,
    priceLabel: '₹75 Lakhs',
    location: 'Kompally, Hyderabad',
    city: 'Hyderabad',
    area: 2250,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    floor: 0,
    totalFloors: 0,
    age: 'NA',
    furnishing: 'Unfurnished',
    description: 'A premium residential plot in Kompally\'s fast-developing layout. Clear titles, DTCP approved, surrounded by high-end residential development. Excellent investment opportunity with roads, drainage, and water supply in place.',
    features: ['DTCP Approved', 'Clear Title', 'Road Access', 'Water Supply', 'Drainage', 'Compound Wall', 'Vasthu Compliant', 'Street Lights'],
    images: propertyImages.plot,
    lat: 17.5413,
    lng: 78.4851,
    featured: false,
    postedDate: '2024-01-20',
    views: 341,
    saves: 45,
    agentName: 'Suresh Reddy',
    agentPhone: '+91 98765 43212',
    rera: 'P02400001237',
  },
  {
    id: 'prop-005',
    title: 'The Pinnacle — Penthouse with Panoramic Views',
    type: 'Penthouse',
    status: 'Available',
    price: 58000000,
    priceLabel: '₹5.8 Crore',
    location: 'Financial District, Hyderabad',
    city: 'Hyderabad',
    area: 6800,
    bedrooms: 5,
    bathrooms: 5,
    parking: 4,
    floor: 42,
    totalFloors: 42,
    age: 'New',
    furnishing: 'Furnished',
    description: 'The crown jewel of Hyderabad\'s skyline. This duplex penthouse on the 42nd floor offers 360-degree views of the city, a private terrace with a plunge pool, a butler\'s pantry, home automation, and bespoke interiors by a renowned design firm. A rare trophy asset.',
    features: ['Private Terrace Pool', 'Butler\'s Pantry', 'Home Automation', 'Private Lift Lobby', '360° Views', 'Wine Cellar', 'Bespoke Interiors', 'Smart Glass Windows', 'Concierge Service', 'Helipad Access'],
    images: propertyImages.pent,
    lat: 17.4129,
    lng: 78.3639,
    featured: true,
    postedDate: '2024-01-05',
    views: 2187,
    saves: 445,
    agentName: 'Priya Nair',
    agentPhone: '+91 98765 43211',
    rera: 'P02400001238',
  },
  {
    id: 'prop-006',
    title: 'Business Hub — Premium Office Space',
    type: 'Commercial',
    status: 'Available',
    price: 18500000,
    priceLabel: '₹1.85 Crore',
    location: 'HITEC City, Hyderabad',
    city: 'Hyderabad',
    area: 3200,
    bedrooms: 0,
    bathrooms: 6,
    parking: 10,
    floor: 8,
    totalFloors: 20,
    age: '3 Years',
    furnishing: 'Furnished',
    description: 'A Grade-A commercial office space in HITEC City — Hyderabad\'s premier tech hub. Features modular workstations, fiber-optic connectivity, centralized HVAC, and a fully equipped boardroom. Ideal for IT companies, startups, and MNCs. Close to Mindspace and Raheja Mindspace tech parks.',
    features: ['Grade-A Building', 'Modular Workstations', 'Fiber Optic Internet', 'Central HVAC', 'Boardroom', 'Cafeteria', 'Ample Parking', 'DG Power Backup', 'Access Control', 'CCTV Surveillance'],
    images: propertyImages.comm,
    lat: 17.4477,
    lng: 78.3769,
    featured: false,
    postedDate: '2024-01-18',
    views: 512,
    saves: 78,
    agentName: 'Suresh Reddy',
    agentPhone: '+91 98765 43212',
    rera: 'P02400001239',
  },
  {
    id: 'prop-007',
    title: 'Serene Palms — 3BHK Row House',
    type: 'Row House',
    status: 'Available',
    price: 14500000,
    priceLabel: '₹1.45 Crore',
    location: 'Manikonda, Hyderabad',
    city: 'Hyderabad',
    area: 2800,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    floor: 1,
    totalFloors: 2,
    age: '1 Year',
    furnishing: 'Semi-Furnished',
    description: 'Spacious row houses with private gardens in the peaceful Manikonda neighborhood. These independent units offer the best of both worlds — privacy of a villa with the security of a gated community. Walking distance from DLF Cyber City.',
    features: ['Private Garden', 'Gated Community', 'Terrace', 'Gymnasium', 'Children\'s Park', '24/7 Security', 'Power Backup', 'Club House'],
    images: propertyImages.row,
    lat: 17.3950,
    lng: 78.3775,
    featured: false,
    postedDate: '2024-01-22',
    views: 389,
    saves: 62,
    agentName: 'Ravi Shankar',
    agentPhone: '+91 98765 43210',
    rera: 'P02400001240',
  },
  {
    id: 'prop-008',
    title: 'Lotus Gardens — 2BHK Affordable Apartment',
    type: 'Apartment',
    status: 'Available',
    price: 3800000,
    priceLabel: '₹38 Lakhs',
    location: 'Miyapur, Hyderabad',
    city: 'Hyderabad',
    area: 920,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    floor: 3,
    totalFloors: 10,
    age: '4 Years',
    furnishing: 'Unfurnished',
    description: 'Affordable and well-planned 2BHK apartments in Miyapur. Great connectivity via the Metro Rail. Suitable for middle-income families and investors looking for rental yield. The society has all essential amenities.',
    features: ['Metro Connectivity', 'Gymnasium', 'Swimming Pool', 'Children\'s Play Area', 'Power Backup', '24/7 Security', 'Visitor Parking'],
    images: propertyImages.apt2,
    lat: 17.4990,
    lng: 78.3511,
    featured: false,
    postedDate: '2024-01-25',
    views: 782,
    saves: 103,
    agentName: 'Suresh Reddy',
    agentPhone: '+91 98765 43212',
    rera: 'P02400001241',
  },
  {
    id: 'prop-009',
    title: 'Crystal Villas — 5BHK Ultra Luxury Villa',
    type: 'Villa',
    status: 'Available',
    price: 75000000,
    priceLabel: '₹7.5 Crore',
    location: 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    area: 8500,
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    floor: 1,
    totalFloors: 3,
    age: 'New',
    furnishing: 'Furnished',
    description: 'Opulent 5BHK villa in Banjara Hills — the pinnacle of luxury residential living. Three floors of living space with an infinity pool, gym, spa room, home cinema, and a rooftop sky lounge. This villa is designed for those who demand the absolute best.',
    features: ['Infinity Pool', 'Spa Room', 'Home Cinema', 'Sky Lounge', 'Smart Home Automation', 'EV Charging', 'Chef\'s Kitchen', 'Wine Room', 'Panic Room', 'Helicopter Pad'],
    images: propertyImages.villa2,
    lat: 17.4139,
    lng: 78.4477,
    featured: true,
    postedDate: '2024-01-02',
    views: 3421,
    saves: 671,
    agentName: 'Priya Nair',
    agentPhone: '+91 98765 43211',
    rera: 'P02400001242',
  },
  {
    id: 'prop-010',
    title: 'Metro Towers — 1BHK Investment Property',
    type: 'Apartment',
    status: 'Available',
    price: 2800000,
    priceLabel: '₹28 Lakhs',
    location: 'LB Nagar, Hyderabad',
    city: 'Hyderabad',
    area: 620,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    floor: 5,
    totalFloors: 12,
    age: '2 Years',
    furnishing: 'Furnished',
    description: 'Compact and smart 1BHK apartment perfect for rental investment or bachelor living. Fully furnished with modular kitchen and built-in wardrobes. Located near LB Nagar Metro station. High rental demand area.',
    features: ['Fully Furnished', 'Metro Nearby', 'Swimming Pool', 'Gymnasium', 'Power Backup', 'Intercom', '24/7 Security'],
    images: propertyImages.apt1,
    lat: 17.3489,
    lng: 78.5524,
    featured: false,
    postedDate: '2024-01-28',
    views: 431,
    saves: 58,
    agentName: 'Ravi Shankar',
    agentPhone: '+91 98765 43210',
    rera: 'P02400001243',
  },
  {
    id: 'prop-011',
    title: 'Tech Park Heights — 3BHK Smart Home',
    type: 'Apartment',
    status: 'Under Offer',
    price: 11500000,
    priceLabel: '₹1.15 Crore',
    location: 'Nanakramguda, Hyderabad',
    city: 'Hyderabad',
    area: 2100,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    floor: 18,
    totalFloors: 30,
    age: 'New',
    furnishing: 'Semi-Furnished',
    description: 'Smart home integrated 3BHK at Nanakramguda — the emerging financial district. Equipped with Alexa-enabled controls, energy-efficient appliances, solar water heating, and a building management system. Direct walkway to the upcoming Nanakramguda business district.',
    features: ['Smart Home (Alexa)', 'Solar Water Heating', 'EV Charging', 'Rooftop Pool', 'Co-Working Lounge', 'Concierge', 'Smart Locks', 'Video Door Phone', 'Gym', 'Jogging Track'],
    images: propertyImages.apt2,
    lat: 17.4179,
    lng: 78.3339,
    featured: false,
    postedDate: '2024-01-12',
    views: 697,
    saves: 98,
    agentName: 'Suresh Reddy',
    agentPhone: '+91 98765 43212',
    rera: 'P02400001244',
  },
  {
    id: 'prop-012',
    title: 'Commercial Arcade — Retail + Office Complex',
    type: 'Commercial',
    status: 'Available',
    price: 45000000,
    priceLabel: '₹4.5 Crore',
    location: 'Kukatpally, Hyderabad',
    city: 'Hyderabad',
    area: 7500,
    bedrooms: 0,
    bathrooms: 10,
    parking: 30,
    floor: 1,
    totalFloors: 6,
    age: '5 Years',
    furnishing: 'Unfurnished',
    description: 'A mixed-use commercial complex with ground floor retail spaces and upper-floor office suites. Prime Kukatpally frontage with 45-ft road access. Fully operational with existing tenants. Ideal for commercial investors seeking stable rental income.',
    features: ['Prime Road Frontage', 'Multiple Tenants', '45ft Road Access', 'Basement Parking', 'DG Power Backup', 'Central Air Conditioning', 'Fire Safety Systems', 'Lift', 'CCTV'],
    images: propertyImages.comm,
    lat: 17.4949,
    lng: 78.3976,
    featured: false,
    postedDate: '2024-01-30',
    views: 289,
    saves: 34,
    agentName: 'Priya Nair',
    agentPhone: '+91 98765 43211',
    rera: 'P02400001245',
  },
  {
    id: 'prop-013',
    title: 'Sunrise Villas — 4BHK Gated Community Villa',
    type: 'Villa',
    status: 'Available',
    price: 24000000,
    priceLabel: '₹2.4 Crore',
    location: 'Shamshabad, Hyderabad',
    city: 'Hyderabad',
    area: 3800,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    floor: 1,
    totalFloors: 2,
    age: '3 Years',
    furnishing: 'Semi-Furnished',
    description: 'Well-appointed 4BHK villa in Sunrise Villas — a premium plotted development near the international airport. Excellent connectivity via the Outer Ring Road. The community features a clubhouse, swimming pool, and landscaped gardens.',
    features: ['Gated Community', 'Club House', 'Swimming Pool', 'Landscaped Gardens', 'Jogging Track', '24/7 Security', 'Power Backup', 'Water Treatment Plant'],
    images: propertyImages.villa2,
    lat: 17.2543,
    lng: 78.4226,
    featured: false,
    postedDate: '2024-02-01',
    views: 445,
    saves: 71,
    agentName: 'Ravi Shankar',
    agentPhone: '+91 98765 43210',
    rera: 'P02400001246',
  },
  {
    id: 'prop-014',
    title: 'GS Icon — 500 Sq Yd Investment Plot',
    type: 'Plot',
    status: 'Available',
    price: 15000000,
    priceLabel: '₹1.5 Crore',
    location: 'Maheshwaram, Hyderabad',
    city: 'Hyderabad',
    area: 4500,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    floor: 0,
    totalFloors: 0,
    age: 'NA',
    furnishing: 'Unfurnished',
    description: 'A large HMDA-approved plot in the rapidly growing Maheshwaram corridor. Close to upcoming social infrastructure including schools, hospitals, and retail hubs. Significant capital appreciation expected within 3-5 years.',
    features: ['HMDA Approved', 'Clear Title', '60ft Road Access', 'All Utilities', 'Corner Plot', 'East Facing', 'Vasthu Compliant', 'Near Pharma City'],
    images: propertyImages.plot,
    lat: 17.2261,
    lng: 78.4649,
    featured: false,
    postedDate: '2024-02-05',
    views: 234,
    saves: 29,
    agentName: 'Suresh Reddy',
    agentPhone: '+91 98765 43212',
    rera: 'P02400001247',
  },
  {
    id: 'prop-015',
    title: 'The Reserve — 3BHK Lake View Apartment',
    type: 'Apartment',
    status: 'Available',
    price: 16500000,
    priceLabel: '₹1.65 Crore',
    location: 'Narsingi, Hyderabad',
    city: 'Hyderabad',
    area: 2450,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    floor: 9,
    totalFloors: 22,
    age: 'New',
    furnishing: 'Semi-Furnished',
    description: 'Premium lake-facing apartments with stunning panoramic views. The Reserve is a boutique high-rise offering just 4 apartments per floor, ensuring exclusivity and privacy. Each unit opens to a large balcony overlooking Narsingi lake.',
    features: ['Lake View', 'Private Lift Lobby', 'Infinity Pool', 'Spa', 'Concierge', 'EV Charging', 'Smart Home', 'Dog Park', 'Herb Garden', 'Rooftop Bar'],
    images: propertyImages.pent,
    lat: 17.3779,
    lng: 78.3489,
    featured: true,
    postedDate: '2024-02-08',
    views: 1092,
    saves: 198,
    agentName: 'Priya Nair',
    agentPhone: '+91 98765 43211',
    rera: 'P02400001248',
  },
  {
    id: 'prop-016',
    title: 'Heritage Homes — 2BHK Row House',
    type: 'Row House',
    status: 'Sold',
    price: 8500000,
    priceLabel: '₹85 Lakhs',
    location: 'Uppal, Hyderabad',
    city: 'Hyderabad',
    area: 1600,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    floor: 1,
    totalFloors: 2,
    age: '6 Years',
    furnishing: 'Unfurnished',
    description: 'Well-maintained row house in a mature gated community in Uppal. Near to major IT parks in the East Hyderabad corridor. Excellent rental demand from IT professionals. Metro connectivity within 500 meters.',
    features: ['Gated Community', 'CCTV', '24/7 Security', 'Power Backup', 'Rain Water Harvesting', 'Solar Lighting', 'Community Hall'],
    images: propertyImages.row,
    lat: 17.4049,
    lng: 78.5589,
    featured: false,
    postedDate: '2024-02-10',
    views: 187,
    saves: 12,
    agentName: 'Ravi Shankar',
    agentPhone: '+91 98765 43210',
    rera: 'P02400001249',
  },
  {
    id: 'prop-017',
    title: 'GS Grand — 4BHK Duplex Apartment',
    type: 'Apartment',
    status: 'Available',
    price: 22000000,
    priceLabel: '₹2.2 Crore',
    location: 'Kokapet, Hyderabad',
    city: 'Hyderabad',
    area: 3900,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    floor: 14,
    totalFloors: 28,
    age: 'New',
    furnishing: 'Furnished',
    description: 'Magnificent 4BHK duplex apartment spread across 2 floors in Kokapet — Hyderabad\'s rising luxury destination. Features a double-height living room, private terrace, and premium imported fittings throughout. The complex boasts a 7-tier security system.',
    features: ['Double-Height Living Room', 'Private Terrace', 'Duplex Layout', 'Imported Fittings', '7-Tier Security', 'Olympic Pool', 'Sports Court', 'Concierge', 'Valet Parking', 'Spa'],
    images: propertyImages.pent,
    lat: 17.4009,
    lng: 78.3339,
    featured: true,
    postedDate: '2024-02-12',
    views: 1567,
    saves: 312,
    agentName: 'Priya Nair',
    agentPhone: '+91 98765 43211',
    rera: 'P02400001250',
  },
  {
    id: 'prop-018',
    title: 'TechSpaces — Premium Coworking & Office',
    type: 'Commercial',
    status: 'Available',
    price: 28000000,
    priceLabel: '₹2.8 Crore',
    location: 'Raidurgam, Hyderabad',
    city: 'Hyderabad',
    area: 5000,
    bedrooms: 0,
    bathrooms: 8,
    parking: 20,
    floor: 3,
    totalFloors: 10,
    age: '1 Year',
    furnishing: 'Furnished',
    description: 'A modern office space designed for the future of work. TechSpaces at Raidurgam offers open-plan zones, private cabins, conference rooms with AV systems, a café, and a gaming lounge. Plug-and-play setup for IT and startup companies.',
    features: ['Plug & Play Setup', 'Conference Rooms', 'AV Systems', 'Café', 'Gaming Lounge', 'High-Speed Internet', 'Reception Services', 'Hot Desks', 'Private Cabins', 'Event Space'],
    images: propertyImages.comm,
    lat: 17.4249,
    lng: 78.3489,
    featured: false,
    postedDate: '2024-02-15',
    views: 367,
    saves: 48,
    agentName: 'Suresh Reddy',
    agentPhone: '+91 98765 43212',
    rera: 'P02400001251',
  },
  {
    id: 'prop-019',
    title: 'Azure Sky — 3BHK Premium Apartment',
    type: 'Apartment',
    status: 'Available',
    price: 13500000,
    priceLabel: '₹1.35 Crore',
    location: 'Puppalaguda, Hyderabad',
    city: 'Hyderabad',
    area: 2200,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    floor: 15,
    totalFloors: 25,
    age: 'New',
    furnishing: 'Semi-Furnished',
    description: 'Azure Sky is a contemporary premium residential development offering breathtaking views of the Osman Sagar reservoir. Three-bedroom apartments with floor-to-ceiling windows, premium finishes, and access to resort-style amenities.',
    features: ['Reservoir View', 'Floor-to-Ceiling Windows', 'Resort Amenities', 'Infinity Pool', 'Yoga Deck', 'Library', 'Mini Theatre', 'Smart Intercom', 'EV Points', 'Pet-Friendly'],
    images: propertyImages.apt1,
    lat: 17.3599,
    lng: 78.3289,
    featured: false,
    postedDate: '2024-02-18',
    views: 521,
    saves: 84,
    agentName: 'Ravi Shankar',
    agentPhone: '+91 98765 43210',
    rera: 'P02400001252',
  },
  {
    id: 'prop-020',
    title: 'Golden Acres — 1 Acre Farm Land with Bungalow',
    type: 'Villa',
    status: 'Available',
    price: 120000000,
    priceLabel: '₹12 Crore',
    location: 'Chevella, Hyderabad',
    city: 'Hyderabad',
    area: 43560,
    bedrooms: 6,
    bathrooms: 7,
    parking: 6,
    floor: 1,
    totalFloors: 2,
    age: '8 Years',
    furnishing: 'Furnished',
    description: 'A rare 1-acre farmhouse estate on the Hyderabad outskirts with a fully renovated 6-bedroom bungalow. Organic farm, fruit orchard, private lake, horse stable, and staff quarters. A weekend retreat or a long-term lifestyle investment.',
    features: ['1 Acre Land', 'Organic Farm', 'Fruit Orchard', 'Private Lake', 'Horse Stable', 'Staff Quarters', 'Borewell', 'Solar Power', 'Swimming Pool', 'Outdoor Kitchen'],
    images: propertyImages.villa2,
    lat: 17.3109,
    lng: 78.2589,
    featured: true,
    postedDate: '2024-02-20',
    views: 2876,
    saves: 534,
    agentName: 'Priya Nair',
    agentPhone: '+91 98765 43211',
    rera: 'P02400001253',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// USERS DATA (20 users)
// ─────────────────────────────────────────────────────────────────────────────

export const users: User[] = [
  { id: 'user-001', name: 'Arjun Mehta', email: 'arjun.mehta@gmail.com', phone: '+91 99001 12345', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', joinedDate: '2024-01-05', savedProperties: ['prop-001', 'prop-005'], viewedProperties: ['prop-001', 'prop-002', 'prop-005', 'prop-009'], budget: '₹1-2 Crore', location: 'Gachibowli', lookingFor: 'Apartment', isVerified: true },
  { id: 'user-002', name: 'Sneha Kapoor', email: 'sneha.kapoor@outlook.com', phone: '+91 98112 67890', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', joinedDate: '2024-01-08', savedProperties: ['prop-002', 'prop-009'], viewedProperties: ['prop-002', 'prop-009', 'prop-017'], budget: '₹2-5 Crore', location: 'Jubilee Hills', lookingFor: 'Villa', isVerified: true },
  { id: 'user-003', name: 'Rahul Joshi', email: 'rahul.joshi@techcorp.in', phone: '+91 77001 54321', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', joinedDate: '2024-01-10', savedProperties: ['prop-003'], viewedProperties: ['prop-003', 'prop-008', 'prop-010'], budget: '₹40-80 Lakhs', location: 'Kondapur', lookingFor: 'Apartment', isVerified: true },
  { id: 'user-004', name: 'Pooja Sharma', email: 'pooja.sharma@infosys.com', phone: '+91 88456 11223', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pooja', joinedDate: '2024-01-12', savedProperties: ['prop-015', 'prop-019'], viewedProperties: ['prop-015', 'prop-017', 'prop-019'], budget: '₹1-2 Crore', location: 'Narsingi', lookingFor: 'Apartment', isVerified: true },
  { id: 'user-005', name: 'Vikram Nair', email: 'vikram.nair@wipro.com', phone: '+91 90001 33445', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram', joinedDate: '2024-01-15', savedProperties: ['prop-006', 'prop-012', 'prop-018'], viewedProperties: ['prop-006', 'prop-012', 'prop-018'], budget: '₹3-8 Crore', location: 'HITEC City', lookingFor: 'Commercial', isVerified: false },
  { id: 'user-006', name: 'Ananya Reddy', email: 'ananya.reddy@gmail.com', phone: '+91 91234 56789', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya', joinedDate: '2024-01-18', savedProperties: ['prop-004', 'prop-014'], viewedProperties: ['prop-004', 'prop-007', 'prop-013', 'prop-014'], budget: '₹60-150 Lakhs', location: 'Kompally', lookingFor: 'Plot', isVerified: true },
  { id: 'user-007', name: 'Karthik Iyer', email: 'karthik.iyer@tcs.com', phone: '+91 82345 67890', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karthik', joinedDate: '2024-01-20', savedProperties: ['prop-001', 'prop-011'], viewedProperties: ['prop-001', 'prop-011', 'prop-019'], budget: '₹80 Lakhs-1.5 Crore', location: 'Gachibowli', lookingFor: 'Apartment', isVerified: true },
  { id: 'user-008', name: 'Divya Menon', email: 'divya.menon@hcl.in', phone: '+91 93456 78901', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=divya', joinedDate: '2024-01-22', savedProperties: ['prop-007'], viewedProperties: ['prop-007', 'prop-013', 'prop-016'], budget: '₹80 Lakhs-1.5 Crore', location: 'Manikonda', lookingFor: 'Row House', isVerified: true },
  { id: 'user-009', name: 'Sanjay Gupta', email: 'sanjay.gupta@razorpay.com', phone: '+91 94567 89012', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sanjay', joinedDate: '2024-01-25', savedProperties: ['prop-005', 'prop-020'], viewedProperties: ['prop-005', 'prop-009', 'prop-017', 'prop-020'], budget: '₹5+ Crore', location: 'Banjara Hills', lookingFor: 'Villa', isVerified: true },
  { id: 'user-010', name: 'Meera Pillai', email: 'meera.pillai@swiggy.com', phone: '+91 95678 90123', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera', joinedDate: '2024-01-28', savedProperties: ['prop-003', 'prop-008'], viewedProperties: ['prop-003', 'prop-008', 'prop-010'], budget: '₹40-70 Lakhs', location: 'Miyapur', lookingFor: 'Apartment', isVerified: false },
  { id: 'user-011', name: 'Aditya Kumar', email: 'aditya.kumar@amazon.in', phone: '+91 96789 01234', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aditya', joinedDate: '2024-02-01', savedProperties: ['prop-015'], viewedProperties: ['prop-015', 'prop-017', 'prop-005'], budget: '₹2-4 Crore', location: 'Kokapet', lookingFor: 'Apartment', isVerified: true },
  { id: 'user-012', name: 'Kavitha Rao', email: 'kavitha.rao@microsoft.com', phone: '+91 97890 12345', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavitha', joinedDate: '2024-02-03', savedProperties: ['prop-002', 'prop-013'], viewedProperties: ['prop-002', 'prop-013', 'prop-020'], budget: '₹2-3 Crore', location: 'Shamshabad', lookingFor: 'Villa', isVerified: true },
  { id: 'user-013', name: 'Nikhil Singh', email: 'nikhil.singh@zepto.com', phone: '+91 98901 23456', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nikhil', joinedDate: '2024-02-05', savedProperties: ['prop-018'], viewedProperties: ['prop-006', 'prop-012', 'prop-018'], budget: '₹2-4 Crore', location: 'Raidurgam', lookingFor: 'Commercial', isVerified: true },
  { id: 'user-014', name: 'Lakshmi Venkat', email: 'lakshmi.venkat@hdfc.com', phone: '+91 99012 34567', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi', joinedDate: '2024-02-08', savedProperties: ['prop-004'], viewedProperties: ['prop-004', 'prop-014'], budget: '₹50-100 Lakhs', location: 'Maheshwaram', lookingFor: 'Plot', isVerified: true },
  { id: 'user-015', name: 'Rohit Bajaj', email: 'rohit.bajaj@paytm.com', phone: '+91 90123 45678', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit', joinedDate: '2024-02-10', savedProperties: ['prop-011', 'prop-019'], viewedProperties: ['prop-011', 'prop-019', 'prop-001'], budget: '₹1-1.5 Crore', location: 'Nanakramguda', lookingFor: 'Apartment', isVerified: false },
  { id: 'user-016', name: 'Preethi Iyer', email: 'preethi.iyer@ola.com', phone: '+91 91234 56780', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=preethi', joinedDate: '2024-02-12', savedProperties: ['prop-007', 'prop-016'], viewedProperties: ['prop-007', 'prop-016', 'prop-013'], budget: '₹80 Lakhs-1.5 Crore', location: 'Uppal', lookingFor: 'Row House', isVerified: true },
  { id: 'user-017', name: 'Ashwin Prakash', email: 'ashwin.prakash@groww.in', phone: '+91 92345 67891', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ashwin', joinedDate: '2024-02-14', savedProperties: ['prop-009'], viewedProperties: ['prop-009', 'prop-020', 'prop-005'], budget: '₹5+ Crore', location: 'Banjara Hills', lookingFor: 'Villa', isVerified: true },
  { id: 'user-018', name: 'Sunita Desai', email: 'sunita.desai@icici.com', phone: '+91 93456 78902', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunita', joinedDate: '2024-02-16', savedProperties: ['prop-001', 'prop-003'], viewedProperties: ['prop-001', 'prop-003', 'prop-011'], budget: '₹60-100 Lakhs', location: 'Kondapur', lookingFor: 'Apartment', isVerified: true },
  { id: 'user-019', name: 'Manohar Reddy', email: 'manohar.reddy@sbi.co.in', phone: '+91 94567 89013', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manohar', joinedDate: '2024-02-18', savedProperties: ['prop-014'], viewedProperties: ['prop-004', 'prop-014'], budget: '₹1-2 Crore', location: 'Kompally', lookingFor: 'Plot', isVerified: false },
  { id: 'user-020', name: 'Deepa Krishnan', email: 'deepa.krishnan@accenture.com', phone: '+91 95678 90124', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepa', joinedDate: '2024-02-20', savedProperties: ['prop-015', 'prop-017'], viewedProperties: ['prop-015', 'prop-017', 'prop-009'], budget: '₹1.5-3 Crore', location: 'Narsingi', lookingFor: 'Apartment', isVerified: true },
  // Admin account
  { id: 'admin-001', name: 'GS Admin', email: 'admin@gsassociations.com', phone: '+91 40 6666 7777', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gsadmin', joinedDate: '2023-01-01', savedProperties: [], viewedProperties: [], isVerified: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// LEADS DATA (50 leads)
// ─────────────────────────────────────────────────────────────────────────────

export const leads: Lead[] = [
  { id: 'lead-001', userId: 'user-001', userName: 'Arjun Mehta', userEmail: 'arjun.mehta@gmail.com', userPhone: '+91 99001 12345', propertyId: 'prop-001', propertyTitle: 'Skyline Residences — 3BHK Premium Apartment', propertyLocation: 'Gachibowli, Hyderabad', timestamp: '2024-01-15T10:23:00Z', status: 'Qualified', notes: 'Very interested. Visiting with family next weekend.', source: 'Property View' },
  { id: 'lead-002', userId: 'user-001', userName: 'Arjun Mehta', userEmail: 'arjun.mehta@gmail.com', userPhone: '+91 99001 12345', propertyId: 'prop-005', propertyTitle: 'The Pinnacle — Penthouse', propertyLocation: 'Financial District, Hyderabad', timestamp: '2024-01-16T14:10:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-003', userId: 'user-002', userName: 'Sneha Kapoor', userEmail: 'sneha.kapoor@outlook.com', userPhone: '+91 98112 67890', propertyId: 'prop-002', propertyTitle: 'Emerald Heights — 4BHK Luxury Villa', propertyLocation: 'Jubilee Hills, Hyderabad', timestamp: '2024-01-15T11:45:00Z', status: 'Contacted', notes: 'Interested. Asked for price negotiation.', source: 'Property View' },
  { id: 'lead-004', userId: 'user-002', userName: 'Sneha Kapoor', userEmail: 'sneha.kapoor@outlook.com', userPhone: '+91 98112 67890', propertyId: 'prop-009', propertyTitle: 'Crystal Villas — 5BHK Ultra Luxury Villa', propertyLocation: 'Banjara Hills, Hyderabad', timestamp: '2024-01-17T09:30:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-005', userId: 'user-003', userName: 'Rahul Joshi', userEmail: 'rahul.joshi@techcorp.in', userPhone: '+91 77001 54321', propertyId: 'prop-003', propertyTitle: 'Prestige Gateway — 2BHK Modern Apartment', propertyLocation: 'Kondapur, Hyderabad', timestamp: '2024-01-18T16:00:00Z', status: 'Qualified', notes: 'Home loan pre-approved. Ready to finalize.', source: 'Property View' },
  { id: 'lead-006', userId: 'user-004', userName: 'Pooja Sharma', userEmail: 'pooja.sharma@infosys.com', userPhone: '+91 88456 11223', propertyId: 'prop-015', propertyTitle: 'The Reserve — 3BHK Lake View Apartment', propertyLocation: 'Narsingi, Hyderabad', timestamp: '2024-01-19T12:15:00Z', status: 'Contacted', notes: 'Wants floor plan sent to email.', source: 'Property View' },
  { id: 'lead-007', userId: 'user-005', userName: 'Vikram Nair', userEmail: 'vikram.nair@wipro.com', userPhone: '+91 90001 33445', propertyId: 'prop-006', propertyTitle: 'Business Hub — Premium Office Space', propertyLocation: 'HITEC City, Hyderabad', timestamp: '2024-01-20T10:00:00Z', status: 'Qualified', notes: 'Company board approved. Finalizing paperwork.', source: 'Property View' },
  { id: 'lead-008', userId: 'user-006', userName: 'Ananya Reddy', userEmail: 'ananya.reddy@gmail.com', userPhone: '+91 91234 56789', propertyId: 'prop-004', propertyTitle: 'GreenFields Plot — 250 Sq Yd Premium Plot', propertyLocation: 'Kompally, Hyderabad', timestamp: '2024-01-20T14:30:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-009', userId: 'user-007', userName: 'Karthik Iyer', userEmail: 'karthik.iyer@tcs.com', userPhone: '+91 82345 67890', propertyId: 'prop-001', propertyTitle: 'Skyline Residences — 3BHK Premium Apartment', propertyLocation: 'Gachibowli, Hyderabad', timestamp: '2024-01-21T09:00:00Z', status: 'Contacted', notes: 'Called and explained project details.', source: 'Property View' },
  { id: 'lead-010', userId: 'user-008', userName: 'Divya Menon', userEmail: 'divya.menon@hcl.in', userPhone: '+91 93456 78901', propertyId: 'prop-007', propertyTitle: 'Serene Palms — 3BHK Row House', propertyLocation: 'Manikonda, Hyderabad', timestamp: '2024-01-22T11:30:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-011', userId: 'user-009', userName: 'Sanjay Gupta', userEmail: 'sanjay.gupta@razorpay.com', userPhone: '+91 94567 89012', propertyId: 'prop-005', propertyTitle: 'The Pinnacle — Penthouse', propertyLocation: 'Financial District, Hyderabad', timestamp: '2024-01-23T15:45:00Z', status: 'Qualified', notes: 'Very high net worth individual. Priority follow-up.', source: 'Property View' },
  { id: 'lead-012', userId: 'user-009', userName: 'Sanjay Gupta', userEmail: 'sanjay.gupta@razorpay.com', userPhone: '+91 94567 89012', propertyId: 'prop-020', propertyTitle: 'Golden Acres — Farm Land with Bungalow', propertyLocation: 'Chevella, Hyderabad', timestamp: '2024-01-24T10:20:00Z', status: 'Contacted', notes: 'Scheduling site visit.', source: 'Property View' },
  { id: 'lead-013', userId: 'user-010', userName: 'Meera Pillai', userEmail: 'meera.pillai@swiggy.com', userPhone: '+91 95678 90123', propertyId: 'prop-008', propertyTitle: 'Lotus Gardens — 2BHK Affordable Apartment', propertyLocation: 'Miyapur, Hyderabad', timestamp: '2024-01-25T09:15:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-014', userId: 'user-011', userName: 'Aditya Kumar', userEmail: 'aditya.kumar@amazon.in', userPhone: '+91 96789 01234', propertyId: 'prop-015', propertyTitle: 'The Reserve — 3BHK Lake View Apartment', propertyLocation: 'Narsingi, Hyderabad', timestamp: '2024-01-26T13:00:00Z', status: 'Qualified', notes: 'Budget confirmed. Site visit done. Booking expected.', source: 'Property View' },
  { id: 'lead-015', userId: 'user-012', userName: 'Kavitha Rao', userEmail: 'kavitha.rao@microsoft.com', userPhone: '+91 97890 12345', propertyId: 'prop-002', propertyTitle: 'Emerald Heights — 4BHK Luxury Villa', propertyLocation: 'Jubilee Hills, Hyderabad', timestamp: '2024-01-27T10:45:00Z', status: 'Contacted', notes: 'Needs interiors quote.', source: 'Property View' },
  { id: 'lead-016', userId: 'user-013', userName: 'Nikhil Singh', userEmail: 'nikhil.singh@zepto.com', userPhone: '+91 98901 23456', propertyId: 'prop-018', propertyTitle: 'TechSpaces — Premium Office', propertyLocation: 'Raidurgam, Hyderabad', timestamp: '2024-01-28T11:30:00Z', status: 'Qualified', notes: 'Startup expanding. Needs 5000 sqft immediately.', source: 'Property View' },
  { id: 'lead-017', userId: 'user-014', userName: 'Lakshmi Venkat', userEmail: 'lakshmi.venkat@hdfc.com', userPhone: '+91 99012 34567', propertyId: 'prop-004', propertyTitle: 'GreenFields Plot — 250 Sq Yd', propertyLocation: 'Kompally, Hyderabad', timestamp: '2024-01-29T14:00:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-018', userId: 'user-015', userName: 'Rohit Bajaj', userEmail: 'rohit.bajaj@paytm.com', userPhone: '+91 90123 45678', propertyId: 'prop-011', propertyTitle: 'Tech Park Heights — 3BHK Smart Home', propertyLocation: 'Nanakramguda, Hyderabad', timestamp: '2024-01-30T16:30:00Z', status: 'Contacted', notes: 'Asked for EMI breakup.', source: 'Property View' },
  { id: 'lead-019', userId: 'user-016', userName: 'Preethi Iyer', userEmail: 'preethi.iyer@ola.com', userPhone: '+91 91234 56780', propertyId: 'prop-007', propertyTitle: 'Serene Palms — 3BHK Row House', propertyLocation: 'Manikonda, Hyderabad', timestamp: '2024-02-01T09:45:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-020', userId: 'user-017', userName: 'Ashwin Prakash', userEmail: 'ashwin.prakash@groww.in', userPhone: '+91 92345 67891', propertyId: 'prop-009', propertyTitle: 'Crystal Villas — 5BHK Ultra Luxury Villa', propertyLocation: 'Banjara Hills, Hyderabad', timestamp: '2024-02-02T12:30:00Z', status: 'Qualified', notes: 'High interest. Wants brochure and legal docs.', source: 'Property View' },
  { id: 'lead-021', userId: 'user-018', userName: 'Sunita Desai', userEmail: 'sunita.desai@icici.com', userPhone: '+91 93456 78902', propertyId: 'prop-001', propertyTitle: 'Skyline Residences — 3BHK Premium Apartment', propertyLocation: 'Gachibowli, Hyderabad', timestamp: '2024-02-03T10:00:00Z', status: 'Contacted', notes: 'Wants bank loan guidance.', source: 'Loan Inquiry' },
  { id: 'lead-022', userId: 'user-019', userName: 'Manohar Reddy', userEmail: 'manohar.reddy@sbi.co.in', userPhone: '+91 94567 89013', propertyId: 'prop-014', propertyTitle: 'GS Icon — 500 Sq Yd Investment Plot', propertyLocation: 'Maheshwaram, Hyderabad', timestamp: '2024-02-04T14:15:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-023', userId: 'user-020', userName: 'Deepa Krishnan', userEmail: 'deepa.krishnan@accenture.com', userPhone: '+91 95678 90124', propertyId: 'prop-015', propertyTitle: 'The Reserve — 3BHK Lake View Apartment', propertyLocation: 'Narsingi, Hyderabad', timestamp: '2024-02-05T11:00:00Z', status: 'Qualified', notes: 'Shortlisted with prop-017. Deciding soon.', source: 'Property View' },
  { id: 'lead-024', userId: 'user-001', userName: 'Arjun Mehta', userEmail: 'arjun.mehta@gmail.com', userPhone: '+91 99001 12345', propertyId: 'prop-002', propertyTitle: 'Emerald Heights — 4BHK Luxury Villa', propertyLocation: 'Jubilee Hills, Hyderabad', timestamp: '2024-02-06T09:30:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-025', userId: 'user-003', userName: 'Rahul Joshi', userEmail: 'rahul.joshi@techcorp.in', userPhone: '+91 77001 54321', propertyId: 'prop-008', propertyTitle: 'Lotus Gardens — 2BHK Affordable Apartment', propertyLocation: 'Miyapur, Hyderabad', timestamp: '2024-02-07T15:45:00Z', status: 'Closed', notes: 'Booked. Payment done.', source: 'Property View' },
  { id: 'lead-026', userId: 'user-004', userName: 'Pooja Sharma', userEmail: 'pooja.sharma@infosys.com', userPhone: '+91 88456 11223', propertyId: 'prop-017', propertyTitle: 'GS Grand — 4BHK Duplex Apartment', propertyLocation: 'Kokapet, Hyderabad', timestamp: '2024-02-08T10:00:00Z', status: 'Contacted', notes: 'Comparing with another project.', source: 'Property View' },
  { id: 'lead-027', userId: 'user-005', userName: 'Vikram Nair', userEmail: 'vikram.nair@wipro.com', userPhone: '+91 90001 33445', propertyId: 'prop-012', propertyTitle: 'Commercial Arcade — Retail + Office Complex', propertyLocation: 'Kukatpally, Hyderabad', timestamp: '2024-02-09T13:30:00Z', status: 'Qualified', notes: 'Company investment decision pending board meeting.', source: 'Property View' },
  { id: 'lead-028', userId: 'user-006', userName: 'Ananya Reddy', userEmail: 'ananya.reddy@gmail.com', userPhone: '+91 91234 56789', propertyId: 'prop-014', propertyTitle: 'GS Icon — 500 Sq Yd Investment Plot', propertyLocation: 'Maheshwaram, Hyderabad', timestamp: '2024-02-10T09:00:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-029', userId: 'user-007', userName: 'Karthik Iyer', userEmail: 'karthik.iyer@tcs.com', userPhone: '+91 82345 67890', propertyId: 'prop-019', propertyTitle: 'Azure Sky — 3BHK Premium Apartment', propertyLocation: 'Puppalaguda, Hyderabad', timestamp: '2024-02-11T14:45:00Z', status: 'Contacted', notes: 'Interested in early-bird discount.', source: 'Property View' },
  { id: 'lead-030', userId: 'user-008', userName: 'Divya Menon', userEmail: 'divya.menon@hcl.in', userPhone: '+91 93456 78901', propertyId: 'prop-013', propertyTitle: 'Sunrise Villas — 4BHK Gated Community Villa', propertyLocation: 'Shamshabad, Hyderabad', timestamp: '2024-02-12T11:00:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-031', userId: 'user-010', userName: 'Meera Pillai', userEmail: 'meera.pillai@swiggy.com', userPhone: '+91 95678 90123', propertyId: 'prop-003', propertyTitle: 'Prestige Gateway — 2BHK Modern Apartment', propertyLocation: 'Kondapur, Hyderabad', timestamp: '2024-02-13T10:30:00Z', status: 'Contacted', notes: 'Budget tight. Exploring home loan options.', source: 'Loan Inquiry' },
  { id: 'lead-032', userId: 'user-011', userName: 'Aditya Kumar', userEmail: 'aditya.kumar@amazon.in', userPhone: '+91 96789 01234', propertyId: 'prop-017', propertyTitle: 'GS Grand — 4BHK Duplex Apartment', propertyLocation: 'Kokapet, Hyderabad', timestamp: '2024-02-14T14:15:00Z', status: 'Qualified', notes: 'Ready to book after site visit.', source: 'Property View' },
  { id: 'lead-033', userId: 'user-012', userName: 'Kavitha Rao', userEmail: 'kavitha.rao@microsoft.com', userPhone: '+91 97890 12345', propertyId: 'prop-013', propertyTitle: 'Sunrise Villas — 4BHK Gated Community Villa', propertyLocation: 'Shamshabad, Hyderabad', timestamp: '2024-02-15T09:30:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-034', userId: 'user-013', userName: 'Nikhil Singh', userEmail: 'nikhil.singh@zepto.com', userPhone: '+91 98901 23456', propertyId: 'prop-006', propertyTitle: 'Business Hub — Premium Office Space', propertyLocation: 'HITEC City, Hyderabad', timestamp: '2024-02-16T11:45:00Z', status: 'Contacted', notes: 'Comparing two locations. Decision by month end.', source: 'Property View' },
  { id: 'lead-035', userId: 'user-014', userName: 'Lakshmi Venkat', userEmail: 'lakshmi.venkat@hdfc.com', userPhone: '+91 99012 34567', propertyId: 'prop-004', propertyTitle: 'GreenFields Plot — 250 Sq Yd Premium Plot', propertyLocation: 'Kompally, Hyderabad', timestamp: '2024-02-17T15:00:00Z', status: 'Qualified', notes: 'Already shortlisted. Awaiting spouse approval.', source: 'Property View' },
  { id: 'lead-036', userId: 'user-015', userName: 'Rohit Bajaj', userEmail: 'rohit.bajaj@paytm.com', userPhone: '+91 90123 45678', propertyId: 'prop-019', propertyTitle: 'Azure Sky — 3BHK Premium Apartment', propertyLocation: 'Puppalaguda, Hyderabad', timestamp: '2024-02-18T09:00:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-037', userId: 'user-016', userName: 'Preethi Iyer', userEmail: 'preethi.iyer@ola.com', userPhone: '+91 91234 56780', propertyId: 'prop-016', propertyTitle: 'Heritage Homes — 2BHK Row House', propertyLocation: 'Uppal, Hyderabad', timestamp: '2024-02-19T12:30:00Z', status: 'Contacted', notes: 'Inquired about resale value.', source: 'Contact Form' },
  { id: 'lead-038', userId: 'user-017', userName: 'Ashwin Prakash', userEmail: 'ashwin.prakash@groww.in', userPhone: '+91 92345 67891', propertyId: 'prop-020', propertyTitle: 'Golden Acres — Farm Land with Bungalow', propertyLocation: 'Chevella, Hyderabad', timestamp: '2024-02-20T10:15:00Z', status: 'Qualified', notes: 'Investment for long-term. Very interested.', source: 'Property View' },
  { id: 'lead-039', userId: 'user-018', userName: 'Sunita Desai', userEmail: 'sunita.desai@icici.com', userPhone: '+91 93456 78902', propertyId: 'prop-003', propertyTitle: 'Prestige Gateway — 2BHK Modern Apartment', propertyLocation: 'Kondapur, Hyderabad', timestamp: '2024-02-21T14:00:00Z', status: 'Closed', notes: 'Payment received. Booking done.', source: 'Property View' },
  { id: 'lead-040', userId: 'user-019', userName: 'Manohar Reddy', userEmail: 'manohar.reddy@sbi.co.in', userPhone: '+91 94567 89013', propertyId: 'prop-004', propertyTitle: 'GreenFields Plot — 250 Sq Yd Premium Plot', propertyLocation: 'Kompally, Hyderabad', timestamp: '2024-02-22T11:30:00Z', status: 'Contacted', notes: 'Asked for site map and approval copies.', source: 'Property View' },
  { id: 'lead-041', userId: 'user-020', userName: 'Deepa Krishnan', userEmail: 'deepa.krishnan@accenture.com', userPhone: '+91 95678 90124', propertyId: 'prop-017', propertyTitle: 'GS Grand — 4BHK Duplex Apartment', propertyLocation: 'Kokapet, Hyderabad', timestamp: '2024-02-23T09:30:00Z', status: 'Qualified', notes: 'Decided on this over prop-015. Booking this week.', source: 'Property View' },
  { id: 'lead-042', userId: 'user-001', userName: 'Arjun Mehta', userEmail: 'arjun.mehta@gmail.com', userPhone: '+91 99001 12345', propertyId: 'prop-009', propertyTitle: 'Crystal Villas — 5BHK Ultra Luxury Villa', propertyLocation: 'Banjara Hills, Hyderabad', timestamp: '2024-02-24T15:00:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-043', userId: 'user-002', userName: 'Sneha Kapoor', userEmail: 'sneha.kapoor@outlook.com', userPhone: '+91 98112 67890', propertyId: 'prop-017', propertyTitle: 'GS Grand — 4BHK Duplex Apartment', propertyLocation: 'Kokapet, Hyderabad', timestamp: '2024-02-25T10:45:00Z', status: 'Contacted', notes: 'Reconsidering budget.', source: 'Property View' },
  { id: 'lead-044', userId: 'user-003', userName: 'Rahul Joshi', userEmail: 'rahul.joshi@techcorp.in', userPhone: '+91 77001 54321', propertyId: 'prop-010', propertyTitle: 'Metro Towers — 1BHK Investment Property', propertyLocation: 'LB Nagar, Hyderabad', timestamp: '2024-02-26T09:00:00Z', status: 'Closed', notes: 'Investment purchase. Completed.', source: 'Property View' },
  { id: 'lead-045', userId: 'user-004', userName: 'Pooja Sharma', userEmail: 'pooja.sharma@infosys.com', userPhone: '+91 88456 11223', propertyId: 'prop-019', propertyTitle: 'Azure Sky — 3BHK Premium Apartment', propertyLocation: 'Puppalaguda, Hyderabad', timestamp: '2024-02-27T13:30:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-046', userId: 'user-005', userName: 'Vikram Nair', userEmail: 'vikram.nair@wipro.com', userPhone: '+91 90001 33445', propertyId: 'prop-018', propertyTitle: 'TechSpaces — Premium Office', propertyLocation: 'Raidurgam, Hyderabad', timestamp: '2024-02-28T11:00:00Z', status: 'Qualified', notes: 'Second office expansion. Strong interest.', source: 'Property View' },
  { id: 'lead-047', userId: 'user-006', userName: 'Ananya Reddy', userEmail: 'ananya.reddy@gmail.com', userPhone: '+91 91234 56789', propertyId: 'prop-007', propertyTitle: 'Serene Palms — 3BHK Row House', propertyLocation: 'Manikonda, Hyderabad', timestamp: '2024-02-29T10:00:00Z', status: 'Contacted', notes: 'Wants construction quality details.', source: 'Schedule Visit' },
  { id: 'lead-048', userId: 'user-007', userName: 'Karthik Iyer', userEmail: 'karthik.iyer@tcs.com', userPhone: '+91 82345 67890', propertyId: 'prop-011', propertyTitle: 'Tech Park Heights — 3BHK Smart Home', propertyLocation: 'Nanakramguda, Hyderabad', timestamp: '2024-03-01T14:30:00Z', status: 'New', notes: '', source: 'Property View' },
  { id: 'lead-049', userId: 'user-008', userName: 'Divya Menon', userEmail: 'divya.menon@hcl.in', userPhone: '+91 93456 78901', propertyId: 'prop-016', propertyTitle: 'Heritage Homes — 2BHK Row House', propertyLocation: 'Uppal, Hyderabad', timestamp: '2024-03-02T09:15:00Z', status: 'Contacted', notes: 'Looking for ready-to-move.', source: 'Contact Form' },
  { id: 'lead-050', userId: 'user-009', userName: 'Sanjay Gupta', userEmail: 'sanjay.gupta@razorpay.com', userPhone: '+91 94567 89012', propertyId: 'prop-009', propertyTitle: 'Crystal Villas — 5BHK Ultra Luxury Villa', propertyLocation: 'Banjara Hills, Hyderabad', timestamp: '2024-03-03T15:00:00Z', status: 'Qualified', notes: 'Very serious buyer. Schedule private tour.', source: 'Schedule Visit' },
];

// ─────────────────────────────────────────────────────────────────────────────
// BLOG POSTS (10 articles)
// ─────────────────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'hyderabad-real-estate-boom-2024',
    title: 'Hyderabad Real Estate Boom: Why 2024 is the Year to Buy',
    excerpt: 'Hyderabad\'s property market is defying national trends with consistent double-digit appreciation. Here\'s everything you need to know before making your move.',
    content: `Hyderabad has firmly established itself as India's premier real estate investment destination in 2024. With the IT sector continuing its robust growth, demand for premium residential and commercial spaces has reached an all-time high.

**The Numbers Don't Lie**

According to recent data, property registrations in Hyderabad saw a 28% year-on-year increase in Q1 2024. The Financial District, Gachibowli, and the emerging Kokapet corridor have witnessed price appreciation of 15-22% over the past 18 months.

**Key Demand Drivers**

1. **IT Sector Expansion**: Major MNCs including Microsoft, Google, and Amazon have significantly expanded their Hyderabad footprints, bringing tens of thousands of high-earning employees into the city.

2. **Infrastructure Push**: The Outer Ring Road, Metro Rail Phase 2, and the Regional Ring Road project are opening up new corridors for development, making previously inaccessible areas prime real estate.

3. **Business-Friendly Governance**: Telangana's proactive industrial policies and the single-window clearance system have attracted massive FDI, boosting economic sentiment.

**Where to Buy in 2024**

- **Gachibowli & Financial District**: Still the gold standard for premium residential investment. Expect 12-18% appreciation annually.
- **Kokapet**: The emerging luxury destination. Land prices have tripled in 5 years.
- **Shamshabad**: Airport proximity and ORR connectivity make this a sleeper hit for plotted development.
- **Kompally**: Affordable options with high growth potential as the city expands northward.

**The GS Associations Perspective**

At GS Associations, we've been guiding buyers and investors in Hyderabad's market for over a decade. Our advice: don't wait for the "perfect" moment. The city's fundamentals are strong, inventory is tightening, and the window for below-market entries is closing rapidly.

**Conclusion**

Whether you're a first-time buyer seeking a home or a seasoned investor looking to expand your portfolio, Hyderabad's real estate market in 2024 presents a compelling opportunity. The combination of economic growth, infrastructure development, and lifestyle upgrades makes this city a standout performer in India's real estate landscape.`,
    category: 'Market Trends',
    author: 'Priya Nair',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    publishedDate: '2024-01-15',
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1200&q=80',
    tags: ['Hyderabad', 'Investment', 'Market Analysis', '2024'],
    featured: true,
    views: 4521,
  },
  {
    id: 'blog-002',
    slug: 'home-loan-guide-first-time-buyers',
    title: 'The Ultimate Home Loan Guide for First-Time Buyers in India',
    excerpt: 'Confused about home loans? We break down everything — from eligibility criteria to PMAY subsidies — in plain language.',
    content: `Buying your first home is one of life\'s most significant milestones. For most Indians, it also means navigating the complex world of home loans for the first time. This comprehensive guide demystifies the process.

**Understanding Home Loan Basics**

A home loan is a secured loan where the property itself serves as collateral. Banks and housing finance companies (HFCs) typically finance up to 80-90% of the property's market value, and you pay the rest as a down payment.

**Key Terms You Must Know**

- **EMI (Equated Monthly Instalment)**: Your monthly payment consisting of principal and interest.
- **LTV (Loan-to-Value Ratio)**: The percentage of the property value the lender will finance. For properties above ₹75 lakhs, this is typically 75%.
- **CIBIL Score**: Your credit score. Aim for 750+ for the best interest rates.
- **Processing Fee**: Typically 0.5-1% of the loan amount, charged upfront.

**PMAY — Pradhan Mantri Awas Yojana**

First-time homebuyers in India may qualify for interest subsidies under PMAY. Under CLSS (Credit Linked Subsidy Scheme), eligible buyers can receive an interest subsidy of 3-6.5% on their home loan, translating to savings of ₹2-2.67 lakhs.

**Step-by-Step Application Process**

1. Check your eligibility and CIBIL score
2. Compare interest rates across lenders
3. Get a pre-approval/in-principle sanction letter
4. Choose your property
5. Submit the property documents to the bank
6. Bank conducts technical and legal verification
7. Loan is sanctioned and disbursed

**Documents Required**

- Identity proof (Aadhaar, PAN)
- Address proof
- Income documents (salary slips, ITR for 2 years)
- Bank statements (6 months)
- Employment certificate
- Property documents (once finalized)

**Pro Tips from GS Associations**

1. **Don't apply to multiple lenders simultaneously** — each application creates a hard inquiry that temporarily lowers your CIBIL score.
2. **Consider a longer tenure** if cash flow is a concern — you can always prepay without penalty on floating rate loans.
3. **Factor in all costs** — registration, stamp duty, GST on under-construction properties, maintenance deposits.

Reach out to our loan experts at GS Associations for personalized guidance at zero cost.`,
    category: 'Home Loans',
    author: 'Ravi Shankar',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
    publishedDate: '2024-01-22',
    readTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    tags: ['Home Loans', 'Finance', 'First-Time Buyers', 'PMAY'],
    featured: true,
    views: 6832,
  },
  {
    id: 'blog-003',
    slug: 'gachibowli-investment-guide',
    title: 'Gachibowli Investment Guide: Is Now the Right Time?',
    excerpt: 'Gachibowli has transformed from a quiet suburb to Hyderabad\'s most valuable real estate destination. Here\'s an honest assessment of current opportunities.',
    content: `Gachibowli's transformation over the past two decades is one of India's most remarkable real estate stories. From a sleepy village on Hyderabad's outskirts to the epicenter of India's technology revolution — the journey has been extraordinary.

**A Brief History**

The development of Gachibowli began in earnest with the establishment of HITEC City in the late 1990s. The subsequent IT boom brought thousands of knowledge workers, creating demand for premium housing that the market has struggled to meet ever since.

**Current Market Snapshot**

- **Average residential price**: ₹7,000-12,000 per sqft (depending on project quality)
- **Year-on-year appreciation**: 14-18%
- **Average rental yield**: 3.5-4.5%
- **Vacancy rate**: Below 5%

**Why Gachibowli Still Has Legs**

Despite being a "mature" market, Gachibowli continues to attract investment for several reasons:

1. **Employment Concentration**: The DLF Cyber City, Raheja Mindspace, and Q City tech parks house hundreds of thousands of employees within a 3km radius.
2. **Limited Land Bank**: Unlike peripheral areas, Gachibowli has very limited undeveloped land, keeping supply constrained.
3. **Lifestyle Infrastructure**: World-class malls, hospitals, schools, and restaurants make it genuinely livable — not just a dormitory suburb.

**Risks to Consider**

- **Price at Entry**: Gachibowli is no longer "affordable" — you're paying a premium for a premium location.
- **IT Sector Concentration**: A downturn in the tech sector could soften demand.
- **Traffic**: Infrastructure development hasn't fully kept pace with the density of development.

**Our Recommendation**

For end-users, Gachibowli remains an excellent choice — the lifestyle quality and resale/rental prospects are unmatched. For investors, the math works if you're looking at a 5+ year horizon and rental income as a component of returns.

Browse our current Gachibowli listings and speak to our advisors for a personalized investment analysis.`,
    category: 'Investment Guide',
    author: 'Suresh Reddy',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh',
    publishedDate: '2024-02-01',
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    tags: ['Gachibowli', 'Investment', 'Hyderabad', 'Locality Guide'],
    featured: false,
    views: 3214,
  },
  {
    id: 'blog-004',
    slug: 'vastu-shastra-modern-homes',
    title: 'Vastu Shastra in Modern Homes: Science or Superstition?',
    excerpt: 'Millions of Indian homebuyers insist on Vastu compliance. We explore the principles, their origins, and how modern architects are incorporating them.',
    content: `In India's real estate market, no factor generates more discussion — or more confusion — than Vastu Shastra. This ancient Indian architectural science influences decisions from plot orientation to the placement of the pooja room. But how relevant is it to modern apartment living?

**What is Vastu Shastra?**

Vastu Shastra is a traditional Hindu system of architecture and design that dates back thousands of years. At its core, it's a set of principles for designing spaces that harmonize with natural forces — sunlight, wind, water, and earth energies.

**The Five Elements**

Vastu divides the world into five elements (Panchabhutas):
- **Earth (Prithvi)**: Stability and foundation
- **Water (Jal)**: Flow and purity
- **Fire (Agni)**: Energy and transformation
- **Air (Vayu)**: Movement and communication
- **Space (Akasha)**: Consciousness and expansion

**Key Vastu Principles for Homes**

1. **Main Door**: Ideally facing North or East to receive morning sunlight and positive energy.
2. **Master Bedroom**: South-west direction is considered most beneficial for the head of family.
3. **Kitchen**: South-east (fire direction). The cook should face East while cooking.
4. **Pooja Room**: North-east corner (the sacred "Ishaan" direction).
5. **Bathrooms**: Should not be in the North-east or center of the house.

**The Modern Architect's View**

Many of the Vastu principles have practical logic behind them. North and East-facing plots get more sunlight in Indian latitudes. Cross-ventilation is achieved when windows are on opposite walls. Water bodies to the North (cooler direction) make practical sense.

Modern architects often incorporate Vastu principles not as superstition, but as a design framework that has stood the test of time in the Indian climate and cultural context.

**Does it Affect Property Value?**

In Hyderabad's market, Vastu compliance — especially plot direction and main door orientation — does affect buyer preference and therefore property value. North and East-facing properties command a 5-8% premium over similarly specified South and West-facing units.

**Our Practical Advice**

Don't reject a property solely for minor Vastu defects. Major structural concerns (like bathrooms in the Northeast) are harder to remedy, but most Vastu issues can be addressed through interior design and layout. Always consult a certified Vastu expert before making decisions.`,
    category: 'Buyer Tips',
    author: 'Priya Nair',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    publishedDate: '2024-02-08',
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    tags: ['Vastu', 'Home Buying', 'Interior Design', 'Culture'],
    featured: false,
    views: 5123,
  },
  {
    id: 'blog-005',
    slug: 'rera-hyderabad-explained',
    title: 'RERA Hyderabad: Your Complete Guide to Buyer Protection',
    excerpt: 'RERA has fundamentally changed the real estate landscape. Here\'s everything buyers in Telangana need to know to protect their investment.',
    content: `The Real Estate Regulation and Development Act (RERA) 2016 is arguably the most significant reform in India's real estate sector since Independence. For buyers, it offers unprecedented protection against the many malpractices that plagued the pre-RERA era.

**What RERA Means for Buyers**

Before RERA, builders could:
- Delay projects indefinitely with minimal penalty
- Change project specifications without buyer consent
- Sell the same property to multiple buyers (in some cases)
- Collect money without any accountability on delivery

RERA changed all of this fundamentally.

**Key Protections Under RERA Telangana**

1. **Mandatory Registration**: Every project above 500 sqm or 8 units must be registered with RERA before marketing.

2. **Escrow Requirement**: 70% of funds collected from buyers must be deposited in a dedicated escrow account and used only for construction of that project.

3. **Standardized Sale Agreements**: Model agreements protect buyers from one-sided clauses.

4. **Penalties for Delay**: Builders must compensate buyers at the same rate as SBI MCLR+2% for delayed possession.

5. **Defect Liability**: Builders are liable for structural defects for 5 years after possession.

**How to Verify RERA Registration**

Visit the RERA Telangana portal (rera.telangana.gov.in) and search by project name or RERA number. Always verify before paying any token or booking amount.

**What RERA Cannot Do**

RERA is not foolproof. Enforcement can be slow, and getting a refund (even when entitled to one) can take time through the adjudicating process. RERA is a strong framework, but buyer due diligence remains essential.

**GS Associations' Commitment**

Every property listed with GS Associations is RERA-registered. We display the RERA number prominently on all our listings and share all project documentation with buyers before any payment is made.

Your investment is safe with us.`,
    category: 'Legal & Compliance',
    author: 'Suresh Reddy',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh',
    publishedDate: '2024-02-15',
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    tags: ['RERA', 'Legal', 'Buyer Protection', 'Hyderabad'],
    featured: false,
    views: 4789,
  },
  {
    id: 'blog-006',
    slug: 'investment-vs-lifestyle-property',
    title: 'Investment vs Lifestyle Property: How to Choose',
    excerpt: 'Should you buy a property for returns or for living? The two objectives aren\'t always aligned. Here\'s a framework for making the right choice.',
    content: `One of the most common questions we hear from our clients is: "Should I buy this property to live in, or is it a better investment to rent and own elsewhere?" It's a deeply personal question, but there are frameworks that can help you think through it.

**The Two Philosophies**

**Lifestyle Property** is one you buy primarily to live in. The focus is on quality of life — proximity to work, schools, green spaces, and community. Return on investment is a consideration, but not the primary driver.

**Investment Property** is acquired primarily for capital appreciation and/or rental yield. Location choice is driven by data — rental demand, vacancy rates, appreciation history, and tenant profile.

**When Objectives Conflict**

The best lifestyle neighborhoods aren't always the best investment neighborhoods. Here's why:

- Mature, premium localities (like Jubilee Hills or Banjara Hills) may have lower yield because property prices have already appreciated significantly.
- High-growth investment corridors (like Maheshwaram or Shamshabad) may not offer the lifestyle quality you desire for daily living.

**A Practical Framework**

Ask yourself these questions:

1. What is your investment horizon? (< 3 years, 3-7 years, 7+ years)
2. Do you need rental income to service the loan?
3. Are you planning to move cities in the next 5 years?
4. What is your risk appetite?

**For Lifestyle Buyers**

Focus on Gachibowli, Narsingi, Kondapur, Manikonda, and Kokapet. These areas offer excellent quality of life with solid, if not spectacular, investment returns.

**For Pure Investors**

Look at Kompally, Maheshwaram, Shamshabad, and Pharma City corridor. Higher growth potential but less established infrastructure.

**The Hybrid Approach**

Many of our successful clients take a hybrid approach: buy a modest lifestyle property in a premium area, and a separate smaller investment property in a high-growth corridor. This diversifies risk while ensuring quality of life.

Contact GS Associations for a personalized consultation — we'll help you build a real estate strategy aligned with your financial goals.`,
    category: 'Investment Guide',
    author: 'Ravi Shankar',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
    publishedDate: '2024-02-22',
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80',
    tags: ['Investment', 'Lifestyle', 'Strategy', 'Property'],
    featured: false,
    views: 3456,
  },
  {
    id: 'blog-007',
    slug: 'luxury-amenities-worth-paying-for',
    title: '10 Luxury Amenities That Are Actually Worth Paying For',
    excerpt: 'Not all amenities are created equal. After studying hundreds of gated communities, here are the ones that deliver genuine value and boost resale.',
    content: `When developers list 40+ amenities, it's easy to get dazzled by features you'll never use. After years of working with buyers and tracking resale values, we've identified the amenities that genuinely enhance daily life and protect property value.

**The Top 10 Amenities Worth the Premium**

**1. 24/7 Multi-Tier Security**
Not just a guard at the gate, but CCTV, biometric entry, visitor management systems, and patrolling. In Hyderabad's premium localities, this is non-negotiable.

**2. Backup Power for All Common Areas and Homes**
Inconsistent electricity is a reality in India. A complex with 100% power backup eliminates one of the biggest quality-of-life irritants.

**3. A Well-Equipped Gymnasium**
Usage rates are high in young professional communities. A poor gym is one of the most common complaints in apartment reviews.

**4. Children's Play Areas (Designed by Experts)**
For families, this is a strong differentiator. Certified safe play equipment with age-segregated zones commands a meaningful premium in the resale market.

**5. EV Charging Infrastructure**
With EV adoption accelerating, buildings without EV charging will face a significant resale disadvantage within 5 years. Future-proof your investment.

**6. Clubhouse with Multiple Activity Rooms**
A real clubhouse — not just a room — with spaces for yoga, table tennis, a reading library, and party halls genuinely improves community living.

**7. Rooftop Amenities**
Pools, gardens, or sky lounges on the roof add disproportionate value — both experiential and market value.

**8. Smart Home Integration**
Alexa/Google Home integration, smart locks, video door phones, and energy monitoring genuinely improve daily life and differentiate the property.

**9. Reliable High-Speed Internet Infrastructure**
Fiber-ready buildings with redundant connections are a must-have post-pandemic for remote workers.

**10. Pet-Friendly Infrastructure**
Dog parks and pet washing stations are increasingly influencing buying decisions, especially among younger buyers.

**The Amenities to Be Skeptical Of**

- Mini-theatres: Often underused and poorly maintained
- Squash courts: Low usage except in certain demographics  
- Bowling alleys: Very rare, very expensive to maintain
- Golf simulators: Gimmick in most cases

**Our Advice**

Visit the completed projects of the same developer. Talk to residents. Ask about the maintenance fund and how amenities are managed. A beautiful amenity poorly maintained is worse than no amenity at all.`,
    category: 'Buyer Tips',
    author: 'Priya Nair',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    publishedDate: '2024-03-01',
    readTime: 5,
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
    tags: ['Amenities', 'Luxury', 'Buyer Tips', 'Value'],
    featured: false,
    views: 7234,
  },
  {
    id: 'blog-008',
    slug: 'property-tax-stamp-duty-hyderabad',
    title: 'Property Tax and Stamp Duty in Hyderabad: 2024 Complete Guide',
    excerpt: 'Understanding the taxes and charges involved in property purchase in Telangana can save you lakhs. Here\'s a complete breakdown.',
    content: `Every property transaction in Hyderabad involves multiple government levies. Understanding these charges upfront prevents nasty surprises and helps you budget accurately.

**Stamp Duty in Telangana**

Stamp duty is a tax on the transaction document and is calculated as a percentage of the property's market value or sale price, whichever is higher.

- **Residential Properties**: 4% stamp duty + 0.5% transfer duty = 4.5% total
- **Commercial Properties**: 4% stamp duty + 0.5% transfer duty = 4.5% total
- **Plots**: 4% stamp duty + 0.5% transfer duty = 4.5% total

**Registration Charges**

In addition to stamp duty, you pay registration charges:
- **Registration Fee**: 0.5% of property value (max ₹20,000 for residential)
- This cap makes registration charges relatively fixed for most transactions

**GST on Under-Construction Properties**

If you're buying an under-construction apartment, GST applies:
- **Without ITC**: 5% GST on the agreement value
- **Affordable Housing** (< ₹45 lakhs, < 60 sqm): 1% GST

No GST applies on ready-to-move properties with OC (Occupancy Certificate).

**Property Tax (Annual)**

Property tax in Hyderabad is levied by GHMC (Greater Hyderabad Municipal Corporation) and varies by:
- Property location (zone)
- Built-up area
- Property type (residential/commercial)
- Age of construction

Typically, property tax for a standard 2BHK apartment ranges from ₹3,000 to ₹12,000 per year.

**A Worked Example**

For a ₹1 crore apartment (under construction):
- Stamp Duty (4%): ₹4,00,000
- Transfer Duty (0.5%): ₹50,000
- Registration Fee: ₹20,000 (capped)
- GST (5%): ₹5,00,000
- **Total Additional Costs**: ~₹9,70,000 (approx 9.7% of purchase price)

**Budget Accordingly**

Always budget 10-11% of the property value as additional costs beyond the sale price. This covers government charges, legal fees, and home loan processing fees.

Our team at GS Associations provides detailed cost breakdowns before you commit to any property.`,
    category: 'Legal & Compliance',
    author: 'Suresh Reddy',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh',
    publishedDate: '2024-03-08',
    readTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&q=80',
    tags: ['Property Tax', 'Stamp Duty', 'Legal', 'Hyderabad'],
    featured: false,
    views: 8941,
  },
  {
    id: 'blog-009',
    slug: 'future-of-kokapet-hyderabad',
    title: 'Kokapet: Hyderabad\'s Next Luxury Destination',
    excerpt: 'From farmland to Hyderabad\'s most sought-after luxury corridor in less than a decade — the Kokapet story is one for the books.',
    content: `Five years ago, Kokapet was largely unknown outside real estate investment circles. Today, it commands premium prices that rival established neighborhoods like Jubilee Hills and Banjara Hills. What happened?

**The Transformation**

Kokapet's rise has been driven by a confluence of factors that rarely align so perfectly in any real estate market:

1. **ORR Connectivity**: The Outer Ring Road's direct access to Kokapet dramatically reduced commute times to Gachibowli and HITEC City.
2. **Large Land Parcels**: Unlike older localities, Kokapet had large contiguous land parcels, enabling large-format, amenity-rich gated communities.
3. **Developer Interest**: When Prestige, Aparna, and Phoenix chose Kokapet for their marquee Hyderabad projects, it signaled serious intent and attracted premium buyers.
4. **Limited Premium Supply**: The Financial District and Gachibowli were running out of space. Kokapet was the natural overflow for premium demand.

**What's Coming to Kokapet**

- **Kokapet Business Park**: A 200-acre commercial development that will bring 50,000+ jobs within walking distance of residential zones.
- **Star Hotels**: Multiple 5-star properties are in various stages of development.
- **Metro Extension**: Plans for a metro line connecting Kokapet to the main network.
- **Social Infrastructure**: International schools, multi-specialty hospitals, and retail.

**Current Price Levels**

- Land: ₹1.5-2.5 crore per acre (depending on road frontage and approval status)
- Apartments: ₹8,000-14,000 per sqft
- Villas: ₹12,000-18,000 per sqft (plot + construction)

**Investment Thesis**

Kokapet is in the "growth phase" of the real estate cycle — past the speculative early stage, but not yet as expensive as mature markets. The 5-year appreciation potential is estimated at 60-80%, outpacing most other Hyderabad micro-markets.

**The Risk**

Over-supply is the key risk. Multiple large projects launching simultaneously could dampen prices short-term. Investors should look for projects with strong developer credentials and early delivery timelines.

GS Associations has curated a selection of the best Kokapet projects. Contact us for an investment walkthrough.`,
    category: 'Investment Guide',
    author: 'Ravi Shankar',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
    publishedDate: '2024-03-15',
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    tags: ['Kokapet', 'Investment', 'Luxury', 'Hyderabad'],
    featured: true,
    views: 6782,
  },
  {
    id: 'blog-010',
    slug: 'interior-design-tips-new-apartment',
    title: '7 Interior Design Tips to Transform Your New Apartment Under ₹15 Lakhs',
    excerpt: 'You don\'t need a seven-figure budget to create a stunning home. These practical tips from professional designers can transform any space.',
    content: `Moving into a new apartment is exciting — and overwhelming. With a ₹15 lakh budget thoughtfully allocated, you can create a space that looks like it cost twice as much.

**Tip 1: Invest in Flooring, Not Furniture**

The single biggest visual impact in any space is the flooring. Budget Italian marble effect tiles cost as little as ₹80/sqft, but they elevate the entire room. Don't skimp here.

**Tip 2: Choose a Warm, Neutral Palette**

Stick to 3-4 colors maximum. Warm whites, soft greys, warm taupes, and one accent color. This timeless combination never goes out of fashion and makes spaces appear larger.

**Tip 3: Kitchen Modulars Are Worth It**

A well-designed modular kitchen is the heart of the home. Budget ₹3.5-4 lakhs for a well-specified modular kitchen. It transforms your entire lifestyle and is the single best investment in any home.

**Tip 4: Lighting is Everything**

Most Indian homes are criminally underlit. Layer your lighting with:
- Ambient lighting (LED panel/cove lighting)
- Task lighting (under-cabinet, pendant over dining)
- Accent lighting (picture lights, step lighting)

A ₹1 lakh investment in proper lighting creates more impact than ₹5 lakhs of furniture.

**Tip 5: Wardrobes and Storage First**

Clutter destroys aesthetics. Budget ₹1-1.5 lakhs per bedroom for well-planned wardrobes. Lofts, under-bed storage, and built-in shelves eliminate the clutter that makes spaces feel small.

**Tip 6: One Statement Piece Per Room**

In each room, have one standout piece — a stunning sofa, a dramatic artwork, a chandelier. Everything else can be modest. This focal point creates visual interest without requiring a large budget.

**Tip 7: Plants and Natural Elements**

Nothing brings a space alive like greenery. A mix of indoor plants (money plants, pothos, fiddle leaf figs) adds freshness, improves air quality, and adds visual interest for minimal cost.

**Suggested Budget Allocation (₹15 Lakhs)**

- Modular Kitchen: ₹4,00,000
- Wardrobes (3 bedrooms): ₹3,50,000
- Flooring (if upgrade from builder): ₹2,00,000
- Lighting: ₹1,00,000
- Living Room Furniture: ₹2,00,000
- Bathroom Accessories: ₹75,000
- Curtains/Soft Furnishings: ₹75,000
- Decor and Plants: ₹50,000
- Contingency: ₹50,000

GS Associations partners with certified interior designers who offer preferential rates to our clients. Reach out for a free consultation.`,
    category: 'Interior Design',
    author: 'Priya Nair',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    publishedDate: '2024-03-22',
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    tags: ['Interior Design', 'Home Improvement', 'Budget', 'Tips'],
    featured: false,
    views: 11245,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LOAN PROGRAMS (10 programs)
// ─────────────────────────────────────────────────────────────────────────────

export const loanPrograms: LoanProgram[] = [
  {
    id: 'loan-001',
    name: 'Home Purchase Loan',
    type: 'Residential',
    interestRate: '8.35% - 9.15% p.a.',
    maxAmount: '₹5 Crore',
    tenure: 'Up to 30 years',
    processingFee: '0.5% of loan amount',
    eligibility: 'Salaried & Self-Employed Indians, Age 21-65',
    features: ['No prepayment penalty on floating rate', 'Balance transfer facility', 'Top-up loan available', 'Digital loan journey', 'Doorstep service'],
    bankName: 'SBI Home Loans',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/58/State_Bank_of_India_Logo.svg',
    popular: true,
  },
  {
    id: 'loan-002',
    name: 'HDFC Premium Home Loan',
    type: 'Residential',
    interestRate: '8.40% - 9.25% p.a.',
    maxAmount: '₹10 Crore',
    tenure: 'Up to 30 years',
    processingFee: '₹7,500 + GST (non-refundable)',
    eligibility: 'Salaried, Self-Employed Professionals & Non-Professionals',
    features: ['Express Home Loan approval in 24 hrs', 'Partly disbursed loans available', 'Step-up EMI option', 'Free legal and technical verification', 'Relationship manager assigned'],
    bankName: 'HDFC Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
    popular: true,
  },
  {
    id: 'loan-003',
    name: 'Plot Purchase Loan',
    type: 'Plot',
    interestRate: '8.75% - 9.65% p.a.',
    maxAmount: '₹3 Crore',
    tenure: 'Up to 15 years',
    processingFee: '0.5% of loan amount',
    eligibility: 'For DTCP/HMDA approved plots only. Age 21-60',
    features: ['Finance up to 75% of plot value', 'Overdraft facility available', 'Convert to home loan once construction begins', 'Simple documentation'],
    bankName: 'ICICI Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
    popular: false,
  },
  {
    id: 'loan-004',
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    type: 'Government Scheme',
    interestRate: 'Effective rate from 6.1% p.a. (after subsidy)',
    maxAmount: '₹45 Lakhs (subsidy on ₹6-12 lakhs)',
    tenure: 'Up to 20 years',
    processingFee: 'Nil (under PMAY scheme)',
    eligibility: 'First-time homebuyers, EWS/LIG/MIG categories as defined',
    features: ['Interest subsidy up to ₹2.67 lakhs', 'No processing fee', 'All leading banks participating', 'Online application through NHB', 'Subsidy credited directly to loan account'],
    bankName: 'Multiple Banks (NHB Scheme)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg',
    popular: true,
  },
  {
    id: 'loan-005',
    name: 'Commercial Property Loan',
    type: 'Commercial',
    interestRate: '9.25% - 11.50% p.a.',
    maxAmount: '₹25 Crore',
    tenure: 'Up to 15 years',
    processingFee: '1% of loan amount',
    eligibility: 'Businesses, Corporates, Self-Employed Professionals. Minimum 3 years business vintage',
    features: ['Finance up to 70% of property value', 'Moratorium period available', 'Lease rental discounting', 'Balance transfer at better rates', 'Overdraft against property'],
    bankName: 'Axis Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Axis_Bank_logo.svg',
    popular: false,
  },
  {
    id: 'loan-006',
    name: 'NRI Home Loan',
    type: 'NRI',
    interestRate: '8.50% - 9.40% p.a.',
    maxAmount: '₹5 Crore',
    tenure: 'Up to 20 years',
    processingFee: '0.5% of loan amount + overseas processing charges',
    eligibility: 'NRIs with valid employment abroad, PIO/OCI cardholders',
    features: ['Repayment via NRE/NRO account', 'POA holder can manage documentation in India', 'Online application from anywhere', 'Dedicated NRI relationship manager', 'Repatriation of rental income permitted'],
    bankName: 'Kotak Mahindra Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Kotak_Mahindra_Bank_logo.svg',
    popular: false,
  },
  {
    id: 'loan-007',
    name: 'Home Improvement Loan',
    type: 'Improvement',
    interestRate: '9.00% - 10.25% p.a.',
    maxAmount: '₹50 Lakhs',
    tenure: 'Up to 15 years',
    processingFee: '0.5% of loan amount',
    eligibility: 'Existing homeowners. Minimum 2 years ownership required',
    features: ['No collateral for amounts up to ₹10 lakhs', 'Quick disbursal in 72 hours', 'Use for renovation, extension, modular kitchen, interiors', 'Top-up on existing home loan', 'Tax benefits under Section 24(b)'],
    bankName: 'Bank of Baroda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Bank_of_Baroda.svg',
    popular: false,
  },
  {
    id: 'loan-008',
    name: 'Balance Transfer + Top Up',
    type: 'Balance Transfer',
    interestRate: 'From 8.30% p.a. (subject to credit assessment)',
    maxAmount: 'Up to outstanding loan amount + ₹50 lakhs top-up',
    tenure: 'Remaining loan tenure',
    processingFee: '0.25% of outstanding loan amount',
    eligibility: 'Existing home loan customers of any bank with 12+ months repayment history and clean track record',
    features: ['Lowest available interest rates', 'Cashback up to ₹50,000 on transfer', 'Top-up loan simultaneously', 'Minimal documentation', 'No foreclosure penalty from existing lender required'],
    bankName: 'HDFC Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
    popular: true,
  },
  {
    id: 'loan-009',
    name: 'Affordable Home Loan (CLSS)',
    type: 'Affordable',
    interestRate: 'Effective from 6.50% p.a. (with subsidy)',
    maxAmount: '₹35 Lakhs',
    tenure: 'Up to 20 years',
    processingFee: 'Nil under scheme',
    eligibility: 'Annual household income up to ₹18 lakhs. No existing pucca house in family',
    features: ['Upfront subsidy of ₹2.30-2.67 lakhs', 'All property types eligible', 'Multiple bank partners', 'Simple online application', 'Reduced EMI from day one'],
    bankName: 'Canara Bank (via NHB)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Canara_bank.svg',
    popular: false,
  },
  {
    id: 'loan-010',
    name: 'Senior Citizen Home Loan',
    type: 'Residential',
    interestRate: '8.50% - 9.00% p.a.',
    maxAmount: '₹2 Crore',
    tenure: 'Up to 20 years (or age 80, whichever is earlier)',
    processingFee: '0.25% of loan amount (capped at ₹5,000)',
    eligibility: 'Age 60-75 at application. Pension/fixed income mandatory. Co-applicant may be required',
    features: ['Pension and rental income considered for eligibility', 'Reverse mortgage option available', 'Step-down EMI aligned with retirement income', 'Reduced processing fee', 'Doorstep documentation'],
    bankName: 'Punjab National Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/PNB_logo.svg',
    popular: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO CREDENTIALS
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_CREDENTIALS = {
  admin: { email: 'admin@gsassociations.com', password: 'admin123' },
  user: { email: 'arjun.mehta@gmail.com', password: 'user123' },
};
