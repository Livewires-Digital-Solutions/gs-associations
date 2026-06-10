'use client';


import { useState } from 'react';
import { toast } from 'sonner';
import { Save, Building2, Bell, Shield, Palette, Globe } from 'lucide-react';
import { useAuthStore } from '@/src/stores/authStore';

export default function AdminSettings() {
  const { currentUser } = useAuthStore();
  const [siteName, setSiteName] = useState('GS Associations');
  const [tagline, setTagline] = useState('Premium Real Estate, Hyderabad');
  const [contactEmail, setContactEmail] = useState('info@gsassociations.com');
  const [contactPhone, setContactPhone] = useState('+91 40 6666 7777');
  const [address, setAddress] = useState('Plot 42, Gachibowli Main Road, Financial District, Hyderabad — 500032');
  const [rera, setRera] = useState('P024000RERA001');
  const [notifications, setNotifications] = useState({ emailAlerts: true, smsAlerts: false, dailyDigest: true });
  const [leadCapture, setLeadCapture] = useState({ autoCapture: true, captureOnView: true, captureOnSave: true });

  const handleSave = () => {
    toast.success('Settings saved successfully ✓');
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-surface-900">Platform Settings</h1>
        <p className="text-surface-500 text-sm">Configure your GS Associations platform</p>
      </div>

      <div className="space-y-6">
        {/* Site Info */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-surface-600" />
            <h2 className="font-semibold text-surface-900">Company Information</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label mb-1.5 block">Company Name</label>
                <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="input" />
              </div>
              <div>
                <label className="label mb-1.5 block">Tagline</label>
                <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} className="input" />
              </div>
            </div>
            <div>
              <label className="label mb-1.5 block">RERA Registration Number</label>
              <input type="text" value={rera} onChange={e => setRera(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label mb-1.5 block">Office Address</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} className="input h-16 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label mb-1.5 block">Contact Email</label>
                <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="input" />
              </div>
              <div>
                <label className="label mb-1.5 block">Contact Phone</label>
                <input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="input" />
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Settings */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-surface-600" />
            <h2 className="font-semibold text-surface-900">Lead Capture Settings</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'autoCapture', label: 'Auto Lead Capture', desc: 'Automatically create lead records when users interact with properties' },
              { key: 'captureOnView', label: 'Capture on Property View', desc: 'Record a lead when a logged-in user views a property detail page' },
              { key: 'captureOnSave', label: 'Capture on Property Save', desc: 'Record an additional signal when a user saves a property' },
            ].map(setting => (
              <div key={setting.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-surface-800">{setting.label}</p>
                  <p className="text-xs text-surface-500">{setting.desc}</p>
                </div>
                <button
                  onClick={() => setLeadCapture(p => ({ ...p, [setting.key]: !p[setting.key as keyof typeof leadCapture] }))}
                  className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${
                    leadCapture[setting.key as keyof typeof leadCapture] ? 'bg-navy-700' : 'bg-surface-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                    leadCapture[setting.key as keyof typeof leadCapture] ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-surface-600" />
            <h2 className="font-semibold text-surface-900">Admin Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'emailAlerts', label: 'Email Alerts for New Leads', desc: 'Receive email when new leads are captured' },
              { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive SMS for high-priority leads (Qualified status)' },
              { key: 'dailyDigest', label: 'Daily Digest Report', desc: 'Receive daily summary of leads, views, and activity' },
            ].map(n => (
              <div key={n.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-surface-800">{n.label}</p>
                  <p className="text-xs text-surface-500">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(p => ({ ...p, [n.key]: !p[n.key as keyof typeof notifications] }))}
                  className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${notifications[n.key as keyof typeof notifications] ? 'bg-navy-700' : 'bg-surface-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifications[n.key as keyof typeof notifications] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Info */}
        <div className="card p-6 bg-surface-50">
          <h2 className="font-semibold text-surface-900 mb-3 text-sm">Logged in as</h2>
          <div className="flex items-center gap-3">
            <img src={currentUser?.avatar} alt="" className="w-10 h-10 rounded-full bg-surface-200" />
            <div>
              <p className="font-semibold text-surface-900">{currentUser?.name}</p>
              <p className="text-xs text-surface-500">{currentUser?.email} · Administrator</p>
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
