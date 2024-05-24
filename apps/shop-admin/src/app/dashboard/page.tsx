'use client';

import useAuthCheck from '@/hooks/use-auth-check';

function DashboardPage() {
  useAuthCheck();

  return (
    <main className="flex flex-col gap-4">
      <div>대시보드</div>
    </main>
  );
}

export default DashboardPage;
