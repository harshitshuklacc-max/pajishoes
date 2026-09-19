import React from 'react';
import { MessageCircle, ShoppingBag, MapPin, Phone, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { STORE_INFO, getGeneralWhatsAppUrl } from '../data/storeInfo';

interface HeroBannerProps {
  onScrollToCatalog: () => void;
  onOpenStoreInfo: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onScrollToCatalog,
  onOpenStoreInfo,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 text-white pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Circles */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-orange-950/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-orange-300/30 text-xs sm:text-sm font-semibold text-orange-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Durg's No. 1 Trusted Footwear Store • Chhattisgarh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] font-['Cabinet_Grotesk'] text-white">
              Step In Style with <br />
              <span className="text-amber-200 underline decoration-orange-300/60 decoration-wavy decoration-2">
                Paji Shoes Durg
              </span>
            </h1>

            <p className="text-sm sm:text-base text-orange-50/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore the latest street sneakers, formal leather brogues, running trainers, and royal wedding mojaris. Order online with secure payment or book instantly on WhatsApp directly to our Durg store!
            </p>

            {/* Quick Contact & Address Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl max-w-md mx-auto lg:mx-0 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-orange-200 font-bold">Call & Order Direct</div>
                  <a href={`tel:${STORE_INFO.phone}`} className="text-base font-bold text-white hover:underline">
                    {STORE_INFO.displayPhone}
                  </a>
                </div>
              </div>
              <div className="text-right border-l border-white/20 pl-3">
                <div className="text-[11px] uppercase tracking-wider text-orange-200 font-bold">Location</div>
                <div className="text-xs font-semibold text-white">Station Rd, Durg</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                id="hero-shop-btn"
                onClick={onScrollToCatalog}
                className="px-6 py-3 rounded-full bg-white text-orange-600 hover:bg-orange-50 font-bold text-sm sm:text-base shadow-lg shadow-orange-950/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-orange-600" />
                <span>Shop Shoe Collection</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Book on WhatsApp</span>
              </a>

              <button
                onClick={onOpenStoreInfo}
                className="px-4 py-3 rounded-full bg-orange-700/60 hover:bg-orange-700 text-white font-semibold text-sm border border-orange-400/40 transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Store Location</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Featured Shoe */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/20 shadow-2xl">
              {/* Product Highlight Tag */}
              <div className="absolute top-7 left-7 z-20 bg-orange-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                🔥 Top Selling in Durg
              </div>

              {/* Shoe Image Box */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-white/20 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                  alt="Paji Apex Street Turbo Sneaker"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-orange-200">Apex Street Turbo</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold">₹2,499</span>
                    <span className="text-xs line-through text-orange-300">₹4,499 (44% Off)</span>
                  </div>
                </div>
              </div>

              {/* Bottom reviews teaser */}
              <div className="mt-4 flex items-center justify-between text-xs text-orange-100 px-1">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                    ))}
                  </div>
                  <span className="font-bold text-white ml-1">4.9/5</span>
                  <span className="text-orange-200">(1,200+ Durg customers)</span>
                </div>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Original
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pill Grid */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="w-9 h-9 rounded-lg bg-orange-400/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Fast Local Delivery</div>
              <div className="text-[11px] text-orange-100">Same-day in Durg & Bhilai</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="w-9 h-9 rounded-lg bg-emerald-400/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">WhatsApp Booking</div>
              <div className="text-[11px] text-orange-100">Instant direct response</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="w-9 h-9 rounded-lg bg-orange-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Secure Gateway</div>
              <div className="text-[11px] text-orange-100">UPI, Cards, NetBanking, COD</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="w-9 h-9 rounded-lg bg-orange-400/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">7 Days Size Exchange</div>
              <div className="text-[11px] text-orange-100">Hassle-free guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
