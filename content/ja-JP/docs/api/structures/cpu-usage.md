# CPUUsage オブジェクト

* `percentCPUUsage` Number - 最後に getCPUUsage を呼んでからの、CPUの使用率。最初の呼び出しは0を返す。
* `idleWakeupsPerSecond` Number - 最後に idleWakeupsPerSecond を呼んでから、アイドル状態の Cpu が起床した平均回数毎秒。最初の呼び出しは 0 を返します。Windows の場合は常に 0 を返します。