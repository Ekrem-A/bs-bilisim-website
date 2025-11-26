'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Package, ChevronRight } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      pending: { label: 'Beklemede', class: 'bg-yellow-100 text-yellow-700' },
      processing: { label: 'İşleniyor', class: 'bg-blue-100 text-blue-700' },
      shipped: { label: 'Kargoya Verildi', class: 'bg-purple-100 text-purple-700' },
      delivered: { label: 'Teslim Edildi', class: 'bg-green-100 text-green-700' },
      cancelled: { label: 'İptal Edildi', class: 'bg-red-100 text-red-700' },
    };
    return badges[status] || badges.pending;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="text-slate-600 text-center">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Siparişlerim</h1>
        <p className="text-slate-600">Tüm siparişlerinizi görüntüleyin</p>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-bold text-slate-800 text-lg">#{order.order_number}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${badge.class}`}>
                        {badge.label}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Tarih:</span>
                        <span className="ml-2 text-slate-700 font-medium">
                          {new Date(order.created_at).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Müşteri:</span>
                        <span className="ml-2 text-slate-700 font-medium">{order.customer_name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Email:</span>
                        <span className="ml-2 text-slate-700">{order.customer_email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Toplam:</span>
                        <span className="ml-2 text-slate-800 font-bold">
                          {parseFloat(order.total_amount).toLocaleString('tr-TR')} ₺
                        </span>
                      </div>
                    </div>

                    {order.shipping_address && (
                      <div className="mt-3">
                        <span className="text-slate-500 text-sm">Teslimat Adresi:</span>
                        <p className="text-slate-700 text-sm mt-1">{order.shipping_address}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-2">
                    <button className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                      <span>Detaylar</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Package size={64} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Henüz Sipariş Yok</h3>
          <p className="text-slate-600 mb-6">İlk siparişinizi vererek alışverişe başlayın</p>
          <a
            href="/products/all"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Alışverişe Başla
          </a>
        </div>
      )}
    </div>
  );
}
