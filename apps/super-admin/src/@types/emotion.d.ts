import '@emotion/react';

type Level = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      main: Record<Level, string>;
      sub: Record<Extract<Level, 'primary' | 'secondary'>, string>;
    };
  }
}
