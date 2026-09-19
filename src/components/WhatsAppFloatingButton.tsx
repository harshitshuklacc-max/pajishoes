import React, { useState } from 'react';
import { MessageCircle, X, Phone, Send, Sparkles, MapPin } from 'lucide-react';
import { STORE_INFO, getGeneralWhatsAppUrl } from '../data/storeInfo';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = customQuery.trim() || 'Hello Paji Shoes Durg! I want to inquire about footwear.';
    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
      `Namaste Paji Shoes Durg! 🙏\n\n${query}\n\n📍 Inquiring for Durg / Chhattisgarh delivery or showroom pickup.`
    )}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomQuery('');
  };

  const quickMessages = [
    '👟 Show me latest sneakers in size UK 8/9',
    '🤵 Looking for formal leather wedding shoes',
    '📦 Is same day delivery available in Durg/Bhilai?',
    '📍 Share your exact showroom location in Durg',
  ];

  const handleQuickSend = (msg: string) => {
    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
      `Namaste Paji Shoes Durg! 🙏\n\n${msg}`
    )}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Quick Chat Bubble Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-92 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-emerald-600 rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Paji Shoes WhatsApp Desk</h4>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online • Phone: 8839018919</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 space-y-3 bg-slate-50 text-xs">
            {/* Store Greeting Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-slate-200/80 text-slate-800 space-y-1">
              <p className="font-semibold text-slate-900">
                Namaste! Welcome to Paji Shoes Durg. 🙏
              </p>
              <p className="text-[11px] text-slate-600">
                Need help finding your exact size, booking a pair for pickup, or placing a home delivery order? Chat with us directly on WhatsApp!
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Frequently Asked:
              </div>
              {quickMessages.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickSend(msg)}
                  className="w-full text-left bg-white hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 p-2 rounded-xl text-[11px] font-medium text-slate-700 transition-colors block"
                >
                  {msg}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form onSubmit={handleSendCustomMessage} className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your footwear inquiry..."
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Footer Contact bar */}
          <div className="bg-white px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-slate-600">
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>Call: 8839018919</span>
            </span>
            <span className="text-orange-600 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Station Rd, Durg
            </span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 hover:scale-105 active:scale-95"
        title="Chat on WhatsApp (8839018919)"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-black leading-tight">WhatsApp Booking</span>
          <span className="text-[10px] font-normal text-emerald-100">8839018919</span>
        </div>
      </button>
    </div>
  );
};
