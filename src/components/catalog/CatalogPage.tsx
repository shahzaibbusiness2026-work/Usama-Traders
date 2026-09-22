import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  FileText,
  Search,
} from 'lucide-react';
import { ActiveView, Product } from '../../types';
import { CATALOG_PRODUCTS } from '../../data/mockData';
import { ArchitecturalProductCard } from '../common/ArchitecturalProductCard';

interface CatalogPageProps {
  setActiveView: (view: ActiveView) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenQuoteModal: () => void;
  onSelectProduct: (product: Product) => void;
  onOpen360Review?: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  setActiveView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuoteModal,
  onSelectProduct,
  onOpen360Review,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Sanitary Ware']);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>(['In Stock']);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [sortBy, setSortBy] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Accordion collapsed state for filter groups
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    productType: true,
    application: true,
    finish: true,
    priceRange: true,
    brand: true,
    stockStatus: true,
    size: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedApplications([]);
    setSelectedFinishes([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedStock([]);
    setMaxPrice(500000);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const toggleArrayItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setList((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
    setCurrentPage(1);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.finish.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q));
        if (!matches) return false;
      }
      // Product Type filter
      if (selectedTypes.length > 0) {
        const matchesType = selectedTypes.some(
          (t) =>
            p.type.toLowerCase().includes(t.toLowerCase()) ||
            p.category.toLowerCase().includes(t.toLowerCase()) ||
            (t.includes('Marble') && p.type.toLowerCase().includes('marble')) ||
            (t.includes('Sanitary') && p.type.toLowerCase().includes('sanitary')) ||
            (t.includes('Fitting') && p.type.toLowerCase().includes('fitting'))
        );
        if (!matchesType) return false;
      }
      // Finish filter
      if (selectedFinishes.length > 0) {
        const matchesFinish = selectedFinishes.some((f) =>
          p.finish.toLowerCase().includes(f.toLowerCase())
        );
        if (!matchesFinish) return false;
      }
      // Applications filter
      if (selectedApplications.length > 0) {
        const hasApp = p.applications?.some((app) =>
          selectedApplications.some((sa) => sa.toLowerCase() === app.toLowerCase())
        );
        if (!hasApp) return false;
      }
      // Brands filter
      if (selectedBrands.length > 0 && p.brand) {
        if (!selectedBrands.some((b) => p.brand?.toLowerCase().includes(b.toLowerCase()))) {
          return false;
        }
      }
      // Price
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0;
    });
  }, [
    searchQuery,
    selectedTypes,
    selectedFinishes,
    selectedApplications,
    selectedBrands,
    maxPrice,
    sortBy,
  ]);

  return (
    <div className="w-full bg-[#fbf9f5] font-sans">
      {/* 1. BREADCRUMBS (Home > Shop > Bathroom & Sanitary) matching Image 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <nav className="flex items-center text-xs text-stone-500 space-x-2 font-sans tracking-wide">
          <button onClick={() => setActiveView('home')} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <button onClick={() => setActiveView('catalog')} className="hover:text-stone-900 transition-colors">
            Shop
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-medium">Bathroom & Sanitary</span>
        </nav>
      </div>

      {/* 2. HERO BANNER matching Image 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded border border-stone-200 bg-white overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#886d4b]">
                BATHROOM COLLECTION
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight leading-[1.15]">
                Refined Living Starts with Better Surfaces
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-light max-w-lg leading-relaxed">
                Premium sanitary ware, architectural surfaces and fittings for modern spaces.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('catalog-products-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d5b282] hover:bg-[#c5a880] text-stone-950 text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all shadow-xs"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Photo with Pill */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-auto bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80"
                alt="Bathroom Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 right-5 text-white text-[10px] tracking-[0.2em] uppercase font-sans font-medium bg-stone-900/70 backdrop-blur-xs px-3.5 py-1.5 rounded border border-white/10">
                SPACES THAT INSPIRE EVERYDAY
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CATALOG WITH FACETED SIDEBAR & GRID */}
      <div id="catalog-products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Bar matching Image 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-200 gap-4 mb-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-normal tracking-tight">
              Bathroom & Sanitary Collections
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-500 font-light">
              Discover 132 premium products
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-stone-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-stone-300 rounded px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-[#886d4b]"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile filter toggle button */}
        <div className="lg:hidden mb-4 flex justify-between items-center bg-white p-3 rounded border border-stone-200">
          <span className="text-xs font-semibold text-stone-800">
            {filteredProducts.length} Products Found
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 bg-stone-100 rounded text-stone-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refine Search</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR FILTERS matching Image 2 */}
          <aside
            className={`lg:col-span-3 space-y-5 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded border border-stone-200 p-5 shadow-2xs space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2 text-stone-900">
                  <SlidersHorizontal className="w-4 h-4 text-[#886d4b]" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] font-sans">
                    Refine Your Search
                  </h3>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-[#886d4b] hover:text-stone-950 font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              </div>

              {/* 1. Product Type */}
              <div className="border-b border-stone-100 pb-4">
                <button
                  onClick={() => toggleSection('productType')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-stone-900 py-1"
                >
                  <span>Product Type</span>
                  {openSections.productType ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.productType && (
                  <div className="mt-3 space-y-2 text-xs text-stone-600">
                    {[
                      { label: 'Marble & Natural Stone', count: 24 },
                      { label: 'Porcelain & Ceramic Tiles', count: 18 },
                      { label: 'Sanitary Ware', count: 32 },
                      { label: 'Bathroom Fittings', count: 28 },
                      { label: 'Vanities & Countertops', count: 12 },
                      { label: 'Sinks & Kitchen Fixtures', count: 11 },
                      { label: 'Shower Enclosures', count: 7 },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center justify-between cursor-pointer select-none hover:text-stone-900">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(item.label)}
                            onChange={() => toggleArrayItem(selectedTypes, setSelectedTypes, item.label)}
                            className="rounded border-stone-300 accent-[#886d4b] text-[#886d4b] focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">({item.count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Application */}
              <div className="border-b border-stone-100 pb-4">
                <button
                  onClick={() => toggleSection('application')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-stone-900 py-1"
                >
                  <span>Application</span>
                  {openSections.application ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.application && (
                  <div className="mt-3 space-y-2 text-xs text-stone-600">
                    {[
                      { label: 'Residential', count: 62 },
                      { label: 'Commercial', count: 28 },
                      { label: 'Hospitality', count: 18 },
                      { label: 'Outdoor', count: 6 },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center justify-between cursor-pointer select-none hover:text-stone-900">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedApplications.includes(item.label)}
                            onChange={() => toggleArrayItem(selectedApplications, setSelectedApplications, item.label)}
                            className="rounded border-stone-300 accent-[#886d4b] text-[#886d4b] focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">({item.count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Finish */}
              <div className="border-b border-stone-100 pb-4">
                <button
                  onClick={() => toggleSection('finish')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-stone-900 py-1"
                >
                  <span>Finish</span>
                  {openSections.finish ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.finish && (
                  <div className="mt-3 space-y-2 text-xs text-stone-600">
                    {[
                      { label: 'Polished', count: 36 },
                      { label: 'Honed', count: 18 },
                      { label: 'Matt', count: 22 },
                      { label: 'Brushed', count: 10 },
                      { label: 'Textured', count: 8 },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center justify-between cursor-pointer select-none hover:text-stone-900">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedFinishes.includes(item.label)}
                            onChange={() => toggleArrayItem(selectedFinishes, setSelectedFinishes, item.label)}
                            className="rounded border-stone-300 accent-[#886d4b] text-[#886d4b] focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">({item.count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Price Range (PKR) slider matching Image 2 */}
              <div className="border-b border-stone-100 pb-4">
                <button
                  onClick={() => toggleSection('priceRange')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-stone-900 py-1"
                >
                  <span>Price Range (PKR)</span>
                  {openSections.priceRange ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.priceRange && (
                  <div className="mt-3 space-y-2">
                    <input
                      type="range"
                      min={10000}
                      max={500000}
                      step={5000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#886d4b]"
                    />
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                      <span>PKR 0</span>
                      <span>PKR {maxPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Brand matching Image 2 */}
              <div className="border-b border-stone-100 pb-4">
                <button
                  onClick={() => toggleSection('brand')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-stone-900 py-1"
                >
                  <span>Brand</span>
                  {openSections.brand ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.brand && (
                  <div className="mt-3 space-y-2 text-xs text-stone-600">
                    {[
                      { label: 'Roca', count: 14 },
                      { label: 'Kohler', count: 12 },
                      { label: 'Grohe', count: 11 },
                      { label: 'Toto', count: 8 },
                      { label: 'Jaquar', count: 10 },
                      { label: 'Nero Marquina', count: 6 },
                      { label: 'Verona', count: 9 },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center justify-between cursor-pointer select-none hover:text-stone-900">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(item.label)}
                            onChange={() => toggleArrayItem(selectedBrands, setSelectedBrands, item.label)}
                            className="rounded border-stone-300 accent-[#886d4b] text-[#886d4b] focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">({item.count})</span>
                      </label>
                    ))}
                    <button className="text-[11px] text-[#886d4b] hover:text-stone-950 font-medium pt-1">
                      More Brands +
                    </button>
                  </div>
                )}
              </div>

              {/* 6. Stock Status */}
              <div className="border-b border-stone-100 pb-4">
                <button
                  onClick={() => toggleSection('stockStatus')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-stone-900 py-1"
                >
                  <span>Stock Status</span>
                  {openSections.stockStatus ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.stockStatus && (
                  <div className="mt-3 space-y-2 text-xs text-stone-600">
                    {[
                      { label: 'In Stock', count: 89 },
                      { label: 'Pre-order', count: 43 },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center justify-between cursor-pointer select-none hover:text-stone-900">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedStock.includes(item.label)}
                            onChange={() => toggleArrayItem(selectedStock, setSelectedStock, item.label)}
                            className="rounded border-stone-300 accent-[#886d4b] text-[#886d4b] focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">({item.count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. Size */}
              <div>
                <button
                  onClick={() => toggleSection('size')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-stone-900 py-1"
                >
                  <span>Size</span>
                  {openSections.size ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.size && (
                  <div className="mt-3 space-y-2 text-xs text-stone-600">
                    {[
                      { label: 'Small', count: 18 },
                      { label: 'Medium', count: 46 },
                      { label: 'Large', count: 38 },
                      { label: 'Custom', count: 12 },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center justify-between cursor-pointer select-none hover:text-stone-900">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(item.label)}
                            onChange={() => toggleArrayItem(selectedSizes, setSelectedSizes, item.label)}
                            className="rounded border-stone-300 accent-[#886d4b] text-[#886d4b] focus:ring-0 w-3.5 h-3.5"
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">({item.count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID (3x3 matching Image 2) */}
          <main className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.slice(0, 9).map((product, idx) => (
                <ArchitecturalProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    setActiveView('product');
                  }}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onOpen360Review={onOpen360Review}
                  variant="grid"
                />
              ))}
            </div>

            {/* Pagination matching Image 2 */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-stone-200">
              <span className="text-stone-500 font-light">
                Showing 1–9 of 132 products
              </span>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded border border-stone-300 hover:bg-stone-100 flex items-center justify-center text-stone-600 disabled:opacity-40 transition-colors"
                >
                  &lt;
                </button>
                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded text-xs transition-colors ${
                      currentPage === pageNum
                        ? 'bg-stone-900 text-white font-medium'
                        : 'border border-stone-300 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <span className="px-1 text-stone-400">...</span>
                <button
                  onClick={() => setCurrentPage(14)}
                  className="w-8 h-8 rounded border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs transition-colors"
                >
                  14
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(14, p + 1))}
                  className="w-8 h-8 rounded border border-stone-300 hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* 4. BOTTOM PROJECT QUOTE BANNER matching Image 2 */}
      <section className="bg-stone-900 text-white py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-stone-800 border border-stone-700 flex items-center justify-center text-[#d5b282] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-xl sm:text-2xl font-normal text-white">
                  Planning a Residential or Commercial Project?
                </h3>
                <p className="text-xs text-stone-400 font-light mt-0.5">
                  Get expert advice, bulk pricing and a tailored quotation from our team.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#d5b282] hover:bg-[#c5a880] text-stone-950 text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all shrink-0 shadow-md"
            >
              <span>REQUEST A PROJECT QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
