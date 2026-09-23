import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Clock,
  Phone,
  Calendar,
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
  wishlistCount: _wishlistCount,
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
  const [showHoursTooltip, setShowHoursTooltip] = useState(false);
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
      <header className="h-16 lg:h-20 px-4 sm:px-6 lg:px-10 bg-[#121417]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 transition-all text-white shadow-md">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4 lg:gap-8">
          {/* Brand Lockup: ST Gold Monogram & Saleem Traders Serif */}
          <div id="site-logo" className="shrink-0 flex items-center">
            <BrandLogo
              variant="light"
              size="md"
              showTagline={false}
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium">
            {/* Home */}
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative py-1 uppercase tracking-[0.16em] text-[11px] transition-colors ${
                activeView === 'home'
                  ? 'text-white font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span>Home</span>
              {activeView === 'home' && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#d5b282] rounded-full" />
              )}
            </button>

            {/* Collections */}
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative py-1 uppercase tracking-[0.16em] text-[11px] transition-colors ${
                activeView === 'catalog' || activeView === 'product'
                  ? 'text-white font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span>Collections</span>
              {(activeView === 'catalog' || activeView === 'product') && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#d5b282] rounded-full" />
              )}
            </button>

            {/* Sanitaryware */}
            <button
              onClick={() => {
                setSearchQuery('Sanitaryware');
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-1 uppercase tracking-[0.16em] text-[11px] transition-colors text-zinc-300 hover:text-white"
            >
              Sanitaryware
            </button>

            {/* Tiles */}
            <button
              onClick={() => {
                setSearchQuery('Tiles');
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-1 uppercase tracking-[0.16em] text-[11px] transition-colors text-zinc-300 hover:text-white"
            >
              Tiles
            </button>

            {/* Kitchen */}
            <button
              onClick={() => {
                setSearchQuery('Kitchen');
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-1 uppercase tracking-[0.16em] text-[11px] transition-colors text-zinc-300 hover:text-white"
            >
              Kitchen
            </button>

            {/* Brands */}
            <button
              onClick={() => {
                if (activeView !== 'home') {
                  setActiveView('home');
                }
                setTimeout(() => {
                  document.querySelector('#partner-brands')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-1 uppercase tracking-[0.16em] text-[11px] transition-colors text-zinc-300 hover:text-white"
            >
              Brands
            </button>

            {/* Projects */}
            <button
              onClick={() => {
                if (activeView !== 'home') {
                  setActiveView('home');
                }
                setTimeout(() => {
                  document.querySelector('#featured-projects')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-1 uppercase tracking-[0.16em] text-[11px] transition-colors text-zinc-300 hover:text-white"
            >
              Projects
            </button>
          </nav>

          {/* Action Bar (Search, Quote Bag, Hours, Request Quote Button) */}
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
                        className="w-full bg-stone-900 border border-stone-700 focus:border-[#d5b282] rounded-full pl-8 pr-7 py-1.5 text-xs text-white placeholder-stone-400 focus:outline-none transition-all"
                      />
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <button
                        onClick={() => setDesktopSearchOpen(false)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setDesktopSearchOpen(true)}
                    className="p-2 rounded-full hover:bg-white/10 text-zinc-200 hover:text-white transition-colors"
                    aria-label="Search"
                    title="Search catalog"
                  >
                    <Search className="w-4.5 h-4.5 stroke-[1.8]" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Quote Bag Button with Pill */}
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-white/10 text-zinc-200 hover:text-white transition-colors"
              aria-label="Quote Bag"
              title={`Quote Bag (${cartCount})`}
            >
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
              <span className="absolute top-0 right-0 bg-[#d5b282] text-stone-950 text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            {/* Consultation / Hours Icon */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowHoursTooltip(true)}
                onMouseLeave={() => setShowHoursTooltip(false)}
                onClick={handleQuoteClick}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-200 hover:text-white transition-colors"
                aria-label="Showroom Hours"
                title="Showroom Hours & Appointments"
              >
                <Clock className="w-4.5 h-4.5 stroke-[1.8]" />
              </button>

              <AnimatePresence>
                {showHoursTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-stone-950 border border-stone-800 p-3 rounded shadow-xl text-left pointer-events-none z-50"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-[#d5b282] font-semibold mb-1">
                      Showroom Hours
                    </div>
                    <div className="text-xs text-white">Mon – Sat: 9:00 AM – 8:00 PM</div>
                    <div className="text-xs text-stone-400 mt-0.5">Sunday: 10:00 AM – 4:00 PM</div>
                    <div className="text-[11px] text-[#d5b282] mt-2 pt-2 border-t border-stone-800 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>Book Consultation</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Request a Quote CTA */}
            <button
              onClick={handleQuoteClick}
              className="ml-1 px-4 py-2 border border-[#d5b282] text-white hover:bg-[#d5b282] hover:text-stone-950 text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-200"
            >
              Request a Quote
            </button>
          </div>

          {/* Mobile Action Bar */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-lg border border-white/20 text-white bg-white/5"
              aria-label="Quote Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#d5b282] text-stone-950 text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg border border-white/20 text-white bg-white/5 hover:bg-white/10"
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
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#16181b] text-white shadow-2xl z-50 p-6 sm:p-8 flex flex-col justify-between border-l border-stone-800 overflow-y-auto"
            >
              {/* Header inside Drawer */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                  <BrandLogo
                    variant="light"
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
                    className="w-8 h-8 rounded-full border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 flex items-center justify-center transition-colors"
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
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#d5b282]"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                    className="text-left text-lg font-normal text-white py-3 border-b border-stone-800/80 hover:text-[#d5b282] transition-colors"
                  >
                    Home
                  </button>

                  {/* Collections Accordion */}
                  <div className="border-b border-stone-800/80">
                    <button
                      type="button"
                      onClick={() => setCollectionsExpanded((prev) => !prev)}
                      className="w-full flex items-center justify-between text-left text-lg font-normal text-white py-3 hover:text-[#d5b282] transition-colors"
                    >
                      <span>Collections</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                          collectionsExpanded ? 'rotate-180 text-[#d5b282]' : ''
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
                            className="w-full text-left pl-4 py-2 text-sm text-[#d5b282] font-medium hover:text-white transition-colors"
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
                              className="w-full text-left pl-4 py-2 text-sm text-stone-300 hover:text-white transition-colors"
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
                    className="text-left text-lg font-normal text-white py-3 border-b border-stone-800/80 hover:text-[#d5b282] transition-colors"
                  >
                    Sanitaryware
                  </button>

                  {/* Tiles Direct Link */}
                  <button
                    onClick={() => {
                      setSearchQuery('Tiles');
                      setActiveView('catalog');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-lg font-normal text-white py-3 border-b border-stone-800/80 hover:text-[#d5b282] transition-colors"
                  >
                    Tiles
                  </button>

                  {/* Kitchen Direct Link */}
                  <button
                    onClick={() => {
                      setSearchQuery('Kitchen');
                      setActiveView('catalog');
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-lg font-normal text-white py-3 border-b border-stone-800/80 hover:text-[#d5b282] transition-colors"
                  >
                    Kitchen
                  </button>

                  {/* Partner Brands */}
                  <button
                    onClick={() => {
                      setActiveView('home');
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        document.querySelector('#partner-brands')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-left text-lg font-normal text-white py-3 border-b border-stone-800/80 hover:text-[#d5b282] transition-colors"
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
                    className="text-left text-lg font-normal text-white py-3 border-b border-stone-800/80 hover:text-[#d5b282] transition-colors"
                  >
                    Architectural Projects
                  </button>
                </div>

                {/* Bag & Saved Quick Row */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleCartClick();
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded border border-stone-700 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#d5b282]" />
                    <span>Quote Bag ({cartCount})</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveView('catalog');
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded border border-stone-700 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    <span>View Catalog</span>
                  </button>
                </div>
              </div>

              {/* Bottom Consultation Box */}
              <div className="pt-6 mt-6 border-t border-stone-800 space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleQuoteClick();
                  }}
                  className="w-full py-3.5 bg-[#9D805E] hover:bg-[#b89a74] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <span>Request Project Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-xs text-stone-400 font-normal">
                  <a
                    href="tel:+923001234567"
                    className="flex items-center gap-1.5 hover:text-white"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d5b282]" />
                    <span>+92 300 1234567</span>
                  </a>
                  <span>Multan, Pakistan</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
