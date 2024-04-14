import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

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
 * @param width - default value is 'lg'
 */
const Button = styled(AriaButton)<ButtonProps>`
  height: ${({ size = 'lg' }) => (size === 'sm' ? 35 : 40)}px;
  width: ${({ size = 'lg' }) => width[size]}px;
`;

export default Button;
