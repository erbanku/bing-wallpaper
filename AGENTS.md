# AGENTS.md

## Project

Daily Bing wallpaper scraper (Java/Maven) plus static Next.js site exported to `docs/` for GitHub Pages and built by Cloudflare Pages from this GitHub repo.

## Stack

|  Layer  | Tech                                                                             |
| :-----: | :------------------------------------------------------------------------------- |
| Scraper | Java 21, Maven, fastjson                                                         |
|  Site   | Next.js 16, React 19, Tailwind 4, Bun 1.4                                        |
|   CI    | GitHub Actions (`checkout@v7`, `setup-java@v6`, `setup-node@v7`, `setup-bun@v2`) |
| Deploy  | Cloudflare Pages (`bing-wallpaper`) linked to `erbanku/bing-wallpaper` on Main   |

## Agent rules

`.cursor/rules/full-upgrade-latest-lts.mdc` — when upgrading CI, runtimes, or deps, bump to latest LTS/stable majors in one pass (no partial action-version fixes).

## CI workflow

`.github/workflows/maven.yml` runs on schedule (09:00 UTC) and manual dispatch:

1. `mvn package` then run `target/bing-wallpaper-jar-with-dependencies.jar`
2. `bun install --frozen-lockfile` and `bun run build` in `nextjs-app/`
3. Copy `nextjs-app/out/*` to `docs/` and commit/push if changed

Requires `contents: write` for `GITHUB_TOKEN` push.

## Cloudflare Pages

- Account: Cloudflare 1 - Main (`36cc5642d2d603e7486c6345407d2550`)
- Project: `bing-wallpaper` (GitHub source, production branch `main`)
- Root directory: `nextjs-app`
- Build: install Bun, then `bun install --frozen-lockfile && bun run build`
- Output: `out`
- URLs: https://bing-wallpaper-df7.pages.dev and https://bing.erbanku.com

Pushes to `main` trigger a Cloudflare Pages production build. The daily Actions job’s push also triggers Pages.

## Local dev

```sh
mvn package
java -jar target/bing-wallpaper-jar-with-dependencies.jar
cd nextjs-app && bun install && bun run dev
```

Last updated: 2026-09-05 (Cloudflare Pages GitHub connection)
