# Renderización fuera de pantalla

La renderización fuera de pantalla le permite obtener el contenido de una ventana del navegador en un mapa de bits, por lo que se puede renderizar en cualquier lugar, por ejemplo, en una textura en una escena 3D. La renderización fuera de pantalla en Electron utiliza un enfoque similar al del proyecto [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

Se pueden usar dos modos de renderización y solo se pasa el área sucia en el evento `"pintar"` para que sea más eficiente. La renderización se puede detener, continuar y se puede establecer la velocidad de cuadros. La velocidad de fotogramas especificada es un valor límite superior, cuando no ocurre nada en una página web, no se generan marcos. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Nota:** siempre se crea una ventana fuera de pantalla como [Frameless Window](../api/frameless-window.md).

## Modos de renderizado

### GPU acelerado

La renderización acelerada por GPU significa que la GPU se usa para la composición. Debido a eso, el cuadro debe copiarse de la GPU, que requiere más rendimiento, por lo que este modo es bastante más lento que el otro. El beneficio de este modo es que las animaciones WebGL y 3D CSS son compatibles.

### Dispositivo de salida de software

Este modo utiliza un dispositivo de salida de software para la renderización en la CPU, por lo que la generación de cuadros es mucho más rápida, por lo tanto, este modo es preferible a la GPU acelerada.

Para habilitar este modo, la aceleración de la GPU debe desactivarse llamando la API [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration).

## Uso

```javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.once('ready', () => {
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