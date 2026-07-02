import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Client } from '../clients/types';

interface SelectedState {
  clients: Client[];
  toggle: (client: Client) => void;
  isSelected: (id: string) => boolean;
  clear: () => void;
}

/**
 * "Clientes selecionados" is a client-side-only feature (from the Figma):
 * the picked clients live in localStorage, no backend involved.
 */
export const useSelectedStore = create<SelectedState>()(
  persist(
    (set, get) => ({
      clients: [],
      toggle: (client) =>
        set((state) =>
          state.clients.some((c) => c.id === client.id)
            ? { clients: state.clients.filter((c) => c.id !== client.id) }
            : { clients: [...state.clients, client] },
        ),
      isSelected: (id) => get().clients.some((c) => c.id === id),
      clear: () => set({ clients: [] }),
    }),
    { name: 'teddy-selected-clients' },
  ),
);
