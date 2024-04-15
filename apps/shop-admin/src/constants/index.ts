import { SignupReviewItemActiveData } from '@/types/signup';

export const REVIEW_ITEM_KEY_LABEL_MAP: Record<keyof SignupReviewItemActiveData, string> = {
  title: '리뷰 제목',
  author: '리뷰 작성자',
  point: '리뷰 별점',
  media: '리뷰 첨부 미디어',
  content: '리뷰 내용',
  createdAt: '리뷰 작성일',
  updatedAt: '리뷰 최종 수정일',
};
