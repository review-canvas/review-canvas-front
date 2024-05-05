import type { SolutionCafe24InstallStatus } from '@/types/solution/cafe24';

export type LocalStorageMap = {
  cafe24MallId: string;
  cafe24InstallStatus: SolutionCafe24InstallStatus | null;
};

type LocalStorageItemKeys = keyof LocalStorageMap;

const localStorage = {
  getItem: <Key extends LocalStorageItemKeys>(key: Key) => {
    if (typeof window === 'undefined') return null;

    const item = window.localStorage.getItem(key);

    return item ? (JSON.parse(item) as LocalStorageMap[Key]) : null;
  },
  setItem: <Key extends LocalStorageItemKeys>(key: Key, value: LocalStorageMap[Key]) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: <Key extends LocalStorageItemKeys>(key: Key) => {
    window.localStorage.removeItem(key);
  },
  clear: () => {
    window.localStorage.clear();
  },
};

export default localStorage;
