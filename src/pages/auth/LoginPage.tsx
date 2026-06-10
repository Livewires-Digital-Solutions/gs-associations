import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      const user = useAuthStore.getState().currentUser;
      toast.success(`Welcome back, ${user?.name?.split(' ')[0]}! 👋`);
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  const handleDemoLogin = async (type: 'user' | 'admin') => {
    const credentials = {
      user: { email: 'arjun.mehta@gmail.com', password: 'user123' },
      admin: { email: 'admin@gsassociations.com', password: 'admin123' },
    };
    const { email: e, password: p } = credentials[type];
    setEmail(e);
    setPassword(p);
    const result = await login(e, p);
    if (result.success) {
      const user = useAuthStore.getState().currentUser;
      toast.success(`Logged in as ${type === 'admin' ? 'Admin' : 'User'} ✓`);
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — visual */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(245,158,11,0.6), transparent 60%)',
        }} />
        <Link to="/" className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-navy-700 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-white">GS Associations</span>
            <span className="text-xs text-gold-400">Premium Real Estate</span>
          </div>
        </Link>

        <div className="relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
            Welcome Back to<br />Hyderabad's Finest
          </h2>
          <p className="text-white/70 text-sm mb-8">Access your saved properties, track your viewings, and pick up exactly where you left off.</p>
          <div className="space-y-3">
            {['Access 20+ premium properties', 'Save & compare your shortlist', 'Get personalized recommendations', 'Connect with expert advisors'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full bg-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gold-400" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/40 text-xs">© 2024 GS Associations. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-navy-900">GS Associations</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-surface-900 mb-2">Sign In</h1>
            <p className="text-surface-500 text-sm">Enter your credentials to access your account</p>
          </div>

          {/* Demo login buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleDemoLogin('user')}
              disabled={isLoading}
              className="btn-secondary text-xs py-2.5"
            >
              Demo: User Login
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
              className="btn-secondary text-xs py-2.5 border-gold-300 text-gold-700 hover:bg-gold-50"
            >
              Demo: Admin Login
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-surface-200" />
            <span className="text-xs text-surface-400">or sign in with email</span>
            <div className="flex-1 h-px bg-surface-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="arjun@example.com"
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-surface-600 cursor-pointer">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button type="button" className="text-sm text-navy-700 hover:text-navy-900 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-surface-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-navy-700 font-semibold hover:text-navy-900">
              Register for free
            </Link>
          </p>

          <div className="mt-6 p-4 bg-surface-100 rounded-xl">
            <p className="text-xs text-surface-500 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-surface-600">User: arjun.mehta@gmail.com / user123</p>
            <p className="text-xs text-surface-600">Admin: admin@gsassociations.com / admin123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
