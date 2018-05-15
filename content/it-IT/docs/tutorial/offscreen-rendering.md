# Rendering Offscreen

Il rendering fuori schermo permette di ottenere il contenuto di una finestra browser in bitmap, per poterlo renderizzare ovunque, ad esempio su una texture in una scena 3D. Il rendering fuori schermo in Electron usa un approccio simile al progetto Chromium Embedded Framework<0>.</p> 

Due metodi di rendering possono essere usati e solo l'area sporca è passata nell'evento `'disegna'` per essere più efficiente. Il rendering può essere fermato, continuato e il frame rate è impostabile. Il frame rate specificato è un valore limite massimo quando non succede nulla su una pagina web, nessun fram è generato. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Nota:** Una finestra fuori schermo è sempre creata come [Finestra Senza Frame](../api/frameless-window.md).

## Modalità di Rendering

### GPU accelerata

Il rendering della GPU accelerata indica che la GPU è usata per composizione. Dovendo il frame essere copiato dalla GPU che richiede più performance, quindi questa modalità è un poco più lenta dell'altra. Il beneficio di questa modalità è che WebGL e 3D CSS sono supportate.

### Dispositivo di output software

Questa modalità usa un dispositivo di output software per renderizzare nella CPU, quindi la generazione dei frame è più veloce, quindi questa modalità è preferita a quella della GPU accelerata.

Per abilitate questa modalità, l'accelerazione GPU deve essere disabilitata chiamando l'API [`app.disabilitaAccelerazioneHardware()`](../api/app.md#appdisablehardwareacceleration).

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