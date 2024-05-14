'use client';

export default function SolutionInstallSuccessPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div tw="w-full h-screen flex flex-col justify-center items-center bg-sub-secondary">{children}</div>;
}
