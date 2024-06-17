import { ReviewLikeButtonType } from '@review-canvas/theme';

export type Shadow = 'NONE' | 'SMALL' | 'MEDIUM' | 'LARGE';
export type FocusAreaLayout = 'BEST_REVIEW_TOP' | 'BEST_REVIEW_BOTTOM' | 'BEST_REVIEW_LEFT' | 'BEST_REVIEW_RIGHT';
export type ReviewAreaLayout = 'REVIEW_TOP' | 'REVIEW_BOTTOM' | 'REVIEW_LEFT' | 'REVIEW_RIGHT';
export type ReviewLayoutDesign = 'BOARD' | 'CARD' | 'TALK';
export type AlignmentPosition = 'LEFT' | 'CENTER' | 'RIGHT';
export type DetailViewType = 'SPREAD' | 'MODAL';
export type PagingType = 'PAGE_NUMBER' | 'SEE_MORE_SCROLL';
export type FilterType = 'LIST' | 'DROPDOWN';

export interface Margin {
  left: string;
  right: string;
  top: string;
  bottom: string;
}

export interface Padding {
  left: string;
  right: string;
  top: string;
  bottom: string;
}

export interface Border {
  left: string;
  right: string;
  top: string;
  bottom: string;
}

export interface Font {
  name: string;
  size: string;
  bold: string;
  color: string;
}

export interface Round {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}

export interface ReviewLike {
  buttonType: ReviewLikeButtonType;
  iconColor: string;
  textColor: string;
  buttonBorderColor: string;
  buttonRound: Round;
}

export interface ReviewLayout {
  bestReviewAreaActivation: boolean;
  reviewStatisticsAreaActivation: boolean;
  imageReviewAreaActivation: boolean;
  focusAreaLayout: FocusAreaLayout;
  imageReviewAreaLayout: ReviewAreaLayout;
  reviewLayoutDesign: ReviewLayoutDesign;
}

export interface ReviewContainer {
  width: string;
  padding: Padding;
  background: string;
  border: Border;
  borderColor: string;
  shadow: Shadow;
}

export interface ReviewTitle {
  title: string;
  titleAlignmentPosition: AlignmentPosition;
  titlePadding: Padding;
  titleFont: Font;
  titleBorder: Border;
  titleBorderColor: string;
  titleBackGround: string;
  description: string;
  descriptionAlignmentPosition: AlignmentPosition;
  descriptionPadding: Padding;
  descriptionFont: Font;
  descriptionBorder: Border;
  descriptionBorderColor: string;
  descriptionBackGround: string;
}

export interface ReviewColumn {
  width: string;
  padding: Padding;
  margin: Margin;
  background: string;
  border: Border;
  borderColor: string;
  shadow: Shadow;
}

export interface ReviewDesignView {
  detailViewType: DetailViewType;
  pagingType: PagingType;
  filterType: FilterType;
  filterActiveTextColor: string;
  reviewBackgroundColor: string;
  margin: Margin;
  padding: Padding;
  detailInfoTextColor: string;
  font: Font;
  border: Border;
  round: Round;
  borderColor: string;
  shadow: Shadow;
  replyBackgroundColor: string;
  reviewPreviewTextMaxSize: number;
  seeMoreButtonType: string;
  reviewLike: ReviewLike;
}

export interface DesignPropertyResponseData {
  reviewLayout: ReviewLayout;
  reviewContainer: ReviewContainer;
  reviewTitle: ReviewTitle;
  reviewColumn: ReviewColumn;
  reviewDesignView: ReviewDesignView;
}

export interface DesignPropertyResponse {
  success: boolean;
  data: DesignPropertyResponseData;
}
