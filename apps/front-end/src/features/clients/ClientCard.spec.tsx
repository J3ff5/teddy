import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { ClientCard } from './ClientCard';
import { useSelectedStore } from '../selected/store';
import type { Client } from './types';

const client: Client = {
  id: '1',
  name: 'Eduardo',
  salary: 3500,
  companyValue: 120000,
  viewCount: 0,
  createdAt: '',
  updatedAt: '',
};

describe('ClientCard', () => {
  beforeEach(() => useSelectedStore.getState().clear());

  it('renders name and money formatted as BRL', () => {
    render(
      <MemoryRouter>
        <ClientCard client={client} />
      </MemoryRouter>,
    );
    // getByText throws if absent, acting as the assertion.
    screen.getByText('Eduardo');
    expect(screen.getByText(/3\.500,00/)).toBeTruthy();
    expect(screen.getByText(/120\.000,00/)).toBeTruthy();
  });
});
