'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShoppingBag, Search, Eye, X, Package } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: string;
  total_amount: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  order_notes?: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: string;
  total_price: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (error) throw error;
      setOrderItems(data || []);
    } catch (error) {
      console.error('Error loading order items:', error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      alert('Sipariş durumu güncellendi!');
      loadOrders();
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert('Hata: ' + error.message);
    }
  };

  const openOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    await loadOrderItems(order.id);
    setShowModal(true);
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Sipariş Yönetimi</h1>
        <p className="text-slate-600">{orders.length} sipariş</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
          <div className="text-sm text-slate-600">Toplam Sipariş</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-slate-600">Bekleyen</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
          <div className="text-sm text-slate-600">İşleniyor</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
          <div className="text-sm text-slate-600">Teslim Edildi</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sipariş no, müşteri adı veya email ara..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            Bekleyen
          </button>
          <button
            onClick={() => setFilterStatus('processing')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'processing'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            İşleniyor
          </button>
          <button
            onClick={() => setFilterStatus('shipped')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'shipped'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            Kargoda
          </button>
          <button
            onClick={() => setFilterStatus('delivered')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'delivered'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Teslim Edildi
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Sipariş No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Müşteri</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tutar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Durum</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">#{order.order_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{order.customer_name}</div>
                      <div className="text-sm text-slate-500">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(order.created_at).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {parseFloat(order.total_amount).toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded text-sm font-medium cursor-pointer ${badge.class}`}
                      >
                        <option value="pending">Beklemede</option>
                        <option value="processing">İşleniyor</option>
                        <option value="shipped">Kargoya Verildi</option>
                        <option value="delivered">Teslim Edildi</option>
                        <option value="cancelled">İptal Edildi</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="inline-flex items-center space-x-1 text-cyan-600 hover:text-cyan-700 font-medium"
                      >
                        <Eye size={18} />
                        <span>Detay</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Sipariş Detayı</h2>
                <p className="text-sm text-slate-600">#{selectedOrder.order_number}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sipariş Durumu</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="pending">Beklemede</option>
                  <option value="processing">İşleniyor</option>
                  <option value="shipped">Kargoya Verildi</option>
                  <option value="delivered">Teslim Edildi</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </div>

              {/* Customer Info */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Müşteri Bilgileri</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-500">Ad:</span> <span className="text-slate-800 font-medium">{selectedOrder.customer_name}</span></div>
                  <div><span className="text-slate-500">Email:</span> <span className="text-slate-800">{selectedOrder.customer_email}</span></div>
                  {selectedOrder.customer_phone && (
                    <div><span className="text-slate-500">Telefon:</span> <span className="text-slate-800">{selectedOrder.customer_phone}</span></div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Teslimat Adresi</h3>
                <p className="text-slate-700">{selectedOrder.shipping_address}</p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Sipariş Kalemleri</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-600">Ürün</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-slate-600">Adet</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-slate-600">Birim Fiyat</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-slate-600">Toplam</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {orderItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-slate-800">{item.product_name}</td>
                          <td className="px-4 py-3 text-center text-slate-600">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-slate-600">
                            {parseFloat(item.unit_price).toLocaleString('tr-TR')} ₺
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-800">
                            {parseFloat(item.total_price).toLocaleString('tr-TR')} ₺
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t-2 border-slate-300">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right font-semibold text-slate-800">Toplam:</td>
                        <td className="px-4 py-3 text-right font-bold text-slate-800 text-lg">
                          {parseFloat(selectedOrder.total_amount).toLocaleString('tr-TR')} ₺
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Order Notes */}
              {selectedOrder.order_notes && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Sipariş Notu</h3>
                  <p className="text-slate-700">{selectedOrder.order_notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
