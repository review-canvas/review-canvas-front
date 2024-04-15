import { styled } from 'twin.macro';

import Button, { type ButtonProps } from './base';
import type { VariantLevel } from '@ui/types/theme';

export interface OutlineButtonProps extends ButtonProps {
  variant?: Extract<VariantLevel, 'primary' | 'secondary'>;
}

const OutlineButton = styled(Button)<OutlineButtonProps>`
  color: ${({ theme, variant }) => (variant === 'primary' ? theme.colors.white : '#838383')};
  border: 1px solid
    ${({ theme, variant }) => (variant === 'primary' ? theme.colors.main.primary : theme.colors.sub.primary)};
`;

export default OutlineButton;
