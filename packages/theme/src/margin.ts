import { css } from '@emotion/react';

export interface Margin {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export const generateMarginCSS = (margin: Margin) => {
  return css`
    margin-top: ${margin.top};
    margin-right: ${margin.right};
    margin-bottom: ${margin.bottom};
    margin-left: ${margin.left};
  `;
};
