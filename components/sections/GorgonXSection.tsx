import React from 'react';
import { Fan, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const GorgonXSection = () => {
  return (
    <section id="gorgonx" className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-red-950 overflow-hidden">
      {/* Aggressive Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/30 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-start gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-transparent to-red-500"></div>
                <Zap className="text-red-500 animate-pulse" size={32} />
                <div className="h-1 w-12 bg-gradient-to-l from-transparent to-red-500"></div>
              </div>
            </div>

            <div>
              <Image 
                src="/gorgonx.png" 
                alt="GorgonX Logo" 
                width={300} 
                height={300}
                className="drop-shadow-2xl mb-4"
              />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                  ZEHRİNİ PERFORMANSA 
                </span>
                <br />
                <span className="text-red-500">DÖNÜŞTÜR</span>
              </h2>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed">
              BS Bilişim'in özel markası GorgonX, yüksek performanslı gaming ve soğutma 
              çözümleriyle oyuncuların ve profesyonellerin tercihi. Rakiplerini geride bırak.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border-2 border-red-900/30 hover:border-red-500 transition-all">
                <div className="text-3xl font-black text-red-500 mb-1">360mm</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Radyatör</div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border-2 border-red-900/30 hover:border-red-500 transition-all">
                <div className="text-3xl font-black text-red-500 mb-1">ARGB</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Işıklandırma</div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border-2 border-red-900/30 hover:border-red-500 transition-all">
                <div className="text-3xl font-black text-red-500 mb-1">2 Yıl</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Garanti</div>
              </div>
            </div>

            <Link 
              href="/gorgonx" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-10 py-4 rounded-xl font-black text-lg hover:shadow-2xl hover:shadow-red-500/60 transition-all hover:scale-105 border-2 border-red-500"
            >
              <Zap size={24} />
              GÜCÜ KEŞFET
              <Zap size={24} />
            </Link>
          </div>

          {/* Right Visual */}
          <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-red-900/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-red-600/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-600/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-600/50 to-transparent"></div>
            <Fan size={250} className="text-red-600 animate-spin-slow relative z-10 drop-shadow-2xl" />
            <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GorgonXSection;
