# DesktopCapturerSource オブジェクト

* `id` String - [`navigator.webkitGetUserMedia`] を呼び出した際、`chromeMediaSourceId` として使われるウインドウもしくは画面の識別子。 The format of the identifier will be `window:XX:YY` or `screen:ZZ:0`. XX is the windowID/handle. YY is 1 for the current process, and 0 for all others. ZZ is a sequential number that represents the screen, and it does not equal to the index in the source's name.
* `name` String - ウインドウソースの名前は、ウインドウタイトルと一致しますが、画面ソースは、`Entire Screen` もしくは `Screen <index>` という名前になります。
* `thumbnail` [NativeImage](../native-image.md) - サムネイル画像。 **注:** サムネイルのサイズは、`desktopCapturer.getSources` に渡された `options` で指定された `thumbnailSize` と同じであるという保証はありません。 実際のサイズは、画面もしくはウィンドウの縮尺によって異なります。
* `display_id` String - [Screen API](../screen.md) によって返される、[Display](display.md) の `id` に対応する一意な識別子。 いくつかのプラットフォーム上では、上記の `id` フィールドの `XX` 部と等価です。 利用不可能な場合は空文字列になります。
* `appIcon` [NativeImage](../native-image.md) - そのウインドウを有するアプリケーションのアイコン画像。Screen 型のソースである場合は null になります。 アイコンのサイズは事前に分かりません。これは指定したアプリケーションによって変ります。
