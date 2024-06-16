import tw, { styled } from 'twin.macro';

import ClosingSvg from '@/assests/icon/icon-closing.svg';

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
      <ClosingSvg />
    </button>
  );
}
interface SubmitButtonProps {
  isActive: boolean;
}
export const SumitButton = styled.button<SubmitButtonProps>`
  ${tw`m-2 p-2`}
  border: 2px solid ${({ isActive }) => (isActive ? '#5C6BC0' : '#9E9E9E')};
  background-color: ${({ isActive }) => (isActive ? '#1E88E5' : '#BEBEBE')};
  color: white;
`;
