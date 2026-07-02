import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../../shared/lib/api';
import type {
  Client,
  ClientInput,
  ClientStats,
  Paginated,
} from './types';

const KEY = 'clients';

export function useClients(page: number, limit: number) {
  return useQuery({
    queryKey: [KEY, { page, limit }],
    queryFn: async () => {
      const { data } = await api.get<Paginated<Client>>('/clients', {
        params: { page, limit },
      });
      return data;
    },
  });
}

export function useClient(id: string | undefined) {
  return useQuery({
    queryKey: [KEY, id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<Client>(`/clients/${id}`);
      return data;
    },
  });
}

export function useClientStats() {
  return useQuery({
    queryKey: [KEY, 'stats'],
    queryFn: async () => {
      const { data } = await api.get<ClientStats>('/clients/stats');
      return data;
    },
  });
}

export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ClientInput) => {
      const { data } = await api.post<Client>('/clients', input);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: ClientInput }) => {
      const { data } = await api.put<Client>(`/clients/${id}`, input);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/clients/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
