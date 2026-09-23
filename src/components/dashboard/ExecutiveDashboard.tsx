import React, { useState, useEffect } from 'react';
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
  PanelLeftClose,
  PanelLeftOpen,
  X,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { BOQ_PIPELINE, SAMPLE_QUEUE } from '../../data/mockData';
import {
  INITIAL_ORDERS,
  INITIAL_ARCHITECTS,
  INITIAL_INVENTORY,
} from '../../data/dashboardMockData';
import {
  ActiveView,
  BOQProject,
  CommercialOrder,
  SampleDispatchItem,
  WarehouseInventoryItem,
  ArchitectPartner,
  Product,
} from '../../types';
import { BrandLogo } from '../common/BrandLogo';

// Import Tabs
import { OverviewTab } from './tabs/OverviewTab';
import { InventoryTab } from './tabs/InventoryTab';
import { QuotationsTab } from './tabs/QuotationsTab';
import { OrdersTab } from './tabs/OrdersTab';
import { SampleRequestsTab } from './tabs/SampleRequestsTab';
import { CustomersTab } from './tabs/CustomersTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { CatalogTab } from './tabs/CatalogTab';
import { ReportsTab } from './tabs/ReportsTab';
import { SettingsTab } from './tabs/SettingsTab';

interface ExecutiveDashboardProps {
  setActiveView: (view: ActiveView) => void;
  onSelectProduct?: (product: Product) => void;
  onOpenNewQuoteModal: () => void;
  onOpenSampleModal: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  setActiveView,
  onSelectProduct,
  onOpenNewQuoteModal,
  onOpenSampleModal,
}) => {
  const [activeTab, setActiveTab] = useState('Overview Dashboard');
  const [dateRange] = useState('01 Nov 2024 – 30 Nov 2024');
  const [pipelineFilter, setPipelineFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Stateful datasets
  const [boqList, setBoqList] = useState<BOQProject[]>(BOQ_PIPELINE);
  const [sampleList, setSampleList] = useState<SampleDispatchItem[]>(SAMPLE_QUEUE);
  const [ordersList, setOrdersList] = useState<CommercialOrder[]>(INITIAL_ORDERS);
  const [inventoryList, setInventoryList] =
    useState<WarehouseInventoryItem[]>(INITIAL_INVENTORY);
  const [architectsList, setArchitectsList] =
    useState<ArchitectPartner[]>(INITIAL_ARCHITECTS);

  // Selected BOQ for overview click
  const [selectedBOQModal, setSelectedBOQModal] = useState<BOQProject | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        if (window.innerWidth >= 1280) {
          setSidebarCollapsed((prev) => !prev);
        } else {
          setMobileSidebarOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const lowStockCount = inventoryList.filter(
    (i) => i.status === 'Low Stock' || i.status === 'Critical'
  ).length;

  const sidebarNavItems = [
    { label: 'Overview Dashboard', icon: LayoutDashboard, badge: null },
    {
      label: 'Inventory & Stock',
      icon: Boxes,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : null,
      badgeColor: 'bg-amber-800 text-white',
    },
    {
      label: 'Quotations',
      icon: FileText,
      badge: `${boqList.length}`,
      badgeColor: 'bg-zinc-800 text-zinc-300',
    },
    {
      label: 'Orders',
      icon: ShoppingBag,
      badge: `${ordersList.length}`,
      badgeColor: 'bg-zinc-800 text-zinc-300',
    },
    {
      label: 'Sample Requests',
      icon: Send,
      badge: `${sampleList.length}`,
      badgeColor: 'bg-zinc-800 text-zinc-300',
    },
    { label: 'Customers & Architects', icon: Users, badge: null },
    { label: 'Analytics & Margin', icon: TrendingUp, badge: null },
    { label: 'Product Catalogue', icon: BookOpen, badge: null },
    { label: 'Reports', icon: FileSpreadsheet, badge: null },
    { label: 'Settings', icon: Settings, badge: null },
  ];

  // Updaters
  const handleUpdateBOQStage = (id: string, newStage: BOQProject['stage']) => {
    setBoqList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, stage: newStage, lastUpdate: 'Just now' } : b))
    );
  };

  const handleUpdateSampleStatus = (id: string, newStatus: SampleDispatchItem['status']) => {
    setSampleList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const handleUpdateDeliveryStatus = (
    orderId: string,
    newStatus: CommercialOrder['deliveryStatus']
  ) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, deliveryStatus: newStatus } : o))
    );
  };

  const handleUpdateStock = (itemId: string, newStock: number, note: string) => {
    setInventoryList((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const status =
            newStock <= 0
              ? 'Critical'
              : newStock <= item.reorderLevel
              ? 'Low Stock'
              : 'In Stock';
          return { ...item, availableStock: newStock, status };
        }
        return item;
      })
    );
  };

  const handleLogMeeting = (architectId: string, note: string) => {
    setArchitectsList((prev) =>
      prev.map((arch) =>
        arch.id === architectId ? { ...arch, lastMeeting: 'Just now' } : arch
      )
    );
  };

  // Filtered BOQ for Overview
  const filteredBOQ = boqList.filter((boq) => {
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
    <div className="min-h-screen bg-zinc-50/70 flex flex-col xl:flex-row text-zinc-900 font-sans relative">
      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-700 animate-in slide-in-from-bottom-5 duration-300 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium leading-relaxed flex-1">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. DESKTOP ARCHITECTURAL SIDEBAR (COLLAPSIBLE) */}
      <aside
        className={`hidden xl:flex flex-col justify-between shrink-0 bg-zinc-950 text-zinc-300 border-r border-zinc-800/80 transition-all duration-300 select-none z-20 ${
          sidebarCollapsed ? 'w-20 p-3.5' : 'w-64 p-5'
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Collapse Toggle */}
          <div className="pb-4 border-b border-zinc-800/80 flex items-center justify-between gap-2">
            {!sidebarCollapsed ? (
              <>
                <BrandLogo
                  variant="light"
                  size="sm"
                  showTagline={false}
                  onClick={() => setActiveView('home')}
                />
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                  title="Collapse Sidebar (Ctrl+B)"
                  aria-label="Collapse Sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="w-full flex flex-col items-center gap-3">
                <div
                  onClick={() => setActiveView('home')}
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-amber-500/40 flex items-center justify-center cursor-pointer hover:border-amber-400 transition-all"
                  title="Saleem Traders - Return to Home"
                >
                  <span className="font-serif text-[#d5b282] font-semibold text-xs tracking-tight">
                    ST
                  </span>
                </div>
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                  title="Expand Sidebar (Ctrl+B)"
                  aria-label="Expand Sidebar"
                >
                  <PanelLeftOpen className="w-4 h-4" />
                </button>
              </div>
            )}
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
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-medium transition-all ${
                    sidebarCollapsed
                      ? 'justify-center p-3 relative'
                      : 'justify-between px-3.5 py-2.5'
                  } ${
                    isActive
                      ? 'bg-zinc-800/90 text-white shadow-xs font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-amber-500' : 'text-zinc-400'
                      }`}
                    />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ml-1 ${
                        item.badgeColor || 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {sidebarCollapsed && item.badge && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pinned Bottom Tenant Profile Card */}
        <div className="pt-5 mt-6 border-t border-zinc-800/80 space-y-3">
          {!sidebarCollapsed ? (
            <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 text-white font-serif font-medium text-xs flex items-center justify-center">
                  AH
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="text-xs font-semibold text-white truncate">Ahmad Hassan</h5>
                <p className="text-[11px] text-zinc-400 truncate">Executive Director</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="Ahmad Hassan (Executive Director)">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 text-white font-serif font-medium text-xs flex items-center justify-center">
                  AH
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
              </div>
            </div>
          )}

          <button
            onClick={() => setActiveView('home')}
            title={sidebarCollapsed ? 'Return to Storefront' : undefined}
            className={`w-full flex items-center rounded-lg border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs transition-colors ${
              sidebarCollapsed ? 'justify-center p-2.5' : 'justify-center gap-2 py-2 px-3'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            {!sidebarCollapsed && <span>Return to Storefront</span>}
          </button>
        </div>
      </aside>

      {/* 2. MOBILE / TABLET SIDEBAR DRAWER (OVERLAY) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Slide-over Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-zinc-950 text-zinc-300 p-5 flex flex-col justify-between z-50 border-r border-zinc-800 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <BrandLogo
                  variant="light"
                  size="sm"
                  showTagline={false}
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    setActiveView('home');
                  }}
                />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1">
                {sidebarNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setActiveTab(item.label);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-zinc-800/90 text-white font-semibold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-amber-500' : 'text-zinc-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            item.badgeColor || 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-5 mt-6 border-t border-zinc-800 space-y-3">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 text-white font-serif font-medium text-xs flex items-center justify-center">
                    AH
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-semibold text-white truncate">Ahmad Hassan</h5>
                  <p className="text-[11px] text-zinc-400 truncate">Executive Director</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  setActiveView('home');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Storefront</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            {/* Sidebar Toggle Button (Desktop & Mobile) */}
            <button
              id="dashboard-sidebar-toggle"
              onClick={() => {
                if (window.innerWidth >= 1280) {
                  setSidebarCollapsed((prev) => !prev);
                } else {
                  setMobileSidebarOpen((prev) => !prev);
                }
              }}
              className="p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 transition-colors shadow-2xs flex items-center justify-center shrink-0 cursor-pointer"
              title={sidebarCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)'}
              aria-label="Toggle Sidebar"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-zinc-700" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {/* Quick Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:border-amber-800 focus:bg-white transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Right Tools & Actions */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Date Range Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-600 bg-white shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </div>

            {/* + New Quote Button */}
            <button
              onClick={onOpenNewQuoteModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Quote</span>
            </button>

            {/* Dispatch Samples Button */}
            <button
              onClick={onOpenSampleModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 border border-zinc-200 hover:border-zinc-300 bg-white text-zinc-700 text-xs font-medium rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-800" />
              <span>Dispatch Samples</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => showToast('3 recent notifications: 1 container cleared customs, 2 quotes signed.')}
              className="relative p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 bg-amber-800 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Greeting Row & Tab Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 font-sans">
                  Enterprise Architecture Portal
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-xs font-semibold text-zinc-500">{activeTab}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-zinc-900 tracking-tight mt-1 leading-snug">
                {activeTab === 'Overview Dashboard' && 'Good Morning, Ahmad'}
                {activeTab === 'Inventory & Stock' && 'Warehouse Stock & Depletion Feeds'}
                {activeTab === 'Quotations' && 'Active BOQ Pipeline & Proposals'}
                {activeTab === 'Orders' && 'Commercial Dispatches & Freight'}
                {activeTab === 'Sample Requests' && 'Architect Sample Dispatch Queue'}
                {activeTab === 'Customers & Architects' && 'Architectural Partners & Specifiers'}
                {activeTab === 'Analytics & Margin' && 'Profit Margin & Financial Analytics'}
                {activeTab === 'Product Catalogue' && 'Enterprise Material Catalogue'}
                {activeTab === 'Reports' && 'Statutory & Operational Reports'}
                {activeTab === 'Settings' && 'Portal Preferences & Configuration'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mt-1 max-w-2xl">
                {activeTab === 'Overview Dashboard' &&
                  "Here's what's happening with your business and specification queue today."}
                {activeTab === 'Inventory & Stock' &&
                  'Monitor inventory levels, adjust warehouse quantities, and track incoming European sea freight.'}
                {activeTab === 'Quotations' &&
                  'Track architectural Bill of Quantities, update deal stages, and export certified specifications.'}
                {activeTab === 'Orders' &&
                  'Fulfill commercial dispatches, manage job site deliveries, and print official challans.'}
                {activeTab === 'Sample Requests' &&
                  'Expedite sample boxes, track courier waybills, and service lead architects.'}
                {activeTab === 'Customers & Architects' &&
                  'Collaborate with certified architecture studios, high-rise builders, and VIP specifiers.'}
                {activeTab === 'Analytics & Margin' &&
                  'Examine gross margins, category profitability, and regional demand dynamics.'}
                {activeTab === 'Product Catalogue' &&
                  'Internal contractor price book with retail MSRP, wholesale discounts, and CAD specifications.'}
                {activeTab === 'Reports' &&
                  'Download certified FBR tax reports, inventory valuations, and rebate schedules.'}
                {activeTab === 'Settings' &&
                  'Manage organization profiles, tax configurations, and system access rights.'}
              </p>
            </div>

            <div className="hidden sm:block text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-semibold text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Enterprise Suite • FY2024</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC TAB CONTENT */}
          {activeTab === 'Overview Dashboard' && (
            <OverviewTab
              filteredBOQ={filteredBOQ}
              pipelineFilter={pipelineFilter}
              setPipelineFilter={setPipelineFilter}
              samples={sampleList}
              onOpenNewQuoteModal={onOpenNewQuoteModal}
              onOpenSampleModal={onOpenSampleModal}
              onSelectBOQ={(boq) => setSelectedBOQModal(boq)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'Inventory & Stock' && (
            <InventoryTab
              inventory={inventoryList}
              onUpdateStock={handleUpdateStock}
              showToast={showToast}
            />
          )}

          {activeTab === 'Quotations' && (
            <QuotationsTab
              boqList={boqList}
              onUpdateStage={handleUpdateBOQStage}
              onOpenNewQuoteModal={onOpenNewQuoteModal}
              showToast={showToast}
            />
          )}

          {activeTab === 'Orders' && (
            <OrdersTab
              orders={ordersList}
              onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
              showToast={showToast}
            />
          )}

          {activeTab === 'Sample Requests' && (
            <SampleRequestsTab
              samples={sampleList}
              onUpdateSampleStatus={handleUpdateSampleStatus}
              onOpenSampleModal={onOpenSampleModal}
              showToast={showToast}
            />
          )}

          {activeTab === 'Customers & Architects' && (
            <CustomersTab
              architects={architectsList}
              onLogMeeting={handleLogMeeting}
              showToast={showToast}
            />
          )}

          {activeTab === 'Analytics & Margin' && (
            <AnalyticsTab showToast={showToast} />
          )}

          {activeTab === 'Product Catalogue' && (
            <CatalogTab
              onSelectProduct={onSelectProduct}
              showToast={showToast}
            />
          )}

          {activeTab === 'Reports' && (
            <ReportsTab showToast={showToast} />
          )}

          {activeTab === 'Settings' && (
            <SettingsTab showToast={showToast} />
          )}
        </main>

        {/* Dashboard Footer */}
        <footer className="bg-white border-t border-zinc-200/80 px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3 mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800">SALEEM TRADERS</span>
            <span>• Enterprise Architecture & BOQ Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('Settings')}
              className="hover:text-zinc-800 transition-colors"
            >
              System Security
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('Customers & Architects')}
              className="hover:text-zinc-800 transition-colors"
            >
              Showroom Directory
            </button>
            <span>•</span>
            <a href="tel:+9242111725336" className="text-amber-800 font-medium hover:underline">
              +92 (42) 111-SALEEM
            </a>
          </div>
        </footer>
      </div>

      {/* BOQ Modal (when clicked from Overview tab) */}
      {selectedBOQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setSelectedBOQModal(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10 border border-zinc-200 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                  BOQ #{selectedBOQModal.number}
                </span>
                <h3 className="font-serif text-xl font-medium text-zinc-900 mt-0.5">
                  {selectedBOQModal.projectName}
                </h3>
                <p className="text-xs text-zinc-500">{selectedBOQModal.location}</p>
              </div>
              <button
                onClick={() => setSelectedBOQModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Proposal Value:</span>
                <span className="font-bold text-amber-800 font-mono text-sm">
                  Rs. {selectedBOQModal.formattedValue}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Current Stage:</span>
                <span className="font-semibold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200">
                  {selectedBOQModal.stage}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Last Activity:</span>
                <span className="text-zinc-600">{selectedBOQModal.lastUpdate}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedBOQModal(null)}
                className="px-4 py-2 border border-zinc-200 text-zinc-600 rounded-xl text-xs font-medium hover:bg-zinc-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedBOQModal(null);
                  setActiveTab('Quotations');
                }}
                className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Open in Quotations Tab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
