import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import type { ReviewItemStyle } from '@/contexts/style/review-item.ts';
import type { ReviewListStyle } from '@/contexts/style/review-list.ts';
import type { DesignPropertyResponse } from '@/models/design-property.ts';
import API from '@/utils/api.ts';

class DesignPropertyService {
  async get(mallId: string): Promise<DesignPropertyResponse> {
    const response = await API.get<DesignPropertyResponse>(`/api/v1/shop/${mallId}/review-property`);
    return response.data;
  }

  convertDesignPropertyResponseToReviewListStyle({
    data: { reviewDesignView, reviewContainer },
  }: DesignPropertyResponse): ReviewListStyle {
    return {
      paginationStyle: reviewDesignView.pagingType === 'PAGE_NUMBER' ? 'page' : 'scroll',
      orderSelectorStyle: reviewDesignView.filterType === 'DROPDOWN' ? 'dropdown' : 'radio',
      selectedOrderColor: reviewDesignView.filterActiveTextColor,
      padding: reviewContainer.padding,
      width: reviewContainer.width,
      border: reviewContainer.border,
      borderColor: reviewContainer.borderColor,
      shadow: reviewContainer.shadow,
      shadowColor: 'transparent',
      backgroundColor: reviewContainer.background,
    };
  }

  convertDesignPropertyToReviewItemStyle({ data: { reviewDesignView } }: DesignPropertyResponse): ReviewItemStyle {
    return {
      margin: reviewDesignView.margin,
      padding: reviewDesignView.padding,
      font: {
        name: reviewDesignView.font.name,
        size: reviewDesignView.font.size,
        weight: reviewDesignView.font.bold,
        color: reviewDesignView.font.color,
      },
      border: reviewDesignView.border,
      borderColor: reviewDesignView.borderColor,
      borderRadius: reviewDesignView.round,
      shadow: reviewDesignView.shadow,
      shadowColor: 'transparent',
      backgroundColor: reviewDesignView.reviewBackgroundColor,
    };
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
