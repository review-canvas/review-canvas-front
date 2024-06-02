import { apiService } from '@/lib/api/api-services';
import type { GetProductReviewRequest } from '@/lib/api/api-types';
import type { ProductDataListType, ReviewDataListType, ReviewPeriodType } from '@/types/review';

export interface GetProductReviewListParam {
  productId: number;
  size?: number;
  page?: number;
  sort?: 'LATEST' | 'HIGH_SCORE' | 'LOW_SCORE';
  period?: ReviewPeriodType;
  reviewFilters?: string[];
  score?: string[];
  replyFilters?: string[];
}

export interface GetShopProductListParam {
  shopAdminId: number;
  page?: number;
  size?: number;
}

async function getProductReviewList(param: GetProductReviewListParam): Promise<ReviewDataListType> {
  try {
    const _param: GetProductReviewRequest = {
      ...param,
      page: param.page || 0,
      size: param.size || 10,
      sort: param.sort || 'LATEST',
      period: param.period || 'ALL',
      reviewFilters: param.reviewFilters?.join(',') || '',
      score: param.score?.join(',') || '',
      replyFilters: param.replyFilters?.join(',') || '',
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
      size: param.size || 20,
    };

    return await apiService.getShopProducts(_param);
  } catch (error) {
    throw new Error('상품 목록 조회에 실패했습니다.', error as ErrorOptions);
  }
}

async function deleteReview(reviewId: number): Promise<boolean> {
  try {
    const response = await apiService.deleteShopAdminReview({
      reviewId,
    });

    return response.success;
  } catch (error) {
    throw new Error('리뷰 삭제에 실패했습니다.', error as ErrorOptions);
  }
}

export const ReviewService = {
  getProductReviewList,
  getShopProductList,
  deleteReview,
};
