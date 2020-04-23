# Display 物件

* `id` Number - 代表顯示區的唯一識別數字
* `rotation` Number - 螢幕畫面的順時鐘旋轉角度，度數可以是 0、90、180 或 270。
* `scaleFactor` Number - 輸出裝置的像素比例
* `touchSupport` String - 可以是 `available`、`unavailable`、`unknown`。
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.
