export const REVIEW_PERIOD_OPTIONS_MAP = [
  { value: 'ALL', label: '전체' },
  { value: 'TODAY', label: '오늘' },
  { value: 'ONE_MONTH', label: '최근 1개월' },
  { value: 'THREE_MONTH', label: '최근 3개월' },
  { value: 'SIX_MONTH', label: '최근 6개월' },
];

export const REVIEW_FILTER_OPTIONS_MAP = [
  { value: 'PHOTO', label: '포토 리뷰' },
  { value: 'TEXT', label: '텍스트 리뷰' },
  { value: 'VIDEO', label: '동영상 리뷰' },
];

export const REVIEW_SCORE_OPTIONS_MAP = [
  { value: 'ONE', label: 1 },
  { value: 'TWO', label: 2 },
  { value: 'THREE', label: 3 },
  { value: 'FOUR', label: 4 },
  { value: 'FIVE', label: 5 },
];

export const REVIEW_REPLY_FILTER_OPTIONS_MAP = [
  { value: 'REPLIED', label: '답글 등록' },
  { value: 'NOT_REPLIED', label: '답글 미등록' },
];

export const REVIEW_DASHBOARD_PAGE_SIZE = [10, 20, 50, 100] as const;
