# Variabili di ambiente

> Controllo della configurazione applicativa e comportamentali senza cambiare codice.

Alcuni comportamenti di Electron sono controllati da variabili d'ambiente perché sono inizializzati prima dei parametri a riga di comando e del codice dell'app.

Esempio shell POSIX:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Esempio Windows console:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## Variabili di produzione

Le seguenti variabili d'ambiente sono principalmente destinate per l'uso a runtime in un'applicazione Electron pacchettizzata.

### `NODE_OPTIONS`

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

Esempio:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Unsupported options are:

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` are explicitly disallowed in packaged apps, except for the following:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'LA_TUA_CHIAVE_QUI'
```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). Di default, una nuova chiave Google API è generata ma potrebbe non esserle concesso l'esecuzione di richieste di geocodifica. Per abilitare le richieste di geocodifica, visita [questa pagina](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Esegue il processo come un normale processo Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

Non collega l'attuale sessione console.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

Non usa la barra del menu globale su Linux.

### `ELECTRON_TRASH` _Linux_

Set the trash implementation on Linux. Default is `gio`.

Opzioni:
* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Variabili di sviluppo

Le seguenti variabili d'ambiente sono principalmente destinate per scopi di sviluppo e debugging.


### `ELECTRON_ENABLE_LOGGING`

Stampa il logging interno di Chrome nella console.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Stampa lo stack trace nella console quando Electron crasha.

Questa variabile d'ambiente non funzionerà se il `crashReporter` è avviato.

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Mostra la finestra di crash di Windows quando Electron crasha.

Questa variabile d'ambiente non funzionerà se il `crashReporter` è avviato.

### `ELECTRON_OVERRIDE_DIST_PATH`

Durante l'esecuzione dal pacchetto `electron`, questa variabile indica al comando `electron` di usare la build Electron specificata invece di quella scaricata tramite `npm install`. Uso:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```
