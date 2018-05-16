# CPU 사용량 개체

* `percentCPUUsage` Number - 마지막 호출 이후 사용된 CPU 사용량의 퍼센테이지. 첫 번째 호출은 0을 반환.
* `idleWakeupsPerSecond` Number - getCPUUsage의 마지막 호출 이후 초당 CPU를 깨운 횟수. 첫 호출은 0을 반환. Windows에서는 항상 0을 반환.