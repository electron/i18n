# TraceCategoriesAndOptions Object

* `categoryFilter` String - A filter to control what category groups should be traced. A filter can have an optional '-' prefix to exclude category groups that contain a matching category. 在同一个列表中，不支持 包含一个匹配模式，又排除这个匹配模式。 示例：`test_MyTest*`, `test_MyTest*,test_OtherStuff`, `-excluded_category1,-excluded_category2`.
* `traceOptions` String - 控制启用哪种跟踪， 它是以逗号分隔的以下字符串序列： `record-until-full`，`record-continuously`，`trace-to-console`，`enable-sampling`，`enable-systrace`， 例如 `'record-until-full,enable-sampling'`。 前3个选项是跟踪记录模式，因此是相互排斥的。 如果`traceOptions`字符串中出现多个跟踪记录模式，最后一个优先。 如果指定没有跟踪记录模式，那记录模式就是`record-until-full`。 跟踪选项将首先重置为默认选项（`record_mode` 设置 为 `record-until-full`，`enable_sampling` 和 `enable_systrace` 设置为 `false`）在从 `traceOptions` 解析选项之前。
