import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { ActiveView } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  onOpenQuote?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, onOpenQuote }) => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#14171a] text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-14 border-b border-stone-800/80">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <BrandLogo
              variant="light"
              size="md"
              tagline="SPACES FOR A BETTER TOMORROW"
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mb-4"
            />

            <p className="text-xs leading-relaxed text-stone-400 max-w-sm mb-6 font-light">
              Your trusted partner for premium tiles, sanitaryware, kitchen solutions and accessories in Pakistan. Creating beautiful spaces since 2005.
            </p>

            <div className="flex items-center gap-2.5 text-stone-400">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:text-white hover:border-[#c5a880] hover:bg-stone-900 transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:text-white hover:border-[#c5a880] hover:bg-stone-900 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:text-white hover:border-[#c5a880] hover:bg-stone-900 transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:text-white hover:border-[#c5a880] hover:bg-stone-900 transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white mb-4 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-white transition-colors">
                  Our Showrooms
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-white transition-colors">
                  Brands
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('catalog')} className="hover:text-white transition-colors">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('catalog')} className="hover:text-white transition-colors">
                  Inspiration
                </button>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white mb-4 font-sans">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <a href="#track" className="hover:text-white transition-colors">Track Order</a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#warranty" className="hover:text-white transition-colors">Warranty Information</a>
              </li>
              <li>
                <a href="#installation" className="hover:text-white transition-colors">Installation Guide</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white mb-3.5 font-sans">
                Contact Information
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-light">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880] mt-0.5 shrink-0" />
                  <span>Main Boulevard, DHA Phase 6, Lahore, Pakistan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#c5a880] mt-0.5 shrink-0" />
                  <span className="font-mono text-stone-200">+92 300 1234567</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#c5a880] mt-0.5 shrink-0" />
                  <span>info@saleemtraders.pk</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#c5a880] mt-0.5 shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white mb-2 font-sans">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-[11px] text-stone-400 mb-2.5 font-light">
                Get the latest updates on new arrivals, exclusive offers and design inspiration.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center rounded bg-stone-900 border border-stone-800 focus-within:border-[#c5a880] overflow-hidden">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-xs px-3.5 py-2 text-stone-200 placeholder-stone-500 focus:outline-none flex-1 font-light"
                  />
                  <button
                    type="submit"
                    className="bg-[#c5a880] hover:bg-[#b0926b] text-stone-950 p-2.5 transition-colors flex items-center justify-center font-medium"
                    title="Subscribe"
                  >
                    {subscribed ? <Check className="w-4 h-4 text-white" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                <label className="flex items-start gap-2 text-[10px] text-stone-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-stone-800 bg-stone-900 accent-[#c5a880] text-[#c5a880] focus:ring-0"
                  />
                  <span className="font-light">I agree to receive marketing communications from Saleem Traders.</span>
                </label>
                {subscribed && (
                  <p className="text-[11px] text-emerald-400 mt-1">Thank you for subscribing to our updates!</p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-light">
          <p>© 2024 Saleem Traders. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-stone-400">
            <span>Designed for Better Living</span>
            <span>•</span>
            <span>🇵🇰 Pakistan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
