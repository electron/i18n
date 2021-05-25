# Display オブジェクト

* `id` Number -ディスプレイに関連付けられている一意の識別子。
* `rotation` Rotation - 0、90、180、270のいずれかで、時計回りによる画面の回転角度を表します。
* `scaleFactor` Number - 出力デバイスのピクセルスケール係数。
* `touchSupport` String - `available`, `unavailable`, `unknown` のいずれか。
* `monochrome` Boolean - ディスプレイが白黒ディスプレイかどうか。
* `accelerometerSupport` String - `available`, `unavailable`, `unknown` のいずれか。
* `colorSpace` String -  色変換を目的とした色空間 (実現可能なすべての色の組み合わせを含む3次元オブジェクト) を表します。
* `colorDepth` Number - ピクセルあたりのビット数。
* `depthPerComponent` Number - 色コンポーネントあたりのビット数。
* `displayFrequency` Number - 表示リフレッシュレート。
* `bounds` [Rectangle](rectangle.md) - DIP ポイント単位のディスプレイの領域。
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md) - DIP ポイント単位のディスプレイの動作領域。
* `workAreaSize` [Size](size.md)
* `internal` Boolean - 内部ディスプレイの場合は `true` で外部ディスプレイの場合は `false`

`Display` オブジェクトは、システムに接続された物理的なディスプレイを表します。 ヘッドレスシステムではフェイクの `Display` が存在していたり、 `Display` がリモートの仮想ディスプレイに対応していたりする可能性があります。
