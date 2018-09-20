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

### `GOOGLE_API_KEY`

Electron include delle chiavi API hardcoded per fare richieste al webservice di geolocalizzazione di Google. Poichè questa chiave API key è inclusa in ogni versione di Electron, spesso si eccedono i limiti di quota. Per risolvere questo problema, puoi fornire la tua chiave Google API nell'ambiente. Metti la seguenti riga di codice nel tuo file per il processo principale, prima di aprire qualsiasi finestra browser che farà richieste di geocodifica:

```javascript
process.env.GOOGLE_API_KEY = 'LA_TUA_CHIAVE_QUI'
```

Per le istruzione su come ottenere una chiave Google API, visita [questa pagina](https://www.chromium.org/developers/how-tos/api-keys).

Di default, una nuova chiave Google API è generata ma potrebbe non esserle concesso l'esecuzione di richieste di geocodifica. Per abilitare le richieste di geocodifica, visita [questa pagina](https://console.developers.google.com/apis/api/geolocation/overview).

### `ELECTRON_NO_ASAR`

Disabilita il supporto ASAR. Questa variabile è supportata solo in processi figli e relativi processi generati che hanno impostato `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Esegue il processo come un normale processo Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Non collega l'attuale sessione console.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Non usa la barra del menu globale su Linux.

## Variabili di sviluppo

Le seguenti variabili d'ambiente sono principalmente destinate per scopi di sviluppo e debugging.

### `ELECTRON_ENABLE_LOGGING`

Stampa il logging interno di Chrome nella console.

### `ELECTRON_LOG_ASAR_READS`

Quando Electron legge da un file ASAR, registra la posizione letta e il percorso del file nella `tmpdir` di sistema. Il file risultate può essere fornito al modulo ASAR per ottimizzare l'ordinamento del file.

### `ELECTRON_ENABLE_STACK_DUMPING`

Stampa lo stack trace nella console quando Electron crasha.

Questa variabile d'ambiente non funzionerà se il `crashReporter` è avviato.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Mostra la finestra di crash di Windows quando Electron crasha.

Questa variabile d'ambiente non funzionerà se il `crashReporter` è avviato.

### `ELECTRON_OVERRIDE_DIST_PATH`

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Usage:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/D
```