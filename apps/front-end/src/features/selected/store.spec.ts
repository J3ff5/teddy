import { beforeEach, describe, expect, it } from 'vitest';
import { useSelectedStore } from './store';
import type { Client } from '../clients/types';

const makeClient = (id: string): Client => ({
  id,
  name: `Client ${id}`,
  salary: 1000,
  companyValue: 5000,
  viewCount: 0,
  createdAt: '',
  updatedAt: '',
});

describe('selected clients store', () => {
  beforeEach(() => useSelectedStore.getState().clear());

  it('toggles a client in and out of the selection', () => {
    const client = makeClient('1');
    useSelectedStore.getState().toggle(client);
    expect(useSelectedStore.getState().isSelected('1')).toBe(true);
    useSelectedStore.getState().toggle(client);
    expect(useSelectedStore.getState().isSelected('1')).toBe(false);
  });

  it('clears all selected clients', () => {
    useSelectedStore.getState().toggle(makeClient('1'));
    useSelectedStore.getState().toggle(makeClient('2'));
    expect(useSelectedStore.getState().clients).toHaveLength(2);
    useSelectedStore.getState().clear();
    expect(useSelectedStore.getState().clients).toHaveLength(0);
  });
});
