import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://huacnlee.com',
  integrations: [react(), sitemap({
    filter: (page) => ['/', '/work/', '/zh/', '/zh/work/'].includes(new URL(page).pathname),
    i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-CN' } },
  })],
  vite: { plugins: [tailwindcss()] },
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
