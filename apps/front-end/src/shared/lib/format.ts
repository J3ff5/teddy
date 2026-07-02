const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatCurrency = (value: number): string => brl.format(value ?? 0);
