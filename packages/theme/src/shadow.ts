import { css } from '@emotion/react';

export type Shadow = 'NONE' | 'SMALL' | 'MEDIUM' | 'LARGE';

export const generateShadowCSS = (shadow: Shadow, color: string) => {
  // TODO: Implement the function that returns the CSS for the shadow
  switch (shadow) {
    case 'NONE':
      return css`
        box-shadow: none;
      `;
    case 'SMALL':
      return css`
        box-shadow: 0 2px 4px 0 ${color};
      `;
    case 'MEDIUM':
      return css`
        box-shadow: 0 4px 8px 0 ${color};
      `;
    case 'LARGE':
      return css`
        box-shadow: 0 8px 16px 0 ${color};
      `;
  }
};
