'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Package, ShoppingBag, Heart, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AccountDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalFavorites: 0,
    savedAddresses: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get total orders
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get pending orders
      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .in('status', ['pending', 'processing']);

      // Get recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalOrders: totalOrders || 0,
        pendingOrders: pendingOrders || 0,
        totalFavorites: 0, // TODO: implement favorites
        savedAddresses: 0, // TODO: implement addresses
      });

      setRecentOrders(orders || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: ShoppingBag,
      label: 'Toplam Sipariş',
      value: stats.totalOrders,
      color: 'from-blue-500 to-cyan-500',
      href: '/account/orders',
    },
    {
      icon: Package,
      label: 'Bekleyen Sipariş',
      value: stats.pendingOrders,
      color: 'from-orange-500 to-red-500',
      href: '/account/orders',
    },
    {
      icon: Heart,
      label: 'Favorilerim',
      value: stats.totalFavorites,
      color: 'from-pink-500 to-rose-500',
      href: '/account/favorites',
    },
    {
      icon: MapPin,
      label: 'Kayıtlı Adres',
      value: stats.savedAddresses,
      color: 'from-green-500 to-emerald-500',
      href: '/account/addresses',
    },
  ];

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
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Pano</h1>
        <p className="text-slate-600">Hesap bilgilerinize genel bakış</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              href={stat.href}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all hover:border-cyan-400"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Son Siparişler</h2>
          <Link href="/account/orders" className="text-cyan-600 hover:text-cyan-700 text-sm font-medium">
            Tümünü Gör →
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const badge = getStatusBadge(order.status);
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-cyan-400 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-slate-800">#{order.order_number}</span>
                      <span className={`text-xs px-2 py-1 rounded ${badge.class}`}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {new Date(order.created_at).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">{parseFloat(order.total_amount).toLocaleString('tr-TR')} ₺</p>
                    <Link
                      href={`/account/orders`}
                      className="text-sm text-cyan-600 hover:text-cyan-700"
                    >
                      Detaylar
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 mb-4">Henüz siparişiniz yok</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Alışverişe Başla
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Hesap Bilgilerim</h3>
          <p className="text-slate-600 text-sm mb-4">
            Kişisel bilgilerinizi ve iletişim tercihlerinizi güncelleyin.
          </p>
          <Link
            href="/account/details"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Bilgileri Düzenle
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Teslimat Adreslerim</h3>
          <p className="text-slate-600 text-sm mb-4">
            Teslimat adreslerinizi yönetin ve yeni adres ekleyin.
          </p>
          <Link
            href="/account/addresses"
            className="inline-block border-2 border-cyan-500 text-cyan-600 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-50 transition-all"
          >
            Adresleri Yönet
          </Link>
        </div>
      </div>
    </div>
  );
}
