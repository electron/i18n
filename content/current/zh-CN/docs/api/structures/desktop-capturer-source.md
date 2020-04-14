# DesktopCapturerSource 对象

* `id` String - 一个 window 或 screen 的标识符，在调用 [`navigator. webkitGetUserMedia`] 时可作为 `chromeMediaSourceId` 约束，。 标识符的格式是：`window:XX`或者 `screen:XX`，`XX` 是一个随机生成的数字
* ` name `字符串--screen源将被命名为 `Entire Screen ` 或 `Screen<index> `, 而window源的名称将与window标题匹配。
* `thumbnail`[NativeImage](../native-image.md) - 缩略图图像。 **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. 实际尺寸取决于 screen 或 window 的比例。
* `display_id` String - 一个由 [Screen API](../screen.md) 返回的与 [Display](display.md) 的 `id` 对应匹配的唯一标识符。 在某些平台上，这相当于上面 `id` 字段中的 `XX` 部分，其他平台则有所不同。 它在不可用时将会是一个空字符串。
* `appIcon` [NativeImage](../native-image.md) - 可能是带有 window 的应用的图标， 或者 srouce 有一个 type screen 时null。 图标尺寸无法事先知道，它取决于提供的应用。
