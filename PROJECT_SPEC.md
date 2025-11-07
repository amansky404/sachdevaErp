# Sachdeva Retail Platform – Project Specification

## Table of Contents
1. [Mission & Scope](#mission--scope)
2. [Architecture Overview](#architecture-overview)
3. [Environment & Tooling](#environment--tooling)
4. [Domain Model](#domain-model)
   - [Identity & RBAC](#identity--rbac)
   - [Store Footprint](#store-footprint)
   - [Catalog & Categories](#catalog--categories)
   - [Inventory & Sync](#inventory--sync)
   - [Payments & Hardware](#payments--hardware)
   - [Notifications & Auditing](#notifications--auditing)
5. [Authentication & Authorization Flows](#authentication--authorization-flows)
6. [Application Workspaces](#application-workspaces)
   - [Admin Console](#admin-console)
   - [Point of Sale](#point-of-sale)
   - [Online Storefront](#online-storefront)
7. [Server Actions & Data Fetching Patterns](#server-actions--data-fetching-patterns)
8. [Offline Strategy & Sync Engine](#offline-strategy--sync-engine)
9. [Testing & Quality Gates](#testing--quality-gates)
10. [Deployment & Operations](#deployment--operations)
11. [Product Roadmap](#product-roadmap)
12. [Contribution Guidelines](#contribution-guidelines)

---

## Mission & Scope

The Sachdeva Retail Platform is a unified ERP, POS, and e-commerce system for multi-store retailers. The repository bootstraps a Next.js 14 codebase with:

- Opinionated project structure shared across web, admin, and POS experiences.
- Prisma schema covering users, RBAC, stores, catalog, inventory, payments, and sync entities.
- Authentication scaffolding (NextAuth + Prisma adapter) with role seeding and middleware enforcement.
- Initial admin workflows for catalog, category, and inventory visibility.
- Dedicated layouts for POS and storefront teams to extend.

The goal of this specification is to document the current capabilities and outline the roadmap for feature teams delivering production-grade retail software.

### Personas
- **Head Office Admins** – manage stores, inventory, categories, users, and payments.
- **Store Managers & Cashiers** – operate POS terminals, reconcile stock, manage day-to-day operations.
- **E-commerce Staff** – curate online storefront, manage promotions, and monitor fulfillment.
- **Developers & Operators** – maintain infrastructure, deployments, and observability.

---

## Architecture Overview

### Core Stack
- **Framework**: Next.js 14 (App Router) with React 19 and TypeScript.
- **Styling**: Tailwind CSS v4 with CSS variables and shadcn/ui primitives.
- **ORM & Database**: Prisma ORM targeting PostgreSQL.
- **Authentication**: NextAuth.js with Prisma adapter.
- **State & Utilities**: Zustand for client state, Zod for validation, date-fns for formatting, Socket.io client for realtime, IndexedDB helpers for offline storage.
- **Tooling**: ESLint (flat config), TypeScript strict mode, Next.js middleware for RBAC.

### Directory Structure Highlights
```
app/
  (admin)/admin/…       # Admin workspace routes and layouts
  (pos)/pos/…           # POS shell ready for offline-first workflows
  (storefront)/store/…  # Online store shell
  api/…                 # Next.js Route Handlers for auth (and future APIs)
components/
  layout/…              # AppShell and navigation primitives
lib/
  auth/…                # NextAuth options, RBAC helpers, server session util
  utils/formatters.ts   # Currency/date helpers
prisma/schema.prisma    # Complete domain model
middleware.ts           # Permission-aware routing guard
```

The App Router layouts isolate each workspace behind their own shell while sharing providers (session, styling) declared in `app/layout.tsx` and `components/layout/app-shell.tsx`.

---

## Environment & Tooling

1. **Install dependencies**: `npm install`
2. **Environment variables**: copy `.env.example` to `.env` and provide PostgreSQL, NextAuth, and optional OAuth credentials.
3. **Database setup**:
   - `npm run prisma:generate`
   - `npm run prisma:migrate -- --name init`
4. **Development server**: `npm run dev`
5. **Quality commands**:
   - `npm run lint`
   - `npm run test` *(placeholder – hook Jest/Vitest here)*
   - `npm run build` *(fails in sandbox when Google Fonts cannot be fetched; acceptable locally with network access)*

Node 18+ is required. Tailwind v4 is configured via `postcss.config.mjs` and uses automatic design tokens; avoid legacy Tailwind config patterns.

---

## Domain Model

The Prisma schema (`prisma/schema.prisma`) defines the data backbone. Below is a condensed overview grouped by concern.

### Identity & RBAC
- `User`: account profile, password or OAuth, locale, time zone, status.
- `Role`: named permission bundles, default role flag for new tenants.
- `Permission`: machine-readable `code` and `module` strings enabling fine-grained access.
- `RolePermission`: join table connecting roles and permissions (with audit of the assigner).
- `UserRole`: per-user role assignments scoped optionally to a specific store.
- `StoreUser`: convenience join for primary store membership tracking.

### Store Footprint
- `Store`: company/franchise/warehouse types with contact info, timezone, currency, and activation state.
- `PosTerminal`: registers per store with sync timestamps.

### Catalog & Categories
- `Category`: hierarchical categories via self-relation, slug uniqueness, `isActive` toggle.
- `Item`: SKU, barcode, pricing, tax rate, optional category linkage, and `trackInventory` flag.

### Inventory & Sync
- `Inventory`: stock quantities per store per item, with `reserved` allocation support.
- `SyncQueue`: durable queue for propagating POS/offline changes with status tracking.
- `AuditLog`: captures user/store/action metadata for compliance.

### Payments & Hardware
- `PaymentConfiguration`: per-store gateway credentials covering Stripe, Razorpay, Cashfree, or custom providers.

### Notifications & Auditing
- `NotificationSetting`: per-user communication preferences for alerts.
- NextAuth models (`Account`, `Session`, `VerificationToken`) support OAuth/credentials flows out of the box.

---

## Authentication & Authorization Flows

- `app/api/auth/[...nextauth]/route.ts` configures NextAuth with Prisma adapter, email/password credentials, and role seeding.
- `lib/auth/options.ts` defines callbacks:
  - Seeds baseline roles & permissions on first user creation.
  - Extends the session with `roles`, `permissions`, and helper booleans for RBAC checks.
- `lib/auth/permissions.ts` enumerates modules and permission codes (e.g., `admin:catalog.read`).
- `lib/auth/server.ts` exposes `getServerAuthSession()` for server components and server actions.
- `middleware.ts` guards protected routes by mapping URL prefixes to required permissions. Unauthorized requests are redirected to `/auth/sign-in` or `/`.

---

## Application Workspaces

### Admin Console

**Layout**: `app/(admin)/admin/layout.tsx` wraps pages with the shared `AppShell`, navigation, and breadcrumb slots. Navigation entries surface Catalog, Categories, Inventory Health, and placeholders for upcoming modules.

**Catalog Listing** (`app/(admin)/admin/items/page.tsx`):
- Fetches all items with aggregated store inventory via Prisma.
- Supports keyword search on SKU, name, and barcode.
- Surfaces total catalog value summary.
- Links to detail page and new item form.

**Item Creation** (`app/(admin)/admin/items/_components/item-form.tsx` & `.../_actions/create-item.ts`):
- Zod validation ensures SKU uniqueness, numeric pricing, and optional category selection.
- Server action persists item and seeds zeroed `Inventory` rows per active store.
- Revalidates list route and returns structured success/error payload consumed by client form.

**Item Detail & Update** (`app/(admin)/admin/items/[itemId]/page.tsx`):
- Presents read/write pricing, cost, tax, and metadata fields with guardrails for read-only states when user lacks permissions.
- Displays per-store inventory table with valuation, on-hand, reserved, and restock indicators.
- Update server action reuses shared mapper utilities (`_utils/item-form.ts`) for consistent payload handling.

**Category Management** (`app/(admin)/admin/categories/...`):
- Listing table with parent/child display, status badge, and item counts.
- Creation form supports parent category selection and status toggles.
- Validates slug uniqueness and ensures tree integrity.
- Admin navigation entry present for quick access.

**Inventory Health** (`app/(admin)/admin/inventory/page.tsx`):
- Aggregates total on-hand quantity, stock valuation, and low-stock alerts across stores.
- Reusable `store-inventory-table.tsx` shows per-store SKU coverage, total value, low-stock count, and quick links for follow-up workflows.

### Point of Sale

**Layout**: `app/(pos)/pos/layout.tsx` sets up a two-column shell for register actions and customer/order context. Currently wired with placeholder navigation ready for cart, tender, and shift management modules.

**Entry Page** (`app/(pos)/pos/page.tsx`): outlines the offline-first POS vision and surfaces quick actions for cashiers. Upcoming work will mount Zustand-powered cart state, keypad interactions, and sync status indicators.

### Online Storefront

**Layout**: `app/(storefront)/store/layout.tsx` mirrors the AppShell pattern with channel-specific navigation.

**Landing Page** (`app/(storefront)/store/page.tsx`): provides analytics placeholders and copy describing future customer-facing flows (catalog browsing, checkout, account management). Feature teams will connect it to shared catalog data and e-commerce APIs.

---

## Server Actions & Data Fetching Patterns

- **Data Loading**: Server components fetch data directly via Prisma. Shared helpers in `lib/prisma.ts` manage the singleton client to prevent connection storms.
- **Server Actions**: Located alongside feature folders (e.g., `app/(admin)/admin/items/_actions`). They:
  - Validate input with Zod schemas defined in `lib/validation/*`.
  - Enforce permissions using session helpers before writing.
  - Return discriminated unions (`{ status: 'error' | 'success', data, errors }`) for client components.
- **Client Forms**: Use React `useTransition` to submit actions, show optimistic states, and map validation errors to form fields.
- **Revalidation**: `revalidatePath` ensures admin list pages reflect the latest mutations.

---

## Offline Strategy & Sync Engine

Although offline capabilities are not yet wired into the UI, the foundation is laid:

1. **IndexedDB Storage**: Future POS modules will cache catalog, pricing, and customer data per terminal.
2. **Sync Queue**: `SyncQueue` model tracks create/update/delete events from POS or admin to reconcile with the central database.
3. **Socket.io**: Placeholder dependency for pushing inventory updates, tender results, and audit notifications.
4. **Terminal Tracking**: `PosTerminal.lastSyncAt` enables dashboards to flag stale devices.

Upcoming implementation should include:
- Background sync worker leveraging `SyncQueue` with exponential backoff.
- Conflict resolution policy (last-writer wins with audit logs + supervisor alerts).
- Service worker to bootstrap offline shell and asset caching.

---

## Testing & Quality Gates

- **Linting**: `npm run lint` uses Next.js recommended rules plus Tailwind and TypeScript support. Ensure newly added files respect import ordering and avoid client/server boundary violations.
- **Type Safety**: TypeScript strict mode is enabled via `tsconfig.json`. All server actions and components should maintain explicit types and leverage inference from Zod schemas.
- **Unit & Integration Tests**: Placeholder `npm run test` script reserved for Vitest/Jest introduction. Prioritize validation helpers and server actions.
- **End-to-End Tests**: Plan to add Playwright for user flows (catalog CRUD, inventory updates, POS checkout).
- **Accessibility**: Use shadcn/ui primitives and ensure forms include labels, descriptions, and error messaging. Target WCAG AA compliance.

---

## Deployment & Operations

- **Runtime**: Deploy via Vercel or containerized Node 18 environment. Ensure Prisma uses a managed PostgreSQL instance.
- **Environment Promotion**: Maintain separate `.env` files or use platform secrets. Run `prisma migrate deploy` on release.
- **Caching**: Evaluate Redis for session caching and rate limiting. The schema anticipates `REDIS_URL`.
- **Logging & Monitoring**: Extend `AuditLog` with request IDs, integrate with application log pipeline (Datadog, Loki, etc.). Use Vercel/Next instrumentation hooks for metrics.
- **Backups**: Schedule database backups and replicate to standby region for disaster recovery.
- **Security**: Rotate NextAuth secret, enforce HTTPS, configure rate limiting on auth routes, and consider WebAuthn for staff logins.

---

## Product Roadmap

Short-term priorities:
1. **Complete POS Cart Workflow** – cart state, tendering, receipt printing, offline sync.
2. **Inventory Adjustments** – stock transfers, audits, and automated low-stock purchase suggestions.
3. **Customer & Vendor Master Data** – CRUD modules, import/export, loyalty tracking.
4. **Payment Gateway Integrations** – Stripe/Razorpay capture from admin-configured credentials.
5. **Reporting Dashboards** – sales, inventory, store performance with charts and exports.

Long-term initiatives:
- Franchise management (royalty calculations, franchise onboarding).
- E-commerce order orchestration with fulfillment statuses and warehouse picks.
- Advanced analytics (ABC analysis, predictive restocking).
- Hardware integration (barcode scanners, receipt printers, payment terminals).

---

## Contribution Guidelines

1. **Branching**: Use feature branches (`feature/<name>`) off `main`. Keep commits scoped and descriptive.
2. **Coding Standards**: Follow established folder conventions. Co-locate server actions, validation schemas, and UI components by feature.
3. **Accessibility & Responsiveness**: Ensure admin tables and forms adapt to mobile widths; include keyboard navigation.
4. **RBAC Enforcement**: Every new route or server action must declare required permissions in `lib/auth/permissions.ts` and `middleware.ts`.
5. **Database Changes**: Update `prisma/schema.prisma`, run `npm run prisma:migrate -- --name <change>`, and commit generated migrations.
6. **Documentation**: Update this specification and `README.md` when adding major capabilities or new workflows.
7. **PR Checklist**:
   - Tests and lint pass locally.
   - Screenshots for visual changes (attach via repository tooling).
   - Describe migrations, environment variable additions, and rollout considerations.

This specification should be treated as the living source of truth for the Sachdeva Retail Platform. Keep it synchronized with implementation as the system evolves.
