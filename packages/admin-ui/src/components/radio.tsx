import {
  Label,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioProps as AriaRadioProps,
} from 'react-aria-components';

import { styled } from 'twin.macro';

import createCompositeComponent from './composite-component.tsx';

interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  label?: string;
  children: React.ReactNode;
}

interface RadioProps extends Omit<AriaRadioProps, 'children'> {
  children?: React.ReactNode;
}

const RadioGroup = createCompositeComponent(
  ({ label, children, ...props }: RadioGroupProps) => {
    return (
      <StyledAriaRadioGroup {...props}>
        <Label>{label}</Label>
        {children}
      </StyledAriaRadioGroup>
    );
  },
  {
    Item: ({ children, ...props }: RadioProps) => {
      return (
        <AriaRadio
          tw="inline-flex items-center gap-[7px] w-fit"
          {...props}
        >
          {({ isSelected }) => {
            return (
              <>
                <svg
                  fill="none"
                  height="18"
                  viewBox="0 0 18 18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    className="transition-all"
                    height="17"
                    rx="4.5"
                    stroke={isSelected ? '#3F21BD' : '#8B7FC0'}
                    width="17"
                    x="0.5"
                    y="0.5"
                  />
                  {isSelected ? (
                    <rect
                      fill="#3F21BD"
                      height="12"
                      rx="3"
                      width="12"
                      x="3"
                      y="3"
                    />
                  ) : null}
                </svg>
                <span tw="text-sm -translate-y-px">{children}</span>
              </>
            );
          }}
        </AriaRadio>
      );
    },
  },
);

export default RadioGroup;

const StyledAriaRadioGroup = styled(AriaRadioGroup)`
  display: flex;
  &[data-orientation='horizontal'] {
    flex-direction: row;
    align-items: center;
  }
`;
