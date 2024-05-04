import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { SolutionCafe24Store } from '@/types/solution/cafe24';

const useSolutionCafe24Store = create<SolutionCafe24Store, [['zustand/persist', { mallId: string }]]>(
  persist(
    (set) => ({
      mallId: null,
      setMallId: (_mallId) => {
        set({ mallId: _mallId });
      },
    }),
    {
      name: 'app-install-mall-id',
    },
  ),
);

export default useSolutionCafe24Store;
