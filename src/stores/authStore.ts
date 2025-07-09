import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, demoUsers, sendToN8nWebhook } from '@/lib/types';

interface AuthState {
  user: User | null;
  webhookUrl: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: any) => void;
  setWebhookUrl: (url: string) => void;
  trackActivity: (activity: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      webhookUrl: '',
      
      login: async (email: string, password: string) => {
        const user = demoUsers.find(u => u.email === email && u.password === password);
        if (user) {
          set({ user });
          
          // Enviar evento de login al webhook
          const { webhookUrl } = get();
          await sendToN8nWebhook({
            event: 'user_login',
            userId: user.id,
            userRole: user.role,
            userName: user.name
          }, webhookUrl);
          
          return true;
        }
        return false;
      },
      
      logout: () => {
        const { user, webhookUrl } = get();
        if (user) {
          sendToN8nWebhook({
            event: 'user_logout',
            userId: user.id,
            userRole: user.role
          }, webhookUrl);
        }
        set({ user: null });
      },
      
      updateProfile: (profile: any) => {
        const { user, webhookUrl } = get();
        if (user) {
          const updatedUser = { ...user, profile, isNewUser: false };
          set({ user: updatedUser });
          
          sendToN8nWebhook({
            event: 'profile_updated',
            userId: user.id,
            profile
          }, webhookUrl);
        }
      },
      
      setWebhookUrl: (url: string) => {
        set({ webhookUrl: url });
      },
      
      trackActivity: (activity: any) => {
        const { user, webhookUrl } = get();
        if (user) {
          sendToN8nWebhook({
            event: 'student_activity',
            userId: user.id,
            activity
          }, webhookUrl);
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);