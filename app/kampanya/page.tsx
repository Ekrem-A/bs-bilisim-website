'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Tag, TrendingDown, Percent, Loader2 } from 'lucide-react';
import { Product } from '@/types';

export default function KampanyaPage() {
  const { products, loading } = useProducts();
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<'discount' | 'price'>('discount');

  useEffect(() => {
    if (products && products.length > 0) {
      console.log('Tüm ürünler:', products.length);
      console.log('İlk ürün:', products[0]);
      
      // Kampanyalı ürünleri filtrele - sadece is_campaign true olanlar
      const campaignProducts = products.filter(product => {
        console.log(`Ürün: ${product.name}, is_campaign: ${product.is_campaign}`);
        
        // is_campaign alanı true olmalı
        if (!product.is_campaign) {
          return false;
        }
        
        // Eğer bitiş tarihi varsa ve geçmişse gösterme
        if (product.campaign_end_date) {
          const endDate = new Date(product.campaign_end_date);
          if (endDate < new Date()) {
            console.log(`Kampanya süresi dolmuş: ${product.name}`);
            return false;
          }
        }
        
        return true;
      });

      console.log('Kampanyalı ürünler:', campaignProducts.length);
      console.log('Kampanyalı ürünler:', campaignProducts);

      // Sıralama
      const sorted = [...campaignProducts].sort((a, b) => {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;
        
        if (sortBy === 'price') {
          return priceA - priceB;
        }
        // Discount sıralaması - önce indirim yüzdesi yüksek olanlar
        const discountA = a.discount_percentage || 0;
        const discountB = b.discount_percentage || 0;
        return discountB - discountA;
      });

      setDiscountedProducts(sorted);
    }
  }, [products, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-2 mb-6">
            <Tag className="text-red-400" size={20} />
            <span className="text-red-400 font-semibold">Kampanyalı Ürünler</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fırsat Ürünleri
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sınırlı süre ve stokta! İndirimli bilgisayar donanımları ve gaming ekipmanlarında 
            kaçırılmayacak fırsatlar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <TrendingDown className="text-red-400 mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-white mb-2">{discountedProducts.length}</div>
            <div className="text-gray-400">Kampanyalı Ürün</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
            <Percent className="text-purple-400 mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-white mb-2">%50</div>
            <div className="text-gray-400">İndirim Oranı</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
            <Tag className="text-blue-400 mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-white mb-2">Sınırlı</div>
            <div className="text-gray-400">Stok Durumu</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Sıralama:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'discount' | 'price')}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="discount">İndirim Oranına Göre</option>
              <option value="price">Fiyata Göre (Düşükten Yükseğe)</option>
            </select>
          </div>
          <div className="text-gray-400">
            Toplam <span className="text-white font-semibold">{discountedProducts.length}</span> kampanyalı ürün
          </div>
        </div>

        {/* Campaign Banner */}
        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/30 rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              🔥 Özel Kampanya!
            </h2>
            <p className="text-gray-300 mb-4">
              Seçili ürünlerde %50'ye varan indirimler. Stoklar tükenene kadar geçerli!
            </p>
            <div className="inline-block bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2">
              <span className="text-red-400 font-semibold">Kargo Bedava</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {discountedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <div key={product.id} className="relative pt-4">
                {/* Kampanya Badge - indirim yüzdesi varsa göster */}
                {product.discount_percentage && product.discount_percentage > 0 ? (
                  <div className="absolute top-0 right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg transform -translate-y-1/2">
                    %{product.discount_percentage} İNDİRİM
                  </div>
                ) : (
                  <div className="absolute top-0 right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform -translate-y-1/2">
                    KAMPANYA
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Tag className="text-gray-600 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Kampanyalı Ürün Bulunamadı</h3>
            <p className="text-gray-500">Şu anda aktif kampanya bulunmamaktadır.</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Kampanya Koşulları</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="font-semibold text-white mb-2">✓ Geçerlilik Süresi</h3>
              <p className="text-sm">Kampanya stoklar tükenene veya belirtilen süre sonuna kadar geçerlidir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">✓ Kargo</h3>
              <p className="text-sm">Kampanyalı ürünlerde kargo bedava. Aynı gün kargo seçeneği mevcuttur.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">✓ İade Garantisi</h3>
              <p className="text-sm">14 gün içinde iade hakkı. Ürün kutusu açılmamış olmalıdır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">✓ Garanti</h3>
              <p className="text-sm">Tüm ürünlerde resmi distribütör garantisi geçerlidir.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
