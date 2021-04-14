# Objeto TraceConfig

* `recording_mode` String (opcional) - Pode ser `record-until-full`, `record-continuously`, `record-as-much-as-possible` ou `trace-to-console`. Inadimplência para `record-until-full`.
* `trace_buffer_size_in_kb` número (opcional) - tamanho máximo do traçado tampão de gravação em kilobytes. Padrão para 100MB.
* `trace_buffer_size_in_events` número (opcional) - tamanho máximo do rastreamento tampão de gravação em eventos.
* `enable_argument_filter` boolean (opcional) - se verdadeiro, filtra dados de evento de acordo com uma lista específica de eventos que foram manualmente avaliados para não incluir nenhum PII. Veja [a implementação em ][trace_event_args_whitelist.cc] de Cromo para detalhes.
* `included_categories` String[] (opcional) - uma lista de categorias de rastreamento para incluem. Pode incluir padrões semelhantes a glob usando `*` no final da categoria nome. Veja [categorias de rastreamento][] para a lista de categorias.
* `excluded_categories` String[] (opcional) - uma lista de categorias de rastreamento para excluir. Pode incluir padrões semelhantes a glob usando `*` no final da categoria nome. Veja [categorias de rastreamento][] para a lista de categorias.
* `included_process_ids` número[] (opcional) - uma lista de IDs de processo para incluir no rastreamento. Se não for especificado, rastreie todos os processos.
* `histogram_names` String[] (opcional) - uma lista de [histograma][] nomes para relatar com o traço.
* `memory_dump_config` Record<String, any> (opcional) - se a categoria `disabled-by-default-memory-infra` estiver ativada, esta contém configuração adicional opcional para coleta de dados. Consulte o [Chromium ][memory-infra docs] de infra de memória para obter mais informações.

Um exemplo TraceConfig que corresponde aproximadamente ao que o Chrome DevTools registra:

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

[categorias de rastreamento]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h
[memory-infra docs]: https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way
[trace_event_args_whitelist.cc]: https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc
[histograma]: https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md
