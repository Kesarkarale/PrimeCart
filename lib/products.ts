import { createClient } from "@/lib/supabase/client";

/* =========================================================
   PRODUCT TYPE
========================================================= */

export interface Product {
  id: string;
  category_id?: string | null;

  name: string;
  slug: string;

  short_description?: string | null;
  description?: string | null;

  price: number;
  original_price?: number | null;

  stock?: number | null;

  image_url?: string | null;

  brand?: string | null;

  rating?: number | null;
  reviews_count?: number | null;

  is_featured?: boolean | null;
  is_flash_sale?: boolean | null;
  is_active?: boolean | null;

  created_at?: string | null;
  updated_at?: string | null;

  /* UI compatibility */
  category?: string | null;
  featured?: boolean | null;
  flash_sale?: boolean | null;
  active?: boolean | null;
}

/* =========================================================
   SUPABASE PRODUCT ROW
========================================================= */

type SupabaseProductRow = {
  id: string;
  category_id: string | null;

  name: string;
  slug: string;

  short_description: string | null;
  description: string | null;

  price: number;
  original_price: number | null;

  stock: number | null;

  image_url: string | null;

  brand: string | null;

  rating: number | null;
  reviews_count: number | null;

  is_featured: boolean | null;
  is_flash_sale: boolean | null;
  is_active: boolean | null;

  created_at: string | null;
  updated_at: string | null;

  categories?: {
    name?: string | null;
  } | null;
};

/* =========================================================
   NORMALIZE PRODUCT
========================================================= */

function normalizeProduct(
  product: SupabaseProductRow
): Product {
  return {
    id: product.id,

    category_id: product.category_id,

    name: product.name,
    slug: product.slug,

    short_description:
      product.short_description,

    description:
      product.description,

    price: Number(product.price ?? 0),

    original_price:
      product.original_price !== null
        ? Number(product.original_price)
        : null,

    stock: product.stock ?? 0,

    image_url:
      product.image_url,

    brand:
      product.brand,

    rating:
      product.rating !== null
        ? Number(product.rating)
        : 0,

    reviews_count:
      product.reviews_count ?? 0,

    is_featured:
      product.is_featured ?? false,

    is_flash_sale:
      product.is_flash_sale ?? false,

    is_active:
      product.is_active ?? true,

    created_at:
      product.created_at,

    updated_at:
      product.updated_at,

    /* Compatibility for existing components */

    category:
      product.categories?.name ?? null,

    featured:
      product.is_featured ?? false,

    flash_sale:
      product.is_flash_sale ?? false,

    active:
      product.is_active ?? true,
  };
}

/* =========================================================
   COMMON SELECT
========================================================= */

const PRODUCT_SELECT = `
  id,
  category_id,
  name,
  slug,
  short_description,
  description,
  price,
  original_price,
  stock,
  image_url,
  brand,
  rating,
  reviews_count,
  is_featured,
  is_flash_sale,
  is_active,
  created_at,
  updated_at,
  categories (
    name
  )
`;

/* =========================================================
   GET ALL PRODUCTS
   IMPORTANT:
   All products from Supabase are returned.
   No is_active filter.
========================================================= */

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Get products error:",
      error
    );

    return [];
  }

  return (
    (data ?? []) as SupabaseProductRow[]
  ).map(normalizeProduct);
}

/* =========================================================
   GET SINGLE PRODUCT
========================================================= */

export async function getProductById(
  id: string
): Promise<Product | null> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "Get product error:",
      error
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return normalizeProduct(
    data as SupabaseProductRow
  );
}

/* =========================================================
   GET FEATURED PRODUCTS
========================================================= */

export async function getFeaturedProducts(
  limit = 8
): Promise<Product[]> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("is_featured", true)
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

  return (
    (data ?? []) as SupabaseProductRow[]
  ).map(normalizeProduct);
}

/* =========================================================
   GET FLASH SALE PRODUCTS
========================================================= */

export async function getFlashSaleProducts(
  limit = 8
): Promise<Product[]> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("is_flash_sale", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "Get flash sale products error:",
      error
    );

    return [];
  }

  return (
    (data ?? []) as SupabaseProductRow[]
  ).map(normalizeProduct);
}

/* =========================================================
   GET PRODUCTS BY CATEGORY
========================================================= */

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
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

  const products = (
    (data ?? []) as SupabaseProductRow[]
  ).map(normalizeProduct);

  return products.filter(
    (product) =>
      product.category?.toLowerCase() ===
      category.toLowerCase()
  );
}
