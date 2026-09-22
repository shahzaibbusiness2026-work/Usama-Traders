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
  Layers,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Package,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
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
  const [dateRange, setDateRange] = useState('01 Nov 2024 – 30 Nov 2024');
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
        return 'bg-amber-100 text-amber-900 border border-amber-300';
      case 'Quotation Sent':
        return 'bg-sky-100 text-sky-900 border border-sky-300';
      case 'Design Review':
        return 'bg-indigo-100 text-indigo-900 border border-indigo-300';
      case 'Client Review':
        return 'bg-stone-200 text-stone-900 border border-stone-300';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-emerald-100 text-emerald-900 border border-emerald-300';
      case 'Packed':
        return 'bg-sky-100 text-sky-900 border border-sky-300';
      case 'In Transit':
        return 'bg-blue-100 text-blue-900 border border-blue-300';
      case 'Preparing':
        return 'bg-amber-100 text-amber-900 border border-amber-300';
      default:
        return 'bg-stone-100 text-stone-800';
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
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col xl:flex-row text-stone-900">
      {/* 1. LEFT DASHBOARD SIDEBAR */}
      <aside className="w-full xl:w-64 bg-[#1e1b18] text-stone-300 flex flex-col justify-between shrink-0 border-r border-stone-800">
        <div>
          {/* Logo */}
          <div className="p-5 border-b border-stone-800/80">
            <BrandLogo
              variant="light"
              size="sm"
              onClick={() => setActiveView('home')}
            />
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-medium">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
                    isActive
                      ? 'bg-[#c5a880] text-stone-950 font-bold shadow-xs'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Promo Card & Help */}
        <div className="p-3 space-y-3">
          <div className="relative rounded-lg overflow-hidden border border-stone-700 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80"
              alt="Marble promo"
              className="w-full h-32 object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 flex flex-col justify-end">
              <h5 className="font-serif text-xs font-semibold text-white leading-snug">
                Premium Surfaces.<br />Lasting Relationships.
              </h5>
              <button
                onClick={() => setActiveView('home')}
                className="mt-2 text-[10px] font-semibold text-[#c5a880] hover:text-white flex items-center gap-1"
              >
                <span>Build Beautiful Spaces Together.</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-1.5 hover:text-stone-200 cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Need Help? Contact Support</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search projects, customers, products, or quotations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs placeholder-stone-400 focus:outline-none focus:border-[#856a42] focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          </div>

          {/* Right Tools & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Back to Storefront */}
            <button
              onClick={() => setActiveView('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-md shadow-xs transition-colors"
              title="Return to Customer Storefront"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            {/* Date range picker */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-stone-200 rounded-md text-xs text-stone-700 bg-stone-50/50">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </div>

            {/* + New Quote Button */}
            <button
              onClick={onOpenNewQuoteModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#856a42] hover:bg-[#735a34] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Quote</span>
            </button>

            {/* Dispatch Samples Button */}
            <button
              onClick={onOpenSampleModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 hover:border-stone-500 bg-white text-stone-700 text-xs font-medium rounded-md transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#856a42]" />
              <span>Dispatch Samples</span>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 text-stone-600 hover:text-stone-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-200 font-serif font-bold text-xs flex items-center justify-center">
                AH
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Greeting Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Good Morning, Ahmad
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                Here's what's happening with your business today.
              </p>
            </div>
            <div className="text-right">
              <p className="font-serif text-xs italic text-stone-500">
                “Better spaces. Brighter lives.” <span className="not-italic text-[10px] font-sans text-stone-400">— SALEEM TRADERS</span>
              </p>
            </div>
          </div>

          {/* 4 KPI METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Monthly Revenue */}
            <div className="bg-white rounded-lg border border-stone-200 p-4 shadow-2xs flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <span className="p-1 rounded bg-stone-100 text-stone-800">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </span>
                  <span>Monthly Revenue</span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                  Rs. 48.6M
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+12%</span>
                  <span className="text-stone-400 font-normal">vs last month</span>
                </div>
              </div>
              {/* Mini Green Sparkline */}
              <div className="w-20 h-10">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-emerald-500 fill-emerald-50/50">
                  <path d="M 0 35 Q 20 30, 40 25 T 70 15 T 100 5 L 100 40 L 0 40 Z" />
                  <path d="M 0 35 Q 20 30, 40 25 T 70 15 T 100 5" fill="none" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Card 2: Active Pipeline */}
            <div className="bg-white rounded-lg border border-stone-200 p-4 shadow-2xs flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <span className="p-1 rounded bg-stone-100 text-[#856a42]">
                    <FileText className="w-3.5 h-3.5" />
                  </span>
                  <span>Active Pipeline</span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                  Rs. 128.5M
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+8%</span>
                  <span className="text-stone-400 font-normal">vs last month</span>
                </div>
              </div>
              {/* Mini Gold Sparkline */}
              <div className="w-20 h-10">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-[#856a42] fill-[#856a42]/10">
                  <path d="M 0 30 Q 25 35, 50 20 T 75 18 T 100 8 L 100 40 L 0 40 Z" />
                  <path d="M 0 30 Q 25 35, 50 20 T 75 18 T 100 8" fill="none" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Card 3: Warehouse Slabs */}
            <div className="bg-white rounded-lg border border-stone-200 p-4 shadow-2xs flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <span className="p-1 rounded bg-stone-100 text-stone-800">
                    <Boxes className="w-3.5 h-3.5" />
                  </span>
                  <span>Warehouse Slabs</span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                  1,420
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 mt-1">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>-6%</span>
                  <span className="text-stone-400 font-normal">vs last month</span>
                </div>
              </div>
              {/* Mini Red Sparkline */}
              <div className="w-20 h-10">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-rose-500 fill-rose-50/50">
                  <path d="M 0 10 Q 25 15, 50 22 T 75 28 T 100 35 L 100 40 L 0 40 Z" />
                  <path d="M 0 10 Q 25 15, 50 22 T 75 28 T 100 35" fill="none" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Card 4: Pending Samples */}
            <div className="bg-white rounded-lg border border-stone-200 p-4 shadow-2xs flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <span className="p-1 rounded bg-stone-100 text-stone-800">
                    <Send className="w-3.5 h-3.5" />
                  </span>
                  <span>Pending Samples</span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                  19 Boxes
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 mt-1">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>-26%</span>
                  <span className="text-stone-400 font-normal">vs last week</span>
                </div>
              </div>
              {/* Mini Red Sparkline */}
              <div className="w-20 h-10">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-rose-500 fill-rose-50/50">
                  <path d="M 0 8 Q 20 18, 45 20 T 70 30 T 100 35 L 100 40 L 0 40 Z" />
                  <path d="M 0 8 Q 20 18, 45 20 T 70 30 T 100 35" fill="none" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2-COLUMN MIDDLE SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN: ACTIVE BOQ PIPELINE & SAMPLE DISPATCH QUEUE */}
            <div className="lg:col-span-8 space-y-6">
              {/* BOQ Pipeline Table */}
              <div className="bg-white rounded-lg border border-stone-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#856a42]" />
                    <h3 className="text-xs font-bold text-stone-900">Active BOQ Pipeline</h3>
                    <span className="text-[11px] text-stone-400 font-normal">Live projects and quotations in progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={pipelineFilter}
                      onChange={(e) => setPipelineFilter(e.target.value)}
                      className="text-[11px] border border-stone-200 rounded px-2 py-1 bg-stone-50"
                    >
                      <option>All</option>
                      <option>Negotiation</option>
                      <option>Quotation Sent</option>
                      <option>Design Review</option>
                      <option>Client Review</option>
                    </select>
                    <button
                      onClick={() => alert('Full BOQ export generated.')}
                      className="text-xs font-semibold text-stone-600 hover:text-[#856a42] flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50/80 text-stone-500 font-medium border-b border-stone-100">
                      <tr>
                        <th className="py-2.5 px-3 w-10">#</th>
                        <th className="py-2.5 px-3">Project Name</th>
                        <th className="py-2.5 px-3">Location</th>
                        <th className="py-2.5 px-3 text-right">Value (PKR)</th>
                        <th className="py-2.5 px-3 text-center">Stage</th>
                        <th className="py-2.5 px-3">Last Update</th>
                        <th className="py-2.5 px-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {filteredBOQ.map((project) => (
                        <tr key={project.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-2.5 px-3 text-stone-400 font-mono text-[11px]">
                            {project.number}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-stone-900">
                            {project.projectName}
                          </td>
                          <td className="py-2.5 px-3 text-stone-500">{project.location}</td>
                          <td className="py-2.5 px-3 text-right font-medium">
                            {project.formattedValue}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getStageBadge(
                                project.stage
                              )}`}
                            >
                              {project.stage}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-stone-400 text-[11px]">
                            {project.lastUpdate}
                          </td>
                          <td className="py-2.5 px-3 text-center text-stone-400 hover:text-stone-700 cursor-pointer">
                            <MoreHorizontal className="w-4 h-4 inline" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sample Dispatch Queue Table */}
              <div className="bg-white rounded-lg border border-stone-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#856a42]" />
                    <h3 className="text-xs font-bold text-stone-900">Sample Dispatch Queue</h3>
                    <span className="text-[11px] text-stone-400 font-normal">Samples ready or in transit</span>
                  </div>
                  <button
                    onClick={onOpenSampleModal}
                    className="text-xs font-semibold text-stone-600 hover:text-[#856a42] flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50/80 text-stone-500 font-medium border-b border-stone-100">
                      <tr>
                        <th className="py-2.5 px-3 w-10">#</th>
                        <th className="py-2.5 px-3">Product / Sample Set</th>
                        <th className="py-2.5 px-3">Requested By</th>
                        <th className="py-2.5 px-3">Project</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                        <th className="py-2.5 px-3">Dispatch Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {SAMPLE_QUEUE.map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-2.5 px-3 text-stone-400 font-mono text-[11px]">
                            {item.number}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-stone-900">
                            {item.productSampleSet}
                          </td>
                          <td className="py-2.5 px-3 text-stone-600">{item.requestedBy}</td>
                          <td className="py-2.5 px-3 text-stone-500">{item.project}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getStatusBadge(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-stone-500 text-[11px]">
                            {item.dispatchDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INVENTORY DEPLETION & INCOMING SHIPMENTS */}
            <div className="lg:col-span-4 space-y-6">
              {/* Inventory Depletion Feed */}
              <div className="bg-white rounded-lg border border-stone-200 shadow-2xs p-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">Inventory Depletion Feed</h3>
                    <p className="text-[11px] text-stone-400">Live stock updates and alerts</p>
                  </div>
                  <button
                    onClick={() => alert('Stock replenishment request triggered.')}
                    className="text-xs font-semibold text-stone-600 hover:text-[#856a42] flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {INVENTORY_DEPLETION.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-stone-50 transition-colors border border-stone-100"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded object-cover border border-stone-200"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-stone-400">{item.specs}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-rose-600">
                          {item.remaining} {item.unit}
                        </span>
                        <div className="text-[10px] text-rose-500 font-medium">{item.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Incoming Shipments */}
              <div className="bg-white rounded-lg border border-stone-200 shadow-2xs p-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">Incoming Shipments</h3>
                  </div>
                  <button
                    onClick={() => alert('Viewing all freight manifests.')}
                    className="text-xs font-semibold text-stone-600 hover:text-[#856a42] flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {INCOMING_SHIPMENTS.map((ship) => (
                    <div
                      key={ship.id}
                      className="flex items-center justify-between p-2.5 rounded-md bg-stone-50/60 border border-stone-100 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-[#856a42]">
                          <Truck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-900">{ship.title}</h4>
                          <p className="text-[10px] text-stone-500">{ship.eta}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          ship.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-900'
                            : ship.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {ship.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: MONTHLY SALES TREND & TOP PRODUCTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Monthly Sales Trend Chart */}
            <div className="lg:col-span-8 bg-white rounded-lg border border-stone-200 shadow-2xs p-5">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-stone-100 mb-4 gap-2">
                <div>
                  <h3 className="text-xs font-bold text-stone-900">Monthly Sales Trend</h3>
                  <p className="text-[11px] text-stone-400">Revenue, quotations and order conversion</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#c5a880]" />
                    <span>Revenue (PKR M)</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e1b18]" />
                    <span>Quotations</span>
                  </div>
                  <select className="text-xs border border-stone-200 rounded px-2.5 py-1 bg-stone-50 font-medium">
                    <option>Revenue</option>
                    <option>Margin %</option>
                  </select>
                </div>
              </div>

              {/* Chart container */}
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={MONTHLY_SALES_TREND} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e1b18',
                        color: '#fff',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '11px',
                      }}
                      formatter={(val: any, name: any) => [
                        name === 'revenue' ? `Rs. ${val}M` : `${val} BOQs`,
                        name === 'revenue' ? 'Revenue' : 'Quotations',
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#c5a880" radius={[4, 4, 0, 0]} barSize={24} />
                    <Line type="monotone" dataKey="quotations" stroke="#1e1b18" strokeWidth={2.5} dot={{ r: 3, fill: '#1e1b18' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Tooltip highlight callout as seen in Image 4 */}
              <div className="mt-3 p-2.5 rounded bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
                <span className="text-stone-600">
                  <strong className="text-stone-900">Nov 2024 Highlight:</strong> Rs. 48.6M generated across 38 enterprise quotes.
                </span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                  +12% vs Oct
                </span>
              </div>
            </div>

            {/* Top Products in Stock */}
            <div className="lg:col-span-4 bg-white rounded-lg border border-stone-200 shadow-2xs p-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <div>
                  <h3 className="text-xs font-bold text-stone-900">Top Products in Stock</h3>
                  <p className="text-[11px] text-stone-400">Best performing products by stock value</p>
                </div>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="text-xs font-semibold text-stone-600 hover:text-[#856a42] flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {TOP_PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-stone-50 transition-colors border border-stone-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-11 h-11 rounded object-cover border border-stone-200"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900">{prod.name}</h4>
                        <p className="text-[10px] text-stone-400">{prod.specs}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-900">{prod.stock}</span>
                      <div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                          {prod.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DASHBOARD BOTTOM PROMO BANNER (As in Image 4) */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-stone-900 to-stone-800 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                From inspiration to iconic spaces.
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-light">
                Partner with Saleem Traders for premium surfaces, expert support and reliable supply.
              </p>
            </div>
            <button
              onClick={onOpenNewQuoteModal}
              className="px-6 py-3 bg-[#c5a880] hover:bg-[#b09268] text-stone-950 font-bold text-xs rounded-md shadow transition-colors shrink-0"
            >
              Create a Project Quote &rarr;
            </button>
          </div>
        </main>

        {/* Dashboard Footer */}
        <footer className="bg-white border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-stone-900 text-[#c5a880] font-serif font-bold text-[10px] flex items-center justify-center">
              ST
            </div>
            <span className="font-semibold text-stone-700">SALEEM TRADERS</span>
            <span>— Surfaces for a Better Tomorrow</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-stone-800">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-stone-800">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-stone-800">Help & Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
