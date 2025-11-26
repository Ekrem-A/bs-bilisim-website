'use client';

import React from 'react';
import { ProductFilters } from '@/types';
import { Filter, X } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFilters;
  brands: string[];
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ProductFiltersComponent: React.FC<ProductFiltersProps> = ({
  filters,
  brands,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onClose
}) => {
  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleSortChange = (sortBy: ProductFilters['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleStockToggle = () => {
    onFiltersChange({ ...filters, inStock: !filters.inStock });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-80 lg:w-full
        bg-gradient-to-br from-gray-900 to-black lg:bg-transparent
        border-r lg:border-r-0 border-red-500/30
        overflow-y-auto
        transition-transform duration-300
        z-50 lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-red-400" />
              <h3 className="text-white font-black text-lg uppercase tracking-wide">Filtreler</h3>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Clear Filters */}
          <button
            onClick={onClearFilters}
            className="w-full text-red-400 hover:text-red-300 text-sm transition-colors font-bold uppercase tracking-wide"
          >
            Tüm Filtreleri Temizle
          </button>

          {/* Sort By */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wide text-sm">Sıralama</h4>
            <div className="space-y-2">
              {[
                { value: 'newest', label: 'En Yeniler' },
                { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
                { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
                { value: 'name', label: 'İsme Göre' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={() => handleSortChange(option.value as ProductFilters['sortBy'])}
                    className="w-4 h-4 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900"
                  />
                  <span className="text-gray-400 group-hover:text-white transition-colors font-medium">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Stock Filter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wide text-sm">Stok Durumu</h4>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={handleStockToggle}
                className="w-4 h-4 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900 rounded"
              />
              <span className="text-gray-400 group-hover:text-white transition-colors font-medium">
                Sadece Stokta Olanlar
              </span>
            </label>
          </div>

          {/* Brands Filter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wide text-sm">Markalar</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900 rounded"
                  />
                  <span className="text-gray-400 group-hover:text-white transition-colors font-medium">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFiltersComponent;
