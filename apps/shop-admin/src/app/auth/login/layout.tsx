'use client';

import AuthLoginLayout from '@/components/layout/auth-login-layout';

export default function AuthLoginPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthLoginLayout>{children}</AuthLoginLayout>;
}
