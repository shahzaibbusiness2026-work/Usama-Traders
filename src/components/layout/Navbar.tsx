import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Phone,
} from 'lucide-react';
import { ActiveView } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cartCount: number;
  wishlistCount: number;
  comparisonCount?: number;
  onOpenComparisonModal?: () => void;
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
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
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

  const collectionSubLinks = [
    { label: 'Tiles & Slabs', query: 'Tiles' },
    { label: 'Sanitaryware', query: 'Sanitaryware' },
    { label: 'Showers & Wellness', query: 'Showers' },
    { label: 'Sinks & Taps', query: 'Sinks' },
    { label: 'Vanities', query: 'Vanities' },
    { label: 'Accessories', query: 'Accessories' },
  ];

  return (
    <>
      <header className="h-18 lg:h-20 px-6 lg:px-12 bg-white/90 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4 lg:gap-8">
          {/* Brand Lockup: Clean horizontal pairing of gold ST logo and serif Saleem Traders */}
          <div id="site-logo" className="shrink-0 flex items-center">
            <BrandLogo
              variant="dark"
              size="md"
              showTagline={false}
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-zinc-700">
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-2 uppercase tracking-[0.2em] transition-colors hover:text-amber-800 ${
                activeView === 'home' ? 'text-amber-800 font-semibold' : 'text-zinc-700'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setSearchQuery('');
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-2 uppercase tracking-[0.2em] transition-colors hover:text-amber-800 ${
                activeView === 'catalog' || activeView === 'product'
                  ? 'text-amber-800 font-semibold'
                  : 'text-zinc-700'
              }`}
            >
              Collections
            </button>

            <button
              onClick={() => {
                setSearchQuery('Sanitaryware');
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-2 uppercase tracking-[0.2em] transition-colors text-zinc-700 hover:text-amber-800"
            >
              Sanitaryware
            </button>

            <button
              onClick={() => {
                setActiveView('home');
                setTimeout(() => {
                  document.querySelector('#brands')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-2 uppercase tracking-[0.2em] transition-colors text-zinc-700 hover:text-amber-800"
            >
              Brands
            </button>

            <button
              onClick={() => {
                setActiveView('home');
                setTimeout(() => {
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-2 uppercase tracking-[0.2em] transition-colors text-zinc-700 hover:text-amber-800"
            >
              Projects
            </button>

            <button
              onClick={() => {
                setActiveView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-1 px-2.5 rounded-full border border-zinc-200 text-zinc-700 hover:text-amber-800 hover:border-amber-700/50 uppercase tracking-[0.16em] text-[10px] font-semibold transition-colors"
            >
              Executive Suite
            </button>
          </nav>

          {/* Action Bar (Search, Wishlist, Quote Bag, Request Quote Button) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Search Input Box */}
            <div ref={desktopSearchRef} className="relative flex items-center">
              <AnimatePresence mode="wait">
                {desktopSearchOpen ? (
                  <motion.div
                    key="desktop-search-input-wrap"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 230, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden flex items-center"
                  >
                    <div className="relative w-full">
                      <input
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
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-amber-800 rounded-full pl-8 pr-7 py-1.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all"
                      />
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <button
                        onClick={() => setDesktopSearchOpen(false)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setDesktopSearchOpen(true)}
                    className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-4.5 h-4.5 stroke-[1.8]" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveView('catalog')}
              className="relative p-2 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors"
              aria-label="Wishlist"
              title={`Wishlist (${wishlistCount})`}
            >
              <Heart className="w-4.5 h-4.5 stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-amber-800 text-white text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Quote Bag Button */}
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors"
              aria-label="Quote Bag"
              title={`Quote Bag (${cartCount})`}
            >
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-zinc-900 text-white text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Request a Quote CTA */}
            <button
              onClick={handleQuoteClick}
              className="ml-2 px-4 py-2 border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white text-xs font-medium tracking-[0.18em] uppercase transition-all duration-200"
            >
              Request a Quote
            </button>
          </div>

          {/* Mobile Action Bar */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-lg border border-zinc-200 text-zinc-700 bg-white"
              aria-label="Quote Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg border border-zinc-200 text-zinc-700 bg-white hover:text-zinc-900"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE HAMBURGER DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 p-6 sm:p-8 flex flex-col justify-between border-l border-zinc-100 overflow-y-auto"
            >
              {/* Header inside Drawer */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                  <BrandLogo
                    variant="dark"
                    size="sm"
                    showTagline={false}
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 flex items-center justify-center transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="relative mt-6 mb-4">
                  <input
                    type="text"
                    placeholder="Search catalog or brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        executeSearch(searchQuery);
                      }
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-amber-800"
                  />
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Menu Links */}
                <div className="flex flex-col mt-2">
                  {/* Home Link */}
                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-lg font-light text-zinc-900 py-3 border-b border-zinc-100 hover:text-amber-800 transition-colors"
                  >
                    Home
                  </button>

                  {/* Collections Accordion */}
                  <div className="border-b border-zinc-100">
                    <button
                      type="button"
                      onClick={() => setCollectionsExpanded((prev) => !prev)}
                      className="w-full flex items-center justify-between text-left text-lg font-light text-zinc-900 py-3 hover:text-amber-800 transition-colors"
                    >
                      <span>Collections</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                          collectionsExpanded ? 'rotate-180 text-amber-800' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {collectionsExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pb-2"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              setActiveView('catalog');
                              setMobileMenuOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full text-left pl-4 py-2 text-sm text-zinc-700 font-medium hover:text-amber-800 transition-colors"
                          >
                            All Collections & Slabs
                          </button>
                          {collectionSubLinks.map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => {
                                setSearchQuery(item.query);
                                setActiveView('catalog');
                                setMobileMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full text-left pl-4 py-2 text-sm text-zinc-600 hover:text-amber-700 transition-colors"
                            >
                              {item.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sanitaryware Direct Link */}
                  <button
                    onClick={() => {
                      setSearchQuery('Sanitaryware');
                      setActiveView('catalog');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-lg font-light text-zinc-900 py-3 border-b border-zinc-100 hover:text-amber-800 transition-colors"
                  >
                    Sanitaryware
                  </button>

                  {/* Partner Brands */}
                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        document.querySelector('#brands')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-left text-lg font-light text-zinc-900 py-3 border-b border-zinc-100 hover:text-amber-800 transition-colors"
                  >
                    Partner Brands
                  </button>

                  {/* Architectural Projects */}
                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-left text-lg font-light text-zinc-900 py-3 border-b border-zinc-100 hover:text-amber-800 transition-colors"
                  >
                    Architectural Projects
                  </button>

                  {/* Executive Dashboard */}
                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-lg font-light text-zinc-900 py-3 border-b border-zinc-100 hover:text-amber-800 transition-colors flex items-center justify-between"
                  >
                    <span>Executive Dashboard</span>
                    <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-semibold font-sans">
                      BOQ
                    </span>
                  </button>
                </div>

                {/* Bag & Saved Quick Row */}
                <div className="pt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleCartClick();
                    }}
                    className="flex-1 flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition-colors text-xs font-medium text-zinc-800"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-amber-800" />
                      <span>Quote Bag</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-900 text-white text-[10px] font-semibold">
                      {cartCount}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveView('catalog');
                    }}
                    className="flex-1 flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition-colors text-xs font-medium text-zinc-800"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-amber-800" />
                      <span>Wishlist</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-800 text-[10px] font-semibold">
                      {wishlistCount}
                    </span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Pinned at Bottom */}
              <div className="pt-6 border-t border-zinc-100 space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleQuoteClick();
                  }}
                  className="w-full py-3.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Request a Project Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-center pt-1">
                  <a
                    href="tel:+9242111725336"
                    className="inline-flex items-center justify-center gap-2 text-xs font-medium text-zinc-800 hover:text-amber-800 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-800" />
                    <span>+92 (42) 111-SALEEM (725336)</span>
                  </a>
                  <p className="text-[11px] text-zinc-400 mt-1 font-light">
                    Lahore Showroom • Karachi • Islamabad
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
