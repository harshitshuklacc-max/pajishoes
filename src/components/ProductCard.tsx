import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, Heart, Star, Eye, Check } from 'lucide-react';
import { ShoeProduct } from '../types';
import { getProductWhatsAppUrl } from '../data/storeInfo';

interface ProductCardProps {
  product: ShoeProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: ShoeProduct) => void;
  onAddToCart: (product: ShoeProduct, size: number, color: string) => void;
  onQuickView: (product: ShoeProduct) => void;
  onDirectBuy: (product: ShoeProduct, size: number, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onDirectBuy,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleDirectBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDirectBuy(product, selectedSize, selectedColor);
  };

  const whatsappUrl = getProductWhatsAppUrl(
    product.name,
    selectedSize,
    selectedColor,
    product.price
  );

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-orange-100 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Top Image Container */}
      <div
        className="relative aspect-4/3 overflow-hidden bg-slate-50 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs tracking-wide uppercase">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-sm backdrop-blur-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="w-3.5 h-3.5 text-orange-600" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Gender */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-orange-600 uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
              {product.gender}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-base line-clamp-1 cursor-pointer hover:text-orange-600 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold ml-1 text-slate-800">{product.rating}</span>
            </div>
            <span className="text-slate-400">({product.reviewsCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-lg font-black text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {discountPercent}% OFF
            </span>
          </div>

          {/* Size Selector */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1.5">
              <span>Select Size (UK/IND):</span>
              <span className="text-orange-600 font-bold">Size {selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-7 h-7 text-xs font-bold rounded-md border transition-all ${
                      isSelected
                        ? 'bg-orange-600 border-orange-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-300'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
          {/* WhatsApp Direct Booking Button */}
          <a
            id={`whatsapp-book-${product.id}`}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-emerald-600/20 active:scale-98"
            title="Book this shoe instantly on WhatsApp (8839018919)"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Book on WhatsApp (8839018919)</span>
          </a>

          {/* Dual Action: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`add-to-cart-${product.id}`}
              onClick={handleAddToCart}
              className={`text-xs font-bold py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                isAdded
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-orange-600" /> Add to Cart
                </>
              )}
            </button>

            <button
              id={`buy-now-${product.id}`}
              onClick={handleDirectBuy}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2 px-2.5 rounded-xl shadow-xs transition-all active:scale-98"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
