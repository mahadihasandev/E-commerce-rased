# Modern Next.js E-Commerce Storefront (Laravel / PHP Backend Ready)

This is a premium, modern e-commerce storefront completely decoupled from Sanity.io and ready to connect with any **Laravel (PHP)** or custom REST API backend.

## 🚀 Key Improvements & Features
- **Zero Sanity.io Dependency**: All `@sanity/*`, `next-sanity`, and Groq queries have been completely removed.
- **Unified TypeScript Domain Types**: Standard models for `Product`, `Category`, `Brand`, `Banner`, `Order`, `Blog`, and `Address` in `@/types`.
- **Resilient API Service (`@/lib/api.ts`)**: Built-in mock data fallback so the frontend works immediately even before the Laravel backend is started.
- **Laravel Storage & CDN Image Support (`@/lib/image.ts`)**: Supports full URLs, relative paths (`/storage/...`), and local assets with fallback images.
- **Rich Text Component (`@/components/RichTextRenderer.tsx`)**: Replaces `PortableText` and gracefully renders HTML from Laravel WYSIWYG editors (Quill, Trix, TinyMCE, TipTap) or plain text.
- **Modern UI Redesign**: Elevated typography, subtle gradients, soft shadows, rounded glassmorphism badges, and smooth micro-interactions.

---

## 🛠️ Laravel API Endpoints Reference

Configure `NEXT_PUBLIC_API_URL` in `.env.local` (default: `http://127.0.0.1:8000/api`).

Your Laravel backend can implement the following REST endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/categories` | Returns list of categories (`title`, `slug`, `image`, `productCount`) |
| `GET` | `/api/brands` | Returns list of brands (`title`, `slug`, `image`) |
| `GET` | `/api/banners` | Returns promotional hero banners (`title`, `subtitle`, `image`, `productSlug`) |
| `GET` | `/api/products` | Returns products with filters (`category`, `brand`, `variant`, `minPrice`, `maxPrice`) |
| `GET` | `/api/products/{slug}` | Returns single product details |
| `GET` | `/api/products/hot-deals` | Returns discounted / hot deal products |
| `GET` | `/api/products/search?q={query}` | Search products by name, slug, or description |
| `GET` | `/api/blogs` | Returns blog articles |
| `GET` | `/api/blogs/{slug}` | Returns single blog article with body content |
| `GET` | `/api/blog-categories` | Returns list of blog categories |
| `GET` | `/api/addresses` | Returns user delivery addresses |
| `POST` | `/api/orders` | Create a new order after checkout |
| `GET` | `/api/orders?user_id={id}` | Returns customer orders |

---

## 💻 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create or edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
