import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Eye,
  Download,
  LayoutGrid,
  List,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Product } from '../../../types';
import { CATALOG_PRODUCTS, NEW_ARRIVALS } from '../../../data/mockData';

interface CatalogTabProps {
  onSelectProduct?: (product: Product) => void;
  showToast: (msg: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const CatalogTab: React.FC<CatalogTabProps> = ({
  onSelectProduct,
  showToast,
  searchQuery: externalSearchQuery,
  onSearchChange,
  onNavigateTab,
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const currentSearch = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const handleSearchChange = (val: string) => {
    setInternalSearchQuery(val);
    onSearchChange?.(val);
  };

  const combinedProducts: Product[] = [
    ...CATALOG_PRODUCTS,
    ...NEW_ARRIVALS.filter((n) => !CATALOG_PRODUCTS.some((c) => c.id === n.id)),
  ];

  const categories = [
    'All',
    'MARBLE SLABS',
    'SANITARY WARE',
    'BASINS',
    'BATHROOM FITTINGS',
    'Tiles & Slabs',
    'Sanitaryware',
    'Showers',
    'Sinks & Taps',
    'Vanities',
  ];

  const filteredProducts = combinedProducts.filter((p) => {
    if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase())
      return false;
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        p.finish.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDownloadSpec = (product: Product) => {
    showToast(`Downloading Technical CAD Specification & BIM file for ${product.name}...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Controls */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
              Master Product Repository
            </span>
            <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
              Architectural Product Catalogue & Price Book
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                viewMode === 'table'
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              placeholder="Search catalogue by name, material, finish or brand..."
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
        </div>
      </div>

      {/* Main View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
                <tr>
                  <th className="py-3.5 px-6">Product Details</th>
                  <th className="py-3.5 px-6">Category / Brand</th>
                  <th className="py-3.5 px-6">Dimensions & Finish</th>
                  <th className="py-3.5 px-6 text-right">Retail Price</th>
                  <th className="py-3.5 px-6 text-right">Contractor Wholesale</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-800">
                {filteredProducts.map((p) => {
                  const contractorPrice = Math.round(p.price * 0.82);
                  return (
                    <tr key={p.id} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-zinc-200 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-zinc-900 text-sm">{p.name}</div>
                            {p.subtitle && (
                              <div className="text-[11px] text-zinc-500">{p.subtitle}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-medium text-zinc-900 block">{p.category}</span>
                        <span className="text-[11px] text-amber-800 font-semibold">
                          {p.brand || 'Saleem Import'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-zinc-600">
                        <div>{p.dimensions}</div>
                        <div className="text-[11px] text-zinc-400">{p.finish}</div>
                      </td>

                      <td className="py-4 px-6 text-right font-mono font-medium text-zinc-500">
                        {p.currency} {p.price.toLocaleString()} {p.priceUnit}
                      </td>

                      <td className="py-4 px-6 text-right font-mono font-bold text-amber-900 text-sm">
                        {p.currency} {contractorPrice.toLocaleString()} {p.priceUnit}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            p.inStock
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {p.inStock ? 'Available' : 'Order Only'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {onSelectProduct && (
                            <button
                              onClick={() => onSelectProduct(p)}
                              className="p-1.5 text-zinc-600 hover:text-amber-800 hover:bg-zinc-100 rounded-lg transition-colors"
                              title="View Detail Page"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDownloadSpec(p)}
                            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                            title="Download CAD / Datasheet"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((p) => {
            const contractorPrice = Math.round(p.price * 0.82);
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-zinc-900/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold text-zinc-900 text-sm line-clamp-1">{p.name}</h4>
                    <p className="text-xs text-zinc-500 line-clamp-1">{p.dimensions}</p>

                    <div className="pt-2 border-t border-zinc-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase">Wholesale</span>
                        <span className="font-bold text-sm text-amber-800 font-mono">
                          {p.currency} {contractorPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 block uppercase">MSRP</span>
                        <span className="text-xs text-zinc-500 font-mono line-through">
                          {p.currency} {p.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between gap-2">
                  {onSelectProduct && (
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="flex-1 py-1.5 px-3 bg-zinc-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Spec Sheet</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDownloadSpec(p)}
                    className="p-2 border border-zinc-200 text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
                    title="Download CAD"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
