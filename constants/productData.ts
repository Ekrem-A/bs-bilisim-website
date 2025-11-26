import { Product } from '@/types';

// Ekran Kartları
export const GPU_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'NVIDIA GeForce RTX 4090 24GB',
    brand: 'ASUS',
    price: '54.999,00',
    originalPrice: '59.999,00',
    image: '/products/gpu-1.jpg',
    category: 'Ekran Kartı',
    inStock: true,
    rating: 4.9,
    reviewCount: 234,
    description: 'En yüksek performanslı gaming ekran kartı',
    specs: {
      'Bellek': '24GB GDDR6X',
      'Boost Clock': '2.52 GHz',
      'TDP': '450W'
    },
    tags: ['4K Gaming', 'Ray Tracing', 'DLSS 3']
  },
  {
    id: 102,
    name: 'AMD Radeon RX 7900 XTX 24GB',
    brand: 'Sapphire',
    price: '39.999,00',
    image: '/products/gpu-2.jpg',
    category: 'Ekran Kartı',
    inStock: true,
    rating: 4.7,
    reviewCount: 187,
    specs: {
      'Bellek': '24GB GDDR6',
      'Boost Clock': '2.5 GHz',
      'TDP': '355W'
    }
  },
  {
    id: 103,
    name: 'NVIDIA GeForce RTX 4080 16GB',
    brand: 'MSI',
    price: '42.999,00',
    image: '/products/gpu-3.jpg',
    category: 'Ekran Kartı',
    inStock: true,
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: 104,
    name: 'NVIDIA GeForce RTX 4070 Ti 12GB',
    brand: 'Gigabyte',
    price: '29.999,00',
    image: '/products/gpu-4.jpg',
    category: 'Ekran Kartı',
    inStock: true,
    rating: 4.6,
    reviewCount: 203
  },
  {
    id: 105,
    name: 'AMD Radeon RX 7800 XT 16GB',
    brand: 'XFX',
    price: '24.999,00',
    image: '/products/gpu-5.jpg',
    category: 'Ekran Kartı',
    inStock: false,
    rating: 4.5,
    reviewCount: 89
  },
  {
    id: 106,
    name: 'NVIDIA GeForce RTX 4060 Ti 8GB',
    brand: 'ASUS',
    price: '16.999,00',
    image: '/products/gpu-6.jpg',
    category: 'Ekran Kartı',
    inStock: true,
    rating: 4.4,
    reviewCount: 321
  }
];

// İşlemciler
export const CPU_PRODUCTS: Product[] = [
  {
    id: 201,
    name: 'Intel Core i9-14900K',
    brand: 'Intel',
    price: '19.999,00',
    image: '/products/cpu-1.jpg',
    category: 'İşlemci',
    inStock: true,
    rating: 4.8,
    reviewCount: 145,
    specs: {
      'Çekirdek': '24 (8P+16E)',
      'Boost': '6.0 GHz',
      'TDP': '125W'
    },
    tags: ['Yüksek Performans', 'Overclocking']
  },
  {
    id: 202,
    name: 'AMD Ryzen 9 7950X',
    brand: 'AMD',
    price: '18.999,00',
    image: '/products/cpu-2.jpg',
    category: 'İşlemci',
    inStock: true,
    rating: 4.9,
    reviewCount: 198,
    specs: {
      'Çekirdek': '16',
      'Boost': '5.7 GHz',
      'TDP': '170W'
    }
  },
  {
    id: 203,
    name: 'Intel Core i7-14700K',
    brand: 'Intel',
    price: '14.999,00',
    image: '/products/cpu-3.jpg',
    category: 'İşlemci',
    inStock: true,
    rating: 4.7,
    reviewCount: 276
  },
  {
    id: 204,
    name: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    price: '16.999,00',
    image: '/products/cpu-4.jpg',
    category: 'İşlemci',
    inStock: true,
    rating: 4.9,
    reviewCount: 412,
    featured: true
  },
  {
    id: 205,
    name: 'Intel Core i5-14600K',
    brand: 'Intel',
    price: '10.999,00',
    image: '/products/cpu-5.jpg',
    category: 'İşlemci',
    inStock: true,
    rating: 4.6,
    reviewCount: 189
  }
];

// Anakartlar
export const MOTHERBOARD_PRODUCTS: Product[] = [
  {
    id: 301,
    name: 'ASUS ROG MAXIMUS Z790 HERO',
    brand: 'ASUS',
    price: '22.999,00',
    image: '/products/mb-1.jpg',
    category: 'Anakart',
    inStock: true,
    rating: 4.8,
    reviewCount: 87,
    specs: {
      'Socket': 'LGA1700',
      'Chipset': 'Z790',
      'Form Factor': 'ATX'
    },
    tags: ['DDR5', 'PCIe 5.0', 'WiFi 7']
  },
  {
    id: 302,
    name: 'MSI MAG X670E TOMAHAWK',
    brand: 'MSI',
    price: '18.999,00',
    image: '/products/mb-2.jpg',
    category: 'Anakart',
    inStock: true,
    rating: 4.7,
    reviewCount: 134,
    specs: {
      'Socket': 'AM5',
      'Chipset': 'X670E',
      'Form Factor': 'ATX'
    }
  },
  {
    id: 303,
    name: 'Gigabyte B650 AORUS ELITE',
    brand: 'Gigabyte',
    price: '8.999,00',
    image: '/products/mb-3.jpg',
    category: 'Anakart',
    inStock: true,
    rating: 4.5,
    reviewCount: 256
  },
  {
    id: 304,
    name: 'ASUS TUF GAMING B760-PLUS',
    brand: 'ASUS',
    price: '7.499,00',
    image: '/products/mb-4.jpg',
    category: 'Anakart',
    inStock: true,
    rating: 4.6,
    reviewCount: 189
  }
];

// Soğutma Sistemleri
export const COOLING_PRODUCTS: Product[] = [
  {
    id: 401,
    name: 'GorgonX 360 ARGB Liquid Cooler',
    brand: 'GorgonX',
    price: '3.299,00',
    image: '/products/cooling-1.jpg',
    category: 'Soğutma',
    inStock: true,
    rating: 4.8,
    reviewCount: 412,
    featured: true,
    specs: {
      'Radyatör': '360mm',
      'Fan': '3x 120mm ARGB',
      'TDP': '350W'
    },
    tags: ['RGB', 'Sessiz', 'Yüksek Performans']
  },
  {
    id: 402,
    name: 'GorgonX 240 ARGB Water Cooled',
    brand: 'GorgonX',
    price: '2.499,00',
    image: '/products/cooling-2.jpg',
    category: 'Soğutma',
    inStock: true,
    rating: 4.7,
    reviewCount: 567,
    featured: true,
    specs: {
      'Radyatör': '240mm',
      'Fan': '2x 120mm ARGB',
      'TDP': '280W'
    }
  },
  {
    id: 403,
    name: 'Corsair iCUE H150i Elite',
    brand: 'Corsair',
    price: '4.999,00',
    image: '/products/cooling-3.jpg',
    category: 'Soğutma',
    inStock: true,
    rating: 4.9,
    reviewCount: 234
  },
  {
    id: 404,
    name: 'Noctua NH-D15 chromax.black',
    brand: 'Noctua',
    price: '2.999,00',
    image: '/products/cooling-4.jpg',
    category: 'Soğutma',
    inStock: true,
    rating: 4.9,
    reviewCount: 789
  }
];

// RAM
export const RAM_PRODUCTS: Product[] = [
  {
    id: 501,
    name: 'Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz',
    brand: 'Corsair',
    price: '4.999,00',
    image: '/products/ram-1.jpg',
    category: 'RAM',
    inStock: true,
    rating: 4.8,
    reviewCount: 345,
    specs: {
      'Kapasite': '32GB (2x16GB)',
      'Frekans': '6000MHz',
      'Latency': 'CL30'
    }
  },
  {
    id: 502,
    name: 'G.Skill Trident Z5 RGB DDR5 64GB (2x32GB) 6400MHz',
    brand: 'G.Skill',
    price: '9.999,00',
    image: '/products/ram-2.jpg',
    category: 'RAM',
    inStock: true,
    rating: 4.9,
    reviewCount: 167
  },
  {
    id: 503,
    name: 'Kingston Fury Beast DDR5 32GB (2x16GB) 5600MHz',
    brand: 'Kingston',
    price: '3.999,00',
    image: '/products/ram-3.jpg',
    category: 'RAM',
    inStock: true,
    rating: 4.6,
    reviewCount: 234
  }
];

// Kasalar
export const CASE_PRODUCTS: Product[] = [
  {
    id: 601,
    name: 'Corsair 5000D Airflow',
    brand: 'Corsair',
    price: '5.499,00',
    image: '/products/case-1.jpg',
    category: 'Kasa',
    inStock: true,
    rating: 4.8,
    reviewCount: 456,
    specs: {
      'Form Factor': 'Mid Tower ATX',
      'Fan': '2x 120mm',
      'Tempered Glass': 'Evet'
    }
  },
  {
    id: 602,
    name: 'NZXT H7 Flow RGB',
    brand: 'NZXT',
    price: '4.999,00',
    image: '/products/case-2.jpg',
    category: 'Kasa',
    inStock: true,
    rating: 4.7,
    reviewCount: 289
  },
  {
    id: 603,
    name: 'Lian Li O11 Dynamic EVO',
    brand: 'Lian Li',
    price: '6.999,00',
    image: '/products/case-3.jpg',
    category: 'Kasa',
    inStock: true,
    rating: 4.9,
    reviewCount: 678
  }
];

// Power Supply
export const PSU_PRODUCTS: Product[] = [
  {
    id: 701,
    name: 'Corsair RM1000x 1000W 80+ Gold Modular',
    brand: 'Corsair',
    price: '6.999,00',
    image: '/products/psu-1.jpg',
    category: 'Power Supply',
    inStock: true,
    rating: 4.9,
    reviewCount: 234,
    specs: {
      'Güç': '1000W',
      'Sertifika': '80+ Gold',
      'Modüler': 'Tam Modüler'
    }
  },
  {
    id: 702,
    name: 'Seasonic PRIME TX 850W 80+ Titanium',
    brand: 'Seasonic',
    price: '8.999,00',
    image: '/products/psu-2.jpg',
    category: 'Power Supply',
    inStock: true,
    rating: 5.0,
    reviewCount: 167
  }
];

// Klavyeler
export const KEYBOARD_PRODUCTS: Product[] = [
  {
    id: 801,
    name: 'GorgonX RGB Mechanical Gaming Keyboard',
    brand: 'GorgonX',
    price: '1.299,00',
    image: '/products/keyboard-1.jpg',
    category: 'Klavye',
    inStock: true,
    rating: 4.6,
    reviewCount: 589,
    featured: true,
    specs: {
      'Switch': 'Mekanik (Red)',
      'Layout': 'TR Q',
      'RGB': 'Per-Key RGB'
    }
  },
  {
    id: 802,
    name: 'Logitech G915 TKL Wireless',
    brand: 'Logitech',
    price: '6.999,00',
    image: '/products/keyboard-2.jpg',
    category: 'Klavye',
    inStock: true,
    rating: 4.8,
    reviewCount: 412
  }
];

// Mouse
export const MOUSE_PRODUCTS: Product[] = [
  {
    id: 901,
    name: 'GorgonX Pro Gaming Mouse 16000 DPI',
    brand: 'GorgonX',
    price: '899,00',
    image: '/products/mouse-1.jpg',
    category: 'Mouse',
    inStock: true,
    rating: 4.7,
    reviewCount: 678,
    featured: true,
    specs: {
      'DPI': '16000',
      'Sensor': 'Optik',
      'Buton': '7'
    }
  },
  {
    id: 902,
    name: 'Logitech G Pro X Superlight',
    brand: 'Logitech',
    price: '4.999,00',
    image: '/products/mouse-2.jpg',
    category: 'Mouse',
    inStock: true,
    rating: 4.9,
    reviewCount: 1234
  }
];

// Tüm ürünleri topla
export const ALL_PRODUCTS: Product[] = [
  ...GPU_PRODUCTS,
  ...CPU_PRODUCTS,
  ...MOTHERBOARD_PRODUCTS,
  ...COOLING_PRODUCTS,
  ...RAM_PRODUCTS,
  ...CASE_PRODUCTS,
  ...PSU_PRODUCTS,
  ...KEYBOARD_PRODUCTS,
  ...MOUSE_PRODUCTS,
];

// Kategoriye göre ürün getir
export const getProductsByCategory = (categorySlug: string): Product[] => {
  const categoryMap: Record<string, Product[]> = {
    'ekran-karti': GPU_PRODUCTS,
    'islemci': CPU_PRODUCTS,
    'anakart': MOTHERBOARD_PRODUCTS,
    'sogutma': COOLING_PRODUCTS,
    'ram': RAM_PRODUCTS,
    'kasa': CASE_PRODUCTS,
    'power-supply': PSU_PRODUCTS,
    'klavye': KEYBOARD_PRODUCTS,
    'mouse': MOUSE_PRODUCTS,
  };
  
  return categoryMap[categorySlug] || [];
};

// Markaya göre filtrele
export const getBrandsByCategory = (categorySlug: string): string[] => {
  const products = getProductsByCategory(categorySlug);
  const brands = [...new Set(products.map(p => p.brand))];
  return brands.sort();
};
