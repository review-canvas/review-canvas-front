'use client';

import useShopConnection from '@/state/connection';

export default function Page() {
  const shopConnection = useShopConnection();
  if (!shopConnection.connected) return null;

  return (
    <main>
      <h1>Successfully Initialized!</h1>
      <p>
        Connected to shop {shopConnection.id} with {shopConnection.domain}
      </p>
    </main>
  );
}
