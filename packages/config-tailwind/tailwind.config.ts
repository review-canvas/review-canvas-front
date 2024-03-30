import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import animationPlugin from 'tailwindcss-animate';
import scrollbarPlugin from 'tailwind-scrollbar';
import daisyuiPlugin from 'daisyui';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin, animationPlugin, scrollbarPlugin, daisyuiPlugin],
};
export default config;
