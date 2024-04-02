import type { Config } from 'tailwindcss';
import animationPlugin from 'tailwindcss-animate';
import scrollbarPlugin from 'tailwind-scrollbar';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {},
  },
  plugins: [animationPlugin, scrollbarPlugin],
};
export default config;
