'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MapPin, Plus, Edit, Trash2, X } from 'lucide-react';

interface Address {
  id: string;
  title: string;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  district?: string;
  postal_code?: string;
  is_default: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    full_name: '',
    phone: '',
    address_line: '',
    city: '',
    district: '',
    postal_code: '',
    is_default: false,
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // If setting as default, unset other defaults
      if (formData.is_default) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }

      if (editingAddress) {
        // Update
        const { error } = await supabase
          .from('addresses')
          .update(formData)
          .eq('id', editingAddress.id);

        if (error) throw error;
        alert('Adres güncellendi!');
      } else {
        // Create
        const { error } = await supabase
          .from('addresses')
          .insert([{ ...formData, user_id: user.id }]);

        if (error) throw error;
        alert('Adres eklendi!');
      }

      setShowModal(false);
      setEditingAddress(null);
      resetForm();
      loadAddresses();
    } catch (error: any) {
      console.error('Error saving address:', error);
      alert('Hata: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu adresi silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Adres silindi!');
      loadAddresses();
    } catch (error: any) {
      console.error('Error deleting address:', error);
      alert('Hata: ' + error.message);
    }
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      full_name: address.full_name,
      phone: address.phone,
      address_line: address.address_line,
      city: address.city,
      district: address.district || '',
      postal_code: address.postal_code || '',
      is_default: address.is_default,
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingAddress(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      full_name: '',
      phone: '',
      address_line: '',
      city: '',
      district: '',
      postal_code: '',
      is_default: false,
    });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Adreslerim</h1>
          <p className="text-slate-600">Teslimat adreslerinizi yönetin</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          <span>Yeni Adres</span>
        </button>
      </div>

      {/* Addresses Grid */}
      {addresses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all relative"
            >
              {address.is_default && (
                <span className="absolute top-4 right-4 bg-cyan-500 text-white text-xs px-2 py-1 rounded font-medium">
                  Varsayılan
                </span>
              )}
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{address.title}</h3>
                <p className="text-sm text-slate-600">{address.full_name}</p>
              </div>

              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <p>{address.address_line}</p>
                <p>
                  {address.district && `${address.district}, `}
                  {address.city}
                  {address.postal_code && ` - ${address.postal_code}`}
                </p>
                <p>{address.phone}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(address)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit size={16} />
                  <span>Düzenle</span>
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Sil</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <MapPin size={64} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Henüz Kayıtlı Adres Yok</h3>
          <p className="text-slate-600 mb-6">Teslimat için adres ekleyin</p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            <span>İlk Adresini Ekle</span>
          </button>
        </div>
      )}

      {/* Address Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {editingAddress ? 'Adres Düzenle' : 'Yeni Adres Ekle'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Adres Başlığı *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ev, İş, vb."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0555 555 55 55"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Adres *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address_line}
                  onChange={(e) => setFormData({ ...formData, address_line: e.target.value })}
                  placeholder="Cadde, sokak, bina no, daire no"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">İl *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">İlçe</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Posta Kodu</label>
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_default}
                    onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                    className="w-4 h-4 text-cyan-500 rounded"
                  />
                  <span className="text-sm text-slate-700">Varsayılan adres olarak ayarla</span>
                </label>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  {editingAddress ? 'Güncelle' : 'Ekle'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border-2 border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-all"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
