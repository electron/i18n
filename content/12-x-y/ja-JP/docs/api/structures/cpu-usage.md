# CPUUsage オブジェクト

* `percentCPUUsage` Number - 最後の getCPUUsage 呼び出し以降に使用されたCPUの割合。 最初の呼び出しは 0 を返します。
* `idleWakeupsPerSecond` Number - 最後の getCPUUsage 呼び出し以降の1秒あたりのアイドル状態のCPUウェイクアップの平均回数。 最初の呼び出しは 0 を返します。 Windows の場合は常に 0 を返します。
