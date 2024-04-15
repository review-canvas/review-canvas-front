import {
  Button as AriaButton,
  Label as AriaLabel,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps as AriaListBoxItemProps,
  Popover,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue,
} from 'react-aria-components';
import tw, { css, styled } from 'twin.macro';
import { keyframes, Global } from '@emotion/react';

import createCompositeComponent from '@ui/components/composite-component';

interface SelectProps extends Omit<AriaSelectProps<object>, 'children'> {
  label?: string;
  children: React.ReactNode;
}

interface ListBoxItemProps extends Omit<AriaListBoxItemProps, 'children'> {
  children: React.ReactNode;
}

const Select = createCompositeComponent(
  ({ label, children, ...props }: SelectProps) => (
    <>
      <StyledAriaSelect {...props}>
        {({ isOpen }) => (
          <>
            <AriaLabel>{label}</AriaLabel>
            <AriaButton>
              <SelectValue />
              <OpenIndicator isOpen={isOpen} />
            </AriaButton>
            <Popover
              containerPadding={0}
              offset={2}
            >
              <ListBox className="cursor-pointer">{children}</ListBox>
            </Popover>
          </>
        )}
      </StyledAriaSelect>
      <Global styles={animatedAriaPopover} />
    </>
  ),
  {
    Item: ({ children, ...props }: ListBoxItemProps) => (
      <ListBoxItem {...props}>
        {({ isSelected }) => (
          <span
            className={isSelected ? 'bg-main-primary text-white' : 'text-[#838383]'}
            tw="inline-flex items-center px-3 py-2 rounded-5 w-full"
          >
            {children}
          </span>
        )}
      </ListBoxItem>
    ),
  },
);

export default Select;

interface ItemSelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string;
  items: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

interface ItemSelectItemProps<T> extends Omit<AriaListBoxItemProps<T>, 'children'> {
  children: React.ReactNode;
}

export const createItemSelect = <T extends object>() => {
  return createCompositeComponent(
    ({ label, items, children, ...props }: ItemSelectProps<T>) => (
      <StyledAriaSelect {...props}>
        {({ isOpen }) => (
          <>
            <AriaLabel>{label}</AriaLabel>
            <AriaButton>
              <SelectValue />
              <OpenIndicator isOpen={isOpen} />
            </AriaButton>
            <Popover
              containerPadding={0}
              offset={2}
            >
              <ListBox
                className="cursor-pointer"
                items={items}
              >
                {children}
              </ListBox>
            </Popover>
          </>
        )}
      </StyledAriaSelect>
    ),
    {
      Item: ({ children, ...props }: ItemSelectItemProps<T>) => (
        <ListBoxItem {...props}>
          {({ isSelected }) => (
            <span
              className={isSelected ? 'bg-main-primary text-white' : ''}
              tw="flex items-center px-3 py-2"
            >
              {children}
            </span>
          )}
        </ListBoxItem>
      ),
    },
    'ItemSelect',
  );
};

const slideAnimation = keyframes`
  from {
    transform: translateY(-4px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// noinspection CssUnresolvedCustomProperty,CssUnusedSymbol
const StyledAriaSelect = styled(AriaSelect)`
  .react-aria-Button {
    ${tw`w-full flex items-center justify-between text-sm border border-gray-300 rounded-5`}
    padding: 12px 10px;
    font-family: var(--noto-sans-kr);
  }

  .react-aria-SelectValue {
    color: #838383;
    > span {
      padding: 0;
    }
  }
`;

// noinspection CssUnresolvedCustomProperty,CssUnusedSymbol
const animatedAriaPopover = css`
  .react-aria-Popover[data-entering] {
    animation: ${slideAnimation} 125ms linear;
  }
  .react-aria-Popover[data-exiting] {
    animation: ${slideAnimation} 125ms linear reverse;
  }

  .react-aria-Popover {
    width: var(--trigger-width);
    ${tw`border border-gray-300 rounded-5`};
  }
`;

interface OpenIndicatorProps {
  isOpen: boolean;
}

function OpenIndicator({ isOpen }: OpenIndicatorProps) {
  return (
    <svg
      fill="none"
      height="7"
      viewBox="0 0 13 7"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="origin-center transition-transform duration-100"
        d="M1.09607 0.188113C1.03405 0.128024 0.961093 0.0810475 0.881366 0.0498662C0.801639 0.0186848 0.716703 0.00390908 0.631406 0.00638291C0.54611 0.00885675 0.462124 0.028532 0.384244 0.0642843C0.306364 0.100037 0.236115 0.151167 0.177507 0.214755C0.1189 0.278343 0.0730823 0.353145 0.0426701 0.434887C0.0122578 0.516631 -0.00215334 0.603714 0.000259573 0.691167C0.00267249 0.778621 0.0218621 0.864731 0.0567328 0.944581C0.0916035 1.02443 0.141472 1.09646 0.203492 1.15655L6.05006 6.81794C6.17068 6.93486 6.33036 7 6.49635 7C6.66233 7 6.82202 6.93486 6.94264 6.81794L12.7899 1.15654C12.8532 1.09685 12.9044 1.02484 12.9404 0.944699C12.9764 0.864555 12.9965 0.777876 12.9996 0.689695C13.0026 0.601514 12.9886 0.51359 12.9582 0.431029C12.9278 0.348468 12.8818 0.272916 12.8227 0.208762C12.7636 0.144608 12.6927 0.0931305 12.614 0.0573196C12.5354 0.0215086 12.4506 0.00207847 12.3645 0.000157293C12.2785 -0.00176388 12.1929 0.0138621 12.1128 0.0461282C12.0327 0.0783939 11.9597 0.126657 11.8979 0.188113L6.49635 5.41791L1.09607 0.188113Z"
        fill="black"
        transform={isOpen ? 'rotate(180)' : 'rotate(0)'}
      />
    </svg>
  );
}
