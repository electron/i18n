# desktopCapturer

> Información de acceso sobre los recursos de medios que pueden ser utilizados para capturar audio y video desde el escritorio utilizando la API [`navigator.mediaDevices.getUserMedia`] API.

Proceso: [Renderizador](../glossary.md#renderer-process)

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
      }, handleStream, handleError)
      return
    }
  }
})

function handleStream (stream) {
  document.querySelector('video').src = URL.createObjectURL(stream)
}

function handleError (e) {
  console.log(e)
}
```

Para capturar vídeo desde una fuente proporcionada por por `desktopCapturer` las limitaciones pasadas a [`navigator.mediaDevices.getUserMedia`] deben incluir `chromeMediaSource: 'desktop'`, and `audio: false`.

Para capturar tanto audio y video desde todo el escritorio, las limitaciones pasadas a [`navigator.mediaDevices.getUserMedia`] deben incluir `chromeMediaSource: 'desktop'`, for both `audio` and `video`, pero no deben incluir una limitación `chromeMediaSourceId`.

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
  * `types` String[] - An array of Strings that lists the types of desktop sources to be captured, available types are `screen` and `window`.
  * `thumbnailSize` [Size](structures/size.md) (optional) - The size that the media source thumbnail should be scaled to. Default is `150` x `150`.
* `llamada de vuelta` Función 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Starts gathering information about all available desktop media sources, and calls `callback(error, sources)` when finished.

`sources` is an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.