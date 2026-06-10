import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Clock, Eye, ArrowRight, TrendingUp, Building2, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { usePropertyStore } from '../../stores/propertyStore';
import PropertyCard from '../../components/property/PropertyCard';

export default function UserDashboard() {
  const { currentUser } = useAuthStore();
  const { properties, savedPropertyIds, viewedPropertyIds, leads } = usePropertyStore();

  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id));
  const recentlyViewed = viewedPropertyIds.slice(0, 4).map(id => properties.find(p => p.id === id)).filter(Boolean) as typeof properties;
  const userLeads = leads.filter(l => l.userId === currentUser?.id);
  const recommended = properties.filter(p => !savedPropertyIds.includes(p.id) && p.featured).slice(0, 3);

  const statCards = [
    { icon: <Heart className="w-5 h-5" />, label: 'Saved Properties', value: savedPropertyIds.length, color: 'bg-red-100 text-red-600', link: '/dashboard/saved' },
    { icon: <Eye className="w-5 h-5" />, label: 'Properties Viewed', value: viewedPropertyIds.length, color: 'bg-navy-100 text-navy-600', link: '/dashboard/history' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Active Inquiries', value: userLeads.length, color: 'bg-gold-100 text-gold-700', link: '/properties' },
    { icon: <Building2 className="w-5 h-5" />, label: 'New Listings', value: 4, color: 'bg-emerald-100 text-emerald-600', link: '/properties' },
  ];

  return (
    <div>
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(245,158,11,0.5), transparent 60%)',
        }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-gold-400 text-sm font-medium mb-1">Welcome back 👋</p>
            <h1 className="font-display text-2xl font-bold text-white mb-2">
              {currentUser?.name || 'User'}
            </h1>
            <p className="text-white/60 text-sm">
              {savedPropertyIds.length === 0
                ? "You haven't saved any properties yet. Start exploring!"
                : `You have ${savedPropertyIds.length} saved ${savedPropertyIds.length === 1 ? 'property' : 'properties'} and ${viewedPropertyIds.length} recently viewed.`}
            </p>
          </div>
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-full bg-navy-700 hidden md:block"
          />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link to={card.link} className="card p-5 block hover:border-navy-200 transition-all group">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                {card.icon}
              </div>
              <div className="text-2xl font-display font-bold text-surface-900 mb-0.5">{card.value}</div>
              <div className="text-xs text-surface-500">{card.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-surface-400" />
              <h2 className="font-display font-semibold text-surface-900">Recently Viewed</h2>
            </div>
            <Link to="/dashboard/history" className="text-sm text-navy-700 font-medium hover:text-navy-900 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentlyViewed.map(p => (
              <PropertyCard key={p.id} property={p} variant="horizontal" />
            ))}
          </div>
        </section>
      )}

      {/* Saved Properties preview */}
      {savedProperties.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <h2 className="font-display font-semibold text-surface-900">Saved Properties</h2>
            </div>
            <Link to="/dashboard/saved" className="text-sm text-navy-700 font-medium hover:text-navy-900 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProperties.slice(0, 3).map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recommended */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-4 h-4 text-gold-500" />
          <h2 className="font-display font-semibold text-surface-900">Recommended for You</h2>
        </div>
        {recommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommended.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="text-surface-500 text-sm mb-4">Complete your profile to get personalized recommendations</p>
            <Link to="/dashboard/profile" className="btn-primary text-sm">Complete Profile</Link>
          </div>
        )}
      </section>
    </div>
  );
}
