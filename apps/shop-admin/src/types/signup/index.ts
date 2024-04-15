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
  listThemeId: number;
  detailThemeId: number;
}

export interface SignupUserSettingData extends SignupReviewItemActiveData, SignupReviewThemeData {}

export interface SignupUserInfoData {
  email: string;
  password: string;
  name: string;
  logoImage: File | null;
  mallNumber: string;
  phoneNumber: string;
}

export interface SignupUserInstallData {
  type: 'MANUAL' | 'ASK';
  uuid?: string;
  askDetail?: string;
}

export interface SignupData {
  setting: SignupUserSettingData;
  info: SignupUserInfoData;
  install: SignupUserInstallData;
}

export interface SignupStore {
  currentStep: string;
  steps: string[];
  formData: SignupData;

  setCurrentStep: (step: string) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateFormData: (newData: Partial<SignupData>) => void;
  updateSettingListThemeId: (newThemeId: SignupUserSettingData['listThemeId']) => void;
  updateSettingDetailThemeId: (newThemeId: SignupUserSettingData['detailThemeId']) => void;
  updateReviewActiveSetting: (settings: SignupReviewItemActiveData) => void;
  updateReviewInstallData: (data: SignupUserInstallData) => void;
  updateSignupUserInfo: (info: SignupUserInfoData) => void;
}
