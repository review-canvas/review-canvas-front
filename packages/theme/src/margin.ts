import { css } from '@emotion/react';

export interface Margin {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export const generateMarginCSS = (margin: Margin) => {
  return css`
    padding-top: ${margin.top};
    padding-right: ${margin.right};
    padding-bottom: ${margin.bottom};
    padding-left: ${margin.left};
  `;
};
