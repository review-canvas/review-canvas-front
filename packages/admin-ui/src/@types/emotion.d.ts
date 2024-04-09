import '@emotion/react';
import type { VariantLevel } from 'types/theme.ts';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string;
      main: Record<VariantLevel, string>;
      sub: Record<Extract<VariantLevel, 'primary' | 'secondary'>, string>;
    };
  }
}
