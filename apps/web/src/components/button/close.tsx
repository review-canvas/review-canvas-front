import ClosingIcon from '@/assets/icon/icon-closing.svg';

interface CloseButtonProps {
  onClose: () => void;
}
export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      className="absolute top-3 right-3 z-10"
      onClick={onClose}
      type="button"
    >
      <ClosingIcon />
    </button>
  );
}
