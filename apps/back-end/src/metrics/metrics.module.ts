import { Global, Module } from '@nestjs/common';
import {
  getToken,
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';

export const CLIENT_VIEWS_COUNTER = 'client_views_total';

/**
 * Exposes GET /metrics in Prometheus exposition format (default Node/process
 * metrics) plus a custom business counter for client-detail views. Global so
 * any module can @InjectMetric(CLIENT_VIEWS_COUNTER).
 */
@Global()
@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: { enabled: true },
    }),
  ],
  providers: [
    makeCounterProvider({
      name: CLIENT_VIEWS_COUNTER,
      help: 'Total de acessos ao detalhe de clientes',
    }),
  ],
  exports: [PrometheusModule, getToken(CLIENT_VIEWS_COUNTER)],
})
export class MetricsModule {}
