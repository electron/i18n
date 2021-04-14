# desktopCapturer

> Greifen Sie über die [`navigator.mediaDevices.getUserMedia`][] -API auf Informationen zu Medienquellen zu, die zum Erfassen von Audio- und -Videos vom Desktop verwendet werden können.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Das folgende Beispiel zeigt, wie Sie ein Video von einem Desktop-Fenster aufnehmen, dessen Titel `Elektron` lautet:

```javascript
Im Rendererprozess.
const { desktopCapturer } = require('electron')

desktopCapturer.getSources(' typen: ['window', 'screen'] ').then(async sources => '
  for (const source of sources) -
    if (source.name === 'Electron') '
      versuchen sie '
        const stream = await navigator.mediaDevices.getUserMedia('
          audio source.id
              
              
            : false,
          video:
              minBreite: 1280,
              maxBreite: 1280,
              minHöhe: 720,
              maxHeight: 720


        )
        handleStream(stream)
      - catch (e) -
        handleError(e)


    -

-  )

Funktion handleStream (stream) -
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()


FunktionshandleFehler (e)
  Konsole.log(e)
.
```

Um Videos von einer Quelle zu erfassen, die von `desktopCapturer` bereitgestellt wird, müssen die an [`navigator.mediaDevices.getUserMedia`][] übergeben en Einschränkungen `chromeMediaSource: 'desktop'`und `audio: false`enthalten.

Um sowohl Audio als auch Video vom gesamten Desktop zu erfassen, müssen die Einschränkungen, die an [`navigator.mediaDevices.getUserMedia`][] übergeben werden, `chromeMediaSource: 'desktop'`, für `audio` und `video`enthalten, sollten jedoch keine `chromeMediaSourceId` Einschränkung enthalten.

```javascript
const-Einschränkungen = -
  Audio:
    obligatorisch: {
      chromeMediaSource: 'desktop'
    }
  ,
  Video:
    obligatorisch: {
      chromeMediaSource: 'desktop'
    }
  -

```

## Methoden

Das Modul `desktopCapturer` verfügt über die folgenden Methoden:

### `desktopCapturer.getSources(Optionen)`

* `options` -Objekt
  * `types` String[] - Ein Array von Strings, das die Typen der Desktop-Quellen auflistet die aufgezeichnet werden sollen, verfügbare Typen sind `screen` und `window`.
  * `thumbnailSize` [Size](structures/size.md) (optional) - Die Größe, auf die die Miniaturansicht der Medienquelle skaliert werden soll. Voreinstellung ist `150` x `150`. Setzen Sie die Breite oder Höhe auf 0, wenn Sie kein Miniaturansichten benötigen. Dies reduziert die Verarbeitungszeit, die für die Erfassung des Inhalts der einzelnen Fenster und des Bildschirme benötigt wird.
  * `fetchWindowIcons` Boolean (optional) - Auf true setzen, um das Abrufen von Fenstersymbolen zu aktivieren. Der Standard Wert ist false. Bei false gibt die appIcon-Eigenschaft der Quellen null zurück. Dasselbe gilt, wenn eine Quelle den Typ "screen" hat.

Rückgabe `Promise<DesktopCapturerSource[]>` - Löst mit einem Array von [`DesktopCapturerSource`](structures/desktop-capturer-source.md)-Objekte auf, wobei jede `DesktopCapturerSource` einen Bildschirm oder ein einzelnes Fenster darstellt, das erfasst werden kann.

**Hinweis** Die Erfassung der Bildschirminhalte erfordert die Zustimmung des Benutzers zu macOS 10.15 Catalina oder höher, , die von [`systemPreferences.getMediaAccessStatus`][]erkannt werden können.

## Vorbehalte

`navigator.mediaDevices.getUserMedia` funktioniert unter macOS nicht für Audioaufnahmen aufgrund einer grundsätzlichen Einschränkung, bei der Apps, die auf das Audiosystem zugreifen wollen, eine [signierte Kernel-Erweiterung](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html) benötigen. Chromium, und damit auch Electron, bieten dies nicht an.

Es ist möglich, diese Einschränkung zu umgehen, indem Sie das Systemaudio mit einer anderen macOS-App wie Soundflower aufnehmen und durch ein virtuelles Audioeingabegerät leiten. Dieses virtuellen Geräte können dann mit `navigator.mediaDevices.getUserMedia` abgefragt werden.

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-windows-macos
