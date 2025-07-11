import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, SignupData, User } from '../types/index.ts';

// Mock API calls - replace with real API endpoints
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'demo@astronova.com' && password === 'demo123') {
    return {
      id: '1',
      email: 'demo@astronova.com',
      name: 'Demo User',
      birthDate: '1990-01-15',
      birthTime: '14:30',
      birthPlace: 'New Delhi, India',
      createdAt: new Date().toISOString(),
    };
  }
  throw new Error('Invalid credentials');
};

const mockSignup = async (userData: SignupData): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Date.now().toString(),
    email: userData.email,
    name: userData.name,
    birthDate: userData.birthDate,
    birthTime: userData.birthTime,
    birthPlace: userData.birthPlace,
    createdAt: new Date().toISOString(),
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const user = await mockLogin(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (userData: SignupData) => {
        set({ isLoading: true });
        try {
          const user = await mockSignup(userData);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);