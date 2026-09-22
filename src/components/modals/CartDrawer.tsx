import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, FileText, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToQuote: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToQuote,
}) => {
  if (!isOpen) return null;

  const totalEstimate = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#fbf9f5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded border border-[#886d4b]/30 bg-[#886d4b]/10 flex items-center justify-center text-[#886d4b]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-editorial text-lg font-normal text-stone-900 tracking-[-0.01em]">
                  Selected BOQ Items
                </h2>
                <span className="text-[10px] text-stone-500 font-sans tracking-wider uppercase block">Specification Docket</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-stone-700">No items selected yet.</p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Add tiles, marble slabs, or sanitaryware from the catalog to build your project quote.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-lg border border-stone-200 bg-stone-50/40 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded object-cover border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {item.selectedThickness ? `${item.selectedThickness} • ` : ''}
                      {item.product.dimensions}
                    </p>

                    <div className="mt-1 text-xs font-bold text-stone-900">
                      {item.product.currency} {item.product.price.toLocaleString()}{' '}
                      <span className="text-[10px] text-stone-400 font-normal">
                        {item.product.priceUnit}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[11px] text-rose-600 hover:text-rose-800 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & submit */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-stone-500 font-light">Estimated Base Value</span>
                <span className="font-editorial text-xl font-normal text-stone-900 tracking-tight">
                  PKR {totalEstimate.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-light leading-relaxed">
                Official contractor rates, volume discounts and shipping freight will be finalized in your customized BOQ.
              </p>

              <button
                onClick={() => {
                  onClose();
                  onProceedToQuote();
                }}
                className="w-full py-3.5 bg-[#886d4b] hover:bg-[#73593b] text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Finalize & Request Official Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
