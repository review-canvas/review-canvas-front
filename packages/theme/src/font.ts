import { css } from '@emotion/css';

export interface Font {
  name: string;
  size: string;
  bold: string;
  color: string;
}

export const generateFontCSS = (font: Font) => {
  return css`
    color: ${font.color};
    font-family: var(--${font.name});
    font-size: ${font.size};
    font-weight: ${font.bold};
  `;
};
