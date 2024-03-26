import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import animationPlugin from 'tailwindcss-animate';
import scrollbarPlugin from 'tailwind-scrollbar';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {},
  },
  plugins: [
    typographyPlugin,
    animationPlugin,
    scrollbarPlugin
  ],
};
export default config;
