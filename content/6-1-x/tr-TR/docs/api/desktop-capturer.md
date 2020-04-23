# desktopCapturer

> [`navigator.mediaDevices.getUserMedia`] API' sini kullanarak masaüstünden ses ve video yakalamak için kullanılabilecek medya kaynaklarıyla ilgili bilgilere erişin.

İşlem: [Renderer](../glossary.md#renderer-process)

Aşağıdaki örnek, ` Electron` isimli masaüstü penceresinden nasıl ekran kaydedilebileceğini göstermektedir:

```javascript
// İşleme sürecinde.
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

`desktopCapturer` tarafından sağlanan bir kaynaktan video yakalamak için [`navigator.mediaDevices.getUserMedia`]' a iletilen kısaltmalar `chromeMediaSource: 'desktop'` ve `audio: false` içermelidir.

Ses ve videoyu masaüstünün tamamından yakalamak için [`navigator.mediaDevices.getUserMedia`] içermelidir. `chromeMediaSource: 'desktop'`, her ikisi içinde `audio` and `video`, ancak yalnızca bir `chromeMediaSourceId`kısıtlama getirilmelidir.

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

## Yöntemler

`desktopCapturer` modülü aşağıdaki yöntemleri içerir:

### `desktopCapturer.getSources(options, callback)`

* `options` Object
  * `types` Dizi[] - Yakalanacak masaüstü kaynaklarının türlerini listeleyen dizelerin bir dizisi, kullanılabilir türleri `screen` ve `window`' dir.
  * `thumbnailSize` [Size](structures/size.md) (optional) - The size that the media source thumbnail should be scaled to. Default is `150` x `150`. Set width or height to 0 when you do not need the thumbnails. This will save the processing time required for capturing the content of each window and screen.
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.
* `callback` Function
  * `error` Error
  * `kaynaklar`[DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Bittiğinde tüm mevcut masaüstü medya kaynakları hakkıda bilgi toplamaya başlar ve `callback(error, sources)`ı arar.

`sources` [`DesktopCapturerSource`](structures/desktop-capturer-source.md) nesnelerinin bir dizilişidir, her `DesktopCapturerSource` yakalanabilen bir ekran veya tek bir pencereyi temsil eder.

**[Deprecated Soon](modernization/promisification.md)**

### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` Dizi[] - Yakalanacak masaüstü kaynaklarının türlerini listeleyen dizelerin bir dizisi, kullanılabilir türleri `screen` ve `window`' dir.
  * `thumbnailSize` [Size](structures/size.md) (optional) - The size that the media source thumbnail should be scaled to. Default is `150` x `150`. Set width or height to 0 when you do not need the thumbnails. This will save the processing time required for capturing the content of each window and screen.
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

### Caveats

`navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.

It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.
