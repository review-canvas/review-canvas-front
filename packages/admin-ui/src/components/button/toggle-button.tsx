import { ToggleButton as AriaToggleButton } from 'react-aria-components';

import { styled } from 'twin.macro';

import { buttonStyle, type ButtonProps } from './base';

const ToggleButton = styled(AriaToggleButton)<ButtonProps>`
  ${buttonStyle};
  border: 1px solid ${({ theme }) => theme.colors.sub.primary};
  color: #838383;
  transition:
    border-color 125ms linear,
    color 125ms linear;

  &[data-selected] {
    border-color: ${({ theme }) => theme.colors.main.primary};
    color: ${({ theme }) => theme.colors.main.primary};
  }
`;

export default ToggleButton;
