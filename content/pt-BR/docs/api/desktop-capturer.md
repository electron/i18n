# desktopCapturer

> Acesse informações sobre fontes de mídia que podem ser usadas para capturar áudio e vídeo da área de trabalho usando a API [`navigator.mediaDevices.getUserMedia`].

Processo: [Renderer](../glossary.md#renderer-process)

O exemplo a seguir mostra como capturar vídeo de uma janela desktop com o título `Electron`:

```javascript
// No processo renderer.
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
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Inicia a coleta de informações sobre todas as fontes de mídia de desktop disponíveis, e chamadas à `callback(error, sources)` quando concluído.

`sources` é um array de objetos [`DesktopCapturerSource`](structures/desktop-capturer-source.md), cada `DesktopCapturerSource` representa uma tela ou uma janela individual que pode ser capturada.

**[Deprecated Soon](promisification.md)**

### `desktopCapturer.getSources(options)`

* `options` Object 
  * `types` String[] - Um array de Strings que lista os tipos de área de trabalho a serem capturadas, tipos disponíveis são `screen` e `window`.
  * `thumbnailSize` [Tamanho](structures/size.md) (opcional) - O tamanho que a miniatura da fonte de mídia deve ser dimensionada. O padrão é `150` x `150`.
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

### Caveats

`navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.

It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.