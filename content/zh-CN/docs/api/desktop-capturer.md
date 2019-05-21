# desktopCapturer

> 通过[` navigator.mediaDevices.getUserMedia `] API ，可以访问那些用于从桌面上捕获音频和视频的媒体源信息。

进程: [ Renderer](../glossary.md#renderer-process)

下面的示例演示如何从标题为 ` Electron ` 的桌面窗口捕获视频:

```javascript
// In the renderer process.
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

若要从 ` desktopCapturer ` 提供的源捕获视频, 则传递给 [` navigator.mediaDevices.getUserMedia `] 的约束必须包括 ` chromeMediaSource: "desktop" ` 和 ` audio: false `。

要从整个桌面同时捕获音频和视频, 传递给 [` navigator.mediaDevices.getUserMedia `] 的约束必须包括 ` chromeMediaSource: ' desktop ' `, 同时用于 ` audio ` 和 ` video `, 但不应包括 `chromeMediaSourceId ` 约束。

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

## 方法

` desktopCapturer ` 模块有以下方法:

### `desktopCapturer.getSources(options, callback)`

* `options` 对象 
  * ` types `String[]-列出要捕获的桌面源类型的字符串数组, 可用类型为 ` screen ` 和 ` window `。
  * ` thumbnailSize `[ Size ](structures/size.md)(可选)-媒体源缩略图应缩放到的大小。默认值为 ` 150 ` x ` 150 `。
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.
* `callback` Function - 回调函数 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

开始收集所有有效桌面媒体源的信息，当结束时将调用 `callback(error, sources)`

`sources` 是 [`DesktopCapturerSource`](structures/desktop-capturer-source.md)对象数组, 每个`DesktopCapturerSource` 代表一个屏幕或一个可捕获的独立窗口。

**[Deprecated Soon](promisification.md)**

### `desktopCapturer.getSources(options)`

* `options` Object - 过滤器对象，包含过滤参数 
  * ` types `String[]-列出要捕获的桌面源类型的字符串数组, 可用类型为 ` screen ` 和 ` window `。
  * ` thumbnailSize `[ Size ](structures/size.md)(可选)-媒体源缩略图应缩放到的大小。默认值为 ` 150 ` x ` 150 `。
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

### Caveats

`navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.

It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.