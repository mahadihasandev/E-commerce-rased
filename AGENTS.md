<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Next.js Frontend Architecture & Operational Guidelines

## Overview
- **Framework**: Next.js 16 (Turbopack, App Router, React 19 Server Components)
- **Deployment Platform**: Vercel
- **Database**: Neon PostgreSQL (via Vercel Storage)

## API & Fetching Best Practices
- **Resilient Timeout**: In `lib/api.ts`, `fetchAPI` uses a 25-second abort controller to withstand backend cold-starts without failing early.
- **Instant Product Loading**: Product cards and search results prefetch routes (`prefetch={true}`) and show shimmering skeleton states (`loading.tsx`) while streaming product details.
- **Customer Care Routes**: Missing routes (`/help`, `/contact`, `/terms`, `/privacy`, `/faqs`) are fully implemented to eliminate 404 prefetch errors.

