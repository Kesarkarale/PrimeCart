import { createClient } from "@/lib/supabase/client";

/* =========================================================
   PRODUCT TYPE
========================================================= */

export interface Product {
  id: string;
  name: string;

  price: number;
  original_price?: number | null;
  oldPrice?: number | null;

  rating?: number | null;
  reviews_count?: number | null;

  image?: string | null;
  image_url?: string | null;

  category?: string | null;
  category_id?: string | null;

  brand?: string | null;

  stock?: number | null;

  slug?: string | null;
  short_description?: string | null;

  featured?: boolean | null;
  flash_sale?: boolean | null;
  active?: boolean | null;

  created_at?: string | null;
}

/* =========================================================
   GET ALL PRODUCTS
   IMPORTANT:
   This returns ALL products stored in Supabase.
   No active=true filter here.
========================================================= */

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      original_price,
      rating,
      reviews_count,
      image,
      image_url,
      category,
      category_id,
      brand,
      stock,
      slug,
      short_description,
      featured,
      flash_sale,
      active,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Get products error:", error);
    return [];
  }

  return (data ?? []) as Product[];
}

/* =========================================================
   GET SINGLE PRODUCT
========================================================= */

export async function getProductById(
  id: string
): Promise<Product | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      original_price,
      rating,
      reviews_count,
      image,
      image_url,
      category,
      category_id,
      brand,
      stock,
      slug,
      short_description,
      featured,
      flash_sale,
      active,
      created_at
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Get product error:", error);
    return null;
  }

  return data as Product | null;
}

/* =========================================================
   GET FEATURED PRODUCTS
   Only active + featured products.
========================================================= */

export async function getFeaturedProducts(
  limit = 8
): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      original_price,
      rating,
      reviews_count,
      image,
      image_url,
      category,
      category_id,
      brand,
      stock,
      slug,
      short_description,
      featured,
      flash_sale,
      active,
      created_at
    `)
    .eq("active", true)
    .eq("featured", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "Get featured products error:",
      error
    );

    return [];
  }

  return (data ?? []) as Product[];
}

/* =========================================================
   GET PRODUCTS BY CATEGORY
   Only active products for category-specific sections.
========================================================= */

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      original_price,
      rating,
      reviews_count,
      image,
      image_url,
      category,
      category_id,
      brand,
      stock,
      slug,
      short_description,
      featured,
      flash_sale,
      active,
      created_at
    `)
    .eq("active", true)
    .eq("category", category)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Get category products error:",
      error
    );

    return [];
  }

  return (data ?? []) as Product[];
}
