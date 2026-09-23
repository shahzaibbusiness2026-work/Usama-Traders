import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Eye,
  Printer,
  X,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { CommercialOrder } from '../../../types';

interface OrdersTabProps {
  orders: CommercialOrder[];
  onUpdateDeliveryStatus: (orderId: string, newStatus: CommercialOrder['deliveryStatus']) => void;
  showToast: (msg: string) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  onUpdateDeliveryStatus,
  showToast,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrderModal, setActiveOrderModal] = useState<CommercialOrder | null>(null);

  const statuses = ['All', 'Processing', 'Dispatched', 'In Transit', 'Delivered', 'On Hold'];

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus !== 'All' && o.deliveryStatus !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.companyOrFirm.toLowerCase().includes(q) ||
        o.projectSite.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getDeliveryStatusBadge = (status: CommercialOrder['deliveryStatus']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Dispatched':
        return 'bg-sky-50 text-sky-800 border-sky-200/60';
      case 'In Transit':
        return 'bg-blue-50 text-blue-800 border-blue-200/60';
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-200/60';
      case 'On Hold':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const getPaymentBadge = (status: CommercialOrder['paymentStatus']) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700';
      case '50% Advance':
        return 'bg-amber-50 text-amber-800';
      case 'Net 30 Credit':
        return 'bg-purple-50 text-purple-800';
      default:
        return 'bg-zinc-100 text-zinc-600';
    }
  };

  const handlePrintChallan = (order: CommercialOrder) => {
    showToast(`Printing Delivery Challan & Gate Pass for ${order.orderNumber}...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Dispatched This Month</span>
            <ShoppingBag className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              64 Shipments
            </div>
            <div className="text-xs text-zinc-500 mt-1">Totaling Rs. 48.6M value</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>En Route Deliveries</span>
            <Truck className="w-4 h-4 text-sky-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-sky-700 font-sans">
              {orders.filter((o) => o.deliveryStatus === 'In Transit' || o.deliveryStatus === 'Dispatched').length} Active
            </div>
            <div className="text-xs text-zinc-500 mt-1">Saleem Fleet & Couriers</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>On-Time Delivery</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-emerald-700 font-sans">
              98.4%
            </div>
            <div className="text-xs text-zinc-500 mt-1">Zero damage claims on slabs</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Pending Clearance</span>
            <Clock className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              Rs. 14.1M
            </div>
            <div className="text-xs text-zinc-500 mt-1">Scheduled for this weekend</div>
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
              placeholder="Search by order ID, customer or site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs placeholder-zinc-400 focus:outline-none focus:border-amber-800 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Master Orders Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
              <tr>
                <th className="py-3.5 px-6 w-28">Order #</th>
                <th className="py-3.5 px-6">Customer & Company</th>
                <th className="py-3.5 px-6">Project Site & Scope</th>
                <th className="py-3.5 px-6 text-right">Amount (PKR)</th>
                <th className="py-3.5 px-6 text-center">Payment</th>
                <th className="py-3.5 px-6 text-center">Fulfillment Status</th>
                <th className="py-3.5 px-6 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-zinc-900 text-xs">
                    {ord.orderNumber}
                    <div className="text-[10px] text-zinc-400 font-normal font-sans">
                      {ord.orderDate}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-semibold text-zinc-900 text-sm">{ord.customerName}</div>
                    <div className="text-[11px] text-amber-800 font-medium">
                      {ord.companyOrFirm}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-zinc-800 font-medium text-xs">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate max-w-[260px]">{ord.projectSite}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 truncate max-w-[260px]">
                      {ord.itemsSummary}
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right font-mono">
                    <div className="font-bold text-sm text-zinc-900">
                      Rs. {ord.formattedAmount}
                    </div>
                    <div className="text-[10px] text-zinc-400">Total Incl. GST</div>
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${getPaymentBadge(
                        ord.paymentStatus
                      )}`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-center">
                    <select
                      value={ord.deliveryStatus}
                      onChange={(e) => {
                        const newStatus = e.target.value as CommercialOrder['deliveryStatus'];
                        onUpdateDeliveryStatus(ord.id, newStatus);
                        showToast(`Order ${ord.orderNumber} status updated to: ${newStatus}`);
                      }}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${getDeliveryStatusBadge(
                        ord.deliveryStatus
                      )}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </td>

                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setActiveOrderModal(ord)}
                        className="p-1.5 text-zinc-600 hover:text-amber-800 hover:bg-zinc-100 rounded-lg transition-colors"
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintChallan(ord)}
                        className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                        title="Print Delivery Challan"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setActiveOrderModal(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200 animate-in zoom-in-95 duration-200 space-y-5">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 font-sans">
                  DISPATCH ORDER MANIFEST
                </span>
                <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-1">
                  {activeOrderModal.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Customer Name:</span>
                  <span className="font-bold text-zinc-900">{activeOrderModal.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Firm / Company:</span>
                  <span className="font-semibold text-amber-800">{activeOrderModal.companyOrFirm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Destination Site:</span>
                  <span className="font-medium text-zinc-800">{activeOrderModal.projectSite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Carrier / Truck:</span>
                  <span className="font-medium text-zinc-800">{activeOrderModal.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tracking Reference:</span>
                  <span className="font-mono font-bold text-zinc-800">
                    {activeOrderModal.trackingNumber}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-1.5">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Materials Manifest
                </span>
                <p className="font-medium text-zinc-900 text-sm leading-relaxed">
                  {activeOrderModal.itemsSummary}
                </p>
                <div className="flex justify-between pt-2 border-t border-zinc-200 font-bold">
                  <span>Total Invoiced:</span>
                  <span className="text-amber-800 font-mono text-sm">
                    Rs. {activeOrderModal.formattedAmount}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveOrderModal(null)}
                className="px-4 py-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-xl text-xs font-medium"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePrintChallan(activeOrderModal);
                  setActiveOrderModal(null);
                }}
                className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Gate Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
