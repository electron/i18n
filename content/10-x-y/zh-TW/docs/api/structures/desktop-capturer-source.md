# DesktopCapturerSource 物件

* `id`String - 當呼叫[`navigator.webkitGetUserMedia`] ，window或screen的識別碼`，可被當作chromeMediaSourceId`約束 識別碼的格式將為`window：XX`或`screen：XX，`其中`XX`是一個隨機生成的數位。
* `name` String - screen 來源將命名為`Entire Screen`"或 `Screen<index></1>`，而window source的名稱將與window title 匹配。
* `thumbnail` [NativeImage](../native-image.md) - 縮圖. **注：** 不保證`縮略圖大小`與指定`desktopCapturer.getSources`的選項一致 實際大小取決於螢幕或視窗。
* `display_id`String - 一個獨立的識別碼，與 [Screen API](../screen.md)傳回的[Display](display.md) `id`匹配。 在某些平臺上，`id`欄位的`XX`部分和在其他平台會有所不同。 如果不可用，它將是一個空字串。
* `appIcon` [ NativeImage ](../native-image.md)- 視窗或screen型別的null應用程式的icon。 若icon的大小事先不知道，由應用程式提供。
