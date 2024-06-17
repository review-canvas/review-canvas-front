import tw, { styled } from 'twin.macro';

interface SubmitButtonProps {
  isActive: boolean;
}
export const SumitButton = styled.button<SubmitButtonProps>`
  ${tw`m-2 p-2`}
  border: 2px solid ${({ isActive }) => (isActive ? '#5C6BC0' : '#9E9E9E')};
  background-color: ${({ isActive }) => (isActive ? '#1E88E5' : '#BEBEBE')};
  color: white;
`;
