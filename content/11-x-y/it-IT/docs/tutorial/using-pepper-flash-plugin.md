# Uso del plugin Flash Pepper

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Prepara una copia del Plugin Flash

Su macOS e Linux, i dettagli del plugin Pepper Flash possono essere trovati navigando a `chrome://version` nel browser Chrome. La sua posizione e versione sono utili per il supporto di Flash Pepper in Electron. È anche possibile copiarlo in un'altra posizione.

## Aggiungere uno Switch Electron

È possibile aggiungere direttamente `--ppapi-flash-path` e `--ppapi-flash-version` alla riga di comando per eseguire Electron oppure utilizzando il metodo `app.commandLine.appendSwitch` prima dell'evento ready di *app*. Inoltre, attiva l'opzione `plugin` di `BrowserWindow`.

Ad esempio:

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Specifica percorso flash, supponendo che sia posizionato nella stessa directory con main. s.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer. ll'
    break
  caso 'darwin':
    pluginName = 'PepperFlashPlayer. lugin'
    pausa
  caso 'linux':
    pluginName = 'libpepflashplayer. o'
    pausa
}
app. ommandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Opzionale: Specifica la versione flash, per esempio, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.whenReady(). hen(() => {
  const win = new BrowserWindow({
    width: 800,
    altezza: 600,
    webPreferenze: {
      plugins: true
    }
  })
  vince. oadURL(`file://${__dirname}/index.html`)
  // Qualcosa altro
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

Per alcune operazioni, come streaming media che usano RTMP, è necessario garantire tutti i permessi ai lettori di file `.swf`. Un modo per farlo è usare [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
