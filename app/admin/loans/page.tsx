'use client';


import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, X, Check } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { toast } from 'sonner';
import type { LoanProgram } from '@/data/mockData';

function LoanForm({ loan, onSave, onClose }: { loan?: LoanProgram; onSave: (data: Partial<LoanProgram>) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    name: loan?.name || '',
    type: loan?.type || 'Residential',
    bankName: loan?.bankName || '',
    interestRate: loan?.interestRate || '',
    maxAmount: loan?.maxAmount || '',
    tenure: loan?.tenure || '',
    processingFee: loan?.processingFee || '',
    eligibility: loan?.eligibility || '',
    features: loan?.features?.join('\n') || '',
    overview: loan?.overview || '',
    benefits: loan?.benefits?.join('\n') || '',
    documents: loan?.documents?.join('\n') || '',
    popular: loan?.popular || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      features: form.features.split('\n').filter(Boolean),
      benefits: form.benefits ? form.benefits.split('\n').filter(Boolean) : undefined,
      documents: form.documents ? form.documents.split('\n').filter(Boolean) : undefined,
      logo: loan?.logo || '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-xl shadow-card-hover"
      >
        <div className="flex items-center justify-between p-6 border-b border-surface-100">
          <h2 className="font-display font-semibold text-xl">{loan ? 'Edit Loan Program' : 'New Loan Program'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-surface-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Program Name *</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="label mb-1.5 block">Bank / Provider</label>
              <input type="text" value={form.bankName} onChange={e => setForm(p => ({ ...p, bankName: e.target.value }))} className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Loan Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="input text-sm">
                {['Residential', 'Commercial', 'Plot', 'Government Scheme', 'NRI', 'Balance Transfer', 'Improvement', 'Affordable'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label mb-1.5 block">Interest Rate</label>
              <input type="text" value={form.interestRate} onChange={e => setForm(p => ({ ...p, interestRate: e.target.value }))} placeholder="8.35% - 9.15% p.a." className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Max Amount</label>
              <input type="text" value={form.maxAmount} onChange={e => setForm(p => ({ ...p, maxAmount: e.target.value }))} placeholder="₹5 Crore" className="input" />
            </div>
            <div>
              <label className="label mb-1.5 block">Max Tenure</label>
              <input type="text" value={form.tenure} onChange={e => setForm(p => ({ ...p, tenure: e.target.value }))} placeholder="Up to 30 years" className="input" />
            </div>
          </div>
          <div>
            <label className="label mb-1.5 block">Processing Fee</label>
            <input type="text" value={form.processingFee} onChange={e => setForm(p => ({ ...p, processingFee: e.target.value }))} className="input" />
          </div>
          <div>
            <label className="label mb-1.5 block">Eligibility</label>
            <textarea value={form.eligibility} onChange={e => setForm(p => ({ ...p, eligibility: e.target.value }))} className="input h-16 resize-none" />
          </div>
          <div>
            <label className="label mb-1.5 block">Features (one per line)</label>
            <textarea value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} className="input h-24 resize-none" placeholder="No prepayment penalty&#10;Balance transfer facility" />
          </div>
          <div>
            <label className="label mb-1.5 block">Overview</label>
            <textarea value={form.overview} onChange={e => setForm(p => ({ ...p, overview: e.target.value }))} className="input h-20 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Benefits (one per line)</label>
              <textarea value={form.benefits} onChange={e => setForm(p => ({ ...p, benefits: e.target.value }))} className="input h-24 resize-none" />
            </div>
            <div>
              <label className="label mb-1.5 block">Documents (one per line)</label>
              <textarea value={form.documents} onChange={e => setForm(p => ({ ...p, documents: e.target.value }))} className="input h-24 resize-none" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.popular} onChange={e => setForm(p => ({ ...p, popular: e.target.checked }))} className="rounded" />
            <span className="text-sm font-medium text-surface-700">Mark as Most Popular</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1"><Check className="w-4 h-4" />{loan ? 'Update Program' : 'Add Program'}</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminLoans() {
  const { loans, addLoan, updateLoan, deleteLoan, toggleLoanPopular } = useContentStore();
  const [showForm, setShowForm] = useState(false);
  const [editingLoan, setEditingLoan] = useState<LoanProgram | undefined>();

  const handleSave = (data: Partial<LoanProgram>) => {
    if (editingLoan) {
      updateLoan(editingLoan.id, data);
      toast.success('Loan program updated');
    } else {
      addLoan(data as Omit<LoanProgram, 'id'>);
      toast.success('Loan program added');
    }
    setShowForm(false);
    setEditingLoan(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this loan program?')) {
      deleteLoan(id);
      toast.success('Loan program deleted');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Loan Management</h1>
          <p className="text-surface-500 text-sm">{loans.length} loan programs available</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingLoan(undefined); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      <div className="table-container">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Program</th>
              <th className="table-header-cell">Type</th>
              <th className="table-header-cell">Interest Rate</th>
              <th className="table-header-cell">Max Amount</th>
              <th className="table-header-cell">Tenure</th>
              <th className="table-header-cell">Popular</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan.id} className="table-row">
                <td className="table-cell">
                  <p className="text-sm font-medium text-surface-900">{loan.name}</p>
                  <p className="text-xs text-surface-400">{loan.bankName}</p>
                </td>
                <td className="table-cell"><span className="badge badge-navy text-[10px]">{loan.type}</span></td>
                <td className="table-cell text-sm text-surface-700">{loan.interestRate}</td>
                <td className="table-cell text-sm font-semibold text-navy-800">{loan.maxAmount}</td>
                <td className="table-cell text-sm text-surface-600">{loan.tenure}</td>
                <td className="table-cell">
                  <button onClick={() => toggleLoanPopular(loan.id)} className={`w-8 h-4 rounded-full transition-colors ${loan.popular ? 'bg-gold-500' : 'bg-surface-300'}`}>
                    <div className="w-3 h-3 bg-white rounded-full mx-auto" />
                  </button>
                </td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingLoan(loan); setShowForm(true); }} className="w-7 h-7 rounded-lg hover:bg-navy-50 flex items-center justify-center text-navy-600">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(loan.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <LoanForm
            loan={editingLoan}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditingLoan(undefined); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
