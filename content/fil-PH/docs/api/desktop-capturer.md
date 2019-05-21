# pagkakahuli sa tuktok ng desk

> Ang "access" ay impormasyon tungkol sa mga pinagmulan ng "media" na maaaring magamit upang makunan ng "audio" at "video" galing sa "desktop" gamit ang [`navigator.mediaDevices.getUserMedia`]API.

Mga proseso: [Renderer](../glossary.md#renderer-process)

Ang sumunod na halimbawa ay nagpapakita kung paano kumuha sa bidyo galing sa "desktop window" na ang pamagat ay `Electron`:

```javascript
// sa pagpoproseso ng "render".
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

Upang makakuha ng bidyo galing sa na ibinigay ng `desktopCapturer`na pumipigil sa pagdaan sa [`navigator.mediaDevices.getUserMedia`] na dapat kasama sa `chromeMediaSource: 'desktop'`, at `audio: false`.

Para makuha ang parehong "audio" at bidyo galing sa kabuuang "desktop" na pumipigil dumaan sa [`navigator.mediaDevices.getUserMedia`] dapat kasama sa `chromeMediaSource: 'desktop'`, para sa parehong `audio` at `video`, ngunit hindi dapat kasama ang pagpigil sa `chromeMediaSourceId`.

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

## Mga Paraan

Ang modyul sa `desktopCapturer` ay mayroong mga sumusunod na paraan:

### `desktopCapturer.getSources(options, callback)`

* `pagpipilian` Bagay 
  * `types` String[] - Ang array ng "Strings" na naglilista ng iba't-ibang uri ng mga "source" ng "desktop" na kukunin, ang mga maaaring gamitin na uri ay `screen` at `window`.
  * `thumbnailSize` [Ang laki](structures/size.md) (opsyonal) - ang laki ng media sourceay thumbnail dapat sukatan. Default ay `150` x `150`.
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Simulan pangalap ng impormasyon tungkol sa lahat ng magagamit na desktop media sources, at tawag `callback(error, sources)` kapag tapos na.

Ang `sources` ay isang "array" ng [`DesktopCapturerSource`](structures/desktop-capturer-source.md) "object", ang bawat `DesktopCapturerSource` ay kumakatawan sa "screen" o sa indibidwal na "window" na maaaring makuha.

**[Deprecated Soon](promisification.md)**

### `desktopCapturer.getSources(options)`

* `mga pagpipilian` Bagay 
  * `types` String[] - Ang array ng "Strings" na naglilista ng iba't-ibang uri ng mga "source" ng "desktop" na kukunin, ang mga maaaring gamitin na uri ay `screen` at `window`.
  * `thumbnailSize` [Ang laki](structures/size.md) (opsyonal) - ang laki ng media sourceay thumbnail dapat sukatan. Default ay `150` x `150`.
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

### Caveats

`navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.

It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.