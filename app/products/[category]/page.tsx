'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ProductCard from '@/components/products/ProductCard';
import ProductFiltersComponent from '@/components/products/ProductFilters';
import useProducts from '@/hooks/useProducts';
import useCategories from '@/hooks/useCategories';
import { ProductFilters } from '@/types';
import { Filter, Grid, List, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = params.category as string;
  const brandParam = searchParams.get('brand'); // URL'den marka parametresini al
  
  // Supabase data
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const loading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>(categorySlug);

  // Get all products or filtered by category dropdown
  const allProducts = products ? products.filter(p => selectedCategoryFilter === 'all' ? true : p.category === selectedCategoryFilter) : [];

  // Get category info from DB
  const category = selectedCategoryFilter === 'all' 
    ? { name: 'Tüm Ürünler', slug: 'all', icon: '', color: '', description: 'Tüm ürünlerimizi buradan görüntüleyebilirsiniz.' }
    : categories ? categories.find(c => c.slug === selectedCategoryFilter) : undefined;

  const brands = React.useMemo(() => {
    return [...new Set(allProducts.map(p => p.brand))].sort();
  }, [allProducts]);

  // Filter state
  const [filters, setFilters] = useState<ProductFilters>({
    brands: brandParam ? [brandParam] : [], // URL'den gelen marka varsa otomatik seç
    priceRange: [0, 100000],
    inStock: false,
    sortBy: 'newest'
  });

  // URL'deki marka parametresi değiştiğinde filtreyi güncelle
  useEffect(() => {
    if (brandParam && !filters.brands.includes(brandParam)) {
      setFilters(prev => ({
        ...prev,
        brands: [brandParam]
      }));
    }
  }, [brandParam]);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }

    // Filter by stock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => parseFloat(a.price.replace(/\./g, '').replace(',', '.')) - parseFloat(b.price.replace(/\./g, '').replace(',', '.')));
        break;
      case 'price-desc':
        filtered.sort((a, b) => parseFloat(b.price.replace(/\./g, '').replace(',', '.')) - parseFloat(a.price.replace(/\./g, '').replace(',', '.')));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        break;
      case 'newest':
      default:
        // Keep original order (newest first)
        break;
    }

    return filtered;
  }, [allProducts, filters, selectedCategoryFilter]);

  const handleClearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 100000],
      inStock: false,
      sortBy: 'newest'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white text-2xl font-bold">Yükleniyor...</main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-red-400 text-xl font-bold">Hata: {String(error.message || error)}</main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-black text-white mb-6">Kategori Bulunamadı</h1>
          <Link href="/" className="text-red-400 hover:text-red-300 font-bold text-lg">
            Ana Sayfaya Dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-red-400 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight size={16} />
          <Link href="/#kategoriler" className="hover:text-red-400 transition-colors">
            Kategoriler
          </Link>
          <ChevronRight size={16} />
          <span className="text-white font-medium">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
              {category.name}
            </span>
          </h1>
          {category.description && (
            <p className="text-gray-300 text-lg mb-4">{category.description}</p>
          )}
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-red-500"></div>
            <span className="text-gray-400">
              <span className="font-bold text-2xl text-red-400">{filteredProducts.length}</span> ürün bulundu
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden w-full flex items-center justify-center space-x-2 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 text-white px-4 py-3 rounded-lg hover:border-red-500 transition-all font-bold mb-4"
            >
              <Filter size={20} />
              <span>FİLTRELER</span>
            </button>

            {/* Category Filter - First */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border-2 border-gray-800 mb-4">
              <h4 className="text-white font-black mb-3 uppercase tracking-wide text-sm">Kategori</h4>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-bold cursor-pointer hover:border-red-500/50 transition-all appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ef4444'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5rem 1.5rem',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="all" className="bg-gray-900 text-white font-bold py-2">Tüm Kategoriler</option>
                {(categories || []).map((cat) => (
                  <option key={cat.slug} value={cat.slug} className="bg-gray-900 text-white font-bold py-2">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filters Component */}
            <ProductFiltersComponent
              filters={filters}
              brands={brands}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
              isOpen={filtersOpen}
              onClose={() => setFiltersOpen(false)}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-6 bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border-2 border-gray-800">
              <div className="text-gray-300">
                {filters.brands.length > 0 && (
                  <span>
                    Seçili markalar: <span className="text-red-400 font-bold">{filters.brands.join(', ')}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30'
                      : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-red-500'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30'
                      : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-red-500'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-800">
                <div className="text-gray-300 text-xl mb-6 font-bold">
                  Filtrelere uygun ürün bulunamadı
                </div>
                <button
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all font-bold"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
