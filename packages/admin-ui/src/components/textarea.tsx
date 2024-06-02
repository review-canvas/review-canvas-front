import { useLayoutEffect, useRef } from 'react';
import type { TextAreaProps as AriaTextAreaProps } from 'react-aria-components';
import { TextArea as AriaTextArea } from 'react-aria-components';
import { css, styled } from 'twin.macro';

export interface TextAreaProps extends Omit<AriaTextAreaProps, 'onChange'> {
  autoResize?: boolean;
  rows?: number;
  onChange?: (_value: string) => void;
}

export default function TextArea({ autoResize = true, rows = 4, onChange, ...props }: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textArea = textAreaRef.current;
    if (autoResize && textArea) {
      const updateHeight = () => {
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
      };

      updateHeight();

      textArea.addEventListener('input', updateHeight);
      return () => {
        textArea.removeEventListener('input', updateHeight);
      };
    }
  }, [autoResize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <StyledAriaTextArea
      {...props}
      ref={textAreaRef}
      rows={rows}
      onChange={handleChange}
    />
  );
}

const StyledAriaTextArea = styled(AriaTextArea)(({ theme }) => [
  css`
    color: #000000;
    font-size: 12.5px;
    border: 1px solid ${theme.colors.main.quaternary};
    outline: none;
    padding: 10px;
    border-radius: 4px;
    resize: none;
    overflow-y: hidden;
    transition: border 0.3s;

    &::placeholder {
      color: #838383;
    }

    &:focus,
    &:not(:placeholder-shown) {
      border-color: ${theme.colors.main.primary};
    }
  `,
]);
