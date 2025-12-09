"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { Cpu, MonitorStop, Fan, HardDrive, MemoryStick, Zap, Droplet, Keyboard, Mouse, CircuitBoard, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Temporarily pause animation for manual scroll
      setIsPaused(true);
      
      // Calculate scroll amount based on one category item width
      const firstItem = scrollRef.current.querySelector('a');
      const scrollAmount = firstItem ? firstItem.offsetWidth + 20 : 200; // width + gap
      const currentScroll = scrollRef.current.scrollLeft;
      
      scrollRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });

      // Resume animation after scroll completes
      setTimeout(() => {
        setIsPaused(false);
      }, 500);
    }
  };

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
    <section id="kategoriler" className="py-8 bg-gray-900 border-b border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-3 rounded-full hover:from-cyan-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-cyan-500/50 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>

        {/* Categories Container with CSS Animation */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div 
            ref={animRef}
            className={`flex gap-5 ${isPaused ? '' : 'animate-scroll-fast'}`}
          >
            {/* First set */}
            {(categories || []).map((category, index) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || MonitorStop;
              return (
                <Link 
                  key={`cat-1-${index}`}
                  href={`/products/${category.slug}`}
                  className="flex-shrink-0 flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-500/30 rounded-full hover:border-cyan-400 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all group"
                >
                  <Icon className="text-cyan-400 group-hover:scale-110 transition-transform" size={28} strokeWidth={2.5} />
                  <span className="text-white text-lg font-bold whitespace-nowrap group-hover:text-cyan-400 transition-colors">{category.name}</span>
                </Link>
              );
            })}
            {/* Duplicate set for seamless scroll */}
            {(categories || []).map((category, index) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || MonitorStop;
              return (
                <Link 
                  key={`cat-2-${index}`}
                  href={`/products/${category.slug}`}
                  className="flex-shrink-0 flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-500/30 rounded-full hover:border-cyan-400 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all group"
                >
                  <Icon className="text-cyan-400 group-hover:scale-110 transition-transform" size={28} strokeWidth={2.5} />
                  <span className="text-white text-lg font-bold whitespace-nowrap group-hover:text-cyan-400 transition-colors">{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-3 rounded-full hover:from-cyan-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-cyan-500/50 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
