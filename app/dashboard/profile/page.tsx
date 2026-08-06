'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Save, Camera, Shield, Bell, Trash2, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import PhoneInput from '@/components/ui/PhoneInput';

const budgetOptions = ['Under ₹50 Lakhs', '₹50L – ₹1 Crore', '₹1Cr – ₹2 Crore', '₹2Cr – ₹5 Crore', '₹5 Crore+'];
const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Row House', 'Penthouse'];

export default function ProfileSettings() {
  const router = useRouter();
  const { currentUser, updateProfile, deleteAccount } = useAuthStore();
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    budget: currentUser?.budget || '',
    location: currentUser?.location || '',
    lookingFor: currentUser?.lookingFor || '',
  });
  const [notifications, setNotifications] = useState({ newListings: true, priceDrops: true, marketUpdates: false });
  const [saved, setSaved] = useState(false);
  const [phoneValid, setPhoneValid] = useState(true); // true by default since it's pre-filled from user profile
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      toast.error('Please enter a valid full name');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!phoneValid) {
      toast.error('Please enter a valid phone number for the selected country');
      return;
    }
    updateProfile(form);
    setSaved(true);
    toast.success('Profile updated successfully');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    const result = await deleteAccount();
    setDeleteLoading(false);
    if (result.success) {
      toast.success('Your account has been deleted.');
      router.push('/');
    } else {
      toast.error(result.error || 'Failed to delete account. Please try again.');
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-surface-900">Profile Settings</h1>
        <p className="text-surface-500 text-sm mt-1">Manage your account information and preferences</p>
      </div>

      {/* Avatar section */}
      <div className="card p-6 mb-6 flex items-center gap-5">
        <div className="relative">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-20 h-20 rounded-full bg-surface-200"
          />
          <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-navy-800 text-white flex items-center justify-center shadow-sm hover:bg-navy-700 transition-colors">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-surface-900">{currentUser?.name}</p>
          <p className="text-sm text-surface-500">{currentUser?.email}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-600 font-medium">{currentUser?.isVerified ? 'Verified Account' : 'Unverified'}</span>
          </div>
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-5">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value.replace(/[^a-zA-Z\s'.\-]/g, '') }))} className="input" />
            </div>
            <div>
              <label className="label mb-1.5 block">Phone Number</label>
              <PhoneInput
                value={form.phone}
                onChange={(val, valid) => {
                  setForm(p => ({ ...p, phone: val }));
                  setPhoneValid(valid);
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label mb-1.5 block">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-surface-900 mb-5">Property Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label mb-1.5 block">Preferred Location</label>
              <input type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. OMR, Chennai" className="input" />
            </div>
            <div>
              <label className="label mb-1.5 block">Budget Range</label>
              <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} className="input">
                <option value="">Select budget...</option>
                {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="label mb-2 block">Looking For</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, lookingFor: type }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      form.lookingFor === type ? 'bg-navy-800 text-white border-navy-800' : 'bg-surface-50 text-surface-600 border-surface-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-surface-600" />
            <h2 className="font-semibold text-surface-900">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'newListings', label: 'New Property Listings', desc: 'Get notified when new properties matching your criteria are listed' },
              { key: 'priceDrops', label: 'Price Drop Alerts', desc: 'Receive alerts when prices drop on properties you\'ve viewed' },
              { key: 'marketUpdates', label: 'Market Updates', desc: 'Weekly market trend reports and investment insights' },
            ].map(pref => (
              <div key={pref.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-surface-800">{pref.label}</p>
                  <p className="text-xs text-surface-500">{pref.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications(p => ({ ...p, [pref.key]: !p[pref.key as keyof typeof notifications] }))}
                  className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${
                    notifications[pref.key as keyof typeof notifications] ? 'bg-navy-700' : 'bg-surface-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                    notifications[pref.key as keyof typeof notifications] ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary gap-2">
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger text-sm gap-2 flex items-center"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </form>

      {/* Delete Account Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-surface-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-surface-900 mb-2">Delete Account?</h2>
              <p className="text-surface-500 text-sm mb-1">
                This action is <span className="font-semibold text-red-600">permanent and irreversible</span>.
              </p>
              <p className="text-surface-400 text-sm mb-8">
                All your saved properties, profile data, and history will be permanently removed.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-surface-200 text-surface-700 font-semibold hover:border-surface-300 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {deleteLoading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Deleting...</>
                  ) : (
                    <><Trash2 className="w-4 h-4" /> Yes, Delete My Account</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
