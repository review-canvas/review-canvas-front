import { css } from '@emotion/css';

export interface Padding {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export const generatePaddingCSS = (padding: Padding) => {
  return css`
    padding-top: ${padding.top};
    padding-right: ${padding.right};
    padding-bottom: ${padding.bottom};
    padding-left: ${padding.left};
  `;
};
