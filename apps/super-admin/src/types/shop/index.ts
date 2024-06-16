import type { ReviewLayoutProperty } from '@review-canvas/theme';

import type { SHOP_DASHBOARD_PAGE_SIZE } from '@/constants/shop';

export type ShopPageSizeType = (typeof SHOP_DASHBOARD_PAGE_SIZE)[number];

export interface ShopDataType {
  mallId: string;
  createdAt: string;
  mallName: string;
  mallNumber: string;
  approveStatus: boolean;
  reviewsAmount: number;
  reviewLayoutDesign: ReviewLayoutProperty['reviewLayoutDesign'];
}

export interface ShopDataListType {
  page: number;
  size: number;
  total: number;
  content: ShopDataType[];
}
