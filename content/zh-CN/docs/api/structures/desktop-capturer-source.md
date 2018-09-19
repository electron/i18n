# DesktopCapturerSource 对象

* ` id ` 字符串--在调用 [`navigator. webkitGetUserMedia `] 时可用作 ` chromeMediaSourceId ` 约束的window或screen的标识符。 标识符的格式是：`window:XX`或者 `screen:XX`，`XX` 是一个随机生成的数字
* ` name `字符串--screen源将被命名为 `Entire Screen ` 或 `Screen<index> `, 而window源的名称将与window标题匹配。
* ` 缩略图 `[ NativeImage ](../native-image.md)--缩略图图像。 ** 注意: **无法保证缩略图的大小与传递给 ` desktopCapturer. getSources ` 的 ` options ` 中指定的 ` thumbnailSize ` 相同。 实际大小取决于screen或window的比例。