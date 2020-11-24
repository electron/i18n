# DesktopCapturerSource Object

* `id` String - The identifier of a window or screen that can be used as a
  `chromeMediaSourceId` constraint when calling
  [`navigator.webkitGetUserMedia`]. The format of the identifier will be
  `window:XX` or `screen:XX`, where `XX` is a random generated number.
* `name` String - A screen source will be named either `Entire Screen` or
  `Screen <index>`, while the name of a window source will match the window
  title.
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:**
  There is no guarantee that the size of the thumbnail is the same as the
  `thumbnailSize` specified in the `options` passed to
  `desktopCapturer.getSources`. The actual size depends on the scale of the
  screen or window.
* `display_id` String - A unique identifier that will correspond to the `id` of
  the matching [Display](display.md) returned by the [Screen API](../screen.md).
  On some platforms, this is equivalent to the `XX` portion of the `id` field
  above and on others it will differ. It will be an empty string if not
  available.
* `appIcon` [NativeImage](../native-image.md) - An icon image of the
  application that owns the window or null if the source has a type screen.
  The size of the icon is not known in advance and depends on what
  the application provides.
