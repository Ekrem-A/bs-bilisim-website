import React, { useState } from 'react';
import { Product } from '@/types';
import { ShoppingCart, Star, Package, Check, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-slate-700/30 hover:border-red-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/20">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Image Container */}
      <Link href={`/products/${product.category.toLowerCase()}/${product.id}`}>
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 h-64 flex items-center justify-center overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors duration-300"></div>
          
          {!product.inStock && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 border border-red-500">
              STOKTA YOK
            </div>
          )}
          {product.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1">
              <Zap size={12} />
              ÖNE ÇIKAN
            </div>
          )}
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
              İNDİRİMLİ
            </div>
          )}
          
          {/* Product Image or Placeholder */}
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Package size={100} className="text-gray-700 group-hover:text-red-500/50 transition-colors duration-300" />
          )}
          
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/30 to-transparent"></div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6 space-y-3 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        
        {/* Brand */}
        <span className="text-red-400 text-sm font-bold uppercase tracking-wide">{product.brand}</span>
        
        {/* Product Name */}
        <Link href={`/products/${product.category.toLowerCase()}/${product.id}`}>
          <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-red-400 transition-colors cursor-pointer min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
              ))}
            </div>
            <span className="text-gray-400 text-xs">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through">{product.originalPrice} ₺</span>
            )}
            <span className="text-2xl font-black text-red-400">{product.price} ₺</span>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className={`p-3 rounded-lg transition-all font-bold ${
              product.inStock 
                ? justAdded 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/50' 
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
            }`}
            disabled={!product.inStock}
          >
            {justAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-red-600/20 text-red-400 rounded-full border border-red-500/50 font-semibold uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 blur-sm"></div>
      </div>
    </div>
  );
};

export default ProductCard;
