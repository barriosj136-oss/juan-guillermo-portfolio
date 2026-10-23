# Vercel publishing plan

## Current state

- The portfolio is a Next.js app and `pnpm run build` succeeds.
- The Git repository lives at the root of this folder (`outputs/portfolio` in the working folder). If you create a GitHub repository from it, its root will contain `package.json`, `pnpm-lock.yaml`, `app/`, and `projects/`.
- No `.vercel` project link, Vercel CLI, Git remote, or deployment exists in this workspace.
- The site needs no environment variables for the current features.
- The CVs, certificates, and private profile audit files are outside this repository.

## Publish after GitHub access is available

1. Sign in to GitHub yourself and create an empty repository. Do not upload certificates, identity documents, private audit notes, `.env` files, or customer/company source data.
2. From this folder, connect the existing local repository to the new GitHub repository and push the `main` branch. Do not create a second project folder or initialize over the existing local `.git` history.
3. Sign in to Vercel yourself, choose **Add New → Project**, and import that GitHub repository.
4. Vercel should detect Next.js. Keep the project root at `./`, install command at its detected pnpm default, and build command `pnpm run build`. No environment variables are needed for the current app.
5. Deploy a Preview first. Open the provided preview URL on desktop and mobile, verify the English/Spanish controls, and confirm that synthetic data is clearly identified.
6. When you approve that preview, promote/deploy the `main` branch to Production in Vercel. Add a custom domain only if you own it and want one.

Vercel's official Next.js docs describe the framework as zero-configuration. Their CLI deployment flow requires linking a project, while Git-connected deployments build on repository pushes. This workspace has neither a Vercel link nor a Git remote yet, so this guide is the prepared handoff rather than an active deployment.

Official docs: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [Deploying Git repositories](https://vercel.com/docs/git), [Deploy from the CLI](https://vercel.com/docs/projects/deploy-from-cli).
