# TraceConfig Objekt

* `recording_mode` String (optional) - Kann `record-until-full`, `record-continuously`, `record-as-much-as-possible` oder `trace-to-console`sein. Standardmäßig `record-until-full`.
* `trace_buffer_size_in_kb` -Zahl (optional) - maximale Größe der Spurverfolgung Aufzeichnungspuffer in Kilobyte. Standardmäßig 100 MB.
* `trace_buffer_size_in_events` -Zahl (optional) - maximale Größe der Ablaufverfolgung Aufzeichnungspuffer siniert in Ereignissen.
* `enable_argument_filter` boolesch (optional) - wenn true, filtern Sie Ereignisdaten gemäß einer bestimmten Liste von Ereignissen, die manuell überprüft wurden, um keine personenbezogenen Daten enthalten. Einzelheiten finden Sie [der Implementierung in Chromium][trace_event_args_whitelist.cc] .
* `included_categories` String[] (optional) - eine Liste der zu verwendenden Tracing-Kategorien. Kann globartige Muster mit `*` am Ende der Kategorie Namen enthalten. Die Liste der Kategorien finden Sie [][] .
* `excluded_categories` String[] (optional) - eine Liste der Tracing-Kategorien, die ausschließen sollen. Kann globartige Muster mit `*` am Ende der Kategorie Namen enthalten. Die Liste der Kategorien finden Sie [][] .
* `included_process_ids` -Nummer[] (optional) - eine Liste der Prozess-IDs, die in die Ablaufverfolgung aufnehmen sollen. Wenn nicht angegeben, verfolgen Sie alle Prozesse.
* `histogram_names` String[] (optional) - eine Liste [Histogramm][] Namen, um mit der Ablaufverfolgung zu melden.
* `memory_dump_config` Record<String, any> (optional) - Wenn die `disabled-by-default-memory-infra` Kategorie aktiviert ist, enthält dies optionale zusätzliche Konfiguration für die Datenerfassung. Weitere Informationen finden Sie in den [Chromium memory-infra docs][memory-infra docs] .

Ein Beispiel traceConfig, das grob mit dem übereinstimmt, was Chrome DevTools aufzeichnet:

```js
-
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
  ]

  excluded_categories,
```

[2]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h

[3]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h

[4]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h

[5]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h
[memory-infra docs]: https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way
[trace_event_args_whitelist.cc]: https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc
[Histogramm]: https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md
