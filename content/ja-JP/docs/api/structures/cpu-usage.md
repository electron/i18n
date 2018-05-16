# CPUUsage オブジェクト

* `percentCPUUsage` Number - 最後に getCPUUsage を呼んでからの、CPUの使用率。最初の呼び出しは0を返す。
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.