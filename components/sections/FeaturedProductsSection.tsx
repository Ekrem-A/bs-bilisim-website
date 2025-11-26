"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Fan } from 'lucide-react';
import useProducts from '@/hooks/useProducts';

const FeaturedProductsSection = () => {
  const { products, loading, error } = useProducts();

  const featured = React.useMemo(() => {
    return (products || []).filter((p) => !!p.featured).slice(0, 8);
  }, [products]);

  if (loading) {
    return (
      <section id="urunler" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 text-cyan-400 font-bold">Yükleniyor...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="urunler" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 text-red-400 font-bold">Hata: {String(error.message || error)}</div>
      </section>
    );
  }

  return (
    <section id="urunler" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">ÖNE ÇIKAN ÜRÜNLER</h2>
            <p className="text-gray-400 font-medium">En popüler ve yeni ürünlerimiz</p>
          </div>
          <button className="hidden md:flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-black uppercase tracking-wide">
            TÜMÜNÜ GÖR <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="group bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
            >
              <div className="relative bg-gradient-to-br from-black to-gray-900 h-64 flex items-center justify-center border-b border-cyan-500/20">
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide shadow-lg shadow-cyan-500/50">
                    ÖNE ÇIKAN
                  </div>
                )}
                <Fan size={80} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-cyan-400 text-sm font-black uppercase tracking-wide">{product.brand}</span>
                <h3 className="text-white font-bold line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 font-medium">{product.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">{product.price} ₺</span>
                  <Link href={`/products/${product.category}/${product.id}`} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-black uppercase hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm border border-cyan-400/50">
                    İNCELE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
