# Objet TraceConfig

* `recording_mode` String (facultatif) - Peut être `record-until-full`, `record-continuously`, `record-as-much-as-possible` ou `trace-to-console`. Par défaut à `record-until-full`.
* `trace_buffer_size_in_kb` nombre (facultatif) - taille maximale de la trace de tampon d’enregistrement en kilooctets. Par défaut à 100 Mo.
* `trace_buffer_size_in_events` nombre (facultatif) - taille maximale de la trace et enregistrement dans les événements.
* `enable_argument_filter` boolean (facultatif) - si c’est vrai, filtrer les données d’événements selon une liste spécifique d’événements qui ont été examinés manuellement pour ne pas inclure un IIP. Voir [la mise en œuvre chromium][trace_event_args_whitelist.cc] pour plus de détails.
* `included_categories` String[] (facultatif) - une liste de catégories de traçage à inclure. Peut inclure des motifs glob-like en utilisant `*` à la fin de la catégorie nom. Consultez [catégories de traçage][] pour la liste des catégories.
* `excluded_categories` String[] (facultatif) - liste des catégories de traçage à exclure . Peut inclure des motifs glob-like en utilisant `*` à la fin de la catégorie nom. Consultez [catégories de traçage][] pour la liste des catégories.
* `included_process_ids` numéro[] (facultatif) - une liste d’ID de processus à inclure dans la trace. S’il n’est pas spécifié, tracez tous les processus.
* `histogram_names` String[] (facultatif) - une liste d' [histogramme][] noms pour signaler avec la trace.
* `memory_dump_config` enregistrement<String, any> (facultatif) - si la catégorie `disabled-by-default-memory-infra` est activée, cela contient une configuration supplémentaire optionnelle pour la collecte de données. Consultez les [chromium et mémoire-infra docs pour plus][memory-infra docs] 'informations.

Un exemple TraceConfig qui correspond approximativement à ce que Chrome DevTools enregistre :

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

[catégories de traçage]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h
[memory-infra docs]: https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way
[trace_event_args_whitelist.cc]: https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc
[histogramme]: https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md
