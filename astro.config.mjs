// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://familukis.com',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [],
});
