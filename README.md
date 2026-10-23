# ToDesktop Builder Migration (Tauri v2 test app)

A stock `create-tauri-app` (vanilla-ts, Vite) app wired to ToDesktop v2 by
following the dashboard's Tauri recipe for app `261020b3s331a`, as written.

- `todesktop.ts`: the recipe's config, unchanged.
- `src-tauri/binaries/`: `todesktop-updater` 0.1.0 from
  `https://dl.todesktop.com/v2/runtime/0.1.0/`, renamed to Tauri's
  `<name>-<target triple>` sidecar names. The Linux one is the static musl
  build, named for the gnu triple the Linux runner builds on.
- `src/main.ts`: shows `install.info()` and the update state from
  `@todesktop/tauri`, with check, download and restart buttons, and says the
  launch is healthy through `src-tauri/src/lib.rs`'s `health_ready`:
  `health.ready()`, plus the `healthy` event with `source: "app"` that smoke
  tests need and plugin 0.1.0 doesn't send.
- `.github/workflows/release.yml`: the recipe's workflow, unchanged.

Release: push a tag `vX.Y.Z` (the trusted ref), or run the workflow by hand
(uses `package.json`'s version).
