# ProcessMetric Object

* `pid` Integer - 프로세스의 ID
* `type` String - 프로세스의 종류. 다음 값들 중 하나를 가짐:
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) -  프로세스의 CPU 사용량
