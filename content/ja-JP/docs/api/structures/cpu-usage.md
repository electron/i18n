# CPUUsage オブジェクト

* `percentCPUUsage` Number - 最後の getCPUUsage 呼び出し以降に使用されたCPUの割合。 最初の呼び出しは0を返します。
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.