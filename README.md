# Leasemint - Venture Capital Website

A modern, beautifully designed venture capital website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design** - Dark theme with gradient accents and glass-morphism effects
- **Responsive** - Fully responsive design that works on all devices
- **Animated** - Smooth scroll-triggered animations powered by Framer Motion
- **Fast** - Built with Next.js 14 for optimal performance
- **Type-safe** - Written in TypeScript for better developer experience

## Sections

- **Hero** - Engaging hero section with animated background effects
- **Stats** - Key metrics showcasing fund performance
- **About** - Company overview with feature highlights
- **Portfolio** - Showcase of portfolio companies
- **Investment Thesis** - Focus areas and investment criteria
- **Team** - Meet the partners section
- **Contact** - Contact form and company information

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Emanumarquez/leasemint.git
   cd leasemint
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind config
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Homepage
└── components/
    ├── Navbar.tsx       # Navigation component
    ├── Footer.tsx       # Footer component
    └── sections/
        ├── Hero.tsx     # Hero section
        ├── Stats.tsx    # Statistics section
        ├── About.tsx    # About section
        ├── Portfolio.tsx # Portfolio section
        ├── Thesis.tsx   # Investment thesis section
        ├── Team.tsx     # Team section
        └── Contact.tsx  # Contact section
```

## Customization

### Colors

The primary color scheme can be customized in `tailwind.config.ts`. The default uses a green palette for the accent color.

### Content

Update the content in each section component to match your firm's information:
- Portfolio companies in `Portfolio.tsx`
- Team members in `Team.tsx`
- Investment thesis in `Thesis.tsx`
- Contact information in `Contact.tsx`

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com):

```bash
npm run build
```

Or deploy directly from GitHub to Vercel, Netlify, or any other Next.js-compatible hosting platform.

## License

MIT License - feel free to use this template for your own VC website.

---

Built with passion for the future.
