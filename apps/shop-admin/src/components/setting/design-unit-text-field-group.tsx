import React from 'react';

interface DesignUnitTextFieldGroupContainerProps {
  children: React.ReactNode;
}

export default function DesignUnitTextFieldGroupContainer({ children }: DesignUnitTextFieldGroupContainerProps) {
  return <div tw="inline-flex flex-wrap gap-4 items-start [& > *]:w-24">{children}</div>;
}
