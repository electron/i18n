# Renderização fora da tela

## Visão Geral

A renderização offscreen permite obter o conteúdo de um `BrowserWindow` em um bitmap , para que possa ser renderizado em qualquer lugar, por exemplo, em textura em uma cena 3D. A renderização offscreen em Electron usa uma abordagem semelhante à do projeto [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) .

notas **:

* Existem dois modos de renderização que podem ser usados (veja a seção abaixo) e apenas a área suja é passada para o `paint` evento para ser mais eficiente.
* Você pode parar/continuar a renderização, bem como definir a taxa de quadros.
* A taxa máxima de quadros é de 240 porque valores maiores trazem apenas desempenho perdas sem benefícios.
* Quando nada está acontecendo em uma página web, nenhum quadro é gerado.
* Uma janela offscreen é sempre criada como uma janela sem moldura [](../api/frameless-window.md).

### Modos de Renderização

#### Aceleração da GPU

Renderização acelerada pela GPU significa que a GPU é usada para composição. Por causa de isso, o quadro tem que ser copiado da GPU que requer mais recursos, assim este modo é mais lento que o dispositivo de saída de software. O benefício deste modo é que as animações CSS WebGL e 3D são suportadas.

#### Dispositivo de saída

Este modo usa um dispositivo de saída de software para renderização na CPU, de modo que o quadro geração é muito mais rápido. Como resultado, este modo é preferido em vez da GPU acelerada.

Para habilitar esse modo, a aceleração da GPU deve ser desativada chamando a [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Exemplo

Começando com um aplicativo de trabalho do [Guia de início rápido](quick-start.md), adicione as seguintes linhas ao arquivo `main.js`:

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
const { app, BrowserWindow } = require ('electron')
const fs = require('fs')

app.desabilitar o HardwareAcceleration()

deixar ganhar

app.whenReady().then(() =>

  {
  win = novo BrowserWindow({ webPreferências: { offscreen: true } })  win.loadURL ('https://github.com')
  win.webContents.on('paint', (evento, sujo, imagem) => {
    fs.writeFileSync ('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
})
```

Depois de iniciar o aplicativo Electron, navegue até a pasta de trabalho do seu aplicativo.

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
