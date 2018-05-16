# desktopCapturer

> Información de acceso sobre los recursos de medios que pueden ser utilizados para capturar audio y video desde el escritorio utilizando la API [`navigator.mediaDevices.getUserMedia`] API.

Proceso: [Renderer](../glossary.md#renderer-process)

En el siguiente ejemplo se muestra cómo capturar vídeo desde una ventana de escritorio cuyo título es `Electron`:

```javascript
// En el proceso de renderizado.
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

* `opciones` Object 
  * `types` String[] - Un arreglo de cadenas que crea una lista de los tipos de fuentes de escritorio para ser capturadas. Los tipos disponibles son `screen` y `window`.
  * `thumbnailSize` [Size](structures/size.md) (opcional) - El tamaño de la vista previa de la fuente al cual debe ser modificado. Por defecto es `150` x `150`.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Inicia la recopilación de información sobre todas las fuentes de escritorio disponibles, y llama a `callback(error, sources)`cuando haya terminado.

`sources`es un arreglo de objetos [`DesktopCapturerSource`](structures/desktop-capturer-source.md). Cada`DesktopCapturerSource` representa una pantalla o una ventana individual que puede ser capturada.