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
* `creationTime` Number - 이 프로세스의 생성시간. 시간은 epoch 이후 밀리 초로 표시됩니다. 프로세스가 종료된 후 `pid`를 재사용 할 수 있으므로 `pid` 및 `creationTime`을 모두 사용하여 프로세스를 고유하게 식별하는 것이 유용합니다.
* `memory` [MemoryInfo](memory-info.md) - 프로세스 메모리 정보
* `sandboxed` Boolean (optional) *macOS* *Windows* - 프로세스가 OS 수준에서 샌드박스 처리되는지 여부.
* `integrityLevel` String (optional) *Windows* - 다음 값들 중 하나를 가짐: 
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`