import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  { 
    name: 'İşlemci', 
    slug: 'islemci',
    icon: 'cpu', 
    color: 'from-blue-500 to-cyan-500',
    description: 'Intel ve AMD işlemciler, en son nesil CPU\'lar'
  },
  { 
    name: 'Ekran Kartı', 
    slug: 'ekran-karti',
    icon: 'monitor', 
    color: 'from-cyan-500 to-blue-600',
    description: 'NVIDIA ve AMD ekran kartları, yüksek performans'
  },
  { 
    name: 'Anakart', 
    slug: 'anakart',
    icon: 'motherboard', 
    color: 'from-blue-600 to-indigo-500',
    description: 'Intel ve AMD uyumlu anakartlar'
  },
  { 
    name: 'Soğutma Sistemleri', 
    slug: 'sogutma',
    icon: 'fan', 
    color: 'from-cyan-400 to-blue-500',
    description: 'Hava ve su soğutma sistemleri, GorgonX ARGB'
  },
  { 
    name: 'Kasalar', 
    slug: 'kasa',
    icon: 'hard-drive', 
    color: 'from-blue-500 to-slate-600',
    description: 'ATX, Mid Tower ve Full Tower kasalar'
  },
  { 
    name: 'RAM', 
    slug: 'ram',
    icon: 'memory-stick', 
    color: 'from-indigo-500 to-blue-600',
    description: 'DDR4 ve DDR5 bellekler, RGB seçenekler'
  },
  { 
    name: 'Power Supply', 
    slug: 'power-supply',
    icon: 'zap', 
    color: 'from-blue-600 to-cyan-600',
    description: 'Modüler ve yarı modüler güç kaynakları'
  },
  { 
    name: 'Termal Pad', 
    slug: 'termal-pad',
    icon: 'droplet', 
    color: 'from-cyan-500 to-blue-400',
    description: 'Yüksek performanslı termal padler'
  },
  { 
    name: 'Termal Macun', 
    slug: 'termal-macun',
    icon: 'droplet', 
    color: 'from-blue-400 to-cyan-500',
    description: 'Termal macunlar ve spreader\'lar'
  },
  { 
    name: 'Klavye', 
    slug: 'klavye',
    icon: 'keyboard', 
    color: 'from-slate-600 to-blue-600',
    description: 'Mekanik ve membran klavyeler, RGB'
  },
  { 
    name: 'Mouse', 
    slug: 'mouse',
    icon: 'mouse', 
    color: 'from-blue-600 to-slate-700',
    description: 'Gaming ve ofis mouse\'ları, kablosuz seçenekler'
  },
];
