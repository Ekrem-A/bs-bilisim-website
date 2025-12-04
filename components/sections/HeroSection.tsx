'use client';
  
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Fan } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  image_urls: string[];
  category_id: string;
}

const HeroSection = () => {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching featured product:', error);
          return;
        }

        if (data) {
          setFeaturedProduct(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFeaturedProduct();
  }, []);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black border-b border-cyan-500/30">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-[120px]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-lg shadow-cyan-500/50">
                TEKNOLOJİNİN GÜCÜ
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              OYUN VE İŞ İÇİN
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PROFESYONEL ÇÖZÜMLER
              </span>
            </h1>
            <p className="text-lg text-gray-300 font-medium leading-relaxed">
              En son teknoloji bilgisayar donanımları ve özel markaımız GorgonX ürünleriyle 
              performansınızı zirveye taşıyın.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products/all" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-black uppercase tracking-wide hover:shadow-xl hover:shadow-cyan-500/50 transition-all inline-block border border-cyan-400/50">
                ÜRÜNLERİ İNCELE
              </Link>
              <Link href="/gorgonx" className="border-2 border-cyan-500 text-cyan-400 px-8 py-3 rounded-lg font-black uppercase tracking-wide hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 transition-all inline-block">
                GORGONX HAKKINDA
              </Link>
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-[100px] opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20">
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-xl p-6 border border-cyan-500/30">
                <div className="w-full h-64 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center mb-4 border border-cyan-500/20">
                  {featuredProduct?.image_urls && featuredProduct.image_urls.length > 0 ? (
                    <img 
                      src={featuredProduct.image_urls[0]} 
                      alt={featuredProduct.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <Fan size={120} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
                  )}
                </div>
                <div className="space-y-2">
                  <span className="text-cyan-400 text-sm font-black uppercase tracking-wide">
                    {featuredProduct?.brand || 'GorgonX'}
                  </span>
                  <h3 className="text-white text-xl font-black uppercase">
                    {featuredProduct?.name || '240 ARGB WATER COOLED FAN'}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    {featuredProduct?.description || 'Yüksek performanslı sıvı soğutma sistemi'}
                  </p>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                      {featuredProduct?.price ? `${featuredProduct.price.toFixed(2)} ₺` : '2.499,00 ₺'}
                    </span>
                    <Link 
                      href={featuredProduct?.id ? `/products/all` : '/products/all'} 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-black uppercase hover:shadow-lg hover:shadow-cyan-500/50 transition-all inline-block border border-cyan-400/50"
                    >
                      İNCELE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
