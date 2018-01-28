# app

> Controlla il ciclo di vita degli eventi della tua applicazione.

Processo: [Principale](../glossary.md#main-process)

I seguenti esempi mostrano come uscire dall'applicazione quando l'ultima finestra è chiusa:

```javascript
const {app} = richiedi('electron')
app.on('finestra-tutta-chiusa', () => {
 app.esci()
})
```

## Eventi

L'oggetto `app` emette i seguenti eventi:

### Evento: 'finirà-lancio'

Emetti quando l'app ha finito la startup di base. Su Windows e Linux, l'evento `finirà-lancio` equivale all'evento `pronto`; su macOS questo evento rappresenta la notifica `applicazionefiniràlancio` di `NSApplication`. Spesso dovrai impostare ascoltatori per gli eventi `apri-file` e `apri-url` ed avviare il reporter dei crash e l'aggiornamento automatico.

In gran parte dei casi, dovresti solo fare tutto nel gestore eventi `pronto`.

### Evento: 'pronto'

Restituiti:

* `Infolanciò` Oggetto *macOS*

Emesso quando Electron ha concluso l'inizializzazione. Su macOS `Infolancio` deteiene le `Infouser` della `NSNotificazioneUtente` usata per aprire l'applicazione, se lanciata dal Centro Notifiche. Puoi chiamare `app.isPronta()` per controllare se gli eventi sono già stati generati.

### Evento: 'finestra-tutto-chiuso'

Emesso quando tutte le finestre sono state chiuse.

Se non sottoscrivi a questo evento e tutte le finestre sono chiuse il comportamento predefinito è di uscire dall'app; comunque sr sottoscrivi controlli se l'app deve uscire o no. Se l'utente ha premuto `Cmd+Q` o lo sviluppatore chiamato `app.esci()`, Electron proverà prima a chiudere tutte le finestre ed emettere l'evento `will-quit` e in questo caso l'evento `finestra-tutto-chiuso` non sarà emesso.

### Evento: 'prima-uscire'

Restituiti:

* `evento` Evento

Emesso prima che l'app inizi a chiudere le sue finestre. Chiamare `evento.previeniDefault()` impedirà il comportamento predefinito che sta terminando l'applicazione.

**Note:** Se l'uscita dall'app è avviata da `autoAggiornamento.esciEInstalla()` allora `prima-uscire` è emesso *dopo* aver emesso l'evento `chiuso` su tutte le finestre e chiudendole.

### Evento: 'uscirà'

Restituiti:

* `evento` Evento

Emesso quando tutte le finestre sono state chiuse e l'app uscirà. Chiamando `evento.previeniDefault` impedirà il comportamento predefinito che sta terminando l'app.

Vedi la descrizione dell'evento `finestra-tutto-chiuso` per le differenze tra gli eventi `uscirà` e `finestra-tutto-chiuso`.

### Evento: 'esci'

Restituiti:

* `evento` Evento
* `Codiceuscita` Numero Intero

Emesso quando l'app è in uscita.

### Evento: 'apri-file' *macOS*

Restituiti:

* `evento` Evento
* `percorso` Stringa

Emesso quando l'utente vuole aprire un file con l'app. L'evento `apri-file` è in genere emesso quando l'app è già aperta e l'OS vuole riutilizzare l'app per aprire il file. `apri-file` è anche emesso quando un file è rilasciato nel dock e l'app non è ancora in esecuzione. Assicurati di ascoltare l'evento `apri-file` molto presto all'avvio della tua app per gestire questo cado (anche prima dell'emissione dell'evento `pronto`).

Dovresti chiamare `evento.previeniDefault` se vuoi gestire questo evento.

Su Windows, devi analizzare `process.argv` (nel processo principale) per ottenere il percorso del file.

### Evento: 'apri-url' *macOS*

Restituiti:

* `evento` Evento
* `url` Stringa

Emesso quando l'utente vuole aprire un URL con l'l'applicazione. Il file `Info.plist` della tua applicazione definisce lo schema url compreso della chiave `CFBundleURLTipo` ed imposta la `NSClassePrincipale` ad `AtomApplicazione`.

Dovresti chiamare `evento.previeniDefault` se vuoi gestire questo evento.

### Evento: 'attiva' *macOS*

Restituiti:

* `evento` Evento
* `haFinestreVisibili` Booleano

Emesso quando l'app è attivata. Varie azioni possono generare questo evento, come il lancio dell'app per la prima volta, provare a rilanciare l'app quando già aperta o cliccare sul dock dell'applicazione o sull'icona della taskbar.

### Evento: 'continua-attività' *macOS*

Restituiti:

* `evento` Evento
* `tipo` Stringa - Una stringa che identifica l'l'attività. Mappa a [`NSUtenteAttività.attivitàTipo`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `utenteInfo` Oggetto - Contiene stati app specifici immagazzinati per attività su un altro dispositivo.

Emesso durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quando un'attività da un altro dispositivo vuole essere ripristinata. Se vuoi gestire questo evento dovresti chiamare l'`evento.previeniDefault()`.

Un'attività dell'utente può essere continuata solo in un app con lo stesso Team ID dello sviluppatore come fonte app dell'attività e che supporti il tipo di attività. I tipi di attività supportati sono specificati nell'`Info.plist` dell'app sotto la chiave `NSTipoAttivitàUtente`.

### Evento: 'nuova-finestra-per-scheda' *macOS*

Restituiti:

* `evento` Evento

Emesso quando l'utente clicca il pulsante macOS nativo nuova scheda. Il pulsante nuova scheda è visibile solo se l'attuale `FinestraBrowser` ha un `Identificatoreschede`

### Evento: 'browser-finestra-sfocatura'

Restituiti:

* `evento` Evento
* `finestra` FinestraBrowser

Emesso quando una [Finestrabrowser](browser-window.md) è sfocata.

### Evento: 'browser-finestra-focalizza'

Restituiti:

* `evento` Evento
* `finestra` FinestraBrowser

Emesso quando una [Finestrabrowser](browser-window.md) è focalizzata.

### Evento: 'broser-finestra-creata'

Restituiti:

* `evento` Evento
* `finestra` FinestraBrowser

Emesso quando una [Finestrabrowser](browser-window.md) è creata.

### Evento: 'web-contenuto-creato'

Restituiti:

* `evento` Evento
* `Contenutiweb` ContenutiWeb

Emesso quando un nuovo [ContenutoWeb](web-contents.md) è creato.

### Evento: 'certificato-errore'

Restituiti:

* `evento` Evento
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `url` Stringa
* `errore` Stringa - Il codice d'errore
* `certificato` [Certificato](structures/certificate.md)
* `callback` Funzione 
  * `èVerificato` Booleano - Se considerare il certificato come verificato

Emesso quando fallisce la verifica del`certificato` per`url`, per verificare il certificato puoi prevenire il comportamento predefinito con `evento.previeniDefault()` e chiamare `callback(vero)`.

```javascript
const {app} = richiedi('electron')


app.on ('certificato-errore', (eventi, Contenutiweb, url, errori, certificato, callback) => {
  se (url === 'https://github.com') {
      // Logica di verifica.
    evento.previeniDefault()
    callback(true)
  } altro {
    callback(false)
  }
})
```

### Evento: 'selezione-certificato-client'

Restituiti:

* `evento` Evento
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `url` URL
* `Listacertificati` [Certificati[]](structures/certificate.md)
* `callback` Funzione 
  * `certificato` [Certificato](structures/certificate.md) (opzionale)

Emesso quando un certificato client è richiesto.

L'`url` corrisponde alla voce di navigazione richiedente il certificato client e `callback` può essere chiamato con una voce filtrata dalla lista. Usando `evento.previeniDefault()` si previene che l'app usi il primo certificato dal magazzino.

```javascript
const {app} = richiedi('electron')


app.on ('seleziona-certificato-client', evento, Contenutiweb, url, lista, callback) => {
 evento.previeniDefault()
 callback(lista[0])
})
```

### Evento: 'accedi'

Restituiti:

* `evento` Evento
* `ContenutiWeb` [ContenutiWeb](web-contents.md)
* `richiesta` Oggetto 
  * `metodo` Stringa
  * `url` URL
  * `prescrivente` URL
* `infoautore` Oggetto 
  * `èProxy` Booleano
  * `schema` Stringa
  * `ospite` Stringa
  * `porta` Numero Intero
  * `regno` Stringa
* `callback` Funzione 
  * `nomeutente` Stringa
  * `password` Stringa

Emesso quando i `Contenutiweb` vogliono fare un'autenticazione base.

Il comportamento predefinito è di cancellare tutte le autenticazioni, per evitare ciò puoi prevenire il comportamento predefinito con `evento.previeniDefault` e chiamare `callback(nomeutente, password)` con le credenziali.

```javascript
const {app} = richiedi('electron')


app.on('login', evento, Contenutiweb, richiesta, Infoaut, callback) => {
 evento.previeniDefault()
 callback('nomeutente', 'segreto')
})
```

### Evento: 'processi-gpu-crashati'

Restituiti:

* `evento` Evento
* `ucciso` Booleano

Emesso quando i processi gpu crashano o soni uccisi.

### Evento: 'accessibilità-supporto-cambiata' *macOS* *Windows*

Restituiti:

* `evento` Evento
* `SupportoAccessibilitàAbilitato` Booleano - `true` quando il supporto all'accessibilità a Chrome è abilitato, `false` altrimenti.

Emesso quando cambia il supporto accessibilità di Chrome. Questo evento avviene quando le tecnologie d'assistenza, come lettore schermo, sono abilitate o disabilitate. Vedi https://www.chromium.org/developers/design-documents/accessibility per altri dettagli.

## Metodi

L'oggetto `app` ha i seguenti metodi:

**Nota:** Alcuni metodi sono disponibili solo su sistemi operativi specifici e sono etichettati come tali.

### `app.esci()`

Prova a chiudere tutte le finestre. L'evento `esci-prima` sarà emesso prima. Se tutte le finestre sono chiuse con successo, l'evento `uscirà` sarà emesso e di default l'app sarà terminata.

Questo metodo garantisce che tutti i `precaricati` e `caricati` eventi gestionali siano correttamente eseguiti. È possibile che una finestra annulli l'uscita tornando `false` nell'evento gestionale `precaricato`.

### `app.esci([exitCode])`

* `Codiceuscita` Numero Intero (opzionale)

Esci immediatamente con `Codiceuscita`. Il `Codiceuscita` predefinito è 0.

Tutte le finestre saranno immediatamente chiuse senza richiesta all'utente e gli eventi `prima-esci` e `uscirà` non saranno emessi.

### `app.rilancio([options])`

* `opzioni` Oggetto (opzionale) 
  * `arg` Stringa[] - (opzionale)
  * `eseguiPercorso` Stringa (opzionale)

Rilancia l'app quando esiste la corrente istanza.

Di default la nuova istanza userà la stessa directory di lavoro e argomenti della linea di comando con la corrente istanza. Quando l'`arg` è specificato, l'`arg` sarà invece passato come argomento di linea di comando. Quando `eseguiPercorso` è specificato, `eseguiPercorso` sarà eseguito per rilanciare, invece, l'app corrente.

Nota che questo metodo non termina l'app quando eseguito, devi chiamare `app.esci` o `app.uscita` dopo aver chiamato `app.rilancia` per riavviare l'app.

Quando `app.rilancia` è chiamato ripetutamente, le istanze multiple sarannò avviate dopo l'istanza corrente sia uscita.

Un esempio di riavvio dell'istanza corrente immediato e aggiungendo un nuovo argomento della linea di comando alla nuova istanza:

```javascript
const {app} = richiedi('electron')


app.rilancia({args: processo.argv..slice(1).concat(['--rilancia'])})
app.esci(0)
```

### `app.isPronta()`

Restituisce `Booleano` - `true` se Electron ha finito l'inizializzazione, `falso` viceversa.

### `app.focalizza()`

Su Linux, focalizza sulla prima finestra visibile. Su macOS rende l'applicazione attiva. Su Windows, focalizza sulla prima finestra dell'applicazione.

### `app.nascondi()` *macOS*

Nasconde tutte le finestre dell'applicazione senza minimizzarle.

### `app.mostra()` *macOS*

Mostra le finestre dell'applicazione dopo che sono state nascoste. Non le focalizza automaticamente.

### `app.ottieniAppPercorso()`

Restituisce `Stringa` - La directory dell'app corrente.

### `app.ottieniPercorso(nome)`

* `nome` Stringa

Restituisce `Stringa` - Un percorso ad una directory speciale o ai file associati con `nome`. In caso di fallimento avviene un `Errore`.

Puoi richiedere i seguenti percorsi dal nome:

* `home` Directory della home utente.
* `appData` Dati della directory dell'app utente, con punti predefiniti a: 
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
* `pepperFlashSystemPlugin` Percorso intero alla versione di sistema del plugin Pepper Flash.

### `app.ottieniIconaFile(percorso[, opxioni], callback)`

* `percorso` Stringa
* `opzioni` Oggetto (opzionale) 
  * `dimensioni` Stringa 
    * `piccola` - 16x16
    * `normale` - 32x32
    * `grande - 48x48 su <em>Linux</em>, 32x32 su <em>Windows</em>, non supportato su <em>macOS</em>.</li>
</ul></li>
</ul></li>
<li><code>callback` Funzione 
      * `errore` Errore
      * `icona` [ImmagineNativa](native-image.md)
    
    Recupera un'icona associata al percorso.
    
    Su *Windows* esistono 2 tipi di icone:
    
    * Icone associate con certe estensioni di file come `.mp3`, `.png`, etc.
    * Icone interne allo stesso file come `.exe`, `.dll`, `.ico`.
    
    Su *Linux* e *macOS* le icone dipendono dall'app associata con il tipo di file mimo.
    
    ### `app.impostaPercorso(nome, percorso)`
    
    * `nome` Stringa
    * `percorso` Stringa
    
    Sostituisce il `percorso` ad una directory speciale o ad un file associato con `nome`. Se il percorso specifica una directory che non esiste, la directory sarà creata da questo metodo. In caso di fallimento viene generato un `Errore`.
    
    Si possono sostituire solo i percorsi di un `nome` definiti in `app.ottieniPercorso`.
    
    Di default, i cookie e la cache delle pagine web saranno immagazzinate sotto la directory `Datiutente`. Se vuoi cambiare questa posizione devi sostituire al percorso `Datiutente` prima che l'evento `pronto` del modulo `app` venga emesso.
    
    ### `app.ottieniVersione()`
    
    Restituisce `Stringa` - La versione dell'app caricata. Se non viene trovata nessuna versione nel file dell'app `pacchetto-json`, la versione dell'attuale pacchetto o eseguibile è restituita.
    
    ### `app.ottieniNome()`
    
    Restituisce `Stringa`. Il nome attuale dell'app, che è il nome nel file dell'app `package.json`.
    
    Spesso il campo `nome` del `package.json` è un breve nome in minuscolo, in bae alla specifica dei moduli npm-. Di solito si dovrebbe anche specificare un campo `NomeProdotto`, che è il nome in maiuscolo della tua applicazione, e che sarà preferito al `nome` da Electron.
    
    ### `app.impostaNome(nome)`
    
    * `nome` Stringa
    
    Sostituisce l'attuale nome dell'app.
    
    ### `app.ottieniLocale()`
    
    Restituisce `Stringa` - L'attuale locale dell'app. Possibili valori restituiti sono documentati [qui](locales.md).
    
    **Note:** Quando distribuisci il tuo pacchetto app, devi anche navigare nelle cartelle `locali`.
    
    **Note:** Su Windows devi chiamarlo dopo che l'evento `pronto` è emesso.
    
    ### `app.aggoimgoRecenteDocumento(percorso)` *macOS* *Windows*
    
    * `percorso` Stringa
    
    Aggiungi `percorso` alla lista documenti recenti.
    
    Questa lista è gestita dall'OS. Su Windows puoi visitare la lista dalla taskbar e su macOS la puoi visitare dal menu dock.
    
    ### `app,pulisciRecentiDocumenti` *macOS* *Windows*
    
    Pulisce la lista documenti recenti.
    
    ### `app.impostacomeProtocolloClientDefault(protocol[, percorso,args])` *macOS* *Windows*
    
    * `protocollo` Stringa - Il nome del tuo protocollo, senza `://`. Se vuoi che la tua app gestisca i link `electron://` chiama questo metodo con `electron` come parametro.
    * `percorso` Stringa (opzionale) *Windows* - Di default a `process.eseguiPercorso`
    * `arg` Stringa[] (opzionale) *Windows* - Di default ad un insieme vuoto
    
    Restituisce `Booleano` - Se la chiamata ha avuto successo.
    
    Questo metodo imposta l'attuale eseguibile come gestionale di default per un protocollo (a. k. a. schema URI). Ti permette di integrare la tua app in profondità nel sistema operativo. Una volta registrati, tutti i link con `your-protocol://` saranno aperti con l'attuale eseguibile. L'intero link, incluso il protocollo, sarà passato all'app come parametro.
    
    Su Windows puoi fornire parametri di percorso opzionali, il percorso al tuo eseguibile e gli argomenti, un insieme di argomenti da passare al tuo eseguibile quando si lancia.
    
    **Nota:** Su macOS, puoi solo registrare protocolli aggiunti alla tua app `info.plist`, che non può essere modificato in esecuzione. Puoi comunque cambiare il file con un semplice editore di testo o script durante il momento di costruzione. Si prega di riferirsi alla [documentazione Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) per i dettagli.
    
    L'API usa il Registro Windows e LSImpostaGestionaleDefaultPerSchemaURL internamente.
    
    ### `app.rimuoviComeProtocolloClientDefault(protocollo[, percorso, arg])` *macOS* *Windows*
    
    * `protocollo` Stringa - Il nome del tuo protocollo, senza `://`.
    * `percorso` Stringa (opzionale) *Windows* - Di default a `process.eseguiPercorso`
    * `arg` Stringa[] (opzionale) *Windows* - Di default ad un insieme vuoto
    
    Restituisce `Booleano` - Se la chiamata ha avuto successo.
    
    Questo metodo controlla se l'eseguibile attuale è come un gestionale di default per un protocollo (o schema URI). Se sì, rimuoverà l'app come gestionale predefinito.
    
    ### `app.isDefaultClientProtocollo(protocollo[, percorso, arg])` *macOS* *Windows*
    
    * `protocollo` Stringa - Il nome del tuo protocollo, senza `://`.
    * `percorso` Stringa (opzionale) *Windows* - Di default a `process.eseguiPercorso`
    * `arg` Stringa[] (opzionale) *Windows* - Di default ad un insieme vuoto
    
    Restituisci `Booleano`
    
    Questo metodo controlla se l'eseguibile attuale è come un gestionale per un protocollo (o schema URI). Se sì, restituirà true. Altrimenti, restituirà false.
    
    **Nota:** Su macOS puoi usare questo metodo per controllare se l'app è stata registrata come gestionale di protocolli di default per un protocollo. Puoi anche verificarlo controllando `~/Libreria/Preferenze/com.apple.LanciaServizi.plist` su computer macOS. Si prega di riferirsi alla [documentazione Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) per i dettagli.
    
    L'API usa il Registro Windows e LSCopiaGestionaleDefaultPerSchemaURL internamente.
    
    ### `app.impostaTaskUtente(task)` *Windows*
    
    * `task` [Task[]](structures/task.md) - Insieme di oggetti `Task`
    
    Adds `tasks` to the [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.
    
    `tasks` is an array of [`Task`](structures/task.md) objects.
    
    Restituisce `Booleano` - Se la chiamata ha avuto successo.
    
    **Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.
    
    ### `app.getJumpListSettings()` *Windows*
    
    Returns `Object`:
    
    * `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
    * `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.
    ### `app.setJumpList(categories)` *Windows*
    
    * `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.
    
    Sets or removes a custom Jump List for the application, and returns one of the following strings:
    
    * `ok` - Nothing went wrong.
    * `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
    * `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
    * `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
    * `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.
    
    If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).
    
    **Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.
    
    **Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.
    
    Here's a very simple example of creating a custom Jump List:
    
    ```javascript
const {app} = require('electron')

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

### `app.makeSingleInstance(callback)`

* `callback` Funzione 
  * `argv` String[] - An array of the second instance's command line arguments
  * `workingDirectory` String - The second instance's working directory

Returns `Boolean`.

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Create myWindow, load the rest of the app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. Mappa a [`NSUtenteAttività.attivitàTipo`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `opzioni` Object 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Funzione 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMemoryInfo()` *Deprecated*

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGpuFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Restituisce `Booleano` - Se la chiamata ha avuto successo.

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `opzioni` Oggetto (opzionale) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
* `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
* `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
* `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Ad esempio:

```javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAboutPanelOptions(options)` *macOS*

* `opzioni` Object 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` *macOS*

Hides the dock icon.

### `app.dock.show()` *macOS*

Shows the dock icon.

### `app.dock.isVisible()` *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.