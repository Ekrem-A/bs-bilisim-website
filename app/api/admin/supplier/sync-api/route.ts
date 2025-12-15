import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Admin kontrolü
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

// Slug oluşturucu
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Kategori eşleştirme
async function matchCategory(categoryName: string, supabase: any): Promise<string | null> {
  if (!categoryName) return null;

  const cleanName = categoryName.trim().toLowerCase();
  
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug');

  if (!categories || categories.length === 0) return null;

  // Exact match
  let match = categories.find((c: any) => 
    c.name.toLowerCase() === cleanName || 
    c.slug === generateSlug(categoryName)
  );

  // Partial match
  if (!match) {
    match = categories.find((c: any) => 
      c.name.toLowerCase().includes(cleanName) ||
      cleanName.includes(c.name.toLowerCase())
    );
  }

  return match?.id || null;
}

export async function POST(request: NextRequest) {
  // Check admin
  const { isAdmin, supabase } = await checkAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { 
      apiUrl, 
      apiKey, 
      supplierName, 
      priceMarkup = 0,
      autoPublish = true,
      syncInterval = 'manual' // 'manual', 'hourly', 'daily'
    } = body;

    if (!apiUrl || !supplierName) {
      return NextResponse.json(
        { error: 'API URL ve toptancı adı gerekli' },
        { status: 400 }
      );
    }

    // Fetch from supplier API
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
      headers['X-API-Key'] = apiKey;
    }

    const response = await fetch(apiUrl, { 
      headers,
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API çağrısı başarısız: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    let products: any[] = [];

    if (contentType?.includes('application/json')) {
      const data = await response.json();
      
      // API response yapısını tespit et
      if (Array.isArray(data)) {
        products = data;
      } else if (data.products && Array.isArray(data.products)) {
        products = data.products;
      } else if (data.data && Array.isArray(data.data)) {
        products = data.data;
      } else if (data.items && Array.isArray(data.items)) {
        products = data.items;
      } else {
        throw new Error('API response\'da ürün listesi bulunamadı');
      }
    } else {
      throw new Error('Desteklenmeyen content type. JSON formatı bekleniyor.');
    }

    if (products.length === 0) {
      return NextResponse.json({
        success: true,
        imported: 0,
        errors: 0,
        message: 'API\'da ürün bulunamadı',
      });
    }

    // Process products
    const imported: any[] = [];
    const errors: any[] = [];

    for (const apiProduct of products) {
      try {
        // API field mapping - esnek yapı
        const productData = {
          sku: apiProduct.sku || apiProduct.id || apiProduct.product_id || apiProduct.code,
          name: apiProduct.name || apiProduct.title || apiProduct.product_name,
          brand: apiProduct.brand || apiProduct.manufacturer || apiProduct.marka || 'Genel',
          price: parseFloat(apiProduct.price || apiProduct.sale_price || apiProduct.fiyat || '0'),
          stock: parseInt(apiProduct.stock || apiProduct.quantity || apiProduct.stok || '0'),
          category: apiProduct.category || apiProduct.category_name || apiProduct.kategori,
          description: apiProduct.description || apiProduct.desc || apiProduct.aciklama || '',
          image: apiProduct.image || apiProduct.image_url || apiProduct.thumbnail || apiProduct.gorsel,
          images: apiProduct.images || apiProduct.image_urls || [],
          barcode: apiProduct.barcode || apiProduct.ean || apiProduct.gtin,
        };

        if (!productData.sku || !productData.name || !productData.price) {
          errors.push({
            product: apiProduct.name || 'Unknown',
            error: 'SKU, name veya price eksik',
          });
          continue;
        }

        // Kategori eşleştir
        const categoryId = await matchCategory(productData.category, supabase);

        // Fiyat markup uygula
        const finalPrice = productData.price * (1 + priceMarkup / 100);

        // Görselleri array'e çevir
        let imageUrls: string[] = [];
        if (productData.image) {
          imageUrls.push(productData.image);
        }
        if (Array.isArray(productData.images)) {
          imageUrls = [...imageUrls, ...productData.images];
        }
        imageUrls = imageUrls.filter(Boolean).slice(0, 5); // Max 5 görsel

        // Slug oluştur
        const slug = generateSlug(productData.name);

        // Check if product exists (by supplier_sku)
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('supplier_sku', productData.sku)
          .single();

        const productPayload = {
          name: productData.name,
          slug,
          brand: productData.brand,
          category_id: categoryId,
          price: finalPrice,
          description: productData.description,
          image_urls: imageUrls,
          in_stock: productData.stock > 0,
          stock_quantity: productData.stock,
          product_source: 'supplier',
          supplier_name: supplierName,
          supplier_sku: productData.sku,
          supplier_product_id: productData.sku,
          last_synced_at: new Date().toISOString(),
          featured: false,
        };

        if (existing) {
          // Update existing product
          const { error: updateError } = await supabase
            .from('products')
            .update(productPayload)
            .eq('id', existing.id);

          if (updateError) throw updateError;
          imported.push({ ...productPayload, action: 'updated' });
        } else {
          // Insert new product
          const { error: insertError } = await supabase
            .from('products')
            .insert(productPayload);

          if (insertError) throw insertError;
          imported.push({ ...productPayload, action: 'created' });
        }
      } catch (error: any) {
        errors.push({
          product: apiProduct.name || apiProduct.sku || 'Unknown',
          error: error.message,
        });
      }
    }

    // Otomatik sync ayarını kaydet
    if (syncInterval !== 'manual') {
      // Bu bilgiyi database'e kaydedebiliriz (supplier_configs tablosu)
      // Şimdilik response'da döndürelim
    }

    return NextResponse.json({
      success: true,
      imported: imported.length,
      errors: errors.length,
      details: {
        products: imported,
        errors,
      },
      sync: {
        supplier: supplierName,
        synced_at: new Date().toISOString(),
        next_sync: syncInterval === 'hourly' ? 'Her saat' : 
                   syncInterval === 'daily' ? 'Her gün' : 'Manuel',
      },
    });
  } catch (error: any) {
    console.error('API sync error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
