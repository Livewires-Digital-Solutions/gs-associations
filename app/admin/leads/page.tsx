'use client';


import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';
import { usePropertyStore } from '@/stores/propertyStore';
import type { LeadStatus } from '@/data/mockData';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  New: 'badge-navy',
  Contacted: 'badge-gold',
  Qualified: 'badge-green',
  Closed: 'badge-gray',
};

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Closed'];

export default function AdminLeads() {
  const { leads, updateLeadStatus, updateLeadNotes } = usePropertyStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);
  const [noteText, setNoteText] = useState('');

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = !search ||
        l.userName.toLowerCase().includes(search.toLowerCase()) ||
        l.userEmail.toLowerCase().includes(search.toLowerCase()) ||
        l.propertyTitle.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    updateLeadStatus(leadId, status);
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status } : null);
    }
    toast.success(`Lead status updated to ${status}`);
  };

  const handleNoteSave = () => {
    if (selectedLead) {
      updateLeadNotes(selectedLead.id, noteText);
      toast.success('Note saved');
    }
  };

  const openLead = (lead: typeof leads[0]) => {
    setSelectedLead(lead);
    setNoteText(lead.notes);
  };

  const sourceColors: Record<string, string> = {
    'Property View': 'badge-navy',
    'Contact Form': 'badge-gold',
    'Loan Inquiry': 'badge-green',
    'Schedule Visit': 'badge-gray',
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-10rem)]">
      {/* Left: Leads table */}
      <div className={`flex flex-col ${selectedLead ? 'flex-1' : 'w-full'} min-w-0`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-surface-900">Lead Management</h1>
            <p className="text-surface-500 text-sm">{leads.length} total leads captured</p>
          </div>
          <button
            onClick={() => toast.success('Export started — CSV will download shortly')}
            className="btn-secondary text-sm gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." className="input pl-10" />
          </div>
          <div className="flex gap-2">
            {(['All', ...statusOptions] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  statusFilter === s ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-surface-600 border-surface-200 hover:border-navy-300'
                }`}
              >
                {s} {s !== 'All' && `(${leads.filter(l => l.status === s).length})`}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-surface-400 mb-3">{filtered.length} leads found</p>

        {/* Table */}
        <div className="table-container flex-1 overflow-auto">
          <table className="w-full">
            <thead className="table-header sticky top-0">
              <tr>
                <th className="table-header-cell">User</th>
                <th className="table-header-cell">Property</th>
                <th className="table-header-cell">Source</th>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr
                  key={lead.id}
                  onClick={() => openLead(lead)}
                  className={`table-row ${selectedLead?.id === lead.id ? 'bg-navy-50' : ''}`}
                >
                  <td className="table-cell">
                    <div>
                      <p className="text-sm font-medium text-surface-900">{lead.userName}</p>
                      <p className="text-xs text-surface-400">{lead.userEmail}</p>
                      <p className="text-xs text-surface-400">{lead.userPhone}</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <p className="text-xs text-surface-700 max-w-36 line-clamp-2">{lead.propertyTitle.split('—')[0].trim()}</p>
                    <p className="text-xs text-surface-400">{lead.propertyLocation}</p>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${sourceColors[lead.source] || 'badge-gray'} text-[10px]`}>{lead.source}</span>
                  </td>
                  <td className="table-cell">
                    <p className="text-xs text-surface-600">{format(new Date(lead.timestamp), 'MMM d, yyyy')}</p>
                    <p className="text-xs text-surface-400">{format(new Date(lead.timestamp), 'h:mm a')}</p>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${statusColors[lead.status]} text-[10px]`}>{lead.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Lead Detail Panel */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-80 flex-shrink-0 bg-white rounded-2xl border border-surface-200 shadow-card-base overflow-y-auto flex flex-col"
          >
            <div className="p-5 border-b border-surface-100 flex items-center justify-between">
              <h3 className="font-semibold text-surface-900">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="w-7 h-7 rounded-lg hover:bg-surface-100 flex items-center justify-center">
                <X className="w-4 h-4 text-surface-500" />
              </button>
            </div>

            <div className="p-5 flex-1 space-y-5">
              {/* Contact */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-400 mb-3">Contact Information</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-surface-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-sm flex-shrink-0">
                      {selectedLead.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">{selectedLead.userName}</p>
                      <p className="text-xs text-surface-500">{selectedLead.userEmail}</p>
                    </div>
                  </div>
                  <a href={`tel:${selectedLead.userPhone}`} className="flex items-center gap-2 p-2.5 rounded-xl text-sm text-navy-700 hover:bg-navy-50 transition-colors font-medium">
                    📞 {selectedLead.userPhone}
                  </a>
                </div>
              </div>

              {/* Property */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-400 mb-2">Property Viewed</p>
                <div className="p-3 bg-surface-50 rounded-xl">
                  <p className="text-sm font-medium text-surface-900 leading-snug">{selectedLead.propertyTitle}</p>
                  <p className="text-xs text-surface-500 mt-1">{selectedLead.propertyLocation}</p>
                  <p className="text-xs text-surface-400 mt-1">{format(new Date(selectedLead.timestamp), 'MMM d, yyyy — h:mm a')}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-400 mb-2">Lead Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedLead.id, s)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        selectedLead.status === s
                          ? 'bg-navy-800 text-white border-navy-800'
                          : 'text-surface-600 border-surface-200 hover:border-navy-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-400 mb-2">Source</p>
                <span className={`badge ${sourceColors[selectedLead.source] || 'badge-gray'} text-xs`}>{selectedLead.source}</span>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-400 mb-2">Internal Notes</p>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Add notes about this lead..."
                  className="input text-sm h-24 resize-none"
                />
                <button onClick={handleNoteSave} className="btn-primary w-full text-sm mt-2">Save Note</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
