import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Phone,
  ShieldCheck,
  Truck,
  Award,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Pause,
} from 'lucide-react';
import { ActiveView, Product } from '../../types';
import { ArchitecturalProductCard } from '../common/ArchitecturalProductCard';

interface HomePageProps {
  setActiveView: (view: ActiveView) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenQuoteModal: () => void;
  onSelectProduct: (product: Product) => void;
  onOpen360Review?: (product: Product) => void;
  comparedProducts?: Product[];
  onToggleCompare?: (product: Product) => void;
  onOpenComparisonModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuoteModal,
  onSelectProduct,
  onOpen360Review,
  comparedProducts = [],
  onToggleCompare,
  onOpenComparisonModal,
}) => {
  const [heroSlide, setHeroSlide] = useState(0);

  // Category Slideshow State (Shows 3 cards first, then auto-advances slideshow of all)
  const [catSlideIndex, setCatSlideIndex] = useState(0);
  const [isCatAutoPlay, setIsCatAutoPlay] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  // Categories for Beautiful Spaces with counts and high-res imagery
  const categories = [
    {
      id: 'tiles-slabs',
      title: 'Tiles & Slabs',
      desc: 'Italian Marble • Porcelain Slabs • Natural Stone Formats',
      count: '140+ Items',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sanitaryware',
      title: 'Sanitaryware',
      desc: 'Rimless Smart Commodes • Countertop Basins • Wall-Hung Systems',
      count: '95+ Items',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'showers',
      title: 'Showers & Wellness',
      desc: 'Thermostatic Systems • Rain Showers • Concealed Diverters',
      count: '70+ Items',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sinks-taps',
      title: 'Sinks & Taps',
      desc: 'Undermount Kitchen Sinks • Basin Mixers • Pull-Out Spray Taps',
      count: '85+ Items',
      image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'vanities',
      title: 'Vanities & Mirrors',
      desc: 'Floating Wooden Vanities • Backlit LED Mirrors • Bespoke Storage',
      count: '48+ Items',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'faucets-accessories',
      title: 'Faucets & Brassware',
      desc: 'Brushed Gold Mixers • Architectural Spouts • Luxury Accessories',
      count: '110+ Items',
      image: 'https://images.unsplash.com/photo-1595514535415-dae92493e878?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'kitchen-solutions',
      title: 'Kitchen Solutions',
      desc: 'Granite Countertop Slabs • Commercial Taps • Built-In Drainers',
      count: '60+ Items',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wellness-bathtubs',
      title: 'Bathtubs & Spa',
      desc: 'Freestanding Stone Resin Tubs • Hydrotherapy • Floor Fillers',
      count: '35+ Items',
      image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Responsive card detection (3 on desktop, 2 on tablet, 1 on mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxCatIndex = Math.max(0, categories.length - visibleCards);
  const safeCatIndex = Math.min(catSlideIndex, maxCatIndex);

  // Auto-advancing slideshow (pauses on hover or manual pause)
  useEffect(() => {
    if (!isCatAutoPlay) return;
    const timer = setInterval(() => {
      setCatSlideIndex((prev) => (prev >= maxCatIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isCatAutoPlay, maxCatIndex]);

  const handlePrevCategory = () => {
    setCatSlideIndex((prev) => (prev <= 0 ? maxCatIndex : prev - 1));
  };

  const handleNextCategory = () => {
    setCatSlideIndex((prev) => (prev >= maxCatIndex ? 0 : prev + 1));
  };

  // Exact 8 New Arrivals products (Shows 3 cards first, then slideshow of all)
  const newArrivals: Product[] = [
    {
      id: 'verona-calacotta-gold',
      name: 'Verona Calacatta Gold',
      category: 'Tiles & Slabs',
      type: 'Porcelain Tile',
      finish: 'Polished',
      dimensions: '800 x 1600 mm',
      price: 14800,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Porcelain Tile | 800 x 1600 mm',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
      badge: 'NEW',
      inStock: true,
    },
    {
      id: 'rimless-smart-commode',
      name: 'Rimless Smart Commode',
      category: 'Sanitaryware',
      type: 'Wall Hung Commode',
      finish: 'Matt White',
      dimensions: '540 x 360 mm',
      price: 142000,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Wall Hung | Matt White',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
      inStock: true,
    },
    {
      id: 'artisan-countertop-basin',
      name: 'Artisan Counter Top Basin',
      category: 'Sanitaryware',
      type: 'Counter Top Basin',
      finish: 'Matt Finish',
      dimensions: '420 x 420 mm',
      price: 28500,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Ceramic | Matt Finish',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80',
      inStock: true,
    },
    {
      id: 'thermostatic-shower-set',
      name: 'Thermostatic Shower Set',
      category: 'Showers',
      type: 'Shower System',
      finish: 'Brushed Gold',
      dimensions: '300 mm Head',
      price: 98000,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Brushed Gold | Complete Set',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=700&q=80',
      inStock: true,
    },
    {
      id: 'undermount-kitchen-sink',
      name: 'Undermount Kitchen Sink',
      category: 'Sinks & Taps',
      type: 'Kitchen Sink',
      finish: 'Stainless Steel',
      dimensions: '750 x 450 mm',
      price: 36500,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Stainless Steel | Single Bowl',
      image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=700&q=80',
      inStock: true,
    },
    {
      id: 'basin-mixer-faucet',
      name: 'Basin Mixer Faucet',
      category: 'Faucets & Accessories',
      type: 'Mixer Tap',
      finish: 'Brushed Brass',
      dimensions: 'Standard Height',
      price: 24900,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Brushed Brass | Premium',
      image: 'https://images.unsplash.com/photo-1595514535415-dae92493e878?auto=format&fit=crop&w=700&q=80',
      inStock: true,
    },
    {
      id: 'monolithic-freestanding-tub',
      name: 'Monolithic Freestanding Tub',
      category: 'Sanitaryware',
      type: 'Stone Resin Tub',
      finish: 'Matt Silk White',
      dimensions: '1700 x 800 mm',
      price: 265000,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Mineral Cast | Silk Touch',
      image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=700&q=80',
      badge: 'EXCLUSIVE',
      inStock: true,
    },
    {
      id: 'nero-marquina-porcelain-slab',
      name: 'Nero Marquina Porcelain Slab',
      category: 'Tiles & Slabs',
      type: 'Bookmatch Porcelain',
      finish: 'Honed Velvet',
      dimensions: '1200 x 2780 mm',
      price: 18500,
      currency: 'PKR',
      priceUnit: '',
      subtitle: 'Continuous Vein | Honed',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80',
      badge: 'FEATURED',
      inStock: true,
    },
  ];

  // New Arrivals Slideshow State (Shows 3 cards first, then auto-advancing slideshow of all)
  const [arrivalSlideIndex, setArrivalSlideIndex] = useState(0);
  const [isArrivalAutoPlay, setIsArrivalAutoPlay] = useState(true);

  const maxArrivalIndex = Math.max(0, newArrivals.length - visibleCards);
  const safeArrivalIndex = Math.min(arrivalSlideIndex, maxArrivalIndex);

  useEffect(() => {
    if (!isArrivalAutoPlay) return;
    const timer = setInterval(() => {
      setArrivalSlideIndex((prev) => (prev >= maxArrivalIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isArrivalAutoPlay, maxArrivalIndex]);

  const handlePrevArrival = () => {
    setArrivalSlideIndex((prev) => (prev <= 0 ? maxArrivalIndex : prev - 1));
  };

  const handleNextArrival = () => {
    setArrivalSlideIndex((prev) => (prev >= maxArrivalIndex ? 0 : prev + 1));
  };

  const brandLogos = [
    'Roca',
    'KOHLER',
    'GROHE',
    'TOTO',
    'RAK CERAMICS',
    'atlas concorde',
    'FLORIM',
    'hansgrohe',
    'caesarstone',
  ];

  return (
    <div className="w-full bg-[#fbf9f5] font-sans">
      {/* 1. HERO SECTION (Split Left/Right matching Image 4) */}
      <section className="relative w-full overflow-hidden bg-stone-900 border-b border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
          {/* Left Column: Dark Textured Slate with Gold Eyebrow & Metrics */}
          <div
            className="lg:col-span-6 bg-[#16181b] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-stone-800"
            style={{
              backgroundImage:
                'radial-gradient(circle at 10% 20%, rgba(35, 39, 45, 0.9) 0%, rgba(20, 22, 25, 0.98) 100%)',
            }}
          >
            <div className="space-y-6 max-w-xl">
              <div className="inline-block">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A38A6B] font-sans">
                  TIMELESS MATERIALS. BEAUTIFUL SPACES.
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] tracking-tight">
                Elevate Everyday Living
              </h1>

              <p className="text-stone-300 text-sm sm:text-base font-normal leading-relaxed max-w-lg">
                Discover premium tiles, sanitaryware and kitchen solutions crafted for modern architectural lifestyles.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => setActiveView('catalog')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#7E6348] hover:bg-[#A38A6B] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all duration-300 shadow-md group"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-catalogue-btn"
                  onClick={() => setActiveView('catalog')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-stone-600 hover:border-stone-400 bg-transparent text-white text-xs font-medium uppercase tracking-[0.16em] rounded transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#A38A6B]" />
                  <span>VIEW CATALOGUE</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Metrics Row matching Image 4 */}
            <div className="pt-10 mt-8 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  500+
                </div>
                <div className="text-xs text-stone-300 font-normal mt-1">
                  Premium Products
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  50+
                </div>
                <div className="text-xs text-stone-300 font-normal mt-1">
                  Global Brands
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  1000+
                </div>
                <div className="text-xs text-stone-300 font-normal mt-1">
                  Happy Customers
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  2
                </div>
                <div className="text-xs text-stone-300 font-normal mt-1">
                  Showrooms
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-end Bathroom Photography with Carousel & Badges */}
          <div className="lg:col-span-6 relative overflow-hidden group min-h-[380px]">
            <img
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury Bathroom"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 pointer-events-none" />

            {/* Top Text Pill matching Image 4 */}
            <div className="absolute top-6 left-6 text-white text-xs tracking-[0.2em] font-sans font-medium uppercase bg-stone-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              MORE THAN SPACES A BETTER TOMORROW
            </div>

            {/* Bottom Right Callout Box matching Image 4 */}
            <div className="absolute bottom-6 right-6 left-6 sm:left-auto max-w-sm bg-stone-950/85 backdrop-blur-md p-5 rounded border border-stone-700/60 text-white space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Bathrooms That Inspire
              </h3>
              <p
                onClick={() => setActiveView('catalog')}
                className="text-xs text-[#d5b282] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
              >
                <span>Explore our curated sanitaryware collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </p>

              {/* Dots */}
              <div className="flex items-center gap-1.5 pt-2">
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    onClick={() => setHeroSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      heroSlide === idx ? 'w-5 bg-[#d5b282]' : 'w-1.5 bg-stone-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (3 Cards Shown First + Slideshow of All Collections) */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title and Slideshow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-stone-200/80 pb-5">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#7E6348] font-semibold font-sans mb-1">
              SHOP BY CATEGORY
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
              Everything for Beautiful Spaces
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-normal mt-2 max-w-2xl leading-relaxed">
              Premium tiles, sanitaryware, kitchen solutions and accessories from the world's leading architectural brands.
            </p>
          </div>

          {/* Slideshow Controls & View All Link */}
          <div className="flex flex-wrap items-center gap-3 self-start sm:self-end">
            {/* Category Counter Indicator */}
            <span className="text-xs font-medium text-stone-500 font-sans hidden md:inline-block mr-1">
              {safeCatIndex + 1}–{Math.min(safeCatIndex + visibleCards, categories.length)} of {categories.length}
            </span>

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsCatAutoPlay(!isCatAutoPlay)}
              className="w-8 h-8 rounded-full border border-stone-300 hover:border-[#7E6348] flex items-center justify-center text-stone-600 hover:text-[#7E6348] transition-colors"
              title={isCatAutoPlay ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
              aria-label={isCatAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isCatAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* Previous & Next Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevCategory}
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors"
                aria-label="Previous categories"
                title="Previous categories"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextCategory}
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors"
                aria-label="Next categories"
                title="Next categories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View All Categories Button */}
            <button
              onClick={() => setActiveView('catalog')}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#7E6348] uppercase tracking-[0.16em] transition-colors ml-1"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3-Card Carousel Viewport (Shows 3 cards at once on desktop, transitions smoothly) */}
        <div
          className="relative overflow-hidden -mx-3 py-1"
          onMouseEnter={() => setIsCatAutoPlay(false)}
          onMouseLeave={() => setIsCatAutoPlay(true)}
        >
          <div
            className="flex transition-transform duration-600 ease-out"
            style={{
              transform: `translateX(-${safeCatIndex * (100 / visibleCards)}%)`,
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="px-3 shrink-0 w-full sm:w-1/2 lg:w-1/3"
              >
                <div
                  onClick={() => setActiveView('catalog')}
                  className="group bg-white rounded-lg border border-stone-200/90 hover:border-[#7E6348]/60 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden h-full"
                >
                  {/* Category Image with Architectural Proportions */}
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 relative">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent pointer-events-none" />

                    {/* Category Count Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] font-sans font-medium uppercase tracking-[0.18em] px-2.5 py-1 rounded-none border border-white/15">
                      {cat.count}
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-[#7E6348] font-semibold font-sans mb-1.5">
                        ARCHITECTURAL COLLECTION
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 group-hover:text-[#7E6348] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-stone-600 font-normal mt-2 leading-relaxed line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.18em] text-stone-800 font-semibold group-hover:text-[#7E6348] transition-colors">
                        EXPLORE COLLECTION
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-800 group-hover:text-[#7E6348] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots & Auto-play Status Hint */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Dot Indicators for Direct Slide Access */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxCatIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCatSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  safeCatIndex === idx
                    ? 'w-8 bg-[#7E6348]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Jump to slide position ${idx + 1}`}
                title={`Slide position ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs text-stone-600 font-normal font-sans flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isCatAutoPlay ? 'bg-emerald-700 animate-pulse' : 'bg-stone-500'}`} />
            <span>{isCatAutoPlay ? 'Auto-advancing • Hover to pause' : 'Slideshow paused'}</span>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION STRIP (5 items matching Image 4) */}
      <section className="border-y border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Award,
                title: '100% Genuine Products',
                desc: 'Authorized dealer network',
              },
              {
                icon: Truck,
                title: 'Nationwide Delivery',
                desc: 'Safe & reliable shipping',
              },
              {
                icon: ShieldCheck,
                title: 'Official Brand Warranty',
                desc: 'Complete peace of mind',
              },
              {
                icon: Users,
                title: 'Expert Consultation',
                desc: 'Get personalized advice',
              },
              {
                icon: MapPin,
                title: 'Visit Our Showrooms',
                desc: 'Lahore & Islamabad',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f7f4ee] border border-[#e5dcce] flex items-center justify-center shrink-0 text-[#7E6348]">
                  <item.icon className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-semibold text-stone-900 font-sans tracking-tight">{item.title}</h4>
                  <p className="text-xs text-stone-500 font-normal mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS (3 Products Shown First + Architectural Slideshow) */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-stone-200/80 pb-5">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#7E6348] font-semibold font-sans mb-1">
              NEW ARRIVALS
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
              Fresh Choices for Modern Spaces
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-normal mt-2 max-w-2xl leading-relaxed">
              Recently specified stone slabs, luxury sanitary fixtures, and thermostatic brassware ready for immediate project delivery.
            </p>
          </div>

          {/* Slideshow Controls & View All Products */}
          <div className="flex flex-wrap items-center gap-3 self-start sm:self-end">
            {/* Counter */}
            <span className="text-xs font-medium text-stone-500 font-sans hidden md:inline-block mr-1">
              {safeArrivalIndex + 1}–{Math.min(safeArrivalIndex + visibleCards, newArrivals.length)} of {newArrivals.length}
            </span>

            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsArrivalAutoPlay(!isArrivalAutoPlay)}
              className="w-8 h-8 rounded-full border border-stone-300 hover:border-[#7E6348] flex items-center justify-center text-stone-600 hover:text-[#7E6348] transition-colors"
              title={isArrivalAutoPlay ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
              aria-label={isArrivalAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isArrivalAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevArrival}
                aria-label="Previous products"
                title="Previous products"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextArrival}
                aria-label="Next products"
                title="Next products"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View All Products Link */}
            <button
              onClick={() => setActiveView('catalog')}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#7E6348] uppercase tracking-[0.16em] transition-colors ml-1"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3-Card Carousel Track (Shows 3 cards at once on desktop, pauses on hover) */}
        <div
          className="relative overflow-hidden -mx-3 py-1"
          onMouseEnter={() => setIsArrivalAutoPlay(false)}
          onMouseLeave={() => setIsArrivalAutoPlay(true)}
        >
          <div
            className="flex transition-transform duration-600 ease-out"
            style={{
              transform: `translateX(-${safeArrivalIndex * (100 / visibleCards)}%)`,
            }}
          >
            {newArrivals.map((product, idx) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isCompared = comparedProducts.some((p) => p.id === product.id);
              return (
                <div
                  key={product.id}
                  className="px-3 shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                  <ArchitecturalProductCard
                    product={product}
                    index={idx}
                    isWishlisted={isWishlisted}
                    isCompared={isCompared}
                    onSelectProduct={(p) => {
                      onSelectProduct(p);
                      setActiveView('product');
                    }}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onOpen360Review={onOpen360Review}
                    onToggleCompare={onToggleCompare}
                    variant="grid"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dots & Auto-play Status Hint */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxArrivalIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setArrivalSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  safeArrivalIndex === idx
                    ? 'w-8 bg-[#7E6348]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Jump to product slide ${idx + 1}`}
                title={`Product slide position ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs text-stone-600 font-normal font-sans flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isArrivalAutoPlay ? 'bg-emerald-700 animate-pulse' : 'bg-stone-500'}`} />
            <span>{isArrivalAutoPlay ? 'Auto-advancing • Hover to pause' : 'Slideshow paused'}</span>
          </div>
        </div>
      </section>

      {/* 5. PROJECT QUOTATION BANNER (Refined Bronze Palette) */}
      <section className="bg-[#F5F1EA] border-y border-[#E5DFD5] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-[0.25em] text-[#7E6348] font-semibold font-sans">
                FOR HOMES, BUILDERS & BUSINESSES
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight">
                Let's Build Something Exceptional
              </h2>

              <p className="text-stone-700 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
                Get a customized quotation for your residential or commercial project with expert recommendations and special pricing.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#7E6348] hover:bg-[#A38A6B] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all shadow-sm"
                >
                  <span>REQUEST A QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="tel:+923001234567"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-stone-400 hover:border-stone-800 bg-white/80 hover:bg-white text-stone-900 text-xs font-medium uppercase tracking-[0.14em] rounded transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7E6348]" />
                  <span>SPEAK TO OUR EXPERTS</span>
                </a>
              </div>

              {/* 4 Checkbox items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 text-xs text-stone-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                  <span>Competitive Project Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                  <span>Dedicated Account Manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                  <span>Product Sourcing Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                  <span>Samples & Technical Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative rounded overflow-hidden shadow-lg max-w-sm w-full border border-stone-300">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80"
                  alt="Spaces People Love"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="absolute bottom-4 right-4 text-white font-serif italic text-lg drop-shadow-md">
                  Spaces People Love—
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIMPLE & CONVENIENT / How It Works */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#7E6348] font-semibold font-sans mb-1">
            SIMPLE & CONVENIENT
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Explore Products',
              desc: 'Browse our wide range of premium collections',
            },
            {
              step: '02',
              title: 'Request a Quote',
              desc: 'Share your requirements for a tailored quotation',
            },
            {
              step: '03',
              title: 'Get Expert Advice',
              desc: 'Consult with our specialists for the best solutions',
            },
            {
              step: '04',
              title: 'Confirm & Receive',
              desc: 'Place your order and enjoy reliable nationwide delivery',
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white p-6 rounded border border-stone-200/90 text-center relative flex flex-col items-center justify-between hover:border-[#7E6348]/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5F1EA] border border-[#E5DFD5] flex items-center justify-center font-bold text-xs text-[#7E6348] mb-4">
                {s.step}
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                {s.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 font-normal leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRANSFORM YOUR SPACE TODAY */}
      <section
        className="py-14 sm:py-18 bg-stone-950 text-white text-center relative overflow-hidden border-y border-stone-800"
        style={{
          backgroundImage:
            'linear-gradient(rgba(18, 20, 24, 0.92), rgba(18, 20, 24, 0.95)), url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
            Transform Your Space Today
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-normal max-w-xl mx-auto leading-relaxed">
            Discover premium materials, expert guidance and unparalleled architectural service.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveView('catalog')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#7E6348] hover:bg-[#A38A6B] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all shadow-md"
            >
              <span>EXPLORE OUR COLLECTIONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. OUR TRUSTED BRANDS */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-100">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7E6348] font-sans">
              OUR TRUSTED BRANDS
            </h3>
            <button
              onClick={() => setActiveView('catalog')}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 hover:text-[#7E6348] transition-colors flex items-center gap-1"
            >
              <span>VIEW ALL BRANDS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 items-center">
            {brandLogos.map((brand, idx) => (
              <div
                key={idx}
                onClick={() => setActiveView('catalog')}
                className="h-12 rounded border border-stone-200/70 hover:border-[#7E6348]/50 bg-stone-50/50 hover:bg-white flex items-center justify-center p-2 text-center transition-all cursor-pointer"
              >
                <span className="font-serif text-xs tracking-wider uppercase font-medium text-stone-800">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FLOATING COMPARISON STATUS PILL (If items are selected for comparison) */}
      {comparedProducts.length > 0 && onOpenComparisonModal && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={onOpenComparisonModal}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-stone-900 text-white shadow-2xl border border-stone-700 hover:bg-[#7E6348] transition-all hover:scale-105"
          >
            <span className="w-5 h-5 rounded-full bg-[#7E6348] text-white text-[11px] font-bold flex items-center justify-center">
              {comparedProducts.length}
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase font-sans">
              Compare Products ({comparedProducts.length}/3)
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
