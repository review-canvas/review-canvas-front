import 'twin.macro';

import type { css as cssImport } from '@emotion/react';
import type { Interpolation } from '@emotion/styled';
import type styledImport from '@emotion/styled';

import type { VariantLevel } from '@ui/types/theme.ts';

declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- this is used by twin.macro
  interface DOMAttributes<T> {
    tw?: string;
    css?: Interpolation;
  }
}

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string;
      main: Record<VariantLevel, string>;
      sub: Record<Extract<VariantLevel, 'primary' | 'secondary'>, string>;
    };
  }
}
