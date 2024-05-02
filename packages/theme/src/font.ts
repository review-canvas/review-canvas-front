import { css } from '@emotion/react';

export interface Font {
  name: string;
  size: string;
  weight: string;
  color: string;
}

export const generateFontCSS = (font: Font) => {
  return css`
    color: ${font.color};
    font-family: var(--${font.name});
    font-size: ${font.size};
    font-weight: ${font.weight};
  `;
};
