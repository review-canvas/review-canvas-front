export interface SignupReviewItemActiveData {
  title: boolean;
  author: boolean;
  point: boolean;
  media: boolean;
  content: boolean;
  createdAt: boolean;
  updatedAt: boolean;
}

export interface SignupReviewThemeData {
  themeId: number;
}

export interface SignupUserSettingData extends SignupReviewItemActiveData, SignupReviewThemeData {}

export interface SignupUserInfoData {
  email: string;
  password: string;
  name: string;
  logoImageUrl: string;
  mallNumber: string;
  phoneNumber: string;
}

export interface SignupData {
  setting: SignupUserSettingData;
  info: SignupUserInfoData;
}

export interface SignupStore {
  currentStep: string;
  steps: string[];
  formData: SignupData;

  setCurrentStep: (step: string) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateFormData: (newData: Partial<SignupData>) => void;
  updateSettingThemeId: (newThemeId: SignupUserSettingData['themeId']) => void;
  updateReviewActiveSetting: (settings: SignupReviewItemActiveData) => void;
}
