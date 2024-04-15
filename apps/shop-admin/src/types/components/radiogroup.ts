export interface RadioGroupItem {
  id: string;
  name: string;
  imageSrc?: string;
}

export interface RadioGroupProps {
  items: RadioGroupItem[];
  selectedId: string;
  onSelectedIdChange?: (newSelectedId: string) => void;
}
