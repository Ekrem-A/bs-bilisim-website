'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useCartStore } from '@/store/cartStore';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const [userAddress, setUserAddress] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);
    setIsCheckingAuth(false);
    
    if (user) {
      loadUserAddress();
    }
  };

  useEffect(() => {
    loadUserAddress();
  }, []);

  const loadUserAddress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Kullanıcının varsayılan adresini veya ilk adresini al
    const { data: addresses } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .limit(1);

    if (addresses && addresses.length > 0) {
      setUserAddress(addresses[0]);
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price.replace(/\./g, '').replace(',', '.'));
  };

  const handleCheckout = async () => {
    // Giriş kontrolü
    if (!isLoggedIn) {
      router.push('/login?redirect=/cart');
      return;
    }

    // WhatsApp mesajını hazırla
    let message = '🛒 *Yeni Sipariş Talebi*\n\n';
    
    // Kullanıcı bilgileri
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single();

      if (profile) {
        message += '*Müşteri Bilgileri:*\n';
        message += `Ad Soyad: ${profile.full_name || '-'}\n`;
        message += `Telefon: ${profile.phone || '-'}\n`;
        message += `E-posta: ${user.email || '-'}\n\n`;
      }
    }

    // Adres bilgileri
    if (userAddress) {
      message += '*Teslimat Adresi:*\n';
      message += `${userAddress.title}\n`;
      message += `${userAddress.address}\n`;
      message += `${userAddress.district}, ${userAddress.city}\n`;
      message += `${userAddress.postal_code || ''}\n\n`;
    }

    
    
    message += '*Ürünler:*\n';
    
    items.forEach((item, index) => {
      const itemTotal = formatPrice(item.product.price) * item.quantity;
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Marka: ${item.product.brand}\n`;
      message += `   Adet: ${item.quantity}\n`;
      message += `   Fiyat: ${itemTotal.toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} ₺\n\n`;
    });
    
    message += `*Toplam: ${getTotalPrice().toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ₺*\n\n`;
    message += 'Sipariş vermek istiyorum. 🙏';    
   
    const phoneNumber = '+905312480048'; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // WhatsApp'a yönlendir
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <ShoppingCart size={80} className="mx-auto text-slate-300 mb-6" />
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Sepetiniz Boş</h1>
            <p className="text-slate-600 mb-8">
              Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünlerimize göz atın.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <span>Alışverişe Başla</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Sepetim ({getTotalItems()} Ürün)</h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 md:col-span-2 sm:col-span-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-6"
              >
                {/* Product Image */}
                <div className="w-full sm:w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.product.image_urls && item.product.image_urls.length > 0 ? (
                    <img
                      src={item.product.image_urls[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <ShoppingCart size={40} className="text-slate-300" />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-cyan-600 font-semibold">{item.product.brand}</p>
                      <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
                        {item.product.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeItem(String(item.product.id))}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(Number(item.product.id), item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-semibold text-slate-800 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(Number(item.product.id), item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-600">
                        {(formatPrice(item.product.price) * item.quantity).toLocaleString('tr-TR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{' '}
                        ₺
                      </p>
                      <p className="text-sm text-slate-500">
                        {item.product.price} ₺ / adet
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Sipariş Özeti</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Ara Toplam</span>
                  <span className="font-semibold">
                    {getTotalPrice().toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    ₺
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Kargo</span>
                  <span className="font-semibold text-green-600">Ücretsiz</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-slate-800">
                    <span>Toplam</span>
                    <span className="text-cyan-600">
                      {getTotalPrice().toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      ₺
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingAuth}
                className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isLoggedIn
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                }`}
              >
                <span>{isLoggedIn ? 'WhatsApp ile Sipariş Ver' : 'Sipariş için Giriş Yapın'}</span>
                <ArrowRight size={20} />
              </button>

              {!isLoggedIn && (
                <p className="text-center text-sm text-slate-600 mt-3">
                  Sipariş verebilmek için giriş yapmanız gerekmektedir.
                </p>
              )}

              <Link
                href="/"
                className="block text-center text-cyan-600 hover:text-cyan-700 mt-4 transition-colors"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
