/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ActiveView, Product, CartItem } from './types';
import { CATALOG_PRODUCTS } from './data/mockData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { QuoteModal } from './components/modals/QuoteModal';
import { SampleModal } from './components/modals/SampleModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { Product360ReviewModal } from './components/modals/Product360ReviewModal';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(CATALOG_PRODUCTS[1]); // Verona Calacotta Gold
  const [selected360Product, setSelected360Product] = useState<Product | null>(null);
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: CATALOG_PRODUCTS[1],
      quantity: 2,
      selectedThickness: '18 mm',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p2', 'p5']);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sampleTargetName, setSampleTargetName] = useState<string>('Verona Calacotta Gold Slabs');
  const [quoteTargetProject, setQuoteTargetProject] = useState<string>('');

  const handleOpen360Review = (product: Product) => {
    setSelected360Product(product);
    setIs360ModalOpen(true);
  };

  // Add to cart / quote list handler
  const handleAddToCart = (product: Product, quantity: number = 1, thickness?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedThickness: thickness || '18 mm',
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const openQuoteModalFor = (projectOrProduct?: string) => {
    setQuoteTargetProject(projectOrProduct || '');
    setIsQuoteModalOpen(true);
  };

  const openSampleModalFor = (productName?: string) => {
    setSampleTargetName(productName || 'Verona Calacotta Gold & Natural Stone Set');
    setIsSampleModalOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Smooth scroll progress bar across page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, selectedProduct]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#faf9f6] text-stone-900 selection:bg-[#c5a880]/30 selection:text-stone-900 relative">
      {/* Dynamic Scroll Progress Bar for high-end feel */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#886d4b] via-[#d5c1a4] to-[#886d4b] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* STOREFRONT NAVIGATION (Rendered on Home, Catalog, Product views) */}
      {activeView !== 'dashboard' && (
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenQuote={() => openQuoteModalFor()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {/* 3. ACTIVE VIEW CONTAINER WITH FRAMER-MOTION PAGE TRANSITIONS */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <HomePage
                setActiveView={setActiveView}
                onSelectProduct={(p) => {
                  setSelectedProduct(p);
                  setActiveView('product');
                }}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onOpenQuoteModal={() => openQuoteModalFor('General Project Specification')}
                onOpen360Review={handleOpen360Review}
              />
            </motion.div>
          )}

          {activeView === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <CatalogPage
                setActiveView={setActiveView}
                onSelectProduct={(p) => {
                  setSelectedProduct(p);
                  setActiveView('product');
                }}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onOpenQuoteModal={() => openQuoteModalFor('Tiles & Slabs Catalog Inquiry')}
                searchQuery={searchQuery}
                onOpen360Review={handleOpen360Review}
              />
            </motion.div>
          )}

          {activeView === 'product' && (
            <motion.div
              key={`product-${selectedProduct.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductDetailPage
                product={selectedProduct}
                setActiveView={setActiveView}
                onAddToCart={(p, qty, th) => handleAddToCart(p, qty, th)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onOpenQuoteModal={() => openQuoteModalFor(selectedProduct.name)}
                onOpenSampleModal={openSampleModalFor}
                onOpen360Modal={handleOpen360Review}
              />
            </motion.div>
          )}

          {activeView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ExecutiveDashboard
                setActiveView={setActiveView}
                onOpenNewQuoteModal={() => openQuoteModalFor('Enterprise BOQ')}
                onOpenSampleModal={() => openSampleModalFor()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. FOOTER (Storefront views) */}
      {activeView !== 'dashboard' && (
        <Footer
          setActiveView={setActiveView}
          onOpenQuote={() => openQuoteModalFor()}
        />
      )}

      {/* 5. MODALS & DRAWERS */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultProject={quoteTargetProject}
      />

      <SampleModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        sampleName={sampleTargetName}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToQuote={() => {
          setIsCartOpen(false);
          openQuoteModalFor('Cart Items BOQ');
        }}
      />

      {/* 5B. 360 DEGREE INTERACTIVE PRODUCT REVIEW MODAL */}
      {selected360Product && (
        <Product360ReviewModal
          isOpen={is360ModalOpen}
          onClose={() => setIs360ModalOpen(false)}
          product={selected360Product}
          onAddToCart={(p: Product) => handleAddToCart(p, 1)}
          onOpenQuote={(productName: string) => {
            setIs360ModalOpen(false);
            openQuoteModalFor(productName);
          }}
        />
      )}
    </div>
  );
}
