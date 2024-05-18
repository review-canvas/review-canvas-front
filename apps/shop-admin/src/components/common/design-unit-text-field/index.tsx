import TextField from '@ui/components/text-field';

import { ThemeUtil } from '@review-canvas/theme';

interface DesignUnitTextFieldProps {
  type: 'WIDTH' | 'MARGIN' | 'PADDING' | 'BORDER' | 'FONT' | 'BORDER_RADIUS';
  value: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
  label?: string;
}

function DesignUnitTextField({ type, value, onChange, isReadOnly = false, label }: DesignUnitTextFieldProps) {
  const isValidInput: boolean = ThemeUtil.isValidDesignUnit(value) && Boolean(value);

  const displayValue = ThemeUtil.getWidthType(value) === 'CUSTOM' ? value : '';

  const handleChange = (_value: string) => {
    onChange(_value);
  };

  return (
    <TextField
      variant="box"
      type="text"
      placeholder="px 또는 % 입력"
      label={label}
      tw="[& .react-aria-FieldError]:text-sm"
      value={type === 'WIDTH' ? displayValue : value}
      onChange={handleChange}
      isReadOnly={isReadOnly}
      isInvalid={!(isValidInput || !value)}
      errorMessage="올바른 값을 입력해 주세요."
    />
  );
}

export default DesignUnitTextField;
