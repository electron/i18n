# Display オブジェクト

* `id` Number -ディスプレイに関連付けられている一意の識別子。
* `rotation` Rotation - 0, 90, 180, 270を選択することができ、時計回りで回転します。
* `scaleFactor` Number - 出力デバイスのピクセルスケール係数。
* `touchSupport` String - `available`, `unavailable`, `unknown`
* `bounds` [Rectangle](rectangle.md) 
* `size` [Size](size.md) 
* `workArea` [Rectangle](rectangle.md) 
* `workAreaSize` [Size](size.md) 

`Display`オブジェクトはシステムに接続された物理ディスプレイを表します。 A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.