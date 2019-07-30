# Display オブジェクト

* `id` Number -ディスプレイに関連付けられている一意の識別子。
* `rotation` Rotation - 0、90、180、270のいずれかで、時計回りによる画面の回転角度を表します。
* `scaleFactor` Number - 出力デバイスのピクセルスケール係数。
* `touchSupport` String - `available`, `unavailable`, `unknown` のいずれか。
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String - represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

`Display` オブジェクトは、システムに接続された物理的なディスプレイを表します。 ヘッドレスシステムではフェイクの `Display` が存在していたり、 `Display` がリモートの仮想ディスプレイに対応していたりする可能性があります。