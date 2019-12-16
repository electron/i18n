# CPUUsage オブジェクト

* `percentCPUUsage` Number - 最後の getCPUUsage 呼び出し以降に使用されたCPUの割合。 最初の呼び出しは0を返します。
* `idleWakeupsPerSecond` Number - 最後に getCPUUsage を呼んでから、アイドル状態の CPU がウェイクアップした平均回数毎秒。最初の呼び出しでは 0 を返します。Windows の場合は常に 0 を返します。