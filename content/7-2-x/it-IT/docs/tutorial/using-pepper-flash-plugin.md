# Uso del plugin Flash Pepper

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Prepara una copia del Plugin Flash

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. La sua posizione e versione sono utili per il supporto di Flash Pepper in Electron. È anche possibile copiarlo in un'altra posizione.

## Aggiungere uno Switch Electron

È possibile aggiungere direttamente `-ppapi-flash-percorso` e `-ppapi-flash-versione` alla riga di comando per eseguire Electron oppure utilizzando il metodo `app.commandLine.appendSwitch` prima dell'evento *app ready*. Inoltre, attiva l'opzione `plugin` di `BrowserWindow`.

Ad esempio:

```javascript
const { app, BrowserWindow } = require('electron')
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

Puoi anche provare a caricare il sistema tramite il plugin Pepper Flash invece di attivarli da te, il suo percorso può essere ricevuto chiamando `app.getPath('pepperFlashSystemPlugin')`.

## Abilita Flash Plugin in un `<webview>`Tag</0>

Aggiungi l'attributo `plugins` al tag `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Risoluzione dei problemi

Puoi controllare se il plugin Pepper Flash è stato caricato ispezionando `navigator.plugins` nella console degli strumenti dispositivo (anche se non puoi sapere se il percorso del plugin sia corretto).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Per alcune operazioni, come streaming media usando RTMP, è necessario garantire tutti i permessi ai lettori di file `.swf`. Un metodo per permetterlo è di usare [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
