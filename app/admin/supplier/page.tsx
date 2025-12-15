'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, FileText, Download, RefreshCw, AlertCircle, CheckCircle, Package, Globe, Key, Clock } from 'lucide-react';

interface ImportResult {
  imported: number;
  errors: number;
  details: {
    products: any[];
    errors: any[];
  };
  sync?: {
    supplier: string;
    synced_at: string;
    next_sync: string;
  };
}

export default function SupplierImportPage() {
  const [activeTab, setActiveTab] = useState<'xml' | 'api'>('xml');
  
  // XML Import States
  const [xmlText, setXmlText] = useState('');
  const [xmlUrl, setXmlUrl] = useState('');
  
  // API Sync States
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [syncInterval, setSyncInterval] = useState<'manual' | 'hourly' | 'daily'>('manual');
  
  // Common States
  const [supplierName, setSupplierName] = useState('Örnek Toptancı');
  const [priceMarkup, setPriceMarkup] = useState(15);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryMapping, setCategoryMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Kategori yükleme hatası:', error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setXmlText(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleFetchFromUrl = async () => {
    if (!xmlUrl) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(xmlUrl);
      if (!response.ok) throw new Error('XML feed çekilemedi');

      const text = await response.text();
      setXmlText(text);
      setError('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!xmlText || !supplierName) {
      setError('XML içeriği ve toptancı adı gerekli');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/admin/supplier/import-xml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          xmlText,
          supplierName,
          categoryMapping,
          priceMarkup,
          autoPublish: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Import başarısız');
      }

      setResult(data);
      setXmlText('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApiSync = async () => {
    if (!apiUrl || !supplierName) {
      setError('API URL ve toptancı adı gerekli');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/admin/supplier/sync-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          apiUrl,
          apiKey,
          supplierName,
          priceMarkup,
          autoPublish: true,
          syncInterval,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API sync başarısız');
      }

      setResult(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Package size={28} />
          Toptancı Ürün İthalatı
        </h1>
        <p className="text-slate-600 mt-1">XML feed veya API ile toplu ürün ekleyin</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-1 flex gap-1">
        <button
          onClick={() => setActiveTab('xml')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'xml'
              ? 'bg-cyan-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText size={18} />
          XML İçe Aktarma
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'api'
              ? 'bg-cyan-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Globe size={18} />
          API Entegrasyonu
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800">Hata</h3>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Success Result */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">İmport Başarılı!</h3>
              <div className="text-sm text-green-700 mt-2 space-y-1">
                <p>✓ {result.imported} ürün başarıyla eklendi/güncellendi</p>
                {result.errors > 0 && (
                  <p className="text-orange-600">⚠ {result.errors} ürün hata aldı</p>
                )}
                {result.sync && (
                  <p className="text-blue-600">🔄 Sonraki senkronizasyon: {result.sync.next_sync}</p>
                )}
              </div>

              {result.details.errors.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-green-700 hover:text-green-800">
                    Hatalı ürünleri göster ({result.details.errors.length})
                  </summary>
                  <div className="mt-2 space-y-1 text-xs text-red-600 bg-white p-2 rounded border border-red-200 max-h-40 overflow-y-auto">
                    {result.details.errors.map((err: any, idx: number) => (
                      <div key={idx}>
                        <strong>{err.product}:</strong> {err.error}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-bold text-slate-800">İmport Ayarları</h2>

        {/* Supplier Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Toptancı Adı *
          </label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="Örn: ABC Toptancı"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Price Markup */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fiyat Markup (%)
          </label>
          <input
            type="number"
            value={priceMarkup}
            onChange={(e) => setPriceMarkup(Number(e.target.value))}
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <p className="text-xs text-slate-500 mt-1">
            Toptancı fiyatına eklenecek kar marjı
          </p>
        </div>
      </div>

      {/* XML Import Tab */}
      {activeTab === 'xml' && (
        <>
          {/* XML Input Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-800">XML Kaynağı</h2>

        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            XML Feed URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={xmlUrl}
              onChange={(e) => setXmlUrl(e.target.value)}
              placeholder="https://example.com/feed.xml"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button
              onClick={handleFetchFromUrl}
              disabled={loading || !xmlUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Download size={18} />
              Çek
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="text-sm text-slate-500">VEYA</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            XML Dosyası Yükle
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
            <input
              type="file"
              accept=".xml,text/xml,application/xml"
              onChange={handleFileUpload}
              className="hidden"
              id="xml-file"
            />
            <label htmlFor="xml-file" className="cursor-pointer">
              <Upload size={32} className="mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-600">
                Dosya seçmek için tıklayın veya sürükleyin
              </p>
              <p className="text-xs text-slate-500 mt-1">.xml dosyası</p>
            </label>
          </div>
        </div>

        {/* XML Preview */}
        {xmlText && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              XML İçeriği Önizleme
            </label>
            <textarea
              value={xmlText.substring(0, 500) + '...'}
              readOnly
              className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-xs h-32 bg-slate-50"
            />
            <p className="text-xs text-slate-500 mt-1">
              {xmlText.length} karakter yüklendi
            </p>
          </div>
        )}
          </div>

          {/* Import Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setXmlText('');
                setXmlUrl('');
                setResult(null);
                setError('');
              }}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Temizle
            </button>
            <button
              onClick={handleImport}
              disabled={loading || !xmlText || !supplierName}
              className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  İşleniyor...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Ürünleri İçe Aktar
                </>
              )}
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">💡 XML Format Bilgisi</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>Desteklenen XML tag'leri:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li><code>&lt;product&gt;</code> veya <code>&lt;item&gt;</code> - Ürün</li>
                <li><code>&lt;name&gt;</code> - Ürün adı (zorunlu)</li>
                <li><code>&lt;price&gt;</code> - Fiyat (zorunlu)</li>
                <li><code>&lt;sku&gt;</code> - Ürün kodu (zorunlu)</li>
                <li><code>&lt;brand&gt;</code> - Marka</li>
                <li><code>&lt;stock&gt;</code> - Stok</li>
                <li><code>&lt;category&gt;</code> - Kategori</li>
                <li><code>&lt;image&gt;</code> - Görsel URL</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* API Integration Tab */}
      {activeTab === 'api' && (
        <>
          {/* API Configuration Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-800">API Ayarları</h2>

            {/* API URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                API Endpoint URL *
              </label>
              <input
                type="url"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.toptanci.com/v1/products"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Toptancınızın sağladığı ürün listesi API URL'si
              </p>
            </div>

            {/* API Key */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Key size={16} />
                API Anahtarı (Opsiyonel)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Bearer token veya API key"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                API erişimi için gerekiyorsa token girin
              </p>
            </div>

            {/* Sync Interval */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Clock size={16} />
                Otomatik Senkronizasyon
              </label>
              <select
                value={syncInterval}
                onChange={(e) => setSyncInterval(e.target.value as any)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="manual">Manuel (Sadece butona basınca)</option>
                <option value="hourly">Her Saat</option>
                <option value="daily">Her Gün (03:00)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Ürünlerin ne sıklıkla güncelleneceğini seçin
              </p>
            </div>
          </div>

          {/* Sync Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setApiUrl('');
                setApiKey('');
                setResult(null);
                setError('');
              }}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Temizle
            </button>
            <button
              onClick={handleApiSync}
              disabled={loading || !apiUrl || !supplierName}
              className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Senkronize Ediliyor...
                </>
              ) : (
                <>
                  <Globe size={18} />
                  API ile Senkronize Et
                </>
              )}
            </button>
          </div>

          {/* API Info Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">🔗 Desteklenen API Formatları</h3>
            <div className="text-sm text-purple-700 space-y-2">
              <p>API response şu formatlarda olabilir:</p>
              <div className="bg-white p-3 rounded border border-purple-200 font-mono text-xs space-y-2">
                <div>
                  <code>{"{ products: [...] }"}</code> veya
                </div>
                <div>
                  <code>{"{ data: [...] }"}</code> veya
                </div>
                <div>
                  <code>{"[...]"}</code> (direkt array)
                </div>
              </div>
              <p className="mt-3">Her ürün objesi şu alanları içerebilir:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li><code>sku/id</code> - Ürün kodu (zorunlu)</li>
                <li><code>name/title</code> - Ürün adı (zorunlu)</li>
                <li><code>price/sale_price</code> - Fiyat (zorunlu)</li>
                <li><code>brand/manufacturer</code> - Marka</li>
                <li><code>stock/quantity</code> - Stok</li>
                <li><code>category</code> - Kategori</li>
                <li><code>image/image_url</code> - Görsel URL</li>
                <li><code>description</code> - Açıklama</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
