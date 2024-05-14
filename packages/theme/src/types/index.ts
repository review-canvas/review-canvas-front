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

export interface ReviewListProperty {
  detailViewType: string;
  pagingType: string;
  filterType: string;
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
  seeMoreButtonType: string;
  reviewLike: {
    buttonType: string;
    iconColor: string;
    textColor: string;
    buttonBorderColor: string;
    buttonRoundTopLeft: string;
    buttonRoundTopRight: string;
    buttonRoundBottomLeft: string;
    buttonRoundBottomRight: string;
  };
}
