# ProcessMetric オブジェクト

* `pid` Integer - プロセスのプロセス ID。
* `type` String - プロセスの種別。 以下の値のいずれかです。
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - プロセスの CPU 使用率。
* `creationTime` Number - このプロセスの作成時間。 時間はエポックからのミリ秒数として表されます。 `pid` はプロセスの終了後に再利用される可能性があるため、`pid` と `creationTime` の両方を使用してプロセスを一意に識別すると良いでしょう。
* `memory` [MemoryInfo](memory-info.md) - プロセスのメモリ情報。
* `sandboxed` Boolean (任意) _macOS_ _Windows_ - プロセスが OS レベルでサンドボックス化されるかどうか。
* `integrityLevel` String (任意) _Windows_ - 次のいずれかの値:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`
