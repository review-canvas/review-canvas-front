import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

import { css } from '@emotion/react';
import { styled } from 'twin.macro';

import type { SizeLevel } from '@/types/theme';

export interface ButtonProps extends AriaButtonProps {
  size?: SizeLevel;
}

const width = {
  sm: 92,
  md: 165,
  lg: 285,
} satisfies Record<SizeLevel, number>;

/**
 * @param size - default value is 'lg'
 */
export const buttonStyle = ({ size = 'lg' }: ButtonProps) => css`
  height: ${size === 'sm' ? 35 : 40}px;
  width: ${width[size]}px;
`;

/**
 * @param width - default value is 'lg'
 */
const Button = styled(AriaButton)<ButtonProps>`
  ${buttonStyle}
`;

export default Button;
