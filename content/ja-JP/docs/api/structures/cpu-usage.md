# CPUUsage オブジェクト

* `percentCPUUsage` Number - 最後の getCPUUsage 呼び出し以降に使用されたCPUの割合。 最初の呼び出しは0を返します。
* `idleWakeupsPerSecond` Number - 最後の getCPUUsage 呼び出し以降にアイドル状態のCPUがウェイクアップした毎秒平均回数。最初の呼び出しは0を返します。Windowsの場合は常に0を返します。