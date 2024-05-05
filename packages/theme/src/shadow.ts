import { css } from '@emotion/react';

export const enum Shadow {
  NONE = 'NONE',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export const generateShadowCSS = (shadow: Shadow, color: string) => {
  // TODO: Implement the function that returns the CSS for the shadow
  switch (shadow) {
    case Shadow.NONE:
      return css`
        box-shadow: none;
      `;
    case Shadow.SMALL:
      return css`
        box-shadow: 0 2px 4px 0 ${color};
      `;
    case Shadow.MEDIUM:
      return css`
        box-shadow: 0 4px 8px 0 ${color};
      `;
    case Shadow.LARGE:
      return css`
        box-shadow: 0 8px 16px 0 ${color};
      `;
  }
};
