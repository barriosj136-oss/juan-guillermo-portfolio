# Vercel publishing and Git connection

## Current state

- The portfolio is a Next.js app and a production deployment is live at <https://portfolio-nu-ashy-28.vercel.app>.
- The GitHub repository is <https://github.com/barriosj136-oss/juan-guillermo-portfolio>, private, with branch `main` pushed.
- This local folder is linked to the existing Vercel project `portfolio` using the official CLI.
- The Vercel GitHub App is installed with access limited to this portfolio repository. The project still needs its Git provider connection completed to enable deployments on every push.
- The site needs no environment variables for the current features.
- The CVs, certificates, and private profile audit files are outside this repository.

## Enable deployment on every GitHub push

Run this once from the portfolio folder in Visual Studio Code's terminal after GitHub and Vercel are authenticated:

```powershell
pnpm dlx vercel git connect --yes
```

This connects the remote Git repository to the Vercel project already linked in `.vercel`. Git commits pushed to `main` can then trigger production deployment automatically. If the CLI asks to select a repository or grant additional GitHub access, stop and review the permission screen; keep Vercel restricted to this repository.

Manual production deploy, if ever needed:

```powershell
pnpm dlx vercel deploy --prod
```

The official [Vercel CLI `git` command](https://vercel.com/docs/cli/git) connects a Git provider remote to the linked project. Vercel's [GitHub deployment documentation](https://vercel.com/docs/git/vercel-for-github) describes deployments from repository commits. The current production deployment is live; the `vercel git connect` step above is pending.

The local `.vercel` folder and `.env.local` credentials are ignored by Git. Never upload either to GitHub.
