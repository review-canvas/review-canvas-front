import type { Config } from 'tailwindcss';

import sharedConfig from '@review-canvas/tailwind-config';

const rem = (px: number) => `${px / 16}rem`;

const config: Pick<Config, 'prefix' | 'presets' | 'content' | 'theme'> = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontSize: {
        sm: [rem(12.5), { lineHeight: rem(18), fontWeight: 400 }],
        base: [rem(14), { lineHeight: rem(20) }],
        lg: [rem(15), { lineHeight: rem(22), fontWeight: 500 }],
        ml: [rem(18), { lineHeight: rem(22), fontWeight: 500 }],
        xl: [rem(22), { lineHeight: rem(32), fontWeight: 500 }],
        '2xl': [rem(26), { lineHeight: rem(38), fontWeight: 500 }],
      },
      borderRadius: {
        '5': rem(5),
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        main: {
          primary: '#3F21BD',
          secondary: '#464759',
          tertiary: '#C8CAD9',
          quaternary: '#E1E2ED',
        },
        sub: {
          primary: '#B5B9D0',
          secondary: '#F4F5FB',
        },
      },
    },
  },
  presets: [sharedConfig],
};

export default config;
