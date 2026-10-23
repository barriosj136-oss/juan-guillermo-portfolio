# Professional portfolio

Bilingual (English / Spanish) portfolio for junior Data Analyst, BI Analyst, Business Analyst, and Operations Analyst roles. The main site uses Next.js App Router, React, and TypeScript with custom CSS and no UI or chart libraries.

## Local preview

1. Open PowerShell in this folder.
2. Run `pnpm install` once if dependencies are not present.
3. Run `pnpm dev`.
4. Open `http://localhost:3000`.

For an optimized local preview, run `pnpm build` then `pnpm start`.

## Routes

- `/` — bilingual portfolio and experience.
- `/projects/operations-data-review-suite` — case study with embedded interactive app.
- `/operations-data-review-suite/index.html` — standalone interactive app.
- `/projects/novatech` — synthetic monthly performance case, data model, SQL, and Python checks.
- `/projects/operations-decision-copilot` — fictional bilingual decision-support demonstration.

## Vercel

The app builds for production with Next.js and needs no environment variables. GitHub and Vercel are not connected. See [VERCEL-PUBLISHING-GUIDE.md](VERCEL-PUBLISHING-GUIDE.md) for the safe sequence to publish after GitHub access is available. The app source is the Git repository root. The private CVs, certificates, and profile audit files are outside the repository.

## Data and privacy

Portfolio demonstrations use synthetic data and are not connected to Iron Mountain, customers, spreadsheets, or external business systems. Internal account or invoice volumes are not published. Do not commit credentials, `.env` files, customer data, certificates, national identifiers, or private CV copies.
