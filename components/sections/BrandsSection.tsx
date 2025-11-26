import React from 'react';
import { BRANDS } from '@/constants/brands';

const BrandsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">ÇALIŞTIĞIMIZ MARKALAR</h2>
          <p className="text-gray-400 font-medium">Dünya çapında tanınmış markalarla iş birliği</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRANDS.map((brand, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-lg p-6 flex items-center justify-center hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
            >
              <span className="text-white font-bold text-center uppercase tracking-wide">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
