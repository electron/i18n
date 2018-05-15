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

Puoi anche provare a caricare il sistema tramite il plugin Pepper Flash invece di attivarli da te, il suo percorso può essere ricevuto chiamando `app.getPath('pepperFlashSystemPlugin')`.

## Abilita Flash Plugin in un `<webview>`Tag</0>

Aggiungi l'attributo `plugins` al tag `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Risoluzione dei problemi

Puoi controllare se il plugin Pepper Flash è stato caricato ispezionando `navigator.plugins` nella console degli strumenti dispositivo (anche se non puoi sapere se il percorso del plugin sia corretto).

L'architettura del plugin Pepper Flash deve corrispondere con quella di Electron. Su Windows, un errore comune è di usare la versione 32bit del plugin Flash contro la versione 64bit di Electron.

Su Windows il percorso passato a `--ppapi-flash-path` deve usare `` come delimitatore di percorso, usando percorsi POSIX-style non funzionerà.

Per alcune operazioni, come streaming media usando RTMP, è necessario garantire tutti i permessi ai lettori di file `.swf`. Un metodo per permetterlo è di usare [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).