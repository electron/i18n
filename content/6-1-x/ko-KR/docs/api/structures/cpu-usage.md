# CPUUsage Object

* `percentCPUUsage` Number - 마지막 getCPUUsage 호출 이후 사용된 CPU 사용량의 퍼센티지 (%). 최초 호출은 0을 반환합니다.
* `idleWakeupsPerSecond` Number - 마지막 getCPUUsage 이후의 초당 평균 idle cpu wakeup 횟수. 최초 호출은 0을 반환합니다. Windows에서는 항상 0을 반환합니다.
