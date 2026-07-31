import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosClient from '../api/axiosClient';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      loading: false,

      login: async (correo, contrasena) => {
        set({ loading: true });
        try {
          const response = await axiosClient.post('/auth/login', { correo, contrasena });
          const data = response.data;

          const tokenVal = data.token || data.accessToken;
          const userObj = data.user || data.usuario || data;
          const roleVal = (userObj?.rol || userObj?.Rol || '').toLowerCase();

          if (roleVal !== 'admin') {
            set({ loading: false });
            throw new Error('Acceso denegado: este panel es exclusivo para administradores del sistema.');
          }

          localStorage.setItem('admin_token', tokenVal);

          set({
            user: userObj,
            token: tokenVal,
            role: roleVal,
            isAuthenticated: true,
            loading: false
          });

          return { success: true };
        } catch (error) {
          set({ loading: false });
          const message = error.response?.data?.msg || error.response?.data?.message || error.message || 'Error al iniciar sesión';
          throw new Error(message);
        }
      },

      logout: () => {
        localStorage.removeItem('admin_token');
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
          loading: false
        });
      }
    }),
    {
      name: 'admin-auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state && state.token && state.user) {
          state.isAuthenticated = true;
        }
      }
    }
  )
);
