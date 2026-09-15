import { createClient } from "@/lib/supabase/client";

/* =========================================================
   PRODUCT TYPE
========================================================= */

export interface Product {
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

  rating: number;

  reviews_count: number;

  is_featured: boolean;

  is_flash_sale: boolean;

  is_active: boolean;

  created_at: string | null;

  updated_at: string | null;

  /* =======================================================
     COMPATIBILITY FIELDS
  ======================================================= */

  category?: string | null;

  featured?: boolean;

  flash_sale?: boolean;

  active?: boolean;
}

/* =========================================================
   SUPABASE PRODUCT ROW
========================================================= */

interface SupabaseProductRow {
  id: string;

  category_id: string | null;

  name: string;

  slug: string;

  short_description: string | null;

  description: string | null;

  price: number | string;

  original_price: number | string | null;

  stock: number | null;

  image_url: string | null;

  brand: string | null;

  rating: number | string | null;

  reviews_count: number | null;

  is_featured: boolean | null;

  is_flash_sale: boolean | null;

  is_active: boolean | null;

  created_at: string | null;

  updated_at: string | null;
}

/* =========================================================
   SUPABASE SELECT
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
  updated_at
`;

/* =========================================================
   NORMALIZE PRODUCT
========================================================= */

function normalizeProduct(
  row: SupabaseProductRow
): Product {
  return {
    id: row.id,

    category_id: row.category_id,

    name: row.name,

    slug: row.slug,

    short_description:
      row.short_description,

    description:
      row.description,

    price:
      Number(row.price ?? 0),

    original_price:
      row.original_price !== null &&
      row.original_price !== undefined
        ? Number(row.original_price)
        : null,

    stock:
      row.stock !== null &&
      row.stock !== undefined
        ? Number(row.stock)
        : null,

    image_url:
      row.image_url,

    brand:
      row.brand,

    rating:
      row.rating !== null &&
      row.rating !== undefined
        ? Number(row.rating)
        : 0,

    reviews_count:
      Number(row.reviews_count ?? 0),

    is_featured:
      row.is_featured ?? false,

    is_flash_sale:
      row.is_flash_sale ?? false,

    is_active:
      row.is_active ?? true,

    created_at:
      row.created_at,

    updated_at:
      row.updated_at,

    /* =====================================================
       COMPATIBILITY
    ===================================================== */

    category:
      "Product",

    featured:
      row.is_featured ?? false,

    flash_sale:
      row.is_flash_sale ?? false,

    active:
      row.is_active ?? true,
  };
}

/* =========================================================
   GET ALL PRODUCTS

   Returns ALL products from Supabase.
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
      "getProducts error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   GET PRODUCT BY ID
========================================================= */

export async function getProductById(
  id: string
): Promise<Product | null> {
  if (!id) {
    return null;
  }

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
      "getProductById error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load product"
    );
  }

  if (!data) {
    return null;
  }

  return normalizeProduct(
    data as unknown as SupabaseProductRow
  );
}

/* =========================================================
   GET PRODUCT BY SLUG
========================================================= */

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  if (!slug) {
    return null;
  }

  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(
      "getProductBySlug error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load product"
    );
  }

  if (!data) {
    return null;
  }

  return normalizeProduct(
    data as unknown as SupabaseProductRow
  );
}

/* =========================================================
   GET FEATURED PRODUCTS
========================================================= */

export async function getFeaturedProducts(): Promise<
  Product[]
> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "getFeaturedProducts error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load featured products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   GET FLASH SALE PRODUCTS
========================================================= */

export async function getFlashSaleProducts(): Promise<
  Product[]
> {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_flash_sale", true)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "getFlashSaleProducts error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load flash sale products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   GET ACTIVE PRODUCTS
========================================================= */

export async function getActiveProducts(): Promise<
  Product[]
> {
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
      "getActiveProducts error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load active products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   GET PRODUCTS BY CATEGORY ID
========================================================= */

export async function getProductsByCategoryId(
  categoryId: string
): Promise<Product[]> {
  if (!categoryId) {
    return [];
  }

  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "getProductsByCategoryId error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load category products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   SEARCH PRODUCTS
========================================================= */

export async function searchProducts(
  searchTerm: string
): Promise<Product[]> {
  const term = searchTerm.trim();

  if (!term) {
    return getProducts();
  }

  const supabase = createClient();

  const pattern = `%${term}%`;

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .or(
      [
        `name.ilike.${pattern}`,
        `brand.ilike.${pattern}`,
        `short_description.ilike.${pattern}`,
        `description.ilike.${pattern}`,
        `slug.ilike.${pattern}`,
      ].join(",")
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "searchProducts error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to search products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   GET PRODUCTS BY PRICE RANGE
========================================================= */

export async function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number
): Promise<Product[]> {
  const supabase = createClient();

  const min = Number(minPrice);
  const max = Number(maxPrice);

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .gte("price", min)
    .lte("price", max)
    .eq("is_active", true)
    .order("price", {
      ascending: true,
    });

  if (error) {
    console.error(
      "getProductsByPriceRange error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   GET TOP RATED PRODUCTS
========================================================= */

export async function getTopRatedProducts(
  limit = 10
): Promise<Product[]> {
  const supabase = createClient();

  const safeLimit = Math.max(
    1,
    Math.min(limit, 100)
  );

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .order("rating", {
      ascending: false,
    })
    .order("reviews_count", {
      ascending: false,
    })
    .limit(safeLimit);

  if (error) {
    console.error(
      "getTopRatedProducts error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load top rated products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}

/* =========================================================
   GET LATEST PRODUCTS
========================================================= */

export async function getLatestProducts(
  limit = 10
): Promise<Product[]> {
  const supabase = createClient();

  const safeLimit = Math.max(
    1,
    Math.min(limit, 100)
  );

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", {
      ascending: false,
    })
    .limit(safeLimit);

  if (error) {
    console.error(
      "getLatestProducts error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to load latest products"
    );
  }

  return (data ?? []).map((row) =>
    normalizeProduct(
      row as unknown as SupabaseProductRow
    )
  );
}
