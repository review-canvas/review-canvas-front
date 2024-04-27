'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function SettingPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
