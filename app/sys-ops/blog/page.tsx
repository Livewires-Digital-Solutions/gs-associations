'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, Eye, Search, X, Check } from 'lucide-react';
import { format } from 'date-fns';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/db/blogs';
import { toast } from 'sonner';
import type { BlogPost } from '@/data/mockData';
import ImageUpload from '@/components/ui/ImageUpload';

function BlogForm({ blog, onSave, onClose }: { blog?: BlogPost; onSave: (data: Partial<BlogPost>) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    title: blog?.title || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    category: blog?.category || 'Market Trends',
    author: blog?.author || 'GS Team',
    readTime: blog?.readTime?.toString() || '5',
    coverImage: blog?.coverImage || '',
    featured: blog?.featured || false,
    tags: blog?.tags?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      readTime: parseInt(form.readTime),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.author}`,
      views: blog?.views || 0,
    });
  };

  const categories = ['Market Trends', 'Home Loans', 'Investment Guide', 'Buyer Tips', 'Legal & Compliance', 'Interior Design'];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-2xl shadow-card-hover"
      >
        <div className="flex items-center justify-between p-6 border-b border-surface-100">
          <h2 className="font-display font-semibold text-xl">{blog ? 'Edit Article' : 'New Article'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-surface-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label mb-1.5 block">Title *</label>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label mb-1.5 block">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input text-sm">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label mb-1.5 block">Author</label>
              <input type="text" value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className="input" />
            </div>
            <div>
              <label className="label mb-1.5 block">Read Time (min)</label>
              <input type="number" value={form.readTime} onChange={e => setForm(p => ({ ...p, readTime: e.target.value }))} className="input" min="1" />
            </div>
          </div>
          <div>
            <label className="label mb-1.5 block">Excerpt *</label>
            <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} className="input h-16 resize-none" required />
          </div>
          <div>
            <label className="label mb-1.5 block">Content *</label>
            <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className="input h-36 resize-none" required />
          </div>
          <ImageUpload
            label="Cover Image"
            value={form.coverImage}
            onChange={(url) => setForm(p => ({ ...p, coverImage: url }))}
            bucket="uploads"
            folder="blog-covers"
          />
          <div>
            <label className="label mb-1.5 block">Tags (comma-separated)</label>
            <input type="text" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="Investment, Chennai, 2024" className="input" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
            <span className="text-sm font-medium text-surface-700">Feature this article</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1"><Check className="w-4 h-4" />{blog ? 'Update Article' : 'Publish Article'}</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | undefined>();

  const load = async () => {
    setLoading(true);
    try { setBlogs(await getBlogPosts()); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = blogs.filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async (data: Partial<BlogPost>) => {
    try {
      if (editingBlog) {
        await updateBlogPost(editingBlog.id, data);
        toast.success('Article updated');
      } else {
        await createBlogPost(data as Omit<BlogPost, 'id' | 'publishedDate' | 'views'>);
        toast.success('Article published');
      }
      setShowForm(false);
      setEditingBlog(undefined);
      await load();
    } catch (e: any) {
      toast.error(e.message || 'Failed to save article');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this article?')) {
      try {
        await deleteBlogPost(id);
        toast.success('Article deleted');
        await load();
      } catch (e: any) {
        toast.error(e.message || 'Failed to delete article');
      }
    }
  };

  const toggleBlogFeatured = async (id: string) => {
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;
    try {
      await updateBlogPost(id, { featured: !blog.featured });
      toast.success(blog.featured ? 'Removed from featured' : 'Marked as featured');
      await load();
    } catch (e: any) {
      toast.error(e.message || 'Failed to update article');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Blog Management</h1>
          <p className="text-surface-500 text-sm">{loading ? 'Loading...' : `${blogs.length} articles published`}</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingBlog(undefined); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="input pl-10 max-w-md" />
      </div>

      <div className="table-container">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Article</th>
              <th className="table-header-cell">Category</th>
              <th className="table-header-cell">Author</th>
              <th className="table-header-cell">Published</th>
              <th className="table-header-cell">Views</th>
              <th className="table-header-cell">Featured</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(blog => (
              <tr key={blog.id} className="table-row">
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <img src={blog.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <p className="text-sm font-medium text-surface-900 max-w-52 line-clamp-2">{blog.title}</p>
                  </div>
                </td>
                <td className="table-cell"><span className="badge badge-navy text-[10px]">{blog.category}</span></td>
                <td className="table-cell text-sm text-surface-600">{blog.author}</td>
                <td className="table-cell text-xs text-surface-500">{format(new Date(blog.publishedDate), 'MMM d, yyyy')}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-1 text-surface-600"><Eye className="w-3 h-3" />{blog.views.toLocaleString()}</div>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => toggleBlogFeatured(blog.id)}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      blog.featured ? 'bg-gold-500' : 'bg-surface-300'
                    }`}
                    role="switch"
                    aria-checked={blog.featured}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        blog.featured ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingBlog(blog); setShowForm(true); }} className="w-7 h-7 rounded-lg hover:bg-navy-50 flex items-center justify-center text-navy-600">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(blog.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <BlogForm
            blog={editingBlog}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditingBlog(undefined); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
