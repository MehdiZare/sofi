# Studio Yerevan Waitlist Landing

Landing page implementation for Yerevan boutique fitness waitlist.

## Stack

- Next.js 16 (App Router)
- React 19
- Clerk waitlist mode
- Supabase (waitlist metadata + analytics)
- ConvertKit webhook sync
- Tailwind CSS v4
- Vercel Analytics + GA4 + Meta Pixel + GTM hooks

## Setup

1. Install dependencies:

```bash
bun install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
bun run dev
```

## Optional UI CLI Workflows

Untitled UI bootstrap:

```bash
npx untitledui@latest init --nextjs
```

Add Untitled UI components:

```bash
npx untitledui@latest add button toggle avatar card badge input
```

Aceternity component add pattern:

```bash
export ACETERNITY_API_KEY=...
npx shadcn@latest add "https://ui.aceternity.com/r/component-name"
```

## Important Routes

- `POST /api/webhooks/clerk`
- `GET /api/waitlist/count`
- `POST /api/waitlist/referral`
- `POST /api/analytics`

## Locale Routes

- `/en`
- `/hy`
- `/ru`

Root `/` redirects to locale.
