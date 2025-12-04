
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Package, Plus, Edit, Trash2, Search, Upload, X } from 'lucide-react';
import { BRANDS } from '@/constants/brands';

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category_id: string;
  price: number;
  original_price?: number;
  description?: string;
  image_urls?: string[];
  in_stock: boolean;
  stock_quantity: number;
  rating?: number;
  review_count?: number;
  specs?: any;
  tags?: string[];
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface SpecTemplate {
  id: string;
  category_id: string;
  key: string;
  label: string;
  input_type: 'text' | 'number' | 'select' | 'boolean';
  unit?: string;
  options?: string[];
  sort_order: number;
}

interface TagTemplate {
  id: string;
  category_id: string;
  tag: string;
  sort_order: number;
}

// Slug oluşturucu
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminProductsPage() {
    
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: '',
    category_id: '',
    price: 0,
    stock_quantity: 0,
    in_stock: true,
    featured: false,
    image_urls: [],
    specs: {},
    tags: [],
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [specTemplates, setSpecTemplates] = useState<SpecTemplate[]>([]);
  const [tagTemplates, setTagTemplates] = useState<TagTemplate[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadTemplates = async (categoryId: string) => {
    try {
      // Load spec templates
      const { data: specs, error: specsError } = await supabase
        .from('product_spec_templates')
        .select('*')
        .eq('category_id', categoryId)
        .order('sort_order');

      if (specsError) throw specsError;
      setSpecTemplates(specs || []);

      // Load tag templates
      const { data: tags, error: tagsError } = await supabase
        .from('product_tag_templates')
        .select('*')
        .eq('category_id', categoryId)
        .order('sort_order');

      if (tagsError) throw tagsError;
      setTagTemplates(tags || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData({ ...formData, category_id: categoryId, specs: {}, tags: [] });
    setSelectedTags([]);
    if (categoryId) {
      loadTemplates(categoryId);
    } else {
      setSpecTemplates([]);
      setTagTemplates([]);
    }
  };

  const handleSpecChange = (key: string, value: any, label: string) => {
    const currentSpecs = formData.specs || {};
    setFormData({ ...formData, specs: { ...currentSpecs, [key]: value } });
  };

  const toggleTag = (tag: string) => {
    const currentTags = selectedTags || [];
    if (currentTags.includes(tag)) {
      setSelectedTags(currentTags.filter(t => t !== tag));
      setFormData({ ...formData, tags: currentTags.filter(t => t !== tag) });
    } else {
      setSelectedTags([...currentTags, tag]);
      setFormData({ ...formData, tags: [...currentTags, tag] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Slug'ı otomatik oluştur
    const slug = formData.name ? generateSlug(formData.name) : '';
    const submitData = { ...formData, slug };

    try {
      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(submitData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        alert('Ürün güncellendi!');
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([submitData]);

        if (error) throw error;
        alert('Ürün eklendi!');
      }

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      loadProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert('Hata: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Ürün silindi!');
      loadProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      alert('Hata: ' + error.message);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setSelectedTags(product.tags || []);
    if (product.category_id) {
      loadTemplates(product.category_id);
    }
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      category_id: '',
      price: 0,
      stock_quantity: 0,
      in_stock: true,
      featured: false,
      image_urls: [],
      specs: {},
      tags: [],
    });
    setNewImageUrl('');
    setSpecTemplates([]);
    setTagTemplates([]);
    setSelectedTags([]);
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      const currentUrls = formData.image_urls || [];
      setFormData({ ...formData, image_urls: [...currentUrls, newImageUrl.trim()] });
      setNewImageUrl('');
    }
  };

  const removeImageUrl = (index: number) => {
    const currentUrls = formData.image_urls || [];
    setFormData({ ...formData, image_urls: currentUrls.filter((_, i) => i !== index) });
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Ürün Yönetimi</h1>
          <p className="text-slate-600">{products.length} ürün</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          <span>Yeni Ürün</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ürün veya marka ara..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Ürün</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Marka</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Fiyat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stok</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Durum</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {product.image_urls && product.image_urls.length > 0 ? (
                        <img 
                          src={product.image_urls[0]} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded" 
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center">
                          <Package size={20} className="text-slate-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-slate-800">{product.name}</div>
                        {product.featured && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Öne Çıkan</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{product.brand}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{product.price.toLocaleString('tr-TR')} ₺</div>
                    {product.original_price && (
                      <div className="text-sm text-slate-400 line-through">
                        {product.original_price.toLocaleString('tr-TR')} ₺
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{product.stock_quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.in_stock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.in_stock ? 'Stokta' : 'Tükendi'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ürün Adı *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Marka *</label>
                <select
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Marka Seç</option>
                  {BRANDS.map((brand) => (
                    <option key={brand.name} value={brand.name}>{brand.name}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategori *</label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Kategori Seç</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Price & Original Price */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fiyat *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Eski Fiyat</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.original_price || ''}
                    onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) || undefined })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Stok Miktarı *</label>
                <input
                  type="number"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Image URLs */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ürün Görselleri</label>
                <div className="space-y-3">
                  {/* Mevcut görseller */}
                  {formData.image_urls && formData.image_urls.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {formData.image_urls.map((url, index) => (
                        <div key={index} className="relative group border-2 border-slate-200 rounded-lg p-2">
                          <img 
                            src={url} 
                            alt={`Görsel ${index + 1}`} 
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImageUrl(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                          <div className="text-xs text-slate-500 mt-1 truncate">
                            Görsel {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Yeni görsel ekleme */}
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      placeholder="Görsel URL'si ekleyin (https://...)"
                    />
                    <button
                      type="button"
                      onClick={addImageUrl}
                      className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus size={18} />
                      <span>Ekle</span>
                    </button>
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    💡 İpucu: Birden fazla görsel ekleyebilirsiniz. İlk görsel ön kapak olarak kullanılır.
                  </p>
                </div>
              </div>

              {/* Teknik Özellikler (Specs) - Dinamik */}
              {specTemplates.length > 0 && (
                <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">📋 Teknik Özellikler</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {specTemplates.map((template) => (
                      <div key={template.id}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {template.label}
                          {template.unit && <span className="text-slate-500 ml-1">({template.unit})</span>}
                        </label>
                        
                        {template.input_type === 'text' && (
                          <input
                            type="text"
                            value={formData.specs?.[template.key] || ''}
                            onChange={(e) => handleSpecChange(template.key, e.target.value, template.label)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"
                          />
                        )}
                        
                        {template.input_type === 'number' && (
                          <input
                            type="number"
                            value={formData.specs?.[template.key] || ''}
                            onChange={(e) => handleSpecChange(template.key, e.target.value, template.label)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"
                          />
                        )}
                        
                        {template.input_type === 'select' && (
                          <select
                            value={formData.specs?.[template.key] || ''}
                            onChange={(e) => handleSpecChange(template.key, e.target.value, template.label)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"
                          >
                            <option value="">Seçiniz</option>
                            {template.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                        
                        {template.input_type === 'boolean' && (
                          <label className="flex items-center space-x-2 mt-2">
                            <input
                              type="checkbox"
                              checked={formData.specs?.[template.key] === true || formData.specs?.[template.key] === 'true'}
                              onChange={(e) => handleSpecChange(template.key, e.target.checked, template.label)}
                              className="w-4 h-4 text-cyan-500 rounded"
                            />
                            <span className="text-sm text-slate-700">Var</span>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Etiketler (Tags) - Dinamik */}
              {tagTemplates.length > 0 && (
                <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">🏷️ Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {tagTemplates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => toggleTag(template.tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedTags.includes(template.tag)
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-green-500'
                        }`}
                      >
                        {template.tag}
                      </button>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-sm text-slate-600">
                        Seçili: <span className="font-bold">{selectedTags.join(', ')}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.in_stock}
                    onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                    className="w-4 h-4 text-cyan-500 rounded"
                  />
                  <span className="text-sm text-slate-700">Stokta Var</span>
                </label>
                
                <div className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 text-yellow-500 rounded mt-0.5"
                    />
                    <div>
                      <span className="text-sm font-bold text-slate-800 block mb-1">⭐ Öne Çıkan Ürün (Featured)</span>
                      <span className="text-xs text-slate-600">Bu ürün ana sayfadaki "Öne Çıkan Ürünler" bölümünde görünecektir</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  {editingProduct ? 'Güncelle' : 'Ekle'}
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
