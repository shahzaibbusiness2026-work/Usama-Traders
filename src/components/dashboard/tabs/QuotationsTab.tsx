import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  ArrowRight,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  X,
  FileDown,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { BOQProject } from '../../../types';

interface QuotationsTabProps {
  boqList: BOQProject[];
  onUpdateStage: (id: string, newStage: BOQProject['stage']) => void;
  onOpenNewQuoteModal: () => void;
  showToast: (msg: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const QuotationsTab: React.FC<QuotationsTabProps> = ({
  boqList,
  onUpdateStage,
  onOpenNewQuoteModal,
  showToast,
  searchQuery: externalSearchQuery,
  onSearchChange,
  onNavigateTab,
}) => {
  const [selectedStage, setSelectedStage] = useState('All');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [activeBOQModal, setActiveBOQModal] = useState<BOQProject | null>(null);

  const currentSearch = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const handleSearchChange = (val: string) => {
    setInternalSearchQuery(val);
    onSearchChange?.(val);
  };

  const stages = [
    'All',
    'Negotiation',
    'Quotation Sent',
    'Design Review',
    'Client Review',
  ];

  const filteredBOQs = boqList.filter((b) => {
    if (selectedStage !== 'All' && b.stage !== selectedStage) return false;
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      return (
        b.projectName.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.number.toLowerCase().includes(q) ||
        b.stage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPipelineValue = boqList.reduce((acc, curr) => acc + curr.value, 0);

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'Negotiation':
        return 'bg-amber-50 text-amber-800 border-amber-200/60';
      case 'Quotation Sent':
        return 'bg-sky-50 text-sky-800 border-sky-200/60';
      case 'Design Review':
        return 'bg-purple-50 text-purple-800 border-purple-200/60';
      case 'Client Review':
        return 'bg-zinc-100 text-zinc-800 border-zinc-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const handleDownloadPDF = (boq: BOQProject) => {
    showToast(`Downloading Official BOQ Specification PDF for ${boq.projectName}...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Active Pipeline Value</span>
            <FileText className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              Rs. {(totalPipelineValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-zinc-500 mt-1">Across 10 key architectural projects</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Average Deal Size</span>
            <Building2 className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              Rs. 12.8M
            </div>
            <div className="text-xs text-zinc-500 mt-1">Commercial & Luxury Residential</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Spec Win Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-emerald-700 font-sans">
              68.4%
            </div>
            <div className="text-xs text-zinc-500 mt-1">+4.2% vs previous quarter</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Quick Action</span>
            <Plus className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <button
              onClick={onOpenNewQuoteModal}
              className="w-full py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New BOQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Stage Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {stages.map((stg) => {
              const count =
                stg === 'All'
                  ? boqList.length
                  : boqList.filter((b) => b.stage === stg).length;
              return (
                <button
                  key={stg}
                  onClick={() => setSelectedStage(stg)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedStage === stg
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  <span>{stg}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      selectedStage === stg ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search by project name or city..."
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

      {/* Quotations Master Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
              <tr>
                <th className="py-3.5 px-6 w-14">Ref #</th>
                <th className="py-3.5 px-6">Project & Scope</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6 text-right">Value (PKR)</th>
                <th className="py-3.5 px-6 text-center">Pipeline Stage</th>
                <th className="py-3.5 px-6">Last Activity</th>
                <th className="py-3.5 px-6 text-center w-36">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {filteredBOQs.map((boq) => (
                <tr key={boq.id} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-4 px-6 text-zinc-400 font-mono text-xs font-semibold">
                    #{boq.number}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-zinc-900 text-sm">{boq.projectName}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      Architectural Bill of Quantities
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-zinc-700">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{boq.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-mono">
                    <div className="font-bold text-sm text-zinc-900">
                      Rs. {boq.formattedValue}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium">Est. Margin ~38%</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <select
                      value={boq.stage}
                      onChange={(e) => {
                        const newStage = e.target.value as BOQProject['stage'];
                        onUpdateStage(boq.id, newStage);
                        showToast(`Updated ${boq.projectName} to stage: ${newStage}`);
                      }}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${getStageBadge(
                        boq.stage
                      )}`}
                    >
                      <option value="Negotiation">Negotiation</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="Design Review">Design Review</option>
                      <option value="Client Review">Client Review</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-zinc-500 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{boq.lastUpdate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setActiveBOQModal(boq)}
                        className="p-1.5 text-zinc-600 hover:text-amber-800 hover:bg-zinc-100 rounded-lg transition-colors"
                        title="View Full Bill of Quantities"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(boq)}
                        className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                        title="Download Specification PDF"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOQ Detail Modal */}
      {activeBOQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setActiveBOQModal(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200 animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 font-sans">
                  PROPOSAL SPECIFICATION #{activeBOQModal.number}
                </span>
                <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-1">
                  {activeBOQModal.projectName}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{activeBOQModal.location} • Saleem Traders Enterprise Sales</span>
                </p>
              </div>
              <button
                onClick={() => setActiveBOQModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spec Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Itemized Schedule of Finishes
              </h4>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80 space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                  <span className="font-semibold text-zinc-800">
                    Italian Calacatta Gold Marble Slabs (20mm Polished)
                  </span>
                  <span className="font-mono font-bold text-zinc-900">
                    Rs. {(activeBOQModal.value * 0.45).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                  <span className="font-semibold text-zinc-800">
                    Roca The Gap Rimless Sanitaryware Sets (Complete Kit)
                  </span>
                  <span className="font-mono font-bold text-zinc-900">
                    Rs. {(activeBOQModal.value * 0.3).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                  <span className="font-semibold text-zinc-800">
                    Grohe Thermostatic Brassware & Concealed Rain Showers
                  </span>
                  <span className="font-mono font-bold text-zinc-900">
                    Rs. {(activeBOQModal.value * 0.25).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 text-sm">
                  <span className="font-bold text-zinc-900">Total Specification Value:</span>
                  <span className="font-mono font-bold text-amber-800 text-base">
                    Rs. {activeBOQModal.formattedValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms and Commercial info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-1">
                <span className="text-[11px] font-semibold text-zinc-500">Payment Milestones</span>
                <p className="font-medium text-zinc-800">
                  50% Advance with PO, 40% on dispatch, 10% on handover.
                </p>
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-1">
                <span className="text-[11px] font-semibold text-zinc-500">Fulfillment Lead Time</span>
                <p className="font-medium text-zinc-800">
                  Immediate from Raiwind Yard (Ex-Stock items)
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveBOQModal(null)}
                className="px-4 py-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-xl text-xs font-medium"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadPDF(activeBOQModal);
                  setActiveBOQModal(null);
                }}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
