# Objeto TraceConfig

* `recording_mode` String (opcional) - Puede ser `record-until-full`, `record-continuously`, `record-as-much-as-possible` o `trace-to-console`. Ajustado por defecto a `record-until-full`.
* `trace_buffer_size_in_kb` number (opcional) - tamaño máximo del búfer de grabación de seguimiento en kilobytes. Valor por defecto: 100MB.
* `trace_buffer_size_in_events` number (opcional) - tamaño máximo del búfer de grabación de seguimiento en eventos.
* `enable_argument_filter` boolean (opcional) - si true, filtra datos de eventos de acuerdo a una lista especifica de eventos que han sido manualmente revisadas para no incluir ningún PII. Vea [la implementación en Chromium](https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc) para detalles.
* `included_categories` String[] (opcional) - una lista de categorías de rastreo para incluir. Puede incluir patrones glob-like usando `*` al final del nombre de la categoría. Vea [categorías de seguimiento](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h) para la lista de categorías.
* `excluded_categories` String[] (opcional) - una lista de categorías a excluir. Puede incluir patrones glob-like usando `*` al final del nombre de la categoría. Vea [categorías de seguimiento](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h) para la lista de categorías.
* `included_process_ids` number[] (opcional) - una lista de IDs de procesos a incluir en el rastreo. Si no se especifica, rastrea todos los procesos.
* `histogram_names` String[] (opcional) - una lista de nombres [histogram](https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md) para reportar con el seguimiento.
* `memory_dump_config` Record<String, any> (opcional) - si la categoría `disabled-by-default-memory-infra` está activada, este contiene configuración adicional opcional para la recolección de datos. Vea la [Chromium memory-infra docs](https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way) para más información.

Un ejemplo de TraceConfig que coincide aproximadamente con lo que registra Chrome DevTools:

```js
{
  recording_mode: 'record-until-full',
  included_categories: [
    'devtools.timeline',
    'disabled-by-default-devtools.timeline',
    'disabled-by-default-devtools.timeline.frame',
    'disabled-by-default-devtools.timeline.stack',
    'v8.execute',
    'blink.console',
    'blink.user_timing',
    'latencyInfo',
    'disabled-by-default-v8.cpu_profiler',
    'disabled-by-default-v8.cpu_profiler.hires'
  ],
  excluded_categories: ['*']
}
```
