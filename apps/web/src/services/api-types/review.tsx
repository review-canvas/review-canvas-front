export interface PathInfo {
  mallId: string | undefined;
  memberId: number | string | undefined;
  requestId: string | undefined;
}
export interface CreateReivewPathInfo {
  mallId: string | undefined;
  productId: string | undefined;
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
  replies: ReplyItem[];
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
  isMine: boolean;
  createAt: string;
  updatedAt: string;
  deleted: boolean;
  userId: number;
  mallId: string;
  nickname: string;
}
export interface RetrieveReplyListResponse {
  success: boolean;
  data: ReplyItem[];
}
export type ReviewListSort = 'LATEST' | 'HIGH_SCORE' | 'LOW_SCORE';
export type ReviewListFilter = 'ALL' | 'IMAGE_VIDEO' | 'GENERAL';

export interface RetrieveReviewListRequest {
  mallId: string;
  productNo: number;
  memberId: string | undefined;
  page?: number;
  size?: number;
  sort?: ReviewListSort;
  filter?: ReviewListFilter;
}

export interface RetrieveReviewItemResponse {
  success: boolean;
  data: ReviewItem;
}

export interface RetrieveReplyItemResponse {
  success: boolean;
  data: ReplyItem;
}

export interface CreateReviewItemRequest {
  memberId: string | undefined;
  content: string;
  score: number;
}

export interface UpdateReviewItemRequest {
  content: string;
  score: number;
}

export interface CreateReplyItemRequest {
  mallId: string | undefined;
  memberId: string | undefined;
  content: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface CommonResponse {}
