# ProcessMetric Object

* `pid` Integer - 프로세스의 ID
* `type` String - 프로세스 타입. 다음 값들 중 하나를 가짐: 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - 프로세스의 CPU 사용량
* `creationTime` Number - 이 프로세스의 생성시간. 시간은 epoch 이후 밀리 초로 표시됩니다. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - 프로세스 메모리 정보
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - One of the following values: 
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`