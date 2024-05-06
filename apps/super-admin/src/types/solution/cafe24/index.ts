export type SolutionCafe24InstallStatus = 'INSTALLED' | 'PREVIOUS_INSTALLED' | 'REGISTERED';

export interface SolutionCafe24Store {
  mallId: string | null;
  status: SolutionCafe24InstallStatus | null;
  setMallId: (_mallId: string | null) => void;
  setStatus: (_status: SolutionCafe24InstallStatus | null) => void;
}
