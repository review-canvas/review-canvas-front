import { css } from '@emotion/css';

export interface Border {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export const generateBorderCSS = (border: Border, color: string) => {
  return css`
    border-top: ${border.top} solid ${color};
    border-right: ${border.right} solid ${color};
    border-bottom: ${border.bottom} solid ${color};
    border-left: ${border.left} solid ${color};
  `;
};
