/**
 * XML Parser for Supplier Product Feed
 * Toptancı XML feed'ini parse eder ve ürün listesi döndürür
 */

import { SupplierProduct } from '@/types';

interface XMLProductNode {
  name: string;
  brand?: string;
  price: string;
  stock: string;
  category?: string;
  description?: string;
  image?: string;
  images?: string[];
  sku: string;
  barcode?: string;
  [key: string]: any;
}

/**
 * XML'i parse edip SupplierProduct array'e çevirir
 * @param xmlText XML string
 * @param supplierName Toptancı adı
 * @returns SupplierProduct array
 */
export async function parseSupplierXML(
  xmlText: string,
  supplierName: string = 'Toptancı'
): Promise<SupplierProduct[]> {
  try {
    // DOMParser ile XML parse et
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Parse error kontrolü
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('XML parse hatası: ' + parseError.textContent);
    }

    // Ürün node'larını bul (yaygın XML yapıları desteklenir)
    const productNodes = xmlDoc.querySelectorAll('product, item, Product, Item, PRODUCT, ITEM');
    
    if (productNodes.length === 0) {
      console.warn('XML içinde ürün bulunamadı. Farklı tag yapısı olabilir.');
      return [];
    }

    const products: SupplierProduct[] = [];

    productNodes.forEach((node) => {
      try {
        const product = parseProductNode(node as Element, supplierName);
        if (product) {
          products.push(product);
        }
      } catch (error) {
        console.error('Ürün parse hatası:', error);
      }
    });

    return products;
  } catch (error) {
    console.error('XML parse genel hatası:', error);
    throw error;
  }
}

/**
 * Tek bir ürün node'unu parse eder
 */
function parseProductNode(node: Element, supplierName: string): SupplierProduct | null {
  try {
    // Gerekli alanları çek (case-insensitive)
    const name = getNodeValue(node, ['name', 'title', 'productName', 'product_name', 'urun_adi']);
    const price = getNodeValue(node, ['price', 'salePrice', 'sale_price', 'fiyat']);
    const sku = getNodeValue(node, ['sku', 'productCode', 'product_code', 'kod', 'id']);

    if (!name || !price || !sku) {
      console.warn('Eksik zorunlu alan:', { name, price, sku });
      return null;
    }

    // Opsiyonel alanlar
    const brand = getNodeValue(node, ['brand', 'marka', 'manufacturer']) || 'Belirtilmemiş';
    const stock = getNodeValue(node, ['stock', 'quantity', 'stok', 'miktar']) || '0';
    const category = getNodeValue(node, ['category', 'kategori', 'categoryName']);
    const description = getNodeValue(node, ['description', 'desc', 'aciklama', 'details']);
    const barcode = getNodeValue(node, ['barcode', 'barkod', 'ean', 'gtin']);

    // Görseller
    const images = getImageUrls(node);

    // Fiyat parse et
    const priceNumber = parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    const stockNumber = parseInt(stock.replace(/[^0-9]/g, '')) || 0;

    return {
      id: sku,
      name: name.trim(),
      brand: brand.trim(),
      price: priceNumber,
      stock: stockNumber,
      category: category?.trim() || 'Genel',
      description: description?.trim(),
      images: images,
      sku: sku.trim(),
      barcode: barcode?.trim(),
      supplier_name: supplierName,
    };
  } catch (error) {
    console.error('Node parse hatası:', error);
    return null;
  }
}

/**
 * Node'dan değer al (case-insensitive, multiple tag name desteği)
 */
function getNodeValue(node: Element, tagNames: string[]): string | undefined {
  for (const tagName of tagNames) {
    // Direct child node
    let childNode = node.querySelector(tagName);
    
    // Case-insensitive search
    if (!childNode) {
      const allChildren = node.children;
      for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i].tagName.toLowerCase() === tagName.toLowerCase()) {
          childNode = allChildren[i];
          break;
        }
      }
    }

    // Attribute olarak
    if (!childNode) {
      const attrValue = node.getAttribute(tagName);
      if (attrValue) return attrValue;
    }

    if (childNode) {
      return childNode.textContent?.trim() || undefined;
    }
  }
  return undefined;
}

/**
 * Görsel URL'lerini çıkar
 */
function getImageUrls(node: Element): string[] {
  const images: string[] = [];

  // Tek görsel
  const singleImage = getNodeValue(node, ['image', 'imageUrl', 'image_url', 'gorsel', 'resim']);
  if (singleImage) {
    images.push(singleImage);
  }

  // Multiple images
  const imageNodes = node.querySelectorAll('image, images > img, imageUrl, gorsel');
  imageNodes.forEach((imgNode) => {
    const url = imgNode.textContent?.trim() || imgNode.getAttribute('url');
    if (url && !images.includes(url)) {
      images.push(url);
    }
  });

  return images.filter(url => url.startsWith('http'));
}

/**
 * XML Feed URL'inden direkt ürün çek
 */
export async function fetchSupplierXMLFeed(
  feedUrl: string,
  supplierName: string = 'Toptancı'
): Promise<SupplierProduct[]> {
  try {
    const response = await fetch(feedUrl);
    
    if (!response.ok) {
      throw new Error(`XML feed hatası: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    return parseSupplierXML(xmlText, supplierName);
  } catch (error) {
    console.error('XML feed fetch hatası:', error);
    throw error;
  }
}
