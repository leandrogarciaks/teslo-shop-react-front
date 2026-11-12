import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand';
import { registerActions } from '../action/register.actions';
import { checkAuthAction } from '../action/check-auth.action';
import { loginActions } from '../action/login.actions';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type useAuthStoreProps = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  // Getters
  isAdmin: () => boolean;
  // Actions
  register: (email: string, password: string, fullName: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<useAuthStoreProps>()((set, get) => ({
  // Implementacion del Store
  user: null,
  token: null,
  authStatus: 'checking',

  //Getters
  isAdmin: () => {
    const roles = get().user?.roles ?? [];
    return roles.includes('admin');
  },

  register: async (email: string, password: string, fullName: string) => {
    try {
      const data = await registerActions(email, password, fullName);
      localStorage.setItem('token', data.token);
      set({
        user: data.user,
        token: data.token,
        authStatus: 'authenticated',
      });
      get().user;
      console.log('Registrado con existo');
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },

  // Actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginActions(email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, authStatus: 'authenticated' });
      get().user;
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();

      set({
        user: user,
        token: token,
        authStatus: 'authenticated',
      });

      return true;
    } catch (error) {
      console.log({ error });
      set({
        user: undefined,
        token: undefined,
        authStatus: 'not-authenticated',
      });
      return false;
    }
  },
}));
