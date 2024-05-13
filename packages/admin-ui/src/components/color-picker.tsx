import type { IColor } from 'react-color-palette';
import { ColorPicker as ReactColorPalettePicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [convertedColor, setConvertedColor] = useColor(color);

  const handleChange = (_color: IColor) => {
    setConvertedColor(_color);
    onChange(_color.hex);
  };

  return (
    <ReactColorPalettePicker
      color={convertedColor}
      onChange={handleChange}
      hideInput={['rgb', 'hsv']}
    />
  );
}
