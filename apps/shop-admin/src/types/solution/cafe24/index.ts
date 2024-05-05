export type SolutionCafe24InstallStatus = 'INSTALLED' | 'PREVIOUS_INSTALLED' | 'REGISTERED';

export interface SolutionCafe24Store {
  mallId: string | null;
  setMallId: (_mallId: string | null) => void;
}
