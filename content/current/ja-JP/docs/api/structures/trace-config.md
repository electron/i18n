# TraceConfig オブジェクト

* `recording_mode` String (任意) - `record-until-full`、`record-continuously`、`record-as-much-as-possible` または `trace-to-console` にできます。 省略値は、`record-until-full` です。
* `trace_buffer_size_in_kb` number (任意) - トレース記録バッファの最大サイズ。キロバイト単位です。 省略値は、100MB です。
* `trace_buffer_size_in_events` number (任意) - イベントでのトレース記録バッファの最大サイズ。
* `enable_argument_filter` boolean (任意) - true の場合、PII を含まないように手動で検証されたイベントのホワイトリストに従ってイベントデータをフィルタリングします。 詳細については [Chromiumでの実装](https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc) を参照してください。
* `included_categories` String[] (任意) - 含めるトレースカテゴリのリスト。 カテゴリ名の最後に `*` を使用して、glob のようなパターンを含めることができます。 カテゴリのリストは [トレースカテゴリ](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h) を参照してください。
* `excluded_categories` String[] (任意) - 除外するトレースカテゴリのリスト。 カテゴリ名の最後に `*` を使用して、glob のようなパターンを含めることができます。 カテゴリのリストは [トレースカテゴリ](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h) を参照してください。
* `included_process_ids` number[] (任意) - トレースに含めるプロセスIDのリスト。 指定しない場合、すべてのプロセスをトレースします。
* `histogram_names` String[] (任意) - トレースとともにレポートする [histogram](https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md) の名前リスト。
* `memory_dump_config` Record<String, any> (任意) - `disabled-by-default-memory-infra` カテゴリが有効になっている場合、これにデータ収集のための任意の追加設定を含めます。 より詳しくは、[Chromium メモリーインフラドキュメント](https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way) を参照して下さい。

以下は、Chrome デベロッパーツールが記録する内容とほぼ同じ TraceConfig の例です。

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
