"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Address,
  Banner,
  Blog,
  BlogCategory,
  Brand,
  Category,
  Product,
} from "@/types";
import {
  getAddresses,
  getAllBlogs,
  getAllBrands,
  getBanners,
  getBlogCategories,
  getBrands,
  getCategories,
  getBestSellers,
  getHotDeals,
  getLatestBlogs,
  getOrder,
  getOthersBlog,
  getProducts,
  getSingleBlog,
  getSingleProduct,
  searchProducts,
} from "@/lib/api";

export interface ProductFilters {
  category?: string | null;
  brand?: string | null;
  variant?: string | null;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export function normalizeProductFilters(
  filters?: ProductFilters
): ProductFilters | undefined {
  if (!filters) return undefined;
  const normalized: ProductFilters = {};
  if (filters.category) normalized.category = filters.category;
  if (filters.brand) normalized.brand = filters.brand;
  if (filters.variant) normalized.variant = filters.variant;
  if (filters.minPrice !== undefined) normalized.minPrice = filters.minPrice;
  if (filters.maxPrice !== undefined) normalized.maxPrice = filters.maxPrice;
  if (filters.page !== undefined) normalized.page = filters.page;
  if (filters.limit !== undefined) normalized.limit = filters.limit;
  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

/**
 * Standardized Query Keys for TanStack Query Cache management.
 */
export const queryKeys = {
  banners: () => ["banners"] as const,
  categories: (quantity?: number) => ["categories", quantity] as const,
  brands: (slug?: string) => ["brands", slug] as const,
  allBrands: () => ["brands", "all"] as const,
  products: (filters?: ProductFilters) =>
    ["products", normalizeProductFilters(filters)] as const,
  singleProduct: (slug: string) => ["product", slug] as const,
  bestSellers: (limit?: number, page?: number) => ["products", "bestSellers", limit, page] as const,
  hotDeals: () => ["products", "hotDeals"] as const,
  searchProducts: (query: string) => ["products", "search", query] as const,
  blogs: (quantity?: number) => ["blogs", quantity] as const,
  latestBlogs: () => ["blogs", "latest"] as const,
  singleBlog: (slug: string) => ["blog", slug] as const,
  blogCategories: () => ["blogCategories"] as const,
  otherBlogs: (slug: string, quantity: number) =>
    ["blogs", "others", slug, quantity] as const,
  orders: (userId: string) => ["orders", userId] as const,
  addresses: () => ["addresses"] as const,
};

// ==========================================
// QUERIES
// ==========================================

export function useBanners(initialData?: Banner[]) {
  return useQuery({
    queryKey: queryKeys.banners(),
    queryFn: () => getBanners(),
    initialData,
  });
}

export function useCategories(quantity?: number, initialData?: Category[]) {
  return useQuery({
    queryKey: queryKeys.categories(quantity),
    queryFn: () => getCategories(quantity),
    initialData,
  });
}

export function useAllBrands(initialData?: Brand[]) {
  return useQuery({
    queryKey: queryKeys.allBrands(),
    queryFn: () => getAllBrands(),
    initialData,
  });
}

export function useBrands(slug?: string, initialData?: Brand[] | null) {
  return useQuery({
    queryKey: queryKeys.brands(slug),
    queryFn: () => getBrands(slug),
    initialData: initialData ?? undefined,
  });
}

export function useProducts(filters?: ProductFilters, initialData?: Product[]) {
  const normalized = normalizeProductFilters(filters);
  return useQuery({
    queryKey: queryKeys.products(normalized),
    queryFn: () => getProducts(normalized),
    initialData,
  });
}

export function useSingleProduct(slug: string, initialData?: Product | null) {
  return useQuery({
    queryKey: queryKeys.singleProduct(slug),
    queryFn: () => getSingleProduct(slug),
    initialData: initialData ?? undefined,
    enabled: Boolean(slug),
  });
}

export function useBestSellers(
  limit: number = 10,
  pageOrInitial?: number | Product[],
  initialData?: Product[]
) {
  const page = typeof pageOrInitial === "number" ? pageOrInitial : 1;
  const initial = Array.isArray(pageOrInitial) ? pageOrInitial : initialData;

  return useQuery({
    queryKey: queryKeys.bestSellers(limit, page),
    queryFn: () => getBestSellers(limit, page),
    initialData: initial,
  });
}

export function useHotDeals(initialData?: Product[]) {
  return useQuery({
    queryKey: queryKeys.hotDeals(),
    queryFn: () => getHotDeals(),
    initialData,
  });
}

export function useSearchProducts(query: string) {
  const trimmed = query.trim();
  return useQuery({
    queryKey: queryKeys.searchProducts(trimmed),
    queryFn: () => searchProducts(trimmed),
    enabled: trimmed.length > 0,
    staleTime: 1000 * 30, // 30s fresh for search terms
  });
}

export function useAllBlogs(quantity?: number, initialData?: Blog[]) {
  return useQuery({
    queryKey: queryKeys.blogs(quantity),
    queryFn: () => getAllBlogs(quantity),
    initialData,
  });
}

export function useLatestBlogs(initialData?: Blog[]) {
  return useQuery({
    queryKey: queryKeys.latestBlogs(),
    queryFn: () => getLatestBlogs(),
    initialData,
  });
}

export function useSingleBlog(slug: string, initialData?: Blog | null) {
  return useQuery({
    queryKey: queryKeys.singleBlog(slug),
    queryFn: () => getSingleBlog(slug),
    initialData: initialData ?? undefined,
    enabled: Boolean(slug),
  });
}

export function useBlogCategories(initialData?: BlogCategory[]) {
  return useQuery({
    queryKey: queryKeys.blogCategories(),
    queryFn: () => getBlogCategories(),
    initialData,
  });
}

export function useOthersBlog(
  slug: string,
  quantity: number,
  initialData?: Blog[]
) {
  return useQuery({
    queryKey: queryKeys.otherBlogs(slug, quantity),
    queryFn: () => getOthersBlog(slug, quantity),
    initialData,
    enabled: Boolean(slug),
  });
}

export function useOrders(userId?: string | number | null) {
  const normalizedId = userId ? String(userId) : "";
  return useQuery({
    queryKey: queryKeys.orders(normalizedId),
    queryFn: () => getOrder(normalizedId),
    enabled: Boolean(normalizedId),
  });
}

export function useAddresses(initialData?: Address[]) {
  return useQuery({
    queryKey: queryKeys.addresses(),
    queryFn: () => getAddresses(),
    initialData,
  });
}

// ==========================================
// MUTATIONS
// ==========================================

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok && data.message) {
        throw new Error(data.message);
      }
      return data;
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok && data.message) {
        throw new Error(data.message);
      }
      return data;
    },
  });
}

export function useInvalidateStore() {
  const queryClient = useQueryClient();
  return {
    invalidateProducts: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
    invalidateOrders: () =>
      queryClient.invalidateQueries({ queryKey: ["orders"] }),
    invalidateAddresses: () =>
      queryClient.invalidateQueries({ queryKey: ["addresses"] }),
  };
}

