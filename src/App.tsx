import React, { useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from './data/products';
import { ShoeProduct, CartItem, OrderDetails } from './types';
import { STORE_INFO, getGeneralWhatsAppUrl } from './data/storeInfo';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WishlistModal } from './components/WishlistModal';
import { StoreLocationSection } from './components/StoreLocationSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

export default function App() {
  // Products
  const [products] = useState<ShoeProduct[]>(SAMPLE_PRODUCTS);

  // Search & Categories
  const [selectedCategory, setSelectedCategory] = useState<string>('All Shoes');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State (stored locally)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('paji_shoes_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (stored locally)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('paji_shoes_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ShoeProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutCoupon, setCheckoutCoupon] = useState('');
  const [lastCompletedOrder, setLastCompletedOrder] = useState<OrderDetails | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('paji_shoes_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('paji_shoes_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Cart Operations
  const handleAddToCart = (product: ShoeProduct, size: number, color: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product.id === product.id && it.size === size && it.color === color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Direct Buy Now
  const handleDirectBuy = (product: ShoeProduct, size: number, color: string) => {
    // Add to cart if not present, then open checkout
    const exists = cartItems.some(
      (it) => it.product.id === product.id && it.size === size && it.color === color
    );
    if (!exists) {
      setCartItems((prev) => [...prev, { product, size, color, quantity: 1 }]);
    }
    if (quickViewProduct) {
      setQuickViewProduct(null);
    }
    setIsCartOpen(false);
    setCheckoutDiscount(0);
    setCheckoutCoupon('');
    setIsCheckoutOpen(true);
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: ShoeProduct) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Proceed from Cart to Checkout
  const handleProceedToCheckout = (discount: number, coupon: string) => {
    setCheckoutDiscount(discount);
    setCheckoutCoupon(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Handle Order Completed
  const handleOrderCompleted = (order: OrderDetails) => {
    setLastCompletedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]); // clear cart
  };

  // Scroll to Catalog
  const handleScrollToCatalog = () => {
    const el = document.getElementById('product-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to Store Location
  const handleScrollToStore = () => {
    const el = document.getElementById('store-location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8] selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStoreInfo={handleScrollToStore}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner with Durg Store Highlights */}
        <HeroBanner
          onScrollToCatalog={handleScrollToCatalog}
          onOpenStoreInfo={handleScrollToStore}
        />

        {/* Product Catalog with Filtering, Sorting & WhatsApp Booking */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={setQuickViewProduct}
          onDirectBuy={handleDirectBuy}
        />

        {/* Physical Store Location & Showroom in Durg, CG */}
        <StoreLocationSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        onOpenStoreInfo={handleScrollToStore}
      />

      {/* Floating WhatsApp Action Hub */}
      <WhatsAppFloatingButton />

      {/* Quick View / Product Detail Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          isWishlisted={wishlistIds.includes(quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal with Customer Details & Payment Gateway */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={checkoutDiscount}
        couponCode={checkoutCoupon}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Success & WhatsApp Forwarding Modal */}
      {lastCompletedOrder && (
        <OrderSuccessModal
          order={lastCompletedOrder}
          onClose={() => setLastCompletedOrder(null)}
        />
      )}

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
