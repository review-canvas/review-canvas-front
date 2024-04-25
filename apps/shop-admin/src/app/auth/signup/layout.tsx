'use client';

import AuthSignupLayout from '@/components/layout/auth-signup-layout';

export default function AuthSignupPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthSignupLayout>{children}</AuthSignupLayout>;
}
