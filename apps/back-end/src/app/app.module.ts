import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { buildDataSourceOptions } from '../config/typeorm.config';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule } from '../clients/clients.module';
import { HealthModule } from '../health/health.module';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',
        // JSON in production (requirement); pretty-printed in dev for readability.
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => buildDataSourceOptions(),
    }),
    MetricsModule,
    HealthModule,
    AuthModule,
    ClientsModule,
  ],
})
export class AppModule {}
