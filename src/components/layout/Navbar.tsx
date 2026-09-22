import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Home,
  Grid,
  Sparkles,
  Building2,
  Phone,
  ChevronRight,
} from 'lucide-react';
import { ActiveView } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenQuoteModal?: () => void;
  onOpenCartDrawer?: () => void;
  onOpenCart?: () => void;
  onOpenQuote?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  cartCount,
  wishlistCount,
  onOpenQuoteModal,
  onOpenCartDrawer,
  onOpenCart,
  onOpenQuote,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);

  // Close desktop search on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setDesktopSearchOpen(false);
      }
    }
    if (desktopSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [desktopSearchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleCartClick = () => {
    if (onOpenCart) onOpenCart();
    else if (onOpenCartDrawer) onOpenCartDrawer();
  };

  const handleQuoteClick = () => {
    if (onOpenQuote) onOpenQuote();
    else if (onOpenQuoteModal) onOpenQuoteModal();
  };

  const executeSearch = (query: string) => {
    setSearchQuery(query);
    setActiveView('catalog');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', view: 'home' as ActiveView, hash: '' },
    { label: 'Collection', view: 'catalog' as ActiveView, hash: '' },
    { label: 'Sanitaryware', view: 'catalog' as ActiveView, hash: '' },
    { label: 'Brands', view: 'home' as ActiveView, hash: '#brands' },
    { label: 'Projects', view: 'home' as ActiveView, hash: '#projects' },
  ];

  const quickSearchTags = ['Calacotta', 'Matt Tiles', 'Grohe', 'Sanitary', '60x120'];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* BRAND LOGO (Visible across all screen sizes) */}
            <div id="site-logo" className="shrink-0">
              <BrandLogo
                variant="dark"
                size="md"
                onClick={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* DESKTOP NAVIGATION LINKS (Visible ONLY on lg and above) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-xs font-medium text-stone-700">
              {navLinks.map((link) => {
                const isSelected =
                  (link.label === 'Home' && activeView === 'home') ||
                  (link.label === 'Collection' && (activeView === 'catalog' || activeView === 'product'));

                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      setActiveView(link.view);
                      if (link.hash) {
                        const el = document.querySelector(link.hash);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`relative py-1.5 transition-colors font-sans uppercase tracking-[0.18em] text-[11px] hover:text-[#886d4b] ${
                      isSelected ? 'text-[#886d4b] font-medium' : 'text-stone-700'
                    }`}
                  >
                    {link.label}
                    {isSelected && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#886d4b] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* DESKTOP SEARCH, UTILITIES & CTA (Visible ONLY on lg and above) */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
              {/* Desktop Search Icon Only */}
              <div ref={desktopSearchRef} className="relative flex items-center">
                <AnimatePresence mode="wait">
                  {desktopSearchOpen ? (
                    <motion.div
                      key="desktop-search-expanded"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 250, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden flex items-center"
                    >
                      <div className="relative w-full">
                        <input
                          id="desktop-search-input"
                          type="text"
                          autoFocus
                          placeholder="Search tiles, sanitaryware..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              executeSearch(searchQuery);
                              setDesktopSearchOpen(false);
                            } else if (e.key === 'Escape') {
                              setDesktopSearchOpen(false);
                            }
                          }}
                          className="w-full bg-stone-50 focus:bg-white border border-stone-300 focus:border-[#886d4b] rounded-full pl-8 pr-7 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none transition-all shadow-2xs font-sans"
                        />
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <button
                          onClick={() => setDesktopSearchOpen(false)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 rounded-full transition-colors"
                          title="Close search"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      key="desktop-search-icon"
                      id="desktop-search-btn"
                      onClick={() => setDesktopSearchOpen(true)}
                      className="p-2 rounded-full hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors"
                      title="Search catalog"
                      aria-label="Search catalog"
                    >
                      <Search className="w-5 h-5 stroke-[1.6]" />
                    </button>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Button */}
              <button
                id="desktop-wishlist-btn"
                onClick={() => {
                  setActiveView('catalog');
                }}
                className="relative p-2 rounded-full hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors"
                title={`Saved Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5 stroke-[1.6]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#886d4b] text-white text-[10px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center font-bold shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart / Quote Bag Button */}
              <button
                id="desktop-cart-btn"
                onClick={handleCartClick}
                className="relative p-2 rounded-full hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors"
                title={`Selected Quote Cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
                <span className="absolute -top-0.5 -right-0.5 bg-stone-900 text-white text-[10px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {cartCount}
                </span>
              </button>

              {/* Request a Quote CTA Button */}
              <button
                id="desktop-request-quote-btn"
                onClick={handleQuoteClick}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-stone-900 hover:bg-[#886d4b] text-white text-[11px] font-medium tracking-[0.2em] uppercase rounded transition-all duration-300 shadow-2xs"
              >
                Request a Quote
              </button>
            </div>

            {/* MOBILE & TABLET VIEW: ONLY THE HAMBURGER MENU BUTTON SHOULD REMAIN */}
            <div className="lg:hidden flex items-center">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(true)}
                className="relative p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 hover:text-stone-950 transition-colors focus:outline-none focus:ring-2 focus:ring-[#886d4b]"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 stroke-[2]" />
                {(cartCount > 0 || wishlistCount > 0) && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#886d4b] rounded-full ring-2 ring-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE & TABLET HAMBURGER SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-[90vw] max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Top Bar */}
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
                <BrandLogo
                  variant="dark"
                  size="sm"
                  onClick={() => {
                    setActiveView('home');
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-5">
                {/* 1. Mobile Search Bar */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tiles, sanitary, brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          executeSearch(searchQuery);
                        }
                      }}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-16 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#856a42] focus:bg-white transition-all"
                    />
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <button
                      onClick={() => executeSearch(searchQuery)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-stone-900 hover:bg-[#856a42] text-white text-[11px] font-semibold rounded transition-colors"
                    >
                      Search
                    </button>
                  </div>

                  {/* Quick Filter Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    <span className="text-[10px] text-stone-400 uppercase font-medium mr-1">Trending:</span>
                    {quickSearchTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => executeSearch(tag)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Quick Action Cards (Quote Bag & Wishlist) */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Cart / Quote Bag Card */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleCartClick();
                    }}
                    className="p-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-[#fbf8f3] hover:border-[#856a42]/50 transition-all text-left flex flex-col justify-between gap-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:bg-[#856a42] transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold px-1.5 py-0.5 bg-stone-200 rounded-full text-stone-800">
                        {cartCount}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900 leading-tight">Quote Cart</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{cartCount} items selected</div>
                    </div>
                  </button>

                  {/* Wishlist Card */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveView('catalog');
                    }}
                    className="p-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-[#fbf8f3] hover:border-[#856a42]/50 transition-all text-left flex flex-col justify-between gap-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </div>
                      <span className="text-[11px] font-bold px-1.5 py-0.5 bg-stone-200 rounded-full text-stone-800">
                        {wishlistCount}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900 leading-tight">Saved Wishlist</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{wishlistCount} saved items</div>
                    </div>
                  </button>
                </div>

                {/* 3. Primary Navigation Menu List */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2 px-1">
                    Storefront Navigation
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeView === 'home'
                        ? 'bg-[#886d4b] text-white'
                        : 'text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Home className="w-4 h-4" />
                      <span>Home</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('catalog');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeView === 'catalog' || activeView === 'product'
                        ? 'bg-[#886d4b] text-white'
                        : 'text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Grid className="w-4 h-4" />
                      <span>All Products & Catalog</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* Catalog Categories */}
                  <div className="pl-9 pr-2 py-1 space-y-1 text-xs text-stone-600">
                    {[
                      'Tiles & Porcelain Slabs',
                      'Sanitaryware & Fixtures',
                      'Showers & Wellness Systems',
                      'Sinks & Architectural Taps',
                      'Vanities & Storage',
                      'Bathroom Accessories',
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveView('catalog');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left py-1 text-[11px] text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        • {cat}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        const el = document.querySelector('#brands');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-stone-800 hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#886d4b]" />
                      <span>Partner Brands</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        const el = document.querySelector('#projects');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-stone-800 hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-[#886d4b]" />
                      <span>Architectural Projects</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </div>
              </div>

              {/* Drawer Footer Actions & Concierge */}
              <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/80 space-y-3">
                {/* Request a Quote Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleQuoteClick();
                  }}
                  className="w-full py-3 bg-stone-900 hover:bg-[#886d4b] text-white text-xs font-medium tracking-[0.14em] uppercase rounded shadow-sm transition-colors text-center flex items-center justify-center gap-2"
                >
                  <span>Request a Project Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Showroom Direct Contact */}
                <div className="pt-2 text-center text-[11px] text-stone-500">
                  <div className="flex items-center justify-center gap-1.5 font-medium text-stone-700">
                    <Phone className="w-3.5 h-3.5 text-[#886d4b]" />
                    <span>+92 (42) 111-SALEEM (725336)</span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    Lahore • Karachi • Islamabad | Mon – Sat: 9am – 8pm
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
