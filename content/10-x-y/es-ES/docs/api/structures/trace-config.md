# Objeto TraceConfig

* `recording_mode` String (opcional) - Puede ser `record-until-full`, `record-continuously`, `record-as-much-as-possible` o `trace-to-console`. Ajustado por defecto a `record-until-full`.
* `trace_buffer_size_in_kb` number (opcional) - tamaño máximo del búfer de grabación de seguimiento en kilobytes. Valor por defecto: 100MB.
* `trace_buffer_size_in_events` number (opcional) - tamaño máximo del búfer de grabación de seguimiento en eventos.
* `enable_argument_filter` boolean (opcional) - si es true, filtra datos de eventos de acuerdo a una lista blanca de eventos que han sido aprobados manualmente para no incluir ningún PII. See [the implementation in Chromium][trace_event_args_whitelist.cc] for specifics.
* `included_categories` String[] (opcional) - una lista de categorías de rastreo para incluir. Puede incluir patrones glob-like usando `*` al final del nombre de la categoría. See [tracing categories][] for the list of categories.
* `excluded_categories` String[] (opcional) - una lista de categorías a excluir. Puede incluir patrones glob-like usando `*` al final del nombre de la categoría. See [tracing categories][] for the list of categories.
* `included_process_ids` number[] (opcional) - una lista de IDs de procesos a incluir en el rastreo. Si no se especifica, rastrea todos los procesos.
* `histogram_names` String[] (optional) - a list of [histogram][] names to report with the trace.
* `memory_dump_config` Record<String, any> (opcional) - si la categoría `disabled-by-default-memory-infra` está activada, este contiene configuración adicional opcional para la recolección de datos. See the [Chromium memory-infra docs][memory-infra docs] for more information.

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
  excluded_categories: [ '*' ]
}
```

[tracing categories]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h
[memory-infra docs]: https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way
[trace_event_args_whitelist.cc]: https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc
[histogram]: https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md
