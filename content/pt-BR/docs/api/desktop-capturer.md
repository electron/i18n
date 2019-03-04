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
  * `types` String[] - Um array de Strings que lista os tipos de área de trabalho a serem capturadas, tipos disponíveis são `screen` e `window`.
  * `thumbnailSize` [Tamanho](structures/size.md) (opcional) - O tamanho que a miniatura da fonte de mídia deve ser dimensionada. O padrão é `150` x `150`.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Inicia a coleta de informações sobre todas as fontes de mídia de desktop disponíveis, e chamadas à `callback(error, sources)` quando concluído.

`sources` é um array de objetos [`DesktopCapturerSource`](structures/desktop-capturer-source.md), cada `DesktopCapturerSource` representa uma tela ou uma janela individual que pode ser capturada.