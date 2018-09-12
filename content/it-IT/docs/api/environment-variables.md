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

The following environment variables are intended primarily for use at runtime in packaged Electron applications.

### `GOOGLE_API_KEY`

Electron includes a hardcoded API key for making requests to Google's geocoding webservice. Because this API key is included in every version of Electron, it often exceeds its usage quota. To work around this, you can supply your own Google API key in the environment. Place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

For instructions on how to acquire a Google API key, visit [this page](https://www.chromium.org/developers/how-tos/api-keys).

By default, a newly generated Google API key may not be allowed to make geocoding requests. To enable geocoding requests, visit [this page](https://console.developers.google.com/apis/api/geolocation/overview).

### `ELECTRON_NO_ASAR`

Disabilita il supporto ASAR. Questa variabile è supportata solo in processi figli e relativi processi generati che hanno impostato `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Esegue il processo come un normale processo Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Non collega l'attuale sessione console.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Non usa la barra del menu globale su Linux.

## Development Variables

The following environment variables are intended primarily for development and debugging purposes.

### `ELECTRON_ENABLE_LOGGING`

Prints Chrome's internal logging to the console.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.