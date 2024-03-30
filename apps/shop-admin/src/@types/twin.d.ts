/* eslint-disable -- this file is for type definition */
import 'twin.macro';
import { css as cssImport } from '@emotion/react';
import styledImport, { Interpolation } from '@emotion/styled';

declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  interface DOMAttributes<T> {
    tw?: string;
    css?: Interpolation;
  }
}
