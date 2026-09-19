import React, { useState, useEffect } from 'react';
import { QrCode, CreditCard, Landmark, Banknote, ShieldCheck, CheckCircle2, Lock, Smartphone, RefreshCw, AlertCircle } from 'lucide-react';
import { PaymentMethod } from '../types';
import { STORE_INFO } from '../data/storeInfo';

interface PaymentGatewayProps {
  amount: number;
  customerName: string;
  phone: string;
  onSuccess: (method: PaymentMethod, txnId: string) => void;
  onCancel: () => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  amount,
  customerName,
  phone,
  onSuccess,
  onCancel,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [upiId, setUpiId] = useState<string>('');
  const [upiMode, setUpiMode] = useState<'qr' | 'vpa'>('qr');
  const [qrTimer, setQrTimer] = useState<number>(300); // 5 min countdown

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState(customerName || '');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');

  // Countdown timer for QR
  useEffect(() => {
    const timer = setInterval(() => {
      setQrTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Card formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length > 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const handleProcessPayment = () => {
    if (selectedMethod === 'CARD') {
      if (cardNumber.replace(/\s/g, '').length < 15) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }
      if (cardExpiry.length < 5) {
        alert('Please enter a valid card expiry (MM/YY).');
        return;
      }
      if (cardCvv.length < 3) {
        alert('Please enter a valid CVV.');
        return;
      }
      setShowOtpModal(true);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fakeTxn = `PAY-${Math.floor(100000 + Math.random() * 900000)}`;
      onSuccess(selectedMethod, fakeTxn);
    }, 1800);
  };

  const handleVerifyOtp = () => {
    if (otpValue.trim() !== '123456' && otpValue.length < 4) {
      setOtpError('Please enter OTP: 123456 (or any 6 digits for testing)');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowOtpModal(false);
      const fakeTxn = `CARD-${Math.floor(100000 + Math.random() * 900000)}`;
      onSuccess('CARD', fakeTxn);
    }, 1500);
  };

  // UPI deep link
  const upiDeepLink = `upi://pay?pa=8839018919@upi&pn=Paji%20Shoes%20Durg&am=${amount}&cu=INR&tn=PajiShoesOrder`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-orange-100 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Security lock */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-orange-400 font-bold flex items-center gap-1">
                <span>Paji Shoes Secure Gateway</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded">
                  256-Bit SSL
                </span>
              </div>
              <h3 className="text-lg font-black text-white font-['Cabinet_Grotesk']">
                Choose Payment Method
              </h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Payable:</div>
            <div className="text-xl font-black text-orange-400">
              ₹{amount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
          {/* Method tabs */}
          <div className="md:col-span-5 bg-slate-50 border-r border-slate-200/80 p-3 space-y-2">
            <button
              onClick={() => setSelectedMethod('UPI')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all ${
                selectedMethod === 'UPI'
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <div>UPI / QR Code</div>
                <div className="text-[10px] font-medium text-slate-400">GPay, PhonePe, Paytm</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('CARD')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all ${
                selectedMethod === 'CARD'
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div>Debit / Credit Card</div>
                <div className="text-[10px] font-medium text-slate-400">Visa, Mastercard, RuPay</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('NETBANKING')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all ${
                selectedMethod === 'NETBANKING'
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <div>Net Banking</div>
                <div className="text-[10px] font-medium text-slate-400">SBI, HDFC, ICICI & more</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('COD')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all ${
                selectedMethod === 'COD'
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <div>Cash on Delivery</div>
                <div className="text-[10px] font-medium text-slate-400">Pay cash in Durg / CG</div>
              </div>
            </button>
          </div>

          {/* Method Content Panel */}
          <div className="md:col-span-7 p-5 flex flex-col justify-between">
            {/* UPI Option */}
            {selectedMethod === 'UPI' && (
              <div className="space-y-4">
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setUpiMode('qr')}
                    className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                      upiMode === 'qr' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Scan Dynamic QR
                  </button>
                  <button
                    onClick={() => setUpiMode('vpa')}
                    className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                      upiMode === 'vpa' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Enter UPI ID / VPA
                  </button>
                </div>

                {upiMode === 'qr' ? (
                  <div className="text-center space-y-3">
                    {/* Simulated High-Res UPI QR Code SVG */}
                    <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-orange-400 shadow-sm flex flex-col items-center justify-center">
                      <div className="w-full h-full bg-slate-950 p-2 rounded-xl flex items-center justify-center">
                        {/* High-contrast generated styled SVG QR */}
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="white">
                          <rect width="100" height="100" fill="#0f172a" />
                          {/* Corner Squares */}
                          <rect x="10" y="10" width="25" height="25" fill="white" rx="3" />
                          <rect x="14" y="14" width="17" height="17" fill="#0f172a" rx="2" />
                          <rect x="18" y="18" width="9" height="9" fill="#f97316" rx="1" />

                          <rect x="65" y="10" width="25" height="25" fill="white" rx="3" />
                          <rect x="69" y="14" width="17" height="17" fill="#0f172a" rx="2" />
                          <rect x="73" y="18" width="9" height="9" fill="#f97316" rx="1" />

                          <rect x="10" y="65" width="25" height="25" fill="white" rx="3" />
                          <rect x="14" y="69" width="17" height="17" fill="#0f172a" rx="2" />
                          <rect x="18" y="73" width="9" height="9" fill="#f97316" rx="1" />

                          {/* Data Pattern Nodes */}
                          <rect x="42" y="12" width="6" height="6" fill="white" />
                          <rect x="52" y="12" width="6" height="6" fill="#f97316" />
                          <rect x="42" y="24" width="6" height="6" fill="white" />
                          <rect x="52" y="24" width="6" height="6" fill="white" />
                          <rect x="42" y="36" width="16" height="6" fill="white" />

                          <rect x="12" y="42" width="6" height="16" fill="white" />
                          <rect x="24" y="42" width="12" height="6" fill="white" />
                          <rect x="24" y="52" width="6" height="6" fill="#f97316" />

                          <rect x="40" y="45" width="20" height="20" fill="white" rx="3" />
                          <rect x="44" y="49" width="12" height="12" fill="#ea580c" rx="2" />

                          <rect x="65" y="42" width="6" height="6" fill="white" />
                          <rect x="75" y="42" width="12" height="6" fill="white" />
                          <rect x="65" y="52" width="16" height="6" fill="white" />

                          <rect x="42" y="70" width="6" height="18" fill="white" />
                          <rect x="52" y="70" width="16" height="6" fill="white" />
                          <rect x="52" y="82" width="6" height="6" fill="#f97316" />
                          <rect x="65" y="70" width="20" height="18" fill="white" />
                        </svg>
                      </div>
                      <span className="absolute -bottom-2.5 bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        PAJI SHOES UPI
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      Scan using <strong>Google Pay, PhonePe, Paytm or BHIM</strong>
                    </div>

                    <div className="text-[11px] text-amber-700 bg-amber-50 py-1 px-3 rounded-full inline-flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> QR expires in {formatTime(qrTimer)}
                    </div>

                    {/* Quick mobile open link */}
                    <div className="pt-1">
                      <a
                        href={upiDeepLink}
                        className="text-xs font-bold text-orange-600 hover:underline inline-flex items-center gap-1"
                      >
                        <Smartphone className="w-3.5 h-3.5" /> Tap here to open UPI App directly on mobile
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 py-4">
                    <label className="text-xs font-bold text-slate-700 block">
                      Virtual Payment Address (VPA / UPI ID):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 8839018919@okaxis or name@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="flex gap-2">
                      {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map((suf) => (
                        <button
                          key={suf}
                          type="button"
                          onClick={() => setUpiId((prev) => prev.split('@')[0] + suf)}
                          className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2 py-1 rounded"
                        >
                          {suf}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      A payment request of ₹{amount} will be sent to your UPI app for approval.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Card Option */}
            {selectedMethod === 'CARD' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8919"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Name on Card</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Protected with 3D Secure OTP authentication.
                </p>
              </div>
            )}

            {/* NetBanking Option */}
            {selectedMethod === 'NETBANKING' && (
              <div className="space-y-3 text-xs">
                <label className="font-bold text-slate-700 block">Select Your Bank:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'sbi', name: 'State Bank of India' },
                    { id: 'hdfc', name: 'HDFC Bank' },
                    { id: 'icici', name: 'ICICI Bank' },
                    { id: 'axis', name: 'Axis Bank' },
                    { id: 'pnb', name: 'Punjab National Bank' },
                    { id: 'cg-gramin', name: 'Chhattisgarh Rajya Gramin' },
                  ].map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        selectedBank === bank.id
                          ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  You will be securely redirected to bank netbanking portal for authentication.
                </p>
              </div>
            )}

            {/* COD Option */}
            {selectedMethod === 'COD' && (
              <div className="space-y-3 bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl text-xs text-amber-950">
                <div className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-700" />
                  <span>Cash on Delivery in Durg & Chhattisgarh</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Pay directly via Cash or scan delivery agent's UPI QR code upon shoe arrival at your doorstep.
                </p>
                <ul className="space-y-1 text-slate-700 font-medium text-[11px]">
                  <li>✓ Open box verification allowed</li>
                  <li>✓ Exact change or UPI accepted on delivery</li>
                  <li>✓ Free 7-day size replacement guarantee</li>
                </ul>
              </div>
            )}

            {/* Bottom Pay Action & Cancel */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={isProcessing}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Back to Address
              </button>

              <button
                id="gateway-confirm-pay-btn"
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-black py-2.5 px-6 rounded-xl shadow-md shadow-orange-600/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Securely...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    {selectedMethod === 'COD'
                      ? 'Place Order (Cash on Delivery)'
                      : `Pay ₹${amount.toLocaleString('en-IN')}`}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="bg-slate-50 p-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Checkout for Paji Shoes • Durg, Chhattisgarh</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <span>NPCI UPI</span>
            <span>•</span>
            <span>VISA 3D SECURE</span>
            <span>•</span>
            <span>RUPAY</span>
          </div>
        </div>
      </div>

      {/* Simulated 3D Secure OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Bank 3D-Secure Verification</h4>
              <p className="text-xs text-slate-500">
                An OTP has been simulated and sent to {phone || 'your registered mobile'}.
              </p>
            </div>

            <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl text-xs text-center font-medium">
              Demo OTP: <strong className="font-bold">123456</strong>
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otpValue}
                onChange={(e) => {
                  setOtpValue(e.target.value);
                  setOtpError('');
                }}
                className="w-full text-center text-lg font-mono tracking-widest p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {otpError && <p className="text-xs text-rose-600 mt-1 text-center">{otpError}</p>}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Authorize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
