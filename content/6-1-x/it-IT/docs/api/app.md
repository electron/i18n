# app

> Controlla il ciclo di vita degli eventi della tua applicazione.

Processo: [Main](../glossary.md#main-process)

I seguenti esempi mostrano come uscire dall'applicazione quando l'ultima finestra è chiusa:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Eventi

L'oggetto `app` emette i seguenti eventi:

### Evento: 'will-finish-launching'

Emesso quando l'app ha finito l'avvio di base. Su Windows e Linux, l'evento `will-finish-launching` equivale all'evento `ready`; su macOS questo evento rappresenta la notifica `applicationWillFinishLaunching` di `NSApplication`. Potresti necessitare spesso di definire ascoltatori (listener) per gli eventi `open-file` e `open-url` ed avviare il reporter dei crash e l'aggiornamento automatico.

Nella maggior parte dei casi, tu farai ogni cosa nel gestore degli eventi `ready`.

### Evento: 'ready'

Restituisce:

* `launchInfo` Object _macOS_

Emesso quando Electron ha concluso l'inizializzazione. Su macOS `launchInfo` detiene le `userInfo` della `NSUserNotification` usata per aprire l'applicazione, se lanciata dal Centro Notifiche. Puoi chiamare `app.isReady()` per controllare se gli eventi sono già stati generati.

### Evento: 'window-all-closed'

Emesso quando tutte le finestre sono state chiuse.

Se l'evento non viene gestito e tutte le finestre vengono chiuse, il comportamento predefinito è l'uscita dall'applicazione; però, se gestito, è possibile controllare il caso in cui l'applicazione deve uscire o meno. Se l'utente ha premuto `Cmd + Q` o lo sviluppatore ha invocato `app.quit()`, Electron proverà prima a chiudere tutte le finestre e poi emetterà l'evento `will-quit` e in questo caso l'evento `window-all-closed` non sarà emesso.

### Evento: 'before-quit'

Restituisce:

* `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Nota:** In Windows, questo evento non verrà emesso se l'applicazione viene chiusa a causa di a un arresto/riavvio del sistema oppure del logout da parte dell'utente.

### Evento: 'will-quit'

Restituisce:

* `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Vedi la descrizione dell'evento `window-all-closed` per le differenze tra gli eventi `will-quit` e `window-all-closed`.

**Nota:** In Windows, questo evento non verrà emesso se l'applicazione viene chiusa a causa di a un arresto/riavvio del sistema oppure del logout da parte dell'utente.

### Evento: 'quit'

Restituisce:

* `event` Event
* `codiceUscita` Integer

Emesso quando l'applicazione è in uscita.

**Nota:** In Windows, questo evento non verrà emesso se l'applicazione viene chiusa a causa di a un arresto/riavvio del sistema oppure del logout da parte dell'utente.

### Evento: 'open-file' _macOS_

Restituisce:

* `event` Event
* `path` String

Emesso quando l'utente vuole aprire un file con l'app. L'evento `open-file` è in genere emesso quando l'applicazione è già aperta e l'S.O. vuole riutilizzarla per aprire il file. `open-file` è anche emesso quando un file è rilasciato nel dock e l'applicazione non è ancora in esecuzione. E' necessario assicurarsi di ascoltare l'evento `open-file` molto presto all'avvio della tua app per gestire questo caso (anche prima dell'emissione dell'evento `ready`).

Dovresti chiamare `event.preventDefault()` se vuoi gestire questo evento.

Su Windows, devi analizzare `process.argv` (nel processo principale) per ottenere il percorso del file.

### Evento: 'open-url' _macOS_

Restituisce:

* `event` Event
* `url` Stringa

Emesso quando l'utente vuole aprire un URL con l'l'applicazione. Il file `Info.plist` della tua applicazione deve definire lo schema URL compreso della chiave `CFBundleURLTypes` ed impostare `NSPrincipalClass` ad `AtomApplication`.

Dovresti chiamare `event.preventDefault()` se vuoi gestire questo evento.

### Evento: 'activate' _macOS_

Restituisce:

* `event` Event
* `hasVisibleWindows` Boolean

Emesso quando l'applicazione è attivata. Varie azioni possono generare questo evento, come il lancio dell'applicazione per la prima volta, provare a rilanciarla quando è già aperta o cliccare sul dock dell'applicazione o sull'icona della taskbar.

### Evento: 'continue-activity' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contiene stati specifici dell'applicazione immagazzinati per attività su un altro dispositivo.

Emesso durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quando un'attività da un altro dispositivo vuole essere ripristinata. Dovresti chiamare `event.preventDefault()` se vuoi gestire questo evento.

Un'attività dell'utente può essere continuata solo in un app con lo stesso developer Team ID come l'attività dell'app di riferimento e che supporti il tipo di attività. I tipi di attività supportati sono specificati nell'`Info.plist` dell'applicazione sotto la chiave `NSUserActivityTypes`.

### Evento: 'will-continue-activity' _macOS_

Restituisce:

* `event` Event
* `type` Stringa - Una stringa che identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emesso durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), prima che un'attività da un dispositivo differente richieda di essere ripristinata. Se vuoi gestire questo evento dovresti chiamare `event.preventDefault()`.

### Evento: 'continue-activity-error' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Una stringa contenente la descrizione localizzata dell'errore.

Emesso durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quando un'attività da un dispositivo diverso fallisce nel ripristino.

### Evento: 'activity-was-continued' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `Infoutente` Object - Contiene uno stato specifico per l'app archiviato dall'attività.

Emesso durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) dopo che un'attività da questo dispositivo è stata ripristinata con successo su un altro.

### Evento: 'update-activity-state' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `Infoutente` Object - Contiene uno stato specifico per l'app archiviato dall'attività.

Emesso quando [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sta per essere ripristinato su un altro dispositivo. Se necessiti di aggiornare lo stato da trasferire, devi chiamare subito `event.preventDefault()`, costruisci un nuovo dizionario `userInfo` e chiama tempestivamente `app.updateCurrentActiviy()`. Altrimenti l'operazione fallirà e verrà chiamato `continue-activity-error`.

### Evento: 'nuova-finestra-per-scheda' _macOS_

Restituisce:

* `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Evento: 'browser-window-blur'

Restituisce:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emesso quando una [Finestrabrowser](browser-window.md) è sfocata.

### Evento: 'browser-window-focus'

Restituisce:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emesso quando una [Finestrabrowser](browser-window.md) è focalizzata.

### Evento: 'browser-window-created'

Restituisce:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emesso quando una [Finestrabrowser](browser-window.md) è creata.

### Evento: 'web-contents-created'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Emesso quando un nuovo [ContenutoWeb](web-contents.md) è creato.

### Evento: 'certificate-error'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `url` String
* `error` String - Il codice d'errore
* `certificate` [Certificato](structures/certificate.md)
* `callback` Funzione
  * `isTrusted` Boolean - Se considerare il certificato come verificato

Emesso quando fallisce la verifica del`certificato` per`url`, per verificare il certificato puoi prevenire il comportamento predefinito con `evento.previeniDefault()` e chiamare `callback(vero)`.

```javascript
const { app } = richiedi('electron')


app.on ('certificate-error', (event, webContents, url, error, certificate, callback) => {
  se (url === 'https://github.com') {
      // Logica di verifica.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Evento: 'select-client-certificate'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Funzione
  * `certificate` [Certificate](structures/certificate.md) (opzionale)

Emesso quando un certificato client è richiesto.

L'`url` corrisponde alla voce di navigazione richiedente il certificato client e `callback` può essere chiamato con una voce filtrata dalla lista. Usando `evento.previeniDefault()` si previene che l'app usi il primo certificato dal magazzino.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Evento: 'login'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `request` Object
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Funzione
  * `username` String
  * `password` String

Emesso quando i `Contenutiweb` vogliono fare un'autenticazione base.

Il comportamento standard è di cancellare tutte le autenticazioni. Per modificarlo dovresti impedire il comportamento standard con `event.preventDefault()` e chiamare `callback(username, password)` con le credenziali.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Evento: 'gpu-process-crashed'

Restituisce:

* `event` Event
* `killed` Boolean

Emesso quando i processi gpu crashano o soni uccisi.

### Event: 'renderer-process-crashed'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `ucciso` Booleano

Emitted when the renderer process of `webContents` crashes or is killed.

### Evento: 'accessibilità-supporto-cambiata' _macOS_ _Windows_

Restituisce:

* `event` Event
* `SupportoAccessibilitàAbilitato` Booleano - `true` quando il supporto all'accessibilità a Chrome è abilitato, `false` altrimenti.

Emesso quando cambia il supporto accessibilità di Chrome. Questo evento avviene quando le tecnologie d'assistenza, come lettore schermo, sono abilitate o disabilitate. Vedi https://www.chromium.org/developers/design-documents/accessibility per altri dettagli.

### Evento: 'session-created'

Restituisce:

* `session` [Session](session.md)

Emesso quando Electron ha creato una nuova `sessione`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Evento: 'second-instance'

Restituisce:

* `event` Event
* `argv` Stringa[] - Un insieme della linea di comando d'argomento della seconda istanza
* `Directoryfunzionante` Stringa - La directory funzionante della seconda istanza

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Di solito le app rispondono a questo focalizzando la loro finestra primaria e non minimizzata.

Questo evento è garantito per essere emesso dopo che l'evento `ready` di `app` viene emesso.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-global'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-builtin'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-window'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

## Metodi

L'oggetto `app` ha i seguenti metodi:

**Nota:** Alcuni metodi sono disponibili solo su sistemi operativi specifici e sono etichettati come tali.

### `app.esci()`

Prova a chiudere tutte le finestre. L'evento `esci-prima` sarà emesso prima. Se tutte le finestre sono chiuse con successo, l'evento `uscirà` sarà emesso e di default l'app sarà terminata.

Questo metodo garantisce che tutti i `precaricati` e `caricati` eventi gestionali siano correttamente eseguiti. È possibile che una finestra annulli l'uscita tornando `false` nell'evento gestionale `precaricato`.

### `app.esci([exitCode])`

* `Codiceuscita` Numero Intero (opzionale)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.rilancio([options])`

* `options` Object (optional)
  * `args` String[] (opzionale)
  * `eseguiPercorso` Stringa (opzionale)

Rilancia l'app quando esiste la corrente istanza.

By default, the new instance will use the same working directory and command line arguments with current instance. Quando l'`arg` è specificato, l'`arg` sarà invece passato come argomento di linea di comando. Quando `eseguiPercorso` è specificato, `eseguiPercorso` sarà eseguito per rilanciare, invece, l'app corrente.

Nota che questo metodo non termina l'app quando eseguito, devi chiamare `app.esci` o `app.uscita` dopo aver chiamato `app.rilancia` per riavviare l'app.

Quando `app.rilancia` è chiamato ripetutamente, le istanze multiple sarannò avviate dopo l'istanza corrente sia uscita.

Un esempio di riavvio dell'istanza corrente immediato e aggiungendo un nuovo argomento della linea di comando alla nuova istanza:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isPronta()`

Restituisce `Booleano` - `true` se Electron ha finito l'inizializzazione, `falso` viceversa.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. Può essere usata come alternativa conveniente per controllare `app.isReady()` e sottoscrivendo all'evento `ready` se l'applicazione non è ancora pronta.

### `app.focalizza()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.nascondi()` _macOS_

Nasconde tutte le finestre dell'applicazione senza minimizzarle.

### `app.mostra()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.ottieniAppPercorso()`

Restituisce `Stringa` - La directory dell'app corrente.

### `app.ottieniPercorso(nome)`

* `name` Stringa

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

Puoi richiedere i seguenti percorsi dal nome:

* `home` Directory della home utente.
* `appData` Per-user application data directory, which by default points to:
  * `%APPDATA%` su Windows
  * `$XDG_CONFIG_HOME` o `~/.config` su Linux
  * `~/Libraria/Supporto Applicazione` su macOS
* `Datiutente` La directory per ammagazzinare i file di configurazione della tua app, che per valore predefinito è la directory `Datiapp` seguita dal nome della tua app.
* `temp` Directory temporanea.
* `exe` L'attuale file eseguibile.
* `modulo` La libreria `libchromiumcontent`.
* `desktop` L'attuale directory del desktop utente.
* `documenti` La directory per l'utente "I miei Documenti".
* `Scaricati` La directory per i file scaricati dall'utente.
* `musica` La directory per la musica dell'utente.
* `immagini` La directory per le immagini dell'utente.
* `video` La directory per i video dell'utente.
* `logs` La directory per la cartella registro della tua app.
* `pepperFlashSystemPlugin` Percorso completo alla versione di sistema del plugin Pepper Flash.

### `app.ottieniIconaFile(percorso[, opxioni], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `piccola` - 16x16
    * `normale` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` Funzione
  * `errore` Errore
  * `icona` [ImmagineNativa](native-image.md)

Recupera un'icona associata al percorso.

On _Windows_, there are 2 kinds of icons:

* Icone associate con certe estensioni di file come `.mp3`, `.png`, etc.
* Icone interne allo stesso file come `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

**[Deprecated Soon](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `piccola` - 16x16
    * `normale` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Recupera un'icona associata al percorso.

Su _Windows_ esistono 2 tipi di icone:

* Icone associate con certe estensioni di file come `.mp3`, `.png`, etc.
* Icone interne allo stesso file come `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.impostaPercorso(nome, percorso)`

* `name` Stringa
* `path` String

Sostituisce il `percorso` ad una directory speciale o ad un file associato con `nome`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

Si possono sostituire solo i percorsi di un `nome` definiti in `app.ottieniPercorso`.

Di default, i cookie e la cache delle pagine web saranno immagazzinate sotto la directory `Datiutente`. Se vuoi cambiare questa posizione devi sostituire al percorso `Datiutente` prima che l'evento `pronto` del modulo `app` venga emesso.

### `app.ottieniVersione()`

Restituisce `Stringa` - La versione dell'app caricata. Se non viene trovata nessuna versione nel file dell'app `pacchetto-json`, la versione dell'attuale pacchetto o eseguibile è restituita.

### `app.ottieniNome()`

Restituisce `Stringa`. Il nome attuale dell'app, che è il nome nel file dell'app `package.json`.

Spesso il campo `nome` del `package.json` è un breve nome in minuscolo, in bae alla specifica dei moduli npm-. Di solito si dovrebbe anche specificare un campo `NomeProdotto`, che è il nome in maiuscolo della tua applicazione, e che sarà preferito al `nome` da Electron.

### `app.impostaNome(nome)`

* `name` Stringa

Sostituisce l'attuale nome dell'app.

### `app.ottieniLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

Per impostare il locale, vorrai usare una linea di comando spostata alla startup dell'app, che si trova [qui](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** Quando distribuisci il tuo pacchetto app, devi anche navigare nelle cartelle `locali`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.aggoimgoRecenteDocumento(percorso)` _macOS_ _Windows_

* `path` String

Aggiungi `percorso` alla lista documenti recenti.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app,pulisciRecentiDocumenti` _macOS_ _Windows_

Pulisce la lista documenti recenti.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocollo` Stringa - Il nome del tuo protocollo, senza `://`. Se vuoi che la tua app gestisca i link `electron://` chiama questo metodo con `electron` come parametro.
* `percorso` Stringa (opzionale) _Windows_ - Di default a `process.eseguiPercorso`
* `arg` Stringa[] (opzionale) _Windows_ - Di default ad un insieme vuoto

Restituisce `Boolean` - Se la chiamata ha avuto successo.

Questo metodo imposta l'attuale eseguibile come gestionale di default per un protocollo (a. k. a. schema URI). Ti permette di integrare la tua app in profondità nel sistema operativo. Una volta registrati, tutti i link con `your-protocol://` saranno aperti con l'attuale eseguibile. L'intero link, incluso il protocollo, sarà passato all'app come parametro.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Nota:** Su macOS, puoi solo registrare protocolli aggiunti alla tua app `info.plist`, che non può essere modificato in esecuzione. Puoi comunque cambiare il file con un semplice editore di testo o script durante il momento di costruzione. Si prega di riferirsi alla [documentazione Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) per i dettagli.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

L'API usa il Registro Windows e LSImpostaGestionaleDefaultPerSchemaURL internamente.

### `app.rimuoviComeProtocolloClientDefault(protocollo[, percorso, arg])` _macOS_ _Windows_

* `protocollo` Stringa - Il nome del tuo protocollo, senza `://`.
* `percorso` Stringa (opzionale) _Windows_ - Di default a `process.eseguiPercorso`
* `arg` Stringa[] (opzionale) _Windows_ - Di default ad un insieme vuoto

Restituisce `Boolean` - Se la chiamata ha avuto successo.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocollo` Stringa - Il nome del tuo protocollo, senza `://`.
* `percorso` Stringa (opzionale) _Windows_ - Di default a `process.eseguiPercorso`
* `arg` Stringa[] (opzionale) _Windows_ - Di default ad un insieme vuoto

Restituisci `Booleano`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Nota:** Su macOS puoi usare questo metodo per controllare se l'app è stata registrata come gestionale di protocolli di default per un protocollo. Puoi anche verificarlo controllando `~/Libreria/Preferenze/com.apple.LanciaServizi.plist` su computer macOS. Si prega di riferirsi alla [documentazione Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) per i dettagli.

L'API usa il Registro Windows e LSCopiaGestionaleDefaultPerSchemaURL internamente.

### `app.impostaTaskUtente(task)` _Windows_

* `task` [Task[]](structures/task.md) - Insieme di oggetti `Task`

Aggiungi `task` alla categoria [Task](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) della JumpList su Windows.

`task` è un insieme di oggetti [`Task`](structures/task.md).

Restituisce `Boolean` - Se la chiamata ha avuto successo.

**Nota:** Se ti piacerebbe modificare la Jump List ecco altri usi, invece, `app.impostaJumpList(categorie)`.

### `app.ottieniImpostazioniJumpList` _Windows_

Ritorna `Object`:

* `miniElementi` Numero intero - Il minimo numero di elementi che saranno mostrati nella JumpList (per una più dettagliata descrizione di questo valore vedere [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `Elementirimossi` [ElementiJumpList[]](structures/jump-list-item.md) - Insieme degli oggetti `ElementiJumpList` che corrisponde agli elementi esplicitamente rimossi dall'utente dalle categorie modificate nella Jump List. Questi elementi non possono essere nuovamente aggiunti alla Jump List alla **prossima** chiamata a `app.impostaJumpList()`, Windows non mostrerà alcuna categoria personalizzata che contenga alcuni valori rimossi.

### `app.impostaJumpList(categorie)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) o `null` - Insieme di oggetti `JumpListCategory`.

Imposta o rimuovi una JumpList personalizzata per l'app, e restituisci una delle seguenti strimghe:

* `ok` - Nulla è andato storto.
* `errore` - Uno o più errori sono avvenuti, abilita il log di esecuzione per mostrare la possibile causa.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - È stato fatto un tentativo di aggiungere un link file alla Jump List per un tipo di file non gestibile dall'app.
* `customCategoryAccessDeniedError` - Le categorie personalizzate non possono essere aggiunte alla Jump List per motivi di privacy dell'utente o per le impostazioni di privacy di gruppo.

Se le `categories` sono `null` la precedentemente impostata Jump List (se esistente) sarà rimpiazzata dalla Jump List standard per l'app (gestita da Windows).

**Note:** Se un oggetto `JumpListCategory` non ha nè `type` nè `name` impostati, il suo `type` diventa `tasks`. Se la proprietà `name` è impostata ma la proprietà `type` é omessa, il `type` sarà considerato `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Qualsiasi tentativo di aggiunta di un elemento rimosso ad una categoria personalizzata prima che questo risulterà nell'intera categoria personalizzata sarà omesso dalla Jump List. La lista degli elementi rimossi può essere ottenuta usando `app.ottieniImpostazioniJumpList()`.

Questo è un esempio molto semplice di come creare una Jump List personalizzata:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Restituisci `Booleano`

Il valore restituito da questo metodo indica se o meno questa istanza della tua applicazione ha ottenuto con successo il blocco.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

Es. Questo metodo restituisce `true` se il tuo processo è la prima istanza della tua applicazione e la tua app dovrebbe continuare il caricamento.  Se restituisce `false`, se il tuo processo deve immediatamente chiudere come se avesse mandato i parametri ad un altra istanza che ha già acquisito il blocco.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

Un esempio dell'attivazione drll'istanza primaria quando se ne avvia una seconda:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    //Qualcuno ha provato ad avviare una seconda istanza, dobbiamo focalizzarci sulla nostra finestra.
    app

This is an Electron Module and should usually not be translated
if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Crea myWindow, carica il resto dell'app, ecc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Restituisci `Booleano`

Questo metodo restituisce se o meno questa istanza della tua app è al momento tenuta da una singola istanza bloccata.  Puoi richiedere il blocco con `app.requestSingleInstanceLock()` e sbloccarla con `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `tipo` Stringa - Unicamente identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Oggetto - Stato app specifico al magazzino per usare da altro dispositivo.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Crea un'`NSAttivitàUtente` e la imposta come attività corrente. L'attività è eleggibile per [Passarlo](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ad un altro dispositivo poi.

### `app.getCurrentActivityType()` _macOS_

Restituisce `Stringa` - Il tipo di attività al momento in esecuzione.

### `app.invalidateCurrentActivity()` _macOS_

* `tipo` Stringa - Unicamente identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalida l'attività [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) corrente dell'utente.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `tipo` Stringa - Unicamente identifica l'attività. In riferimento a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Oggetto - Stato app specifico al magazzino per usare da altro dispositivo.

Aggiorna l'attività corrente se il suo tipo corrisponde al `type`, fondendo le voci da `userInfo` nel suo dizionario corrente `userInfo`.

### `app.setAppUserModelId(id)` _Windows_

* `id` Stringa

Cambia il [Modello Id Applicazione Utente](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) ad `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificato` Stringa - Percorso per il file pkcs12.
  * `password` Stringa - Frase d'accesso per il certificato.
* `callback` Funzione
  * `risultato` Numero intero - Risultato dell'importo.

Importa il certificato in formato pkcs12 nel magazzino del certificato della piattaforma. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disabilitaAccelerazioneHardware()`

Disabilita l'accelerazione hardware per l'app attuale.

Questo metodo può essere chiamato solo prima che l'app sia pronta.

### `app.disabilitaBloccaggioDominioPerAPI3D()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Questo metodo può essere chiamato solo prima che l'app sia pronta.

### `app.ottieniMetricheApp()`

Restituisce [`ProcessMetric[]`](structures/process-metric.md): Array di oggetti `ProcessMetric` che corrispondono alle statistiche relative all'uso della memoria e della CPU di tutti i processi associati all'applicazione.

### `app.getGPUFeatureStatus()`

Restituisce lo [`StatoFunzioneGPU`](structures/gpu-feature-status.md) - Lo Stato Funzioni Grafiche da `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:
```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```
Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `conta` Numero Intero

Restituisce `Boolean` - Se la chiamata ha avuto successo.

Imposta il contatore badge per l'app attuale. Impostare il conto a `0` nasconderà il badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Restituisce `Intero` - Il valore attuale è mostrato nel contatore di badge.

### `app.isUnityRunning()` _Linux_

Restituisce `Booleano` - Se l'attuale ambiente desktop è il launcher Unity.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Restituisci `Oggetto`:

* `apriAdAccesso` Booleano - `true` se l'app è impostata a aperta all'accesso.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. Questa opzione non è disponibile in [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. Questa opzione non è disponibile in [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Questo indica che l'app potrebbe non aprire alcuna finestra all'avvio. Questa opzione non è disponibile in [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Questo indica che l'app potrebbe ripristinare le finestre aperte l'ultima volta che l'app è stata chiusa. Questa opzione non è disponibile in [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Il valore predefinito è `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Di default `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. Questa opzione non è disponibile in [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Imposta le impostazioni dell'elemento d'accesso all'app.

Per lavorare con l'`autoCaricatore` di Electron su Windows, che usa [Squirrel](https://github.com/Squirrel/Squirrel.Windows), vorrai impostare il percorso di lancio ad Update.exe e passare gli argomenti per specificare il nome della tua applicazione. Ad esempio:

``` javascript
const cartellaApp = path.dirname(process.execPath)
const aggiornaExe = path.resolve(cartellaApp, '..', 'Aggiornamento.exe')
const nomeExe = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: aggiornaExe,
  args: [
    '--processStart', `"${nomeExe}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Restituisci `Booleano` - `true` se il supporto d'accessibilità a Chrome è abilitato, `false` altrimenti. Questa API restituirà `true` se l'uso delle tecnologie d'assistenza, come il lettore schermo, sono state trovate. Vedi https://www.chromium.org/developers/design-documents/accessibility per altri dettagli.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Abilita o disabilita il rendering dell'[albero accessibilità](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Abilita manualmente il supporto accessibilità di Chrome permettendo di esporre gli scambi di accessibilità ad utenti nelle impostazioni applicazione. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabilitato di default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `Nomeapplicazione` Stringa (opzionale) - Il nome dell'app.
  * `Versioneapplicazione` Stringa (opzionale) - La versione dell'app.
  * `copyright` Stringa (opzionale) - Informazioni di copyright.
  * `versione` Stringa (opzionale) - Il numero della versione build dell'app. _macOS_
  * `crediti` Stringa (opzionale) - Informazioni dei crediti. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Vedi il pannello delle opzioni. This will override the values defined in the app's `.plist` file on MacOS. Vedi i [documenti Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) per altri dettagli. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` Stringa - Sicurezza codificata in base64 mirata ai dati dei segnalibri restituiti dai metodi `dialog.showOpenDialog` o `dialog.showSaveDialog`.

Restituisce `Function` - Questa funzione **deve** essere chiamata una volta che hai finito d'accede ad un file ad ambito protetto. Se non ti ricordi di fermare l'accesso ai segnalibri, [Le risorse del kernel saranno perse](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) e la tua applicazione perderà completamente la capacità di raggiungere al di fuori della sandbox, finché la tua app non viene riavviata.

```js
// Inizio accesso al file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Comincia con l'accesso ad una risorsa mirata sicura. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. Dai un'occhiata alla [documentazione Apple](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) per una descrizione su come questi sistemi funzionano.

### `app.Lineacomando.aggiungereInterruttore(interrutore[, valore])`

* `switch` String - A command-line switch, without the leading `--`
* `valore` Stringa (opziomale) - Un valore per l'interruttore dato

Aggiungi un interruttore (con `valore` opzionale) alla linea di comando di Chromium.

**Nota:** Non colpirà `processo.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.Lineacomando.aggiungiArgomento(valore)`

* `valore` Stringa - L'argomento da aggiungere alla linea di comando

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Nota:** Non colpirà `processo.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `interruttore` Stringa - Un interruttore della linea di comando

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `interruttore` Stringa - Un interruttore della linea di comando

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

### `app.enableSandbox()` _Experimental_

Enables full sandbox mode on the app.

Questo metodo può essere chiamato solo prima che l'app sia pronta.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTA:** Questo metodo lancia errori se ogni altro dall'utente causa un fallimento della mossa. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. Il messaggio nell'errore dovrebbe essere informativo e dirti esattamente cosa è andato storto

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Restituisce `Intero` un ID rappresentante la richiesta.

Quando `critico` è passato, l'icona del dock rimbalza finché l'app diventa attiva o la richiesta viene annullata.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.annullaRimbalzo(id)` _macOS_

* `id` Numero Intero

Annulla il rimbalzo dell'`id`.

### `app.dock.scaricamentoFinito(Percorsofile)` _macOS_

* `Percorsofile` Stringa

Rimbalza il download impilato se il Percorsofile è nella cartella dei file scaricati.

### `app.dock.impostaBadge(testo)` _macOS_

* `testo` Stringa

Imposta la stringa da mostrare nell'area del dock di badging.

### `app.dock.ottieniBadge()` _macOS_

Restituisce `Stringa` - La stringa del badge del dock.

### `app.dock.nascondi()` _macOS_

Nasconde l'icona del dock.

### `app.dock.mostra()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.èvisibile()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.impostaMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Imposta il [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) nell'applicazione.

### `app.dock.getMenu()` _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.impostaImmagine(immagine)` _macOS_

* `immagine` ([ImmagineNativa](native-image.md) | Stringa)

Imposta l'`immagine` associata a questa icona del dock.

## Proprietà

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabilitato di default.

This API must be called after the `ready` event is emitted.

**Nota:** L'albero accessibilità del rendering può colpire significativamente la performance della tua app. Potrebbe non essere abilitato di default.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

Una proprietà `Booleana`  che restituisce `true` se l'applicazione è impacchettata,  `false` vice versa. Per molte applicazioni, questa proprietà può essere usata per distinguere ambiente di sviluppo da quello di produzione.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).
