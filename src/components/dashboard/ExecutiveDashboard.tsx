import React, { useState } from 'react';
import {
  LayoutDashboard,
  Boxes,
  FileText,
  ShoppingBag,
  Send,
  Users,
  TrendingUp,
  BookOpen,
  FileSpreadsheet,
  Settings,
  Search,
  Calendar,
  Plus,
  Bell,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Truck,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
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
import {
  BOQ_PIPELINE,
  SAMPLE_QUEUE,
  INVENTORY_DEPLETION,
  INCOMING_SHIPMENTS,
  MONTHLY_SALES_TREND,
  TOP_PRODUCTS,
} from '../../data/mockData';
import { ActiveView } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface ExecutiveDashboardProps {
  setActiveView: (view: ActiveView) => void;
  onOpenNewQuoteModal: () => void;
  onOpenSampleModal: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  setActiveView,
  onOpenNewQuoteModal,
  onOpenSampleModal,
}) => {
  const [activeTab, setActiveTab] = useState('Overview Dashboard');
  const [dateRange] = useState('01 Nov 2024 – 30 Nov 2024');
  const [pipelineFilter, setPipelineFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarNavItems = [
    { label: 'Overview Dashboard', icon: LayoutDashboard },
    { label: 'Inventory & Stock', icon: Boxes },
    { label: 'Quotations', icon: FileText },
    { label: 'Orders', icon: ShoppingBag },
    { label: 'Sample Requests', icon: Send },
    { label: 'Customers & Architects', icon: Users },
    { label: 'Analytics & Margin', icon: TrendingUp },
    { label: 'Product Catalogue', icon: BookOpen },
    { label: 'Reports', icon: FileSpreadsheet },
    { label: 'Settings', icon: Settings },
  ];

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

  const filteredBOQ = BOQ_PIPELINE.filter((boq) => {
    if (pipelineFilter !== 'All' && boq.stage !== pipelineFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        boq.projectName.toLowerCase().includes(q) ||
        boq.location.toLowerCase().includes(q) ||
        boq.stage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50/60 flex flex-col xl:flex-row text-zinc-900 font-sans">
      {/* 1. DARK ARCHITECTURAL SIDEBAR */}
      <aside className="w-full xl:w-64 bg-zinc-950 text-zinc-300 p-5 flex flex-col justify-between shrink-0 border-r border-zinc-800">
        <div className="space-y-6">
          {/* Logo */}
          <div className="pb-4 border-b border-zinc-800/80">
            <BrandLogo
              variant="light"
              size="sm"
              showTagline={false}
              onClick={() => setActiveView('home')}
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-zinc-800/80 text-white font-medium shadow-xs'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-amber-600/90" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pinned Bottom Tenant Profile Card */}
        <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-4">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 text-white font-serif font-medium text-xs flex items-center justify-center">
                AH
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-medium text-white truncate">Ahmad Hassan</h5>
              <p className="text-[11px] text-zinc-400 truncate">Executive Director</p>
            </div>
          </div>

          <button
            onClick={() => setActiveView('home')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search projects, customers, products, or quotations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:border-amber-800 focus:bg-white transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
          </div>

          {/* Right Tools & Actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Date Range Picker */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 border border-zinc-200 rounded-xl text-xs text-zinc-600 bg-white shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </div>

            {/* + New Quote Button */}
            <button
              onClick={onOpenNewQuoteModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Quote</span>
            </button>

            {/* Dispatch Samples Button */}
            <button
              onClick={onOpenSampleModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 border border-zinc-200 hover:border-zinc-300 bg-white text-zinc-700 text-xs font-medium rounded-xl transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5 text-amber-800" />
              <span>Dispatch Samples</span>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 bg-amber-800 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Content Body with Max-W-7XL & Standardized Spacing */}
        <main className="max-w-7xl mx-auto w-full p-6 lg:p-10 space-y-8">
          {/* Greeting Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 font-sans">
                Executive Analytics & Pipeline
              </span>
              <h1 className="font-serif text-2xl lg:text-4xl font-normal text-zinc-900 tracking-tight mt-1">
                Good Morning, Ahmad
              </h1>
              <p className="text-sm lg:text-base text-zinc-600 leading-relaxed font-normal mt-1">
                Here's what's happening with your business and specification queue today.
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-medium text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Enterprise Suite • FY2024</span>
              </div>
            </div>
          </div>

          {/* 4 KPI METRIC CARDS (BORDERLESS WHITE CARDS WITH SHADOW & TREND BADGES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Monthly Revenue */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">Monthly Revenue</span>
                <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100">
                  <TrendingUp className="w-4 h-4 text-amber-800" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-semibold text-zinc-900 tracking-tight">
                  Rs. 48.6M
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    +12%
                  </span>
                  <span className="text-xs text-zinc-400 font-normal">vs last month</span>
                </div>
              </div>
            </div>

            {/* Card 2: Active Pipeline */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">Active Pipeline</span>
                <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100">
                  <FileText className="w-4 h-4 text-amber-800" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-semibold text-zinc-900 tracking-tight">
                  Rs. 128.5M
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    +8%
                  </span>
                  <span className="text-xs text-zinc-400 font-normal">vs last month</span>
                </div>
              </div>
            </div>

            {/* Card 3: Warehouse Slabs */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">Warehouse Slabs</span>
                <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100">
                  <Boxes className="w-4 h-4 text-zinc-700" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-semibold text-zinc-900 tracking-tight">
                  1,420
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    -6%
                  </span>
                  <span className="text-xs text-zinc-400 font-normal">allocated to jobs</span>
                </div>
              </div>
            </div>

            {/* Card 4: Pending Samples */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">Pending Samples</span>
                <span className="p-2 rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-100">
                  <Send className="w-4 h-4 text-zinc-700" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-semibold text-zinc-900 tracking-tight">
                  19 Boxes
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    <ShieldCheck className="w-3 h-3 mr-0.5" />
                    85%
                  </span>
                  <span className="text-xs text-zinc-400 font-normal">dispatched today</span>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE BOQ PIPELINE TABLE CONTAINER */}
          <div className="rounded-2xl border border-zinc-100 bg-white overflow-hidden shadow-sm">
            <div className="p-5 lg:p-6 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                  Live Quotations
                </span>
                <h3 className="font-serif text-xl font-normal text-zinc-900 tracking-tight mt-0.5">
                  Active BOQ Pipeline
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={pipelineFilter}
                  onChange={(e) => setPipelineFilter(e.target.value)}
                  className="text-xs border border-zinc-200 rounded-xl px-3 py-1.5 bg-zinc-50 text-zinc-700 focus:outline-none"
                >
                  <option>All</option>
                  <option>Negotiation</option>
                  <option>Quotation Sent</option>
                  <option>Design Review</option>
                  <option>Client Review</option>
                </select>

                <button
                  onClick={onOpenNewQuoteModal}
                  className="text-xs font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1 transition-colors"
                >
                  <span>New Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50/80 text-xs font-semibold uppercase tracking-wider text-zinc-400 py-3.5 px-6 border-b border-zinc-100">
                  <tr>
                    <th className="py-3.5 px-6 w-12">#</th>
                    <th className="py-3.5 px-6">Project Name</th>
                    <th className="py-3.5 px-6">Location</th>
                    <th className="py-3.5 px-6 text-right">Value (PKR)</th>
                    <th className="py-3.5 px-6 text-center">Stage</th>
                    <th className="py-3.5 px-6">Last Update</th>
                    <th className="py-3.5 px-6 text-center w-12">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-800">
                  {filteredBOQ.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-4 px-6 text-zinc-400 font-mono text-xs">
                        {project.number}
                      </td>
                      <td className="py-4 px-6 font-medium text-zinc-900">
                        {project.projectName}
                      </td>
                      <td className="py-4 px-6 text-zinc-500">{project.location}</td>
                      <td className="py-4 px-6 text-right font-semibold text-zinc-900">
                        {project.formattedValue}
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
                      <td className="py-4 px-6 text-zinc-400 text-xs">
                        {project.lastUpdate}
                      </td>
                      <td className="py-4 px-6 text-center text-zinc-400 hover:text-zinc-700 cursor-pointer">
                        <MoreHorizontal className="w-4 h-4 inline" />
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
            <div className="lg:col-span-8 rounded-2xl border border-zinc-100 bg-white overflow-hidden shadow-sm">
              <div className="p-5 lg:p-6 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                    Architect Logistics
                  </span>
                  <h3 className="font-serif text-xl font-normal text-zinc-900 tracking-tight mt-0.5">
                    Sample Dispatch Queue
                  </h3>
                </div>
                <button
                  onClick={onOpenSampleModal}
                  className="text-xs font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1 transition-colors"
                >
                  <span>Dispatch New Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50/80 text-xs font-semibold uppercase tracking-wider text-zinc-400 py-3.5 px-6 border-b border-zinc-100">
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
                    {SAMPLE_QUEUE.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="py-4 px-6 text-zinc-400 font-mono text-xs">
                          {item.number}
                        </td>
                        <td className="py-4 px-6 font-medium text-zinc-900">
                          {item.productSampleSet}
                        </td>
                        <td className="py-4 px-6 text-zinc-600">{item.requestedBy}</td>
                        <td className="py-4 px-6 text-zinc-500">{item.project}</td>
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
            <div className="lg:col-span-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                      Depletion Alert
                    </span>
                    <h3 className="font-serif text-xl font-normal text-zinc-900 tracking-tight mt-0.5">
                      Low Stock Feeds
                    </h3>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-amber-800" />
                </div>

                <div className="space-y-4">
                  {INVENTORY_DEPLETION.map((item) => {
                    const percentage = Math.min(100, Math.round((item.remaining / 800) * 100));
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors bg-zinc-50/40 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover border border-zinc-200"
                            />
                            <div>
                              <h4 className="text-xs font-medium text-zinc-900 line-clamp-1">{item.name}</h4>
                              <p className="text-[11px] text-zinc-400">{item.specs}</p>
                            </div>
                          </div>
                          <span className="bg-amber-50 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">
                            Low Stock
                          </span>
                        </div>

                        {/* Stock Progress Bar */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                            <span>Remaining</span>
                            <span className="font-semibold text-zinc-800">
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
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-zinc-100 mb-6 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                  Analytics & Trends
                </span>
                <h3 className="font-serif text-xl font-normal text-zinc-900 tracking-tight mt-0.5">
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
                <ComposedChart data={MONTHLY_SALES_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
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
                  <Line type="monotone" dataKey="quotations" stroke="#18181b" strokeWidth={2.5} dot={{ r: 3, fill: '#18181b' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>

        {/* Dashboard Footer (Clean without tagline) */}
        <footer className="bg-white border-t border-zinc-100 px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700">SALEEM TRADERS</span>
            <span>• Enterprise Architecture & BOQ Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-zinc-700 transition-colors">System Security</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-700 transition-colors">Showroom Directory</a>
            <span>•</span>
            <a href="tel:+9242111725336" className="text-amber-800 hover:underline">+92 (42) 111-SALEEM</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
