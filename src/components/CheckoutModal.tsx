import React, { useState } from 'react';
import { X, MapPin, Phone, User, ShieldCheck, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { CartItem, OrderDetails, PaymentMethod } from '../types';
import { STORE_INFO, getOrderWhatsAppUrl } from '../data/storeInfo';
import { PaymentGateway } from './PaymentGateway';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  couponCode: string;
  onOrderCompleted: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  couponCode,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Durg');
  const [state, setState] = useState('Chhattisgarh');
  const [pincode, setPincode] = useState('491001');
  const [notes, setNotes] = useState('');
  const [whatsappNotify, setWhatsappNotify] = useState(true);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isPaymentStep, setIsPaymentStep] = useState(false);

  const subtotal = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const deliveryFee = subtotal >= 999 || items.length === 0 ? 0 : 99;
  const totalAmount = Math.max(0, subtotal - discount + deliveryFee);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!customerName.trim()) errors.customerName = 'Please enter your name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!streetAddress.trim()) errors.streetAddress = 'Please enter street address / house no.';
    if (!locality.trim()) errors.locality = 'Please enter area / colony / landmark';
    if (!pincode.trim() || pincode.length < 6) errors.pincode = 'Valid 6-digit pincode required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsPaymentStep(true);
    }
  };

  const handlePaymentSuccess = (method: PaymentMethod, txnId: string) => {
    const orderId = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId,
      customerName,
      phone,
      alternatePhone,
      streetAddress,
      locality,
      city,
      state,
      pincode,
      notes,
      items,
      subtotal,
      discount,
      deliveryFee,
      totalAmount,
      paymentMethod: method,
      paymentStatus: method === 'COD' ? 'PENDING' : 'PAID',
      transactionId: txnId,
      createdAt: new Date().toISOString(),
    };

    setIsPaymentStep(false);
    onOrderCompleted(newOrder);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        <div
          className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-orange-100 overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black">
                PS
              </div>
              <div>
                <h3 className="text-lg font-black font-['Cabinet_Grotesk']">
                  Express Checkout • Paji Shoes
                </h3>
                <p className="text-xs text-orange-100">
                  Doorstep Delivery to Durg, Bhilai & all across Chhattisgarh
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left Column: Delivery Form */}
            <div className="md:col-span-7 p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>Shipping Address in Chhattisgarh</span>
              </div>

              <form onSubmit={handleProceedToPayment} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Customer Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
                        formErrors.customerName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                  </div>
                  {formErrors.customerName && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.customerName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number (for Delivery & WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Alternate Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Alternate contact"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Flat, House No., Building *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. House No. 42, Ward 15"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      formErrors.streetAddress ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                  {formErrors.streetAddress && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.streetAddress}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Area, Colony, Landmark *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Padmanabhpur / Mohan Nagar / Near Railway Station"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${
                      formErrors.locality ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                  {formErrors.locality && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.locality}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      readOnly
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${
                        formErrors.pincode ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery, deliver in evening"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* WhatsApp Order Update Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={whatsappNotify}
                    onChange={(e) => setWhatsappNotify(e.target.checked)}
                    className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                  />
                  <span className="text-xs text-slate-700 flex items-center gap-1 font-medium">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Receive order confirmation & live tracking on WhatsApp
                  </span>
                </label>

                {/* Button to proceed */}
                <button
                  type="submit"
                  id="checkout-to-payment-btn"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 transition-all active:scale-98"
                >
                  <span>Continue to Secure Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 bg-orange-50/40 p-6 border-l border-orange-100 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-orange-800 mb-3">
                  Order Summary ({items.length} items)
                </h4>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-orange-100/80 shadow-2xs"
                    >
                      <img
                        src={it.product.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {it.product.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          UK {it.size} • Qty: {it.quantity}
                        </div>
                      </div>
                      <div className="text-xs font-black text-slate-800 shrink-0">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-4 pt-3 border-t border-orange-200/60 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-800">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({couponCode})</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery (Durg-Bhilai)</span>
                    <span className="font-bold text-slate-800">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-orange-200">
                    <span>Total Amount</span>
                    <span className="text-orange-600">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Trust Box */}
              <div className="mt-6 bg-white p-3 rounded-xl border border-orange-100 text-[11px] text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Paji Shoes Durg Store Guarantee</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  All shoes undergo strict quality check at our Durg showroom prior to packing.
                  Questions? Call <strong>{STORE_INFO.displayPhone}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal Layer */}
      {isPaymentStep && (
        <PaymentGateway
          amount={totalAmount}
          customerName={customerName}
          phone={phone}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setIsPaymentStep(false)}
        />
      )}
    </>
  );
};
