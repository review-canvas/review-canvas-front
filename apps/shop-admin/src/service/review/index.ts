import { apiService } from '@/lib/api/api-services';
import type { ProductDataListType, ReviewDataListType } from '@/types/review';

interface GetProductReviewListParam {
  productId: number;
  size?: number;
  page?: number;
  sort?: 'LATEST' | 'HIGH_SCORE' | 'LOW_SCORE';
  reviewFilters?: string;
  score?: string;
  replyFilters?: string;
}

interface GetShopProductListParam {
  shopAdminId: number;
  page?: number;
  size?: number;
}

async function getProductReviewList(param: GetProductReviewListParam): Promise<ReviewDataListType> {
  try {
    const _param = {
      ...param,
      page: param.page || 0,
      size: param.size || 10,
      sort: param.sort || 'LATEST',
    };

    return await apiService.getProductReviews(_param);
  } catch (error) {
    throw new Error('리뷰 리스트 조회에 실패했습니다.', error as ErrorOptions);
  }
}

async function getShopProductList(param: GetShopProductListParam): Promise<ProductDataListType> {
  try {
    const _param = {
      ...param,
      page: param.page || 0,
      size: param.size || 10,
    };

    return await apiService.getShopProducts(_param);
  } catch (error) {
    throw new Error('상품 목록 조회에 실패했습니다.', error as ErrorOptions);
  }
}

export const ReviewService = {
  getProductReviewList,
  getShopProductList,
};
