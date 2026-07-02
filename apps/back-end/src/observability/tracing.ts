/**
 * OpenTelemetry tracing bootstrap (differential). Imported first in main.ts so
 * instrumentation is registered before any other module loads. Disabled by
 * default — set OTEL_ENABLED=true and point OTEL_EXPORTER_OTLP_ENDPOINT at a
 * collector (e.g. http://otel-collector:4318/v1/traces) to emit spans.
 */
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

let sdk: NodeSDK | undefined;

if (process.env.OTEL_ENABLED === 'true') {
  sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'teddy-back-end',
    }),
    traceExporter: new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || undefined,
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });
  sdk.start();

  process.once('SIGTERM', () => {
    void sdk?.shutdown().finally(() => process.exit(0));
  });
}

export { sdk };
