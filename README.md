# InternDesk

InternDesk uses a React/Vite frontend, an Express API, and MySQL. In development, Vite forwards `/api` and `/health` requests to the API on port 5000.

## Run locally

1. Install frontend dependencies with `npm install` in the repository root.
2. In `server/`, copy `.env.example` to `.env` and replace every placeholder with locally generated credentials.
3. Start MySQL from `server/` with `npm run db:up` (Docker required).
4. In `server/`, install backend dependencies with `npm install`, then run `npm run db:migrate`.
5. Start the API with `npm run dev` from `server/` (or `npm run dev:api` from the repository root).
6. Start Vite with `npm run dev` from the repository root and open the displayed URL.

Configure a Brevo API key and verified sender before registering accounts. Verification codes are never printed to logs. Use different random values of at least 32 characters for `PASSWORD_PEPPER` and `OTP_PEPPER`. The frontend uses the API for authentication, profiles, internships, applications, saved listings, notifications, and employer management. The API health endpoint at `/health` reports whether MySQL is connected.
