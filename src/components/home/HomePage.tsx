import React, { useState } from 'react';
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
  ShoppingCart,
  Heart,
  Check,
} from 'lucide-react';
import { ActiveView, Product } from '../../types';

interface HomePageProps {
  setActiveView: (view: ActiveView) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenQuoteModal: () => void;
  onSelectProduct: (product: Product) => void;
  onOpen360Review?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuoteModal,
  onSelectProduct,
  onOpen360Review,
}) => {
  const [heroSlide, setHeroSlide] = useState(0);

  // Exact 6 categories from Image 4
  const categories = [
    {
      id: 'tiles-slabs',
      title: 'Tiles & Slabs',
      desc: 'Marble • Porcelain • Natural Stone',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'sanitaryware',
      title: 'Sanitaryware',
      desc: 'Toilets • Basins • Urinals',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'showers',
      title: 'Showers',
      desc: 'Rain Showers • Hand Showers • Diverters',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'sinks-taps',
      title: 'Sinks & Taps',
      desc: 'Kitchen Sinks • Basin Mixers • Kitchen Taps',
      image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'vanities',
      title: 'Vanities',
      desc: 'Bathroom Vanities • Mirrors • Storage',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'faucets-accessories',
      title: 'Faucets & Accessories',
      desc: 'Faucets • Towel Racks • Accessories',
      image: 'https://images.unsplash.com/photo-1595514535415-dae92493e878?auto=format&fit=crop&w=700&q=80',
    },
  ];

  // Exact 6 New Arrivals products from Image 4
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
  ];

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
                <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d5b282] font-sans">
                  TIMELESS MATERIALS. BEAUTIFUL SPACES.
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1] tracking-tight">
                Elevate Everyday Living
              </h1>

              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                Discover premium tiles, sanitaryware and kitchen solutions crafted for modern lifestyles.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => setActiveView('catalog')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#d5b282] hover:bg-[#c5a880] text-stone-950 text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all duration-300 shadow-md group"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-catalogue-btn"
                  onClick={() => setActiveView('catalog')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-stone-600 hover:border-stone-400 bg-transparent text-white text-xs font-medium uppercase tracking-[0.16em] rounded transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#d5b282]" />
                  <span>VIEW CATALOGUE</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Metrics Row matching Image 4 */}
            <div className="pt-10 mt-8 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  500+
                </div>
                <div className="text-[11px] text-stone-400 font-light mt-0.5">
                  Premium Products
                </div>
              </div>

              <div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  50+
                </div>
                <div className="text-[11px] text-stone-400 font-light mt-0.5">
                  Global Brands
                </div>
              </div>

              <div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  1000+
                </div>
                <div className="text-[11px] text-stone-400 font-light mt-0.5">
                  Happy Customers
                </div>
              </div>

              <div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  2
                </div>
                <div className="text-[11px] text-stone-400 font-light mt-0.5">
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
            <div className="absolute top-6 left-6 text-white text-[10px] tracking-[0.24em] font-sans font-medium uppercase bg-stone-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              MORE THAN SPACES A BETTER TOMORROW
            </div>

            {/* Bottom Right Callout Box matching Image 4 */}
            <div className="absolute bottom-6 right-6 left-6 sm:left-auto max-w-sm bg-stone-950/80 backdrop-blur-md p-5 rounded border border-stone-700/60 text-white space-y-2">
              <h3 className="font-editorial text-xl font-normal text-white">
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

      {/* 2. SHOP BY CATEGORY (6 Cards matching Image 4) */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3 border-b border-stone-200/80 pb-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#886d4b] font-semibold font-sans mb-1">
              SHOP BY CATEGORY
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
              Everything for Beautiful Spaces
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-2xl">
              Premium tiles, sanitaryware, kitchen solutions and accessories from world's leading brands — all in one place.
            </p>
          </div>
          <button
            onClick={() => setActiveView('catalog')}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#886d4b] uppercase tracking-[0.16em] transition-colors self-start sm:self-end"
          >
            <span>VIEW ALL CATEGORIES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveView('catalog')}
              className="group bg-white rounded border border-stone-200/90 hover:border-[#886d4b]/60 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-editorial text-base font-normal text-stone-900 group-hover:text-[#886d4b] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-light mt-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-stone-700 font-semibold group-hover:text-[#886d4b] transition-colors">
                    EXPLORE
                  </span>
                  <ArrowRight className="w-3 h-3 text-stone-700 group-hover:text-[#886d4b] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          ))}
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
                <div className="w-9 h-9 rounded-full bg-[#f7f4ee] border border-[#e5dcce] flex items-center justify-center shrink-0 text-[#886d4b]">
                  <item.icon className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 font-sans">{item.title}</h4>
                  <p className="text-[11px] text-stone-500 font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS (6 Cards matching Image 4) */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3 border-b border-stone-200/80 pb-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#886d4b] font-semibold font-sans mb-1">
              NEW ARRIVALS
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
              Fresh Choices for Modern Spaces
            </h2>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-end">
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Previous products"
                className="w-7 h-7 rounded-full border border-stone-300 hover:border-stone-800 flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next products"
                className="w-7 h-7 rounded-full border border-stone-300 hover:border-stone-800 flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setActiveView('catalog')}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#886d4b] uppercase tracking-[0.16em] transition-colors"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {newArrivals.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded border border-stone-200/90 hover:border-[#886d4b]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Top Badges & Wishlist */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      setActiveView('product');
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.name.includes('Calacatta') && (
                      <>
                        <span className="bg-stone-900 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                          NEW
                        </span>
                        <span className="bg-[#d5b282] text-stone-950 text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                          PREMIUM
                        </span>
                      </>
                    )}
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-2xs flex items-center justify-center transition-colors"
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      onClick={() => {
                        onSelectProduct(product);
                        setActiveView('product');
                      }}
                      className="font-editorial text-sm sm:text-[15px] font-normal text-stone-900 hover:text-[#886d4b] transition-colors leading-snug cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-light mt-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-stone-900 font-sans">
                        PKR {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-7 h-7 rounded bg-stone-900 hover:bg-[#886d4b] text-white flex items-center justify-center transition-colors"
                      title="Add to cart / quote"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PROJECT QUOTATION BANNER (matching Image 4) */}
      <section className="bg-[#f2ece2] border-y border-[#dfd6c6] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#886d4b] font-semibold font-sans">
                FOR HOMES, BUILDERS & BUSINESSES
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight">
                Let's Build Something Exceptional
              </h2>

              <p className="text-stone-700 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
                Get a customized quotation for your residential or commercial project with expert recommendations and special pricing.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d5b282] hover:bg-[#c5a880] text-stone-950 text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all shadow-sm"
                >
                  <span>REQUEST A QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="tel:+923001234567"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-stone-400 hover:border-stone-800 bg-white/80 hover:bg-white text-stone-900 text-xs font-medium uppercase tracking-[0.14em] rounded transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#886d4b]" />
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

      {/* 6. SIMPLE & CONVENIENT / How It Works (matching Image 4) */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#886d4b] font-semibold font-sans mb-1">
            SIMPLE & CONVENIENT
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
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
          ].map((s, idx) => (
            <div
              key={s.step}
              className="bg-white p-6 rounded border border-stone-200 text-center relative flex flex-col items-center justify-between"
            >
              <div className="w-10 h-10 rounded-full bg-[#f7f4ee] border border-[#e5dcce] flex items-center justify-center font-bold text-xs text-[#886d4b] mb-4">
                {s.step}
              </div>
              <h3 className="font-editorial text-base font-normal text-stone-900 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRANSFORM YOUR SPACE TODAY (Dark marble banner matching Image 4) */}
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
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
            Transform Your Space Today
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Discover premium materials, expert guidance and unparalleled service.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveView('catalog')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#d5b282] hover:bg-[#c5a880] text-stone-950 text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all shadow-md"
            >
              <span>EXPLORE OUR COLLECTIONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. OUR TRUSTED BRANDS (matching Image 4) */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-100">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 font-sans">
              OUR TRUSTED BRANDS
            </h3>
            <button
              onClick={() => setActiveView('catalog')}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 hover:text-[#886d4b] transition-colors flex items-center gap-1"
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
                className="h-12 rounded border border-stone-200/70 hover:border-stone-400 bg-stone-50/50 hover:bg-white flex items-center justify-center p-2 text-center transition-all cursor-pointer"
              >
                <span className="font-serif text-xs tracking-wider uppercase font-medium text-stone-700">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
