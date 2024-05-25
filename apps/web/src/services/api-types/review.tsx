export interface PathInfo {
  mailId: string | undefined;
  memberId: string | undefined;
  reviewId: number | undefined;
  productId: number | undefined;
}
export interface ReviewItem {
  reviewId: number;
  content: string;
  score: number;
  userId: number;
  shopAdminId: number;
  nickname: string;
  isMine: boolean;
  createAt: string;
  updatedAt: string;
  deleted: boolean;
  replies: ReplyItem;
}

export interface RetrieveReviewListResponse {
  success: boolean;
  data: {
    page: number;
    size: number;
    total: number;
    content: ReviewItem[];
  };
}

export interface ReplyItem {
  replyId: number;
  content: string;
  createAt: string;
  updatedAt: string;
  deleted: boolean;
  userId: number;
  nickname: string;
}

export type ReviewListSort = 'LATEST' | 'HIGH_SCORE' | 'LOW_SCORE';
export type ReviewListFilter = 'ALL' | 'IMAGE_VIDEO' | 'GENERAL';

export interface RetrieveReviewListRequest {
  mallId: string;
  productNo: number;
  page?: number;
  size?: number;
  sort?: ReviewListSort;
  filter?: ReviewListFilter;
}

export interface RetrieveReviewItemResponse {
  success: boolean;
  data: ReviewItem;
}

export interface CreateReviewItemRequest {
  content: string;
  score: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface CommonResponse {}
