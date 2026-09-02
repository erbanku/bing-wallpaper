# Changelogs for bing-wallpaper

> Created and Maintained by @erbanku and fellow AI agents

## 09/02/2026

- Added `.cursor/rules/full-upgrade-latest-lts.mdc` to require full latest-LTS upgrades in one pass.
- Upgraded CI actions to current majors: `checkout@v7`, `setup-java@v6`, `setup-node@v7`, `setup-bun@v2` (Node 24 runtime).
- Modernized `.github/workflows/maven.yml`: JDK 21, Node 26, Bun install/build, current GitHub Actions, native git push.
- Raised Maven compiler target from Java 8 to Java 21 in `pom.xml`.
- Ignored `.vscode/` in `.gitignore`.
