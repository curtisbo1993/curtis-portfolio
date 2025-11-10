# Curtis Bolden Portfolio - CB Design Consultants

A modern portfolio website showcasing BIM automation, structural workflows, and development services.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to see the site.

## 📖 Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Complete setup instructions
- Environment variable configuration
- Deployment guide
- Customization tips
- Production checklist

## 🎯 Key Features

- Single Page Application with client-side routing
- Interactive quote builder with Stripe integration
- Case studies with detailed metrics
- Organized service catalog
- Contact forms via Formspree
- SEO optimized with dynamic meta tags
- Mobile-first responsive design

## 🛠️ Tech Stack

- React 19 + TypeScript
- Vite (rolldown-vite)
- Tailwind CSS 4
- Vercel Analytics
- Stripe Payments
- Formspree Forms

## 📝 Environment Setup

Create `.env.local`:

```bash
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
BASE_URL=http://localhost:3000
VITE_CALENDLY_URL=https://calendly.com/your-username/30min
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📦 Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── data/          # Service & work data
├── pages/         # Page components
└── hooks/         # Custom React hooks
```

## 🚢 Deployment

Deploy to Vercel with one click or use the CLI:

```bash
npm i -g vercel
vercel --prod
```

## 📞 Support

- Email: cbolden@cb-designconsultants.com
- Website: https://cb-designconsultants.com
- LinkedIn: https://www.linkedin.com/in/curtisaboldenjr/

---

© 2025 CB Design Consultants. All Rights Reserved.

