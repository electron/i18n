# TraceConfig 对象

* `recording_mode` 字符串（可选） - 可以 `record-until-full`， `record-continuously`， `record-as-much-as-possible` 或 `trace-to-console`。 `record-until-full`的默认值。
* `trace_buffer_size_in_kb` 数字（可选） - 以千字节记录缓冲 微量的最大尺寸。 默认值为 100MB。
* `trace_buffer_size_in_events` 数字（可选） - 跟踪的最大大小 记录事件缓冲区。
* `enable_argument_filter` boolean (可选) - 如果为true，则筛选结果（事件数据）是根据手动设置的列表（不包括任何PII）来进行条件帅选。 有关具体细节，请参阅 [ 铬][trace_event_args_whitelist.cc] 中的实施情况。
* `included_categories` 字符串[]（可选） - 包含的跟踪类别列表。 可以在类别 名称的末尾使用 `*` ，包括类似球状的图案。 有关类别列表</a> ，请参阅跟踪类别。</p></li> 
  
  * `excluded_categories` 字符串[]（可选） - 排除的跟踪类别列表。 可以在类别 名称的末尾使用 `*` ，包括类似球状的图案。 有关类别列表</a> ，请参阅 跟踪类别。</p></li> 
  
  * `included_process_ids` 编号 [] （可选） - 的过程 ID 列表包含在跟踪中。 如果没有指定，则跟踪所有过程。

* `histogram_names` 字符串[]（可选） - [直方图][] 名称列表，以报告 的痕迹。

* `memory_dump_config` 记录<String, any> （可选） - 如果启用了 `disabled-by-default-memory-infra` 类别，这将包含 用于数据收集的可选附加配置。 有关更多信息，请参阅 [铬 内存内存文档][memory-infra docs] 。</ul> 

一个大致匹配铬开发图记录的示例跟踪侦察：



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

[memory-infra docs]: https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way
[trace_event_args_whitelist.cc]: https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc
[直方图]: https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md
