import { create } from 'zustand';

import type { UserProfile } from '../types/user';
import { removeStorageItem, setStorageItem } from '../utils/storage';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setSession: (user: UserProfile, token: string) => Promise<void>;
  clearSession: () => Promise<void>;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,
  setSession: async (user, token) => {
    await setStorageItem('auth_token', token);
    await setStorageItem('auth_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  clearSession: async () => {
    await removeStorageItem('auth_token');
    await removeStorageItem('auth_user');
    set({ user: null, token: null, isAuthenticated: false });
  },
  setHydrated: (value) => set({ isHydrated: value }),
}));
