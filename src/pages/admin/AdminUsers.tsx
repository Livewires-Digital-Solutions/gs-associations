import { useState } from 'react';
import { Search, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { users } from '../../data/mockData';
import { usePropertyStore } from '../../stores/propertyStore';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const { leads } = usePropertyStore();

  const regularUsers = users.filter(u => u.role === 'user');
  const filtered = regularUsers.filter(u =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.location || '').toLowerCase().includes(search.toLowerCase())
  );

  const getUserLeadCount = (userId: string) => leads.filter(l => l.userId === userId).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Users Management</h1>
          <p className="text-surface-500 text-sm">{regularUsers.length} registered users</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="px-3 py-1.5 bg-navy-50 rounded-lg text-navy-700 font-medium">
            {regularUsers.filter(u => u.isVerified).length} Verified
          </div>
          <div className="px-3 py-1.5 bg-gold-50 rounded-lg text-gold-700 font-medium">
            {regularUsers.filter(u => !u.isVerified).length} Unverified
          </div>
        </div>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name, email, or location..." className="input pl-10 max-w-md" />
      </div>

      <div className="table-container">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">User</th>
              <th className="table-header-cell">Phone</th>
              <th className="table-header-cell">Looking For</th>
              <th className="table-header-cell">Budget</th>
              <th className="table-header-cell">Joined</th>
              <th className="table-header-cell">Leads</th>
              <th className="table-header-cell">Saved</th>
              <th className="table-header-cell">Verified</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="table-row">
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-surface-200 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-surface-900">{user.name}</p>
                      <p className="text-xs text-surface-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="table-cell text-sm text-surface-600">{user.phone}</td>
                <td className="table-cell">
                  {user.lookingFor ? (
                    <span className="badge badge-navy text-[10px]">{user.lookingFor}</span>
                  ) : (
                    <span className="text-surface-300 text-xs">—</span>
                  )}
                </td>
                <td className="table-cell text-xs text-surface-600">{user.budget || '—'}</td>
                <td className="table-cell text-xs text-surface-500">
                  {format(new Date(user.joinedDate), 'MMM d, yyyy')}
                </td>
                <td className="table-cell">
                  <span className="font-semibold text-navy-700">{getUserLeadCount(user.id)}</span>
                </td>
                <td className="table-cell text-surface-600">{user.savedProperties.length}</td>
                <td className="table-cell">
                  {user.isVerified ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-surface-300" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
