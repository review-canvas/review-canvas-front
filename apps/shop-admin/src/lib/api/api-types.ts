import type { SolutionCafe24InstallStatus } from '@/types/solution/cafe24';

export interface PostAuthLoginRequest {
  email: string;
  password: string;
}

export interface PostAuthLoginResponse {
  shopAdminId: number;
  accessToken: string;
  refreshToken: string;
}

export interface PostCafe24AuthenticationProcessRequest {
  mallId: string;
  code: string;
}

export interface PostCafe24AuthenticationProcessResponse {
  shopAdminStatus: SolutionCafe24InstallStatus;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface GetShopAdminInfoRequest {}

export interface GetShopAdminInfoResponse {
  email: string;
  mallNumber: string;
  phoneNumber: string;
  mallName: string;
  businessNumber: string;
}

export interface PatchShopAdminInfoRequest {
  email: string;
  password: string;
  phoneNumber: string;
  mallNumber: string;
  mallName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchShopAdminInfoResponse {}

export interface GetEmailCheckRequest {
  email: string;
}

export interface GetEmailCheckResponse {
  duplicate: boolean;
}

export interface PostShopAdminSignUpRequest {
  email: string;
  password: string;
  phoneNumber: string;
  mallName: string;
  mallId: string;
  consentedTermsIds: number[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty request
export interface GetReviewLayoutRequest {}

export interface GetReviewLayoutResponse {
  bestReviewAreaActivation: boolean;
  reviewStatisticsAreaActivation: boolean;
  imageReviewAreaActivation: boolean;
  focusAreaLayout: string;
  imageReviewAreaLayout: string;
  reviewLayoutDesign: string;
}

export interface PatchReviewLayoutRequest {
  bestReviewAreaActivation: boolean;
  reviewStatisticsAreaActivation: boolean;
  imageReviewAreaActivation: boolean;
  focusAreaLayout: string;
  imageReviewAreaLayout: string;
  reviewLayoutDesign: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty response
export interface PatchReviewLayoutResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty response
export interface PatchReviewLayoutInitializeResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty request
export interface GetReviewContainerRequest {}

export interface GetReviewContainerResponse {
  width: string;
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  background: string;
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  borderColor: string;
  shadow: string;
}

export interface PatchReviewContainerRequest {
  width: string;
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  background: string;
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  borderColor: string;
  shadow: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewContainerResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewContainerInitializeRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewContainerInitializeResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty request
export interface GetReviewColumnRequest {}

export interface GetReviewColumnResponse {
  width: string;
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  margin: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  background: string;
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  borderColor: string;
  shadow: string;
}

export interface PatchReviewColumnRequest {
  width: string;
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  margin: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  background: string;
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  borderColor: string;
  shadow: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewColumnResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewColumnInitializeRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewColumnInitializeResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty request
export interface GetReviewTitleRequest {}

export interface GetReviewTitleResponse {
  title: string;
  titleAlignmentPosition: string;
  titlePadding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  titleFont: {
    name: string;
    size: string;
    bold: string;
    color: string;
  };
  titleBorder: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  titleBorderColor: string;
  titleBackGround: string;
  description: string;
  descriptionAlignmentPosition: string;
  descriptionPadding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  descriptionFont: {
    name: string;
    size: string;
    bold: string;
    color: string;
  };
  descriptionBorder: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  descriptionBorderColor: string;
  descriptionBackGround: string;
}

export interface PatchReviewTitleRequest {
  title: string;
  titleAlignmentPosition: string;
  titlePadding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  titleFont: {
    name: string;
    size: string;
    bold: string;
    color: string;
  };
  titleBorder: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  titleBorderColor: string;
  titleBackGround: string;
  description: string;
  descriptionAlignmentPosition: string;
  descriptionPadding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  descriptionFont: {
    name: string;
    size: string;
    bold: string;
    color: string;
  };
  descriptionBorder: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  descriptionBorderColor: string;
  descriptionBackGround: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewTitleResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewTitleInitializeRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewTitleInitializeResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty request
export interface GetReviewDesignViewRequest {}

export interface GetReviewDesignViewResponse {
  detailViewType: string;
  pagingType: string;
  filterType: string;
  filterActiveTextColor: string;
  reviewBackgroundColor: string;
  margin: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  detailInfoTextColor: string;
  font: {
    name: string;
    size: string;
    bold: string;
    color: string;
  };
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  round: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  borderColor: string;
  shadow: string;
  replyBackgroundColor: string;
  reviewPreviewTextMaxSize: number;
  seeMoreButtonType: string;
  reviewLike: {
    buttonType: string;
    iconColor: string;
    textColor: string;
    buttonBorderColor: string;
    buttonRound: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
      bottomRight: string;
    };
  };
}

export interface PatchReviewDesignViewRequest {
  detailViewType: string;
  pagingType: string;
  filterType: string;
  filterActiveTextColor: string;
  reviewBackgroundColor: string;
  margin: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  detailInfoTextColor: string;
  font: {
    name: string;
    size: string;
    bold: string;
    color: string;
  };
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  round: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  borderColor: string;
  shadow: string;
  replyBackgroundColor: string;
  reviewPreviewTextMaxSize: number;
  seeMoreButtonType: string;
  reviewLike: {
    buttonType: string;
    iconColor: string;
    textColor: string;
    buttonBorderColor: string;
    buttonRound: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
      bottomRight: string;
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewDesignViewResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewDesignViewInitializeRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewDesignViewInitializeResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- empty request
export interface GetReviewDesignWriteRequest {}

export interface GetReviewDesignWriteResponse {
  pageType: string;
  widthSizePc: string;
  widthSizeMobile: string;
  backgroundColor: string;
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  borderColor: string;
  starRateBackgroundColor: string;
  starRateColor: string;
  detailEvaluationCheckBoxBackgroundColor: string;
  detailEvaluationCheckBoxColor: string;
  detailEvaluationCategory: string;
  cancelButtonBackgroundColor: string;
  cancelButtonBorderColor: string;
  cancelButtonTextColor: string;
  completedButtonBackgroundColor: string;
  completedButtonTextColor: string;
}

export interface PatchReviewDesignWriteRequest {
  pageType: string;
  widthSizePc: string;
  widthSizeMobile: string;
  backgroundColor: string;
  padding: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  border: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  borderColor: string;
  starRateBackgroundColor: string;
  starRateColor: string;
  detailEvaluationCheckBoxBackgroundColor: string;
  detailEvaluationCheckBoxColor: string;
  detailEvaluationCategory: string;
  cancelButtonBackgroundColor: string;
  cancelButtonBorderColor: string;
  cancelButtonTextColor: string;
  completedButtonBackgroundColor: string;
  completedButtonTextColor: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewDesignWriteResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewDesignWriteInitializeRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PatchReviewDesignWriteInitializeResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface GetFontInfoRequest {}

export interface GetFontInfoResponse {
  fontNames: string[];
  fontBolds: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PostShopAdminSignUpResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface DeleteShopAdminQuitRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface DeleteShopAdminQuitResponse {}

export interface GetProductReviewRequest {
  productId: number;
  size?: number;
  page?: number;
  sort?: string;
  period?: string;
  reviewFilters?: string;
  score?: string;
  replyFilters?: string;
}

export interface GetProductReviewResponse {
  page: number;
  size: number;
  total: number;
  content: {
    reviewId: number;
    content: string;
    score: number;
    userId: number;
    shopAdminId: number;
    nickname: string;
    isMine: boolean;
    likeCount: number;
    createAt: string;
    updatedAt: string;
    deleted: boolean;
    productId: number;
    productName: string;
    imageVideoUrls: {
      reviewFileUrls: string[];
      reviewResizeImageUrls: string[];
    };
    replies: {
      replyId: number;
      content: string;
      createAt: string;
      updatedAt: string;
      deleted: boolean;
      userId: number;
      nickname: string;
    }[];
  }[];
}

export interface GetShopProductsRequest {
  shopAdminId: number;
  page?: number;
  size?: number;
}

export interface GetShopProductsResponse {
  page: number;
  size: number;
  total: number;
  content: {
    productId: number;
    productNo: number;
    productName: string;
  }[];
}

export interface DeleteShopAdminReviewRequest {
  reviewId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface DeleteShopAdminReviewResponse {}

export interface PostShopAdminReviewLikeRequest {
  reviewId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PostShopAdminReviewLikeResponse {}

export interface DeleteShopAdminReviewLikeRequest {
  reviewId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface DeleteShopAdminReviewLikeResponse {}
