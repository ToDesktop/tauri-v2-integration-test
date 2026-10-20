import { defineConfig } from '@todesktop/config';

export default defineConfig({
  appId: '261020b3s331a',
  productName: 'ToDesktop Builder Migration',
  description: 'What your app does',
  maintainer: 'Your Company <support@example.com>',
  // The version is the workflow's: a tag (v1.2.3), else package.json's.
  // mac: left out until the app has a Developer ID and notarization key
  // in Account › Signing (a Mac build fails without them).
  // Preview: Tauri makes no app folder here, so the workflow gathers your
  // binary and the updater, without bundle.resources.
  windows: {
    apps: { x64: 'dist/windows-x64' },
    executable: 'todesktop-builder-migration.exe', // your Cargo package name
  },
  linux: {
    apps: { x64: 'dist/linux-x64' },
    executable: 'todesktop-builder-migration',
    depends: ['libwebkit2gtk-4.1-0', 'libgtk-3-0'],
    formats: ['deb', 'tar.gz'],
  },
});
