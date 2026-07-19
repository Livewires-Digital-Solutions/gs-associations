'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Eye, ArrowRight, FileText } from 'lucide-react';
import { getBlogPosts } from '@/lib/db/blogs';
import type { BlogPost } from '@/data/mockData';

const categories = ['All', 'Market Trends', 'Home Loans', 'Investment Guide', 'Buyer Tips', 'Legal & Compliance', 'Interior Design'];

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    getBlogPosts().then(data => { setBlogs(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const featured = blogs.filter(b => b.featured)[0];
  const filtered = blogs
    .filter(b => !b.featured || category !== 'All' || search)
    .filter(b => {
      const matchesSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || b.category === category;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="bg-surface-50 min-h-screen pb-20">
      {/* 75vh Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Real Estate Insights and News" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-50 via-surface-50/10 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="container-app relative z-10 text-center -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-gold-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              Knowledge Hub
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
              Real Estate Insights
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-sm">
              Market trends, investment guides, legal tips, and expert advice for Hyderabad's property market.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-app -mt-10 md:-mt-12 relative z-20 mb-12">
        <form onSubmit={e => e.preventDefault()} className="relative max-w-3xl mx-auto">
          <div className="flex items-center w-full h-14 md:h-16 bg-white rounded-full border border-surface-200 shadow-xl overflow-hidden pr-2 pl-6 transition-all hover:shadow-2xl focus-within:border-navy-300 focus-within:ring-4 focus-within:ring-navy-900/5">
            <Search className="w-5 h-5 text-surface-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles, guides, and news..."
              className="flex-1 h-full bg-transparent text-surface-900 placeholder:text-surface-400 focus:outline-none text-base font-medium"
            />
            <button 
              type="button" 
              className="h-10 md:h-12 px-6 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-full transition-all flex items-center gap-2 flex-shrink-0"
            >
              <span className="hidden sm:inline">Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      <div className="container-app">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                category === cat
                  ? 'bg-navy-800 text-white border-navy-800'
                  : 'bg-white text-surface-600 border-surface-200 hover:border-navy-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && category === 'All' && !search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href={`/blog/${featured.slug}`} className="card card-hover block group overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-72 md:h-auto overflow-hidden">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="badge badge-gold mb-4">Featured Article</span>
                    <h2 className="font-display text-2xl font-bold text-surface-900 leading-snug mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-surface-500 text-sm leading-relaxed line-clamp-3 mb-6">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={featured.authorAvatar} alt={featured.author} className="w-8 h-8 rounded-full bg-surface-200" />
                      <div>
                        <p className="text-sm font-medium text-surface-900">{featured.author}</p>
                        <p className="text-xs text-surface-500">{featured.publishedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-surface-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} min</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featured.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-surface-300 mx-auto mb-4" />
            <h3 className="font-semibold text-surface-700 mb-2">No articles found</h3>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-primary mt-4">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={`/blog/${blog.slug}`} className="card card-hover block group overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="badge badge-navy text-[10px] mb-3 self-start">{blog.category}</span>
                    <h3 className="font-display font-semibold text-surface-900 leading-snug mb-2 flex-1 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-surface-500 line-clamp-2 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-surface-400 mt-auto">
                      <div className="flex items-center gap-2">
                        <img src={blog.authorAvatar} alt="" className="w-5 h-5 rounded-full bg-surface-200" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime} min</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
