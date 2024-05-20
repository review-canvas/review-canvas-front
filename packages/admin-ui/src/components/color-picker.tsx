import { Button, DialogTrigger, Popover, Label as AriaLabel } from 'react-aria-components';
import type { IColor } from 'react-color-palette';
import { ColorPicker as ReactColorPalettePicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { css, styled } from 'twin.macro';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export default function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [convertedColor, setConvertedColor] = useColor(color);

  const handleChange = (_color: IColor) => {
    setConvertedColor(_color);
    onChange(_color.hex);
  };

  return (
    <DialogTrigger>
      <div tw="flex flex-col gap-1">
        {label ? <AriaLabel tw="text-[#9692A7] text-sm">{label}</AriaLabel> : null}
        <StyledButton>
          <ColorIndicator color={convertedColor.hex} />
          <span className="label">색상 선택</span>
        </StyledButton>
      </div>
      <Popover>
        <ReactColorPalettePicker
          color={convertedColor}
          onChange={handleChange}
          hideInput={['rgb', 'hsv']}
        />
      </Popover>
    </DialogTrigger>
  );
}

const StyledButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  height: 35px;
  border: 1px solid #b5b8d0;
  border-radius: 5px;

  .label {
    padding: 0 14px;
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #adadad;
  }
`;

const ColorIndicator = styled.div<{ color: string }>`
  width: 35px;
  height: 100%;
  border-radius: 5px 0 0 5px;

  ${({ color }) => css`
    background-color: ${color};
  `}
`;
