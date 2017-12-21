# DesktopCapturerSource オブジェクト

* `id` String - The identifier of a window or screen that can be used as a `chromeMediaSourceId` constraint when calling [`navigator.webkitGetUserMedia`]. The format of the identifier will be `window:XX` or `screen:XX`, where `XX` is a random generated number.
* `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` [NativeImage](../native-image.md) - サムネイル画像。 **注:** サムネイルのサイズが`desktopCapturer.getSources`に渡された`options`で指定された`thumbnailSize`と同じであるという保証はありません。 実際のサイズは、画面またはウィンドウの縮尺によって異なります。