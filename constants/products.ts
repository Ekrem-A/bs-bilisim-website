import { Product } from '@/types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'GorgonX 240 ARGB Water Cooled Fan',
    brand: 'GorgonX',
    price: '2.499,00',
    image: '/products/gorgonx-240-cooler.jpg',
    category: 'Soğutma',
    featured: true,
    description: 'Yüksek performanslı 240mm ARGB sıvı soğutma sistemi'
  },
  {
    id: 2,
    name: 'GorgonX RGB Gaming Keyboard',
    brand: 'GorgonX',
    price: '1.299,00',
    image: '/products/gorgonx-keyboard.jpg',
    category: 'Klavye',
    description: 'Mekanik switchler ile üstün gaming deneyimi'
  },
  {
    id: 3,
    name: 'GorgonX Pro Gaming Mouse',
    brand: 'GorgonX',
    price: '899,00',
    image: '/products/gorgonx-mouse.jpg',
    category: 'Mouse',
    description: '16000 DPI hassasiyet ve RGB aydınlatma'
  },
  {
    id: 4,
    name: 'GorgonX 360 ARGB Liquid Cooler',
    brand: 'GorgonX',
    price: '3.299,00',
    image: '/products/gorgonx-360-cooler.jpg',
    category: 'Soğutma',
    description: '360mm radyatör ile maksimum soğutma performansı'
  }
];
