import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { usePropertyStore } from '../../stores/propertyStore';

export default function AdminTracking() {
  const { leads, properties } = usePropertyStore();
  const [search, setSearch] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('All');

  const viewLeads = leads.filter(l => l.source === 'Property View');

  const filtered = useMemo(() => {
    return viewLeads.filter(l => {
      const matchesSearch = !search ||
        l.userName.toLowerCase().includes(search.toLowerCase()) ||
        l.propertyTitle.toLowerCase().includes(search.toLowerCase());
      const matchesProp = propertyFilter === 'All' || l.propertyId === propertyFilter;
      return matchesSearch && matchesProp;
    });
  }, [viewLeads, search, propertyFilter]);

  const propertyOptions = [...new Set(viewLeads.map(l => l.propertyId))].map(id => ({
    id,
    title: viewLeads.find(l => l.propertyId === id)?.propertyTitle.split('—')[0].trim() || id,
  }));

  // Most viewed properties
  const viewsByProperty = properties
    .filter(p => p.views > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-surface-900">Property View Tracking</h1>
        <p className="text-surface-500 text-sm">{viewLeads.length} total property views tracked</p>
      </div>

      {/* Top viewed properties */}
      <div className="card p-6 mb-8">
        <h2 className="font-semibold text-surface-900 mb-4">Most Viewed Properties</h2>
        <div className="space-y-3">
          {viewsByProperty.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4">
              <span className="text-sm font-bold text-surface-400 w-5 text-center">{i + 1}</span>
              <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-900 truncate">{p.title}</p>
                <p className="text-xs text-surface-400">{p.location}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div>
                  <p className="text-sm font-bold text-navy-800 text-right">{p.views.toLocaleString()}</p>
                  <p className="text-xs text-surface-400">views</p>
                </div>
                <div className="w-24 h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-navy-700 rounded-full"
                    style={{ width: `${(p.views / viewsByProperty[0].views) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View log */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user or property..." className="input pl-10" />
        </div>
        <select value={propertyFilter} onChange={e => setPropertyFilter(e.target.value)} className="input max-w-64 text-sm">
          <option value="All">All Properties</option>
          {propertyOptions.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">User</th>
              <th className="table-header-cell">Property Viewed</th>
              <th className="table-header-cell">Location</th>
              <th className="table-header-cell">Date & Time</th>
              <th className="table-header-cell">Lead Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(lead => (
              <tr key={lead.id} className="table-row">
                <td className="table-cell">
                  <div>
                    <p className="text-sm font-medium text-surface-900">{lead.userName}</p>
                    <p className="text-xs text-surface-400">{lead.userEmail}</p>
                    <p className="text-xs text-surface-400">{lead.userPhone}</p>
                  </div>
                </td>
                <td className="table-cell">
                  <p className="text-sm text-surface-700 max-w-48 line-clamp-2">{lead.propertyTitle}</p>
                </td>
                <td className="table-cell text-sm text-surface-600">{lead.propertyLocation}</td>
                <td className="table-cell">
                  <p className="text-sm text-surface-700">{format(new Date(lead.timestamp), 'MMM d, yyyy')}</p>
                  <p className="text-xs text-surface-400">{format(new Date(lead.timestamp), 'h:mm a')}</p>
                </td>
                <td className="table-cell">
                  <span className={`badge text-[10px] ${
                    lead.status === 'New' ? 'badge-navy' :
                    lead.status === 'Contacted' ? 'badge-gold' :
                    lead.status === 'Qualified' ? 'badge-green' : 'badge-gray'
                  }`}>{lead.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surface-500 text-sm">No view records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
