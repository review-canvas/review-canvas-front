import { ToggleButton as AriaToggleButton } from 'react-aria-components';

import tw, { styled } from 'twin.macro';

const ToggleButton = styled(AriaToggleButton)`
  ${tw`rounded-5 flex justify-center items-center`};
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
