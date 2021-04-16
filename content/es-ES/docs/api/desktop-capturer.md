# desktopCapturer

> Access information about media sources that can be used to capture audio and video from the desktop using the [`navigator.mediaDevices.getUserMedia`][] API.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

En el siguiente ejemplo se muestra cómo capturar vídeo desde una ventana de escritorio cuyo título es `Electron`:

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

## Métodos

El módulo `desktopCapturer` tiene los siguientes métodos:

### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` String[] - Un arreglo de cadenas que crea una lista de los tipos de fuentes de escritorio para ser capturadas. Los tipos disponibles son `screen` y `window`.
  * `thumbnailSize` [Size](structures/size.md) (opcional) - El tamaño de la miniatura de la fuente al cual deber ser escalado. Por defecto es `150` x `150`. Establecer ancho o alto a 0 cuando no necesitas las miniaturas. Esto guardara el tiempo de procesamiento requerido para capturar el contenido de cada ventana y pantalla.
  * `fetchWindowIcons` Boolean (opcional) - Establece a true para activar la obtención de los iconos de ventana. El valor por defecto es falso. Cuando es false la propiedad appIcon de las fuentes devuelve null. Mismo si una fuente tiene el tipo pantalla.

Devuelve `Promise<DesktopCapturerSource[]>` - Resuelve con un array de objetos [`DesktopCapturerSource`](structures/desktop-capturer-source.md), cada `DesktopCapturerSource` representa una pantalla o una ventana individual que puede ser capturada.

**Nota** La capturar del contenido de la pantalla requiere el consentimiento del usuario en macOS 10.15 Catalina o superior, el cual puede ser detectado por [`systemPreferences.getMediaAccessStatus`][].

## Advertencias

`navigator.mediaDevices.getUserMedia` no trabaja en macOS para captura de audio debido a una limitación fundamental porque las aplicaciones que quieren acceder al audio del sistema requieren un [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, y por extensión Electron, no proporciona esto.

Es posible eludir esta limitación capturando el audio del sistema con otra aplicación macOS como Soundflower y pasar esto a través de una dispositivo de entrada de audio virtual. Este dispositivo virtual puede ser consultado con `navigator.mediaDevices.getUserMedia`.

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-windows-macos
