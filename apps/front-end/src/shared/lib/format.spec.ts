import { describe, expect, it } from 'vitest';
import { formatCurrency } from './format';

describe('formatCurrency', () => {
  it('formats a value as BRL', () => {
    expect(formatCurrency(3500)).toMatch(/R\$\s?3\.500,00/);
  });

  it('handles zero and nullish values', () => {
    expect(formatCurrency(0)).toMatch(/R\$\s?0,00/);
    expect(formatCurrency(undefined as unknown as number)).toMatch(
      /R\$\s?0,00/,
    );
  });
});
