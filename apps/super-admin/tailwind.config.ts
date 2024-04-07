// tailwind config is required for editor support

import type { Config } from 'tailwindcss';

import adminUIConfig from '@review-canvas/admin-ui/tailwind.config.ts';

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/app/**/*.tsx', './src/components/**/*.tsx'],
  presets: [adminUIConfig],
};

export default config;
