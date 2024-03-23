'use client';

import styled from '@emotion/styled';

export default function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }): JSX.Element {
  return (
    <Styled
      onClick={onClick}
      type="button"
    >
      {children}
    </Styled>
  );
}

const Styled = styled.button`
  background: black;
  color: white;
  font-size: 24px;
`
