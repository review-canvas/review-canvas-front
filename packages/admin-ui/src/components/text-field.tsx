import {
  FieldError,
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import { forwardRef } from 'react';
import tw, { styled } from 'twin.macro';

interface StyledProps {
  variant: 'underline' | 'box';
}

interface TextFieldProps extends Omit<AriaTextFieldProps, 'children'>, Partial<StyledProps> {
  label?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  leftIcon?: React.ReactNode;
}

export default forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, errorMessage, placeholder, variant = 'box', leftIcon, ...props },
  ref,
) {
  return (
    <AriaTextField
      tw="flex flex-col gap-2"
      {...props}
    >
      <AriaLabel tw="text-[#9692A7] text-sm">{label}</AriaLabel>
      <InputContainer variant={variant}>
        {leftIcon}
        <AriaInput
          placeholder={placeholder}
          ref={ref}
          tw="text-base placeholder:text-sub-primary flex-1 bg-transparent"
        />
      </InputContainer>
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
});

// noinspection CssUnusedSymbol
const InputContainer = styled.span<StyledProps>`
  ${tw`inline-flex gap-2.5 w-full`};
  border-color: ${({ theme }) => theme.colors.main.tertiary};
  border-style: solid;
  border-radius: ${({ variant }) => (variant === 'box' ? '5px' : 0)};
  border-width: ${({ variant }) => (variant === 'box' ? '1px' : '0 0 1px 0')};

  padding: ${({ variant }) => (variant === 'box' ? '0 10px 8px' : '0 0 8px 0')};
  transition: border-color 125ms linear;
  &:has(input[data-focused]) {
    border-color: ${({ theme }) => theme.colors.main.primary};
  }
`;
