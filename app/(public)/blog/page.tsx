'use client';

import Link from 'next/link';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Eye, ArrowRight } from 'lucide-react';
import { useContentStore } from '@/src/stores/contentStore';

const categories = ['All', 'Market Trends', 'Home Loans', 'Investment Guide', 'Buyer Tips', 'Legal & Compliance', 'Interior Design'];

export default function BlogListPage() {
  const { blogs } = useContentStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const featured = blogs.filter(b => b.featured)[0];
  const filtered = blogs
    .filter(b => !b.featured || category !== 'All' || search)
    .filter(b => {
      const matchesSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || b.category === category;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="pt-24 pb-20 bg-surface-50 min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(245,158,11,0.5), transparent 60%)',
        }} />
        <div className="container-app relative z-10 text-center">
          <p className="section-label text-gold-400 mb-4">Knowledge Hub</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Real Estate Insights
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Market trends, investment guides, legal tips, and expert advice for Hyderabad's property market.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
            />
          </div>
        </div>
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
            <p className="text-4xl mb-4">📰</p>
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
