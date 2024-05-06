import { css } from '@emotion/react';

export type Shadow = 'none' | 'small' | 'medium' | 'large';

export const generateShadowCSS = (shadow: Shadow, color: string) => {
  // TODO: Implement the function that returns the CSS for the shadow
  switch (shadow) {
    case 'none':
      return css`
        box-shadow: none;
      `;
    case 'small':
      return css`
        box-shadow: 0 2px 4px 0 ${color};
      `;
    case 'medium':
      return css`
        box-shadow: 0 4px 8px 0 ${color};
      `;
    case 'large':
      return css`
        box-shadow: 0 8px 16px 0 ${color};
      `;
  }
};
