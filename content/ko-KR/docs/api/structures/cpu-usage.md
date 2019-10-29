# CPUUsage Object

* `percentCPUUsage` Number - 마지막 호출 이후 사용된 CPU 사용량의 퍼센테이지. 첫 번째 호출은 0을 반환.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.