# Uso del plugin Flash Pepper

Electron supporta il plugin Flash Pepper. Per utilizzare il plugin Flash Pepper in Electron, dovresti specificare manualmente la posizione del plugin Flash Pepper e poi abilitarlo nella tua applicazione.

## Prepara una copia del Plugin Flash

Su macOS e Linux, i dettagli del plugin Flash Pepper possono essere trovati navigando a `chrome://plugins` nel browser Chrome. La sua posizione e versione sono utili per il supporto di Flash Pepper in Electron. È anche possibile copiarlo in un'altra posizione.

## Aggiungere uno Switch Electron

È possibile aggiungere direttamente `-ppapi-flash-percorso` e `-ppapi-flash-versione` alla riga di comando per eseguire Electron oppure utilizzando il metodo `app.commandLine.appendSwitch` prima dell'evento *app ready*. Inoltre, attiva l'opzione `plugin` di `BrowserWindow`.

Ad esempio:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
/ / Specifica il percorso al plugin flash, supponendo che sia collocato nella stessa directory di main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  // Something else
})
```

You can also try loading the system wide Pepper Flash plugin instead of shipping the plugins yourself, its path can be received by calling `app.getPath('pepperFlashSystemPlugin')`.

## Attiva il Plugin Flash in un Tag `<webview>`

Aggiungi l'attributo `plugins` al tag `<webview>`.

```html
<webview src="http://www.adobe.com/software/flash/about/" plugins></webview>
```

## Risoluzione dei problemi

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `` as path delimiter, using POSIX-style paths will not work.

For some operations, such as streaming media using RTMP, it is necessary to grant wider permissions to players’ `.swf` files. One way of accomplishing this, is to use [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).