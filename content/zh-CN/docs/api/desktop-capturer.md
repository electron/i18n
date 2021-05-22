# desktopCapturer

> 访问关于使用[`navigator.mediaDevices.getUserMedia`][] API 获取的可以用来从桌面捕获音频和视频的媒体源的信息。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

为了从`desktopCapturer`提供的源捕获视频，传递给 [`navigator.mediaDevices.getUserMedia`][] 的约束条件需包括 `chromeMediaSource: 'desktop'` 和 `audio: false`。

为了同时捕获整个桌面的音视频，传递给 [`navigator.mediaDevices.getUserMedia`][] 的约束条件需包括 `chromeMediaSource: 'desktop'`，`audio` 和 `视频`，但不应该包括 `chromeMediaSourceId` 约束。

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

### `desktopCapturer.getSources(options)`

* `选项` 对象
  * ` 类型`String[]-列出要捕获的桌面源类型的字符串数组, 可用类型为 ` screen ` 和 ` window `。
  * `thumbnailSize`[Size](structures/size.md)(可选) - 媒体源缩略图应缩放到的尺寸大小。 默认是 `150` x `150`。 当您不需要缩略图时，设置宽度或高度为0。 这将节省用于获取每个窗口和屏幕内容时的处理时间。
  * `fetchWindowIcons` Boolean (可选) - 设置为true以便启用获取窗口图标。 默认值为false。 当值为false时，源的appIcon属性返回null。 如果一个源是屏幕类型也是如此。

返回 `Promise<DesktopCapturerSource[]>` - resolve 一个[`DesktopCapturerSource`](structures/desktop-capturer-source.md) 对象类型的数组，每个 `DesktopCapturerSource` 代表一个屏幕或一个可以被捕获的独立窗口。

**注意** 在macOS 10.15 Catalina 或更高版本上捕获屏幕内容需要用户同意，可通过 [`systemPreferences.getMediaAccessStatus`][] 检测是否授权。

## 注意事项

由于存在基本限制，因此`navigator.mediaDevices.getUserMedia` 无法在macOS上进行音频捕获，因此要访问系统音频的应用程序需要一个[签名内核拓展](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium以及Electron扩展不提供这个。

通过使用另一个MacOS应用程序（如Soundflower）捕获系统音频并将其通过虚拟音频输入设备来规避此限制是可能的。 然后可以用 `navigator.mediaDevices.getUserMedia`查询该虚拟设备。

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-windows-macos
