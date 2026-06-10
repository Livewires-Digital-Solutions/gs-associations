'use client';


import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { subDays, format } from 'date-fns';
import { TrendingUp, Download } from 'lucide-react';
import { usePropertyStore } from '@/src/stores/propertyStore';
import { users } from '@/src/data/mockData';
import { toast } from 'sonner';

const COLORS = ['#1e2889', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899'];

export default function AdminAnalytics() {
  const { properties, leads } = usePropertyStore();

  // Lead trend — 30 days
  const leadTrend = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const count = leads.filter(l => l.timestamp.startsWith(dateStr)).length;
      const views = properties.reduce((sum, p) => sum + Math.floor(Math.random() * 5), 0);
      return { date: format(date, 'MMM d'), leads: count, views: Math.max(1, views) };
    });
  }, [leads]);

  // Property type distribution
  const typeData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach(p => { counts[p.type] = (counts[p.type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [properties]);

  // Lead status funnel
  const funnelData = [
    { name: 'New', value: leads.filter(l => l.status === 'New').length },
    { name: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length },
    { name: 'Qualified', value: leads.filter(l => l.status === 'Qualified').length },
    { name: 'Closed', value: leads.filter(l => l.status === 'Closed').length },
  ];

  // Revenue proxy (closed leads × avg property price)
  const avgPrice = properties.reduce((s, p) => s + p.price, 0) / properties.length;
  const closedValue = (leads.filter(l => l.status === 'Closed').length * avgPrice / 10000000).toFixed(1);

  const summaryCards = [
    { label: 'Total Lead Value (est.)', value: `₹${closedValue} Cr`, icon: '💰', sub: 'From closed leads' },
    { label: 'Conversion Rate', value: `${((leads.filter(l => l.status === 'Closed').length / leads.length) * 100).toFixed(1)}%`, icon: '📊', sub: 'Lead to close' },
    { label: 'Avg Views per Property', value: Math.round(properties.reduce((s, p) => s + p.views, 0) / properties.length).toLocaleString(), icon: '👁️', sub: 'Across all listings' },
    { label: 'Registered Users', value: users.filter(u => u.role === 'user').length, icon: '👥', sub: 'Total platform users' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Analytics</h1>
          <p className="text-surface-500 text-sm">Platform performance insights</p>
        </div>
        <button
          onClick={() => toast.success('Report export started — PDF will download shortly')}
          className="btn-secondary text-sm gap-2"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {summaryCards.map((card, i) => (
          <div key={i} className="stat-card">
            <div className="text-2xl">{card.icon}</div>
            <div>
              <p className="text-xl font-display font-bold text-surface-900">{card.value}</p>
              <p className="text-xs text-surface-500">{card.label}</p>
              <p className="text-xs text-surface-400">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lead + Views Trend */}
      <div className="card p-6 mb-6">
        <h2 className="font-semibold text-surface-900 mb-1">Lead & View Trends (30 Days)</h2>
        <p className="text-xs text-surface-400 mb-5">Daily lead captures and property views</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={leadTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="leadG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e2889" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1e2889" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="viewG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} interval={4} />
            <YAxis tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e7f0', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="leads" name="Leads" stroke="#1e2889" strokeWidth={2} fill="url(#leadG)" />
            <Area type="monotone" dataKey="views" name="Views" stroke="#f59e0b" strokeWidth={2} fill="url(#viewG)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property type pie */}
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-4">Property Mix</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={typeData} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {typeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e7f0', fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-3">
            {typeData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-surface-600 truncate">{item.name}</span>
                <span className="font-bold text-surface-800 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead funnel */}
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-1">Lead Conversion Funnel</h2>
          <p className="text-xs text-surface-400 mb-5">Pipeline overview</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={funnelData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e7f0', fontSize: 12 }} />
              <Bar dataKey="value" name="Leads" radius={[6, 6, 0, 0]}>
                {funnelData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top properties table */}
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-4">Top 5 Properties by Views</h2>
          <div className="space-y-3">
            {properties.sort((a, b) => b.views - a.views).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-surface-400 w-4">{i + 1}</span>
                <img src={p.images[0]} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-surface-800 truncate">{p.title.split('—')[0].trim()}</p>
                  <div className="h-1.5 bg-surface-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-navy-700 rounded-full" style={{ width: `${(p.views / properties[0].views) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold text-navy-700 flex-shrink-0">{p.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
