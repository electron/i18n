# ProcessMetric オブジェクト

* `pid` Integer - プロセスのプロセスID。
* `type` String - プロセスタイプ (ブラウザ、タブもしくはGPUなど)。
* `memory` [MemoryInfo](memory-info.md) - プロセスのメモリ情報。
* `cpu` [CPUUsage](cpu-usage.md) - プロセスのCPU使用率。