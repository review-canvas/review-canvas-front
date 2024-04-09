import {
  Radio as AriaRadio,
  type RadioProps,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  Label,
} from 'react-aria-components';

import createCompositeComponent from './composite-component.tsx';

interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  label?: string;
  children: React.ReactNode;
}

const RadioGroup = createCompositeComponent(
  ({ label, children, ...props }: RadioGroupProps) => {
    return (
      <AriaRadioGroup {...props}>
        <Label>{label}</Label>
        {children}
      </AriaRadioGroup>
    );
  },
  {
    Item: ({ children, ...props }: RadioProps) => {
      return (
        <AriaRadio
          tw="flex items-center gap-[7px] w-fit"
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
                {children}
              </>
            );
          }}
        </AriaRadio>
      );
    },
  },
);

export default RadioGroup;
