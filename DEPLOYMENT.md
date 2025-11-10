# Curtis Bolden Portfolio - CB Design Consultants

A modern, production-ready portfolio website for CB Design Consultants showcasing BIM automation, structural workflows, and development services.

## 🚀 Features

- **Single Page Application (SPA)** with client-side routing
- **Quote Builder** - Interactive service selection and quote generation
- **Case Studies** - Detailed work examples with metrics and outcomes
- **Service Catalog** - Organized by category with modal details
- **Responsive Design** - Mobile-first with Tailwind CSS
- **SEO Optimized** - Dynamic meta tags, structured data, sitemap
- **Analytics Ready** - Vercel Analytics & Speed Insights integrated
- **Contact Forms** - Formspree integration for inquiries
- **Payment Integration** - Stripe Checkout for deposits

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite (rolldown-vite)
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel
- **Forms**: Formspree
- **Payments**: Stripe
- **Analytics**: Vercel Analytics & Speed Insights

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Vercel (auto-populated on deployment)
VERCEL_OIDC_TOKEN=your_token_here

# Stripe (required for payment functionality)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Base URL for redirects
BASE_URL=https://cb-designconsultants.com

# Calendly (optional)
VITE_CALENDLY_URL=https://calendly.com/your-username/30min
```

### Getting API Keys

1. **Stripe Keys**: 
   - Sign up at [stripe.com](https://stripe.com)
   - Get keys from Dashboard → Developers → API keys
   - Use test keys (`pk_test_...` / `sk_test_...`) for development
   - Use live keys (`pk_live_...` / `sk_live_...`) for production

2. **Formspree Endpoint**:
   - Sign up at [formspree.io](https://formspree.io)
   - Create a form and get endpoint URL
   - Update `FORMSPREE_ENDPOINT` in:
     - `src/pages/Contact.tsx`
     - `src/components/QuoteDrawer.tsx`

3. **Calendly** (optional):
   - Create a booking page at [calendly.com](https://calendly.com)
   - Add URL to `.env.local` as `VITE_CALENDLY_URL`

## 📁 Project Structure

```
curtis-portfolio/
├── api/                          # Serverless API routes
│   └── create-checkout-session.ts
├── public/                       # Static assets
│   ├── assets/
│   │   ├── badges/              # Software logos
│   │   ├── brand/               # Brand assets
│   │   ├── logos/               # Company logos
│   │   └── work/                # Work thumbnails
│   ├── docs/                    # PDF documents
│   ├── headshots/               # Profile images
│   └── hero/                    # Hero video & images
├── src/
│   ├── components/              # Reusable components
│   ├── context/                 # React context providers
│   ├── data/                    # Data files
│   │   ├── services.ts          # Service offerings
│   │   ├── tools.ts             # Tool catalog
│   │   └── work.ts              # Case studies
│   ├── hooks/                   # Custom React hooks
│   ├── pages/                   # Page components
│   ├── App.tsx                  # Main app wrapper
│   ├── PortfolioMock.tsx        # Main SPA shell
│   ├── index.css                # Global styles
│   └── main.tsx                 # Entry point
├── .env.local                   # Environment variables (not in git)
├── vercel.json                  # Vercel deployment config
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

## 🎨 Customization

### Adding New Services

Edit `src/data/services.ts`:

```typescript
{
  id: "unique-id",
  name: "Service Name",
  category: "Category Name",
  time: "3 weeks",
  priceLabel: "from $5,000",
  bullets: ["Feature 1", "Feature 2", "Feature 3"],
  quoteEligible: true,
  fixedPriceEligible: true,
  estimateLow: 5000,
  estimateHigh: 8000,
}
```

### Adding Case Studies

Edit `src/data/work.ts`:

```typescript
{
  slug: "project-slug",
  title: "Project Title",
  client: "Client Name",
  summary: "Brief description",
  tags: ["Tag1", "Tag2"],
  og: "/work/og/image.jpg",
  thumb: "/work/thumbnail.jpg",
  metrics: [
    { label: "Metric", value: "Value" }
  ],
  images: ["/work/project/1.jpg"],
  problem: "The problem statement",
  solution: "The solution approach",
  outcomes: ["Outcome 1", "Outcome 2"],
  stack: ["Tech1", "Tech2"]
}
```

### Updating Content

- **Hero Section**: Edit `src/PortfolioMock.tsx` (search for "HERO")
- **About Bio**: Edit `BioBlock` component in `src/PortfolioMock.tsx`
- **Footer Links**: Edit `src/components/Footer.tsx`
- **SEO Metadata**: Edit `getSeoForRoute` in `src/PortfolioMock.tsx`

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel --prod
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the 'dist' folder to any static host
# (Netlify, Cloudflare Pages, AWS S3, etc.)
```

## 📊 Analytics & Monitoring

- **Vercel Analytics**: Automatic on Vercel deployment
- **Speed Insights**: Performance monitoring enabled
- **Plausible Events**: Custom event tracking for CTAs

## 🔒 Security

- Environment variables are not committed to git
- API keys should use Vercel environment variables in production
- Stripe webhook signing recommended for production
- CORS configured in API routes

## 📝 License

© 2025 CB Design Consultants. All Rights Reserved.

## 🤝 Support

For questions or support:
- Email: cbolden@cb-designconsultants.com
- Website: https://cb-designconsultants.com
- LinkedIn: https://www.linkedin.com/in/curtisaboldenjr/

## ✅ Checklist Before Going Live

- [ ] Replace all placeholder images with actual assets
- [ ] Update Stripe keys to live mode
- [ ] Test contact form submissions
- [ ] Verify all links work correctly
- [ ] Test quote builder and Stripe checkout flow
- [ ] Add custom domain in Vercel
- [ ] Set up SSL certificate (automatic with Vercel)
- [ ] Submit sitemap to Google Search Console
- [ ] Test on mobile devices
- [ ] Check analytics are tracking correctly
- [ ] Update social media links in Footer
- [ ] Review and update Privacy Policy & Terms
- [ ] Test all case study pages
- [ ] Verify PDF downloads work
