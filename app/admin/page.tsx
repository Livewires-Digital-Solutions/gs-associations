'use client';

import Link from 'next/link';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Users, TrendingUp, Eye, ArrowRight,
  ArrowUpRight, Activity
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { usePropertyStore } from '@/src/stores/propertyStore';
import { users } from '@/src/data/mockData';
import { format, subDays } from 'date-fns';

const COLORS = ['#1e2889', '#f59e0b', '#10b981', '#ef4444', '#6366f1'];

export default function AdminDashboard() {
  const { properties, leads } = usePropertyStore();

  // KPIs
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
  const closedLeads = leads.filter(l => l.status === 'Closed').length;

  // Lead trend (last 14 days)
  const leadTrend = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const date = subDays(new Date(), 13 - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const count = leads.filter(l => l.timestamp.startsWith(dateStr)).length;
      return { date: format(date, 'MMM d'), leads: count };
    });
  }, [leads]);

  // Leads by property
  const leadsByProperty = useMemo(() => {
    const counts: Record<string, { title: string; count: number }> = {};
    leads.forEach(l => {
      if (!counts[l.propertyId]) counts[l.propertyId] = { title: l.propertyTitle.split('—')[0].trim(), count: 0 };
      counts[l.propertyId].count++;
    });
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [leads]);

  // Lead status pie
  const statusData = [
    { name: 'New', value: newLeads },
    { name: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length },
    { name: 'Qualified', value: qualifiedLeads },
    { name: 'Closed', value: closedLeads },
  ];

  const kpiCards = [
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Total Leads', value: totalLeads, sub: `${newLeads} new today`, color: 'bg-navy-100 text-navy-700', trend: '+12%' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Properties', value: properties.length, sub: `${properties.filter(p => p.status === 'Available').length} available`, color: 'bg-gold-100 text-gold-700', trend: '+3' },
    { icon: <Users className="w-5 h-5" />, label: 'Registered Users', value: users.filter(u => u.role === 'user').length, sub: '5 joined this week', color: 'bg-emerald-100 text-emerald-700', trend: '+8%' },
    { icon: <Eye className="w-5 h-5" />, label: 'Total Views', value: properties.reduce((a, b) => a + b.views, 0).toLocaleString(), sub: 'across all properties', color: 'bg-purple-100 text-purple-700', trend: '+24%' },
  ];

  const recentLeads = leads.slice(0, 8);

  const statusColors: Record<string, string> = {
    New: 'badge-navy',
    Contacted: 'badge-gold',
    Qualified: 'badge-green',
    Closed: 'badge-gray',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Admin Dashboard</h1>
          <p className="text-surface-500 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <Link href="/admin/leads" className="btn-primary text-sm">
          View All Leads
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpiCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="stat-card"
          >
            <div className={`stat-icon ${card.color}`}>{card.icon}</div>
            <div className="flex-1">
              <p className="text-2xl font-display font-bold text-surface-900">{card.value}</p>
              <p className="text-xs text-surface-500 mt-0.5">{card.label}</p>
              <p className="text-xs text-surface-400 mt-0.5">{card.sub}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-medium">
                <ArrowUpRight className="w-3 h-3" />
                {card.trend} this month
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Lead trend line chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-surface-900">Lead Activity (14 Days)</h2>
              <p className="text-xs text-surface-400">New leads per day</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
              <Activity className="w-3 h-3" />
              Live
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={leadTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e2889" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1e2889" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e7f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="leads" stroke="#1e2889" strokeWidth={2} fill="url(#leadGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead status pie */}
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-2">Leads by Status</h2>
          <p className="text-xs text-surface-400 mb-4">Current pipeline</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e7f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-surface-600">{item.name}</span>
                </div>
                <span className="font-semibold text-surface-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads Table */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-surface-100 flex items-center justify-between">
            <h2 className="font-semibold text-surface-900">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-navy-700 font-medium hover:text-navy-900">View all →</Link>
          </div>
          <div className="divide-y divide-surface-100">
            {recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 text-navy-700 text-xs font-bold">
                  {lead.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900 truncate">{lead.userName}</p>
                  <p className="text-xs text-surface-400 truncate">{lead.propertyTitle.split('—')[0].trim()}</p>
                </div>
                <span className={`badge ${statusColors[lead.status]} text-[10px] flex-shrink-0`}>{lead.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Properties by Leads */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-surface-100 flex items-center justify-between">
            <h2 className="font-semibold text-surface-900">Top Properties by Leads</h2>
            <Link href="/admin/tracking" className="text-xs text-navy-700 font-medium hover:text-navy-900">View tracking →</Link>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={leadsByProperty} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} />
                <YAxis dataKey="title" type="category" tick={{ fontSize: 10, fill: '#9ba3bd' }} tickLine={false} axisLine={false} width={120} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e7f0', fontSize: 12 }} />
                <Bar dataKey="count" fill="#1e2889" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
