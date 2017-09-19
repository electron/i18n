# Display オブジェクト

* `id` Number -ディスプレイに関連付けられている一意の識別子。
* `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
* `scaleFactor` Number - 出力デバイスのピクセルスケール係数。
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md) 
* `size` [Size](size.md) 
* `workArea` [Rectangle](rectangle.md) 
* `workAreaSize` [Size](size.md) 

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.