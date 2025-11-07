# 🏪 COMPREHENSIVE ERP + POS + ONLINE STORE BUILD INSTRUCTIONS

## 📋 TABLE OF CONTENTS

1. [🎯 Project Overview](#-project-overview)
2. [⚡ Quick Start Guide](#-quick-start-guide)
3. [🏗️ Project Setup & Architecture](#-project-setup--architecture)
4. [🗄️ Database Schema & Models](#-database-schema--models)
5. [🔐 Authentication & Security](#-authentication--security)
6. [📦 Master Data Management](#-master-data-management)
7. [📊 Inventory Management](#-inventory-management)
8. [💰 Purchase Management](#-purchase-management)
9. [🛒 Sales Management](#-sales-management)
10. [💳 POS System (Offline-First)](#-pos-system-offline-first)
11. [💳 Payment Integration](#-payment-integration)
12. [🌐 E-commerce Store](#-e-commerce-store)
13. [👥 CRM & Loyalty](#-crm--loyalty)
14. [📈 Reports & Analytics](#-reports--analytics)
15. [🏢 Multi-Store & Franchise](#-multi-store--franchise)
16. [⚙️ Settings & Configuration](#-settings--configuration)
17. [🔄 Sync Engine](#-sync-engine)
18. [🚀 Deployment & Production](#-deployment--production)
19. [✅ Testing & Validation](#-testing--validation)

---

## 🎯 PROJECT OVERVIEW

### 🌟 Mission Statement
Build a **complete retail management system** similar to Ginesys with enhanced flexibility, admin control, and offline capabilities.

### 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with RBAC
- **State Management**: Zustand
- **Offline Storage**: IndexedDB
- **Real-time**: Socket.io
- **Payments**: Multi-gateway support (Stripe, Razorpay, etc.)

### 🎯 Core Modules
- 🏢 **ERP (Enterprise Resource Planning)** - Complete business management
- 🛒 **POS (Point of Sale)** - Offline-first store operations  
- 🌐 **E-commerce** - Online store with integrated inventory

### 🔑 Key Features
- ✅ **Offline-first POS** with automatic sync
- ✅ **Admin-configurable payment gateways** 
- ✅ **Multi-store, multi-role architecture**
- ✅ **Hardware integration** for card machines
- ✅ **Real-time inventory** across all channels
- ✅ **Complete audit trail** for compliance
- ✅ **Role-based access control** (RBAC)
- ✅ **Mobile-responsive design**

### 🎯 Business Requirements
- **Multi-tenant architecture** for franchise operations
- **Offline POS capability** for uninterrupted sales
- **Real-time inventory sync** across all channels
- **Configurable payment gateways** from admin panel
- **Complete audit trail** for all transactions
- **Scalable architecture** for enterprise growth

---

## ⚡ QUICK START GUIDE

### 🚀 For Developers (30-minute setup)

```bash
# 1. Clone and setup project
npx create-next-app@latest sachdeva --typescript --tailwind --eslint --app --src-dir=false
cd sachdeva

# 2. Install dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install zustand zod idb idb-keyval stripe razorpay

# 3. Setup database
npx prisma init
npx prisma generate
npx prisma db push

# 4. Start development
npm run dev
```

### 📋 Implementation Phases 
#### Phase 1: Foundation ⭐ CRITICAL
- [ ] **Project Setup** - Next.js 14 + dependencies 
- [ ] **Database Schema** - Complete Prisma models
- [ ] **Authentication** - NextAuth + RBAC middleware
- [ ] **Base Layouts** - Admin, POS, Store layouts


#### Phase 2: Core Modules 
- [ ] **Master Data** - Items, Categories, Customers, Vendors
- [ ] **Inventory Management** - Multi-store stock tracking
- [ ] **User Management** - Roles, permissions, store assignments
- [ ] **Basic Admin Dashboard** - Overview and navigation

#### Phase 3: Business Operations
- [ ] **Purchase Management** - PO → GRN → Inventory updates
- [ ] **Sales Management** - Orders, invoicing, returns
- [ ] **POS System** - Offline-capable point of sale
- [ ] **Payment Integration** - Multiple gateways + hardware

#### Phase 4: Advanced Features
- [ ] **E-commerce Store** - Online shopping experience
- [ ] **CRM & Loyalty** - Customer management and rewards
- [ ] **Reports & Analytics** - Business intelligence
- [ ] **Multi-store & Franchise** - Enterprise scaling

#### Phase 5: Production Ready
- [ ] **Security Hardening** - Audit logs, rate limiting
- [ ] **Performance Optimization** - Caching, indexing
- [ ] **DevOps Setup** - Docker, CI/CD, monitoring
- [ ] **Documentation** - API docs, user guides
- [ ] **Testing & QA** - Complete system testing
### 🎯 Success Metrics
- **POS Response Time**: < 500ms for all operations
- **Inventory Sync**: < 2 seconds for stock updates
- **Dashboard Load**: < 1 second for admin dashboard
- **Offline Storage**: Support 10,000+ products locally
- **Concurrent Users**: Support 100+ simultaneous POS terminals

---

## 🏗️ PROJECT SETUP & ARCHITECTURE

### Step 1: Initialize Next.js Project

```bash
# Create new Next.js project with TypeScript and Tailwind
npx create-next-app@latest sachdeva --typescript --tailwind --eslint --app --src-dir=false
cd sachdeva
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter bcryptjs

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip
npm install lucide-react class-variance-authority clsx tailwind-merge

# State Management & Utilities
npm install zustand zod date-fns

# Offline & Real-time
npm install idb idb-keyval socket.io socket.io-client

# Payment Gateways
npm install stripe razorpay @stripe/stripe-js

# Charts & Analytics
npm install recharts

# Development Tools
npm install -D @types/node @types/bcryptjs tsx
```

### Step 3: Project Structure

```
📁 sachdeva/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 globals.css         # Global styles
│   ├── 📁 layout.tsx          # Root layout
│   ├── 📁 page.tsx            # Home page
│   ├── 📁 (auth)/             # Authentication pages
│   │   ├── 📁 login/
│   │   └── 📁 register/
│   ├── 📁 admin/              # Admin dashboard
│   │   ├── 📁 layout.tsx      # Admin layout
│   │   ├── 📁 dashboard/
│   │   ├── 📁 master/
│   │   │   ├── 📁 items/
│   │   │   ├── 📁 categories/
│   │   │   ├── 📁 customers/
│   │   │   └── 📁 vendors/
│   │   ├── 📁 inventory/
│   │   ├── 📁 purchase/
│   │   ├── 📁 sales/
│   │   ├── 📁 reports/
│   │   └── 📁 settings/
│   ├── 📁 pos/               # POS System
│   │   ├── 📁 layout.tsx     # POS layout
│   │   ├── 📁 sales/
│   │   ├── 📁 shift/
│   │   └── 📁 reports/
│   ├── 📁 (storefront)/      # E-commerce store
│   │   ├── 📁 products/
│   │   ├── 📁 cart/
│   │   ├── 📁 checkout/
│   │   └── 📁 account/
│   └── 📁 api/               # API routes
│       ├── 📁 auth/
│       ├── 📁 admin/
│       ├── 📁 master/
│       ├── 📁 inventory/
│       ├── 📁 purchase/
│       ├── 📁 sales/
│       ├── 📁 pos/
│       ├── 📁 payments/
│       ├── 📁 sync/
│       ├── 📁 reports/
│       └── 📁 hardware/
├── 📁 components/            # Reusable components
│   ├── 📁 ui/               # Base UI components
│   ├── 📁 layouts/          # Layout components
│   ├── 📁 forms/            # Form components
│   └── 📁 charts/           # Chart components
├── 📁 lib/                  # Utilities and configurations
│   ├── 📁 auth/
│   ├── 📁 payments/
│   ├── 📁 hardware/
│   ├── 📁 sync/
│   └── 📁 utils/
├── 📁 modules/              # Business logic modules
│   ├── 📁 auth/
│   ├── 📁 inventory/
│   ├── 📁 purchase/
│   ├── 📁 sales/
│   ├── 📁 pos/
│   ├── 📁 crm/
│   ├── 📁 accounting/
│   ├── 📁 logistics/
│   ├── 📁 franchise/
│   └── 📁 reports/
├── 📁 hooks/               # Custom React hooks
├── 📁 types/               # TypeScript type definitions
├── 📁 prisma/              # Database schema and migrations
└── 📁 public/              # Static assets
```

### Step 4: Environment Configuration

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sachdeva_erp"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Redis (for caching and queues)
REDIS_URL="redis://localhost:6379"

# Payment Gateways
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

# File Storage (Optional)
CLOUDINARY_CLOUD_NAME="your-cloud"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Development
NODE_ENV="development"
```

### Step 5: Basic Configuration Files

#### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  }
}

module.exports = nextConfig
```

#### `lib/prisma.ts`
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}
```

---

## 🗄️ DATABASE SCHEMA & MODELS

### Step 1: Initialize Prisma

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma client
npx prisma generate
```

### Step 2: Complete Prisma Schema

Create `prisma/schema.prisma` with the comprehensive database schema:

```prisma
// This is your Prisma schema file
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// AUTHENTICATION & ORGANIZATION MODELS
// ==========================================

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  name         String?
  passwordHash String?
  phone        String?
  avatar       String?
  status       UserStatus @default(ACTIVE)
  
  // Associations
  roleId       String?
  role         Role?     @relation(fields: [roleId], references: [id])
  storeId      String?
  store        Store?    @relation(fields: [storeId], references: [id])
  
  // Audit fields
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  createdBy    String?
  updatedBy    String?
  
  // Relations
  sessions     UserSession[]
  auditLogs    AuditLog[]
  posShifts    POSShift[]
  sales        Sale[]
  
  @@map("users")
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  permissions Json     // Store permissions as JSON array
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users       User[]
  
  @@map("roles")
}

model Store {
  id          String    @id @default(cuid())
  code        String    @unique
  name        String
  type        StoreType @default(OWNED)
  
  // Location
  address     Json?     // Store full address as JSON
  coordinates Json?     // Lat/lng for location services
  
  // Business info
  gstNo       String?
  phone       String?
  email       String?
  
  // Hierarchy
  parentStoreId String?
  parentStore   Store?  @relation("StoreHierarchy", fields: [parentStoreId], references: [id])
  childStores   Store[] @relation("StoreHierarchy")
  
  // Status
  status      StoreStatus @default(ACTIVE)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  users       User[]
  inventory   Inventory[]
  sales       Sale[]
  posTerminals POSTerminal[]
  
  @@map("stores")
}

enum StoreType {
  OWNED
  FRANCHISE
  CONSIGNMENT
}

enum StoreStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
}

// ==========================================
// MASTER DATA MODELS
// ==========================================

model Item {
  id          String   @id @default(cuid())
  sku         String   @unique
  name        String
  description String?
  
  // Classification
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
  brandId     String?
  brand       Brand?    @relation(fields: [brandId], references: [id])
  
  // Pricing
  mrp         Decimal  @db.Decimal(10, 2)
  sellingPrice Decimal @db.Decimal(10, 2)
  costPrice   Decimal  @db.Decimal(10, 2)
  
  // Tax
  taxId       String?
  tax         Tax?     @relation(fields: [taxId], references: [id])
  
  // Product details
  barcode     String?  @unique
  images      Json?    // Array of image URLs
  
  // Flags
  isActive    Boolean  @default(true)
  isOnline    Boolean  @default(true)
  trackStock  Boolean  @default(true)
  allowBackorder Boolean @default(false)
  
  // Physical properties
  weight      Decimal? @db.Decimal(8, 3)
  dimensions  Json?    // Length, width, height
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String?
  updatedBy   String?
  
  // Relations
  inventory   Inventory[]
  saleItems   SaleItem[]
  purchaseOrderItems PurchaseOrderItem[]
  stockMovements StockMovement[]
  
  @@map("items")
}

model Category {
  id          String  @id @default(cuid())
  name        String
  description String?
  slug        String  @unique
  
  // Hierarchy
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  
  // Display
  image       String?
  sortOrder   Int     @default(0)
  isActive    Boolean @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  items       Item[]
  
  @@map("categories")
}

// Additional models continue...
// [Include all other models from the original schema]
```

### Step 3: Database Setup Commands

```bash
# Push schema to database (for development)
npx prisma db push

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Step 4: Seed Database with Initial Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Administrator' },
    update: {},
    create: {
      name: 'Administrator',
      description: 'Full system access',
      permissions: [
        'items:view', 'items:create', 'items:edit', 'items:delete',
        'inventory:view', 'inventory:adjust', 'inventory:transfer',
        'purchase:view', 'purchase:create', 'purchase:approve',
        'sales:view', 'sales:create', 'sales:refund',
        'pos:access', 'pos:shift', 'pos:reports',
        'users:manage', 'roles:manage', 'settings:manage',
        'reports:view', 'reports:export'
      ]
    }
  })

  // Create manager role
  const managerRole = await prisma.role.upsert({
    where: { name: 'Store Manager' },
    update: {},
    create: {
      name: 'Store Manager',
      description: 'Store management access',
      permissions: [
        'items:view', 'items:create', 'items:edit',
        'inventory:view', 'inventory:adjust',
        'purchase:view', 'purchase:create',
        'sales:view', 'sales:create', 'sales:refund',
        'pos:access', 'pos:shift', 'pos:reports',
        'reports:view'
      ]
    }
  })

  // Create POS user role
  const posRole = await prisma.role.upsert({
    where: { name: 'POS Operator' },
    update: {},
    create: {
      name: 'POS Operator',
      description: 'Point of sale access only',
      permissions: [
        'items:view',
        'inventory:view',
        'sales:view', 'sales:create',
        'pos:access'
      ]
    }
  })

  // Create default store
  const mainStore = await prisma.store.upsert({
    where: { code: 'MAIN' },
    update: {},
    create: {
      code: 'MAIN',
      name: 'Main Store',
      type: 'OWNED',
      address: {
        line1: '123 Main Street',
        line2: 'Commercial Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      },
      phone: '+91-98765-43210',
      email: 'mainstore@sachdeva.com',
      gstNo: '27AABCS1234E1Z5',
      status: 'ACTIVE'
    }
  })

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sachdeva.com' },
    update: {},
    create: {
      email: 'admin@sachdeva.com',
      name: 'System Administrator',
      passwordHash: hashedPassword,
      phone: '+91-98765-43210',
      roleId: adminRole.id,
      storeId: mainStore.id,
      status: 'ACTIVE'
    }
  })

  // Create sample categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic items and gadgets',
      sortOrder: 1,
      isActive: true
    }
  })

  const phones = await prisma.category.upsert({
    where: { slug: 'phones' },
    update: {},
    create: {
      name: 'Mobile Phones',
      slug: 'phones',
      description: 'Smartphones and mobile devices',
      parentId: electronics.id,
      sortOrder: 1,
      isActive: true
    }
  })

  // Create sample brands
  const apple = await prisma.brand.upsert({
    where: { name: 'Apple' },
    update: {},
    create: {
      name: 'Apple',
      description: 'Apple Inc. products',
      isActive: true
    }
  })

  const samsung = await prisma.brand.upsert({
    where: { name: 'Samsung' },
    update: {},
    create: {
      name: 'Samsung',
      description: 'Samsung Electronics',
      isActive: true
    }
  })

  // Create sample taxes
  const gst18 = await prisma.tax.upsert({
    where: { name: 'GST 18%' },
    update: {},
    create: {
      name: 'GST 18%',
      rate: 18.00,
      type: 'GST',
      description: 'Goods and Services Tax 18%',
      isActive: true
    }
  })

  // Create sample items
  const iPhone15 = await prisma.item.upsert({
    where: { sku: 'IPHONE15-128-BLK' },
    update: {},
    create: {
      sku: 'IPHONE15-128-BLK',
      name: 'iPhone 15 128GB Black',
      description: 'Latest iPhone 15 with 128GB storage in Black color',
      barcode: '1234567890123',
      mrp: 79900.00,
      sellingPrice: 75900.00,
      costPrice: 65000.00,
      categoryId: phones.id,
      brandId: apple.id,
      taxId: gst18.id,
      isActive: true,
      isOnline: true,
      trackStock: true,
      weight: 0.171,
      dimensions: {
        length: 147.6,
        width: 71.6,
        height: 7.80
      },
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
      ]
    }
  })

  // Create initial inventory
  await prisma.inventory.upsert({
    where: {
      storeId_itemId_batchNo: {
        storeId: mainStore.id,
        itemId: iPhone15.id,
        batchNo: null
      }
    },
    update: {},
    create: {
      storeId: mainStore.id,
      itemId: iPhone15.id,
      quantity: 50,
      reservedQty: 0,
      avgCost: 65000.00,
      lastCost: 65000.00
    }
  })

  // Create sample customer
  await prisma.customer.upsert({
    where: { code: 'CUST001' },
    update: {},
    create: {
      code: 'CUST001',
      name: 'John Doe',
      phone: '+91-98765-43211',
      email: 'john.doe@example.com',
      loyaltyPoints: 100,
      loyaltyTier: 'GOLD',
      addresses: [{
        type: 'HOME',
        line1: '456 Customer Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400002',
        country: 'India'
      }],
      isActive: true
    }
  })

  // Create POS terminal
  await prisma.pOSTerminal.upsert({
    where: { code: 'POS001' },
    update: {},
    create: {
      code: 'POS001',
      name: 'Main Counter Terminal',
      storeId: mainStore.id,
      status: 'ACTIVE',
      hardwareProfile: {
        printer: {
          type: 'thermal',
          port: 'USB001'
        },
        cashDrawer: {
          enabled: true,
          port: 'USB002'
        },
        scanner: {
          enabled: true,
          type: 'handheld'
        }
      }
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Admin login: admin@sachdeva.com')
  console.log('🔑 Admin password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### Step 5: Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio"
  }
}
```

### Step 6: Run Database Setup

```bash
# Setup database and seed data
npm run db:push
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio
```

### ✅ Validation Checklist
- [ ] Database schema created successfully
- [ ] All models have proper relationships
- [ ] Seed data created (admin user, sample store, items)
- [ ] Can login with admin@sachdeva.com / admin123
- [ ] Prisma Studio shows all tables with data

---

## 🔐 AUTHENTICATION & SECURITY

### Step 1: Setup NextAuth Configuration

Create `lib/auth.ts`:

```typescript
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            role: {
              select: {
                id: true,
                name: true,
                permissions: true
              }
            },
            store: {
              select: {
                id: true,
                code: true,
                name: true,
                type: true
              }
            }
          }
        })

        if (!user || !user.passwordHash) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        if (user.status !== 'ACTIVE') {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          store: user.store,
          permissions: user.role?.permissions || []
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.store = user.store
        token.permissions = user.permissions
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.store = token.store
        session.user.permissions = token.permissions
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/auth/error"
  }
}
```

### Step 2: Create API Route for Authentication

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

### Step 3: Create Middleware for Route Protection

Create `middleware.ts` in the root directory:

```typescript
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/register", "/api/auth"]
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    // Admin routes require ADMIN or MANAGER role
    if (pathname.startsWith("/admin")) {
      if (!token?.role?.name || !["Administrator", "Store Manager"].includes(token.role.name)) {
        return NextResponse.redirect(new URL("/auth/unauthorized", req.url))
      }
    }

    // POS routes require POS_USER or higher
    if (pathname.startsWith("/pos")) {
      if (!token?.role?.name || !["Administrator", "Store Manager", "POS Operator"].includes(token.role.name)) {
        return NextResponse.redirect(new URL("/auth/unauthorized", req.url))
      }
    }

    // API route protection
    if (pathname.startsWith("/api/admin")) {
      if (!token?.role?.name || !["Administrator", "Store Manager"].includes(token.role.name)) {
        return new NextResponse(
          JSON.stringify({ success: false, message: 'Unauthorized' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        )
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/pos/:path*',
    '/api/admin/:path*',
    '/api/pos/:path*',
    '/api/master/:path*',
    '/api/inventory/:path*',
    '/api/purchase/:path*',
    '/api/sales/:path*'
  ]
}
```

### Step 4: Create Permission System

Create `lib/permissions.ts`:

```typescript
export const PERMISSIONS = {
  // Master Data
  ITEMS_VIEW: 'items:view',
  ITEMS_CREATE: 'items:create',
  ITEMS_EDIT: 'items:edit',
  ITEMS_DELETE: 'items:delete',
  
  // Inventory
  INVENTORY_VIEW: 'inventory:view',
  INVENTORY_ADJUST: 'inventory:adjust',
  INVENTORY_TRANSFER: 'inventory:transfer',
  
  // Purchase
  PURCHASE_VIEW: 'purchase:view',
  PURCHASE_CREATE: 'purchase:create',
  PURCHASE_APPROVE: 'purchase:approve',
  
  // Sales
  SALES_VIEW: 'sales:view',
  SALES_CREATE: 'sales:create',
  SALES_REFUND: 'sales:refund',
  
  // POS
  POS_ACCESS: 'pos:access',
  POS_SHIFT: 'pos:shift',
  POS_REPORTS: 'pos:reports',
  
  // Admin
  USERS_MANAGE: 'users:manage',
  ROLES_MANAGE: 'roles:manage',
  SETTINGS_MANAGE: 'settings:manage',
  
  // Reports
  REPORTS_VIEW: 'reports:view',
  REPORTS_EXPORT: 'reports:export'
} as const

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission)
}

export function hasAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.some(permission => userPermissions.includes(permission))
}

export function requirePermission(userPermissions: string[], requiredPermission: string) {
  if (!hasPermission(userPermissions, requiredPermission)) {
    throw new Error(`Permission denied: ${requiredPermission}`)
  }
}
```

### Step 5: Create Type Definitions

Create `types/auth.ts`:

```typescript
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role?: {
        id: string
        name: string
        permissions: string[]
      }
      store?: {
        id: string
        code: string
        name: string
        type: string
      }
      permissions?: string[]
    } & DefaultSession["user"]
  }

  interface User {
    role?: {
      id: string
      name: string
      permissions: string[]
    }
    store?: {
      id: string
      code: string
      name: string
      type: string
    }
    permissions?: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: {
      id: string
      name: string
      permissions: string[]
    }
    store?: {
      id: string
      code: string
      name: string
      type: string
    }
    permissions?: string[]
  }
}
```

### Step 6: Create Session Provider

Create `components/providers.tsx`:

```typescript
"use client"

import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```

Update `app/layout.tsx`:

```typescript
import { Providers } from "@/components/providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### Step 7: Create Login Page

Create `app/login/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials")
      } else {
        const session = await getSession()
        
        // Redirect based on user role
        if (session?.user.role?.name === "Administrator") {
          router.push("/admin/dashboard")
        } else if (session?.user.role?.name === "Store Manager") {
          router.push("/admin/dashboard")
        } else if (session?.user.role?.name === "POS Operator") {
          router.push("/pos/sales")
        } else {
          router.push("/")
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to Sachdeva ERP</CardTitle>
          <CardDescription>
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@sachdeva.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Email: admin@sachdeva.com</p>
            <p>Password: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Step 8: Create Authorization Hook

Create `hooks/use-auth.ts`:

```typescript
import { useSession } from "next-auth/react"
import { hasPermission, hasAnyPermission } from "@/lib/permissions"

export function useAuth() {
  const { data: session, status } = useSession()

  const checkPermission = (permission: string): boolean => {
    if (!session?.user.permissions) return false
    return hasPermission(session.user.permissions, permission)
  }

  const checkAnyPermission = (permissions: string[]): boolean => {
    if (!session?.user.permissions) return false
    return hasAnyPermission(session.user.permissions, permissions)
  }

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    checkPermission,
    checkAnyPermission,
    role: session?.user.role,
    store: session?.user.store
  }
}
```

### ✅ Validation Checklist
- [ ] NextAuth configuration complete
- [ ] Middleware protecting routes
- [ ] Permission system implemented
- [ ] Login page functional
- [ ] Can login with admin@sachdeva.com / admin123
- [ ] Role-based redirection working
- [ ] Session management working

---

## 📦 MASTER DATA MANAGEMENT

Master data forms the foundation of your ERP system. This includes items, categories, brands, customers, and vendors.

### Step 1: Create UI Components

First, create reusable UI components for forms and tables:

Create `components/ui/data-table.tsx`:

```typescript
"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (value: any) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onAdd?: () => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKey,
  onEdit,
  onDelete,
  onAdd
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")

  const filteredData = searchKey
    ? data.filter(item =>
        String(item[searchKey]).toLowerCase().includes(search.toLowerCase())
      )
    : data

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {searchKey && (
          <Input
            placeholder={`Search by ${String(searchKey)}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        )}
        {onAdd && (
          <Button onClick={onAdd}>Add New</Button>
        )}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    {column.cell
                      ? column.cell(item[column.accessorKey])
                      : String(item[column.accessorKey])
                    }
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell>
                    <div className="flex space-x-2">
                      {onEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(item)}
                        >
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(item)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
```

### Step 2: Create Items Management

Create `app/admin/master/items/page.tsx`:

```typescript
"use client"

import { useState, useEffect } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Item {
  id: string
  sku: string
  name: string
  description?: string
  mrp: number
  sellingPrice: number
  costPrice: number
  barcode?: string
  isActive: boolean
  isOnline: boolean
  category?: { name: string }
  brand?: { name: string }
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [taxes, setTaxes] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    mrp: '',
    sellingPrice: '',
    costPrice: '',
    barcode: '',
    categoryId: '',
    brandId: '',
    taxId: '',
    isActive: true,
    isOnline: true,
    trackStock: true
  })

  useEffect(() => {
    fetchItems()
    fetchMasterData()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/master/items')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      toast.error('Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }

  const fetchMasterData = async () => {
    try {
      const [categoriesRes, brandsRes, taxesRes] = await Promise.all([
        fetch('/api/master/categories'),
        fetch('/api/master/brands'),
        fetch('/api/master/taxes')
      ])
      
      setCategories(await categoriesRes.json())
      setBrands(await brandsRes.json())
      setTaxes(await taxesRes.json())
    } catch (error) {
      toast.error('Failed to fetch master data')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingItem 
        ? `/api/master/items/${editingItem.id}` 
        : '/api/master/items'
      
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mrp: parseFloat(formData.mrp),
          sellingPrice: parseFloat(formData.sellingPrice),
          costPrice: parseFloat(formData.costPrice)
        })
      })

      if (response.ok) {
        toast.success(editingItem ? 'Item updated' : 'Item created')
        setDialogOpen(false)
        resetForm()
        fetchItems()
      } else {
        throw new Error('Failed to save item')
      }
    } catch (error) {
      toast.error('Failed to save item')
    }
  }

  const resetForm = () => {
    setFormData({
      sku: '',
      name: '',
      description: '',
      mrp: '',
      sellingPrice: '',
      costPrice: '',
      barcode: '',
      categoryId: '',
      brandId: '',
      taxId: '',
      isActive: true,
      isOnline: true,
      trackStock: true
    })
    setEditingItem(null)
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    setFormData({
      sku: item.sku,
      name: item.name,
      description: item.description || '',
      mrp: item.mrp.toString(),
      sellingPrice: item.sellingPrice.toString(),
      costPrice: item.costPrice.toString(),
      barcode: item.barcode || '',
      categoryId: '',
      brandId: '',
      taxId: '',
      isActive: item.isActive,
      isOnline: item.isOnline,
      trackStock: true
    })
    setDialogOpen(true)
  }

  const columns = [
    { header: 'SKU', accessorKey: 'sku' as keyof Item },
    { header: 'Name', accessorKey: 'name' as keyof Item },
    { 
      header: 'Category', 
      accessorKey: 'category' as keyof Item,
      cell: (value: any) => value?.name || '-'
    },
    { 
      header: 'Brand', 
      accessorKey: 'brand' as keyof Item,
      cell: (value: any) => value?.name || '-'
    },
    { 
      header: 'Selling Price', 
      accessorKey: 'sellingPrice' as keyof Item,
      cell: (value: number) => `₹${value.toLocaleString()}`
    },
    { 
      header: 'Status', 
      accessorKey: 'isActive' as keyof Item,
      cell: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    }
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Items Management</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    value={formData.barcode}
                    onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="costPrice">Cost Price *</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sellingPrice">Selling Price *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="mrp">MRP *</Label>
                  <Input
                    id="mrp"
                    type="number"
                    step="0.01"
                    value={formData.mrp}
                    onChange={(e) => setFormData({...formData, mrp: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? 'Update' : 'Create'} Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={items}
        columns={columns}
        searchKey="name"
        onEdit={handleEdit}
        onDelete={(item) => {
          // Handle delete
          console.log('Delete item:', item)
        }}
      />
    </div>
  )
}
```

### Step 3: Create API Routes for Items

Create `app/api/master/items/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hasPermission, PERMISSIONS } from '@/lib/permissions'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.permissions || !hasPermission(session.user.permissions, PERMISSIONS.ITEMS_VIEW)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search')

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { sku: { contains: search, mode: 'insensitive' as const } },
            { barcode: { contains: search, mode: 'insensitive' as const } }
          ]
        }
      : {}

    const items = await prisma.item.findMany({
      where,
      include: {
        category: { select: { id: true, name: true } },
        brand: { select: { id: true, name: true } },
        tax: { select: { id: true, name: true, rate: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.item.count({ where })

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Items fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.permissions || !hasPermission(session.user.permissions, PERMISSIONS.ITEMS_CREATE)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.sku || !data.name || !data.mrp || !data.sellingPrice || !data.costPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if SKU already exists
    const existingItem = await prisma.item.findUnique({
      where: { sku: data.sku }
    })

    if (existingItem) {
      return NextResponse.json({ error: 'SKU already exists' }, { status: 400 })
    }

    const item = await prisma.item.create({
      data: {
        sku: data.sku,
        name: data.name,
        description: data.description,
        mrp: data.mrp,
        sellingPrice: data.sellingPrice,
        costPrice: data.costPrice,
        barcode: data.barcode,
        categoryId: data.categoryId || null,
        brandId: data.brandId || null,
        taxId: data.taxId || null,
        isActive: data.isActive ?? true,
        isOnline: data.isOnline ?? true,
        trackStock: data.trackStock ?? true,
        weight: data.weight,
        dimensions: data.dimensions,
        createdBy: session.user.id
      },
      include: {
        category: { select: { id: true, name: true } },
        brand: { select: { id: true, name: true } },
        tax: { select: { id: true, name: true, rate: true } }
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE',
        module: 'ITEMS',
        description: `Created item: ${item.name}`,
        newData: item
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Item creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### ✅ Validation Checklist
- [ ] Data table component created
- [ ] Items management page functional
- [ ] API routes for items working
- [ ] Can create, read, update items
- [ ] Search and pagination working
- [ ] Permissions enforced
- [ ] Audit logging implemented

---

## 📊 INVENTORY MANAGEMENT

Real-time, multi-store inventory tracking with automatic sync.

### Step 1: Create Inventory API

Create `app/api/inventory/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('storeId') || session.user.store?.id

    const inventory = await prisma.inventory.findMany({
      where: { storeId },
      include: {
        item: {
          select: {
            id: true,
            sku: true,
            name: true,
            sellingPrice: true,
            isActive: true
          }
        },
        store: {
          select: {
            id: true,
            name: true,
            code: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(inventory)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemId, storeId, quantity, type, reason } = await request.json()

    // Create stock movement record
    await prisma.stockMovement.create({
      data: {
        type: type, // 'ADJUSTMENT'
        itemId,
        toStoreId: storeId,
        quantity,
        unitCost: 0,
        referenceType: 'ADJUSTMENT',
        reason,
        createdBy: session.user.id
      }
    })

    // Update inventory
    const existingInventory = await prisma.inventory.findUnique({
      where: {
        storeId_itemId_batchNo: {
          storeId,
          itemId,
          batchNo: null
        }
      }
    })

    if (existingInventory) {
      await prisma.inventory.update({
        where: { id: existingInventory.id },
        data: {
          quantity: existingInventory.quantity + quantity
        }
      })
    } else {
      await prisma.inventory.create({
        data: {
          storeId,
          itemId,
          quantity,
          avgCost: 0,
          lastCost: 0
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## 🛒 POS SYSTEM (OFFLINE-FIRST)

The heart of the system - a fast, offline-capable point of sale.

### Step 1: Create POS Layout

Create `app/pos/layout.tsx`:

```typescript
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function POSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    // Check POS permission
    const hasPermission = session.user.permissions?.includes("pos:access")
    if (!hasPermission) {
      router.push("/auth/unauthorized")
      return
    }
  }, [session, status, router])

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">POS Terminal</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Store: {session.user.store?.name}
            </span>
            <span className="text-sm text-gray-600">
              User: {session.user.name}
            </span>
          </div>
        </div>
      </header>
      <main className="h-[calc(100vh-80px)] overflow-hidden">
        {children}
      </main>
    </div>
  )
}
```

### Step 2: Create Offline Storage

Create `lib/offline-storage.ts`:

```typescript
import { openDB } from 'idb'

const DB_NAME = 'SachdevaPos'
const DB_VERSION = 1

export const initOfflineDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Items store
      if (!db.objectStoreNames.contains('items')) {
        const itemsStore = db.createObjectStore('items', { keyPath: 'id' })
        itemsStore.createIndex('sku', 'sku')
        itemsStore.createIndex('barcode', 'barcode')
      }

      // Pending sales store
      if (!db.objectStoreNames.contains('pendingSales')) {
        db.createObjectStore('pendingSales', { keyPath: 'localId' })
      }

      // Customer store
      if (!db.objectStoreNames.contains('customers')) {
        const customersStore = db.createObjectStore('customers', { keyPath: 'id' })
        customersStore.createIndex('phone', 'phone')
      }
    },
  })
}

export const syncItemsToLocal = async (items: any[]) => {
  const db = await initOfflineDB()
  const tx = db.transaction('items', 'readwrite')
  
  for (const item of items) {
    await tx.store.put(item)
  }
  
  await tx.done
}

export const getLocalItems = async () => {
  const db = await initOfflineDB()
  return db.getAll('items')
}

export const searchLocalItems = async (query: string) => {
  const db = await initOfflineDB()
  const items = await db.getAll('items')
  
  return items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.sku.toLowerCase().includes(query.toLowerCase()) ||
    (item.barcode && item.barcode.includes(query))
  )
}

export const savePendingSale = async (sale: any) => {
  const db = await initOfflineDB()
  sale.localId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  sale.createdAt = new Date().toISOString()
  sale.synced = false
  
  await db.put('pendingSales', sale)
  return sale.localId
}

export const getPendingSales = async () => {
  const db = await initOfflineDB()
  return db.getAll('pendingSales')
}

export const markSaleAsSynced = async (localId: string) => {
  const db = await initOfflineDB()
  const sale = await db.get('pendingSales', localId)
  if (sale) {
    sale.synced = true
    await db.put('pendingSales', sale)
  }
}
```

---

## 🚀 DEPLOYMENT & PRODUCTION

### Step 1: Create Docker Configuration

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/sachdeva_erp
      - NEXTAUTH_SECRET=your-production-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=sachdeva_erp
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Step 2: Environment Configuration

Create `.env.production`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sachdeva_erp"

# Authentication
NEXTAUTH_SECRET="your-super-secret-production-key"
NEXTAUTH_URL="https://yourdomain.com"

# Payment Gateways (Production)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Production
NODE_ENV="production"
```

---

## ✅ TESTING & VALIDATION

### Step 1: Create Test Scripts

Create `scripts/test-login.ts`:

```typescript
// Test user authentication
async function testLogin() {
  const response = await fetch('http://localhost:3000/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@sachdeva.com',
      password: 'admin123'
    })
  })
  
  console.log('Login test:', response.status === 200 ? 'PASS' : 'FAIL')
}
```

Create `test-frontend.sh`:

```bash
#!/bin/bash

echo "🧪 Testing Frontend Components..."

# Test authentication
echo "Testing login page..."
curl -s http://localhost:3000/login | grep -q "Login to Sachdeva" && echo "✅ Login page loads" || echo "❌ Login page failed"

# Test admin dashboard (should redirect to login)
echo "Testing admin access..."
curl -s http://localhost:3000/admin/dashboard | grep -q "redirected" && echo "✅ Admin protection works" || echo "❌ Admin protection failed"

echo "✅ Frontend tests complete!"
```

### Step 2: Complete Testing Checklist

#### 🔐 Authentication Tests
- [ ] Login with valid credentials
- [ ] Login with invalid credentials fails
- [ ] Session persistence works
- [ ] Role-based redirection works
- [ ] Logout clears session
- [ ] Protected routes require auth

#### 📦 Master Data Tests
- [ ] Create new item
- [ ] Edit existing item
- [ ] Search items works
- [ ] Delete item (soft delete)
- [ ] Duplicate SKU prevention
- [ ] Category hierarchy works

#### 📊 Inventory Tests
- [ ] View inventory by store
- [ ] Stock movements recorded
- [ ] Inventory adjustments work
- [ ] Low stock alerts
- [ ] Multi-store sync

#### 🛒 POS Tests
- [ ] POS loads offline
- [ ] Product search works
- [ ] Cart operations work
- [ ] Payment processing
- [ ] Receipt generation
- [ ] Offline sync when online

#### 💳 Payment Tests
- [ ] Cash payments work
- [ ] Card payments work
- [ ] Split payments work
- [ ] Refunds work
- [ ] Gateway configuration

#### 🌐 E-commerce Tests
- [ ] Product catalog loads
- [ ] Shopping cart works
- [ ] Checkout process
- [ ] Order confirmation
- [ ] Inventory deduction

### Step 3: Performance Tests

Create `scripts/performance-test.js`:

```javascript
// Basic performance testing
const performanceTest = async () => {
  const tests = [
    { name: 'Dashboard Load', url: '/admin/dashboard' },
    { name: 'Items List', url: '/api/master/items' },
    { name: 'Inventory View', url: '/api/inventory' }
  ]

  for (const test of tests) {
    const start = Date.now()
    await fetch(`http://localhost:3000${test.url}`)
    const duration = Date.now() - start
    
    console.log(`${test.name}: ${duration}ms ${duration < 1000 ? '✅' : '⚠️'}`)
  }
}
```

### Final Deployment Steps

1. **Environment Setup**
   ```bash
   # Production build
   npm run build
   
   # Database migration
   npx prisma migrate deploy
   
   # Start production server
   npm start
   ```

2. **Security Checklist**
   - [ ] HTTPS enabled
   - [ ] Environment variables secured
   - [ ] Database connections encrypted
   - [ ] Rate limiting enabled
   - [ ] Input validation everywhere
   - [ ] CORS properly configured

3. **Monitoring Setup**
   - [ ] Error tracking (Sentry)
   - [ ] Performance monitoring
   - [ ] Database monitoring
   - [ ] Uptime monitoring
   - [ ] Log aggregation

### 🎉 CONGRATULATIONS!

You have successfully built a **complete ERP + POS + E-commerce system**!

#### 🌟 What You've Accomplished:
✅ **Enterprise-Grade Architecture** - Scalable, maintainable system
✅ **Offline-Capable POS** - Works without internet connection
✅ **Real-Time Inventory** - Live stock tracking across channels
✅ **Multi-Store Support** - Centralized management
✅ **Payment Flexibility** - Multiple gateways and methods
✅ **Role-Based Security** - Granular access control
✅ **Complete Audit Trail** - Full transaction history# 🏪 COMPREHENSIVE ERP + POS + ONLINE STORE BUILD INSTRUCTIONS

## 📋 TABLE OF CONTENTS

1. [🎯 Project Overview](#-project-overview)
2. [⚡ Quick Start Guide](#-quick-start-guide)
3. [🏗️ Project Setup & Architecture](#-project-setup--architecture)
4. [🗄️ Database Schema & Models](#-database-schema--models)
5. [🔐 Authentication & Security](#-authentication--security)
6. [📦 Master Data Management](#-master-data-management)
7. [📊 Inventory Management](#-inventory-management)
8. [💰 Purchase Management](#-purchase-management)
9. [🛒 Sales Management](#-sales-management)
10. [💳 POS System (Offline-First)](#-pos-system-offline-first)
11. [💳 Payment Integration](#-payment-integration)
12. [🌐 E-commerce Store](#-e-commerce-store)
13. [👥 CRM & Loyalty](#-crm--loyalty)
14. [📈 Reports & Analytics](#-reports--analytics)
15. [🏢 Multi-Store & Franchise](#-multi-store--franchise)
16. [⚙️ Settings & Configuration](#-settings--configuration)
17. [🔄 Sync Engine](#-sync-engine)
18. [🚀 Deployment & Production](#-deployment--production)
19. [✅ Testing & Validation](#-testing--validation)

---

## 🎯 PROJECT OVERVIEW

### 🌟 Mission Statement
Build a **complete retail management system** similar to Ginesys with enhanced flexibility, admin control, and offline capabilities.

### 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with RBAC
- **State Management**: Zustand
- **Offline Storage**: IndexedDB
- **Real-time**: Socket.io
- **Payments**: Multi-gateway support (Stripe, Razorpay, etc.)

### 🎯 Core Modules
- 🏢 **ERP (Enterprise Resource Planning)** - Complete business management
- 🛒 **POS (Point of Sale)** - Offline-first store operations  
- 🌐 **E-commerce** - Online store with integrated inventory

### 🔑 Key Features
- ✅ **Offline-first POS** with automatic sync
- ✅ **Admin-configurable payment gateways** 
- ✅ **Multi-store, multi-role architecture**
- ✅ **Hardware integration** for card machines
- ✅ **Real-time inventory** across all channels
- ✅ **Complete audit trail** for compliance
- ✅ **Role-based access control** (RBAC)
- ✅ **Mobile-responsive design**

### 🎯 Business Requirements
- **Multi-tenant architecture** for franchise operations
- **Offline POS capability** for uninterrupted sales
- **Real-time inventory sync** across all channels
- **Configurable payment gateways** from admin panel
- **Complete audit trail** for all transactions
- **Scalable architecture** for enterprise growth

---

## ⚡ QUICK START GUIDE

### 🚀 For Developers (30-minute setup)

```bash
# 1. Clone and setup project
npx create-next-app@latest sachdeva --typescript --tailwind --eslint --app --src-dir=false
cd sachdeva

# 2. Install dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install zustand zod idb idb-keyval stripe razorpay

# 3. Setup database
npx prisma init
npx prisma generate
npx prisma db push

# 4. Start development
npm run dev
```

### 📋 Implementation Phases (8-week timeline)

#### Phase 1: Foundation (Week 1) ⭐ CRITICAL
- [ ] **Project Setup** - Next.js 14 + dependencies *(2 days)*
- [ ] **Database Schema** - Complete Prisma models *(2 days)*
- [ ] **Authentication** - NextAuth + RBAC middleware *(2 days)*
- [ ] **Base Layouts** - Admin, POS, Store layouts *(1 day)*

#### Phase 2: Core Modules (Week 2)
- [ ] **Master Data** - Items, Categories, Customers, Vendors *(3 days)*
- [ ] **Inventory Management** - Multi-store stock tracking *(2 days)*
- [ ] **User Management** - Roles, permissions, store assignments *(1 day)*
- [ ] **Basic Admin Dashboard** - Overview and navigation *(1 day)*

#### Phase 3: Business Operations (Week 3-4)
- [ ] **Purchase Management** - PO → GRN → Inventory updates *(4 days)*
- [ ] **Sales Management** - Orders, invoicing, returns *(3 days)*
- [ ] **POS System** - Offline-capable point of sale *(5 days)*
- [ ] **Payment Integration** - Multiple gateways + hardware *(2 days)*

#### Phase 4: Advanced Features (Week 5-6)
- [ ] **E-commerce Store** - Online shopping experience *(5 days)*
- [ ] **CRM & Loyalty** - Customer management and rewards *(3 days)*
- [ ] **Reports & Analytics** - Business intelligence *(3 days)*
- [ ] **Multi-store & Franchise** - Enterprise scaling *(3 days)*

#### Phase 5: Production Ready (Week 7-8)
- [ ] **Security Hardening** - Audit logs, rate limiting *(2 days)*
- [ ] **Performance Optimization** - Caching, indexing *(2 days)*
- [ ] **DevOps Setup** - Docker, CI/CD, monitoring *(3 days)*
- [ ] **Documentation** - API docs, user guides *(2 days)*
- [ ] **Testing & QA** - Complete system testing *(5 days)*

### 🎯 Success Metrics
- **POS Response Time**: < 500ms for all operations
- **Inventory Sync**: < 2 seconds for stock updates
- **Dashboard Load**: < 1 second for admin dashboard
- **Offline Storage**: Support 10,000+ products locally
- **Concurrent Users**: Support 100+ simultaneous POS terminals

---

## 🏗️ PROJECT SETUP & ARCHITECTURE

### Step 1: Initialize Next.js Project

```bash
# Create new Next.js project with TypeScript and Tailwind
npx create-next-app@latest sachdeva --typescript --tailwind --eslint --app --src-dir=false
cd sachdeva
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter bcryptjs

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip
npm install lucide-react class-variance-authority clsx tailwind-merge

# State Management & Utilities
npm install zustand zod date-fns

# Offline & Real-time
npm install idb idb-keyval socket.io socket.io-client

# Payment Gateways
npm install stripe razorpay @stripe/stripe-js

# Charts & Analytics
npm install recharts

# Development Tools
npm install -D @types/node @types/bcryptjs tsx
```

### Step 3: Project Structure

```
📁 sachdeva/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 globals.css         # Global styles
│   ├── 📁 layout.tsx          # Root layout
│   ├── 📁 page.tsx            # Home page
│   ├── 📁 (auth)/             # Authentication pages
│   │   ├── 📁 login/
│   │   └── 📁 register/
│   ├── 📁 admin/              # Admin dashboard
│   │   ├── 📁 layout.tsx      # Admin layout
│   │   ├── 📁 dashboard/
│   │   ├── 📁 master/
│   │   │   ├── 📁 items/
│   │   │   ├── 📁 categories/
│   │   │   ├── 📁 customers/
│   │   │   └── 📁 vendors/
│   │   ├── 📁 inventory/
│   │   ├── 📁 purchase/
│   │   ├── 📁 sales/
│   │   ├── 📁 reports/
│   │   └── 📁 settings/
│   ├── 📁 pos/               # POS System
│   │   ├── 📁 layout.tsx     # POS layout
│   │   ├── 📁 sales/
│   │   ├── 📁 shift/
│   │   └── 📁 reports/
│   ├── 📁 (storefront)/      # E-commerce store
│   │   ├── 📁 products/
│   │   ├── 📁 cart/
│   │   ├── 📁 checkout/
│   │   └── 📁 account/
│   └── 📁 api/               # API routes
│       ├── 📁 auth/
│       ├── 📁 admin/
│       ├── 📁 master/
│       ├── 📁 inventory/
│       ├── 📁 purchase/
│       ├── 📁 sales/
│       ├── 📁 pos/
│       ├── 📁 payments/
│       ├── 📁 sync/
│       ├── 📁 reports/
│       └── 📁 hardware/
├── 📁 components/            # Reusable components
│   ├── 📁 ui/               # Base UI components
│   ├── 📁 layouts/          # Layout components
│   ├── 📁 forms/            # Form components
│   └── 📁 charts/           # Chart components
├── 📁 lib/                  # Utilities and configurations
│   ├── 📁 auth/
│   ├── 📁 payments/
│   ├── 📁 hardware/
│   ├── 📁 sync/
│   └── 📁 utils/
├── 📁 modules/              # Business logic modules
│   ├── 📁 auth/
│   ├── 📁 inventory/
│   ├── 📁 purchase/
│   ├── 📁 sales/
│   ├── 📁 pos/
│   ├── 📁 crm/
│   ├── 📁 accounting/
│   ├── 📁 logistics/
│   ├── 📁 franchise/
│   └── 📁 reports/
├── 📁 hooks/               # Custom React hooks
├── 📁 types/               # TypeScript type definitions
├── 📁 prisma/              # Database schema and migrations
└── 📁 public/              # Static assets
```

### Step 4: Environment Configuration

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sachdeva_erp"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Redis (for caching and queues)
REDIS_URL="redis://localhost:6379"

# Payment Gateways
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

# File Storage (Optional)
CLOUDINARY_CLOUD_NAME="your-cloud"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Development
NODE_ENV="development"
```

### Step 5: Basic Configuration Files

#### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  }
}

module.exports = nextConfig
```

#### `lib/prisma.ts`
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}
```

---

## 🗄️ DATABASE SCHEMA & MODELS

### Step 1: Initialize Prisma

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma client
npx prisma generate
```

### Step 2: Complete Prisma Schema

Create `prisma/schema.prisma` with the comprehensive database schema:

```prisma
// This is your Prisma schema file
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// AUTHENTICATION & ORGANIZATION MODELS
// ==========================================

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  name         String?
  passwordHash String?
  phone        String?
  avatar       String?
  status       UserStatus @default(ACTIVE)
  
  // Associations
  roleId       String?
  role         Role?     @relation(fields: [roleId], references: [id])
  storeId      String?
  store        Store?    @relation(fields: [storeId], references: [id])
  
  // Audit fields
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  createdBy    String?
  updatedBy    String?
  
  // Relations
  sessions     UserSession[]
  auditLogs    AuditLog[]
  posShifts    POSShift[]
  sales        Sale[]
  
  @@map("users")
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  permissions Json     // Store permissions as JSON array
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users       User[]
  
  @@map("roles")
}

model Store {
  id          String    @id @default(cuid())
  code        String    @unique
  name        String
  type        StoreType @default(OWNED)
  
  // Location
  address     Json?     // Store full address as JSON
  coordinates Json?     // Lat/lng for location services
  
  // Business info
  gstNo       String?
  phone       String?
  email       String?
  
  // Hierarchy
  parentStoreId String?
  parentStore   Store?  @relation("StoreHierarchy", fields: [parentStoreId], references: [id])
  childStores   Store[] @relation("StoreHierarchy")
  
  // Status
  status      StoreStatus @default(ACTIVE)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  users       User[]
  inventory   Inventory[]
  sales       Sale[]
  posTerminals POSTerminal[]
  
  @@map("stores")
}

enum StoreType {
  OWNED
  FRANCHISE
  CONSIGNMENT
}

enum StoreStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
}

// ==========================================
// MASTER DATA MODELS
// ==========================================

model Item {
  id          String   @id @default(cuid())
  sku         String   @unique
  name        String
  description String?
  
  // Classification
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
  brandId     String?
  brand       Brand?    @relation(fields: [brandId], references: [id])
  
  // Pricing
  mrp         Decimal  @db.Decimal(10, 2)
  sellingPrice Decimal @db.Decimal(10, 2)
  costPrice   Decimal  @db.Decimal(10, 2)
  
  // Tax
  taxId       String?
  tax         Tax?     @relation(fields: [taxId], references: [id])
  
  // Product details
  barcode     String?  @unique
  images      Json?    // Array of image URLs
  
  // Flags
  isActive    Boolean  @default(true)
  isOnline    Boolean  @default(true)
  trackStock  Boolean  @default(true)
  allowBackorder Boolean @default(false)
  
  // Physical properties
  weight      Decimal? @db.Decimal(8, 3)
  dimensions  Json?    // Length, width, height
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String?
  updatedBy   String?
  
  // Relations
  inventory   Inventory[]
  saleItems   SaleItem[]
  purchaseOrderItems PurchaseOrderItem[]
  stockMovements StockMovement[]
  
  @@map("items")
}

model Category {
  id          String  @id @default(cuid())
  name        String
  description String?
  slug        String  @unique
  
  // Hierarchy
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  
  // Display
  image       String?
  sortOrder   Int     @default(0)
  isActive    Boolean @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  items       Item[]
  
  @@map("categories")
}

// Additional models continue...
// [Include all other models from the original schema]
```

### Step 3: Database Setup Commands

```bash
# Push schema to database (for development)
npx prisma db push

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Step 4: Seed Database with Initial Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Administrator' },
    update: {},
    create: {
      name: 'Administrator',
      description: 'Full system access',
      permissions: [
        'items:view', 'items:create', 'items:edit', 'items:delete',
        'inventory:view', 'inventory:adjust', 'inventory:transfer',
        'purchase:view', 'purchase:create', 'purchase:approve',
        'sales:view', 'sales:create', 'sales:refund',
        'pos:access', 'pos:shift', 'pos:reports',
        'users:manage', 'roles:manage', 'settings:manage',
        'reports:view', 'reports:export'
      ]
    }
  })

  // Create manager role
  const managerRole = await prisma.role.upsert({
    where: { name: 'Store Manager' },
    update: {},
    create: {
      name: 'Store Manager',
      description: 'Store management access',
      permissions: [
        'items:view', 'items:create', 'items:edit',
        'inventory:view', 'inventory:adjust',
        'purchase:view', 'purchase:create',
        'sales:view', 'sales:create', 'sales:refund',
        'pos:access', 'pos:shift', 'pos:reports',
        'reports:view'
      ]
    }
  })

  // Create POS user role
  const posRole = await prisma.role.upsert({
    where: { name: 'POS Operator' },
    update: {},
    create: {
      name: 'POS Operator',
      description: 'Point of sale access only',
      permissions: [
        'items:view',
        'inventory:view',
        'sales:view', 'sales:create',
        'pos:access'
      ]
    }
  })

  // Create default store
  const mainStore = await prisma.store.upsert({
    where: { code: 'MAIN' },
    update: {},
    create: {
      code: 'MAIN',
      name: 'Main Store',
      type: 'OWNED',
      address: {
        line1: '123 Main Street',
        line2: 'Commercial Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      },
      phone: '+91-98765-43210',
      email: 'mainstore@sachdeva.com',
      gstNo: '27AABCS1234E1Z5',
      status: 'ACTIVE'
    }
  })

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sachdeva.com' },
    update: {},
    create: {
      email: 'admin@sachdeva.com',
      name: 'System Administrator',
      passwordHash: hashedPassword,
      phone: '+91-98765-43210',
      roleId: adminRole.id,
      storeId: mainStore.id,
      status: 'ACTIVE'
    }
  })

  // Create sample categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic items and gadgets',
      sortOrder: 1,
      isActive: true
    }
  })

  const phones = await prisma.category.upsert({
    where: { slug: 'phones' },
    update: {},
    create: {
      name: 'Mobile Phones',
      slug: 'phones',
      description: 'Smartphones and mobile devices',
      parentId: electronics.id,
      sortOrder: 1,
      isActive: true
    }
  })

  // Create sample brands
  const apple = await prisma.brand.upsert({
    where: { name: 'Apple' },
    update: {},
    create: {
      name: 'Apple',
      description: 'Apple Inc. products',
      isActive: true
    }
  })

  const samsung = await prisma.brand.upsert({
    where: { name: 'Samsung' },
    update: {},
    create: {
      name: 'Samsung',
      description: 'Samsung Electronics',
      isActive: true
    }
  })

  // Create sample taxes
  const gst18 = await prisma.tax.upsert({
    where: { name: 'GST 18%' },
    update: {},
    create: {
      name: 'GST 18%',
      rate: 18.00,
      type: 'GST',
      description: 'Goods and Services Tax 18%',
      isActive: true
    }
  })

  // Create sample items
  const iPhone15 = await prisma.item.upsert({
    where: { sku: 'IPHONE15-128-BLK' },
    update: {},
    create: {
      sku: 'IPHONE15-128-BLK',
      name: 'iPhone 15 128GB Black',
      description: 'Latest iPhone 15 with 128GB storage in Black color',
      barcode: '1234567890123',
      mrp: 79900.00,
      sellingPrice: 75900.00,
      costPrice: 65000.00,
      categoryId: phones.id,
      brandId: apple.id,
      taxId: gst18.id,
      isActive: true,
      isOnline: true,
      trackStock: true,
      weight: 0.171,
      dimensions: {
        length: 147.6,
        width: 71.6,
        height: 7.80
      },
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
      ]
    }
  })

  // Create initial inventory
  await prisma.inventory.upsert({
    where: {
      storeId_itemId_batchNo: {
        storeId: mainStore.id,
        itemId: iPhone15.id,
        batchNo: null
      }
    },
    update: {},
    create: {
      storeId: mainStore.id,
      itemId: iPhone15.id,
      quantity: 50,
      reservedQty: 0,
      avgCost: 65000.00,
      lastCost: 65000.00
    }
  })

  // Create sample customer
  await prisma.customer.upsert({
    where: { code: 'CUST001' },
    update: {},
    create: {
      code: 'CUST001',
      name: 'John Doe',
      phone: '+91-98765-43211',
      email: 'john.doe@example.com',
      loyaltyPoints: 100,
      loyaltyTier: 'GOLD',
      addresses: [{
        type: 'HOME',
        line1: '456 Customer Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400002',
        country: 'India'
      }],
      isActive: true
    }
  })

  // Create POS terminal
  await prisma.pOSTerminal.upsert({
    where: { code: 'POS001' },
    update: {},
    create: {
      code: 'POS001',
      name: 'Main Counter Terminal',
      storeId: mainStore.id,
      status: 'ACTIVE',
      hardwareProfile: {
        printer: {
          type: 'thermal',
          port: 'USB001'
        },
        cashDrawer: {
          enabled: true,
          port: 'USB002'
        },
        scanner: {
          enabled: true,
          type: 'handheld'
        }
      }
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Admin login: admin@sachdeva.com')
  console.log('🔑 Admin password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### Step 5: Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio"
  }
}
```

### Step 6: Run Database Setup

```bash
# Setup database and seed data
npm run db:push
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio
```

### ✅ Validation Checklist
- [ ] Database schema created successfully
- [ ] All models have proper relationships
- [ ] Seed data created (admin user, sample store, items)
- [ ] Can login with admin@sachdeva.com / admin123
- [ ] Prisma Studio shows all tables with data

```prisma
// This is your Prisma schema file
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// AUTHENTICATION & ORGANIZATION MODELS
// ==========================================

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  name         String?
  passwordHash String?
  phone        String?
  avatar       String?
  status       UserStatus @default(ACTIVE)
  
  // Associations
  roleId       String?
  role         Role?     @relation(fields: [roleId], references: [id])
  storeId      String?
  store        Store?    @relation(fields: [storeId], references: [id])
  
  // Audit fields
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  createdBy    String?
  updatedBy    String?
  
  // Relations
  sessions     UserSession[]
  auditLogs    AuditLog[]
  posShifts    POSShift[]
  sales        Sale[]
  
  @@map("users")
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  permissions Json     // Store permissions as JSON array
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users       User[]
  
  @@map("roles")
}

model UserSession {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  token     String   @unique
  expiresAt DateTime
  
  createdAt DateTime @default(now())
  
  @@map("user_sessions")
}

model Store {
  id          String    @id @default(cuid())
  code        String    @unique
  name        String
  type        StoreType @default(OWNED)
  
  // Location
  address     Json?     // Store full address as JSON
  coordinates Json?     // Lat/lng for location services
  
  // Business info
  gstNo       String?
  phone       String?
  email       String?
  
  // Hierarchy
  parentStoreId String?
  parentStore   Store?  @relation("StoreHierarchy", fields: [parentStoreId], references: [id])
  childStores   Store[] @relation("StoreHierarchy")
  
  // Status
  status      StoreStatus @default(ACTIVE)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  users       User[]
  inventory   Inventory[]
  sales       Sale[]
  posTerminals POSTerminal[]
  
  @@map("stores")
}

enum StoreType {
  OWNED
  FRANCHISE
  CONSIGNMENT
}

enum StoreStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
}

// ==========================================
// MASTER DATA MODELS
// ==========================================

model Item {
  id          String   @id @default(cuid())
  sku         String   @unique
  name        String
  description String?
  
  // Classification
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
  brandId     String?
  brand       Brand?    @relation(fields: [brandId], references: [id])
  
  // Pricing
  mrp         Decimal  @db.Decimal(10, 2)
  sellingPrice Decimal @db.Decimal(10, 2)
  costPrice   Decimal  @db.Decimal(10, 2)
  
  // Tax
  taxId       String?
  tax         Tax?     @relation(fields: [taxId], references: [id])
  
  // Product details
  barcode     String?  @unique
  images      Json?    // Array of image URLs
  
  // Flags
  isActive    Boolean  @default(true)
  isOnline    Boolean  @default(true)
  trackStock  Boolean  @default(true)
  allowBackorder Boolean @default(false)
  
  // Physical properties
  weight      Decimal? @db.Decimal(8, 3)
  dimensions  Json?    // Length, width, height
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String?
  updatedBy   String?
  
  // Relations
  inventory   Inventory[]
  saleItems   SaleItem[]
  purchaseOrderItems PurchaseOrderItem[]
  stockMovements StockMovement[]
  
  @@map("items")
}

model Category {
  id          String  @id @default(cuid())
  name        String
  description String?
  slug        String  @unique
  
  // Hierarchy
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  
  // Display
  image       String?
  sortOrder   Int     @default(0)
  isActive    Boolean @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  items       Item[]
  
  @@map("categories")
}

model Brand {
  id          String  @id @default(cuid())
  name        String  @unique
  description String?
  logo        String?
  website     String?
  isActive    Boolean @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  items       Item[]
  
  @@map("brands")
}

model Tax {
  id          String  @id @default(cuid())
  name        String
  rate        Decimal @db.Decimal(5, 2)
  type        TaxType
  description String?
  isActive    Boolean @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  items       Item[]
  
  @@map("taxes")
}

enum TaxType {
  GST
  VAT
  FLAT
  NONE
}

model Customer {
  id           String  @id @default(cuid())
  code         String  @unique
  name         String
  phone        String?
  email        String?
  
  // Loyalty
  loyaltyPoints Int    @default(0)
  loyaltyTier   String @default("BRONZE")
  
  // Personal details
  dateOfBirth  DateTime?
  anniversary  DateTime?
  gender       String?
  
  // Address (JSON for flexibility)
  addresses    Json?
  
  // Business info (for B2B customers)
  gstNo        String?
  creditLimit  Decimal? @db.Decimal(12, 2)
  creditTerms  Int?     // Days
  
  // Status
  isActive     Boolean  @default(true)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  sales        Sale[]
  loyaltyTransactions LoyaltyTransaction[]
  
  @@map("customers")
}

model Vendor {
  id          String  @id @default(cuid())
  code        String  @unique
  name        String
  
  // Contact
  phone       String?
  email       String?
  website     String?
  
  // Business details
  gstNo       String?
  panNo       String?
  
  // Address
  address     Json?
  
  // Payment terms
  paymentTerms Int?   // Days
  creditLimit  Decimal? @db.Decimal(12, 2)
  
  // Banking
  bankDetails Json?
  
  // Status
  isActive    Boolean @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  purchaseOrders PurchaseOrder[]
  
  @@map("vendors")
}

// ==========================================
// INVENTORY & WAREHOUSE MODELS
// ==========================================

model Inventory {
  id         String @id @default(cuid())
  
  storeId    String
  store      Store  @relation(fields: [storeId], references: [id])
  itemId     String
  item       Item   @relation(fields: [itemId], references: [id])
  
  quantity   Decimal @db.Decimal(10, 3)
  reservedQty Decimal @default(0) @db.Decimal(10, 3)
  
  // Optional batch/serial tracking
  batchNo    String?
  serialNo   String?
  expiryDate DateTime?
  
  // Location within store
  binLocation String?
  
  // Costing
  avgCost    Decimal @db.Decimal(10, 2)
  lastCost   Decimal @db.Decimal(10, 2)
  
  updatedAt  DateTime @updatedAt
  
  @@unique([storeId, itemId, batchNo])
  @@map("inventory")
}

model StockMovement {
  id          String @id @default(cuid())
  
  type        StockMovementType
  itemId      String
  item        Item   @relation(fields: [itemId], references: [id])
  
  fromStoreId String?
  fromStore   Store? @relation("StockMovementFrom", fields: [fromStoreId], references: [id])
  toStoreId   String?
  toStore     Store? @relation("StockMovementTo", fields: [toStoreId], references: [id])
  
  quantity    Decimal @db.Decimal(10, 3)
  unitCost    Decimal @db.Decimal(10, 2)
  
  // Reference document
  referenceType String? // SALE, PURCHASE, TRANSFER, ADJUSTMENT
  referenceId   String?
  
  reason      String?
  notes       String?
  
  createdAt   DateTime @default(now())
  createdBy   String?
  
  @@map("stock_movements")
}

enum StockMovementType {
  IN
  OUT
  TRANSFER
  ADJUSTMENT
}

// ==========================================
// PURCHASE MANAGEMENT MODELS
// ==========================================

model PurchaseOrder {
  id          String @id @default(cuid())
  poNumber    String @unique
  
  vendorId    String
  vendor      Vendor @relation(fields: [vendorId], references: [id])
  storeId     String
  store       Store  @relation("POStore", fields: [storeId], references: [id])
  
  status      POStatus @default(DRAFT)
  
  // Amounts
  subtotal    Decimal @db.Decimal(12, 2)
  taxTotal    Decimal @db.Decimal(12, 2)
  total       Decimal @db.Decimal(12, 2)
  
  // Dates
  orderDate   DateTime @default(now())
  expectedDate DateTime?
  
  notes       String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String?
  
  items       PurchaseOrderItem[]
  receipts    GoodsReceipt[]
  
  @@map("purchase_orders")
}

enum POStatus {
  DRAFT
  SUBMITTED
  APPROVED
  PARTIALLY_RECEIVED
  RECEIVED
  CLOSED
  CANCELLED
}

model PurchaseOrderItem {
  id            String @id @default(cuid())
  
  purchaseOrderId String
  purchaseOrder   PurchaseOrder @relation(fields: [purchaseOrderId], references: [id])
  itemId          String
  item            Item   @relation(fields: [itemId], references: [id])
  
  quantity        Decimal @db.Decimal(10, 3)
  receivedQty     Decimal @default(0) @db.Decimal(10, 3)
  unitPrice       Decimal @db.Decimal(10, 2)
  total           Decimal @db.Decimal(12, 2)
  
  @@map("purchase_order_items")
}

model GoodsReceipt {
  id              String @id @default(cuid())
  grnNumber       String @unique
  
  purchaseOrderId String
  purchaseOrder   PurchaseOrder @relation(fields: [purchaseOrderId], references: [id])
  
  receivedDate    DateTime @default(now())
  receivedBy      String
  
  notes           String?
  
  createdAt       DateTime @default(now())
  
  items           GoodsReceiptItem[]
  
  @@map("goods_receipts")
}

model GoodsReceiptItem {
  id              String @id @default(cuid())
  
  goodsReceiptId  String
  goodsReceipt    GoodsReceipt @relation(fields: [goodsReceiptId], references: [id])
  itemId          String
  item            Item   @relation("GRNItems", fields: [itemId], references: [id])
  
  orderedQty      Decimal @db.Decimal(10, 3)
  receivedQty     Decimal @db.Decimal(10, 3)
  unitPrice       Decimal @db.Decimal(10, 2)
  
  batchNo         String?
  expiryDate      DateTime?
  
  @@map("goods_receipt_items")
}

// ==========================================
// SALES MANAGEMENT MODELS
// ==========================================

model Sale {
  id          String @id @default(cuid())
  saleNumber  String @unique
  
  channel     SaleChannel
  
  storeId     String
  store       Store    @relation(fields: [storeId], references: [id])
  customerId  String?
  customer    Customer? @relation(fields: [customerId], references: [id])
  
  // User who created the sale
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  
  status      SaleStatus @default(DRAFT)
  
  // Amounts
  subtotal    Decimal @db.Decimal(12, 2)
  taxTotal    Decimal @db.Decimal(12, 2)
  discountTotal Decimal @default(0) @db.Decimal(12, 2)
  total       Decimal @db.Decimal(12, 2)
  
  // Loyalty points
  pointsEarned Int @default(0)
  pointsRedeemed Int @default(0)
  
  // Payment
  paymentStatus PaymentStatus @default(PENDING)
  
  // Dates
  saleDate    DateTime @default(now())
  
  notes       String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  items       SaleItem[]
  payments    Payment[]
  
  @@map("sales")
}

enum SaleChannel {
  POS
  ONLINE
  WHOLESALE
  PHONE
}

enum SaleStatus {
  DRAFT
  CONFIRMED
  SHIPPED
  DELIVERED
  RETURNED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PARTIAL
  PAID
  REFUNDED
}

model SaleItem {
  id          String @id @default(cuid())
  
  saleId      String
  sale        Sale   @relation(fields: [saleId], references: [id])
  itemId      String
  item        Item   @relation(fields: [itemId], references: [id])
  
  quantity    Decimal @db.Decimal(10, 3)
  unitPrice   Decimal @db.Decimal(10, 2)
  discountPercent Decimal @default(0) @db.Decimal(5, 2)
  discountAmount  Decimal @default(0) @db.Decimal(10, 2)
  taxAmount   Decimal @default(0) @db.Decimal(10, 2)
  total       Decimal @db.Decimal(12, 2)
  
  @@map("sale_items")
}

// ==========================================
// POS SYSTEM MODELS
// ==========================================

model POSTerminal {
  id          String @id @default(cuid())
  code        String @unique
  name        String
  
  storeId     String
  store       Store  @relation(fields: [storeId], references: [id])
  
  // Hardware info
  deviceId    String?
  macAddress  String?
  ipAddress   String?
  
  status      TerminalStatus @default(INACTIVE)
  
  // Configuration
  hardwareProfile Json? // Printer, cash drawer, scanner settings
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  shifts      POSShift[]
  
  @@map("pos_terminals")
}

enum TerminalStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
}

model POSShift {
  id              String @id @default(cuid())
  
  terminalId      String
  terminal        POSTerminal @relation(fields: [terminalId], references: [id])
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  
  openTime        DateTime @default(now())
  closeTime       DateTime?
  
  openingBalance  Decimal @db.Decimal(10, 2)
  closingBalance  Decimal? @db.Decimal(10, 2)
  
  // Cash counts
  expectedCash    Decimal? @db.Decimal(10, 2)
  actualCash      Decimal? @db.Decimal(10, 2)
  variance        Decimal? @db.Decimal(10, 2)
  
  status          ShiftStatus @default(OPEN)
  
  notes           String?
  
  @@map("pos_shifts")
}

enum ShiftStatus {
  OPEN
  CLOSED
}

// ==========================================
// PAYMENT MODELS
// ==========================================

model Payment {
  id            String @id @default(cuid())
  
  saleId        String
  sale          Sale   @relation(fields: [saleId], references: [id])
  
  amount        Decimal @db.Decimal(12, 2)
  method        PaymentMethod
  
  // Gateway info
  gateway       String? // stripe, razorpay, etc.
  transactionId String?
  gatewayResponse Json?
  
  status        PaymentStatus @default(PENDING)
  
  // For cash payments
  cashTendered  Decimal? @db.Decimal(12, 2)
  changeGiven   Decimal? @db.Decimal(12, 2)
  
  // For card payments
  cardLast4     String?
  cardType      String?
  
  processedAt   DateTime?
  createdAt     DateTime @default(now())
  
  @@map("payments")
}

enum PaymentMethod {
  CASH
  CARD
  UPI
  WALLET
  BANK_TRANSFER
  LOYALTY_POINTS
}

model PaymentGatewayConfig {
  id          String @id @default(cuid())
  name        String
  provider    String  // stripe, razorpay, paytm, etc.
  
  // Credentials
  apiKey      String
  apiSecret   String
  webhookSecret String?
  
  // Configuration
  isActive    Boolean @default(false)
  isTest      Boolean @default(true)
  
  // Channel availability
  allowedChannels Json // ["POS", "ONLINE", "WHOLESALE"]
  
  // Store-specific (optional)
  storeId     String?
  
  extraConfig Json? // Provider-specific settings
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("payment_gateway_configs")
}

// ==========================================
// CRM & LOYALTY MODELS
// ==========================================

model LoyaltyTransaction {
  id          String @id @default(cuid())
  
  customerId  String
  customer    Customer @relation(fields: [customerId], references: [id])
  
  type        LoyaltyType
  points      Int
  
  // Reference to source transaction
  saleId      String?
  
  description String?
  expiryDate  DateTime?
  
  createdAt   DateTime @default(now())
  
  @@map("loyalty_transactions")
}

enum LoyaltyType {
  EARNED
  REDEEMED
  EXPIRED
  ADJUSTED
}

// ==========================================
// SYSTEM & AUDIT MODELS
// ==========================================

model AuditLog {
  id          String @id @default(cuid())
  
  userId      String?
  user        User?  @relation(fields: [userId], references: [id])
  
  action      String
  module      String
  description String?
  
  // Request details
  ipAddress   String?
  userAgent   String?
  
  // Data changes
  oldData     Json?
  newData     Json?
  
  createdAt   DateTime @default(now())
  
  @@map("audit_logs")
}

model CompanySetting {
  id          String @id @default(cuid())
  key         String @unique
  value       Json
  description String?
  
  updatedAt   DateTime @updatedAt
  updatedBy   String?
  
  @@map("company_settings")
}

// ==========================================
// OFFLINE SYNC MODELS
// ==========================================

model OfflineTransaction {
  id          String @id @default(cuid())
  
  localId     String // Client-generated ID
  terminalId  String
  
  type        String // SALE, STOCK_MOVEMENT, etc.
  payload     Json   // The actual transaction data
  
  status      SyncStatus @default(PENDING)
  syncedAt    DateTime?
  error       String?
  
  createdAt   DateTime @default(now())
  
  @@unique([localId, terminalId])
  @@map("offline_transactions")
}

enum SyncStatus {
  PENDING
  SYNCED
  FAILED
  CONFLICT
}
```

### Key Schema Features:

1. **🔐 Complete Auth System** - Users, roles, permissions with RBAC
2. **🏪 Multi-store Support** - Hierarchical store structure with types
3. **📦 Comprehensive Master Data** - Items, categories, brands, customers, vendors
4. **📊 Real-time Inventory** - Multi-location stock tracking with movements
5. **💰 Full Purchase Cycle** - PO → GRN → Inventory updates
6. **🛒 Complete Sales Flow** - Multi-channel sales with payment integration
7. **💳 Payment Flexibility** - Multiple methods and gateway configurations
8. **📱 POS Support** - Terminals, shifts, offline transaction handling
9. **🎯 CRM & Loyalty** - Customer management with points system
10. **🔍 Audit & Compliance** - Complete audit trail for all operations

3. AUTHENTICATION & RBAC MODULE
Goal: lock everything down.

Use NextAuth with credentials provider.

On login, load user’s role + store.

Create a middleware that:

Checks session

Checks role permissions for route (e.g. /app/(admin) → ADMIN only)

Create RBAC table / config: which role can see which module.

Create Admin UI to manage:

Users

Roles

Store associations

Allowed payment gateways per store

4. MASTER DATA MODULE
Purpose: single source of truth for products, customers, vendors.

Create /app/(admin)/master/... pages to manage:

Items (CRUD, bulk import, assign barcode, images via Cloudinary)

Categories

Brands

Taxes

Customers

Vendors

Stores

Create /api/master/... routes:

POST /api/master/items

GET /api/master/items?search=...&page=...

etc.

All POS and E-Com must read from these master tables.

---

## 3. 🔐 AUTHENTICATION & RBAC MODULE

### Goal: Complete Security & Access Control

Create a robust authentication system with role-based permissions.

### Step 1: Setup NextAuth Configuration

Create `lib/auth.ts`:
```typescript
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            role: {
              select: {
                id: true,
                name: true,
                permissions: true
              }
            },
            store: {
              select: {
                id: true,
                code: true,
                name: true,
                type: true
              }
            }
          }
        })

        if (!user || !user.passwordHash) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        if (user.status !== 'ACTIVE') {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          store: user.store,
          permissions: user.role?.permissions || []
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.store = user.store
        token.permissions = user.permissions
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.store = token.store
        session.user.permissions = token.permissions
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/auth/error"
  }
}
```

### Step 2: Create Middleware for Route Protection

Create `middleware.ts`:
```typescript
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/register", "/api/auth"]
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    // Admin routes require ADMIN role
    if (pathname.startsWith("/admin")) {
      if (!token?.role?.name || !["ADMIN", "MANAGER"].includes(token.role.name)) {
        return NextResponse.redirect(new URL("/auth/unauthorized", req.url))
      }
    }

    // POS routes require POS_USER or higher
    if (pathname.startsWith("/pos")) {
      if (!token?.role?.name || !["ADMIN", "MANAGER", "POS_USER"].includes(token.role.name)) {
        return NextResponse.redirect(new URL("/auth/unauthorized", req.url))
      }
    }

    // API route protection
    if (pathname.startsWith("/api/admin")) {
      if (!token?.role?.name || !["ADMIN", "MANAGER"].includes(token.role.name)) {
        return new NextResponse(
          JSON.stringify({ success: false, message: 'Unauthorized' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        )
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/pos/:path*',
    '/api/admin/:path*',
    '/api/pos/:path*',
    '/api/master/:path*',
    '/api/inventory/:path*',
    '/api/purchase/:path*',
    '/api/sales/:path*'
  ]
}
```

### Step 3: Permission System

Create `lib/permissions.ts`:
```typescript
export const PERMISSIONS = {
  // Master Data
  ITEMS_VIEW: 'items:view',
  ITEMS_CREATE: 'items:create',
  ITEMS_EDIT: 'items:edit',
  ITEMS_DELETE: 'items:delete',
  
  // Inventory
  INVENTORY_VIEW: 'inventory:view',
  INVENTORY_ADJUST: 'inventory:adjust',
  INVENTORY_TRANSFER: 'inventory:transfer',
  
  // Purchase
  PURCHASE_VIEW: 'purchase:view',
  PURCHASE_CREATE: 'purchase:create',
  PURCHASE_APPROVE: 'purchase:approve',
  
  // Sales
  SALES_VIEW: 'sales:view',
  SALES_CREATE: 'sales:create',
  SALES_REFUND: 'sales:refund',
  
  // POS
  POS_ACCESS: 'pos:access',
  POS_SHIFT: 'pos:shift',
  POS_REPORTS: 'pos:reports',
  
  // Admin
  USERS_MANAGE: 'users:manage',
  ROLES_MANAGE: 'roles:manage',
  SETTINGS_MANAGE: 'settings:manage',
  
  // Reports
  REPORTS_VIEW: 'reports:view',
  REPORTS_EXPORT: 'reports:export'
} as const

export const DEFAULT_ROLES = {
  ADMIN: {
    name: 'Administrator',
    permissions: Object.values(PERMISSIONS)
  },
  MANAGER: {
    name: 'Store Manager',
    permissions: [
      PERMISSIONS.ITEMS_VIEW,
      PERMISSIONS.ITEMS_CREATE,
      PERMISSIONS.ITEMS_EDIT,
      PERMISSIONS.INVENTORY_VIEW,
      PERMISSIONS.INVENTORY_ADJUST,
      PERMISSIONS.PURCHASE_VIEW,
      PERMISSIONS.PURCHASE_CREATE,
      PERMISSIONS.SALES_VIEW,
      PERMISSIONS.SALES_CREATE,
      PERMISSIONS.SALES_REFUND,
      PERMISSIONS.POS_ACCESS,
      PERMISSIONS.POS_SHIFT,
      PERMISSIONS.POS_REPORTS,
      PERMISSIONS.REPORTS_VIEW
    ]
  },
  POS_USER: {
    name: 'POS Operator',
    permissions: [
      PERMISSIONS.ITEMS_VIEW,
      PERMISSIONS.INVENTORY_VIEW,
      PERMISSIONS.SALES_VIEW,
      PERMISSIONS.SALES_CREATE,
      PERMISSIONS.POS_ACCESS
    ]
  },
  VIEWER: {
    name: 'Read Only',
    permissions: [
      PERMISSIONS.ITEMS_VIEW,
      PERMISSIONS.INVENTORY_VIEW,
      PERMISSIONS.SALES_VIEW,
      PERMISSIONS.REPORTS_VIEW
    ]
  }
}

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission)
}

export function hasAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.some(permission => userPermissions.includes(permission))
}
```

---

## 4. 📦 MASTER DATA MODULE
Matches Ginesys-style inventory.

Features to implement:

Multi-store inventory

Each item has stock per store.

Stock movements

Purchase receipt increases stock.

Sales decreases stock.

Store-to-store transfer (with approval).

Adjustments (damage/loss).

Batches / Serials

Optional per item.

Stock audit

Enter physical count, compare with system, post variance.

Reorder rules

Alert when an item in a store less than minQty.

Reports

Stock on hand

Stock aging

Slow-moving items

API endpoints:

/api/inventory

/api/inventory/transfer

/api/inventory/audit

6. PROCUREMENT / PURCHASE MODULE
Purpose: bring goods in.

Vendor master (already in master)

PO lifecycle: Draft → Submitted → Approved → Partially Received → Closed

GRN (Goods Receipt Note): receiving against PO

Purchase Return

Vendor performance (delivery time, rejection)

Auto-PO from low stock (optional)

Update inventory on GRN

Pages:

/app/(admin)/purchase/orders

/app/(admin)/purchase/vendors

/app/(admin)/purchase/grn

APIs:

/api/purchase/orders

/api/purchase/grn

7. SALES / ORDER MANAGEMENT MODULE
Purpose: unify POS + online sales + B2B/franchise sales.

Features:

Sales order model with status

Pricing engine (use master price + promotions)

Returns / exchanges

Channel field: POS / ONLINE / WHOLESALE

Generate invoice PDF

Post to accounting automatically

APIs:

/api/sales

/api/sales/returns

/api/sales/invoice

8. POS MODULE (OFFLINE-FIRST)
This is mandatory from the user.

Create /app/(pos)/sales:

Fast UI (React client component)

Product search + barcode scan

Cart (add, remove, change qty)

Discount, promotion apply

Customer select

Payment screen with multiple methods:

Cash

Card (via swipe machine)

UPI

Wallet

Split payments

Receipt print

Shift open/close

Day-end (Z-report)

Offline logic:

Use IndexedDB to store:

posItems (local item cache)

pendingSales (when offline)

pendingStockMovements

When navigator.onLine becomes true:

Call /api/sync/sales with batch of pending sales

Server returns success/fail per item

Mark local records as synced

Show sync indicator in UI

Add retry with exponential backoff

If conflict (same sale id) → server wins

Create service worker / or simple online handler in React that listens to window.addEventListener('online').

9. HARDWARE / MACHINE INTEGRATION MODULE
Admin must be able to configure payment & hardware.

Create:

/modules/hardware/PaymentDevice.ts

Defines interface: connect(), startTransaction(amount), cancel(), getStatus()

Drivers: VerifoneDriver, IngenicoDriver, BharatPeDriver, MockDriver

/api/hardware/devices to list/add/remove devices

Store device config in DB (PaymentDevice model)

POS page should:

Load active device for that terminal

If card payment selected → call device driver

Capture transactionId and save in Payment

Admin UI:

/app/(admin)/settings/payments

/app/(admin)/settings/devices

Fields:

Device type

Connection (USB/LAN/IP)

Provider

Enabled: yes/no

10. PAYMENT GATEWAY MODULE (DYNAMIC)
Create a payment adapter layer:

/lib/payments/PaymentAdapter.ts → base class

/lib/payments/StripeAdapter.ts

/lib/payments/RazorpayAdapter.ts

/lib/payments/PaytmAdapter.ts

/lib/payments/CashfreeAdapter.ts

/lib/payments/PaypalAdapter.ts

Create DB model PaymentGatewayConfig:

name

provider

apiKey

apiSecret

active

extraConfig (JSON)

allowedChannels (POS, ONLINE, BOTH)

Create admin page to manage gateways:

add/enable/disable

test connection

Create API:

POST /api/payments/session → create payment intent/order depending on provider

POST /api/payments/webhook → handle provider webhooks

POS must check:

If POS uses SWIPE → go via hardware

If POS uses UPI → generate UPI QR

If ONLINE → redirect to provider

All payments must save into Payment table and link to Sale.

11. ONLINE STORE / E-COM MODULE
Create these pages:

/ (home, featured items)

/products (listing)

/category/[slug] (category view)

/products/[id-or-slug] (product detail)

/cart

/checkout

/orders

/account

Features:

Use ERP item master as source

Show only items with isOnline = true

Stock check before checkout

Pricing/promo from ERP

Payment via dynamic gateway

On successful order:

Create Sale (channel = ONLINE)

Create Order

Reduce inventory

Send email

Support:

Click & Collect (pickup from store)

Ship-from-store (fulfil from nearest store)

Customer can see loyalty points

12. CRM & LOYALTY MODULE
Features:

Central customer master (POS + online share same customers)

Earn loyalty points per transaction (configurable in admin)

Redeem points in POS and Online

Campaigns (admin creates, assigns to customer groups)

Store purchase history per customer

APIs:

/api/crm/customers

/api/crm/loyalty

/api/crm/campaigns

13. ACCOUNTING / FINANCIAL MODULE
Even if it’s light, include:

Chart of Accounts (admin-configurable)

Auto journal entries for:

Sales

Purchase

Returns

Payments

AR/AP reports

GST/VAT reports

Petty cash (per store)

Export to CSV

APIs:

/api/accounting/journals

/api/accounting/reports

14. LOGISTICS & FULFILMENT MODULE
For online orders:

Pick/Pack/Ship flow

Assign courier (can be simple text field at first)

Save tracking number

Update order status → customer portal

Handle returns / reverse logistics

APIs:

/api/logistics/shipments

15. FRANCHISE / MULTI-STORE MODULE
Because Ginesys-style systems support this:

Define store types (OWNED / FRANCHISE / CONSIGNMENT)

Head Office can push:

Items

Prices

Promotions

Franchise can view:

Their sales

Their stock

Their royalty (if applicable)

Consignment stock: stock stays HO’s property until sold

16. REPORTS & DASHBOARDS MODULE
Create /app/(admin)/reports with:

Sales by store, by channel, by item, by date

Inventory valuation

Slow moving items

Purchase vs sales

Top customers

POS shift / cashier performance

Export to CSV/PDF

Also add realtime dashboards:

use Socket.io to push new sales

show "Today’s Sales", "Online Orders", "Pending Shipments"

17. SETTINGS / ADMIN MODULE
Everything must be editable here:

Company info

Stores

Payment gateways

Hardware

Tax & currency

Roles & permissions (matrix)

Notification templates (email, sms)

Sync/queue monitor (failed syncs from POS)

18. SYNC ENGINE (OFFLINE → MASTER)
Define sync routes:

POST /api/sync/sales

POST /api/sync/inventory

POST /api/sync/pos-shifts

Server should:

validate payload

check duplicates

write to DB

return per-record status

Client (POS) should:

keep unsent records in IndexedDB

try again on interval (e.g. 60s) or on online event

19. SECURITY & AUDIT
Every API must log userId, ip, action to AuditLog

Rate-limit auth routes

Validate input with Zod

Use HTTPS (prod)

Hide secrets (env)

Allow admin to view audit logs

20. DEVOPS NOTES (FOR GENERATION)
Ask Copilot to also generate:

Dockerfile

docker-compose.yml (postgres + redis)

GitHub Actions (lint, test, build)

Seed script to create:

1 admin

2 stores

10 items

1 payment gateway (test)

1 POS terminal

21. CODING STANDARDS
TypeScript strict

Use server actions where suitable

Keep business logic in /modules/** not in API handlers

Reusable UI in /components/**

Document APIs with JSDoc or OpenAPI if possible

---

## 🎊 IMPLEMENTATION COMPLETION GUIDE

### 🚀 Quick Start Commands

After setting up the project structure, run these commands to get started:

```bash
# 1. Initialize the database
npx prisma generate
npx prisma db push

# 2. Seed initial data
npx prisma db seed

# 3. Start development server
npm run dev
```

### 📝 Implementation Order

Follow this exact order for best results:

#### Phase 1: Foundation (Week 1)
1. **Project Setup** - Initialize Next.js project with all dependencies
2. **Database Setup** - Create Prisma schema and initial migration
3. **Authentication** - Implement NextAuth with RBAC
4. **Base Layouts** - Create AdminLayout, POSLayout, StorefrontLayout

#### Phase 2: Master Data (Week 2)
1. **Items Management** - Complete CRUD with search and filtering
2. **Categories & Brands** - Hierarchical category system
3. **Customer Management** - Full customer profiles with loyalty
4. **Vendor Management** - Supplier information and terms

#### Phase 3: Operations (Week 3-4)
1. **Inventory System** - Multi-store stock tracking
2. **Purchase Management** - PO → GRN → Stock updates
3. **Sales Management** - Multi-channel order processing
4. **Basic Reports** - Essential business metrics

#### Phase 4: POS System (Week 5)
1. **POS Interface** - Fast, touch-friendly interface
2. **Offline Storage** - IndexedDB implementation
3. **Payment Integration** - Multiple payment methods
4. **Receipt Printing** - Thermal printer support

#### Phase 5: E-commerce (Week 6)
1. **Storefront** - Customer-facing online store
2. **Shopping Cart** - Full cart functionality
3. **Checkout Process** - Multi-step checkout with payments
4. **Customer Portal** - Order history and account management

#### Phase 6: Advanced Features (Week 7-8)
1. **Advanced Reports** - Comprehensive analytics
2. **CRM & Loyalty** - Customer relationship management
3. **Multi-store Features** - Franchise and consignment
4. **Hardware Integration** - Card readers and barcode scanners

### 🔧 Key Configuration Files

Create these essential configuration files:

#### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  }
}

module.exports = nextConfig
```

#### `lib/prisma.ts`
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### `prisma/seed.ts`
```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create default roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'Administrator',
      description: 'Full system access',
      permissions: [
        'items:view', 'items:create', 'items:edit', 'items:delete',
        'inventory:view', 'inventory:adjust', 'inventory:transfer',
        'purchase:view', 'purchase:create', 'purchase:approve',
        'sales:view', 'sales:create', 'sales:refund',
        'pos:access', 'pos:shift', 'pos:reports',
        'users:manage', 'roles:manage', 'settings:manage',
        'reports:view', 'reports:export'
      ]
    }
  })

  // Create default store
  const defaultStore = await prisma.store.create({
    data: {
      code: 'MAIN',
      name: 'Main Store',
      type: 'OWNED',
      address: {
        line1: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      },
      status: 'ACTIVE'
    }
  })

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  await prisma.user.create({
    data: {
      email: 'admin@sachdeva.com',
      name: 'System Administrator',
      passwordHash: hashedPassword,
      roleId: adminRole.id,
      storeId: defaultStore.id,
      status: 'ACTIVE'
    }
  })

  // Create sample categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic items and gadgets'
    }
  })

  // Create sample brands
  const apple = await prisma.brand.create({
    data: {
      name: 'Apple',
      description: 'Apple Inc. products'
    }
  })

  // Create sample tax
  const gst18 = await prisma.tax.create({
    data: {
      name: 'GST 18%',
      rate: 18.00,
      type: 'GST'
    }
  })

  // Create sample items
  await prisma.item.create({
    data: {
      sku: 'IPHONE15-128-BLK',
      name: 'iPhone 15 128GB Black',
      description: 'Latest iPhone 15 with 128GB storage in Black color',
      barcode: '1234567890123',
      mrp: 79900.00,
      sellingPrice: 75900.00,
      costPrice: 65000.00,
      categoryId: electronics.id,
      brandId: apple.id,
      taxId: gst18.id,
      isActive: true,
      isOnline: true,
      trackStock: true
    }
  })

  // Create initial inventory for the item
  const item = await prisma.item.findFirst()
  if (item) {
    await prisma.inventory.create({
      data: {
        storeId: defaultStore.id,
        itemId: item.id,
        quantity: 50,
        reservedQty: 0,
        avgCost: 65000.00,
        lastCost: 65000.00
      }
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 📦 Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio"
  }
}
```

### 🔒 Security Checklist

Before going to production:

- [ ] **Environment Variables** - Secure all API keys and secrets
- [ ] **Database Security** - Enable SSL and proper user permissions
- [ ] **HTTPS** - Force HTTPS in production
- [ ] **Rate Limiting** - Implement rate limiting on APIs
- [ ] **Input Validation** - Validate all inputs with Zod
- [ ] **Audit Logging** - Log all critical operations
- [ ] **Session Security** - Secure session configuration
- [ ] **CORS Configuration** - Proper CORS setup
- [ ] **SQL Injection Protection** - Use Prisma properly
- [ ] **XSS Protection** - Sanitize user inputs

### 🚀 Performance Optimization

For production deployment:

- [ ] **Database Indexing** - Add proper database indexes
- [ ] **Image Optimization** - Use Next.js Image component
- [ ] **Caching Strategy** - Implement Redis caching
- [ ] **Bundle Optimization** - Tree shaking and code splitting
- [ ] **CDN Setup** - Use CDN for static assets
- [ ] **Database Connection Pooling** - Configure Prisma properly
- [ ] **API Response Caching** - Cache frequently accessed data
- [ ] **Lazy Loading** - Implement lazy loading for components

### 📊 Monitoring & Analytics

Set up monitoring:

- [ ] **Error Tracking** - Sentry or similar service
- [ ] **Performance Monitoring** - Application performance monitoring
- [ ] **Database Monitoring** - Query performance tracking
- [ ] **User Analytics** - Business metrics tracking
- [ ] **Uptime Monitoring** - Service availability tracking
- [ ] **Log Aggregation** - Centralized logging system

---

## 🎉 CONGRATULATIONS!

You now have a **complete implementation guide** for building a professional-grade ERP + POS + E-commerce system!

### 🌟 What You've Built:

✅ **Enterprise-Grade Architecture** - Scalable, maintainable codebase  
✅ **Complete Business Solution** - ERP, POS, and E-commerce in one platform  
✅ **Professional Security** - RBAC, audit trails, secure authentication  
✅ **Offline-Capable POS** - Works without internet, syncs when connected  
✅ **Multi-Store Support** - Handle multiple locations and franchise operations  
✅ **Payment Flexibility** - Multiple gateways and payment methods  
✅ **Real-Time Inventory** - Live stock tracking across all channels  
✅ **Comprehensive Reports** - Business intelligence and analytics  

### 🚀 Next Steps:

1. **Start with Phase 1** - Set up the foundation properly
2. **Follow the Implementation Order** - Don't skip phases
3. **Test Thoroughly** - Each module before moving to the next
4. **Deploy Gradually** - Start with core features, add advanced features later
5. **Monitor & Optimize** - Continuous improvement based on usage

**This system is designed to grow with your business from a small store to an enterprise operation!**

### 💡 Support & Resources:

- **Documentation**: Follow this guide step by step
- **Community**: Next.js, Prisma, and TypeScript communities
- **Extensions**: Easy to add new features with the modular architecture
- **Scaling**: Built to handle growth from day one

**Happy Building! 🎊**
✅ **Production Ready** - Docker, monitoring, security

#### 🚀 Next Steps:
1. **Deploy to Production** - Use Docker compose for easy deployment
2. **Add Monitoring** - Set up error tracking and performance monitoring
3. **Scale Gradually** - Add features based on business needs
4. **Train Users** - Create user documentation and training materials
5. **Continuous Improvement** - Gather feedback and iterate

**Your retail management platform is ready to handle everything from small stores to enterprise operations!**<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [ ] Clarify Project Requirements
	<!-- Ask for project type, language, and frameworks if not specified. Skip if already provided. -->

- [ ] Scaffold the Project
	<!--
	Ensure that the previous step has been marked as completed.
	Call project setup tool with projectType parameter.
	Run scaffolding command to create project files and folders.
	Use '.' as the working directory.
	If no appropriate projectType is available, search documentation using available tools.
	Otherwise, create the project structure manually using appropriate file creation tools.
	-->

- [ ] Customize the Project
	<!--
	Verify that all previous steps have been completed successfully and you have marked the step as completed.
	Develop a plan to modify codebase according to user requirements.
	Apply modifications using appropriate tools and user-provided references.
	Skip this step for "Hello World" projects.
	-->

- [ ] Install Required Extensions
	<!-- ONLY install extensions provided mentioned in the get_project_setup_info. Skip this step otherwise and mark as completed. -->

- [ ] Compile the Project
	<!--
	Verify that all previous steps have been completed.
	Install any missing dependencies.
	Run diagnostics and resolve any issues.
	Check for markdown files in project folder for relevant instructions on how to do this.
	-->

- [ ] Create and Run Task
	<!--
	Verify that all previous steps have been completed.
	Check https://code.visualstudio.com/docs/debugtest/tasks to determine if the project needs a task. If so, use the create_and_run_task to create and launch a task based on package.json, README.md, and project structure.
	Skip this step otherwise.
	 -->

- [ ] Launch the Project
	<!--
	Verify that all previous steps have been completed.
	Prompt user for debug mode, launch only if confirmed.
	 -->

- [ ] Ensure Documentation is Complete
	<!--
	Verify that all previous steps have been completed.
	Verify that README.md and the copilot-instructions.md file in the .github directory exists and contains current project information.
	Clean up the copilot-instructions.md file in the .github directory by removing all HTML comments.
	 -->

<!--
## Execution Guidelines
PROGRESS TRACKING:
- If any tools are available to manage the above todo list, use it to track progress through this checklist.
- After completing each step, mark it complete and add a summary.
- Read current todo list status before starting each new step.

COMMUNICATION RULES:
- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

DEVELOPMENT RULES:
- Use '.' as the working directory unless user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in Visual Studio again.
- If the project setup information has additional rules, follow them strictly.

FOLDER CREATION RULES:
- Always use the current directory as the project root.
- If you are running any terminal commands, use the '.' argument to ensure that the current working directory is used ALWAYS.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.

EXTENSION INSTALLATION RULES:
- Only install extension specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions.

PROJECT CONTENT RULES:
- If the user has not specified project details, assume they want a "Hello World" project as a starting point.
- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or any other media files unless explicitly requested.
- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.
- If you are working on a VS Code extension, use the VS Code API tool with a query to find relevant VS Code API references and samples related to that query.

TASK COMPLETION RULES:
- Your task is complete when:
  - Project is successfully scaffolded and compiled without errors
  - copilot-instructions.md file in the .github directory exists in the project
  - README.md file exists and is up to date
  - User is provided with clear instructions to debug/launch the project

Before starting a new task in the above plan, update progress in the plan.
-->
- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.
