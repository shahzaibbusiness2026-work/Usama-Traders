import React from 'react';
import {
  TrendingUp,
  FileText,
  Boxes,
  Send,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  MoreHorizontal,
  Truck,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { BOQProject, SampleDispatchItem } from '../../../types';
import {
  INVENTORY_DEPLETION,
  INCOMING_SHIPMENTS,
  MONTHLY_SALES_TREND,
} from '../../../data/mockData';

interface OverviewTabProps {
  filteredBOQ: BOQProject[];
  pipelineFilter: string;
  setPipelineFilter: (filter: string) => void;
  samples: SampleDispatchItem[];
  onOpenNewQuoteModal: () => void;
  onOpenSampleModal: () => void;
  onSelectBOQ: (boq: BOQProject) => void;
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  filteredBOQ,
  pipelineFilter,
  setPipelineFilter,
  samples,
  onOpenNewQuoteModal,
  onOpenSampleModal,
  onSelectBOQ,
  onNavigateTab,
}) => {
  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'Negotiation':
        return 'bg-amber-50 text-amber-800 border border-amber-200/60';
      case 'Quotation Sent':
        return 'bg-sky-50 text-sky-800 border border-sky-200/60';
      case 'Design Review':
        return 'bg-purple-50 text-purple-800 border border-purple-200/60';
      case 'Client Review':
        return 'bg-zinc-100 text-zinc-800 border border-zinc-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border border-zinc-200';
    }
  };

  const getSampleStatusBadge = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
      case 'Packed':
        return 'bg-sky-50 text-sky-800 border border-sky-200/60';
      case 'In Transit':
        return 'bg-blue-50 text-blue-800 border border-blue-200/60';
      case 'Preparing':
        return 'bg-amber-50 text-amber-800 border border-amber-200/60';
      default:
        return 'bg-zinc-100 text-zinc-700 border border-zinc-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 4 KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Monthly Revenue */}
        <div
          onClick={() => onNavigateTab('Analytics & Margin')}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-amber-700/40 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Monthly Revenue
            </span>
            <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100 group-hover:bg-amber-50 transition-colors">
              <TrendingUp className="w-4 h-4 text-amber-800" />
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl lg:text-[36px] font-bold text-zinc-900 tracking-tight font-sans">
              Rs. 48.6M
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                +12%
              </span>
              <span className="text-xs text-zinc-500 font-medium">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Pipeline */}
        <div
          onClick={() => onNavigateTab('Quotations')}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-amber-700/40 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Active Pipeline
            </span>
            <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100 group-hover:bg-amber-50 transition-colors">
              <FileText className="w-4 h-4 text-amber-800" />
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl lg:text-[36px] font-bold text-zinc-900 tracking-tight font-sans">
              Rs. 128.5M
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                +8%
              </span>
              <span className="text-xs text-zinc-500 font-medium">10 live BOQ specs</span>
            </div>
          </div>
        </div>

        {/* Card 3: Warehouse Slabs */}
        <div
          onClick={() => onNavigateTab('Inventory & Stock')}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-amber-700/40 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Warehouse Slabs
            </span>
            <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100 group-hover:bg-amber-50 transition-colors">
              <Boxes className="w-4 h-4 text-zinc-700" />
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl lg:text-[36px] font-bold text-zinc-900 tracking-tight font-sans">
              1,420
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
                -6%
              </span>
              <span className="text-xs text-zinc-500 font-medium">allocated to jobs</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Samples */}
        <div
          onClick={() => onNavigateTab('Sample Requests')}
          className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-amber-700/40 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Pending Samples
            </span>
            <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100 group-hover:bg-amber-50 transition-colors">
              <Send className="w-4 h-4 text-zinc-700" />
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl lg:text-[36px] font-bold text-zinc-900 tracking-tight font-sans">
              19 Boxes
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                <ShieldCheck className="w-3 h-3 mr-0.5" />
                85%
              </span>
              <span className="text-xs text-zinc-500 font-medium">dispatched today</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE BOQ PIPELINE TABLE CONTAINER */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm">
        <div className="p-5 lg:p-6 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
              Live Quotations
            </span>
            <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
              Active BOQ Pipeline
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={pipelineFilter}
              onChange={(e) => setPipelineFilter(e.target.value)}
              className="text-xs font-medium border border-zinc-200 rounded-xl px-3 py-1.5 bg-zinc-50 text-zinc-700 focus:outline-none focus:border-amber-800"
            >
              <option>All</option>
              <option>Negotiation</option>
              <option>Quotation Sent</option>
              <option>Design Review</option>
              <option>Client Review</option>
            </select>

            <button
              onClick={() => onNavigateTab('Quotations')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 transition-colors"
            >
              <span>Manage All Quotes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
              <tr>
                <th className="py-3.5 px-6 w-12">#</th>
                <th className="py-3.5 px-6">Project Name</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6 text-right">Value (PKR)</th>
                <th className="py-3.5 px-6 text-center">Stage</th>
                <th className="py-3.5 px-6">Last Update</th>
                <th className="py-3.5 px-6 text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {filteredBOQ.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => onSelectBOQ(project)}
                  className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6 text-zinc-400 font-mono text-xs">
                    {project.number}
                  </td>
                  <td className="py-4 px-6 font-semibold text-zinc-900 text-sm">
                    {project.projectName}
                  </td>
                  <td className="py-4 px-6 text-zinc-600 text-sm">{project.location}</td>
                  <td className="py-4 px-6 text-right font-bold text-zinc-900 text-sm font-mono">
                    Rs. {project.formattedValue}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageBadge(
                        project.stage
                      )}`}
                    >
                      {project.stage}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-zinc-500 text-xs">{project.lastUpdate}</td>
                  <td className="py-4 px-6 text-center text-zinc-400 hover:text-amber-800">
                    <Eye className="w-4 h-4 inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-COLUMN SECTION: SAMPLE QUEUE & DEPLETION/SHIPMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SAMPLE DISPATCH QUEUE TABLE (8 COLS) */}
        <div className="lg:col-span-8 rounded-2xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm">
          <div className="p-5 lg:p-6 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                Architect Logistics
              </span>
              <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
                Sample Dispatch Queue
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('Sample Requests')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 transition-colors"
            >
              <span>View All ({samples.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
                <tr>
                  <th className="py-3.5 px-6 w-12">#</th>
                  <th className="py-3.5 px-6">Product / Sample Set</th>
                  <th className="py-3.5 px-6">Requested By</th>
                  <th className="py-3.5 px-6">Project</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6">Dispatch Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-800">
                {samples.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-4 px-6 text-zinc-400 font-mono text-xs">
                      {item.number}
                    </td>
                    <td className="py-4 px-6 font-semibold text-zinc-900 text-sm">
                      {item.productSampleSet}
                    </td>
                    <td className="py-4 px-6 text-zinc-700 font-medium text-sm">
                      {item.requestedBy}
                    </td>
                    <td className="py-4 px-6 text-zinc-500 text-sm">{item.project}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSampleStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 text-xs">
                      {item.dispatchDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STOCK & DEPLETION FEEDS (4 COLS) */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                  Depletion Alert
                </span>
                <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
                  Low Stock Feeds
                </h3>
              </div>
              <AlertTriangle className="w-4 h-4 text-amber-800" />
            </div>

            <div className="space-y-4">
              {INVENTORY_DEPLETION.map((item) => {
                const percentage = Math.min(100, Math.round((item.remaining / 30) * 100));
                return (
                  <div
                    key={item.id}
                    onClick={() => onNavigateTab('Inventory & Stock')}
                    className="p-3 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors bg-zinc-50/50 space-y-2 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-zinc-200"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-zinc-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-zinc-500">{item.specs}</p>
                        </div>
                      </div>
                      <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded">
                        Low Stock
                      </span>
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                        <span>Remaining</span>
                        <span className="font-bold text-zinc-800">
                          {item.remaining} {item.unit}
                        </span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-700 rounded-full"
                          style={{ width: `${Math.max(15, percentage)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incoming Shipments Summary */}
          <div className="mt-6 pt-4 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Incoming Freight
              </span>
              <Truck className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <div className="space-y-2">
              {INCOMING_SHIPMENTS.slice(0, 2).map((ship) => (
                <div
                  key={ship.id}
                  className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-medium text-zinc-900">{ship.title}</div>
                    <div className="text-[11px] text-zinc-400">{ship.eta}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-50 text-sky-800 border border-sky-200/50">
                    {ship.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MONTHLY REVENUE COMPOSED CHART */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-zinc-100 mb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
              Analytics & Trends
            </span>
            <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
              Monthly Specification & Sales Volume
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-800" />
              <span>Revenue (PKR M)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-zinc-900" />
              <span>Quotations</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={MONTHLY_SALES_TREND}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#71717a' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#71717a' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  color: '#fff',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '11px',
                }}
                formatter={(val: any, name: any) => [
                  name === 'revenue' ? `Rs. ${val}M` : `${val} BOQs`,
                  name === 'revenue' ? 'Revenue' : 'Quotations',
                ]}
              />
              <Bar dataKey="revenue" fill="#92400e" radius={[6, 6, 0, 0]} barSize={26} />
              <Line
                type="monotone"
                dataKey="quotations"
                stroke="#18181b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#18181b' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
