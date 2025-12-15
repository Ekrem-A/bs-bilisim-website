import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Helper: Admin kontrolü
async function checkAdmin(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {},
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { isAdmin: false, user: null, supabase };
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  return {
    isAdmin: profile?.is_admin === true,
    user,
    supabase
  };
}

// Slug oluştur
function generateSlug(text: string): string {
  const trMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
  };

  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * POST /api/admin/supplier/import-xml
 * XML feed'den ürün import et
 */
export async function POST(request: NextRequest) {
  try {
    const { isAdmin, supabase } = await checkAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { 
      xmlText, 
      supplierName = 'Toptancı',
      categoryMapping = {},
      priceMarkup = 0,
      autoPublish = false 
    } = body;

    if (!xmlText) {
      return NextResponse.json(
        { error: 'XML içeriği gerekli' },
        { status: 400 }
      );
    }

    // Server-side XML parsing (xml2js kullanmak daha güvenli)
    const products = await parseXMLProducts(xmlText, supplierName);

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'XML içinde ürün bulunamadı' },
        { status: 400 }
      );
    }

    // Kategori mapping
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name, slug');

    const categoryMap: Record<string, string> = {};
    (categories || []).forEach((cat: any) => {
      categoryMap[cat.name.toLowerCase()] = cat.id;
      categoryMap[cat.slug.toLowerCase()] = cat.id;
    });

    // Ürünleri hazırla ve import et
    const importedProducts = [];
    const errors = [];

    for (const product of products) {
      try {
        // Kategori belirle
        let categoryId = categoryMapping[product.category] || null;
        
        if (!categoryId) {
          // Otomatik eşleştirme dene
          const catLower = product.category.toLowerCase();
          categoryId = categoryMap[catLower] || null;
        }

        if (!categoryId) {
          // Default kategori (ilk kategori)
          categoryId = categories?.[0]?.id || null;
        }

        // Fiyat markup uygula
        const finalPrice = product.price * (1 + priceMarkup / 100);

        // Slug oluştur
        const slug = generateSlug(product.name);

        // Ürün verisi
        const productData = {
          name: product.name,
          slug: slug,
          brand: product.brand,
          category_id: categoryId,
          price: finalPrice,
          original_price: product.price,
          description: product.description || null,
          image_urls: product.images || [],
          in_stock: product.stock > 0,
          stock_quantity: product.stock,
          featured: false,
          product_source: 'supplier' as const,
          supplier_name: supplierName,
          supplier_product_id: product.id,
          supplier_sku: product.sku,
          last_synced_at: new Date().toISOString(),
          specs: product.barcode ? { 'Barkod': product.barcode } : null,
        };

        // Mevcut ürün kontrolü (supplier_sku ile)
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('supplier_sku', product.sku)
          .single();

        if (existing) {
          // Update
          const { error: updateError } = await supabase
            .from('products')
            .update(productData)
            .eq('id', existing.id);

          if (updateError) throw updateError;
          
          importedProducts.push({ ...productData, id: existing.id, action: 'updated' });
        } else {
          // Insert
          const { data: inserted, error: insertError } = await supabase
            .from('products')
            .insert([productData])
            .select()
            .single();

          if (insertError) throw insertError;
          
          importedProducts.push({ ...inserted, action: 'created' });
        }
      } catch (error: any) {
        console.error('Ürün import hatası:', error);
        errors.push({
          product: product.name,
          error: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      imported: importedProducts.length,
      errors: errors.length,
      details: {
        products: importedProducts,
        errors: errors
      }
    });

  } catch (error: any) {
    console.error('XML import API hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Basit XML parser (server-side)
async function parseXMLProducts(xmlText: string, supplierName: string): Promise<any[]> {
  // XML parse için xml2js veya fast-xml-parser kullanılabilir
  // Şimdilik basit regex parsing (production'da xml2js kullanın)
  
  const products: any[] = [];
  
  // Product tag'lerini bul
  const productRegex = /<(?:product|item|Product|Item)>([\s\S]*?)<\/(?:product|item|Product|Item)>/gi;
  const matches = xmlText.matchAll(productRegex);

  for (const match of matches) {
    const productXml = match[1];
    
    const product = {
      id: extractTag(productXml, ['sku', 'id', 'kod']),
      name: extractTag(productXml, ['name', 'title', 'urun_adi']),
      brand: extractTag(productXml, ['brand', 'marka']) || 'Belirtilmemiş',
      price: parseFloat(extractTag(productXml, ['price', 'fiyat']) || '0'),
      stock: parseInt(extractTag(productXml, ['stock', 'stok']) || '0'),
      category: extractTag(productXml, ['category', 'kategori']) || 'Genel',
      description: extractTag(productXml, ['description', 'aciklama']),
      images: extractImages(productXml),
      sku: extractTag(productXml, ['sku', 'kod']),
      barcode: extractTag(productXml, ['barcode', 'barkod']),
    };

    if (product.id && product.name) {
      products.push(product);
    }
  }

  return products;
}

function extractTag(xml: string, tags: string[]): string | null {
  for (const tag of tags) {
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
    const match = xml.match(regex);
    if (match) {
      return match[1].trim();
    }
  }
  return null;
}

function extractImages(xml: string): string[] {
  const images: string[] = [];
  const imageRegex = /<(?:image|gorsel|resim)[^>]*>([^<]+)<\/(?:image|gorsel|resim)>/gi;
  const matches = xml.matchAll(imageRegex);
  
  for (const match of matches) {
    const url = match[1].trim();
    if (url.startsWith('http')) {
      images.push(url);
    }
  }
  
  return images;
}
