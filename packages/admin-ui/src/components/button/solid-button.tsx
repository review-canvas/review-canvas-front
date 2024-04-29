import { styled } from 'twin.macro';

import Button from './base.tsx';

const SolidButton = styled(Button)<{ variant: 'primary' | 'gray' }>`
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.main.primary;

      case 'gray':
        return theme.colors.main.quaternary;
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.white;

      case 'gray':
        return '#838383';
    }
  }};
`;

export default SolidButton;
