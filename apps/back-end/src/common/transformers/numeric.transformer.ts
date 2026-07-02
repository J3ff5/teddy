import { ValueTransformer } from 'typeorm';

/**
 * Postgres `numeric`/`decimal` columns come back as strings via node-postgres.
 * This transformer keeps them as JS numbers on the entity side so the API
 * serializes money fields (salary, companyValue) as numbers, not strings.
 */
export class NumericTransformer implements ValueTransformer {
  to(value: number | null): number | null {
    return value;
  }

  from(value: string | null): number | null {
    return value === null ? null : parseFloat(value);
  }
}
