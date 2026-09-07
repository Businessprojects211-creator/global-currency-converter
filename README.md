# Global Currency Converter

A Next.js currency converter with live rates from the server-side Frankfurter provider. The provider is isolated in `lib/exchange-rate-provider.ts` so it can be replaced without changing the UI or API contract.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` if needed. Frankfurter requires no API key. Rate responses are cached for 15 minutes by Next.js.

## API

- `GET /api/currencies`
- `GET /api/rates?base=USD`
- `GET /api/convert?from=USD&to=EUR&amount=100`
- `GET /api/history?from=USD&to=EUR&period=1Y`
- `GET /api/popular-pairs`
- `GET /api/search?q=uganda`

Pair pages use `/convert/USD/EUR?amount=100`. Currency pages use `/currency/usd`; the searchable directory is `/search`.

## Production

```bash
npm run build
npm start
```

A Docker image can be built with `docker build -t global-convert .` and run with `docker run -p 3000:3000 global-convert`. Set `EXCHANGE_RATE_PROVIDER`, `EXCHANGE_RATE_API_KEY`, and `NEXT_PUBLIC_SITE_URL` in the hosting environment when switching provider or domain. Advertising remains disabled unless `ADS_ENABLED=true` is explicitly configured. Each route reserves four global ad placements; add approved network slot IDs to the `ADSENSE_SLOT_*` variables before wiring its script into `AdBanner`.

For local PostgreSQL, copy `.env.example` to `.env.local`, set `DATABASE_URL`, and run `docker compose up db`. The schema is in `prisma/schema.prisma`. Before enabling authenticated persistence, install matching Prisma CLI and client versions, run `npm run db:generate`, then create and deploy migrations with `npx prisma migrate dev --name init` and `npx prisma migrate deploy`.

Public conversion, rates, and history endpoints are throttled to 60 requests per minute per forwarded client address. The current limiter is process-local; use a shared Redis or platform rate-limit service when running multiple instances.

## Scope

Anonymous conversion is available without an account. Cookie consent is implemented for optional integrations, while authentication, authenticated persistence, analytics, and ad-network scripts require the corresponding provider credentials and deployment configuration; no credentials or fake persistence are included.
