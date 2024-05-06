'use client';

export default function AuthSignupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div tw="flex w-full h-screen bg-sub-secondary">
      <main tw="flex w-full h-screen justify-center items-center">
        <div tw="w-6/12 min-w-80 p-14 bg-white shadow-sm rounded-lg">{children}</div>
      </main>
    </div>
  );
}
