# desktopCapturer

> Access information about media sources that can be used to capture audio and video from the desktop using the [`navigator.mediaDevices.getUserMedia`][] API.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Das folgende Beispiel zeigt, wie Sie ein Video von einem Desktop-Fenster aufnehmen, dessen Titel `Elektron` lautet:

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

To capture video from a source provided by `desktopCapturer` the constraints passed to [`navigator.mediaDevices.getUserMedia`][] must include `chromeMediaSource: 'desktop'`, and `audio: false`.

To capture both audio and video from the entire desktop the constraints passed to [`navigator.mediaDevices.getUserMedia`][] must include `chromeMediaSource: 'desktop'`, for both `audio` and `video`, but should not include a `chromeMediaSourceId` constraint.

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

## Methoden

Das Modul `desktopCapturer` verfügt über die folgenden Methoden:

### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` String[] - Ein Array von Strings, das die Typen der Desktop-Quellen auflistet die aufgezeichnet werden sollen, verfügbare Typen sind `screen` und `window`.
  * `thumbnailSize` [Size](structures/size.md) (optional) - Die Größe, auf die die Miniaturansicht der Medienquelle skaliert werden soll. Voreinstellung ist `150` x `150`. Setzen Sie die Breite oder Höhe auf 0, wenn Sie kein Miniaturansichten benötigen. Dies reduziert die Verarbeitungszeit, die für die Erfassung des Inhalts der einzelnen Fenster und des Bildschirme benötigt wird.
  * `fetchWindowIcons` Boolean (optional) - Auf true setzen, um das Abrufen von Fenstersymbolen zu aktivieren. Der Standard Wert ist false. Bei false gibt die appIcon-Eigenschaft der Quellen null zurück. Dasselbe gilt, wenn eine Quelle den Typ "screen" hat.

Rückgabe `Promise<DesktopCapturerSource[]>` - Löst mit einem Array von [`DesktopCapturerSource`](structures/desktop-capturer-source.md)-Objekte auf, wobei jede `DesktopCapturerSource` einen Bildschirm oder ein einzelnes Fenster darstellt, das erfasst werden kann.

**Note** Capturing the screen contents requires user consent on macOS 10.15 Catalina or higher, which can detected by [`systemPreferences.getMediaAccessStatus`][].

## Vorbehalte

`navigator.mediaDevices.getUserMedia` funktioniert unter macOS nicht für Audioaufnahmen aufgrund einer grundsätzlichen Einschränkung, bei der Apps, die auf das Audiosystem zugreifen wollen, eine [signierte Kernel-Erweiterung](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html) benötigen. Chromium, und damit auch Electron, bieten dies nicht an.

Es ist möglich, diese Einschränkung zu umgehen, indem Sie das Systemaudio mit einer anderen macOS-App wie Soundflower aufnehmen und durch ein virtuelles Audioeingabegerät leiten. Dieses virtuellen Geräte können dann mit `navigator.mediaDevices.getUserMedia` abgefragt werden.

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-macos
