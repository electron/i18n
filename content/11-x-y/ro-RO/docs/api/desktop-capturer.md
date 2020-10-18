# desktopCapturer

> Accesați informații despre sursele media care pot fi utilizate pentru a captura audio și video de pe desktop utilizând api-ul [`navigator.mediaDevices.getUserMedia`][].

Proces: [Principal](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Următorul exemplu arată cum să capturați videoclipuri dintr-o fereastră de desktop al cărei titlu este `Electron`:

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

Pentru a captura video de la o sursă furnizată de `desktopCapturer` constrângerile trecut la [`navigator.mediaDevices.getUserMedia`][] trebuie să includă `chromeMediaSource: 'desktop'`, și `audio: false`.

Pentru a captura atât audio cât și video de pe întregul desktop, constrângerile transmise către [`navigator.mediaDevices.getUserMedia`][] trebuie să includă `chromeMediaSource: 'desktop'`, atât pentru `audio` cât și pentru `video`, dar nu ar trebui să includă o constrângere `chromeMediaSourceId`.

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

## Metode

Modulul `desktopCapturer` are următoarele metode:

### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` String[] - O matrice de șiruri care listează tipurile de surse desktop pentru a fi capturate, tipurile disponibile sunt `screen` (ecran) și `window` (fereastră).
  * `thumbnailSize` [Size](structures/size.md) (optional) - Dimensiunea la care miniatura sursei media ar trebui scalat. Valoarea implicită este de `150` x `150`. Setați lățimea sau înălțimea la 0 atunci când nu este nevoie miniaturi. Acest lucru va economisi timpul de procesare necesar pentru capturarea conținutului fiecărei ferestre și ecran.
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

**Note** Capturing the screen contents requires user consent on macOS 10.15 Catalina or higher, which can detected by [`systemPreferences.getMediaAccessStatus`][].

## Caveats

`navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.

It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-macos
