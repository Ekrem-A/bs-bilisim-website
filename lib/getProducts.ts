import supabase from './supabase';
import { Product } from '@/types';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

function formatPriceTurkish(value: number | null | undefined): string {
  if (value === null || value === undefined) return '';
  // Ensure two decimals
  const fixed = value.toFixed(2);
  // Replace decimal point with comma and add thousand separators with dot
  const parts = fixed.split('.');
  const intPart = parts[0];
  const decPart = parts[1];
  const withThousand = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${withThousand},${decPart}`;
}

export async function fetchProducts(): Promise<Product[]> {
  // Fetch categories once to map ids to slugs/names
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug');

  if (catError) {
    console.error('Error fetching categories:', catError.message);
    throw catError;
  }

  const catMap: Record<string, { name: string; slug: string }> = {};
  (categories || []).forEach((c: any) => {
    catMap[c.id] = { name: c.name, slug: c.slug };
  });

  // Fetch products
  const { data, error } = await supabase
    .from('products')
    .select(
      `id, name, brand, price, original_price, description, image_url, in_stock, rating, review_count, specs, tags, featured, category_id`
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }

  const products: Product[] = (data || []).map((p: any) => {
    const priceNumber = p.price !== null ? Number(p.price) : null;
    const originalPriceNumber = p.original_price !== null ? Number(p.original_price) : null;

    const categoryInfo = p.category_id ? catMap[p.category_id] : undefined;


    // Cloudinary cloud name helper
    const getCloudName = () => {
      const direct = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (direct) return direct;
      const url = process.env.CLOUDINARY_URL;
      if (url) {
        // cloudinary://api_key:api_secret@cloud_name
        const match = url.match(/@([a-zA-Z0-9_-]+)$/);
        if (match) return match[1];
      }
      return '';
    };
    const cloudName = getCloudName();
    const cld = cloudName ? new Cloudinary({ cloud: { cloudName } }) : null;
    const defaultWidth = Number(process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_WIDTH) || 600;
    const defaultHeight = Number(process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_HEIGHT) || 400;

    let imageUrl = '';
    const rawImage = p.image_url || p.image || '';
    if (rawImage) {
      if (typeof rawImage === 'string' && (rawImage.startsWith('http://') || rawImage.startsWith('https://'))) {
        imageUrl = rawImage;
      } else if (cld) {
        try {
          const img = cld.image(String(rawImage));
          img.resize(fill().width(defaultWidth).height(defaultHeight));
          imageUrl = img.toURL();
        } catch (e) {
          // fallback to raw value
          imageUrl = String(rawImage);
        }
      } else {
        imageUrl = String(rawImage);
      }
    }

    return {
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: formatPriceTurkish(priceNumber),
      originalPrice: originalPriceNumber !== null ? formatPriceTurkish(originalPriceNumber) : undefined,
      image: imageUrl || '',
      image_url: imageUrl || '', // Cloudinary URL'ini buraya da ekle
      category: categoryInfo ? categoryInfo.slug || categoryInfo.name : '',
      featured: !!p.featured,
      description: p.description || undefined,
      inStock: p.in_stock ?? true,
      rating: p.rating ?? undefined,
      reviewCount: p.review_count ?? undefined,
      specs: p.specs ?? undefined,
      tags: p.tags ?? undefined,
    } as Product;
  });

  return products;
}

export default fetchProducts;
