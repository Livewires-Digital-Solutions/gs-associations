import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import HomePage from './pages/public/HomePage';
import PropertiesPage from './pages/public/PropertiesPage';
import PropertyDetailPage from './pages/public/PropertyDetailPage';
import LoansPage from './pages/public/LoansPage';
import BlogListPage from './pages/public/BlogListPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User pages
import UserDashboard from './pages/user/UserDashboard';
import SavedProperties from './pages/user/SavedProperties';
import RecentlyViewed from './pages/user/RecentlyViewed';
import ProfileSettings from './pages/user/ProfileSettings';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminTracking from './pages/admin/AdminTracking';
import AdminLeads from './pages/admin/AdminLeads';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBlog from './pages/admin/AdminBlog';
import AdminLoans from './pages/admin/AdminLoans';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Route guards
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentUser } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentUser } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to={currentUser?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="properties/:id" element={<PropertyDetailPage />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="login" element={<RedirectIfAuth><LoginPage /></RedirectIfAuth>} />
      <Route path="register" element={<RedirectIfAuth><RegisterPage /></RedirectIfAuth>} />

      {/* User Portal */}
      <Route path="dashboard" element={<RequireAuth><UserLayout /></RequireAuth>}>
        <Route index element={<UserDashboard />} />
        <Route path="saved" element={<SavedProperties />} />
        <Route path="history" element={<RecentlyViewed />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      {/* Admin Portal */}
      <Route path="admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="tracking" element={<AdminTracking />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="loans" element={<AdminLoans />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
