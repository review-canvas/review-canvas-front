import { ToggleButton as AriaToggleButton, type ToggleButtonProps } from 'react-aria-components';

import tw, { styled } from 'twin.macro';

type Props = ToggleButtonProps & {
  className?: string;
};

export default function ToggleButton({ children, ...props }: Props) {
  return <StyledAriaToggleButton {...props}>{children}</StyledAriaToggleButton>;
}

const StyledAriaToggleButton = styled(AriaToggleButton)`
  ${tw`rounded-5 flex justify-center items-center`};
  border: 1px solid ${({ theme }) => theme.colors.sub.primary};
  color: #838383;
  transition: border-color 75ms linear, color 75ms linear;
  
  &[data-selected] {
    border-color: ${({ theme }) => theme.colors.main.primary};
    color: ${({ theme }) => theme.colors.main.primary};
  }
`;
