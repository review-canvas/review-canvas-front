export type Shadow = 'NONE' | 'SMALL' | 'MEDIUM' | 'LARGE';
export type Alignment = 'LEFT' | 'CENTER' | 'RIGHT';

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

export type WidthType = 'SITE_WIDTH' | 'FULL' | 'CUSTOM';

export type ReviewDetailViewType = 'SPREAD' | 'MODAL';

export type ReviewPagingType = 'PAGE_NUMBER' | 'SEE_MORE_SCROLL';

export type ReviewFilterType = 'LIST' | 'DROPDOWN';

export type ReviewMoreButtonType = 'SEE_MORE_TOGGLE' | 'SEE_MORE_UNDERLINE' | 'READ_MORE' | 'NO_BUTTON';

export type ReviewLikeButtonType = 'NONE' | 'THUMB_UP_WITH_TEXT' | 'THUMB_UP';

export interface ButtonRoundProps {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}

export interface ReviewLikeButtonProps {
  buttonType: ReviewLikeButtonType;
  iconColor: string;
  textColor: string;
  buttonBorderColor: string;
  buttonRound: ButtonRoundProps;
}

export interface ReviewLayoutProperty {
  bestReviewAreaActivation: boolean;
  reviewStatisticsAreaActivation: boolean;
  imageReviewAreaActivation: boolean;
  focusAreaLayout: 'BEST_REVIEW_TOP' | 'BEST_REVIEW_BOTTOM' | 'BEST_REVIEW_LEFT' | 'BEST_REVIEW_RIGHT';
  imageReviewAreaLayout: 'REVIEW_TOP' | 'REVIEW_BOTTOM' | 'REVIEW_LEFT' | 'REVIEW_RIGHT';
  reviewLayoutDesign: 'BOARD' | 'CARD' | 'TALK';
}

export interface ReviewContainerProperty {
  width: string;
  padding: Padding;
  background: string;
  border: Border;
  borderColor: string;
  shadow: Shadow;
}

export interface ReviewColumnProperty {
  width: string;
  padding: Padding;
  margin: Margin;
  background: string;
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  borderColor: string;
  shadow: Shadow;
}

export interface ReviewTitleProperty {
  title: string;
  titleAlignmentPosition: Alignment;
  titlePadding: Padding;
  titleFont: Font;
  titleBorder: Border;
  titleBorderColor: string;
  titleBackGround: string;
  description: string;
  descriptionAlignmentPosition: Alignment;
  descriptionPadding: Padding;
  descriptionFont: Font;
  descriptionBorder: Border;
  descriptionBorderColor: string;
  descriptionBackGround: string;
}

export interface ReviewDesignViewProperty {
  detailViewType: ReviewDetailViewType;
  pagingType: ReviewPagingType;
  filterType: ReviewFilterType;
  filterActiveTextColor: string;
  reviewBackgroundColor: string;
  margin: Margin;
  padding: Padding;
  detailInfoTextColor: string;
  font: Font;
  border: Border;
  round: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  borderColor: string;
  shadow: Shadow;
  replyBackgroundColor: string;
  reviewPreviewTextMaxSize: number;
  seeMoreButtonType: ReviewMoreButtonType;
  reviewLike: {
    buttonType: ReviewLikeButtonType;
    iconColor: string;
    textColor: string;
    buttonBorderColor: string;
    buttonRound: ButtonRoundProps;
  };
}
