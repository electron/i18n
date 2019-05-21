# desktopCapturer

> [`navigator.mediaDevices.getUserMedia`] APIを使用して、デスクトップからオーディオとビデオをキャプチャするのに使用できるメディアソースに関する情報にアクセスします。

プロセス: [Renderer](../glossary.md#renderer-process)

以下の例では、タイトルが `Electron` であるデスクトップウインドウからビデオをキャプチャする方法を示します。

```javascript
// レンダラープロセス
const { desktopCapturer } = require('electron')

desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  for (const source of sources) {
    if (source.name === 'Electron') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        })
        handleStream(stream)
      } catch (e) {
        handleError(e)
      }
      return
    }
  }
})

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}
```

`desktopCapturer` によって提供されるソースからビデオをキャプチャするには、[`navigator.mediaDevices.getUserMedia`] に渡される制約に、`chromeMediaSource: 'desktop'` と `audio: false` を含めなければなりません。

デスクトップ全体からオーディオとビデオの両方をキャプチャするには、[`navigator.mediaDevices.getUserMedia`] に渡される制約に、`audio` と `video` の両方に対して `chromeMediaSource: 'desktop'` を含めなければなりませんが、`chromeMediaSourceId` の制約を含める必要はありません。

```javascript
const constraints = {
  audio: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  },
  video: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  }
}
```

## メソッド

`desktopCapturer` モジュールには以下のメソッドがあります。

### `desktopCapturer.getSources(options, callback)`

* `options` オブジェクト 
  * `types` String[] - キャプチャされるデスクトップソースの種別を列挙した文字列の配列。指定できる種別は、`screen` と `window` です。
  * `thumbnailSize` [Size](structures/size.md) (任意) - メディアソースのサムネイルを拡大縮小するサイズ。省略値は、`150` x `150` です。
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

すべての利用可能なデスクトップのメディアソースに関する情報の収集を開始し、完了時に `callback(error, sources)` を呼び出します。

`sources` は、[`DesktopCapturerSource`](structures/desktop-capturer-source.md) オブジェクトの配列で、各 `DesktopCapturerSource` は、キャプチャすることのできる画面または個々のウインドウを表します。

**[非推奨予定](promisification.md)**

### `desktopCapturer.getSources(options)`

* `options` Object 
  * `types` String[] - キャプチャされるデスクトップソースの種別を列挙した文字列の配列。指定できる種別は、`screen` と `window` です。
  * `thumbnailSize` [Size](structures/size.md) (任意) - メディアソースのサムネイルを拡大縮小するサイズ。省略値は、`150` x `150` です。
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

### Caveats

`navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.

It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.