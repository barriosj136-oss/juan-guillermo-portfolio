# Professional portfolio

Bilingual (English / Spanish) portfolio for junior Data Analyst, BI Analyst, Business Analyst, and Operations Analyst roles. The main site uses Next.js App Router, React, and TypeScript with custom CSS and no UI or chart libraries.

## Local requirements and start

The project was built with Node.js 24.19.0 and Next.js 16.4.0. Next.js 16 requires Node.js 20.9 or newer. Package manager used here: pnpm.

1. Open PowerShell in this folder.
2. Run `pnpm install` once if dependencies are not present.
3. Run `pnpm dev`.
4. Open the local URL printed by Next.js, normally `http://localhost:3000`.

To inspect the optimized build, run `pnpm build` and then `pnpm start`. The `predev` and `prebuild` scripts synchronize the standalone operations demo from `projects/operations-data-review-suite` into `public/operations-data-review-suite`. Edit the source folder, not the generated copy.

## Routes

- `/` — bilingual portfolio.
- `/projects/operations-data-review-suite` — case study with embedded interactive app.
- `/operations-data-review-suite/index.html` — standalone interactive app.
- `/projects/novatech` — synthetic monthly performance case, dataset, and Python analysis.

## GitHub setup (later)

A local repository can be initialized and committed without a GitHub account. After the account becomes available, create an empty GitHub repository, add its URL as `origin`, then push the local branch. The repository has no remote configured now. Never commit credentials, `.env` files, customer data, or private CVs/certificates. The fictional NovaTech source CSV is explicitly allowed by `.gitignore` for the project.

## Data and privacy

The Operations demo uses fabricated records and browser-local storage. It has no connection to Iron Mountain, customers, Google Sheets, or a backend. NovaTech is fictional. CVs and credential audit materials live outside this project folder. No public deployment has been configured.

## Validation

`next build` completed successfully in this environment. It type-checked and statically generated `/`, `/projects/novatech`, and `/projects/operations-data-review-suite`. The browser-use preview could not reach the local port during this final pass; HTTP GET to the local production server returned status 200. No remote deployment or account connection was attempted.
