This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Portfolio projects, publications, and resume data are read from the blog server when available.
Set one of these in `.env.local` if your API is not running at `http://localhost:8000`:

```bash
NEXT_PUBLIC_PORTFOLIO_API_URL=http://localhost:8000
# or
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### AI assistant (contact page)

The contact page has a text-only AI assistant. The browser talks only to this app's
`/api/assistant` routes; those call the AI character service from the server. Set these in
`.env.local` (and in Vercel's environment variables). **They must not have the
`NEXT_PUBLIC_` prefix**, so the key never reaches the browser:

```bash
CHARACTER_SERVICE_URL=http://localhost:8080      # the character service
CHARACTER_SERVICE_API_KEY=...                     # = PORTFOLIO_CONTACT_API_KEY in the service
# CHARACTER_SERVICE_TIMEOUT_MS=25000              # optional
```

If the service is unreachable or unavailable, the chat points visitors to the regular
contact form, and messages typed into the chat's own form are sent through formsubmit.co
instead.

Tests for the route handlers (Node's built-in test runner, no extra packages):

```bash
npm test
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
