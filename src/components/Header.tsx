import React from 'react';
import { ShoppingBag, Heart, Phone, MessageCircle, Search, MapPin, Sparkles, X } from 'lucide-react';
import { STORE_INFO, getGeneralWhatsAppUrl } from '../data/storeInfo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenStoreInfo: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  'All Shoes',
  'Sneakers',
  'Sports & Running',
  'Formal & Office',
  'Ethnic & Mojari',
  'Casual & Loafers',
  'Boots',
  'Sandals & Slippers',
];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenStoreInfo,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-orange-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-200" /> Durg, CG
            </span>
            <span className="hidden sm:inline">
              Welcome to Paji Shoes Durg! Free delivery in Durg & Bhilai on orders over ₹999.
            </span>
            <span className="sm:hidden">Paji Shoes • Durg, Chhattisgarh</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center gap-1 hover:underline font-semibold"
              title="Call store"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_INFO.displayPhone}</span>
            </a>
            <span className="opacity-40">|</span>
            <button
              onClick={onOpenStoreInfo}
              className="flex items-center gap-1 hover:text-amber-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Visit Showroom</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter font-['Cabinet_Grotesk']">PS</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-['Cabinet_Grotesk']">
                  PAJI <span className="text-orange-600">SHOES</span>
                </span>
              </div>
              <p className="text-[11px] font-semibold text-orange-700 tracking-wide uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-500" /> Durg, Chhattisgarh
              </p>
            </div>
          </a>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="desktop-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sneakers, formals, sports, mojari..."
              className="w-full pl-10 pr-9 py-2 rounded-full border border-orange-200 bg-orange-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Header button */}
          <a
            id="header-whatsapp-btn"
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full shadow-xs transition-all hover:shadow-emerald-600/20 active:scale-95"
            title="Book on WhatsApp (8839018919)"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp Booking</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {/* Wishlist */}
          <button
            id="header-wishlist-btn"
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-950 px-3.5 py-2 rounded-full border border-orange-200/80 transition-all active:scale-95"
            title="View Cart & Checkout"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold hidden sm:inline text-orange-900">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search input */}
      <div className="md:hidden px-4 pb-2.5">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="mobile-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search shoes by name or category..."
            className="w-full pl-10 pr-9 py-2 rounded-full border border-orange-200 bg-orange-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Scroll Strip */}
      <div className="border-t border-orange-100/80 bg-orange-50/30 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 whitespace-nowrap">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-xs shadow-orange-600/20 scale-102'
                    : 'text-slate-600 hover:text-orange-700 hover:bg-orange-100/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
