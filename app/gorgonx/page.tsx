'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useProducts } from '@/hooks/useProducts';
import { Fan, Zap, Shield, Award, TrendingUp, Package, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function GorgonXPage() {
  const { products, loading } = useProducts();
  
  // Debug: GorgonX ürünlerini göster
  React.useEffect(() => {
    if (products && products.length > 0) {
      const gorgonxItems = products.filter(p => 
        p.category === 'gorgonx' || p.brand?.toLowerCase() === 'gorgonx'
      );
      console.log('GorgonX Ürünler:', gorgonxItems.map(p => ({
        name: p.name,
        description: p.description,
        price: p.price,
        image_urls: p.image_urls,
        inStock: p.inStock
      })));
    }
  }, [products]);
  
  // GorgonX kategorisindeki ürünleri filtrele (hem category hem brand kontrolü)
  const gorgonxProducts = products?.filter(p => 
    p.category === 'gorgonx' || p.brand?.toLowerCase() === 'gorgonx'
  ) || [];

  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Yüksek Performans',
      description: 'Son teknoloji ile üretilen ürünlerimiz, maksimum performans sağlar.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Dayanıklılık',
      description: 'Kaliteli malzemeler ve üstün mühendislikle uzun ömürlü kullanım.'
    },
    {
      icon: <Award size={32} />,
      title: 'Garanti',
      description: '2 yıl kapsamlı garanti ile güvenli alışveriş.'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'İnovasyon',
      description: 'Sürekli geliştirilen teknoloji ile sektörde lider konumda.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-slate-900 to-red-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-block mb-8 relative group">
              {/* Animated glow rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-red-500/30 via-transparent to-red-500/30 animate-[spin_8s_linear_infinite]"></div>
              
              <div className="relative flex items-center justify-center space-x-3 bg-gradient-to-br from-red-950/60 to-black/80 p-12 rounded-3xl border-2 border-red-500/50 backdrop-blur-md shadow-2xl shadow-red-500/30 transition-all duration-500 hover:border-red-400/70 hover:shadow-red-500/50 hover:scale-105 overflow-hidden">
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-40"></div>
                  <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-30 animation-delay-1000"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-50 animation-delay-2000"></div>
                </div>
                
                {/* Logo with enhanced effects */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Image 
                    src="/gorgonx.png" 
                    alt="GorgonX Logo" 
                    width={700} 
                    height={700}
                    className="relative drop-shadow-[0_0_60px_rgba(239,68,68,0.8)] brightness-110 contrast-125 transition-all duration-500 group-hover:drop-shadow-[0_0_80px_rgba(239,68,68,1)] group-hover:brightness-125 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Oyun dünyasında fark yaratan, yüksek performanslı bilgisayar donanım markası. 
              Gücünü hisset, rakiplerini geride bırak.
            </p>
            <div className="flex justify-center gap-4 pt-6">
              <a
                href="#products"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/50 text-lg"
              >
                Ürünleri İncele
              </a>
              <a
                href="#about"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 text-lg"
              >
                Hakkında
              </a>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">GorgonX Nedir?</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  GorgonX, oyun tutkunları ve profesyonel kullanıcılar için özel olarak tasarlanmış,
                  yüksek kaliteli bilgisayar donanım markasıdır. Sıvı soğutma sistemleri, fanlar,
                  kasalar ve daha fazlasıyla performansınızı zirveye taşıyoruz.
                </p>
                <p>
                  Ürünlerimiz Uluslararası standartlarda
                  kalite kontrolünden geçer. Her bir ürün, kullanıcı deneyimini ön planda tutarak
                  geliştirilmiştir.
                </p>
                <p className="font-semibold text-slate-800">
                  GorgonX ile oyun performansınızı ve sistem stabilitesini bir üst seviyeye çıkarın.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-slate-100 to-red-50 rounded-xl p-12 flex items-center justify-center">
              <div className="relative">
                <Fan size={200} className="text-red-600" />
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gradient-to-b from-transparent to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-800 text-center mb-4">
            GorgonX'in Avantajları
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Yüksek kalite standartları ve müşteri memnuniyeti odaklı üretim anlayışımızla fark yaratıyoruz.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-slate-200"
              >
                <div className="text-red-600 mb-4 bg-red-50 w-16 h-16 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-red-950 overflow-hidden">
        {/* Aggressive Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/30 rounded-full blur-[120px] animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-transparent to-red-500"></div>
                <Zap className="text-red-500 animate-pulse" size={40} />
                <div className="h-1 w-12 bg-gradient-to-l from-transparent to-red-500"></div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                CANAVARLARA LAYIK
              </span>
              <br />
              <span className="text-red-500">GÜÇLÜ ÜRÜNLER</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Her biri ayrı bir güç odağı. Sistemini domine et, rakiplerini ezici performansla alt et.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-red-500" size={64} />
            </div>
          ) : gorgonxProducts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {gorgonxProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.category}/${product.id}`}
                    className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Image Container */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                      {product.image_urls && product.image_urls.length > 0 ? (
                        <img
                          src={product.image_urls[0]}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package size={80} className="text-gray-700" />
                        </div>
                      )}
                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="mb-3 flex items-center gap-2 flex-wrap">
                        {product.brand && (
                          <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                            {product.brand}
                          </span>
                        )}
                        {product.inStock && (
                          <span className="inline-block px-3 py-1 bg-green-600/20 border border-green-500/50 rounded-full text-xs font-bold text-green-400 uppercase tracking-wider">
                            STOKTA
                          </span>
                        )}
                      </div>

                      {product.description && (
                        <p className="text-gray-400 mb-4 text-sm line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div>
                          <div className="text-3xl font-black text-red-500">
                            {product.price ? `${parseFloat(product.price).toLocaleString('tr-TR')} ₺` : 'Fiyat Yok'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-red-400 font-bold group-hover:gap-4 transition-all">
                          <span>KEŞFET</span>
                          <Zap size={20} className="group-hover:animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Animated Border Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-r from-red-500 via-transparent to-red-500 blur-sm"></div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/products/all?brand=GorgonX"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-12 py-5 rounded-xl font-black text-xl hover:shadow-2xl hover:shadow-red-500/60 transition-all hover:scale-105 border-2 border-red-500"
                >
                  <Zap size={24} />
                  TÜM GÜCÜ GÖR
                  <Zap size={24} />
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-12">
              {/* Placeholder Products */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 360mm Sıvı Soğutma */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Fan size={120} className="text-red-600 animate-spin-slow" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX 360mm Sıvı Soğutma
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Ekstrem performans için tasarlanmış RGB 360mm sıvı soğutma sistemi
                    </p>
                  </div>
                </div>

                {/* 240mm Sıvı Soğutma */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Fan size={100} className="text-red-500 animate-spin-slow" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX 240mm Sıvı Soğutma
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Kompakt ve güçlü, orta boy kasalar için mükemmel soğutma çözümü
                    </p>
                  </div>
                </div>

                {/* Akvaryum Kasa Siyah */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Package size={100} className="text-slate-800" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX Akvaryum Kasa - Siyah
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      360° şeffaf cam panelli, sistemini sergile
                    </p>
                  </div>
                </div>

                {/* Akvaryum Kasa Beyaz */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Package size={100} className="text-slate-300" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX Akvaryum Kasa - Beyaz
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Zarafet ve güç bir arada, beyaz tasarım
                    </p>
                  </div>
                </div>

                {/* Mesh Kasa */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Package size={100} className="text-gray-600" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX Mesh Kasa
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Maksimum hava akışı için mesh ön panel tasarım
                    </p>
                  </div>
                </div>

                {/* RGB Fan */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Fan size={100} className="text-red-400 animate-spin-slow" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX RGB Fan 120mm
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Sessiz ve güçlü, RGB aydınlatmalı yüksek performans fanı
                    </p>
                  </div>
                </div>

                {/* Power Supply 750W */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Zap size={100} className="text-yellow-500" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX Power Supply 750W
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      80+ Gold sertifikalı, modüler kablo yönetimi, yüksek verimlilik
                    </p>
                  </div>
                </div>

                {/* Power Supply 600W */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <Zap size={90} className="text-yellow-400" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      GorgonX Power Supply 600W
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                        STOKTA
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      80+ Bronze sertifikalı, güvenilir güç kaynağı, sessiz çalışma
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center pt-8">
                <Link
                  href="/products/all?brand=GorgonX"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-12 py-5 rounded-xl font-black text-xl hover:shadow-2xl hover:shadow-red-500/60 transition-all hover:scale-105 border-2 border-red-500"
                >
                  <Zap size={24} />
                  ALIŞVERİŞE BAŞLA
                  <Zap size={24} />
                </Link>
                <p className="text-gray-400 mt-4 text-sm">
                  Çok yakında stokta! Haberdar olmak için takipte kalın.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black via-slate-900 to-red-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image 
            src="/gorgonx.png" 
            alt="GorgonX Logo" 
            width={500} 
            height={500}
            className="mx-auto mb-2 drop-shadow-2xl"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            GorgonX ile Farkı Yaşayın
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Sınırlı stoklar tükenmeden sipariş verin, performansınızı zirveye taşıyın.
            Profesyonel oyuncuların tercihi GorgonX!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products/all?brand=GorgonX"
              className="bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/50"
            >
              Hemen Keşfet
            </Link>
            <a
              href="#products"
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Ürünleri İncele
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
