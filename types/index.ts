export interface Slug {
  current: string;
}

export interface ImageAsset {
  _ref?: string;
  url?: string;
  [key: string]: unknown;
}

export interface ImageObject {
  _key?: string;
  _type?: string;
  asset?: ImageAsset;
  url?: string;
  [key: string]: unknown;
}

export interface Category {
  _id: string;
  id?: string | number;
  _type?: "category";
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  name?: string;
  slug: Slug;
  description?: string;
  range?: number;
  feature?: boolean;
  image?: ImageObject | string;
  productCount?: number;
}

export interface Brand {
  _id: string;
  id?: string | number;
  _type?: "brand";
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  name?: string;
  brandName?: string;
  slug: Slug;
  description?: string;
  image?: ImageObject | string;
}

export interface BlogCategory {
  _id?: string;
  title: string;
  slug?: Slug;
}

export interface Author {
  _id?: string;
  name: string;
  image?: ImageObject | string;
  bio?: string;
}

export interface Blog {
  _id: string;
  id?: string | number;
  _type?: "blog";
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: Slug;
  author?: Author;
  mainImage?: ImageObject | string;
  publishedAt?: string;
  blogcategories?: BlogCategory[];
  body?: unknown;
}

export interface Product {
  _id: string;
  id?: string | number;
  _type?: "product";
  _createdAt?: string;
  _updatedAt?: string;
  name: string;
  slug: Slug;
  images?: (ImageObject | string)[];
  keyfeature?: unknown;
  description?: unknown;
  price: number;
  discount?: number;
  stock?: number;
  brand?: Brand | { brandName?: string; title?: string; _ref?: string; [key: string]: unknown };
  categories?: (Category | string | { title?: string; name?: string; _ref?: string; slug?: Slug })[];
  status?: "new" | "hot" | "sale";
  variant?: "gadget" | "appliances" | "refrigerators" | "others" | string;
  isFeatured?: boolean;
  sales_count?: number;
}

export interface Banner {
  _id: string;
  id?: string | number;
  _type?: "banner";
  _createdAt?: string;
  _updatedAt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageObject | string;
  productSlug?: string[];
  link?: string;
}

export interface Address {
  _id?: string;
  id?: string | number;
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  District?: string;
  zip?: string;
  phone?: string;
  default?: boolean;
  createdAt?: string;
}

export interface OrderProductItem {
  _key?: string;
  product?: Product;
  quantity?: number;
  price?: number;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
}

export interface Order {
  _id: string;
  id?: string | number;
  orderNumber: string;
  customerName: string;
  email: string;
  userId?: string;
  clerkUserId?: string;
  stripeCheckoutSessionId?: string;
  stripeCustomerId?: string;
  stripePaymentIntentId?: string;
  currency?: string;
  totalPrice: number;
  amountDiscount?: number;
  status: "pending" | "processing" | "paid" | "completed" | "cancelled" | string;
  orderDate: string;
  invoice?: {
    id?: string;
    number?: string;
    hosted_invoice_url?: string;
  } | null;
  products?: OrderProductItem[];
  address?: Address | null;
}

// Aliases for compatibility
export type ORDER_QUERY_RESULT = Order[];
export type SINGLE_BLOG_QUERY_RESULT = Blog | null;
