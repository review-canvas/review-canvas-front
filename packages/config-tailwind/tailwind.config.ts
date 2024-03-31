import type { Config } from 'tailwindcss';
import animationPlugin from 'tailwindcss-animate';
import scrollbarPlugin from 'tailwind-scrollbar';
import daisyuiPlugin from 'daisyui';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {},
  },
  plugins: [animationPlugin, scrollbarPlugin, daisyuiPlugin],
};
export default config;
