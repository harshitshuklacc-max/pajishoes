import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO, getGeneralWhatsAppUrl } from '../data/storeInfo';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenStoreInfo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenStoreInfo }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-orange-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-black text-white font-['Cabinet_Grotesk'] text-lg">
                PS
              </div>
              <div>
                <span className="text-xl font-black text-white font-['Cabinet_Grotesk']">
                  PAJI <span className="text-orange-500">SHOES</span>
                </span>
                <p className="text-[11px] text-orange-400 font-bold uppercase tracking-wider">
                  Durg, Chhattisgarh
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Paji Shoes is Durg's premier footwear destination, curating top-grade sports runners, high-street sneakers, genuine leather formals, and authentic wedding mojaris for Chhattisgarh footwear lovers.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Call Us:</span>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="font-bold text-white hover:text-orange-400 transition-colors"
                >
                  {STORE_INFO.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp:</span>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-300 hover:underline"
                >
                  +91 8839018919
                </a>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  {STORE_INFO.address}, {STORE_INFO.landmark}, {STORE_INFO.city}, {STORE_INFO.state} - {STORE_INFO.pincode}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Cabinet_Grotesk']">
              Shoe Collections
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                'Sneakers',
                'Sports & Running',
                'Formal & Office',
                'Ethnic & Mojari',
                'Casual & Loafers',
                'Boots',
                'Sandals & Slippers',
              ].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    • {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Store & Customer Assistance */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Cabinet_Grotesk']">
              Store Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenStoreInfo} className="hover:text-orange-400">
                  Durg Showroom Visit
                </button>
              </li>
              <li>
                <a href={getGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
                  WhatsApp Size Help
                </a>
              </li>
              <li>
                <span className="text-slate-300">Free Exchange: 7 Days</span>
              </li>
              <li>
                <span className="text-slate-300">Local Delivery: Durg & Bhilai</span>
              </li>
              <li>
                <span className="text-slate-300">Open 7 Days: 10AM - 9:30PM</span>
              </li>
            </ul>
          </div>

          {/* Payment & Trust */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Cabinet_Grotesk']">
              Secure Checkout & Delivery
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We support direct instant UPI payment via Google Pay, PhonePe, Paytm, BHIM, credit/debit cards, and Cash on Delivery in Durg.
            </p>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl space-y-2 text-xs">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Secure Transaction</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-orange-400 font-bold">
                <span className="bg-slate-800 px-2 py-0.5 rounded">UPI 2.0</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">GPAY</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">PHONEPE</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">RUPAY</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">VISA</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">COD</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-1">
              Store Helpline: <strong className="text-orange-300">8839018919</strong>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Paji Shoes • Durg, Chhattisgarh. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> for footwear lovers in Durg & Chhattisgarh.
          </p>
        </div>
      </div>
    </footer>
  );
};
