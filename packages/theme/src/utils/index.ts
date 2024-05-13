import type { WidthType } from '../types';

const getWidthType = (width: string): WidthType => {
  switch (width) {
    case '100%':
      return 'SITE_WIDTH';
    case '100vw':
      return 'FULL';
    default:
      return 'CUSTOM';
  }
};

const returnWidthValueWidthType = (type: WidthType, value?: string): string => {
  if (type === 'CUSTOM' && !value) {
    throw new Error('Custom Type requires value');
  }

  switch (type) {
    case 'SITE_WIDTH':
      return '100%';
    case 'FULL':
      return '100vw';
    default:
      return String(value);
  }
};

const isValidDesignUnit = (value: string): boolean => {
  const regex = /(?:\d+)(?<unit>px|%)$/;
  return regex.test(value);
};

export const ThemeUtil = {
  getWidthType,
  returnWidthValueWidthType,
  isValidDesignUnit,
};
