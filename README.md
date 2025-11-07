# Sachdeva Retail Platform

Foundational Next.js 14 (App Router) workspace for building a unified ERP, POS, and e-commerce stack. This repository follows the
[project specification](./PROJECT_SPEC.md) and prepares the essential infrastructure so that feature teams can begin shipping
modules quickly.

## Tech Stack

- **Framework**: Next.js 14 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (automatic CSS variables)
- **ORM**: Prisma with PostgreSQL datasource
- **Authentication**: NextAuth.js + Prisma adapter + RBAC utilities
- **State & Utilities**: Zustand, Zod, Socket.io client, IndexedDB helpers

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create your environment file**

   ```bash
   cp .env.example .env
   # update database + OAuth credentials
   ```

3. **Generate the Prisma client and run migrations**

   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app is available at [http://localhost:3000](http://localhost:3000).

## Database & Auth Foundation

Prisma schema (`prisma/schema.prisma`) includes:

- Users, roles, permissions, role assignments, and store associations
- Store catalog primitives (items, inventory per store, POS terminals)
- Payment configuration and sync queue scaffolding
- NextAuth models (Account, Session, VerificationToken)

The default NextAuth configuration (`lib/auth/options.ts`):

- Uses the Prisma adapter with database sessions
- Seeds baseline roles/permissions on first user creation
- Exposes RBAC helpers via the session object for middleware checks

Configure `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` to enable OAuth sign-in in addition to credentials.

## Application Layouts

Three module workspaces are ready for feature implementation:

- **Admin Console** (`/admin`) – organization configuration, catalog, users
- **Point of Sale** (`/pos`) – offline-first register skeleton with keypad mock
- **Online Store** (`/store`) – digital channel analytics overview

Each workspace reuses a shared `AppShell` component that provides navigation, headers, and responsive layout primitives.

## Next Steps

- Flesh out module routes using the guidance inside `PROJECT_SPEC.md`
- Connect Prisma models to UI flows and seed baseline data
- Implement POS offline sync strategies leveraging IndexedDB and Socket.io
- Add observability, logging, and deployment automation per the production checklist

Happy building! 🚀
