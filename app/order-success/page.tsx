'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { CheckCircle, Package, Mail, Home } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Siparişiniz Alındı!
          </h1>
          
          {orderNumber && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6 inline-block">
              <p className="text-sm text-slate-600 mb-1">Sipariş Numaranız</p>
              <p className="text-2xl font-bold text-cyan-600">{orderNumber}</p>
            </div>
          )}

          <p className="text-lg text-slate-600 mb-8">
            Siparişiniz başarıyla alındı ve en kısa sürede işleme alınacaktır.
            <br />
            E-posta adresinize sipariş detaylarını gönderdik.
          </p>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-lg p-6 text-left">
              <Package size={32} className="text-cyan-600 mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Sipariş Durumu</h3>
              <p className="text-sm text-slate-600">
                Sipariş durumunuz hakkında size e-posta ile bilgi vereceğiz.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 text-left">
              <Mail size={32} className="text-cyan-600 mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">E-posta Bildirimi</h3>
              <p className="text-sm text-slate-600">
                Sipariş onay mailini kontrol edin. Spam klasörünü de kontrol etmeyi unutmayın.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <Home size={20} />
              <span>Ana Sayfaya Dön</span>
            </Link>
            <Link
              href="/#kategoriler"
              className="inline-flex items-center justify-center space-x-2 border-2 border-cyan-500 text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-all"
            >
              <Package size={20} />
              <span>Alışverişe Devam Et</span>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Sorularınız için:{' '}
              <a href="mailto:info@bsbilisim.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">
                info@bsbilisim.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-slate-600">Yükleniyor...</div>
        </div>
        <Footer />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
