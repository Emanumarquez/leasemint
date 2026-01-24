# LeaseMint - VC Access Portal

A minimal, secure, and professional landing website for LeaseMint that acts as a password-protected gateway to investor content.

## Features

- **Language Selection** - French and English support
- **Password Protection** - Server-side password validation
- **Secure Design** - Password never exposed to client
- **Obfuscated Email** - Contact email protected from scrapers
- **Minimal UI** - Clean, professional fintech aesthetic
- **Fast** - Optimized for <1s load time

## Pages

| Route | Description |
|-------|-------------|
| `/` | Language selection (French / English) |
| `/vc_fr` | French investor access (password protected) |
| `/vc_en` | English investor access (password protected) |

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework (App Router)
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vercel](https://vercel.com/) - Hosting

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

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` and set your password:
   ```
   VC_ACCESS_PASSWORD=your_secure_password
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VC_ACCESS_PASSWORD` | Password for VC access pages | Yes |

### Gamma Redirect URLs

Update the redirect URLs in:
- `src/app/vc_fr/page.tsx` - French Gamma page URL
- `src/app/vc_en/page.tsx` - English Gamma page URL

## Security Notes

- Password is stored in environment variable, never in code
- Password validation happens server-side via API route
- No password logging or hints in error messages
- Contact email is obfuscated to prevent scraping
- Pages are set to `noindex` to prevent search engine indexing

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable `VC_ACCESS_PASSWORD` in Vercel dashboard
4. Deploy

Or deploy via CLI:
```bash
vercel --prod
```

Remember to set the `VC_ACCESS_PASSWORD` environment variable in your Vercel project settings.

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage (language selection)
│   ├── vc_fr/
│   │   └── page.tsx          # French access page
│   ├── vc_en/
│   │   └── page.tsx          # English access page
│   └── api/
│       └── verify-password/
│           └── route.ts      # Password validation API
└── components/
    └── AccessForm.tsx        # Password form component
```

## License

Private - LeaseMint © 2024
