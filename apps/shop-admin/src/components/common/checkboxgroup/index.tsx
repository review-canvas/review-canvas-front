import React, { useState, useEffect } from 'react';
import type { CheckboxGroupProps, CheckboxProps } from '@/types/components/checkboxgroup';

function CheckboxGroup({ label, children, isRequired, necessityIndicator, onCheckedValuesChange, initialCheckedValues = [] }: CheckboxGroupProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>(initialCheckedValues);

  useEffect(() => {
    if (onCheckedValuesChange) {
      onCheckedValuesChange(checkedValues);
    }
  }, [checkedValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCheckedValues((prevCheckedValues) => {
      return event.target.checked ? [...prevCheckedValues, value] : prevCheckedValues.filter((v) => v !== value);
    });
  };

  return (
    <fieldset>
      <legend>
        {label} {isRequired && necessityIndicator === 'icon' ? '*' : null}
        {isRequired && necessityIndicator === 'label' ? '(필수)' : null}
      </legend>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<CheckboxProps>(child) && typeof child.props.name === 'string') {
          return React.cloneElement(child, {
            onChange: handleChange,
            checked: checkedValues.includes(child.props.name),
            value: child.props.name
          });
        }
        return child;
      })}
    </fieldset>
  );
}

export default CheckboxGroup;
