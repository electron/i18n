# DesktopCapturerSource Object

* `id` String - The identifier of a window or screen that can be used as a `chromeMediaSourceId` constraint when calling [`navigator.webkitGetUserMedia`]. 标识符的格式是：`window:XX`或者 `screen:XX`，`XX` 是一个随机生成的数字
* ` name `字符串-screen源将被命名为 `Entire Screen ` 或 `Screen<index> `, 而window源的名称将与window标题匹配。
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.