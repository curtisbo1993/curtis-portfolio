# 📝 Content Editing Guide - Quick Reference

This guide helps you quickly find and edit content on your website. Everything is organized by what you want to change.

---

## 🎯 Quick Navigation

### "I want to change..."

- [Home Page Content](#home-page) → `src/PortfolioMock.tsx`
- [Services & Pricing](#services) → `src/data/services.ts`
- [Case Studies (Work)](#work-case-studies) → `src/data/work.ts`
- [About Me / Bio](#about-page) → `src/PortfolioMock.tsx` (search for "BioBlock")
- [Contact Info / Social Links](#footer--social-links) → `src/components/Footer.tsx`
- [Tools Page](#tools-page) → `src/pages/Tools.tsx`
- [Legal Pages](#legal-pages) → `src/pages/Privacy.tsx` & `src/pages/Terms.tsx`
- [Site-wide Settings](#site-wide-settings) → Multiple files

---

## 📂 Folder Structure Explained

```
curtis-portfolio/
│
├── 📁 public/                    # Static files (images, videos, PDFs)
│   ├── assets/
│   │   ├── badges/              # Software logos (Revit, AutoCAD, etc.)
│   │   ├── brand/               # Your company logo/branding
│   │   ├── logos/               # Client/company logos
│   │   └── work/                # Project thumbnails & screenshots
│   ├── docs/                    # PDF downloads (resume, portfolio, etc.)
│   ├── headshots/               # Your profile photos
│   ├── hero/                    # Homepage hero video & images
│   └── work/                    # Detailed work images by project
│
├── 📁 src/                       # All your code lives here
│   ├── 📁 components/           # Reusable UI pieces
│   ├── 📁 context/              # App state management
│   ├── 📁 data/                 # Content you'll edit most ⭐
│   ├── 📁 hooks/                # Custom React functionality
│   └── 📁 pages/                # Individual page components
│
└── 📁 api/                       # Backend functions (Stripe payments)
```

---

## 🎨 Most Common Edits

### Home Page
**File**: `src/PortfolioMock.tsx` (lines ~500-850)

#### Hero Section
```tsx
// Search for: "HERO"
<h1 className="mt-4 text-4xl/tight font-semibold md:text-6xl/tight">
  BIM automation and structural workflows that save hours every week.
</h1>
<p className="mt-5 max-w-2xl text-lg text-white/80">
  I design tools and workflows that teams actually use...
</p>
```
**Edit**: Change the headline, subheadline, button text

#### Testimonials
```tsx
// Search for: "testimonials"
const testimonials = [
  { quote: "...", author: "..." },
  // Add more here
];
```
**Edit**: Add/remove customer testimonials

#### About Teaser
```tsx
// Search for: "About Curtis Bolden"
<p className="mt-4 text-white/80">
  I'm Curtis Bolden, a Structural BIM/VDC specialist...
</p>
```
**Edit**: Change your bio summary

---

### Services
**File**: `src/data/services.ts`

This is where ALL your services, pricing, and descriptions live!

```typescript
export const SERVICES: Record<string, Service[]> = {
  "BIM + CAD Production": [
    {
      id: "model-health",
      name: "Model Health Audit & Standards",
      category: "BIM + CAD Production",
      time: "2 weeks",
      priceLabel: "from $5,000",
      bullets: [
        "Model QA/QC + standards compliance",
        "Family, view, and parameter review",
        "Cleanup & optimization report",
      ],
      quoteEligible: true,
      fixedPriceEligible: true,
      estimateLow: 5000,
      estimateHigh: 7000,
    },
    // More services...
  ],
  // More categories...
}
```

**To add a new service:**
1. Copy an existing service block
2. Change the `id` (must be unique)
3. Update `name`, `time`, `priceLabel`, `bullets`
4. Set price estimates
5. Choose if it can be added to quotes

**To change pricing:**
- Update `priceLabel` (what shows on card)
- Update `estimateLow` and `estimateHigh` (for quote totals)

---

### Work / Case Studies
**File**: `src/data/work.ts`

```typescript
export const WORK: WorkItem[] = [
  {
    slug: "pyrevit-sheet-suite",           // URL: /work/pyrevit-sheet-suite
    title: "pyRevit Sheet Suite",
    client: "Internal Tooling",
    summary: "Automates sheet creation...",
    tags: ["Revit", "pyRevit", "Automation"],
    og: "/work/og/pyrevit-sheet-suite.jpg",  // Social media image
    thumb: "/work/pyrevit.jpg",               // Grid thumbnail
    metrics: [
      { label: "Time saved", value: "3–6 hrs/wk per user" },
      { label: "Adoption", value: "85% of team" }
    ],
    images: ["/work/pyrevit/1.jpg", "/work/pyrevit/2.jpg"],
    problem: "Manual sheet setup was error-prone...",
    solution: "A pyRevit toolset with guardrails...",
    outcomes: [
      "Consistent sheets across projects",
      "Reduced errors"
    ],
    stack: ["pyRevit", "Revit API", "C#"]
  },
  // Add more projects here
];
```

**To add a new case study:**
1. Create images folder: `public/work/your-project-name/`
2. Add images: `1.jpg`, `2.jpg`, etc.
3. Add thumbnail: `public/work/your-project.jpg`
4. Copy an existing work item in `work.ts`
5. Update all fields

---

### About Page
**File**: `src/PortfolioMock.tsx`

#### Your Bio
Search for: `function BioBlock()`
```tsx
<p className="mt-3 text-white/80">
  I'm Curtis Bolden, a Structural BIM/VDC specialist...
</p>
```

#### Education
Search for: `const EDUCATION =`
```typescript
const EDUCATION = [
  {
    school: "Western Governors University (WGU)",
    program: "B.S. Computer Science (ABET)",
    dates: "In progress",
    notes: "Focus: software engineering...",
  },
];
```

#### Certifications
Search for: `const CERTS =`
```typescript
const CERTS = [
  { name: "Series 65 (Planned)", org: "NASAA / State", status: "Studying" },
];
```

#### Software Skills
Search for: `const toolLogos: ToolLogo[] =`
```typescript
{ name: 'Revit', src: '/assets/badges/rvt.png', level: 'Expert' },
```

#### Companies Worked With
Search for: `const companies: CompanyLogo[] =`
```typescript
{ name: 'Tesla', src: '/assets/logos/tesla.png' },
```

---

### Tools Page
**File**: `src/pages/Tools.tsx`

```tsx
const tools = [
  {
    name: "pyRevit Sheet Suite",
    description: "Batch sheet creation...",
    category: "Revit Automation",
    status: "Production",  // or "WIP"
  },
];
```

**To add a tool:**
- Copy a tool object
- Update name, description, category, status

---

### Footer & Social Links
**File**: `src/components/Footer.tsx`

```tsx
<div className="mt-4 flex items-center justify-center gap-4 text-white/70">
  <a href="https://twitter.com/yourhandle" aria-label="X / Twitter">X</a>
  <a href="https://facebook.com/yourhandle" aria-label="Facebook">Fb</a>
  <a href="https://instagram.com/yourhandle" aria-label="Instagram">Ig</a>
  <a href="https://www.linkedin.com/in/curtisaboldenjr/" aria-label="LinkedIn">in</a>
  <a href="https://youtube.com/@yourhandle" aria-label="YouTube">YT</a>
  <a href="https://github.com/yourhandle" aria-label="GitHub">GH</a>
  <a href="https://www.behance.net/yourhandle" aria-label="Behance">Be</a>
  <a href="https://dribbble.com/yourhandle" aria-label="Dribbble">Db</a>
</div>
```

**Update your social links here!**

---

### Contact Page
**File**: `src/pages/Contact.tsx`

#### Contact Form Services Dropdown
```tsx
<select id="service" name="service" ...>
  <option>BIM Automation Sprint</option>
  <option>Revit ↔ Analysis Sync</option>
  <option>Coordination Dashboard</option>
  {/* Add more service options */}
</select>
```

#### Email Display
```tsx
<a href="mailto:curtis@example.com">curtis@example.com</a>
```

**Change to your actual email!**

---

### Legal Pages
**Files**: 
- `src/pages/Privacy.tsx` - Privacy policy
- `src/pages/Terms.tsx` - Terms of service

Edit these to match your business policies.

---

## 🖼️ Adding Images

### Profile Photos
1. Add to: `public/headshots/curtis.png`
2. Used on: Home page & About page

### Hero Video
1. Add to: `public/hero/hero-video.mp4`
2. Optional mobile version: `public/hero/trailer-720.mp4`

### Work Thumbnails
1. Grid view: `public/work/project-name.jpg`
2. Detail images: `public/work/project-name/1.jpg`, `2.jpg`, etc.
3. Social share: `public/work/og/project-name.jpg`

### Software Badges
- Add to: `public/assets/badges/`
- Update in: `src/PortfolioMock.tsx` (search for `toolLogos`)

### Company Logos
- Add to: `public/assets/logos/`
- Update in: `src/PortfolioMock.tsx` (search for `companies`)

---

## ⚙️ Site-wide Settings

### SEO (Search Engine Optimization)
**File**: `src/PortfolioMock.tsx`

Search for: `function getSeoForRoute`
```tsx
if (route === "home") {
  title = "CB Design Consultants — Structural BIM • Dev • Automation";
  description = "Structural BIM/VDC + automation...";
  image = "/thumbnail.jpg";
}
```

### Company Info (Schema.org)
**File**: `src/PortfolioMock.tsx`

Search for: `const jsonLd =`
```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CB Design Consultants",
  url: "https://www.cb-designconsultants.com",
  logo: "/assets/brand/co-logo-white.png",
  sameAs: [
    "https://www.linkedin.com/in/curtisaboldenjr/",
    // Add more social profiles
  ],
};
```

### Navigation Menu
**File**: `src/PortfolioMock.tsx`

Search for: `<nav className="hidden md:flex`
```tsx
{[
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
].map((link) => ...)}
```

---

## 🎨 Styling / Colors

### Tailwind Config
**File**: `tailwind.config.js`

Your site uses Tailwind CSS. Colors are defined with utility classes:
- `bg-neutral-950` = dark background
- `text-white` = white text
- `border-white/10` = semi-transparent white border

To customize colors globally, edit the Tailwind config.

### Global Styles
**File**: `src/index.css`

Custom CSS and base styles go here.

---

## 🔧 Component Files Explained

### `src/components/`

| File | What It Does |
|------|--------------|
| `Footer.tsx` | Bottom of every page (social links, legal links) |
| `SEO.tsx` | Sets page title, description, social share images |
| `ServiceModal.tsx` | Popup when clicking service names |
| `QuoteDrawer.tsx` | Shopping cart sidebar for services |
| `Lightbox.tsx` | Image gallery viewer for case studies |
| `LazyImage.tsx` | Optimized image loading |
| `SkipToContent.tsx` | Accessibility feature |
| `Disclaimer.tsx` | Professional disclaimer in footer |
| `LegalLayout.tsx` | Wrapper for privacy/terms pages |

### `src/context/`

| File | What It Does |
|------|--------------|
| `QuoteContext.tsx` | Manages shopping cart state (what services are selected) |

### `src/hooks/`

| File | What It Does |
|------|--------------|
| `useReveal.ts` | Scroll animations (fade-in effects) |

### `src/pages/`

| File | URL | Purpose |
|------|-----|---------|
| `Home.tsx` | `/` | Homepage (not used - using PortfolioMock) |
| `Work.tsx` | `/work` | Case studies grid |
| `WorkDetail.tsx` | `/work/:slug` | Individual case study |
| `Services.tsx` | `/services` | Services catalog |
| `Tools.tsx` | `/tools` | Tools showcase |
| `About.tsx` | `/about` | Bio, skills, companies (in PortfolioMock) |
| `Contact.tsx` | `/contact` | Contact form |
| `Success.tsx` | `/success` | After successful payment |
| `Privacy.tsx` | `/privacy` | Privacy policy |
| `Terms.tsx` | `/terms` | Terms of service |
| `NotFound.tsx` | `/404` | 404 error page |

---

## 📝 Common Editing Workflows

### Adding a New Service

1. Open `src/data/services.ts`
2. Find the category or create a new one
3. Copy an existing service object
4. Update these fields:
   ```typescript
   {
     id: "unique-id-here",           // Must be unique!
     name: "Service Name",
     category: "Category Name",      // Match parent category
     time: "3 weeks",
     priceLabel: "from $5,000",
     bullets: [
       "What you do",
       "Another deliverable",
       "Another benefit"
     ],
     quoteEligible: true,            // Can add to cart?
     fixedPriceEligible: true,       // Fixed price?
     estimateLow: 5000,              // Lowest price
     estimateHigh: 8000,             // Highest price
   }
   ```
5. Save and rebuild: `npm run build`

### Adding a New Case Study

1. **Prepare images:**
   - Create folder: `public/work/my-project/`
   - Add images: `1.jpg`, `2.jpg`, `3.jpg`
   - Add thumbnail: `public/work/my-project.jpg`
   - Add social image: `public/work/og/my-project.jpg`

2. **Add to data:**
   - Open `src/data/work.ts`
   - Copy an existing work item
   - Update all fields (especially `slug`, `title`, `images`)

3. **Save and test:**
   ```bash
   npm run build
   ```

### Changing Homepage Hero

1. Open `src/PortfolioMock.tsx`
2. Search for `// HERO`
3. Edit the text inside `<h1>` and `<p>` tags
4. Change button text and links

### Updating Your Bio

1. Open `src/PortfolioMock.tsx`
2. Search for `function BioBlock()`
3. Edit the paragraph text
4. Update the headshot path if needed

### Changing Prices

1. Open `src/data/services.ts`
2. Find the service by `id` or `name`
3. Update:
   - `priceLabel`: "from $X,XXX"
   - `estimateLow`: number
   - `estimateHigh`: number

---

## 🚀 Making Changes Go Live

After editing content:

```bash
# 1. Build to check for errors
npm run build

# 2. Test locally (optional)
npm run preview

# 3. Commit changes
git add .
git commit -m "Update content: [describe what you changed]"

# 4. Push to GitHub (triggers Vercel deployment)
git push
```

Vercel will automatically deploy your changes in ~1-2 minutes!

---

## 🆘 Quick Tips

### "Where do I change the page title?"
**Answer**: `src/PortfolioMock.tsx` → search for `getSeoForRoute`

### "How do I add a new software logo?"
**Answer**: 
1. Add PNG to `public/assets/badges/`
2. Edit `src/PortfolioMock.tsx` → search for `toolLogos`
3. Add: `{ name: 'Software Name', src: '/assets/badges/file.png', level: 'Expert' }`

### "How do I change social links?"
**Answer**: `src/components/Footer.tsx` → update the `<a href=` links

### "The site broke after my change!"
**Answer**: 
1. Check the terminal for error messages
2. Run `npm run build` to see what's wrong
3. Common issues:
   - Missing comma in arrays
   - Typo in file paths
   - Duplicate IDs in services/work

### "I want to add more pages"
**Answer**: This requires coding knowledge. Ask for help adding new routes!

---

## 📞 Need Help?

- Check the terminal for error messages
- Run `npm run build` to validate changes
- Make one change at a time and test
- Keep backups before major edits

**Files you'll edit most:**
1. `src/data/services.ts` ⭐
2. `src/data/work.ts` ⭐
3. `src/PortfolioMock.tsx`
4. `src/components/Footer.tsx`

Happy editing! 🎉
