import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://huacnlee.com',
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
