import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Tag } from 'lucide-react';
import { ShoeProduct } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: ShoeProduct[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (p: ShoeProduct) => void;
  onAddToCart: (p: ShoeProduct, size: number, color: string) => void;
  onQuickView: (p: ShoeProduct) => void;
  onDirectBuy: (p: ShoeProduct, size: number, color: string) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';
type GenderOption = 'All' | 'Men' | 'Women' | 'Unisex';

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onDirectBuy,
}) => {
  const [selectedGender, setSelectedGender] = useState<GenderOption>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<string>('All');

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Shoes') {
      list = list.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q)
      );
    }

    // Gender
    if (selectedGender !== 'All') {
      list = list.filter((p) => p.gender === selectedGender || p.gender === 'Unisex');
    }

    // In Stock
    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }

    // Badge filter
    if (selectedBadge !== 'All') {
      list = list.filter((p) => p.badge === selectedBadge);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, searchQuery, selectedGender, onlyInStock, selectedBadge, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All Shoes' ||
    searchQuery.trim() !== '' ||
    selectedGender !== 'All' ||
    onlyInStock ||
    selectedBadge !== 'All' ||
    sortBy !== 'featured';

  const clearAllFilters = () => {
    onSelectCategory('All Shoes');
    onSearchChange('');
    setSelectedGender('All');
    setSortBy('featured');
    setOnlyInStock(false);
    setSelectedBadge('All');
  };

  return (
    <section id="product-catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full mb-2">
            <Tag className="w-3.5 h-3.5" /> Handpicked Footwear in Durg
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Cabinet_Grotesk']">
            {selectedCategory === 'All Shoes' ? 'Our Complete Shoe Collection' : selectedCategory}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Showing {filteredProducts.length} shoe models available at Paji Shoes, Durg
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Gender Filter Pills */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(['All', 'Men', 'Women', 'Unisex'] as GenderOption[]).map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedGender === gender
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer text-slate-800"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Badge Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        <span className="text-xs font-bold text-slate-500 shrink-0">Tags:</span>
        {['All', 'Best Seller', 'Trending', 'Hot Deal', 'Flat 40% Off', 'New Arrival'].map((badge) => (
          <button
            key={badge}
            onClick={() => setSelectedBadge(badge)}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
              selectedBadge === badge
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-orange-300'
            }`}
          >
            {badge}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onDirectBuy={onDirectBuy}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-orange-100 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No shoes found matching filters</h3>
          <p className="text-sm text-slate-500 mb-6">
            Try adjusting your search keywords, category, or clear filters to see all available footwear.
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-xs"
          >
            Show All Shoes
          </button>
        </div>
      )}
    </section>
  );
};
