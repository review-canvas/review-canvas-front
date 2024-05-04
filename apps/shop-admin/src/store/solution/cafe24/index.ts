import { create } from 'zustand';

import type { SolutionCafe24Store } from '@/types/solution/cafe24';

const useSolutionCafe24Store = create<SolutionCafe24Store>((set) => ({
  mallId: null,
  setMallId: (_mallId) => {
    set({ mallId: _mallId });
  },
}));

export default useSolutionCafe24Store;
