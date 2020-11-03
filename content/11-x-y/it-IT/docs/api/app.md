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

* `event` Event
* `launchInfo` Record<string, any> _macOS_

Emitted once, when Electron has finished initializing. On macOS, `launchInfo` holds the `userInfo` of the `NSUserNotification` that was used to open the application, if it was launched from Notification Center. You can also call `app.isReady()` to check if this event has already fired and `app.whenReady()` to get a Promise that is fulfilled when Electron is initialized.

### Evento: 'window-all-closed'

Emesso quando tutte le finestre sono state chiuse.

Se l'evento non viene gestito e tutte le finestre vengono chiuse, il comportamento predefinito è l'uscita dall'applicazione; però, se gestito, è possibile controllare il caso in cui l'applicazione deve uscire o meno. Se l'utente ha premuto `Cmd + Q` o lo sviluppatore ha invocato `app.quit()`, Electron proverà prima a chiudere tutte le finestre e poi emetterà l'evento `will-quit` e in questo caso l'evento `window-all-closed` non sarà emesso.

### Evento: 'before-quit'

Restituisce:

* `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Nota:** Se l'uscita dell'applicazione è stata iniziata da `autoUpdater.quitAndInstall()`, allora `before-quit` viene emesso *dopo* aver emesso l'evento `close` su tutte le finestre e dopo averle chiuse.

**Nota:** In Windows, questo evento non verrà emesso se l'applicazione viene chiusa a causa di a un arresto/riavvio del sistema oppure del logout da parte dell'utente.

### Evento: 'will-quit'

Restituisce:

* `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

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

Emesso quando l'utente vuole aprire un URL con l'l'applicazione. Your application's `Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.

Dovresti chiamare `event.preventDefault()` se vuoi gestire questo evento.

### Evento: 'activate' _macOS_

Restituisce:

* `event` Event
* `hasVisibleWindows` Boolean

Emesso quando l'applicazione è attivata. Varie azioni possono generare questo evento, come il lancio dell'applicazione per la prima volta, provare a rilanciarla quando è già aperta o cliccare sul dock dell'applicazione o sull'icona della taskbar.

### Event: 'did-become-active' _macOS_

Restituisce:

* `event` Event

Emesso quando l'applicazione Mac diventa attiva. Difference from `activate` event is that `did-become-active` is emitted every time the app becomes active, not only when Dock icon is clicked or application is re-launched.

### Evento: 'continue-activity' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'l'attività. In riferimento a [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Contains app-specific state stored by the activity on another device.

Emesso durante [Handoff][handoff] quando un'attività da un altro dispositivo vuole essere ripristinata. Dovresti chiamare `event.preventDefault()` se vuoi gestire questo evento.

Un'attività dell'utente può essere continuata solo in un app con lo stesso developer Team ID come l'attività dell'app di riferimento e che supporti il tipo di attività. I tipi di attività supportati sono specificati nell'`Info.plist` dell'applicazione sotto la chiave `NSUserActivityTypes`.

### Evento: 'will-continue-activity' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'l'attività. In riferimento a [`NSUserActivity.activityType`][activity-type].

Emesso durante [Handoff][handoff], prima che un'attività da un dispositivo differente richieda di essere ripristinata. Dovresti chiamare `event.preventDefault()` se vuoi gestire questo evento.

### Evento: 'continue-activity-error' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'l'attività. In riferimento a [`NSUserActivity.activityType`][activity-type].
* `error` String - Una stringa contenente la descrizione localizzata dell'errore.

Emesso durante [Handoff][handoff] quando un'attività da un dispositivo diverso fallisce nel ripristino.

### Evento: 'activity-was-continued' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'l'attività. In riferimento a [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Contains app-specific state stored by the activity.

Emesso durante [Handoff][handoff] dopo che un'attività da questo dispositivo è stata ripristinata con successo su un altro.

### Evento: 'update-activity-state' _macOS_

Restituisce:

* `event` Event
* `type` String - Una stringa che identifica l'l'attività. In riferimento a [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Contains app-specific state stored by the activity.

Emesso quando [Handoff][handoff] sta per essere ripristinato su un altro dispositivo. Se necessiti di aggiornare lo stato da trasferire, devi chiamare subito `event.preventDefault()`, costruisci un nuovo dizionario `userInfo` e chiama tempestivamente `app.updateCurrentActivity()`. Altrimenti l'operazione fallirà e verrà chiamato `continue-activity-error`.

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
* `url` Stringa
* `error` String - Il codice d'errore
* `certificate` [Certificato](structures/certificate.md)
* `callback` Function
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
* `callback` Function
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

### Evento: 'accedi'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * `èProxy` Booleano
  * `schema` Stringa
  * `ospite` Stringa
  * `porta` Numero Intero
  * `regno` Stringa
* `callback` Function
  * `username` String (opzionale)
  * `password` String (opzionale)

Emesso quando i `Contenutiweb` vogliono fare un'autenticazione base.

Il comportamento standard è di cancellare tutte le autenticazioni. Per modificarlo dovresti impedire il comportamento standard con `event.preventDefault()` e chiamare `callback(username, password)` con le credenziali.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

Se il parametro `callback` viene richiamato senza username o password, la richiesta di autenticazione verrà cancellata e verrà restituito un errore.

### Evento: 'gpu-info-update'

Emesso quando c'è un aggiornamento di informazioni riguardanti GPU.

### Event: 'gpu-process-crashed' _Deprecated_

Restituisce:

* `event` Event
* `killed` Boolean

Emitted when the GPU process crashes or is killed.

**Deprecated:** This event is superceded by the `child-process-gone` event which contains more information about why the child process disappeared. It isn't always because it crashed. The `killed` boolean can be replaced by checking `reason === 'killed'` when you switch to that event.

### Event: 'renderer-process-crashed' _Deprecated_

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `killed` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

**Deprecated:** This event is superceded by the `render-process-gone` event which contains more information about why the render process disappeared. It isn't always because it crashed.  The `killed` boolean can be replaced by checking `reason === 'killed'` when you switch to that event.

#### Event: 'render-process-gone'

Restituisce:

* `event` Event
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `details` Object
  * `reason` String - The reason the render process is gone.  Possibili valori:
    * `clean-exit` - Process exited with an exit code of zero
    * `abnormal-exit` - Process exited with a non-zero exit code
    * `killed` - Process was sent a SIGTERM or otherwise killed externally
    * `crashed` - Process crashed
    * `oom` - Process ran out of memory
    * `launch-failed` - Process never successfully launched
    * `integrity-failure` - Windows code integrity checks failed

Emitted when the renderer process unexpectedly disappears.  This is normally because it was crashed or killed.

#### Event: 'child-process-gone'

Restituisce:

* `event` Event
* `details` Object
  * `tipo` Stringa - Tipo di processo. Uno dei valori seguenti:
    * `Utilità`
    * `Zygote`
    * `Aiutante sandbox`
    * `GPU`
    * `Plugin Pepper`
    * `Broker del Plugin Pepper`
    * `Sconosciuto`
  * `reason` String - The reason the child process is gone. Possibili valori:
    * `clean-exit` - Process exited with an exit code of zero
    * `abnormal-exit` - Process exited with a non-zero exit code
    * `killed` - Process was sent a SIGTERM or otherwise killed externally
    * `crashed` - Process crashed
    * `oom` - Process ran out of memory
    * `launch-failed` - Process never successfully launched
    * `integrity-failure` - Windows code integrity checks failed
  * `exitCode` Number - The exit code for the process (e.g. status from waitpid if on posix, from GetExitCodeProcess on Windows).
  * `name` String (optional) - The name of the process. i.e. for plugins it might be Flash. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.

Emitted when the child process unexpectedly disappears. This is normally because it was crashed or killed. It does not include renderer processes.

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

app.on('session-created', (session) => {
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

**Note:** If the second instance is started by a different user than the first, the `argv` array will not include the arguments.

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

Restituisce `Booleano` - `true` se Electron ha finito l'inizializzazione, `falso` viceversa. See also `app.whenReady()`.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. Può essere usata come alternativa conveniente per controllare `app.isReady()` e sottoscrivendo all'evento `ready` se l'applicazione non è ancora pronta.

### `app.focus([options])`

* `options` Object (optional)
  * `steal` Boolean _macOS_ - Make the receiver the active app even if another app is currently active.

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

You should seek to use the `steal` option as sparingly as possible.

### `app.nascondi()` _macOS_

Nasconde tutte le finestre dell'applicazione senza minimizzarle.

### `app.mostra()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath([path])`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.ottieniAppPercorso()`

Restituisce `Stringa` - La directory dell'app corrente.

### `app.ottieniPercorso(nome)`

* `name` String - You can request the following paths by the name:
  * `home` Directory della home utente.
  * `appData` Per-user application data directory, which by default points to:
    * `%APPDATA%` su Windows
    * `$XDG_CONFIG_HOME` o `~/.config` su Linux
    * `~/Libraria/Supporto Applicazione` su macOS
  * `Datiutente` La directory per ammagazzinare i file di configurazione della tua app, che per valore predefinito è la directory `Datiapp` seguita dal nome della tua app.
  * `cache`
  * `temp` Directory temporanea.
  * `exe` L'attuale file eseguibile.
  * `modulo` La libreria `libchromiumcontent`.
  * `desktop` L'attuale directory del desktop utente.
  * `documenti` La directory per l'utente "I miei Documenti".
  * `Scaricati` La directory per i file scaricati dall'utente.
  * `musica` La directory per la musica dell'utente.
  * `immagini` La directory per le immagini dell'utente.
  * `video` La directory per i video dell'utente.
  * `recent` Directory for the user's recent files (Windows only).
  * `logs` La directory per la cartella registro della tua app.
  * `pepperFlashSystemPlugin` Percorso completo alla versione di sistema del plugin Pepper Flash.
  * `crashDumps` Directory where crash dumps are stored.

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `piccola` - 16x16
    * `normale` - 32x32
    * `grande - 48x48 su <em x-id="4">Linux</em>, 32x32 su <em x-id="4">Windows</em>, non supportato su <em x-id="4">macOS</em>.</li>
</ul></li>
</ul></li>
</ul>

<p spaces-before="0">Returns <code>Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).</p>

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

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Di solito si dovrebbe anche specificare un campo `NomeProdotto`, che è il nome in maiuscolo della tua applicazione, e che sarà preferito al `nome` da Electron.

### `app.impostaNome(nome)`

* `name` Stringa

Sostituisce l'attuale nome dell'app.

**Note:** This function overrides the name used internally by Electron; it does not affect the name that the OS uses.

### `app.ottieniLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

Per impostare il locale, vorrai usare una linea di comando spostata alla startup dell'app, che si trova [qui](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Note:** Quando distribuisci il tuo pacchetto app, devi anche navigare nelle cartelle `locali`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.aggoimgoRecenteDocumento(percorso)` _macOS_ _Windows_

* `path` String

Aggiungi `percorso` alla lista documenti recenti.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app,pulisciRecentiDocumenti` _macOS_ _Windows_

Pulisce la lista documenti recenti.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocollo` Stringa - Il nome del tuo protocollo, senza `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) _Windows_ - The path to the Electron executable. Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Arguments passed to the executable. Defaults to an empty array

Restituisce `Boolean` - Se la chiamata ha avuto successo.

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via [Electron Forge][electron-forge], [Electron Packager][electron-packager], or by editing `info.plist` with a text editor. Si prega di riferirsi alla [documentazione Apple][CFBundleURLTypes] per i dettagli.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally.

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

Returns `Boolean` - Whether the current executable is the default handler for a protocol (aka URI scheme).

**Nota:** Su macOS puoi usare questo metodo per controllare se l'app è stata registrata come gestionale di protocolli di default per un protocollo. Puoi anche verificarlo controllando `~/Libreria/Preferenze/com.apple.LanciaServizi.plist` su computer macOS. Si prega di riferirsi alla [documentazione Apple][LSCopyDefaultHandlerForURLScheme] per i dettagli.

The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally.

### `app.getApplicationNameForProtocol(url)`

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `String` - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.

### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `Promise<Object>` - Resolve with an object containing the following:
  * `icon` NativeImage - the display icon of the app handling the protocol.
  * `path` String  - installation path of the app handling the protocol.
  * `name` String - display name of the app handling the protocol.

This method returns a promise that contains the application name, icon and path of the default handler for the protocol (aka URI scheme) of a URL.

### `app.impostaTaskUtente(task)` _Windows_

* `task` [Task[]](structures/task.md) - Insieme di oggetti `Task`

Adds `tasks` to the [Tasks][tasks] category of the Jump List on Windows.

`task` è un insieme di oggetti [`Task`](structures/task.md).

Restituisce `Boolean` - Se la chiamata ha avuto successo.

**Nota:** Se ti piacerebbe modificare la Jump List ecco altri usi, invece, `app.impostaJumpList(categorie)`.

### `app.ottieniImpostazioniJumpList` _Windows_

Restituisci `Oggetto`:

* `miniElementi` Numero intero - Il minimo numero di elementi che saranno mostrati nella JumpList (per una più dettagliata descrizione di questo valore vedere [MSDN docs][JumpListBeginListMSDN]).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. Questi elementi non possono essere nuovamente aggiunti alla Jump List alla **prossima** chiamata a `app.impostaJumpList()`, Windows non mostrerà alcuna categoria personalizzata che contenga alcuni valori rimossi.

### `app.impostaJumpList(categorie)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.

Imposta o rimuovi una JumpList personalizzata per l'app, e restituisci una delle seguenti strimghe:

* `ok` - Nulla è andato storto.
* `errore` - Uno o più errori sono avvenuti, abilita il log di esecuzione per mostrare la possibile causa.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - È stato fatto un tentativo di aggiungere un link file alla Jump List per un tipo di file non gestibile dall'app.
* `customCategoryAccessDeniedError` - Le categorie personalizzate non possono essere aggiunte alla Jump List per motivi di privacy dell'utente o per le impostazioni di privacy di gruppo.

Se le `categories` sono `null` la precedentemente impostata Jump List (se esistente) sarà rimpiazzata dalla Jump List standard per l'app (gestita da Windows).

**Note:** Se un oggetto `JumpListCategory` non ha nè `type` nè `name` impostati, il suo `type` diventa `tasks`. Se la proprietà `name` è impostata ma la proprietà `type` é omessa, il `type` sarà considerato `custom`.

**Note:** Gli utenti possono rimuovere gli elementi dalle categorie personalizzate, e Windows non permetterà ad un elemento rimosso di essere ri-aggiunto in una categoria personalizzata fino a **dopo** la successiva chiamata di successo a `app.impostaJumpList(categorie)`. Qualsiasi tentativo di aggiunta di un elemento rimosso ad una categoria personalizzata prima che questo risulterà nell'intera categoria personalizzata sarà omesso dalla Jump List. La lista degli elementi rimossi può essere ottenuta usando `app.ottieniImpostazioniJumpList()`.

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

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  Se restituisce `false`, se il tuo processo deve immediatamente chiudere come se avesse mandato i parametri ad un altra istanza che ha già acquisito il blocco.

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
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}
```

### `app.hasSingleInstanceLock()`

Restituisci `Booleano`

Questo metodo restituisce se o meno questa istanza della tua app è al momento tenuta da una singola istanza bloccata.  Puoi richiedere il blocco con `app.requestSingleInstanceLock()` e sbloccarla con `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `tipo` Stringa - Unicamente identifica l'attività. In riferimento a [`NSUserActivity.activityType`][activity-type].
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Crea un'`NSAttivitàUtente` e la imposta come attività corrente. The activity is eligible for [Handoff][handoff] to another device afterward.

### `app.getCurrentActivityType()` _macOS_

Restituisce `Stringa` - Il tipo di attività al momento in esecuzione.

### `app.invalidateCurrentActivity()` _macOS_

Invalida l'attività [Handoff][handoff] corrente dell'utente.

### `app.resignCurrentActivity()` _macOS_

Marks the current [Handoff][handoff] user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `tipo` Stringa - Unicamente identifica l'attività. In riferimento a [`NSUserActivity.activityType`][activity-type].
* `userInfo` any - App-specific state to store for use by another device.

Aggiorna l'attività corrente se il suo tipo corrisponde al `type`, fondendo le voci da `userInfo` nel suo dizionario corrente `userInfo`.

### `app.impostaModelloIdAppUtente(id)` _Windows_

* `id` Stringa

Cambia il [Modello Id Applicazione Utente][app-user-model-id] ad `id`.

### `app.setActivationPolicy(policy)` _macOS_

* `policy` String - Can be 'regular', 'accessory', or 'prohibited'.

Sets the activation policy for a given app.

Activation policy types:
* 'regular' - The application is an ordinary app that appears in the Dock and may have a user interface.
* 'accessory' - The application doesn’t appear in the Dock and doesn’t have a menu bar, but it may be activated programmatically or by clicking on one of its windows.
* 'prohibited' - The application doesn’t appear in the Dock and may not create windows or be activated.

### `app.importCertificate(options, callback)` _Linux_

* `options` Object
  * `certificato` Stringa - Percorso per il file pkcs12.
  * `password` Stringa - Frase d'accesso per il certificato.
* `callback` Function
  * `risultato` Numero intero - Risultato dell'importo.

Importa il certificato in formato pkcs12 nel magazzino del certificato della piattaforma. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disabilitaAccelerazioneHardware()`

Disabilita l'accelerazione hardware per l'app attuale.

Questo metodo può essere chiamato solo prima che l'app sia pronta.

### `app.disabilitaBloccaggioDominioPerAPI3D()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behavior.

Questo metodo può essere chiamato solo prima che l'app sia pronta.

### `app.ottieniMetricheApp()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Restituisce lo [`StatoFunzioneGPU`](structures/gpu-feature-status.md) - Lo Stato Funzioni Grafiche da `chrome://gpu/`.

**Note:** This information is only usable after the `gpu-info-update` event is emitted.

### `app.getGPUInfo(infoType)`

* `infoType` String - Can be `basic` or `complete`.

Returns `Promise<unknown>`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:
```js
{
  auxAttributes:
   {
     amdSwitchable: true,
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
     videoDecodeAcceleratorFlags: 0
   },
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModelName: 'MacBookPro',
  machineModelVersion: '11.5'
}
```

Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `conta` Numero Intero

Restituisce `Boolean` - Se la chiamata ha avuto successo.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration][unity-requirement].

### `app.ottieniContaBadge()` _Linux_ _macOS_

Restituisce `Intero` - Il valore attuale è mostrato nel contatore di badge.

### `app.èUnityEsecuzione()` _Linux_

Restituisce `Booleano` - Se l'attuale ambiente desktop è il launcher Unity.

### `app.ottieniImpostazioniElementiAccesso([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Restituisci `Oggetto`:

* `apriAdAccesso` Booleano - `true` se l'app è impostata a aperta all'accesso.
* `openAsHidden` Boolean _macOS_ - `true` se l'app è impostata per aprirsi come nascosta al login. Questa opzione non è disponibile in [MAS builds][mas-builds].
* `wasOpenedAtLogin` Boolean _macOS_ - `true` se l'app era stata aperta automaticamente al login. Questa opzione non è disponibile in [MAS builds][mas-builds].
* `wasOpenedAsHidden` Boolean _macOS_ - `true` se l'app era stata aperta come un oggetto login nascosto. Questo indica che l'app potrebbe non aprire alcuna finestra all'avvio. Questa opzione non è disponibile in [MAS builds][mas-builds].
* `restoreState` Boolean _macOS_ - `true` se l'app era stata aperta come un oggetto login che dovrebbe ripristinare lo stato della sessione precedente. Questo indica che l'app potrebbe ripristinare le finestre aperte l'ultima volta che l'app è stata chiusa. Questa opzione non è disponibile in [MAS builds][mas-builds].
* `executableWillLaunchAtLogin` Boolean _Windows_ - `true` if app is set to open at login and its run key is not deactivated. This differs from `openAtLogin` as it ignores the `args` option, this property will be true if the given executable would be launched at login with **any** arguments.
* `launchItems` Object[] _Windows_
  * `name` String _Windows_ - name value of a registry entry.
  * `path` String _Windows_ - The executable to an app that corresponds to a registry entry.
  * `args` String[] _Windows_ - the command-line arguments to pass to the executable.
  * `scope` String _Windows_ - one of `user` or `machine`. Indicates whether the registry entry is under `HKEY_CURRENT USER` or `HKEY_LOCAL_MACHINE`.
  * `enabled` Boolean _Windows_ - `true` if the app registry key is startup approved and therefore shows as `enabled` in Task Manager and Windows settings.

### `app.impostaImpostazioniElementoAccesso(impostazioni)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Il valore predefinito è `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` per aprirew l'app come nascosta. Di default `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. Questa opzione non è disponibile in [MAS builds][mas-builds].
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.
  * `enabled` Boolean (optional) _Windows_ - `true` will change the startup approved registry key and `enable / disable` the App in Task Manager and Windows Settings. Il valore predefinito è `true`.
  * `name` String (optional) _Windows_ - value name to write into registry. Defaults to the app's AppUserModelId(). Imposta le impostazioni dell'elemento d'accesso all'app.

Per lavorare con l'`autoCaricatore` di Electron su Windows, che usa [Squirrel][Squirrel-Windows], vorrai impostare il percorso di lancio ad Update.exe e passare gli argomenti per specificare il nome della tua applicazione. Ad esempio:

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

### `app.èAbilitatoSupportoAccessibilità()` _macOS_ _Windows_

Restituisci `Booleano` - `true` se il supporto d'accessibilità a Chrome è abilitato, `false` altrimenti. Questa API restituirà `true` se l'uso delle tecnologie d'assistenza, come il lettore schermo, sono state trovate. Vedi https://www.chromium.org/developers/design-documents/accessibility per altri dettagli.

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Abilita o disabilita il rendering dell'[albero accessibilità](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Abilita manualmente il supporto accessibilità di Chrome permettendo di esporre gli scambi di accessibilità ad utenti nelle impostazioni applicazione. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabilitato di default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.showAboutPanel()`

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* `options` Object
  * `Nomeapplicazione` Stringa (opzionale) - Il nome dell'app.
  * `Versioneapplicazione` Stringa (opzionale) - La versione dell'app.
  * `copyright` Stringa (opzionale) - Informazioni di copyright.
  * `version` String (optional) _macOS_ - The app's build version number.
  * `credits` String (optional) _macOS_ _Windows_ - Credit information.
  * `authors` String[] (optional) _Linux_ - List of app authors.
  * `website` String (optional) _Linux_ - The app's website.
  * `iconPath` String (optional) _Linux_ _Windows_ - Path to the app's icon in a JPEG or PNG file format. On Linux, will be shown as 64x64 pixels while retaining aspect ratio.

Vedi il pannello delle opzioni. This will override the values defined in the app's `.plist` file on macOS. Vedi i [documenti Apple][about-panel-options] per altri dettagli. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported()`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel()` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

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

### `app.enableSandbox()`

Enables full sandbox mode on the app. This means that all renderers will be launched sandboxed, regardless of the value of the `sandbox` flag in WebPreferences.

Questo metodo può essere chiamato solo prima che l'app sia pronta.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (optional)
  * `conflictHandler` Function<Boolean> (optional) - A handler for potential conflict in move failure.
    * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTA:** Questo metodo lancia errori se ogni altro dall'utente causa un fallimento della mossa. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. Il messaggio nell'errore dovrebbe essere informativo e dirti esattamente cosa è andato storto.

By default, if an app of the same name as the one being moved exists in the Applications directory and is _not_ running, the existing app will be trashed and the active app moved into its place. If it _is_ running, the pre-existing running app will assume focus and the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior.  i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

Ad esempio:

```js
app.moveToApplicationsFolder({
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'An app of this name already exists'
      }) === 1
    }
  }
})
```

Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.

### `app.isSecureKeyboardEntryEnabled()` _macOS_

Returns `Boolean` - whether `Secure Keyboard Entry` is enabled.

By default this API will return `false`.

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean - Enable or disable `Secure Keyboard Entry`

Set the `Secure Keyboard Entry` is enabled in your application.

By using this API, important information such as password and other sensitive information can be prevented from being intercepted by other processes.

See [Apple's documentation](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) for more details.

**Note:** Enable `Secure Keyboard Entry` only when it is needed and disable it when it is no longer needed.

## Proprietà

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabilitato di default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.badgeCount` _Linux_ _macOS_

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Nota:** Il launcher Unity richiede l'esistenza di un file `.desktop` per funzionare, per ulteriori informazioni leggere [Desktop Integrazione Ambiente][unity-requirement].

**Note:** On macOS, you need to ensure that your application has the permission to display notifications for this property to take effect.

### `app.commandLine` _Readonly_

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` _macOS_ _Readonly_

A [`Dock`](./dock.md) `| undefined` object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` _Readonly_

Una proprietà `Booleana`  che restituisce `true` se l'applicazione è impacchettata,  `false` vice versa. Per molte applicazioni, questa proprietà può essere usata per distinguere ambiente di sviluppo da quello di produzione.

### `app.name`

A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Di solito si dovrebbe anche specificare un campo `NomeProdotto`, che è il nome in maiuscolo della tua applicazione, e che sarà preferito al `nome` da Electron.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  It is useful for ensuring that your entire app has the same user agent.  Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `true`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
