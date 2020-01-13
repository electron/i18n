# CPUUsage Object

* `percentCPUUsage` Number - 마지막 호출 이후 사용된 CPU 사용량의 퍼센테이지. 첫 번째 호출은 0을 반환.
* `idleWakeupsPerSecond` Number - 마지막으로 getCPUUsage 호출한 후 초당 평균 CPU wakeup 수. 첫번째 호출은 0을 반환. Windows에서는 항상 0을 반환.