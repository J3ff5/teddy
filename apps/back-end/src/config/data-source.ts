import 'reflect-metadata';
import { config as loadEnv } from 'dotenv';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from './typeorm.config';

// Used by the TypeORM CLI (migration:generate / migration:run). The Nest
// runtime builds its own DataSource via TypeOrmModule.forRootAsync.
loadEnv();

export default new DataSource(buildDataSourceOptions());
