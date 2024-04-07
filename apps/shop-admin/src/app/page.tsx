'use client';

import { Checkbox, ToggleButton } from '@review-canvas/admin-ui/components';
import styled from '@emotion/styled';

export default function Page(): React.ReactNode {
  return (
    <main>
      <Checkbox>check</Checkbox>
      <ToggleButton className="w-52 h-8">toggle</ToggleButton>
    </main>
  );
}

const A = styled.a`
  color: ${({ theme }) => theme.colors.main.primary};
`;
