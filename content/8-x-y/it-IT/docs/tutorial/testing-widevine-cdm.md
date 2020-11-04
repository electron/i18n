# Test del Widevine CDM

In Electron è possibile utilizzare la libreria Widevine CDM fornito con browser Chrome.

I moduli di decodifica dei contenuti di Widevine (CDM) sono il modo in cui i servizi di streaming proteggono i contenuti utilizzando video HTML5 su browser web senza fare affidamento su un plugin NPAPI come Flash o Silverlight. Il supporto Widevine è una soluzione alternativa per i servizi di streaming che attualmente si basano su Silverlight per la riproduzione di contenuti video protetti da DRM. Permetterà ai siti web di mostrare contenuti video protetti da DRM in Firefox senza l'uso di plugin NPAPI. Il CDM Widevine viene eseguito in un sandbox CDM open-source che fornisce una migliore sicurezza dell'utente rispetto ai plugin NPAPI.

#### Nota sul VMP

A partire da [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), i passaggi seguenti possono essere solo alcuni dei passi necessari per abilitare Widevine; qualsiasi app su o dopo quella versione che intende utilizzare il CDM Widevine potrebbe aver bisogno di firmare utilizzando una licenza ottenuta da [Widevine](https://www.widevine.com/) stessa.

Per [Widevine](https://www.widevine.com/):

> Chrome 59 (e successivamente) include il supporto per il percorso dei media verificato (VMP). VMP fornisce un metodo per verificare l'autenticità di una piattaforma dispositivo. Per le distribuzioni del browser , questo fornirà un segnale aggiuntivo per determinare se un'implementazione basata sul browser è affidabile e sicura.
> 
> La guida per l'integrazione del proxy è stata aggiornata con informazioni su VMP e su come emettere licenze.
> 
> Widevine consiglia le nostre integrazioni basate su browser (fornitori e applicazioni basate sul browser) aggiungere il supporto per VMP.

Per abilitare la riproduzione video con questa nuova restrizione, [castLabs](https://castlabs.com/open-source/downstream/) ha creato un [fork](https://github.com/castlabs/electron-releases) che ha implementato le modifiche necessarie per consentire a Widevine di essere riprodotto in un'applicazione Electron se uno ha ottenuto le licenze necessarie da widevine.

## Ottenere la biblioteca

Apri `chrome://components/` nel browser Chrome, trova `Modulo di Decifrazione Contenuti Widevine` e assicurati che sia aggiornato, poi è possibile trovare i file di libreria dalla directory applicazione.

### Su Windows

Il file della libreria `widevinecdm.dll` sarà sotto `File del programma(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86<unk> x64)/` directory.

### On MacOS

Il file di libreria `libwidevinecdm.dylib` sarà nella directory `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86<unk> x64)/` .

**Nota:** Assicurati che la versione cromata utilizzata da Electron sia maggiore o uguale a del valore `min_chrome_version` del componente widevine cdm di Chrome. Il valore può essere trovato in `manifest.json` sotto la directory `WidevineCdm`.

## Usare la libreria

Dopo aver ottenuto i file della libreria, dovresti passare il percorso al file con l'interruttore a riga di comando `--widevine-cdm-path` , e la versione della libreria con `--widevine-cdm-version` switch. Gli switch a riga di comando devono essere passati prima che l'evento `pronto` di `app` del modulo venga emesso.

Codice di esempio:

```javascript
const { app, BrowserWindow } = require('electron')

// Devi passare la directory che contiene la libreria widevine qui, è
// * `libwidevinecdm. ylib` su macOS,
// * `widevinecdm.dll` su Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// La versione del plugin può essere ottenuta dalla pagina `chrome://components` in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Verifica supporto CDM Widevine

Per verificare se widevine funziona, è possibile utilizzare i seguenti modi:

* Apri https://shaka-player-demo.appspot.com/ e carica un manifesto che usi `Widevine`.
* Apri http://www.dash-player.com/demo/drm-test-area/, controlla se la pagina dice `bitdash usa Widevine nel tuo browser`, poi riproduci il video.
