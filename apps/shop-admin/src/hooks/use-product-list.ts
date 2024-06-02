import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { GetShopProductListParam } from '@/service/review';
import { ReviewService } from '@/service/review';
import useShopAdminIdStore from '@/store/auth/shop-admin-id';

export interface UseProductListParam {
  page?: number;
  size?: number;
}

export function useProductList(param?: UseProductListParam) {
  const { shopAdminId } = useShopAdminIdStore();
  const page = param?.page || 0;
  const size = param?.size || 20;

  return useQuery({
    queryKey: [
      'product-list',
      {
        shopAdminId,
        page,
        size,
      },
    ] as const,
    queryFn: ({ queryKey }) => {
      return ReviewService.getShopProductList(queryKey[1] as GetShopProductListParam);
    },
    placeholderData: keepPreviousData,
    retry: 3,
  });
}
