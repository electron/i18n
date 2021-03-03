# Renderização fora da tela

Renderização fora da tela permite obter o conteúdo de uma janela do navegador em um bitmap, para que possa ser processado em qualquer lugar, por exemplo, em uma textura em uma cena 3D. A renderização offscreen no Electron usa uma abordagem semelhante ao projeto [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

Dois modos de renderização podem ser usados, e somente a área suja é passada no evento `'pinta'` para ser mais eficiente. A renderização pode ser interrompida, continuando e a taxa de quadros pode ser definida. A taxa de quadros especificada é um valor limite superior, quando nada acontecer em uma página da Web, não há quadros gerados. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Nota:** Uma janela fora da tela é sempre criada como uma [Janela sem frames](../api/frameless-window.md).

## Modos de Renderização

### Aceleração da GPU

Renderização acelerada pela GPU significa que a GPU é usada para composição. Por causa de que o frame deve ser copiado da GPU que requer mais desempenho, então esse modo é um pouco mais lento do que o outro. O benefício deste modo é que as animações CSS WebGL e 3D são suportadas.

### Dispositivo de saída

Este modo utiliza um dispositivo de saída de software para renderizar no CPU, então a geração do frame é muito mais rápida, Assim, este modo é preferido sobre a GPU acelerada um.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Usando

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
