import { defineConfig, tauriConfig } from '@todesktop/config';

export default defineConfig({
  // Names, description, maintainer, icons, executables and Linux depends:
  // src-tauri/tauri.conf.json and Cargo.toml.
  extends: tauriConfig(),
  appId: '261020b3s331a',
  // The version is the workflow's: a tag (v1.2.3), else package.json's.
  mac: {
    // What tauri build --bundles app makes, unsigned: ToDesktop signs it.
    // The preset names only arm64's; this workflow builds Intel too.
    apps: {
      arm64: 'src-tauri/target/aarch64-apple-darwin/release/bundle/macos/ToDesktop Builder Migration.app',
      x64: 'src-tauri/target/x86_64-apple-darwin/release/bundle/macos/ToDesktop Builder Migration.app',
    },
  },
  // tauri build --no-bundle --target leaves the binary here; the preset
  // makes the app folder from it, with the updater and bundle.resources.
  // No icons yet: CI uploads don't carry the files, so the builders can't
  // find what tauriConfig() names.
  windows: {
    apps: {
      x64: 'src-tauri/target/x86_64-pc-windows-msvc/release',
      arm64: 'src-tauri/target/aarch64-pc-windows-msvc/release',
    },
    icon: undefined,
  },
  linux: {
    apps: { x64: 'src-tauri/target/x86_64-unknown-linux-gnu/release' },
    formats: ['deb', 'tar.gz'],
    icon: undefined,
  },
});
