import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/storeInfo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon === 'PAJI10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'DURG150') {
    discount = Math.min(150, subtotal);
  }

  const deliveryFee = subtotal >= 999 || items.length === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'PAJI10') {
      setAppliedCoupon('PAJI10');
    } else if (code === 'DURG150') {
      if (subtotal < 1000) {
        setCouponError('DURG150 is valid on minimum orders of ₹1,000');
        return;
      }
      setAppliedCoupon('DURG150');
    } else {
      setCouponError('Invalid coupon. Try PAJI10 or DURG150');
    }
  };

  // Direct WhatsApp Cart booking link
  const generateWhatsAppCartLink = () => {
    const itemsList = items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.product.name}* (Size: UK ${it.size}, Color: ${it.color}) x ${it.quantity} = ₹${(it.product.price * it.quantity).toLocaleString('en-IN')}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `Namaste Paji Shoes Durg! 🙏\n\nI want to order items from my cart directly via WhatsApp:\n\n${itemsList}\n\n*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n*Estimated Total:* ₹${total.toLocaleString('en-IN')}\n\n📍 Delivery to: Durg, Chhattisgarh.\nPlease confirm availability and payment options!`
    );

    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-orange-100 flex items-center justify-between bg-orange-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-black text-slate-900 font-['Cabinet_Grotesk']">
                Your Shopping Bag
              </h2>
              <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-100/70 text-orange-600 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our trending sneakers, formals, sports, and mojaris from Paji Shoes Durg!
                </p>
                <button
                  onClick={onClose}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-3 bg-slate-50/70 border border-slate-200/70 p-3 rounded-2xl"
                  >
                    {/* Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-white shrink-0 border border-slate-100"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>Size: <strong>UK {item.size}</strong></span>
                          <span>•</span>
                          <span className="truncate max-w-[110px]">{item.color}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-black text-slate-900">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden text-xs">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Box */}
                <div className="bg-orange-50/50 border border-orange-200/60 p-3 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950 mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-orange-600" /> Apply Promo Code
                  </div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try PAJI10 or DURG150"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 text-xs px-3 py-1.5 rounded-xl border border-slate-200 uppercase bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button
                      type="submit"
                      className="bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-orange-700"
                    >
                      Apply
                    </button>
                  </form>
                  {appliedCoupon && (
                    <div className="mt-1.5 text-xs font-bold text-emerald-600 flex items-center justify-between">
                      <span>✓ Coupon '{appliedCoupon}' applied!</span>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-[11px] text-rose-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <div className="mt-1 text-xs text-rose-600">{couponError}</div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer with totals & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery in Durg/Chhattisgarh</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="text-orange-600">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Secure Checkout Proceed Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => onProceedToCheckout(discount, appliedCoupon || '')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-orange-600/25 transition-all active:scale-98"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant WhatsApp Order for Entire Bag */}
              <a
                id="cart-whatsapp-order-btn"
                href={generateWhatsAppCartLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Quick WhatsApp Order (8839018919)</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted & 100% Genuine Shoes</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
