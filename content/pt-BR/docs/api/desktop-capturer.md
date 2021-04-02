# desktopCapturer

> Acesse informações sobre fontes de mídia que podem ser usadas para capturar áudio e vídeo da área de trabalho usando a API [`navigator.mediaDevices.getUserMedia`][] .

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

função handleError (e) {
  console.log(e)
}
```

Para capturar vídeos de uma fonte fornecida por `desktopCapturer` as restrições passadas para [`navigator.mediaDevices.getUserMedia`][] devem incluir `chromeMediaSource: 'desktop'`e `audio: false`.

Para capturar áudio e vídeo de toda a área de trabalho, as restrições passadas para [`navigator.mediaDevices.getUserMedia`][] devem incluir `chromeMediaSource: 'desktop'`, tanto para `audio` quanto para `video`, mas não devem incluir uma restrição `chromeMediaSourceId` .

```javascript
const restrições = {
  áudio: {
    obrigatório: {
      chromeMediaSource: 'desktop'
    }
  },
  vídeo: {
    obrigatório: {
      chromeMediaSource: 'desktop'
    }
  }
}
```

## Métodos

O módulo `desktopCapturer` tem os seguintes métodos:

### `desktopCapturer.getSources(opções)`

* objeto `options`
  * `types` String[] - Um array de Strings que lista os tipos de área de trabalho a serem capturadas, tipos disponíveis são `screen` e `window`.
  * `thumbnailSize` [Tamanho](structures/size.md) (opcional) - O tamanho para o da miniatura de fonte de mídia deve ser dimensionado. Padrão é `150` x `150`. Ajuste a largura ou a altura para 0 quando não precisar as miniaturas. Isso economizará o tempo de processamento necessário para capturar o conteúdo de cada janela e tela .
  * `fetchWindowIcons` Booleano (opcional) - Defina como true para ativar ícones de janela de busca. O valor padrão é falso. Quando falsa a propriedade appIcon das fontes retornam nulas. O mesmo se uma fonte tiver a tela do tipo.

Devoluções `Promise<DesktopCapturerSource[]>` - Resolve com uma variedade de objetos [`DesktopCapturerSource`](structures/desktop-capturer-source.md) , cada `DesktopCapturerSource` representa uma tela ou uma janela individual que pode ser capturada.

**Note** Capturar o conteúdo da tela requer o consentimento do usuário no macOS 10.15 Catalina ou superior, que podem ser detectados por [`systemPreferences.getMediaAccessStatus`][].

## Advertências

`navigator.mediaDevices.getUserMedia` não funciona no macOS para captura de áudio devido a uma limitação fundamental pela qual aplicativos que desejam acessar o áudio do sistema exigem uma extensão de kernel assinada [](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). O cromo, e por extensão Electron, não fornece isso.

É possível contornar essa limitação capturando áudio do sistema com outro aplicativo macOS como o Soundflower e passando-o através de um dispositivo de entrada de áudio virtual. Este dispositivo virtual pode então ser consultado com `navigator.mediaDevices.getUserMedia`.

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-windows-macos
