import React, { useState } from 'react';
import {
  Send,
  Search,
  Plus,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  X,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { SampleDispatchItem } from '../../../types';

interface SampleRequestsTabProps {
  samples: SampleDispatchItem[];
  onUpdateSampleStatus: (id: string, newStatus: SampleDispatchItem['status']) => void;
  onOpenSampleModal: () => void;
  showToast: (msg: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SampleRequestsTab: React.FC<SampleRequestsTabProps> = ({
  samples,
  onUpdateSampleStatus,
  onOpenSampleModal,
  showToast,
  searchQuery: externalSearchQuery,
  onSearchChange,
  onNavigateTab,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [activeTrackingSample, setActiveTrackingSample] = useState<SampleDispatchItem | null>(null);

  const currentSearch = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const handleSearchChange = (val: string) => {
    setInternalSearchQuery(val);
    onSearchChange?.(val);
  };

  const statuses = ['All', 'Ready', 'Packed', 'In Transit', 'Preparing'];

  const filteredSamples = samples.filter((s) => {
    if (selectedStatus !== 'All' && s.status !== selectedStatus) return false;
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      return (
        s.productSampleSet.toLowerCase().includes(q) ||
        s.requestedBy.toLowerCase().includes(q) ||
        s.project.toLowerCase().includes(q) ||
        s.number.toLowerCase().includes(q) ||
        s.status.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: SampleDispatchItem['status']) => {
    switch (status) {
      case 'Ready':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Packed':
        return 'bg-sky-50 text-sky-800 border-sky-200/60';
      case 'In Transit':
        return 'bg-blue-50 text-blue-800 border-blue-200/60';
      case 'Preparing':
        return 'bg-amber-50 text-amber-800 border-amber-200/60';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const handlePrintLabel = (sample: SampleDispatchItem) => {
    showToast(`Printing TCS Priority Dispatch Label for ${sample.requestedBy}...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Dispatched This Month</span>
            <Send className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              142 Boxes
            </div>
            <div className="text-xs text-zinc-500 mt-1">To top architecture studios</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>In-Transit Sets</span>
            <Truck className="w-4 h-4 text-sky-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-sky-700 font-sans">
              {samples.filter((s) => s.status === 'In Transit' || s.status === 'Ready').length} Active
            </div>
            <div className="text-xs text-zinc-500 mt-1">Next-day courier dispatch</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Spec Conversion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-emerald-700 font-sans">
              74.2%
            </div>
            <div className="text-xs text-zinc-500 mt-1">Sample-to-BOQ win ratio</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Dispatch New Sample</span>
            <Plus className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <button
              onClick={onOpenSampleModal}
              className="w-full py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Sample Box</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px] flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search by architect, kit or project..."
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

      {/* Sample Queue Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
              <tr>
                <th className="py-3.5 px-6 w-14">#</th>
                <th className="py-3.5 px-6">Product / Sample Kit</th>
                <th className="py-3.5 px-6">Architect / Firm</th>
                <th className="py-3.5 px-6">Associated Project</th>
                <th className="py-3.5 px-6 text-center">Fulfillment Status</th>
                <th className="py-3.5 px-6">Dispatch Date</th>
                <th className="py-3.5 px-6 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {filteredSamples.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-4 px-6 text-zinc-400 font-mono text-xs font-semibold">
                    #{item.number}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-zinc-900 text-sm">{item.productSampleSet}</div>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      Presentation Box with Certificate
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-zinc-900 text-sm">{item.requestedBy}</div>
                    <div className="text-[11px] text-amber-800">Architect Partner</div>
                  </td>
                  <td className="py-4 px-6 text-zinc-700 font-medium text-sm">{item.project}</td>
                  <td className="py-4 px-6 text-center">
                    <select
                      value={item.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as SampleDispatchItem['status'];
                        onUpdateSampleStatus(item.id, newStatus);
                        showToast(`Sample #${item.number} status updated to: ${newStatus}`);
                      }}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      <option value="Preparing">Preparing</option>
                      <option value="Packed">Packed</option>
                      <option value="Ready">Ready</option>
                      <option value="In Transit">In Transit</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-zinc-500 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.dispatchDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handlePrintLabel(item)}
                        className="p-1.5 text-zinc-600 hover:text-amber-800 hover:bg-zinc-100 rounded-lg transition-colors"
                        title="Print Shipping Label"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveTrackingSample(item)}
                        className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                        title="Track Shipment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Courier Tracking Modal */}
      {activeTrackingSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setActiveTrackingSample(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 border border-zinc-200 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-serif text-xl font-medium text-zinc-900">
                Courier Waybill Tracking
              </h3>
              <button
                onClick={() => setActiveTrackingSample(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Carrier:</span>
                <span className="font-bold text-zinc-900">TCS Express Overnight</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Waybill #:</span>
                <span className="font-mono font-bold text-amber-800">
                  TCS-77192840-LHR
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Recipient:</span>
                <span className="font-medium text-zinc-900">
                  {activeTrackingSample.requestedBy}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Kit:</span>
                <span className="font-medium text-zinc-900">
                  {activeTrackingSample.productSampleSet}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Destination:</span>
                <span className="font-medium text-zinc-900">
                  {activeTrackingSample.project}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTrackingSample(null)}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
