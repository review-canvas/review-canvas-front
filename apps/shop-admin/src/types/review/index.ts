import type { REVIEW_DASHBOARD_PAGE_SIZE } from '@/constants/review';

export type ReviewSortingType = 'LATEST' | 'HIGH_SCORE' | 'LOW_SCORE';

export type ReviewPeriodType = 'ALL' | 'TODAY' | 'ONE_MONTH' | 'THREE_MONTH' | 'SIX_MONTH' | 'CUSTOM';

export type ReviewPageSizeType = (typeof REVIEW_DASHBOARD_PAGE_SIZE)[number];

export interface ReviewReplyDataType {
  replyId: number;
  content: string;
  createAt: string;
  updatedAt: string;
  deleted: boolean;
  userId: number;
  nickname: string;
}

export interface ReviewDataType {
  reviewId: number;
  content: string;
  score: number;
  userId: number;
  shopAdminId: number;
  nickname: string;
  isMine: boolean;
  createAt: string;
  likeCount: number;
  isLiked: boolean;
  updatedAt: string;
  deleted: boolean;
  productId: number;
  productName: string;
  imageVideoUrls: {
    reviewFileUrls: string[];
    reviewResizeImageUrls: string[];
  };
  replies: ReviewReplyDataType[];
}

export interface ReviewDataListType {
  page: number;
  size: number;
  total: number;
  content: ReviewDataType[];
}

export interface ProductDataType {
  productId: number;
  productNo: number;
  productName: string;
}

export interface ProductDataListType {
  page: number;
  size: number;
  total: number;
  content: ProductDataType[];
}
