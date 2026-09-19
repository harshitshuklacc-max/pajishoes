import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Printer, ShoppingBag, MapPin, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { OrderDetails } from '../types';
import { STORE_INFO, getOrderWhatsAppUrl } from '../data/storeInfo';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EA580C', '#F97316', '#FBBF24', '#10B981'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const itemsSummary = order.items
    .map((it) => `• ${it.product.name} (Size: UK ${it.size}) x ${it.quantity}`)
    .join('\n');

  const fullAddress = `${order.streetAddress}, ${order.locality}, ${order.city}, ${order.state} - ${order.pincode}`;

  const whatsappUrl = getOrderWhatsAppUrl(
    order.orderId,
    order.customerName,
    order.totalAmount,
    itemsSummary,
    order.paymentMethod,
    fullAddress
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-orange-100 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Success Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black font-['Cabinet_Grotesk'] tracking-tight">
            Order Successfully Placed!
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Thank you for shopping with Paji Shoes, Durg!
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-mono font-bold">
            <span>Order ID: #{order.orderId}</span>
            <span>•</span>
            <span>Status: Confirmed</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Quick Notice to send WhatsApp */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">
                  Notify Paji Shoes Store on WhatsApp
                </h4>
                <p className="text-[11px] text-emerald-800">
                  Click below to send your order details to <strong>8839018919</strong> for priority packing and tracking!
                </p>
              </div>
            </div>
            <a
              id="success-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send to WhatsApp (8839018919)</span>
            </a>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>Delivery Address</span>
              </div>
              <p className="font-bold text-slate-800">{order.customerName}</p>
              <p className="text-slate-600">{order.streetAddress}</p>
              <p className="text-slate-600">{order.locality}</p>
              <p className="text-slate-800 font-semibold">
                {order.city}, {order.state} - {order.pincode}
              </p>
              <p className="text-slate-600 mt-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" /> {order.phone}
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Payment & Dispatch</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Payment Mode:</span>
                  <span className="font-bold text-slate-800">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="font-bold text-emerald-600">{order.paymentStatus}</span>
                </div>
                {order.transactionId && (
                  <div className="flex justify-between">
                    <span>Txn ID:</span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {order.transactionId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span>Estimated Delivery:</span>
                  <span className="font-bold text-orange-600">Within 24-48 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Products breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Items Ordered
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {order.items.map((it, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product.image}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{it.product.name}</div>
                      <div className="text-slate-500 text-[11px]">
                        Size: UK {it.size} • Color: {it.color} • Qty: {it.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900">
                    ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Total breakdown */}
            <div className="mt-3 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Paid</span>
                <span className="text-orange-600">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
