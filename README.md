# RideShare · Java 8

A Next.js App Router demo of fictional rides to AAB, backed by Neon PostgreSQL. It has a trip list, trip details, a local meeting point selector, GitHub sign-in, and a driver panel. Seat requests remain a simulation.

## Run locally

1. Copy `.env.example` to `.env.local` and fill in the Neon connection URL. Keep `.env.local` private; it is ignored by Git.
2. In Neon, open the SQL Editor for the same database/branch as `DATABASE_URL` and run all of `schema.sql` once. It is safe to rerun.
3. For GitHub sign-in, create a GitHub OAuth App. Set its local callback URL to `http://localhost:3000/api/auth/callback/github` and fill in `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET`.
4. Run `npm install` and `npm run dev`, then open http://localhost:3000.

## Deploy to Vercel

1. Import this GitHub repository (`ilka000/rideshare-mobile`) in Vercel as a Next.js project. The project root is the repository root; use the default build command `npm run build`.
2. Add these Environment Variables in Vercel for Production (and Preview if needed): `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GITHUB_ID`, and `GITHUB_SECRET`. Copy the Neon connection string from the intended Neon branch; keep it server-only and do not use a `NEXT_PUBLIC_` prefix.
3. Use the deployed production URL as `NEXTAUTH_URL`. In the GitHub OAuth App, set the callback URL to `https://YOUR-VERCEL-DOMAIN/api/auth/callback/github`.
4. Run `schema.sql` in that same Neon database/branch if you have not already, then redeploy in Vercel so it picks up the environment variables.
5. Open the deployed site and check the trip list, `/api/udhetimet`, `/panel`, and the GitHub sign-in flow.

Vercel creates deployments from GitHub pushes once the repository is imported and authorized. This repository's `.env.local` is local-only and is not uploaded to Vercel.

## Routes

- `/` — three fictional trips
- `/udhetimi/2` — trip details and meeting point
- `/udhetimi/2/kerkesa` — pending request simulation
- `/udhetimi/99` — trip not found
