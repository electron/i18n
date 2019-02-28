# desktopCapturer

> Acesse informações sobre fontes de mídia que podem ser usadas para capturar áudio e vídeo da área de trabalho usando a API [`navigator.mediaDevices.getUserMedia`].

Processo: [Renderer](../glossary.md#renderer-process)

O exemplo a seguir mostra como capturar vídeo de uma janela desktop com o título `Electron`:

```javascript
// No processo renderer.
const { desktopCapturer } = require('electron')

desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
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
      }).then((stream) => handleStream(stream))
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

Para capturar vídeo de uma fonte fornecida por `desktopCapturer` as restrições passado para [`navigator.mediaDevices.getUserMedia`] devem incluir `chromeMediaSource: 'desktop'`, e `áudio: false`.

Para capturar áudio e vídeo de toda a área de trabalho, as restrições passadas para [`navigator.mediaDevices.getUserMedia`] devem incluir `chromeMediaSource: 'desktop'`, para ambos `áudio` e `vídeo`, mas não devem incluir uma restrição para `chromeMediaSourceId`.

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

O módulo `desktopCapturer` tem os seguintes métodos:

### `desktopCapturer.getSources(options, callback)`

* `opções` Object 
  * `types` String[] - An array of Strings that lists the types of desktop sources to be captured, available types are `screen` and `window`.
  * `thumbnailSize` [Size](structures/size.md) (optional) - The size that the media source thumbnail should be scaled to. Default is `150` x `150`.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Starts gathering information about all available desktop media sources, and calls `callback(error, sources)` when finished.

`sources` is an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.