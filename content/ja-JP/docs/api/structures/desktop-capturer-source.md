# DesktopCapturerSource オブジェクト

* `id` String - [`navigator.webkitGetUserMedia`] を呼び出した際、`chromeMediaSourceId` として使われるウインドウもしくは画面の識別子。 識別子の形式は、`XX` をランダムで生成された数字とすると、`window:XX` もしくは `screen:XX` となります。
* `name` String - ウインドウソースの名前は、ウインドウタイトルと一致しますが、画面ソースは、`Entire Screen` もしくは `Screen <index>` という名前になります。
* `thumbnail` [NativeImage](../native-image.md) - サムネイル画像。 **注:** サムネイルのサイズは、`desktopCapturer.getSources` に渡された `options` で指定された `thumbnailSize` と同じであるという保証はありません。 実際のサイズは、画面もしくはウィンドウの縮尺によって異なります。