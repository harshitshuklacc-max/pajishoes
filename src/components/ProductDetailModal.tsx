import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Heart, Star, ShieldCheck, Truck, RotateCcw, Check, Phone, Info } from 'lucide-react';
import { ShoeProduct } from '../types';
import { STORE_INFO, getProductWhatsAppUrl } from '../data/storeInfo';

interface ProductDetailModalProps {
  product: ShoeProduct | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: ShoeProduct) => void;
  onAddToCart: (p: ShoeProduct, size: number, color: string) => void;
  onDirectBuy: (p: ShoeProduct, size: number, color: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onDirectBuy,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState(false);

  const allImages = [product.image, ...(product.secondaryImages || [])];
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleBuy = () => {
    onDirectBuy(product, selectedSize, selectedColor);
  };

  const whatsappUrl = getProductWhatsAppUrl(
    product.name,
    selectedSize,
    selectedColor,
    product.price
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-orange-100 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 shadow-md backdrop-blur-xs transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-6 bg-slate-50 flex flex-col justify-between">
            <div>
              {/* Main Image */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-200">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === img ? 'border-orange-600 ring-2 ring-orange-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Store guarantee pill */}
            <div className="mt-6 bg-orange-50/70 border border-orange-200/60 rounded-xl p-3 text-xs text-orange-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-orange-800">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Paji Shoes Durg Authenticity Assurance</span>
              </div>
              <p className="text-[11px] text-orange-950/80 leading-relaxed">
                Available at our Durg showroom (Station Road). Try before you buy or get it delivered to your doorstep in Durg, Bhilai, Raipur and across Chhattisgarh.
              </p>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100/60 px-2.5 py-1 rounded-md">
                  {product.category} • {product.gender}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-slate-900 tracking-tight font-['Cabinet_Grotesk']">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-base text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Save {discountPercent}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Inclusive of all taxes. Free express delivery in Durg & Bhilai.</p>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Color Shade:</span>
                    <span className="text-orange-600">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          selectedColor === c.name
                            ? 'border-orange-600 bg-orange-50 text-orange-900'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Shoe Size (UK / India):</span>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-orange-600 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    <Info className="w-3 h-3" /> Size Chart Guide
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                          isSelected
                            ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Size Chart Drawer Toggle */}
                {showSizeChart && (
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600">
                    <div className="font-bold text-slate-800 mb-1.5">Indian/UK Size Conversion:</div>
                    <div className="grid grid-cols-4 gap-1 text-center font-medium">
                      <div className="bg-white p-1 rounded border border-slate-100 font-bold">UK/IND 6 = 25 cm</div>
                      <div className="bg-white p-1 rounded border border-slate-100 font-bold">UK/IND 7 = 25.8 cm</div>
                      <div className="bg-white p-1 rounded border border-slate-100 font-bold">UK/IND 8 = 26.7 cm</div>
                      <div className="bg-white p-1 rounded border border-slate-100 font-bold">UK/IND 9 = 27.5 cm</div>
                    </div>
                    <div className="mt-1.5 text-[10px] text-slate-500">
                      Standard Indian sizing. If unsure, WhatsApp us at 8839018919 and our staff will guide you with foot measurement!
                    </div>
                  </div>
                )}
              </div>

              {/* Key Features bullet points */}
              {product.features && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-800 mb-1.5">Highlights:</div>
                  <ul className="space-y-1">
                    {product.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions Stack */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              {/* WhatsApp Booking CTA */}
              <a
                id="modal-whatsapp-booking-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Instant WhatsApp Booking (Size {selectedSize})</span>
              </a>

              {/* Dual: Add to Cart & Buy Now */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm border flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-orange-600" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuy}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                >
                  Buy Now & Checkout
                </button>
              </div>

              {/* Call Shop Button */}
              <div className="text-center pt-1">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="text-xs text-slate-500 hover:text-orange-600 inline-flex items-center gap-1 font-medium"
                >
                  <Phone className="w-3.5 h-3.5" /> Have questions? Call store: {STORE_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
