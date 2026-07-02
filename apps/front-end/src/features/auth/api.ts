import { useMutation } from '@tanstack/react-query';
import { api } from '../../shared/lib/api';
import { useAuthStore } from './store';

interface LoginResponse {
  accessToken: string;
  user: { id: string; email: string };
}

export interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async (creds: LoginInput) => {
      const { data } = await api.post<LoginResponse>('/auth/login', creds);
      return data;
    },
    onSuccess: (data) => setAuth(data.accessToken, data.user),
  });
}
