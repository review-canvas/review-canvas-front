import type { SolutionCafe24InstallStatus } from '@/types/solution/cafe24';

export interface PostAuthLoginRequest {
  email: string;
  password: string;
}

export interface PostAuthLoginResponse {
  adminId: number;
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PostShopAdminSignUpResponse {}
