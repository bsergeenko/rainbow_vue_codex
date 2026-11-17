import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1, timeout: 30000,
  globalSetup: './tests/browser/server.js',
  use: { baseURL: 'http://localhost:5180', channel: 'chrome', locale: 'de-DE', viewport: { width: 1440, height: 1000 }, screenshot: 'only-on-failure', trace: 'retain-on-failure' }
})
