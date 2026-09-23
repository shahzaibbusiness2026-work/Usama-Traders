import React, { useState } from 'react';
import {
  Settings,
  Building2,
  ShieldCheck,
  Bell,
  Users,
  CheckCircle2,
  Save,
  Lock,
} from 'lucide-react';

interface SettingsTabProps {
  showToast: (msg: string) => void;
  searchQuery?: string;
  onNavigateTab?: (tab: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  showToast,
  searchQuery,
  onNavigateTab,
}) => {
  // Form states
  const [legalName, setLegalName] = useState('Saleem Traders & Co. (Pvt) Ltd.');
  const [ntn, setNtn] = useState('0819234-7');
  const [strn, setStrn] = useState('03-02-8400-001-19');
  const [headOffice, setHeadOffice] = useState('84 Ferozepur Road, Lahore, Pakistan');
  const [primaryPhone, setPrimaryPhone] = useState('+92 (42) 111-SALEEM');

  // Commercial thresholds
  const [gstRate, setGstRate] = useState('18');
  const [tradeDiscount, setTradeDiscount] = useState('18');
  const [minMargin, setMinMargin] = useState('25');
  const [slabHoldDays, setSlabHoldDays] = useState('14');

  // Notification toggles
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifySmsDispatch, setNotifySmsDispatch] = useState(true);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState(true);
  const [notifyCustomsClearance, setNotifyCustomsClearance] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Enterprise system settings and commercial parameters saved successfully.');
  };

  const teamMembers = [
    {
      name: 'Ahmad Hassan',
      role: 'Executive Director',
      email: 'ahmad@saleemtraders.com',
      badge: 'Super Admin',
    },
    {
      name: 'Tariq Mehmood',
      role: 'Chief Estimator & BOQ Lead',
      email: 'tariq@saleemtraders.com',
      badge: 'Editor / Pricing',
    },
    {
      name: 'Sara Khan',
      role: 'Architectural Partner Liaison',
      email: 'sara.k@saleemtraders.com',
      badge: 'CRM & Samples',
    },
    {
      name: 'Bilal Arshad',
      role: 'Logistics & Warehouse Yard Manager',
      email: 'bilal@saleemtraders.com',
      badge: 'Stock Controller',
    },
  ];

  return (
    <form onSubmit={handleSaveSettings} className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
            System Administration
          </span>
          <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
            Portal Configuration & Enterprise Rules
          </h3>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* 2-Column Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Legal Entity Profile */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
            <Building2 className="w-4 h-4 text-amber-800" />
            <h4 className="font-serif text-lg font-medium text-zinc-900">Legal Entity Profile</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Company Legal Name</label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-amber-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">National Tax # (NTN)</label>
                <input
                  type="text"
                  value={ntn}
                  onChange={(e) => setNtn(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Sales Tax Reg. (STRN)</label>
                <input
                  type="text"
                  value={strn}
                  onChange={(e) => setStrn(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Head Office & Main Showroom</label>
              <input
                type="text"
                value={headOffice}
                onChange={(e) => setHeadOffice(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-amber-800"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Primary UAN Telephone</label>
              <input
                type="text"
                value={primaryPhone}
                onChange={(e) => setPrimaryPhone(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-amber-800"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Commercial & Estimation Rules */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
            <h4 className="font-serif text-lg font-medium text-zinc-900">
              Commercial & Estimation Rules
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Standard GST Rate (%)</label>
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Default Trade Discount (%)</label>
                <input
                  type="number"
                  value={tradeDiscount}
                  onChange={(e) => setTradeDiscount(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Min. Gross Margin (%)</label>
                <input
                  type="number"
                  value={minMargin}
                  onChange={(e) => setMinMargin(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Slab Reservation Hold (Days)</label>
                <input
                  type="number"
                  value={slabHoldDays}
                  onChange={(e) => setSlabHoldDays(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/50 text-amber-900 text-xs">
              <span className="font-semibold">Architect VIP Incentive Rule:</span> Approved partner studios receive an automated 5% milestone rebate on tenders exceeding Rs. 10M.
            </div>
          </div>
        </div>

        {/* Section 3: Notification Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
            <Bell className="w-4 h-4 text-amber-800" />
            <h4 className="font-serif text-lg font-medium text-zinc-900">
              Notification & Dispatch Feeds
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer">
              <div>
                <div className="font-semibold text-zinc-900">Low Stock & Slab Depletion Warnings</div>
                <div className="text-zinc-500 text-[11px]">Send immediate alert when slab count falls under 10</div>
              </div>
              <input
                type="checkbox"
                checked={notifyLowStock}
                onChange={(e) => setNotifyLowStock(e.target.checked)}
                className="w-4 h-4 accent-amber-800 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer">
              <div>
                <div className="font-semibold text-zinc-900">Architect SMS Waybill Notification</div>
                <div className="text-zinc-500 text-[11px]">Automatic TCS tracking SMS upon sample box handover</div>
              </div>
              <input
                type="checkbox"
                checked={notifySmsDispatch}
                onChange={(e) => setNotifySmsDispatch(e.target.checked)}
                className="w-4 h-4 accent-amber-800 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer">
              <div>
                <div className="font-semibold text-zinc-900">Daily Executive Sales & BOQ Digest</div>
                <div className="text-zinc-500 text-[11px]">Compiled PDF briefing sent to executive team at 8:00 AM</div>
              </div>
              <input
                type="checkbox"
                checked={notifyDailyDigest}
                onChange={(e) => setNotifyDailyDigest(e.target.checked)}
                className="w-4 h-4 accent-amber-800 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer">
              <div>
                <div className="font-semibold text-zinc-900">Port Qasim Container Customs Clearance</div>
                <div className="text-zinc-500 text-[11px]">Notify operations desk upon GD out-of-charge approval</div>
              </div>
              <input
                type="checkbox"
                checked={notifyCustomsClearance}
                onChange={(e) => setNotifyCustomsClearance(e.target.checked)}
                className="w-4 h-4 accent-amber-800 rounded"
              />
            </label>
          </div>
        </div>

        {/* Section 4: Authorized Team & Roles */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
            <Users className="w-4 h-4 text-amber-800" />
            <h4 className="font-serif text-lg font-medium text-zinc-900">
              Authorized Team & Access Roles
            </h4>
          </div>

          <div className="space-y-2.5">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-zinc-900">{member.name}</div>
                  <div className="text-[11px] text-zinc-500">{member.role}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">{member.email}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-200 text-zinc-800">
                  {member.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
