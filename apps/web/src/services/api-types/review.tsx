export interface ReviewItem {
    reviewId: number;
    content: string;
    score: number;
    userId: number;
    nickname: string;
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