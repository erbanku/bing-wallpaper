# AGENTS.md

## Project

Daily Bing wallpaper scraper (Java/Maven) plus static Next.js site exported to `docs/` for GitHub Pages and deployed to Cloudflare Pages.

## Stack

|  Layer  | Tech                                                                             |
| :-----: | :------------------------------------------------------------------------------- |
| Scraper | Java 21, Maven, fastjson                                                         |
|  Site   | Next.js 16, React 19, Tailwind 4, Bun 1.4                                        |
|   CI    | GitHub Actions (`checkout@v7`, `setup-java@v6`, `setup-node@v7`, `setup-bun@v2`) |
| Deploy  | Cloudflare Pages project `bing-wallpaper` (account Cloudflare 1 - Main)          |

## Agent rules

`.cursor/rules/full-upgrade-latest-lts.mdc` — when upgrading CI, runtimes, or deps, bump to latest LTS/stable majors in one pass (no partial action-version fixes).

## CI workflow

`.github/workflows/maven.yml` runs on schedule (09:00 UTC), push to `main`, and manual dispatch:

1. `mvn package` then run `target/bing-wallpaper-jar-with-dependencies.jar`
2. `bun install --frozen-lockfile` and `bun run build` in `nextjs-app/`
3. Copy `nextjs-app/out/*` to `docs/`
4. Deploy `nextjs-app/out` to Cloudflare Pages (`bing-wallpaper`) via `cloudflare/wrangler-action@v3`
5. Commit/push docs + README updates with `[skip ci]` if changed

Requires:

- `contents: write` for `GITHUB_TOKEN` push
- repo secret `CLOUDFLARE_API_TOKEN` (Pages write on Cloudflare 1 - Main)

Production URL: https://bing-wallpaper-df7.pages.dev

## Local dev

```sh
mvn package
java -jar target/bing-wallpaper-jar-with-dependencies.jar
cd nextjs-app && bun install && bun run dev
```

Last updated: 2026-09-05 (Cloudflare Pages auto-deploy)
