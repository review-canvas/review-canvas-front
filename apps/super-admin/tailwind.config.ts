// tailwind config is required for editor support

import type { Config } from 'tailwindcss';

import adminUIConfig from '@review-canvas/admin-ui/tailwind.config.ts';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: ['./src/app/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--roboto)'],
        'sans-kr': ['var(--noto-sans-kr)'],
      },
    },
  },
  presets: [adminUIConfig],
};

export default config;
