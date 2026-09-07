# Sri Saradi Scientific - E-Commerce Platform

A comprehensive Next.js-based scientific products e-commerce platform with advanced admin management, product catalog, and research request functionality. Built for distributing laboratory consumables, kits, antibodies, biochemical reagents, and other scientific products.

## What This Is

**Sri Saradi Scientific** is a full-stack web application serving as a B2B scientific products marketplace. It enables customers to browse and purchase laboratory reagents, consumables, and specialized research products, while providing admins with a sophisticated dashboard for inventory management, product categorization, order tracking, and content management.

### Stack

- **Language(s):** TypeScript (97%), JavaScript, CSS
- **Framework / Runtime:** Next.js 16 + React 19 + Node.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** JWT-based custom authentication (admin & user sessions)
- **UI Framework:** Tailwind CSS 4, React Icons
- **Notable Libraries:**
  - **Prisma** — database ORM with migrations
  - **NextAuth.js** — authentication framework (beta version)
  - **TinyMCE** — rich text editor for admin content
  - **Google Analytics** — usage tracking
  - **Mailgun.js** — transactional email
  - **XLSX** — product import/export
  - **Nodemailer** — email delivery

## How It's Organized

```
app/
  api/                        # REST API endpoints (30+ routes)
    admin/                    # Admin-only operations: auth, CRUD for products/categories/media
    auth/                     # User login/signup/verify
    [public routes]           # Product search, FAQ, contact, quote requests
  
  admin/                      # Admin dashboard UI (protected by JWT)
    dashboard/                # Overview & analytics
    products/                 # Product management
    categories/               # Category CRUD & reordering
    kit-products/             # Lab consumable kit management
    lab-consumable-products/  # Individual consumable products
    catalogues/               # Catalog management
    hero-slides/              # Homepage banner slides
    cro-services/             # Contract Research Organization services
    signaling-pathways/       # Signaling pathway content
    faqs/                     # FAQ management
    certificates/             # Certificates & compliance
    careers/                  # Job openings
    quotes/                   # Quote request tracking
    media/                    # Image/file uploads
    pages/                    # Dynamic page content
    settings/                 # Site configuration
    login/                    # Admin login
    components/               # Admin UI components (modals, editors)
  
  (public routes)/
    page.tsx                  # Homepage with hero slider, featured products, categories
    products/                 # Product catalog & detail pages
    lab-consumables/          # Lab consumables category
    kit-products/             # Kit products (redirects to lab-consumables)
    applications/             # Application use cases
    cro-services/             # CRO service pages
    signaling-pathways/       # Signaling pathway information
    catalogues/               # Digital catalogs
    certificates/             # Certificates page
    careers/                  # Job listings
    contact/                  # Contact form
    faq/                      # FAQ pages
    track-order/              # Order tracking
    login/                    # User login
  
  components/                 # Shared React components
    Header.tsx                # Navigation, search, research request modal
    HeroSlider.tsx            # Homepage banner carousel
    TopCategories.tsx         # Category grid
    KitProducts.tsx           # Kit/consumable products showcase
    FeaturedProducts.tsx      # Highlighted products
    Footer.tsx                # Site footer
    ProductCatalog.tsx        # Product grid with filtering
    MenuSection.tsx           # Mobile menu
    AuthModal.tsx             # User login/signup modal
    QuoteModal.tsx            # Request quote modal
    SampleKitModal.tsx        # Sample kit request
    PageContent.tsx           # Dynamic page renderer
    CookiesPopup.tsx          # GDPR compliance
    DisclaimerModal.tsx       # Data & privacy notice
    GoogleAnalytics.tsx       # Analytics integration
  
  lib/                        # Utilities & helpers
    prisma.ts                 # Database client
    auth.ts                   # User JWT authentication
    adminAuth.ts              # Admin JWT authentication
    email.ts                  # Email templating
    mailgun.ts                # Mailgun configuration
    textUtils.ts              # Text formatting & escaping
    orderIdGenerator.ts       # Quote/order ID generation
    import-state.ts           # Bulk import progress tracking
  
  utils/                      # Text processing
    scientific-formatter.ts   # Superscript/subscript handling
    chemical-text-cleaner.ts  # Text normalization
    textUtils-enhanced.ts     # Enhanced text utilities
  
  layout.tsx                  # Root layout with metadata
  globals.css                 # Global styles

prisma/
  schema.prisma               # Database schema (17 models)
  migrations/                 # Database version control

public/
  uploads/                    # User-uploaded product images
  favicon.ico
  [SVG assets]

scripts/
  import-products.ts          # Bulk product import from CSV
  seed-kit-products.ts        # Seed database with kit data
  reset-categories.ts         # Category management utilities
  audit-text-issues.ts        # Text encoding validation

middleware/
  character-validation.js     # Input validation middleware

components/                   # Root-level components
  ScientificText.tsx          # Superscript/subscript renderer
```

**How it fits together:**

1. **User Journey:** Visitors land on the homepage (hero slider → category grid → featured products). They search via the header search bar (powered by `/api/products`), browse categories, and view product detail pages. To request a quote or research product, they fill modals that POST to `/api/quotes`.

2. **Admin Dashboard:** Protected by JWT middleware; admins log in at `/admin/login`, then access `/admin/dashboard` which shows overview analytics. From there, they manage products, categories, media, hero slides, CRO services, FAQs, catalogues, and site settings via dedicated CRUD pages. Bulk product imports happen via `/api/admin/import-products`.

3. **Database Flow:** Prisma ORM connects to PostgreSQL. The schema includes `products`, `categories`, `kit_products`, `lab_consumable_products`, `users`, `admin_users`, `quote_requests`, and content models (`faqs`, `pages`, `cro_services`, `signaling_pathways`, `hero_slides`). Products support variants (SKU, pack size, price).

4. **Authentication:** Users sign up/log in to track quotes; admins authenticate separately with role-based access. Sessions are JWT-based, with tokens stored in HTTP-only cookies.

## How to Run It

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Mailgun account (for email)
- Google Analytics API credentials (optional)

### Development Server

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Update .env.local with your database URL, Mailgun key, etc.

# Set up database
npx prisma migrate dev

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Key Environment Variables
```
DATABASE_URL=postgresql://user:pass@localhost:5432/sri_saradi
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=mg.yourdomain.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-xxx
JWT_SECRET=your_secret_key
```

### Admin Setup

1. Seed a demo admin user:
   ```bash
   curl http://localhost:3000/api/admin/seed-demo-user
   ```
2. Log in at `/admin/login` with credentials from seed script
3. Configure site settings at `/admin/settings` (logo, name, etc.)

### Import Products

Place a CSV file with product data in the repo root, then:
```bash
curl -X POST http://localhost:3000/api/admin/import-products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@products.csv"
```

## Database Schema Highlights

**Key Models:**
- `products` — Main product catalog (name, description, category, variants, specifications)
- `categories` — Hierarchical category structure with slugs & images
- `lab_consumable_products` — Lab-specific consumables linked to kits & categories
- `kit_products` — Groupings of related consumables with catalogues
- `users` — Customer accounts for quote tracking
- `admin_users` — Admin accounts with JWT-based sessions
- `quote_requests` — Orders/quotes with linked items & user references
- `hero_slides` — Homepage banners with CTA buttons & PDF links
- `cro_services` — Contract research service descriptions
- `signaling_pathways` — Pathway information pages
- `faqs` — Frequently asked questions
- `pages` — Dynamic content pages (JSON-based body)

## Try Asking

1. **How do I bulk import products and track the import progress?** See `/api/admin/import-products` and `/api/admin/import-tracking-stream` for streaming progress updates.

2. **What is the product search implementation and how does it handle scientific nomenclature?** The header search hits `/api/products?search=...` which queries product names and catalog numbers. Scientific text (superscripts/subscripts) is cleaned via `textUtils-enhanced.ts` for matching.

3. **How are lab consumables and kit products related, and why the distinction?** Kit products are groupings/collections (e.g., "DNA Extraction Kit"), while lab consumable products are individual items (e.g., "PCR tubes"). Kits link to consumables via `kit_products.lab_consumable_products[]` relationship, allowing customers to see kit contents and individual availability.

4. **How does the admin authentication work and what happens if a session expires?** Admins log in at `/admin/login`, receive a JWT in an HTTP-only cookie. The `/admin/layout.tsx` fetches `/api/admin/auth/verify` on mount; if invalid, the user is redirected to `/admin/login`.

5. **Can I customize the homepage sections (hero, categories, featured products)?** Yes. Hero slides are managed at `/admin/hero-slides`, categories at `/admin/categories`, featured products are flagged via `products.isFeatured`, and top categories are configured in site settings.

---

**Built with ❤️ for scientific research and product distribution.**
