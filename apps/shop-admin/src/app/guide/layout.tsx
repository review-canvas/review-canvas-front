'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function MyPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
