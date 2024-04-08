import type { ReactElement } from 'react';

export interface CheckboxItem {
  name: string;
  label: string;
  checked: boolean;
}

export interface CheckboxProps {
    children: React.ReactNode;
    checked: boolean;
    name: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export interface CheckboxGroupProps {
  label: string;
  children: ReactElement[];
  isRequired?: boolean;
  necessityIndicator?: 'icon' | 'label';
  onCheckedValuesChange?: (checkedValues: string[]) => void;
}
