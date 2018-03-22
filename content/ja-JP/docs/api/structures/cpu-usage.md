# CPUUsage オブジェクト

* `percentCPUUsage` Number - 最後に getCPUUsage を呼んでからの、CPUの使用率。最初の呼び出しは0を返す。
* `idleWakeupsPerSecond` Number - 最後に getCPUUsage を呼んでから、アイドル状態の CPU がウェイクアップした平均回数毎秒。最初の呼び出しは0を返す。Windows の場合は常に0を返す。