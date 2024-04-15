import { styled } from 'twin.macro';

import Button from './base.tsx';

const SolidButton = styled(Button)`
  background: ${({ theme }) => theme.colors.main.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export default SolidButton;
