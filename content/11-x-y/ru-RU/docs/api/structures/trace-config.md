# Объект TraceConfig

* `recording_mode` String (опционально) - Может быть `record-until-full`, `record-continuously`, `record-as-much-as-possible` или `trace-to-console`. По умолчанию `record-until-full`.
* `trace_buffer_size_in_kb` number (опционально) - максимальный размер буфера записи трассировки в килобайтах. По умолчанию 100MB.
* `trace_buffer_size_in_events` number (опционально) - максимальный размер буфера записи трассировки в событиях.
* `enable_argument_filter` boolean (optional) - if true, filter event data according to a specific list of events that have been manually vetted to not include any PII. Более подробно смотрите [реализацию в Chromium][trace_event_args_whitelist.cc].
* `included_categories` String[] (опционально) - список категорий трассировки для включения. Может включать глобальные шаблоны, используя `*` в конце категории названия. Смотрите [категории][] для списка категорий.
* `excluded_categories` String[] (опционально) - список категорий трассировки для исключения. Может включать глобальные шаблоны, используя `*` в конце категории названия. Смотрите [категории][] для списка категорий.
* `included_process_ids` number[] (опционально) - список идентификаторов (ID) процессов для включения в трассировку. Если не указано, будут трассироваться все процессы.
* `histogram_names` String[] (опционально) - список названий of [гистограмм][] для отчета с трассировкой.
* `memory_dump_config` Record<String, any> (опционально) - категория `disabled-by-default-memory-infra` включена, то она содержит необязательную дополнительную конфигурацию для сбора данных. Смотрите [Chromium memory-infra docs][memory-infra docs] для получения дополнительной информации.

Пример TraceConfig который примерно соответствует записям Chrome DevTools:

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

[категории]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h
[memory-infra docs]: https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way
[trace_event_args_whitelist.cc]: https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc
[гистограмм]: https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md
