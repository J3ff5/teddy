import { DataSourceOptions } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { InitSchema1720000000000 } from '../migrations/1720000000000-InitSchema';

/**
 * Single source of truth for the DB connection, shared by the Nest runtime
 * (TypeOrmModule.forRootAsync) and the TypeORM CLI (data-source.ts).
 *
 * Entities and migrations are imported explicitly (not via glob) so the config
 * survives webpack bundling — globbed paths break once everything is bundled
 * into a single dist file.
 */
export function buildDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Client],
    migrations: [InitSchema1720000000000],
    synchronize: false,
    // Run pending migrations on boot so the container is ready without a
    // separate migration step. Safe here because migrations are idempotent
    // (tracked in the migrations table).
    migrationsRun: true,
    logging: process.env.DB_LOGGING === 'true',
  };
}
