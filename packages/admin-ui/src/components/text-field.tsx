import {
  FieldError,
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import tw, { styled } from 'twin.macro';

interface StyledAriaInputProps {
  variant: 'underline' | 'box';
}

interface TextFieldProps extends Omit<AriaTextFieldProps, 'children'>, Partial<StyledAriaInputProps> {
  label?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export default function TextField({ label, errorMessage, placeholder, variant = 'box', ...props }: TextFieldProps) {
  return (
    <StyledAriaTextField {...props}>
      <AriaLabel tw="text-[#9692A7] text-sm">{label}</AriaLabel>
      <StyledAriaInput
        placeholder={placeholder}
        variant={variant}
      />
      <FieldError>{errorMessage}</FieldError>
    </StyledAriaTextField>
  );
}

const StyledAriaTextField = styled(AriaTextField)`
  ${tw`flex flex-col gap-2`};
`;

const StyledAriaInput = styled(AriaInput)<StyledAriaInputProps>`
  ${tw`text-base`};
  border-radius: ${({ variant }) => (variant === 'box' ? '5px' : 0)};
  border-color: ${({ theme }) => theme.colors.main.tertiary};
  border-style: solid;
  border-width: ${({ variant }) => (variant === 'box' ? '1px' : '0 0 1px 0')};

  padding-top: ${({ variant }) => (variant === 'box' ? '8px' : 0)};
  padding-bottom: 8px;
  &[data-focused] {
    border-color: ${({ theme }) => theme.colors.main.primary};
  }
  transition: border-color 125ms linear;
  &::placeholder {
    ${tw`text-sub-primary`};
  }
`;
