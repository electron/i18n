# TraceConfig 오브젝트

* `recording_mode` String (optional) - `record-until-full`, `record-continuously`, `record-as-much-as-possible` 또는 `trace-to-console`. 기본값은 `record-until-full`.
* `trace_buffer_size_in_kb` number (optional) - trace 레코딩 버퍼의 최대 크기 (kilobytes) 기본값 100MB.
* `trace_buffer_size_in_events` number (optional) - 이벤트에서 trace 레코딩 버퍼의 최대 크기.
* `enable_argument_filter` boolean (optional) - true 인 경우, PII를 포함하지 않도록 수동으로 조사된 이벤트의 화이트리스트에 따라 이벤트 데이터를 필터링합니다. 자세한 내용은 [the implementation in Chromium](https://chromium.googlesource.com/chromium/src/+/master/services/tracing/public/cpp/trace_event_args_whitelist.cc)을 보세요.
* `included_categories` String[] (optional) - 포함할 추적 카테고리 리스트. 카테고리 이름 끝에 `*`을 사용하여 glob-like 패턴을 포함할 수 있습니다. 카테고리 리스트는 [tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h)를 참조하세요.
* `excluded_categories` String[] (optional) - 제외할 추적 카테고리 리스트. 카테고리 이름 끝에 `*`을 사용하여 glob-like 패턴을 포함할 수 있습니다. 카테고리 리스트는 [tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h)를 참조하세요.
* `included_process_ids` number[] (optional) - 추적에 포함할 프로세스 ID 리스트. 지정하지 않으면 모든 프로세스를 추적합니다.
* `histogram_names` String[] (optional) - 추적과 함께 보고할 [histogram](https://chromium.googlesource.com/chromium/src.git/+/HEAD/tools/metrics/histograms/README.md) 이름 리스트.
* `memory_dump_config` Record<String, any> (optional) - `disabled-by-default-memory-infra` 카테고리가 활성화 된 경우 데이터 수집을 위한 선택적 추가 구성이 포함됩니다. 더 자세한 내용은 [Chromium memory-infra docs](https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way)를 참조하세요.

Chrome DevTools 레코드와 대랴 일치하는 TraceConfig 예:

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
