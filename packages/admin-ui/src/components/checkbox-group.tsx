import {
  FieldError as AriaFieldError,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult as AriaValidationResult,
} from 'react-aria-components';
import { styled } from 'twin.macro';

interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children' | 'label'> {
  children?: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function CheckboxGroup({ label, errorMessage, children, orientation = 'horizontal', ...props }: CheckboxGroupProps) {
  return (
    <StyledAriaCheckboxGroup
      {...props}
      data-orientation={orientation}
    >
      {label}
      {children}
      <AriaFieldError>{errorMessage}</AriaFieldError>
    </StyledAriaCheckboxGroup>
  );
}

export default CheckboxGroup;

const StyledAriaCheckboxGroup = styled(AriaCheckboxGroup)`
  display: flex;

  &[data-orientation='horizontal'] {
    flex-direction: row;
    align-items: center;
  }
`;
