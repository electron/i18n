# Display オブジェクト

* `id` Number -ディスプレイに関連付けられている一意の識別子。
* `rotation` Rotation - 0、90、180、270のいずれかで、時計回りによる画面の回転角度を表します。
* `scaleFactor` Number - 出力デバイスのピクセルスケール係数。
* `touchSupport` String - `available`, `unavailable`, `unknown` のいずれか。
* `bounds` [Rectangle](rectangle.md) 
* `size` [Size](size.md) 
* `workArea` [Rectangle](rectangle.md) 
* `workAreaSize` [Size](size.md) 

`Display` オブジェクトは、システムに接続された物理的なディスプレイを表します。 ヘッドレスシステムでは、フェイク `Display` であったり、`Display` が、リモートの仮想ディスプレイに対応していたりする可能性があります。