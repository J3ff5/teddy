import { beforeEach, describe, expect, it } from 'vitest';
import { useAuthStore } from './store';

describe('auth store', () => {
  beforeEach(() => useAuthStore.getState().logout());

  it('stores token and user on setAuth', () => {
    useAuthStore.getState().setAuth('tok123', { id: '1', email: 'a@b.com' });
    const state = useAuthStore.getState();
    expect(state.token).toBe('tok123');
    expect(state.user).toEqual({ id: '1', email: 'a@b.com' });
  });

  it('clears session on logout', () => {
    useAuthStore.getState().setAuth('tok123', { id: '1', email: 'a@b.com' });
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});
