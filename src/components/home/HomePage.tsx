import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Phone,
  Truck,
  Award,
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Pause,
  Layers,
  UserCheck,
  X,
} from 'lucide-react';
import { ActiveView, Product } from '../../types';
import { ArchitecturalProductCard } from '../common/ArchitecturalProductCard';
import heroLuxuryBath from '../../assets/images/hero_luxury_bath_1790169676815.jpg';
import heroLuxuryKitchen from '../../assets/images/hero_luxury_kitchen_1790169696762.jpg';

interface HomePageProps {
  setActiveView: (view: ActiveView) => void;
  setSearchQuery?: (query: string) => void;
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
  setSearchQuery,
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
  // Hero Carousel Slides with High-Resolution Imagery matching reference design
  const heroSlides = [
    {
      eyebrow: 'PREMIUM SANITARYWARE, TILES, KITCHENS & MORE',
      title1: 'Elevate',
      title2: 'Everyday Living',
      desc: 'Beautiful spaces for a better tomorrow. Discover premium sanitaryware, tiles, and kitchen solutions for modern living.',
      image: heroLuxuryBath,
    },
    {
      eyebrow: 'ARCHITECTURAL SLABS & STONE • ITALY & SPAIN',
      title1: 'Crafted',
      title2: 'Modern Living',
      desc: 'Calacatta porcelain surfaces and sculpted marble islands tailored for refined residential spaces.',
      image: heroLuxuryKitchen,
    },
    {
      eyebrow: 'WELLNESS & CONCEALED WATER SYSTEMS',
      title1: 'Sanctuary',
      title2: 'Of Calm & Serenity',
      desc: 'Immersive rain systems, thermostatic fixtures, and precision brassware designed for daily rejuvenation.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=2000&q=85',
    },
  ];

  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isVideoStoryOpen, setIsVideoStoryOpen] = useState(false);

  // Hero slideshow auto-advance with pause on hover
  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setTimeout(() => {
      setHeroSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearTimeout(timer);
  }, [isHeroHovered, heroSlide, heroSlides.length]);

  // Category Slideshow State (Shows 3 cards first, then auto-advances slideshow of all)
  const [catSlideIndex, setCatSlideIndex] = useState(0);
  const [isCatAutoPlay, setIsCatAutoPlay] = useState(true);
  const [isCatHovered, setIsCatHovered] = useState(false);
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

  // Auto-advancing slideshow with clean restart and time issue fix:
  // Restarts countdown every time the slide changes (auto or manual) or hover ends
  useEffect(() => {
    if (!isCatAutoPlay || isCatHovered) return;
    const timer = setTimeout(() => {
      setCatSlideIndex((prev) => (prev >= maxCatIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearTimeout(timer);
  }, [isCatAutoPlay, isCatHovered, maxCatIndex, catSlideIndex]);

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
  const [isArrivalHovered, setIsArrivalHovered] = useState(false);

  const maxArrivalIndex = Math.max(0, newArrivals.length - visibleCards);
  const safeArrivalIndex = Math.min(arrivalSlideIndex, maxArrivalIndex);

  // Auto-advancing New Arrivals slideshow with clean restart and time issue fix:
  // Restarts countdown every time the slide changes (auto or manual) or hover ends
  useEffect(() => {
    if (!isArrivalAutoPlay || isArrivalHovered) return;
    const timer = setTimeout(() => {
      setArrivalSlideIndex((prev) => (prev >= maxArrivalIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearTimeout(timer);
  }, [isArrivalAutoPlay, isArrivalHovered, maxArrivalIndex, arrivalSlideIndex]);

  const handlePrevArrival = () => {
    setArrivalSlideIndex((prev) => (prev <= 0 ? maxArrivalIndex : prev - 1));
  };

  const handleNextArrival = () => {
    setArrivalSlideIndex((prev) => (prev >= maxArrivalIndex ? 0 : prev + 1));
  };

  const brandSlides = [
    {
      id: 'sanitaryware',
      tabLabel: 'Sanitaryware & Baths',
      title: 'World-Renowned Sanitaryware & Bath Fittings',
      subtitle: 'Engineering excellence, thermostatic mixers and precision vitreous china craft.',
      brands: [
        {
          name: 'Roca',
          origin: 'Spain',
          specialty: 'Vitreous China & Basins',
          badge: (
            <span className="font-sans font-black text-2xl tracking-tighter text-stone-900">
              Roca
            </span>
          ),
        },
        {
          name: 'GROHE',
          origin: 'Germany',
          specialty: 'Thermostatic & SmartControl',
          badge: (
            <div className="flex flex-col items-center">
              <svg className="w-5 h-1.5 text-sky-600 mb-0.5" viewBox="0 0 24 8" fill="currentColor">
                <path d="M0 4 C 4 1, 8 7, 12 4 C 16 1, 20 7, 24 4 L 24 6 C 20 9, 16 3, 12 6 C 8 9, 4 3, 0 6 Z" />
              </svg>
              <span className="font-sans font-black tracking-widest text-lg text-stone-900 leading-none">
                GROHE
              </span>
            </div>
          ),
        },
        {
          name: 'TOTO',
          origin: 'Japan',
          specialty: 'Smart Washlets & Neorest',
          badge: (
            <span className="font-sans font-black tracking-[0.22em] text-xl text-stone-900">
              TOTO
            </span>
          ),
        },
        {
          name: 'Hansgrohe',
          origin: 'Germany',
          specialty: 'Raindance & PowderRain',
          badge: (
            <div className="flex items-center gap-1 font-sans font-bold text-lg text-stone-900 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
              <span>hansgrohe</span>
            </div>
          ),
        },
        {
          name: 'CERA',
          origin: 'Italy / India',
          specialty: 'Contemporary Sanware',
          badge: (
            <div className="flex items-center gap-0.5 font-sans font-black text-xl tracking-wider text-stone-900">
              <span>CERA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block mb-2" />
            </div>
          ),
        },
        {
          name: 'Jaquar',
          origin: 'Global',
          specialty: 'Architectural Faucets',
          badge: (
            <span className="font-serif italic font-bold text-2xl tracking-normal text-stone-900">
              Jaquar
            </span>
          ),
        },
      ],
    },
    {
      id: 'surfaces',
      tabLabel: 'Tiles & Slabs',
      title: 'Architectural Porcelain, Giant Slabs & Surfaces',
      subtitle: 'Precision-calibrated porcelain and bookmatched marble finishes from global kilns.',
      brands: [
        {
          name: 'RAK Ceramics',
          origin: 'UAE',
          specialty: 'Maximus Giant Slabs',
          badge: (
            <div className="flex flex-col items-center">
              <span className="font-sans font-black text-lg tracking-widest text-stone-900 uppercase">
                RAK
              </span>
              <span className="text-[7.5px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
                CERAMICS
              </span>
            </div>
          ),
        },
        {
          name: 'Kajaria',
          origin: 'India',
          specialty: 'Polished Vitrified',
          badge: (
            <span className="font-sans italic font-black text-xl tracking-tight text-stone-900">
              Kajaria
            </span>
          ),
        },
        {
          name: 'Somany',
          origin: 'Global',
          specialty: 'Glazed Architectural Tiles',
          badge: (
            <span className="font-sans font-bold tracking-[0.16em] text-lg text-stone-900 uppercase">
              SOMANY
            </span>
          ),
        },
        {
          name: 'Atlas Concorde',
          origin: 'Italy',
          specialty: 'Bookmatched Porcelain',
          badge: (
            <div className="flex flex-col items-center">
              <span className="font-serif tracking-widest text-sm uppercase text-stone-900 font-bold">
                atlas concorde
              </span>
              <span className="text-[7px] text-stone-500 tracking-[0.2em] uppercase">Ceramiche d'Arte</span>
            </div>
          ),
        },
        {
          name: 'Florim',
          origin: 'Italy',
          specialty: 'High-Performance Slabs',
          badge: (
            <span className="font-sans font-black tracking-[0.2em] text-lg text-stone-900 uppercase">
              FLORIM
            </span>
          ),
        },
        {
          name: 'Caesarstone',
          origin: 'Global',
          specialty: 'Engineered Quartz',
          badge: (
            <span className="font-sans font-semibold tracking-[0.16em] text-base text-stone-900 uppercase">
              caesarstone
            </span>
          ),
        },
      ],
    },
    {
      id: 'kitchen-wellness',
      tabLabel: 'Kitchen & Systems',
      title: 'Luxury Kitchen Solutions & Engineered Systems',
      subtitle: 'Granite undermount sinks, concealed cisterns and master bath engineering.',
      brands: [
        {
          name: 'Kohler',
          origin: 'USA',
          specialty: 'Master Baths & Cast Iron',
          badge: (
            <span className="font-serif font-bold tracking-wider text-xl text-stone-900 uppercase">
              KOHLER
            </span>
          ),
        },
        {
          name: 'Duravit',
          origin: 'Germany',
          specialty: 'Designer Ceramic Furniture',
          badge: (
            <span className="font-sans font-bold tracking-[0.18em] text-lg text-stone-900 uppercase">
              DURAVIT
            </span>
          ),
        },
        {
          name: 'hindware',
          origin: 'Italy Design',
          specialty: 'Italian Collection',
          badge: (
            <div className="flex flex-col items-center">
              <span className="font-sans font-extrabold text-xl tracking-tight text-stone-900 lowercase leading-none">
                hindware
              </span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-stone-500 font-semibold mt-0.5">
                Italian Collection
              </span>
            </div>
          ),
        },
        {
          name: 'Franke',
          origin: 'Switzerland',
          specialty: 'Granite & Steel Kitchen Sinks',
          badge: (
            <span className="font-sans font-black tracking-[0.18em] text-xl text-stone-900 uppercase">
              FRANKE
            </span>
          ),
        },
        {
          name: 'Geberit',
          origin: 'Switzerland',
          specialty: 'Concealed Cistern Systems',
          badge: (
            <div className="flex items-center gap-1 font-sans font-bold text-lg text-stone-900 tracking-wider uppercase">
              <span className="w-2.5 h-2.5 bg-blue-600 inline-block" />
              <span>GEBERIT</span>
            </div>
          ),
        },
        {
          name: 'Villeroy & Boch',
          origin: 'Germany',
          specialty: 'Heritage European Ceramics',
          badge: (
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-sm tracking-wide text-stone-900">
                Villeroy & Boch
              </span>
              <span className="text-[7.5px] tracking-[0.2em] text-stone-500 uppercase">1748</span>
            </div>
          ),
        },
      ],
    },
  ];

  const [brandSlide, setBrandSlide] = useState(0);
  const [isBrandAutoPlay, setIsBrandAutoPlay] = useState(true);
  const [isBrandHovered, setIsBrandHovered] = useState(false);

  useEffect(() => {
    if (!isBrandAutoPlay || isBrandHovered) return;
    const timer = setInterval(() => {
      setBrandSlide((prev) => (prev >= brandSlides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isBrandAutoPlay, isBrandHovered, brandSlides.length]);

  const handlePrevBrandSlide = () => {
    setBrandSlide((prev) => (prev <= 0 ? brandSlides.length - 1 : prev - 1));
  };

  const handleNextBrandSlide = () => {
    setBrandSlide((prev) => (prev >= brandSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-[#fbf9f5] font-sans">
      {/* 1. HERO SECTION: Full-bleed architectural photographic canvas matching reference design */}
      <section
        className="w-full relative overflow-hidden bg-stone-950 text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        {/* Dynamic Background Image with Smooth Crossfade */}
        <div className="absolute inset-0 z-0">
          <img
            key={heroSlides[heroSlide].image}
            src={heroSlides[heroSlide].image}
            alt="Elevate Everyday Living - Saleem Traders"
            className="w-full h-full object-cover object-center transition-all duration-1000 ease-out scale-101"
          />
          {/* Architectural Left-heavy Gradient Mask so typography is crystal clear while bathroom highlights shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/55 to-stone-950/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 lg:pt-28 pb-12 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#d5b282] font-sans">
                {heroSlides[heroSlide].eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-light leading-[1.08] tracking-tight">
              {heroSlides[heroSlide].title1} <br />
              <span className="font-normal">{heroSlides[heroSlide].title2}</span>
            </h1>

            {/* Description */}
            <p className="text-zinc-200 text-sm sm:text-base font-normal max-w-lg leading-relaxed pt-1">
              {heroSlides[heroSlide].desc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                id="hero-explore-btn"
                onClick={() => {
                  setActiveView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 bg-[#9D805E] hover:bg-[#b89a74] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-lg group cursor-pointer"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsVideoStoryOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 border border-white/40 hover:border-white bg-black/25 hover:bg-black/40 text-white text-xs font-medium uppercase tracking-[0.16em] backdrop-blur-xs transition-all cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full border border-white/70 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                </div>
                <span>WATCH OUR STORY</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Bottom Slider Navigation Bar */}
        <div className="relative z-10 w-full border-t border-white/10 bg-black/20 backdrop-blur-xs py-4 px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: 01 02 03 Slide Numbers with Progress Indicator */}
            <div className="flex items-center gap-5 sm:gap-7">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlide(idx)}
                  className="group flex items-center gap-2 cursor-pointer transition-colors"
                  aria-label={`Jump to slide ${idx + 1}`}
                >
                  <span
                    className={`font-serif text-xs sm:text-sm transition-colors ${
                      heroSlide === idx
                        ? 'text-white font-semibold'
                        : 'text-white/40 group-hover:text-white/80'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  {heroSlide === idx && (
                    <span className="w-8 sm:w-10 h-[2px] bg-[#d5b282] rounded-full inline-block" />
                  )}
                </button>
              ))}
            </div>

            {/* Right: SPACES THAT INSPIRE A BETTER YOU & Arrows */}
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] font-sans font-medium hidden sm:inline-block">
                SPACES THAT INSPIRE A BETTER YOU
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setHeroSlide((prev) => (prev <= 0 ? heroSlides.length - 1 : prev - 1))
                  }
                  className="w-8 h-8 rounded-full border border-white/30 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setHeroSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1))
                  }
                  className="w-8 h-8 rounded-full border border-white/30 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS BAR: 4 Columns Directly Below Hero Matching Reference */}
      <section className="w-full bg-white border-b border-stone-200 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {/* 1. Premium Quality */}
            <div className="flex items-center gap-3.5 px-2 pt-2 sm:pt-0">
              <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-stone-200 flex items-center justify-center text-[#7E6348] shrink-0">
                <Award className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900 font-sans tracking-tight">
                  Premium Quality
                </h4>
                <p className="text-xs text-stone-500 font-normal mt-0.5">
                  Trusted global brands
                </p>
              </div>
            </div>

            {/* 2. Wide Product Range */}
            <div className="flex items-center gap-3.5 px-2 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-stone-200 flex items-center justify-center text-[#7E6348] shrink-0">
                <Layers className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900 font-sans tracking-tight">
                  Wide Product Range
                </h4>
                <p className="text-xs text-stone-500 font-normal mt-0.5">
                  Everything for your space
                </p>
              </div>
            </div>

            {/* 3. Expert Guidance */}
            <div className="flex items-center gap-3.5 px-2 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-stone-200 flex items-center justify-center text-[#7E6348] shrink-0">
                <UserCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900 font-sans tracking-tight">
                  Expert Guidance
                </h4>
                <p className="text-xs text-stone-500 font-normal mt-0.5">
                  Personalized consultation
                </p>
              </div>
            </div>

            {/* 4. Nationwide Support */}
            <div className="flex items-center gap-3.5 px-2 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-stone-200 flex items-center justify-center text-[#7E6348] shrink-0">
                <Truck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900 font-sans tracking-tight">
                  Nationwide Support
                </h4>
                <p className="text-xs text-stone-500 font-normal mt-0.5">
                  Reliable service always
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Video Story Modal */}
      <AnimatePresence>
        {isVideoStoryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden shadow-2xl text-white"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#d5b282] font-semibold">
                    OUR BRAND STORY
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    Saleem Traders • Elevate Everyday Living
                  </h3>
                </div>
                <button
                  onClick={() => setIsVideoStoryOpen(false)}
                  className="w-8 h-8 rounded-full border border-stone-700 text-stone-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={heroLuxuryBath}
                  alt="Saleem Traders Luxury Showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-950/60 flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#9D805E]/90 flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-light text-white">
                      Four Decades of Architectural Excellence
                    </h4>
                    <p className="text-xs text-stone-300 max-w-md mx-auto mt-1">
                      From timeless Italian marble to world-class German sanitary engineering, explore how Saleem Traders shapes discerning residential and commercial projects.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsVideoStoryOpen(false);
                        setActiveView('catalog');
                      }}
                      className="px-5 py-2.5 bg-white text-stone-950 text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-200"
                    >
                      Browse Featured Collections
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. SHOP BY CATEGORY (3 Cards Shown First + Slideshow of All Collections) */}
      <section className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title and Slideshow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3 border-b border-zinc-200/80 pb-3.5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 font-sans mb-1">
              SHOP BY CATEGORY
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-900 tracking-tight">
              Everything for Beautiful Spaces
            </h2>
            <p className="text-sm lg:text-base text-zinc-600 leading-relaxed font-normal mt-1 max-w-2xl">
              Premium tiles, sanitaryware, kitchen solutions and accessories from the world's leading architectural brands.
            </p>
          </div>

          {/* Slideshow Controls & View All Link */}
          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-end">
            {/* Category Counter Indicator */}
            <span className="text-xs font-medium text-stone-500 font-sans hidden md:inline-block mr-1">
              {safeCatIndex + 1}–{Math.min(safeCatIndex + visibleCards, categories.length)} of {categories.length}
            </span>

            {/* Visual Timer Progress Bar */}
            <div className="hidden sm:flex items-center gap-1.5" title="Auto-advance countdown">
              <div className="w-14 h-1 bg-stone-200/90 rounded-full overflow-hidden">
                <motion.div
                  key={`cat-progress-${safeCatIndex}-${isCatAutoPlay}-${isCatHovered}`}
                  initial={{ width: '0%' }}
                  animate={{ width: isCatAutoPlay && !isCatHovered ? '100%' : '0%' }}
                  transition={{ duration: 4.5, ease: 'linear' }}
                  className="h-full bg-[#7E6348] rounded-full"
                />
              </div>
            </div>

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
          onMouseEnter={() => setIsCatHovered(true)}
          onMouseLeave={() => setIsCatHovered(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
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
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
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
            <span className={`w-2 h-2 rounded-full ${isCatAutoPlay ? (isCatHovered ? 'bg-amber-600' : 'bg-emerald-700 animate-pulse') : 'bg-stone-500'}`} />
            <span>
              {isCatAutoPlay
                ? isCatHovered
                  ? 'Paused on hover'
                  : 'Auto-advancing (4.5s) • Restarts at end'
                : 'Slideshow paused'}
            </span>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS (3 Products Shown First + Architectural Slideshow) */}
      <section className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3 border-b border-zinc-200/80 pb-3.5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 font-sans mb-1">
              NEW ARRIVALS
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-900 tracking-tight">
              Fresh Choices for Modern Spaces
            </h2>
            <p className="text-sm lg:text-base text-zinc-600 leading-relaxed font-normal mt-1 max-w-2xl">
              Recently specified stone slabs, luxury sanitary fixtures, and thermostatic brassware ready for immediate project delivery.
            </p>
          </div>

          {/* Slideshow Controls & View All Products */}
          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-end">
            {/* Counter */}
            <span className="text-xs font-medium text-stone-500 font-sans hidden md:inline-block mr-1">
              {safeArrivalIndex + 1}–{Math.min(safeArrivalIndex + visibleCards, newArrivals.length)} of {newArrivals.length}
            </span>

            {/* Visual Timer Progress Bar */}
            <div className="hidden sm:flex items-center gap-1.5" title="Auto-advance countdown">
              <div className="w-14 h-1 bg-stone-200/90 rounded-full overflow-hidden">
                <motion.div
                  key={`arrival-progress-${safeArrivalIndex}-${isArrivalAutoPlay}-${isArrivalHovered}`}
                  initial={{ width: '0%' }}
                  animate={{ width: isArrivalAutoPlay && !isArrivalHovered ? '100%' : '0%' }}
                  transition={{ duration: 4.5, ease: 'linear' }}
                  className="h-full bg-[#7E6348] rounded-full"
                />
              </div>
            </div>

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
          onMouseEnter={() => setIsArrivalHovered(true)}
          onMouseLeave={() => setIsArrivalHovered(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
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
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
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
            <span className={`w-2 h-2 rounded-full ${isArrivalAutoPlay ? (isArrivalHovered ? 'bg-amber-600' : 'bg-emerald-700 animate-pulse') : 'bg-stone-500'}`} />
            <span>
              {isArrivalAutoPlay
                ? isArrivalHovered
                  ? 'Paused on hover'
                  : 'Auto-advancing (4.5s) • Restarts at end'
                : 'Slideshow paused'}
            </span>
          </div>
        </div>
      </section>

      {/* 5. PROJECT QUOTATION BANNER (Refined Bronze Palette) */}
      <section className="bg-[#F5F1EA] border-y border-[#E5DFD5] py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold font-sans">
                FOR HOMES, BUILDERS & BUSINESSES
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-zinc-900 font-medium tracking-tight">
                Let's Build Something Exceptional
              </h2>

              <p className="text-zinc-600 text-sm lg:text-base font-normal max-w-xl leading-relaxed">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 text-xs text-stone-800">
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
                  className="w-full h-60 sm:h-64 object-cover"
                />
                <div className="absolute bottom-4 right-4 text-white font-serif italic text-lg drop-shadow-md">
                  Spaces People Love—
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PARTNER BRANDS (Interactive Architectural Slideshow) */}
      <section id="partner-brands" className="py-8 sm:py-10 bg-[#fbf9f5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5 pb-3 border-b border-stone-200/80 gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 font-sans mb-1">
                TRUSTED BY THE BEST • SLIDESHOW
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-medium tracking-tight">
                Our Partner Brands
              </h2>
              <p className="text-sm text-stone-600 font-normal mt-1 max-w-xl">
                <span className="font-semibold text-stone-900">{brandSlides[brandSlide].title}</span> — {brandSlides[brandSlide].subtitle}
              </p>
            </div>

            {/* Slideshow Category Tabs & Controls */}
            <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
              {/* Slide Tabs */}
              <div className="flex items-center bg-stone-200/70 p-1 rounded-lg gap-1">
                {brandSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setBrandSlide(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all ${
                      brandSlide === idx
                        ? 'bg-white text-[#7E6348] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="hidden sm:inline">0{idx + 1}. </span>
                    {slide.tabLabel}
                  </button>
                ))}
              </div>

              {/* Progress Countdown Bar */}
              <div className="hidden md:flex items-center gap-1.5" title="Auto-advance countdown">
                <div className="w-12 h-1 bg-stone-200/90 rounded-full overflow-hidden">
                  <motion.div
                    key={`brand-progress-${brandSlide}-${isBrandAutoPlay}-${isBrandHovered}`}
                    initial={{ width: '0%' }}
                    animate={{ width: isBrandAutoPlay && !isBrandHovered ? '100%' : '0%' }}
                    transition={{ duration: 4.5, ease: 'linear' }}
                    className="h-full bg-[#7E6348] rounded-full"
                  />
                </div>
              </div>

              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsBrandAutoPlay(!isBrandAutoPlay)}
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-[#7E6348] flex items-center justify-center text-stone-600 hover:text-[#7E6348] transition-colors"
                title={isBrandAutoPlay ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
                aria-label={isBrandAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isBrandAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>

              {/* Prev / Next Slide Chevrons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevBrandSlide}
                  className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-all shadow-2xs"
                  aria-label="Previous brand slide"
                  title="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextBrandSlide}
                  className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-all shadow-2xs"
                  aria-label="Next brand slide"
                  title="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* View All in Catalog */}
              <button
                onClick={() => {
                  setActiveView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-[#7E6348] uppercase tracking-[0.14em] transition-colors ml-1"
              >
                <span>All Brands</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Slideshow Display Container with Smooth Slide Transitions */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsBrandHovered(true)}
            onMouseLeave={() => setIsBrandHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={brandSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4"
              >
                {brandSlides[brandSlide].brands.map((brand, bIdx) => (
                  <div
                    key={bIdx}
                    onClick={() => {
                      if (setSearchQuery) {
                        setSearchQuery(brand.name);
                      }
                      setActiveView('catalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white border border-stone-200/90 hover:border-[#7E6348] hover:shadow-md rounded-xl p-4 sm:p-5 h-28 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
                    title={`Browse ${brand.name} in Catalog`}
                  >
                    <div className="w-full flex justify-between items-center text-[10px] text-stone-400 font-medium">
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 font-mono text-[9px] uppercase tracking-wider">
                        {brand.origin}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 text-[#7E6348] transition-opacity font-semibold">
                        View →
                      </span>
                    </div>

                    <div className="group-hover:scale-105 transition-transform duration-200 my-auto">
                      {brand.badge}
                    </div>

                    <span className="text-[10px] text-stone-500 font-sans tracking-tight truncate max-w-full group-hover:text-[#7E6348] transition-colors">
                      {brand.specialty}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Status & Slide Indicator */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              {/* Direct Slide Dots */}
              <div className="flex items-center gap-2">
                {brandSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBrandSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      brandSlide === idx
                        ? 'w-8 bg-[#7E6348]'
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Jump to brand slide ${idx + 1}`}
                    title={`Brand slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Status Message */}
              <div className="text-xs text-stone-600 font-normal font-sans flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isBrandAutoPlay ? (isBrandHovered ? 'bg-amber-600' : 'bg-emerald-700 animate-pulse') : 'bg-stone-500'}`} />
                <span>
                  {isBrandAutoPlay
                    ? isBrandHovered
                      ? 'Slideshow paused on hover'
                      : `Slide ${brandSlide + 1} of ${brandSlides.length} • Auto-advancing (4.5s)`
                    : 'Slideshow paused'}
                </span>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <span className="text-stone-500 text-[11px] hidden sm:inline">
                  Click any brand to explore verified collections
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIMPLE & CONVENIENT / How It Works */}
      <section className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold font-sans mb-1">
            SIMPLE & CONVENIENT
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-zinc-900 font-medium tracking-tight">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
              className="bg-white p-5 rounded border border-stone-200/90 text-center relative flex flex-col items-center justify-between hover:border-[#7E6348]/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5F1EA] border border-[#E5DFD5] flex items-center justify-center font-bold text-xs text-[#7E6348] mb-3">
                {s.step}
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-1.5">
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
      <section className="w-full bg-[#fbf9f5] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="py-10 sm:py-12 px-6 sm:px-10 text-white text-center relative overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-800 shadow-xl"
            style={{
              backgroundImage:
                'linear-gradient(rgba(18, 20, 24, 0.90), rgba(18, 20, 24, 0.94)), url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-500 font-sans">
                TIMELESS ARCHITECTURAL SPACES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight">
                Transform Your Space Today
              </h2>
              <p className="text-sm sm:text-base text-stone-300 font-normal max-w-xl mx-auto leading-relaxed">
                Discover premium materials, expert guidance and unparalleled architectural service.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#7E6348] hover:bg-[#A38A6B] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all shadow-md group"
                >
                  <span>EXPLORE OUR COLLECTIONS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
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
