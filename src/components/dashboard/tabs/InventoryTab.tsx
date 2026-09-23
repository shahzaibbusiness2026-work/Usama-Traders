import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Plus,
  Minus,
  Edit3,
  MapPin,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import { WarehouseInventoryItem } from '../../../types';
import { INCOMING_SHIPMENTS } from '../../../data/mockData';

interface InventoryTabProps {
  inventory: WarehouseInventoryItem[];
  onUpdateStock: (itemId: string, newStock: number, note: string) => void;
  showToast: (msg: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  inventory,
  onUpdateStock,
  showToast,
  searchQuery: externalSearchQuery,
  onSearchChange,
  onNavigateTab,
}) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('All Warehouses');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  const currentSearch = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const handleSearchChange = (val: string) => {
    setInternalSearchQuery(val);
    onSearchChange?.(val);
  };

  // Stock Adjustment Modal State
  const [adjustingItem, setAdjustingItem] = useState<WarehouseInventoryItem | null>(null);
  const [adjustType, setAdjustType] = useState<'add' | 'subtract'>('add');
  const [adjustQty, setAdjustQty] = useState<number>(5);
  const [adjustReason, setAdjustReason] = useState('New Container Received');

  const warehouses = [
    'All Warehouses',
    'Raiwind Central Yard',
    'Gulberg Design Hub',
    'Islamabad DC',
  ];

  const categories = [
    'All',
    'Marble Slabs',
    'Tiles & Porcelain',
    'Sanitaryware',
    'Showers & Brassware',
    'Vanities',
    'Sinks & Taps',
  ];

  const filteredItems = inventory.filter((item) => {
    if (selectedWarehouse !== 'All Warehouses' && item.warehouse !== selectedWarehouse) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && item.status !== selectedStatus) return false;
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.specs.toLowerCase().includes(q) ||
        item.warehouse.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const lowStockCount = inventory.filter(
    (i) => i.status === 'Low Stock' || i.status === 'Critical'
  ).length;

  const handleApplyAdjustment = () => {
    if (!adjustingItem) return;
    const currentStock = adjustingItem.availableStock;
    const finalStock =
      adjustType === 'add'
        ? currentStock + Number(adjustQty)
        : Math.max(0, currentStock - Number(adjustQty));

    onUpdateStock(
      adjustingItem.id,
      finalStock,
      `${adjustReason}: ${adjustType === 'add' ? '+' : '-'}${adjustQty} ${adjustingItem.unit}`
    );
    showToast(
      `Inventory for ${adjustingItem.name} updated to ${finalStock} ${adjustingItem.unit}`
    );
    setAdjustingItem(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Low Stock':
        return 'bg-amber-50 text-amber-800 border-amber-200/60';
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'Incoming':
        return 'bg-sky-50 text-sky-800 border-sky-200/60';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Inventory Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Total Stocked Value</span>
            <Boxes className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              Rs. 342.8M
            </div>
            <div className="text-xs text-zinc-500 mt-1">Across 3 regional hubs</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Catalog SKUs</span>
            <Layers className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              {inventory.length} Verified
            </div>
            <div className="text-xs text-zinc-500 mt-1">Tiles, Slabs, Sanitary & Brassware</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Depletion Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-amber-800 font-sans">
              {lowStockCount} Needs Reorder
            </div>
            <div className="text-xs text-zinc-500 mt-1">Below minimum threshold</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Incoming Freight</span>
            <Truck className="w-4 h-4 text-sky-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              4 Shipments
            </div>
            <div className="text-xs text-zinc-500 mt-1">En route from Spain & Italy</div>
          </div>
        </div>
      </div>

      {/* Warehouse Selector & Controls */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
        {/* Warehouse Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {warehouses.map((wh) => (
              <button
                key={wh}
                onClick={() => setSelectedWarehouse(wh)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedWarehouse === wh
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {wh}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-500 font-medium">
            Showing <span className="font-bold text-zinc-800">{filteredItems.length}</span> items
          </div>
        </div>

        {/* Filters and Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <input
              type="text"
              placeholder="Search by SKU, product name, brand or dimensions..."
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

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-700 focus:outline-none focus:border-amber-800"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-700 focus:outline-none focus:border-amber-800"
            >
              <option value="All">All Stock Levels</option>
              <option value="In Stock">In Stock Only</option>
              <option value="Low Stock">Low Stock Alert</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
              <tr>
                <th className="py-3.5 px-6">Product & SKU</th>
                <th className="py-3.5 px-6">Category & Brand</th>
                <th className="py-3.5 px-6">Warehouse Location</th>
                <th className="py-3.5 px-6 text-right">Stock Level</th>
                <th className="py-3.5 px-6 text-right">Contractor Price</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/60 transition-colors">
                  {/* Product & SKU */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-200 shadow-2xs shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-zinc-900 text-sm">{item.name}</div>
                        <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                          SKU: {item.sku}
                        </div>
                        <div className="text-[11px] text-zinc-400 line-clamp-1">{item.specs}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category & Brand */}
                  <td className="py-4 px-6">
                    <span className="font-medium text-zinc-800 text-xs block">{item.category}</span>
                    <span className="text-[11px] text-amber-800 font-semibold">{item.brand}</span>
                  </td>

                  {/* Warehouse Location */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-zinc-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{item.warehouse}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono mt-0.5 block pl-5">
                      {item.binLocation}
                    </span>
                  </td>

                  {/* Stock Level */}
                  <td className="py-4 px-6 text-right font-mono">
                    <div className="font-bold text-sm text-zinc-900">
                      {item.availableStock.toLocaleString()} {item.unit}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Reorder at: {item.reorderLevel} {item.unit}
                    </div>
                  </td>

                  {/* Pricing */}
                  <td className="py-4 px-6 text-right font-mono">
                    <div className="font-bold text-sm text-zinc-900">
                      Rs. {item.tradePrice.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Cost: Rs. {item.costPrice.toLocaleString()}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setAdjustingItem(item);
                        setAdjustQty(5);
                        setAdjustType('add');
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-100 hover:bg-amber-800 hover:text-white text-zinc-700 text-xs font-semibold rounded-lg transition-colors"
                      title="Adjust Stock Quantity"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Adjust</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incoming Containers Section */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
              Supply Chain
            </span>
            <h3 className="font-serif text-xl font-medium text-zinc-900 tracking-tight mt-0.5">
              Live Sea Freight & Container Tracking
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold rounded-full">
            <Truck className="w-3.5 h-3.5" />
            Port Qasim / Karachi Customs Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INCOMING_SHIPMENTS.map((ship, idx) => (
            <div
              key={ship.id}
              className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/60 space-y-2 hover:border-zinc-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold uppercase bg-zinc-200/70 text-zinc-700 px-2 py-0.5 rounded">
                  Container 40ft HQ #{idx + 104}
                </span>
                <span className="text-[11px] font-medium text-sky-700">{ship.status}</span>
              </div>
              <h4 className="font-semibold text-xs text-zinc-900 line-clamp-1">{ship.title}</h4>
              <div className="text-[11px] text-zinc-500 flex items-center justify-between pt-1">
                <span>Arrival:</span>
                <span className="font-bold text-zinc-800">{ship.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setAdjustingItem(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 border border-zinc-200 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-serif text-xl font-medium text-zinc-900">
                Adjust Warehouse Inventory
              </h3>
              <button
                onClick={() => setAdjustingItem(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-3">
              <img
                src={adjustingItem.image}
                alt={adjustingItem.name}
                className="w-12 h-12 rounded-lg object-cover border border-zinc-200"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-zinc-900 truncate">
                  {adjustingItem.name}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  Current Stock:{' '}
                  <span className="font-bold text-zinc-800 font-mono">
                    {adjustingItem.availableStock} {adjustingItem.unit}
                  </span>
                </p>
                <p className="text-[10px] text-zinc-400">{adjustingItem.warehouse}</p>
              </div>
            </div>

            {/* Action Type Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">Adjustment Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustType('add')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    adjustType === 'add'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Receive Stock (+)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustType('subtract')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    adjustType === 'subtract'
                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <Minus className="w-4 h-4 text-rose-600" />
                  <span>Deduct Stock (-)</span>
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Quantity ({adjustingItem.unit})
              </label>
              <input
                type="number"
                min="1"
                value={adjustQty}
                onChange={(e) => setAdjustQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold font-mono text-zinc-900 focus:outline-none focus:border-amber-800"
              />
            </div>

            {/* Reason */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">Audit / Log Reason</label>
              <select
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-700 focus:outline-none focus:border-amber-800"
              >
                {adjustType === 'add' ? (
                  <>
                    <option>New Container Received</option>
                    <option>Purchase Return from Job Site</option>
                    <option>Stock Count Recalibration</option>
                  </>
                ) : (
                  <>
                    <option>Project Dispatch Fulfillment</option>
                    <option>Architect Sample Pull</option>
                    <option>Damaged or Breakage Write-off</option>
                    <option>Showroom Display Model</option>
                  </>
                )}
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setAdjustingItem(null)}
                className="px-4 py-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-xl text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyAdjustment}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Confirm & Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
