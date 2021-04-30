# TraceConfig 对象

* `recording_mode` String (可选) - 值可以是 `record-until-full`， `record-continuously`， `record-as-much-as-possible` 或 `trace-to-console`。 默认值为`record-until-full`。
* `trace_buffer_size_in_kb` number (可选) - 追踪记录缓冲区的最大容量，以kb为单位。 默认大小为 100MB。
* `trace_buffer_size_in_events` number (可选) - 追踪记录缓冲区的最大事件数量。
* `enable_argument_filter` boolean (可选) - 如果为true，则筛选结果（事件数据）是根据手动设置的列表（不包括任何PII）来进行条件帅选。 详细信息，请参阅[ Chromium 中的实现][trace_event_args_whitelist.cc]。
* `included_categories` String[] (可选) - 要包含的追踪类别列表。 可以包含 glob-like 匹配模式，在类别名末尾使用 `*`。 类别列表请查看[tracing categories][]。
* `excluded_categories` String[] (可选) - 要排除的追踪类别列表。 可以包含 glob-like 匹配模式，在类别名末尾使用 `*`。 类别列表请查看[tracing categories][]。
* `included_process_ids` number[] (可选) - 追踪时要包含的进程 ID 列表。 如果不指定，则追踪所有进程。
* `histogram_names` String[] (可选) - 与追踪一同报告的[直方图][] 的名称列表。
* `memory_dump_config` Record<String, any> (可选) - 如果启用了`disabled-by-default-memory-infra` 类别，则包含用于数据收集的可选附加配置。 更多信息请查看 [Chromium memory-infra 文档][memory-infra docs]。

一个和 Chrome DevTools 记录大致相同的Trace示例配置：

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

[tracing categories]: https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h
[memory-infra docs]: https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way
[trace_event_args_whitelist.cc]: https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc
[直方图]: https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md
