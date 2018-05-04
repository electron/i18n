# Uso del plugin Widevine CDM

In Electron puoi usare il plugin Widevine CDM compreso nel browser Chrome.

## Ottenere il plugin

Electron non collabora con il plugin Widevine CDM per motivi di licenza, per ottenerlo, devi installare prima il browser ufficiale di Chrome, la cui architettura dovrebbe corrispondere e la versione di Chrome della build in uso di Electron.

**Nota:** La maggiore versione del browser di Chrome deve essere uguale alla versione di Chrome usata da Electron, altrimenti il plugin non funzionerà nonostante `navigator.plugins` mostri che sia stato caricato.

### Windows & macOS

Apri nel browser di Chrome `chrome://components/`, trova `WidevineCdm` ed assicurati che corrispondano, puoi potrai trovare tutti i binari dei plugin dalla directory `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/`.

`APP_DATA` è la posizione di sistema per archiviare i dati app, su Windows è `%LOCALAPPDATA%`, su macOS è `~/Library/Application Support`. `VERSIONE` è la stringa della versione del plugin Widevine CDM, come `1.4.8.866`. `PIATTAFORMA` è `mac` o `win`. `ARCH` è `x86` o `64`.

Su Windows, i binari richiesti sono ``widevinecdm.dll</code> e `widevinecdmadapter.dll`, su macOS sono `libwidevinecdm.dylib` e `widevinecdmadapter.plugin</0>. Puoi copiarli ovunque tu voglia, ma devono rimanere insieme.</p>

<h3>Linux</h3>

<p>Su Linux i binari plugin sono compresi con il browser di Chrome, puoi trovarli sotto <code>/opt/google/chrome`, i nomi dei file sono `libwidevinecdm.so` e `libwidevinecdmadapter.so`.

## Usare il plugin

Dopo aver ottenuto i file del plugin, potresti passare il percorso `widevinecdmadapter` ad Electron cambiando la linea di comando con `--widevine-cdm-path`, e la versione del plugin con `--widevine-cdm-version`.

**Note:** Sapendo che solo il binario `widevinecdmadapter` è passato ad Electron, il binario `widevinecdm` deve essergli messo a lato.

La modifica della linea di comando deve passare prima dell'evento `pronto` del modulo emesso dell'`app` e la pagina che usa questo plugin deve avere i plugin abilitati.

Codice di esempio:

```javascript
const {app, BrowserWindow} = require('electron')

// You have to pass the filename of `widevinecdmadapter` here, it is
// * `widevinecdmadapter.plugin` on macOS,
// * `libwidevinecdmadapter.so` on Linux,
// * `widevinecdmadapter.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// La versione del plugin può venire dalla pagina `chrome://plugins` di Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // I plugin devono essere abilitati.
      plugins: true
    }
  })
  win.show()
})
```

## Verificare il plugin

Per verificare che il plugin funzioni, puoi usare i seguenti metodi:

* Apri gli strumenti dispositivo e controlla se `navigator.plugin` include il plugin Widevine CDM.
* Apri https://shaka-player-demo.appspot.com/ e carica un manifesto che usi `Widevine`.
* Apri http://www.dash-player.com/demo/drm-test-area/, controlla se la pagina dice `bitdash usa Widevine nel tuo browser`, poi riproduci il video.