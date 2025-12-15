import supabase from './supabase';
import { Category } from '@/types';

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, level, parent_id, parent_name, icon, color, description, display_order, is_active')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }

  // Map Postgres rows to Category interface
  const categories: Category[] = (data || []).map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    level: c.level,
    parent_id: c.parent_id,
    parent_name: c.parent_name,
    icon: c.icon || '',
    color: c.color || '',
    description: c.description || undefined,
    display_order: c.display_order,
    is_active: c.is_active,
  }));

  return categories;
}

// Ana kategorileri getir
export async function fetchMainCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('v_main_categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching main categories:', error.message);
    throw error;
  }

  return data || [];
}

// Belirli bir ana kategorinin alt kategorilerini getir
export async function fetchSubcategories(parentSlug: string): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, level, parent_id, parent_name, icon, color, description, display_order')
    .eq('level', 'sub')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching subcategories:', error.message);
    throw error;
  }

  // Parent slug'a göre filtrele
  const parent = await supabase
    .from('categories')
    .select('id')
    .eq('slug', parentSlug)
    .single();

  if (parent.data) {
    return (data || []).filter(c => c.parent_id === parent.data.id);
  }

  return [];
}

export default fetchCategories;
