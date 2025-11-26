'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Favorilerim</h1>
        <p className="text-slate-600">Beğendiğiniz ürünleri buradan takip edin</p>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Heart size={64} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">Henüz Favori Ürün Yok</h3>
        <p className="text-slate-600 mb-6">Beğendiğiniz ürünleri favorilerinize ekleyin</p>
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Ürünlere Göz At
        </a>
      </div>
    </div>
  );
}
