# desktopCapturer

> 通过[` navigator.mediaDevices.getUserMedia `] API ，可以访问那些用于从桌面上捕获音频和视频的媒体源信息。

进程: [ Renderer](../glossary.md#renderer-process)

下面的示例演示如何从标题为 ` Electron ` 的桌面窗口捕获视频:

```javascript
// In the renderer process.
const {desktopCapturer} = require('electron')

desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  if (error) throw error
  for (let i = 0; i < sources.length; ++i) {
    if (sources[i].name === 'Electron') {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      })
      .then((stream) => handleStream(stream))
      .catch((e) => handleError(e))
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

* `选项` 对象 
  * ` types `String[]-列出要捕获的桌面源类型的字符串数组, 可用类型为 ` screen ` 和 ` window `。
  * ` thumbnailSize `[ Size ](structures/size.md)(可选)-媒体源缩略图应缩放到的大小。默认值为 ` 150 ` x ` 150 `。
* `callback` Function - 回调函数 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

开始收集所有有效桌面媒体源的信息，当结束时将调用 `callback(error, sources)`

`sources` 是 [`DesktopCapturerSource`](structures/desktop-capturer-source.md)对象数组, 每个`DesktopCapturerSource` 代表一个屏幕或一个可捕获的独立窗口。