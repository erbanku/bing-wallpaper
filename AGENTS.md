# AGENTS.md

## Project

Daily Bing wallpaper scraper (Java/Maven) plus static Next.js site exported to `docs/` for GitHub Pages.

## Stack

|  Layer  | Tech                                                                             |
| :-----: | :------------------------------------------------------------------------------- |
| Scraper | Java 21, Maven, fastjson                                                         |
|  Site   | Next.js 16, React 19, Tailwind 4, Bun 1.4                                        |
|   CI    | GitHub Actions (`checkout@v7`, `setup-java@v6`, `setup-node@v7`, `setup-bun@v2`) |

## Agent rules

`.cursor/rules/full-upgrade-latest-lts.mdc` — when upgrading CI, runtimes, or deps, bump to latest LTS/stable majors in one pass (no partial action-version fixes).

## CI workflow

`.github/workflows/maven.yml` runs on schedule (09:00 UTC) and manual dispatch:

1. `mvn package` then run `target/bing-wallpaper-jar-with-dependencies.jar`
2. `bun install --frozen-lockfile` and `bun run build` in `nextjs-app/`
3. Copy `nextjs-app/out/*` to `docs/` and commit/push if changed

Requires `contents: write` for `GITHUB_TOKEN` push.

## Local dev

```sh
mvn package
java -jar target/bing-wallpaper-jar-with-dependencies.jar
cd nextjs-app && bun install && bun run dev
```

Last updated: 2026-09-02 (CI action majors)
