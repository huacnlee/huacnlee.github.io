import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:4387' },
  webServer: {
    command: 'bun scripts/preview-test.ts',
    url: 'http://127.0.0.1:4387',
    reuseExistingServer: false,
  },
});
