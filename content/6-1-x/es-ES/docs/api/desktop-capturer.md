# desktopCapturer

> Información de acceso sobre los recursos de medios que pueden ser utilizados para capturar audio y video desde el escritorio utilizando la API [`navigator.mediaDevices.getUserMedia`] API.

Proceso: [Renderer](../glossary.md#renderer-process)

En el siguiente ejemplo se muestra cómo capturar vídeo desde una ventana de escritorio cuyo título es `Electron`:

```javascript
// En el proceso de renderizado.
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

Para capturar vídeo desde una fuente proporcionada por `desktopCapturer` las limitaciones pasadas a [`navigator.mediaDevices.getUserMedia`] deben incluir `chromeMediaSource: 'desktop'`, y `audio: false`.

Para capturar tanto audio y video desde todo el escritorio, las limitaciones pasadas a [`navigator.mediaDevices.getUserMedia`] deben incluir `chromeMediaSource: 'desktop'`, para ambos `audio` y `video`, pero no deben incluir una limitación `chromeMediaSourceId`.

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

### `desktopCapturer.getSources(options, callback)`

* `options` Object
  * `types` String[] - Un arreglo de cadenas que crea una lista de los tipos de fuentes de escritorio para ser capturadas. Los tipos disponibles son `screen` y `window`.
  * `thumbnailSize` [Size](structures/size.md) (opcional) - El tamaño de la miniatura de la fuente al cual deber ser escalado. Por defecto es `150` x `150`. Establecer ancho o alto a 0 cuando no necesitas las miniaturas. Esto guardara el tiempo de procesamiento requerido para capturar el contenido de cada ventana y pantalla.
  * `fetchWindowIcons` Boolean (opcional) - Establece a true para activar la obtención de los iconos de ventana. El valor por defecto es falso. Cuando es false la propiedad appIcon de las fuentes devuelve null. Mismo si una fuente tiene el tipo pantalla.
* `callback` Función
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Inicia la recopilación de información sobre todas las fuentes de escritorio disponibles, y llama a `callback(error, sources)`cuando haya terminado.

`sources`es un arreglo de objetos [`DesktopCapturerSource`](structures/desktop-capturer-source.md). Cada`DesktopCapturerSource` representa una pantalla o una ventana individual que puede ser capturada.

**[Próximamente desaprobado](modernization/promisification.md)**

### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` String[] - Un arreglo de cadenas que crea una lista de los tipos de fuentes de escritorio para ser capturadas. Los tipos disponibles son `screen` y `window`.
  * `thumbnailSize` [Size](structures/size.md) (opcional) - El tamaño de la miniatura de la fuente al cual deber ser escalado. Por defecto es `150` x `150`. Establecer ancho o alto a 0 cuando no necesitas las miniaturas. Esto guardara el tiempo de procesamiento requerido para capturar el contenido de cada ventana y pantalla.
  * `fetchWindowIcons` Boolean (opcional) - Establece a true para activar la obtención de los iconos de ventana. El valor por defecto es falso. Cuando es false la propiedad appIcon de las fuentes devuelve null. Mismo si una fuente tiene el tipo pantalla.

Devuelve `Promise<DesktopCapturerSource[]>` - Resuelve con un array de objetos [`DesktopCapturerSource`](structures/desktop-capturer-source.md), cada `DesktopCapturerSource` representa una pantalla o una ventana individual que puede ser capturada.

### Advertencias

`navigator.mediaDevices.getUserMedia` no trabaja en macOS para captura de audio debido a una limitación fundamental porque las aplicaciones que quieren acceder al audio del sistema requieren un [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, y por extensión Electron, no proporciona esto.

Es posible eludir esta limitación capturando el audio del sistema con otra aplicación macOS como Soundflower y pasar esto a través de una dispositivo de entrada de audio virtual. Este dispositivo virtual puede ser consultado con `navigator.mediaDevices.getUserMedia`.
