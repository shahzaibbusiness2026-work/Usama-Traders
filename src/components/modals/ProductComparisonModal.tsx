import React from 'react';
import { X, Check, Trash2, Plus, ArrowRight, FileText, ExternalLink, Layers } from 'lucide-react';
import { Product } from '../../types';

interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  allProducts?: Product[];
  onAddProductToCompare?: (product: Product) => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveProduct,
  onClearAll,
  onSelectProduct,
  onAddToCart,
  allProducts = [],
  onAddProductToCompare,
}) => {
  if (!isOpen) return null;

  // Attributes to compare
  const attributes = [
    { label: 'Category', key: 'category' },
    { label: 'Type / Material', key: 'type' },
    { label: 'Surface Finish', key: 'finish' },
    { label: 'Dimensions', key: 'dimensions' },
    { label: 'Price (PKR)', key: 'price' },
    { label: 'Availability', key: 'inStock' },
    { label: 'Architectural Use', key: 'applications' },
  ];

  const availableToAdd = allProducts.filter(
    (p) => !comparedProducts.some((cp) => cp.id === p.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-none sm:rounded-xl max-w-5xl w-full shadow-2xl border border-stone-200 relative my-6 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-[1.5px] w-5 bg-[#7E6348]" />
              <span className="tracking-[0.25em] text-xs font-semibold text-[#7E6348] uppercase font-sans">
                SPECIFICATION COMPARISON TOOL
              </span>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl font-normal text-stone-900 tracking-tight">
              Side-by-Side Architectural Evaluation
            </h2>
            <p className="text-[13px] text-stone-600 font-normal mt-0.5">
              Review surface finish, slab caliber, dimensions, and commercial rates for up to 3 materials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={onClearAll}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 border border-stone-200 hover:border-stone-300 rounded transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200/50 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F1EA] flex items-center justify-center mx-auto text-[#7E6348]">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-normal text-stone-900">
                No Products Selected For Comparison
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto font-normal">
                Click the comparison icon on any product in the catalog to compare technical specifications, finishes, and project pricing.
              </p>
              {allProducts.length > 0 && onAddProductToCompare && (
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-[0.16em] text-stone-500 block mb-3 font-semibold">
                    Quick Pick From Catalog
                  </span>
                  <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                    {allProducts.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onAddProductToCompare(p)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 hover:border-[#7E6348] rounded text-xs text-stone-800 transition-colors shadow-2xs"
                      >
                        <Plus className="w-3 h-3 text-[#7E6348]" />
                        <span className="truncate max-w-[140px]">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="min-w-[620px]">
              {/* Product Cards Top Grid */}
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-stone-200 items-start">
                <div className="col-span-1 pt-4 pr-2">
                  <span className="tracking-[0.2em] text-xs font-semibold text-stone-500 uppercase block">
                    Product Matrix
                  </span>
                  <span className="text-xs text-stone-500 block mt-1">
                    {comparedProducts.length} of 3 items selected
                  </span>
                </div>

                {/* Compared Products (up to 3 columns) */}
                {[0, 1, 2].map((idx) => {
                  const product = comparedProducts[idx];
                  if (!product) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="col-span-1 p-4 border border-dashed border-stone-300 rounded-lg bg-[#FAF8F5]/60 flex flex-col items-center justify-center text-center min-h-[220px]"
                      >
                        <div className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 mb-2">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-stone-700 mb-1">
                          Empty Comparison Slot
                        </span>
                        <p className="text-[11px] text-stone-500 mb-3">
                          Select another product to compare side-by-side
                        </p>

                        {availableToAdd.length > 0 && onAddProductToCompare && (
                          <select
                            onChange={(e) => {
                              const found = availableToAdd.find((p) => p.id === e.target.value);
                              if (found) onAddProductToCompare(found);
                            }}
                            defaultValue=""
                            className="text-[11px] px-2 py-1.5 bg-white border border-stone-200 rounded text-stone-700 max-w-[160px] focus:outline-none focus:border-[#7E6348]"
                          >
                            <option value="" disabled>
                              + Add product...
                            </option>
                            {availableToAdd.slice(0, 10).map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={product.id}
                      className="col-span-1 bg-white border border-stone-200 rounded-lg p-3 shadow-2xs relative group hover:border-[#7E6348]/60 transition-all"
                    >
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-stone-400 hover:text-rose-600 rounded-full border border-stone-200 z-10 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="aspect-[4/3] w-full rounded overflow-hidden mb-3 bg-stone-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="tracking-[0.25em] text-[10px] font-semibold text-[#7E6348] uppercase font-sans mb-1">
                        {product.category}
                      </div>

                      <h4
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="font-serif text-base font-medium text-stone-900 line-clamp-2 hover:text-[#7E6348] cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h4>

                      <div className="mt-2 text-sm font-semibold text-stone-900 font-sans">
                        {product.currency} {product.price.toLocaleString()}{' '}
                        <span className="text-xs text-stone-500 font-normal font-sans">
                          {product.priceUnit}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 mt-3 pt-2 border-t border-stone-100">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="py-1.5 px-2 bg-[#7E6348] hover:bg-[#A38A6B] text-white text-[11px] font-medium uppercase tracking-[0.06em] rounded-none flex items-center justify-center gap-1 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Quote</span>
                        </button>
                        <button
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="py-1.5 px-2 border border-stone-300 hover:border-stone-500 text-stone-800 text-[11px] font-medium uppercase tracking-[0.06em] rounded-none flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tabular Attribute Comparison */}
              <div className="divide-y divide-stone-200">
                {attributes.map((attr) => (
                  <div key={attr.key} className="grid grid-cols-4 py-3.5 items-center hover:bg-stone-50/70 transition-colors">
                    <div className="col-span-1 pr-4">
                      <span className="text-xs font-semibold text-stone-800 tracking-wide font-sans">
                        {attr.label}
                      </span>
                    </div>

                    {[0, 1, 2].map((idx) => {
                      const product = comparedProducts[idx];
                      if (!product) {
                        return (
                          <div key={`attr-empty-${idx}`} className="col-span-1 px-3 text-stone-300 text-xs italic">
                            —
                          </div>
                        );
                      }

                      let displayValue: React.ReactNode = '—';
                      if (attr.key === 'category') {
                        displayValue = (
                          <span className="text-xs text-stone-700 font-medium">
                            {product.category}
                          </span>
                        );
                      } else if (attr.key === 'type') {
                        displayValue = (
                          <span className="text-xs text-stone-700 font-normal">
                            {product.type || product.material || 'Architectural Surface'}
                          </span>
                        );
                      } else if (attr.key === 'finish') {
                        displayValue = (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F5F1EA] text-[#7E6348] border border-[#7E6348]/20 text-[11px] font-medium">
                            {product.finish || 'Polished'}
                          </span>
                        );
                      } else if (attr.key === 'dimensions') {
                        displayValue = (
                          <span className="text-xs text-stone-700 font-normal">
                            {product.dimensions || 'Custom Sizing'}
                          </span>
                        );
                      } else if (attr.key === 'price') {
                        displayValue = (
                          <span className="text-xs font-semibold text-stone-900 font-sans">
                            {product.currency} {product.price.toLocaleString()} {product.priceUnit}
                          </span>
                        );
                      } else if (attr.key === 'inStock') {
                        displayValue = product.inStock ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>In Stock (Warehouse Ready)</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Import Upon Request
                          </span>
                        );
                      } else if (attr.key === 'applications') {
                        displayValue = (
                          <span className="text-xs text-stone-600 font-normal leading-relaxed">
                            {product.applications && product.applications.length > 0
                              ? product.applications.join(', ')
                              : 'Flooring, Feature Walls, Counters, Luxury Bathrooms'}
                          </span>
                        );
                      }

                      return (
                        <div key={`attr-${product.id}-${attr.key}`} className="col-span-1 px-3">
                          {displayValue}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-stone-500 font-normal">
            Need customized architectural specification schedules or CAD details? Contact our project desk directly.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-stone-300 hover:border-stone-500 text-stone-800 text-xs font-medium tracking-[0.1em] uppercase rounded-none transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
