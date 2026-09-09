# huacnlee.com

Jason Lee's bilingual profile and open-source portfolio, built with Bun, Astro, Tailwind CSS v4, and shadcn/ui (Base UI).

## Development

```sh
bun install
bun run dev
```

## Validation and preview

```sh
bun run check
bun run build
bun run preview
```

## Project structure

- `src/pages/index.md`: English profile.
- `src/pages/work.md`: English open-source portfolio.
- `src/pages/zh/`: Chinese profile and portfolio, linked through the language switcher.
- `src/layouts/Site.astro`: Shared layout, navigation, and metadata.
- `src/styles/global.css`: Tailwind styles and a monochrome theme that follows the system color scheme.
- `public/favicon.svg`: JL favicon source, with ICO and PNG fallbacks.

Static output is generated in `dist/`. Fonts are bundled locally. Historical posts, blog routes, and RSS feeds have been removed.

## CI and deployment

The default branch is `main`. GitHub Actions installs the Bun version specified in `package.json` and dependencies from the frozen lockfile, then runs Astro and TypeScript checks and builds the site. CI does not install or run a browser.

- Pull requests run validation without publishing.
- Pushes and merges to `main` deploy `dist/` to GitHub Pages after all checks pass.
- The `CI and Pages` workflow can also be triggered manually; only `main` can deploy.

Under repository Settings → Pages → Source, select **GitHub Actions**. The `github-pages` environment must allow deployments from `main`. No Ruby, generated-output branch, or additional deployment secrets are required.

The site URL and `public/CNAME` currently reference `huacnlee.com`. Custom domains are managed in the repository's Pages settings; the CNAME file alone does not configure a domain for Actions deployments.
