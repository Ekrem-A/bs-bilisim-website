export interface Category {
  id?: number;
  name: string;
  slug: string;
  url?: string;
  level: 'main' | 'sub';
  parent_id?: number | null;
  parent_name?: string | null;
  icon?: string;
  color?: string;
  description?: string;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  // İlişkili veriler
  subcategories?: Category[];
  subcategory_count?: number;
}

export interface Product {
  id: string | number;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  image: string;
  image_urls?: string[]; // Ürün görselleri (JSON array)
  cloudinary_public_id?: string;
  category: string;
  featured?: boolean;
  description?: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  specs?: Record<string, string>;
  tags?: string[];
  is_campaign?: boolean;
  discount_percentage?: number;
  campaign_end_date?: string;
  // Supplier/Bayi fields
  product_source?: 'own' | 'supplier';
  supplier_name?: string;
  supplier_product_id?: string;
  supplier_sku?: string;
  last_synced_at?: string;
}

export interface SupplierProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  images: string[];
  sku: string;
  barcode?: string;
  supplier_name: string;
}

export interface Brand {
  name: string;
  logo?: string;
}

export interface User {
  email: string;
  password: string;
  name?: string;
}

export interface ProductFilters {
  brands: string[];
  priceRange: [number, number];
  inStock: boolean;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'newest';
}
