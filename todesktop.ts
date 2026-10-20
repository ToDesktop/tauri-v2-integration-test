import { defineConfig } from '@todesktop/config';

export default defineConfig({
  appId: '261020b3s331a',
  productName: 'ToDesktop Builder Migration',
  description: 'What your app does',
  maintainer: 'Your Company <support@example.com>',
  // The version is the workflow's: a tag (v1.2.3), else package.json's.
  mac: {
    // What tauri build --bundles app makes, unsigned: ToDesktop signs it.
    apps: {
      arm64: 'src-tauri/target/aarch64-apple-darwin/release/bundle/macos/ToDesktop Builder Migration.app',
      x64: 'src-tauri/target/x86_64-apple-darwin/release/bundle/macos/ToDesktop Builder Migration.app',
    },
    formats: ['dmg'],
  },
  // Preview: Tauri makes no app folder here, so the workflow gathers your
  // binary and the updater, without bundle.resources.
  windows: {
    apps: { x64: 'dist/windows-x64', arm64: 'dist/windows-arm64' },
    executable: 'todesktop-builder-migration.exe', // your Cargo package name
  },
  linux: {
    apps: { x64: 'dist/linux-x64' },
    executable: 'todesktop-builder-migration',
    depends: ['libwebkit2gtk-4.1-0', 'libgtk-3-0'],
    formats: ['deb', 'tar.gz'],
  },
});
