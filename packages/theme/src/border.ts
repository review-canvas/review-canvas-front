import { css } from '@emotion/react';

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

export interface BorderRadius {
  topLeft: string;
  topRight: string;
  bottomRight: string;
  bottomLeft: string;
}

export const generateBorderRadiusCSS = (borderRadius: BorderRadius) => {
  return css`
    border-top-left-radius: ${borderRadius.topLeft};
    border-top-right-radius: ${borderRadius.topRight};
    border-bottom-right-radius: ${borderRadius.bottomRight};
    border-bottom-left-radius: ${borderRadius.bottomLeft};
  `;
};
