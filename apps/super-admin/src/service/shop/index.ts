import { apiService } from '@/lib/api/api-services';
import type { GetSuperAdminShopsRequest } from '@/lib/api/api-types';
import type { ShopDataListType } from '@/types/shop';

export interface GetShopListParam {
  page?: number;
  size?: number;
}

async function getShopList(param: GetShopListParam): Promise<ShopDataListType> {
  try {
    const _param: GetSuperAdminShopsRequest = {
      page: param.page || 0,
      size: param.size || 10,
    };

    return (await apiService.getSuperAdminShops(_param)) as ShopDataListType;
  } catch (error) {
    throw new Error('Shop List 조회에 실패했습니다.', error as ErrorOptions);
  }
}

export const ShopService = {
  getShopList,
};
