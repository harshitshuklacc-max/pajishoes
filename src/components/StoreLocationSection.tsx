import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ShieldCheck, Footprints, Sparkles } from 'lucide-react';
import { STORE_INFO, getGeneralWhatsAppUrl } from '../data/storeInfo';

export const StoreLocationSection: React.FC = () => {
  return (
    <section id="store-location" className="py-12 bg-gradient-to-b from-white to-orange-50/50 border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-orange-950 rounded-3xl text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 text-orange-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Visit Our Showroom in Durg
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Cabinet_Grotesk'] text-white">
                Experience Perfect Footwear Fit at{' '}
                <span className="text-orange-400">Paji Shoes Durg</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Looking to try on shoes before buying? Walk into our showroom in Durg! Our staff is ready to help you discover the exact size, cushion support, and match for formal occasions or daily streetwear.
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Store Address
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      {STORE_INFO.address}, {STORE_INFO.landmark}
                    </div>
                    <div className="text-xs font-semibold text-orange-300 mt-0.5">
                      {STORE_INFO.city}, {STORE_INFO.state} - {STORE_INFO.pincode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Opening Hours
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">Open 7 Days a Week</div>
                    <div className="text-xs font-semibold text-amber-300 mt-0.5">
                      10:00 AM – 09:30 PM
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Phone Booking
                    </div>
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-xs font-bold text-white hover:underline mt-0.5 block"
                    >
                      {STORE_INFO.displayPhone}
                    </a>
                    <div className="text-[11px] text-slate-400">Available for calls & inquiries</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      WhatsApp Helpdesk
                    </div>
                    <div className="text-xs font-semibold text-emerald-300 mt-0.5">
                      +91 8839018919
                    </div>
                    <div className="text-[11px] text-slate-400">Send photo / ask size availability</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=Station+Road+Durg+Chhattisgarh+Shoes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions to Durg Store</span>
                </a>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full flex items-center gap-2 border border-white/20 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/15 space-y-4">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80"
                    alt="Paji Shoes Store Interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <div className="text-white font-bold text-sm">Paji Shoes Durg Showroom</div>
                      <div className="text-orange-200 text-xs">Station Road, Durg, Chhattisgarh</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Footprints className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>500+ Latest Footwear designs in stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free size replacement & 100% genuine guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Special festive discounts on Wedding & Party footwear</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
