import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import type { DesignPropertyResponse } from '@/models/design-property.ts';
import API from '@/utils/api.ts';

class DesignPropertyService {
  async get(mallId: string): Promise<DesignPropertyResponse> {
    const response = await API.get<DesignPropertyResponse>(`/api/v1/shop/${mallId}/review-property`);
    return response.data;
  }
}

interface DesignPropertyStore {
  service: DesignPropertyService;
}

const designPropertyServiceStore = createStore<DesignPropertyStore>(() => ({
  service: new DesignPropertyService(),
}));
type DesignPropertyServiceStoreType = typeof designPropertyServiceStore;
const DesignPropertyServiceContext = createContext<DesignPropertyServiceStoreType | null>(null);

export function DesignPropertyServiceProvider({
  children,
  service = designPropertyServiceStore,
}: Readonly<
  PropsWithChildren<{
    service?: DesignPropertyServiceStoreType;
  }>
>) {
  return <DesignPropertyServiceContext.Provider value={service}>{children}</DesignPropertyServiceContext.Provider>;
}

export const useDesignPropertyService = (): DesignPropertyService => {
  const service = useContext(DesignPropertyServiceContext);
  if (!service) throw new Error('useReviewService must be used within a ReviewServiceProvider');
  return useStore(service, (state) => state.service);
};
