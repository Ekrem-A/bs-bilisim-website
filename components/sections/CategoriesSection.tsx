"use client";

import React from 'react';
import Link from 'next/link';
import { Cpu, MonitorStop, Fan, HardDrive, MemoryStick, Zap, Droplet, Keyboard, Mouse, CircuitBoard } from 'lucide-react';
import useCategories from '@/hooks/useCategories';

const iconMap = {
  'cpu': Cpu,
  'monitor': MonitorStop,
  'motherboard': CircuitBoard,
  'fan': Fan,
  'hard-drive': HardDrive,
  'memory-stick': MemoryStick,
  'zap': Zap,
  'droplet': Droplet,
  'keyboard': Keyboard,
  'mouse': Mouse,
};

const CategoriesSection = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <section id="kategoriler" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 text-cyan-400 font-bold">Yükleniyor...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="kategoriler" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 text-red-400 font-bold">Hata: {String(error.message || error)}</div>
      </section>
    );
  }

  return (
    <section id="kategoriler" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">ÜRÜN KATEGORİLERİ</h2>
          <p className="text-gray-400 font-medium">İhtiyacınız olan tüm donanımlar bir arada</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(categories || []).map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || MonitorStop;
            return (
              <Link
                key={index}
                href={`/products/${category.slug}`}
                className="group bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-xl shadow-blue-500/30">
                  <Icon size={40} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-center group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
