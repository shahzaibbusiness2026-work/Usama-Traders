import React, { useState } from 'react';
import {
  Users,
  Search,
  Building2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Share2,
  Edit3,
  X,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { ArchitectPartner } from '../../../types';

interface CustomersTabProps {
  architects: ArchitectPartner[];
  onLogMeeting: (architectId: string, note: string) => void;
  showToast: (msg: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const CustomersTab: React.FC<CustomersTabProps> = ({
  architects,
  onLogMeeting,
  showToast,
  searchQuery: externalSearchQuery,
  onSearchChange,
  onNavigateTab,
}) => {
  const [selectedTier, setSelectedTier] = useState('All');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [activeNoteModal, setActiveNoteModal] = useState<ArchitectPartner | null>(null);
  const [meetingNote, setMeetingNote] = useState('');

  const currentSearch = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const handleSearchChange = (val: string) => {
    setInternalSearchQuery(val);
    onSearchChange?.(val);
  };

  const tiers = ['All', 'Platinum Partner', 'Gold Specifier', 'Silver Member'];

  const filteredArchitects = architects.filter((a) => {
    if (selectedTier !== 'All' && a.tier !== selectedTier) return false;
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      return (
        a.firmName.toLowerCase().includes(q) ||
        a.contactPerson.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.specialty.toLowerCase().includes(q) ||
        a.tier.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getTierBadge = (tier: ArchitectPartner['tier']) => {
    switch (tier) {
      case 'Platinum Partner':
        return 'bg-amber-50 text-amber-900 border-amber-300 font-semibold';
      case 'Gold Specifier':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200 font-semibold';
      case 'Silver Member':
        return 'bg-zinc-100 text-zinc-700 border-zinc-200 font-medium';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  const handleSendCatalog = (arch: ArchitectPartner) => {
    showToast(`VIP Digital Spec Sheet & Catalog sent to ${arch.contactPerson} (${arch.email})`);
  };

  const handleSaveNote = () => {
    if (!activeNoteModal || !meetingNote.trim()) return;
    onLogMeeting(activeNoteModal.id, meetingNote);
    showToast(`Consultation note recorded for ${activeNoteModal.firmName}`);
    setMeetingNote('');
    setActiveNoteModal(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top CRM Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Partner Studios</span>
            <Building2 className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              148 Firms
            </div>
            <div className="text-xs text-zinc-500 mt-1">Lahore, Islamabad & Karachi</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Active Spec Projects</span>
            <Users className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              42 Sites
            </div>
            <div className="text-xs text-zinc-500 mt-1">Residential & Commercial</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>VIP Platinum Tier</span>
            <Sparkles className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-amber-800 font-sans">
              16 Top Studios
            </div>
            <div className="text-xs text-zinc-500 mt-1">Priority sample and slab holding</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>YTD Specification Value</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-emerald-700 font-sans">
              Rs. 480M+
            </div>
            <div className="text-xs text-zinc-500 mt-1">Procured through Saleem Traders</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedTier === t
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px] flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search by firm, architect or city..."
              value={currentSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:border-amber-800 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            {currentSearch && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Directory Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArchitects.map((arch) => (
          <div
            key={arch.id}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className={`text-[11px] px-2.5 py-0.5 rounded-full border ${getTierBadge(
                    arch.tier
                  )}`}
                >
                  {arch.tier}
                </span>
                <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  {arch.city}
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium text-zinc-900 group-hover:text-amber-800 transition-colors">
                {arch.firmName}
              </h3>
              <p className="text-xs text-zinc-600 font-medium mt-0.5">{arch.contactPerson}</p>
              <p className="text-[11px] text-zinc-400">{arch.role}</p>

              <p className="text-xs text-zinc-600 mt-2.5 pt-2.5 border-t border-zinc-100 line-clamp-2">
                {arch.specialty}
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Active Projects</span>
                <span className="font-bold text-zinc-900 font-mono text-sm">
                  {arch.activeProjects} Active
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Lifetime Spec</span>
                <span className="font-bold text-amber-800 font-mono text-sm">
                  {arch.lifetimeBOQValue}
                </span>
              </div>
            </div>

            {/* Contact & Actions */}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${arch.phone}`}
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                  title={`Call ${arch.phone}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`mailto:${arch.email}`}
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                  title={`Email ${arch.email}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleSendCatalog(arch)}
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-amber-50 hover:text-amber-800 text-zinc-700 transition-colors"
                  title="Send Digital Catalog & Finish Guide"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveNoteModal(arch);
                  setMeetingNote('');
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Log Note</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Log Consultation Note Modal */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setActiveNoteModal(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 border border-zinc-200 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-serif text-xl font-medium text-zinc-900">
                Architect Consultation Log
              </h3>
              <button
                onClick={() => setActiveNoteModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-semibold text-zinc-900">{activeNoteModal.firmName}</div>
              <div className="text-zinc-500">Contact: {activeNoteModal.contactPerson}</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">Meeting / Call Summary</label>
              <textarea
                rows={4}
                value={meetingNote}
                onChange={(e) => setMeetingNote(e.target.value)}
                placeholder="Discussed stone slab specifications for upcoming DHA Villa, requested 3 bookmatched samples..."
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-800 focus:outline-none focus:border-amber-800 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setActiveNoteModal(null)}
                className="px-4 py-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-xl text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                disabled={!meetingNote.trim()}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Save Consultation Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
