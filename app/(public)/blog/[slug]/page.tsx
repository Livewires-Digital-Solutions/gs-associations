'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { getBlogPost, getBlogPosts, incrementBlogView } from '@/lib/db/blogs';
import { toast } from 'sonner';
import InitialAvatar from '@/components/ui/InitialAvatar';
import type { BlogPost } from '@/data/mockData';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getBlogPost(slug).then(async (b) => {
      setBlog(b);
      if (b) {
        await incrementBlogView(b.id);
        const all = await getBlogPosts();
        setRelated(all.filter(x => x.slug !== slug && x.category === b.category).slice(0, 3));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (!blog) {
    return (
      <div className="pt-32 pb-20 text-center container-app">
        <h2 className="text-2xl font-bold text-surface-900 mb-4">Article not found</h2>
        <Link href="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  // Convert markdown-like content to HTML paragraphs
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('**') && block.endsWith('**')) {
        return <h3 key={i} className="font-display font-bold text-xl text-surface-900 mt-8 mb-3">{block.replace(/\*\*/g, '')}</h3>;
      }
      if (block.startsWith('**')) {
        // Bold heading within text
        const parts = block.split('**');
        return (
          <p key={i} className="text-surface-700 leading-relaxed mb-4">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        );
      }
      if (block.match(/^\d+\./)) {
        // Numbered list
        const items = block.split('\n').filter(l => l.trim());
        return (
          <ol key={i} className="list-decimal list-inside space-y-2 mb-4 text-surface-700 text-sm leading-relaxed">
            {items.map((item, j) => <li key={j}>{item.replace(/^\d+\.\s*\*?\*?/, '').replace(/\*\*/g, '')}</li>)}
          </ol>
        );
      }
      if (block.startsWith('-')) {
        const items = block.split('\n').filter(l => l.startsWith('-'));
        return (
          <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-surface-700 text-sm leading-relaxed">
            {items.map((item, j) => <li key={j}>{item.replace(/^-\s*\*?\*?/, '').replace(/\*\*/g, '')}</li>)}
          </ul>
        );
      }
      return <p key={i} className="text-surface-700 leading-relaxed mb-4 text-sm">{block.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="container-app max-w-4xl mb-8">
        <Link href="/blog" className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      <article className="container-app max-w-4xl">
        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden h-80 md:h-[480px] mb-10">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-surface-500">
          <span className="badge badge-navy">{blog.category}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blog.publishedDate}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blog.readTime} min read</span>
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{blog.views.toLocaleString()} views</span>
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}
            className="flex items-center gap-1 hover:text-surface-900 transition-colors ml-auto"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-surface-900 leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-surface-100">
          <InitialAvatar name={blog.author} size={48} />
          <div>
            <p className="font-semibold text-surface-900">{blog.author}</p>
            <p className="text-sm text-surface-500">Financial Advisor at GS Associates</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose-like mb-12">
          {renderContent(blog.content)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-surface-100">
          {blog.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-surface-100 text-surface-600 rounded-lg text-xs font-medium">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-navy-800 p-8 text-white text-center mb-12">
          <h3 className="font-display text-xl font-bold mb-2">Ready to Start Your Property Journey?</h3>
          <p className="text-white/70 text-sm mb-5">Browse our curated property listings or speak to an advisor today.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/properties" className="btn-gold">
              Explore Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-ghost text-white hover:bg-white/10 border border-white/20">
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-surface-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(b => (
                <Link href={`/blog/${b.slug}`} className="card card-hover block group overflow-hidden">
                  <div className="h-36 overflow-hidden">
                    <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <span className="badge badge-navy text-[10px] mb-2">{b.category}</span>
                    <h3 className="text-sm font-semibold text-surface-900 line-clamp-2 leading-snug">{b.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
