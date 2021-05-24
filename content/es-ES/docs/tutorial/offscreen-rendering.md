# Renderización fuera de pantalla

## Descripción general

Offscreen rendering te permite obtener el contenido de un `BrowserWindow` en un bitmap, así puede renderizarlo en cualquier lugar, por ejemplo, en una textura de una escena 3D. El offscreen rendering en Electron utiliza un enfoque similar al del proyecto [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

*Notas*:

* Hay dos modos de rendering que puede ser usados (vea la sección de abajo) y solo la área sucia se pasa al evento `paint` para ser más eficiente.
* Usted puede parar/continuar el renderizado así como también ajustar la velocidad de frame.
* La tasa máxima de fotograma es 240 porque valores mayores solo traen pérdidas de rendimiento sin beneficios.
* Cuando nada esta sucediendo en un pagina web, no se generan frames.
* Un offscreen window siempre es creado como [Frameless Window](../api/frameless-window.md).

### Modos de renderizado

#### GPU acelerado

La renderización acelerada por GPU significa que la GPU se usa para la composición. Por eso, el frame ha de ser copiado desde la GPU lo cual requiere mas recursos, por lo tanto este modo es mas lento que el dispositivo de salida de Software. El beneficio de este modo es que las animaciones WebGL y 3D CSS son compatibles.

#### Dispositivo de salida de software

Este modo usa un dispositivo de salida por Software para renderizar en la CPU, asi que la generación del frame es mucho más rápida. Como resultado, este modo es preferido sobre el GPU acelerado.

Para habilitar este modo, la aceleración de la GPU ha de ser deshabilitada llamando a la API [`app.disableHardwareAcceleration()`][disablehardwareacceleration].

## Ejemplo

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
  win = new BrowserWindow({ webPreferences: { offscreen: true } })

  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    fs.writeFileSync('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
})
```

After launching the Electron application, navigate to your application's working folder, where you'll find the rendered image.

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
