# desktopCapturer

> [`navigator.mediaDevices.getUserMedia`][] APIを使用して、デスクトップからの音声と映像のキャプチャに利用できるメディアソース関連の情報にアクセスします。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

`desktopCapturer` が提供するソースから映像をキャプチャするには、[`navigator.mediaDevices.getUserMedia`][] に渡す制約に、`chromeMediaSource: 'desktop'` と `audio: false` を含める必要があります。

デスクトップ全体から音声と映像の両方をキャプチャするには、[`navigator.mediaDevices.getUserMedia`][] に渡す制約に、`audio` と `video` の両方に対して `chromeMediaSource: 'desktop'` を含める必要がありますが、`chromeMediaSourceId` 制約は不要です。

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

### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` String[] - キャプチャされるデスクトップソースの種別を列挙した文字列の配列。指定できる種別は、`screen` と `window` です。
  * `thumbnailSize` [Size](structures/size.md) (任意) - メディアソースのサムネイルを拡大縮小するサイズ。 省略値は `150` x `150` です。 サムネイルが不要な場合は、幅または高さを 0 に設定してください。 これにより、各ウィンドウおよび画面のコンテンツをキャプチャするために必要な処理時間が節約されます。
  * `fetchWindowIcons` Boolean (任意) - ウィンドウアイコンの取得を有効にするには true に設定します。 デフォルト値は false です。 false の場合、ソースの appIcon プロパティは null を返します。 ソースが screen 型の場合も同様です。

戻り値 `Promise<DesktopCapturerSource[]>` - [`DesktopCapturerSource`](structures/desktop-capturer-source.md) オブジェクトの配列を使用して解決します。各 `DesktopCapturerSource` は、キャプチャできる画面または個々のウィンドウを表します。

**Note** Capturing the screen contents requires user consent on macOS 10.15 Catalina or higher, which can detected by [`systemPreferences.getMediaAccessStatus`][].

## Caveats

`navigator.mediaDevices.getUserMedia` はシステムのオーディオにアクセスしたいアプリが[署名付きカーネル拡張](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html)を必要とするという基本的な制限のため、macOS ではオーディオキャプチャが動作しません。 Chrome、ひいては Electron はこれを提供していません。

Soundflower のような他の macOS アプリでシステムオーディオをキャプチャし、それを仮想オーディオ入力デバイスに渡すことでこの制限を回避することが可能です。 この仮想デバイスは、 `navigator.mediaDevices.getUserMedia`.を使用して照会できます。

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-macos
