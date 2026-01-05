# Tushe Data Foundry

> **The Foundation of Hausa Intelligence**

A community-driven data foundry building foundational datasets, knowledge, and intelligence for Hausa AI.

## About

Tushe is dedicated to building, refining, and democratizing Hausa language datasets — from speech to text, translation, and beyond. Our mission is to create the foundation for Hausa AI models that understand, speak, and think like us.

## Our Pillars

- **TusheSpeech** — Comprehensive speech datasets capturing the diversity of Hausa dialects and accents
- **TusheText** — Authentic Hausa text corpus for natural language understanding and generation
- **TusheTranslate** — STEM-focused multilingual translation datasets connecting Hausa to global knowledge
- **TusheModels** — Open-source NLP models trained on authentic Hausa data for real-world applications

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:8080`

### Build

```bash
# Create production build
npm run build
# or
bun run build
```

The build output will be in the `dist/` directory.

### Deployment

This is a Single Page Application (SPA) using client-side routing. When deploying, ensure your server is configured to redirect all routes to `index.html` so that React Router can handle routing.

**Configuration files included:**
- `public/_redirects` - For Netlify deployments
- `vercel.json` - For Vercel deployments  
- `public/.htaccess` - For Apache servers
- `nginx.conf.example` - Example configuration for Nginx servers

**Important:** Make sure your hosting provider is configured to serve `index.html` for all routes (except static assets) to prevent 404 errors on direct route access.

## Tech Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **shadcn/ui** — UI components
- **React Router** — Routing
- **TanStack Query** — Data fetching

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Hero section
│   ├── Mission.tsx     # Mission section
│   ├── Pillars.tsx     # Pillars showcase
│   ├── CommunityImpact.tsx  # Community stats
│   └── CallToAction.tsx     # CTA section
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Images and static files
```

## Contributing

Join the growing movement of innovators and linguists building the future of Hausa AI. Visit our website to become a contributor.

## License

This project is open source and available under the MIT License.

## Contact

Follow us on [Twitter @tushe_ai](https://twitter.com/tushe_ai)

