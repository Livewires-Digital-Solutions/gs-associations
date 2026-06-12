import { create } from 'zustand';
import type { BlogPost, LoanProgram } from '../data/mockData';
import { blogPosts as initialBlogs, loanPrograms as initialLoans } from '../data/mockData';

interface ContentState {
  blogs: BlogPost[];
  loans: LoanProgram[];

  // Blog actions
  addBlog: (blog: Omit<BlogPost, 'id' | 'publishedDate' | 'views'>) => void;
  updateBlog: (id: string, data: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
  toggleBlogFeatured: (id: string) => void;
  incrementBlogView: (id: string) => void;

  // Loan actions
  addLoan: (loan: Omit<LoanProgram, 'id'>) => void;
  updateLoan: (id: string, data: Partial<LoanProgram>) => void;
  deleteLoan: (id: string) => void;
  toggleLoanPopular: (id: string) => void;
}

export const useContentStore = create<ContentState>()((set) => ({
  blogs: initialBlogs,
  loans: initialLoans,

  addBlog: (blogData) => {
    const newBlog: BlogPost = {
      ...blogData,
      id: `blog-${Date.now()}`,
      slug: blogData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      publishedDate: new Date().toISOString().split('T')[0],
      views: 0,
    } as BlogPost;
    set(state => ({ blogs: [newBlog, ...state.blogs] }));
  },

  updateBlog: (id, data) => {
    set(state => ({
      blogs: state.blogs.map(b => b.id === id ? { ...b, ...data } : b),
    }));
  },

  deleteBlog: (id) => {
    set(state => ({ blogs: state.blogs.filter(b => b.id !== id) }));
  },

  toggleBlogFeatured: (id) => {
    set(state => ({
      blogs: state.blogs.map(b => b.id === id ? { ...b, featured: !b.featured } : b),
    }));
  },

  incrementBlogView: (id) => {
    set(state => ({
      blogs: state.blogs.map(b => b.id === id ? { ...b, views: b.views + 1 } : b),
    }));
  },

  addLoan: (loanData) => {
    const newLoan: LoanProgram = { ...loanData, id: `loan-${Date.now()}` };
    set(state => ({ loans: [newLoan, ...state.loans] }));
  },

  updateLoan: (id, data) => {
    set(state => ({
      loans: state.loans.map(l => l.id === id ? { ...l, ...data } : l),
    }));
  },

  deleteLoan: (id) => {
    set(state => ({ loans: state.loans.filter(l => l.id !== id) }));
  },

  toggleLoanPopular: (id) => {
    set(state => ({
      loans: state.loans.map(l => l.id === id ? { ...l, popular: !l.popular } : l),
    }));
  },
}));
