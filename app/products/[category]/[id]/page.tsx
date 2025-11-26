'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Star, ChevronRight, Check, ZoomIn, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const categorySlug = params.category as string;

  const { products, loading } = useProducts();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = products?.find(p => String(p.id) === String(productId));

  // Ürün görselleri - image_urls varsa kullan, yoksa image_url'den al
  const productImages = product?.image_urls && product.image_urls.length > 0
    ? product.image_urls
    : product?.image_url 
      ? [product.image_url]
      : [];

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-white text-2xl font-bold">Yükleniyor...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-black text-white mb-6">Ürün Bulunamadı</h1>
          <Link href="/products/all" className="text-red-400 hover:text-red-300 font-bold text-lg">
            Ürünlere Dön
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-red-400 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight size={16} />
          <Link href={`/products/${categorySlug}`} className="hover:text-red-400 transition-colors">
            {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
          </Link>
          <ChevronRight size={16} />
          <span className="text-white font-medium line-clamp-1">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-800 p-6">
              <div 
                className="relative aspect-square bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer"
                onClick={() => setIsZoomed(true)}
              >
                {productImages.length > 0 ? (
                  <img
                    src={productImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <Package size={200} className="text-gray-700" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-red-500/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-red-500/50">
                    <ZoomIn size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? 'border-red-500 shadow-lg shadow-red-500/30'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-red-400 text-sm font-bold uppercase tracking-wide">{product.brand}</span>
              <h1 className="text-3xl md:text-4xl font-black text-white mt-2">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.rating!)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-300">({product.reviewCount} değerlendirme)</span>
              </div>
            )}

            {/* Price */}
            <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500/30 rounded-2xl p-6">
              {product.originalPrice && (
                <span className="text-gray-400 text-xl line-through block mb-2">
                  {product.originalPrice} ₺
                </span>
              )}
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black text-red-400">{product.price} ₺</span>
                {product.originalPrice && (
                  <span className="text-green-400 font-bold text-lg bg-green-500/20 px-3 py-1 rounded-full">
                    %
                    {Math.round(
                      ((parseFloat(product.originalPrice.replace(/\./g, '').replace(',', '.')) -
                        parseFloat(product.price.replace(/\./g, '').replace(',', '.'))) /
                        parseFloat(product.originalPrice.replace(/\./g, '').replace(',', '.'))) *
                        100
                    )}{' '}
                    İNDİRİM
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}
              ></div>
              <span className={`font-bold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? 'STOKTA VAR' : 'STOKTA YOK'}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Adet</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg bg-gray-800 border-2 border-gray-700 text-white font-bold flex items-center justify-center hover:bg-gray-700 hover:border-red-500 transition-all"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 h-12 text-center bg-gray-800 border-2 border-gray-700 text-white font-bold rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg bg-gray-800 border-2 border-gray-700 text-white font-bold flex items-center justify-center hover:bg-gray-700 hover:border-red-500 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-xl font-black text-xl transition-all flex items-center justify-center space-x-3 ${
                  product.inStock
                    ? justAdded
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                      : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 border-2 border-red-500'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed border-2 border-gray-700'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={28} />
                    <span>SEPETE EKLENİŞ</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={28} />
                    <span>SEPETE EKLE</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-800 p-6">
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Ürün Açıklaması</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
              </div>
            )}

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-800 p-6">
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Teknik Özellikler</h2>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-800 pb-3">
                      <span className="text-gray-400 font-semibold">{key}</span>
                      <span className="text-white font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-red-600/20 text-red-400 rounded-full border border-red-500/50 text-sm font-bold uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zoom Modal */}
        {isZoomed && productImages.length > 0 && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="max-w-5xl w-full">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-auto max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              {productImages.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        selectedImageIndex === index ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
