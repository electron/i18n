# Sicurezza, Funzioni Native e Tue Responsabilità

Come sviluppatori web, noi sfruttiamo spesso la forte rete di sicurezza del browser, il rischio associato con il codice che scriviamo è relativamente piccolo. I nostri siti web sono dotati in una sandbox di potenza limitata garantita e confidiamo nel fatto che i nostri utenti sfruttino un browser costruito da un grande team di ingegneri che sappiano rispondere velocemente a nuovi tratti di sicurezza.

Quando si lavora con Electron, è importante capire che Electron non è un browser web. Ti consente di costruire app desktop ricche di funzioni con tecnologie web familiari, ma il tuo codice esercita una potenza maggiore. JavaScript può accedere al file di sistema, alle shell utente ed altro. Ciò ti consente di costruire app native di alta qualità ma inerenti alla scala dei rischi di sicurezza con potenza addizionale garantita al tuo codice.

Detto questo, sii consapevole che mostrare contenuti arbitrari da fonti inaffidabili pone il severo rischio di sicurezza che Electron non è destinato a gestire. Infatti, le app più popolari di Electron (Atom, Slack, Visual Studio Code, etc) mostrano contenuti locali primariamente (o affidabili, contenuti remoti sicuri senza integrazione di Node), se la tua app esegue codice da una fonte online, è tua responsabilità assicurarti che il codice non sia maligno.

## Segnalazione Problemi Sicurezza

Per informazioni su come divulgare propriamente una vulnerabilità di Electron vedi [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Aggiornamenti e Problemi di Sicurezza di Chromium

Electron si tiene aggiornato con alternando rilasci di cromo. Per ulteriori informazioni, vedere il post del blog [di Electron Release Cadence](https://electronjs.org/blog/12-week-cadence).

## La Sicurezza È Responsabilità Di Tutti

È importante ricordare che la sicurezza della vostra applicazione Electron è il risultato della sicurezza generale della fondazione quadro (*Chromium*, *Node. s*), Electron stesso, tutte le dipendenze NPM e il tuo codice. Come tale, è vostra responsabilità seguire alcune importanti migliori pratiche :

* **Mantieni aggiornata la tua applicazione con l'ultima versione del framework Electron.** Quando rilascia il tuo prodotto, stai anche spedendo un pacchetto composto da Electron, Libreria condivisa Chromium e Node.js. Le vulnerabilità che influenzano questi componenti possono influire sulla sicurezza della tua applicazione. Aggiornando Electron all'ultima versione , assicurati che le vulnerabilità critiche (come *nodeIntegration bypassa*) siano già patched e non possano essere sfruttate nella tua applicazione. Per ulteriori informazioni, vedere "[Utilizzare una versione corrente di Electron](#17-use-a-current-version-of-electron)".

* **Valuta le tue dipendenze.** Mentre NPM fornisce mezzo milione di pacchetti riutilizzabili, è tua responsabilità scegliere librerie di terze parti attendibili. Se si utilizzano librerie obsolete colpite da vulnerabilità note o fare affidamento su codice mal mantenuto, la sicurezza dell'applicazione potrebbe essere in pericolo.

* **Adotta pratiche di codifica sicure.** La prima linea di difesa per la tua applicazione è il tuo codice. Vulnerabilità web comuni, come Scripting Cross-Site (XSS), hanno un maggiore impatto sulla sicurezza delle applicazioni Electron quindi è altamente raccomandato di adottare buone pratiche di sviluppo software sicure ed eseguire test di sicurezza.

## Isolamento Per Contenuto Non Fiduciato

Esiste un problema di sicurezza ogni volta che ricevi un codice da una sorgente non attendibile (ad esempio un server remoto) ed eseguirlo localmente. As an example, consider a remote website being displayed inside a default [`BrowserWindow`][browser-window]. Se un attaccante riesce in qualche modo a modificare detto contenuto (attaccando direttamente la sorgente , o seduti tra la tua app e la destinazione effettiva), essi saranno in grado di eseguire codice nativo sulla macchina dell'utente.

> :warning: Sotto nessuna circostanza dovreste caricare ed eseguire codice remoto con l'integrazione  Node.js abilitata. Usa solo file locali (impacchettati insieme alla tua app) per eseguire il codice Node.js. To display remote content, use the [`<webview>`][webview-tag] tag or [`BrowserView`][browser-view], make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Avvisi Sicurezza Electron

Da Electron 2.0, gli sviluppatori vedranno avvisi e raccomandazioni stampate nella console sviluppatore. Mostrano solo quando il nome binario è Electron, indicando che uno sviluppatore sta guardando attualmente alla console.

Puoi abilitare o disabilitare forzatamente questi avvisi impostando `ELECTRON_ENABLE_SECURITY_WARNINGS` o `ELECTRON_DISABLE_SECURITY_WARNINGS` sull'oggetto `process.env` o sull'oggetto `window`.

## Lista di controllo: Raccomandazioni di Sicurezza

Dovresti almeno seguire questi passaggi per migliorare la sicurezza della tua applicazione:

1. [Solo contenuti caricati sicuri](#1-only-load-secure-content)
2. [Disabilita l'integrazione Node.js in tutti i renderer che mostrano contenuti remoti](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Abilita integrazione contesto in tutti i renderer che mostrano contenuti remoti](#3-enable-context-isolation-for-remote-content)
4. [Usa `ses.impostaPermessoRichiestaProprietario()` in tutte le sessioni che caricano contenuti remoti](#4-handle-session-permission-requests-from-remote-content)
5. [Non disabilitare `Sicurezzaweb`](#5-do-not-disable-websecurity)
6. [Definisci un `Contenuto-Sicurezza-Politica`](#6-define-a-content-security-policy) ed usa regole restrittive (i.e. `script-autoricerca'`)
7. [Non impostare `consentiEsecuzioneContenutoInsicuro` in `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Non abilitare funzioni sperimentali](#8-do-not-enable-experimental-features)
9. [Non utilizzare `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Non usare `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verifica opzioni e parametri](#11-verify-webview-options-before-creation)
12. [Disabilita o limita la navigazione](#12-disable-or-limit-navigation)
13. [Disabilita o limita la creazione di nuove finestre](#13-disable-or-limit-creation-of-new-windows)
14. [Non utilizzare `openExternal` con contenuti non attendibili](#14-do-not-use-openexternal-with-untrusted-content)
15. [Disabilita il modulo `remoto`](#15-disable-the-remote-module)
16. [Filtra il modulo `remoto`](#16-filter-the-remote-module)
17. [Usa una versione corrente di Electron](#17-use-a-current-version-of-electron)

Per automatizzare il rilevamento di errate configurazioni e modelli insicuri, è possibile utilizzare [elettronegatività](https://github.com/doyensec/electronegativity). Per ulteriori dettagli sulle potenziali debolezze e bug di implementazione quando sviluppano applicazioni utilizzando Electron, fai riferimento a questa [guida per sviluppatori e auditor](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Carica Solo Contenuti Sicuri

Ogni risorsa non inclusa con la app dovrebbe essere caricata usando un protocollo sicuro come `HTTPS`. In altre parole, non usare protocolli non sicuri come `HTTP`. Similarmente, raccomandiamo di usare `WSS` oltre `WS`, `FTPS` oltre `FTP` e così via.

### Perchè?

`HTTPS` ha tre benefici principali:

1) Autentica i server remoti, assicurando la connessione della tua app all'host corretto di un impersonatore. 2) Assicura l'integrità dei dati, certificando che i dati non sono stati modificati mentre in transito tra la tua app e l'host. 3) Cripta il traffico tra il tuo utente e l'host di destinazione, rendendo più difficile fare un eavesdrop sull'informazione inviata tra la tua app e l'host.

### Come?

```js
// Male
browserWindow.loadURL('http://example.com')

// Bene
browserWindow.loadURL('https://example.com')
```

```html<!-- Bene --><script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css"><!-- Bene --><script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Non abilitare l'integrazione di Node.js per i contenuti remoti

_Questa raccomandazione è il comportamento predefinito in Electron dal 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) that loads remote content. L'obiettivo è di limitare la forza che tu garantisci al contenuto remoto, ciò rendendo drammaticamente più difficile per un malintenzionato di danneggiare l'utente, dovrebbero guadagnare l'abilità di eseguire JavaScript sul tuo sito.

Dopo ciò, puoi garantire permessi aggiuntivi per host specifici. Ad esempio, se stai aprendo una Finestra di navigazione indicata su `https://esempio. om/`, è possibile dare quel sito web esattamente le capacità di cui ha bisogno, ma non più.

### Perchè?

Un attacco cross-site-scripting (XSS) è più pericoloso se un aggressore può saltare fuori dal processo di renderer ed eseguire il codice sul computer dell'utente. Gli attacchi cross-site-scripting sono abbastanza comuni - e mentre un problema, il loro potere è di solito limitato a messaggistica con il sito web su cui sono eseguiti. Disabilitare l'integrazione di Node.js aiuta a impedire che un XSS venga escalated in un cosiddetto attacco "Remote Code Execution" (RCE).

### Come?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html<!-- Cattivo --><webview nodeIntegration src="page.html"></webview><!-- Buono --><webview src="page.html"></webview>
```

Quando si disabilita l'integrazione di Node.js, è ancora possibile esporre le API al tuo sito web che consumano moduli o funzionalità di Node.js. Ricarica gli script continua ad avere accesso per `richiedono` e altri Node. s funzionalità, consentendo agli sviluppatori di esporre un'API personalizzata a contenuti caricati da remoto.

Nell'esempio seguente precarica lo script, il sito web caricato successivamente avrà accesso a un metodo `window.readConfig()` , ma nessuna funzionalità di Node.js.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Abilita l'isolamento contestuale per i contenuti remoti

L'isolamento del contesto è una funzione Electron che permette agli sviluppatori di eseguire il codice negli script precaricati e nelle API Electron in un contesto JavaScript dedicato. In pratica, questo significa che oggetti globali come `Array.prototype. ush` o `JSON.parse` non può essere modificato dagli script in esecuzione nel processo di renderer.

Electron utilizza la stessa tecnologia di Chromium [Content Script](https://developer.chrome.com/extensions/content_scripts#execution-environment) per abilitare questo comportamento.

Even when `nodeIntegration: false` is used, to truly enforce strong isolation and prevent the use of Node primitives `contextIsolation` **must** also be used.

### Perché & Come?

Per ulteriori informazioni su ciò che è `contextIsolation` e su come attivarlo si prega di vedere il nostro documento dedicato [Context Isolation](context-isolation.md).

## 4) Gestisci Richieste Di Permesso Sessione Dal Contenuto Remoto

Potresti aver visto le richieste di autorizzazione durante l'utilizzo di Chrome: Essi appaiono ogni volta che il sito web tenta di utilizzare una funzionalità che l'utente deve approvare manualmente ( come le notifiche).

L'API si basa sulle autorizzazioni [Chromium API](https://developer.chrome.com/extensions/permissions) e implementa gli stessi tipi di permessi.

### Perchè?

Per impostazione predefinita, Electron approverà automaticamente tutte le richieste di autorizzazione, a meno che lo sviluppatore non abbia configurato manualmente un gestore personalizzato. Mentre un solido default, gli sviluppatori coscienti della sicurezza potrebbero voler assumere il contrario.

### Come?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Non Disattivare WebSecurity

_La raccomandazione è predefinita di ElectronName_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) disables crucial security features.

Non disabilitare `webSecurity` nelle applicazioni di produzione.

### Perchè?

Disabilitare `webSecurity` disabiliterà la stessa politica di origine e imposterà la proprietà `allowRunningInsecureContent` a `true`. In altre parole, permette l'esecuzione di codice non sicuro da diversi domini.

### Come?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Buona
const mainWindow = new BrowserWindow()
```

```html<!-- Cattivo --><webview disablewebsecurity src="page.html"></webview><!-- Buono --><webview src="page.html"></webview>
```

## 6) Definire una politica di sicurezza dei contenuti

Una politica di sicurezza dei contenuti (CSP) è un ulteriore livello di protezione contro attacchi cross-site-scripting e attacchi di iniezione dei dati. Si consiglia che siano abilitati da qualsiasi sito web caricato all'interno di Electron.

### Perchè?

CSP consente al server che serve i contenuti di limitare e controllare le risorse Electron può caricare per quella data pagina web. `https://example.com` dovrebbe essere permesso di caricare gli script dalle origini che hai definito durante gli script da `https://evil. ttacker.com` non dovrebbe essere permesso di funzionare. Definire un CSP è un modo semplice per migliorare la sicurezza della tua applicazione.

Il seguente CSP permetterà a Electron di eseguire script dal sito corrente e da `apis.example.com`.

```plaintext
// Cattivo
Content-Security-Policy: '*'

// Buono
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### Intestazione HTTP CSP

Electron rispetta l'intestazione [`Content-Security-Policy` HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) che può essere impostata utilizzando il [`webRequest.onHeadersRicevuto`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) gestore:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

Il meccanismo di consegna preferito del CSP è un'intestazione HTTP, tuttavia non è possibile usare questo metodo durante il caricamento di una risorsa utilizzando il protocollo `file://`. Può essere utile in alcuni casi, ad esempio utilizzando il protocollo `file://` , per impostare una policy su una pagina direttamente nel markup usando un tag `<meta>`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Non impostare `allowRunningInsecureContent` a `true`

_La raccomandazione è predefinita di ElectronName_

Per impostazione predefinita, Electron non permetterà ai siti web caricati su `HTTPS` di caricare e eseguire script, CSS, o plugin da fonti non sicure (`HTTP`). Impostando la proprietà `allowRunningInsecureContent` su `true` disabilita tale protezione.

Il caricamento dell'HTML iniziale di un sito web su `HTTPS` e il tentativo di caricare risorse successive tramite `HTTP` è noto anche come "contenuto misto".

### Perchè?

Il caricamento del contenuto su `HTTPS` garantisce l'autenticità e l'integrità delle risorse caricate durante la crittografia del traffico stesso. Vedi la sezione su [che mostra solo contenuti sicuri](#1-only-load-secure-content) per maggiori dettagli.

### Come?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 8) Non Abilitare Funzionalità Sperimentali

_La raccomandazione è predefinita di ElectronName_

Gli utenti avanzati di Electron possono abilitare le funzioni sperimentali del cromo utilizzando la proprietà `experimentalFeatures`.

### Perchè?

Le caratteristiche sperimentali sono, come suggerisce il nome, sperimentali e non sono state abilitate per tutti gli utenti di Cromo. Inoltre, il loro impatto su Electron nel suo insieme probabilmente non è stato testato.

Esistono casi d'uso legittimi, ma a meno che tu non sappia cosa stai facendo, non dovresti abilitare questa proprietà.

### Come?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 9) Non utilizzare `enableBlinkFeatures`

_La raccomandazione è predefinita di ElectronName_

Blink è il nome del motore di rendering dietro Chromium. Come con `experimentalFeatures`, la proprietà `enableBlinkFeatures` consente agli sviluppatori di abilitare funzionalità disabilitate per impostazione predefinita.

### Perchè?

In generale, ci sono probabilmente buoni motivi se una funzione non è stata abilitata per impostazione predefinita. Esistono casi d'uso legittimi per l'attivazione di caratteristiche specifiche. Come sviluppatore , dovresti sapere esattamente perché devi abilitare una funzione, quali sono le ramificazioni e come influiscono sulla sicurezza della tua applicazione. In nessuna circostanza dovresti abilitare le funzioni speculativamente.

### Come?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Buona
const mainWindow = new BrowserWindow()
```

## 10) Non utilizzare `allowpopups`

_La raccomandazione è predefinita di ElectronName_

If you are using [`<webview>`][webview-tag], you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`][browser-window] using the `window.open()` method. `<webview>` tag non sono altrimenti autorizzati a creare nuove finestre.

### Perchè?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`][browser-window] by default. Questo segue il principio di accesso minimamente richiesto: Non lasciare che un sito web crei nuovi popup a meno che sai che ha bisogno di quella funzione.

### Come?

```html<!-- Cattivo --><webview allowpopups src="page.html"></webview><!-- Buono --><webview src="page.html"></webview>
```

## 11) Verifica Le Opzioni Di WebView Prima Della Creazione

Una WebView creata in un processo di rendering che non ha abilitato l'integrazione di Node.js non sarà in grado di abilitare l'integrazione stessa. Tuttavia, una WebView creerà sempre un processo di rendering indipendente con le sue `preferenze web`.

It is a good idea to control the creation of new [`<webview>`][webview-tag] tags from the main process and to verify that their webPreferences do not disable security features.

### Perchè?

Dal `<webview>` vivono nel DOM, possono essere creati da uno script in esecuzione sul tuo sito anche se Node. s integrazione è altrimenti disabilitata.

Electron consente agli sviluppatori di disabilitare varie funzionalità di sicurezza che controllano un processo di renderer. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`][webview-tag] tags.

### Come?

Before a [`<webview>`][webview-tag] tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Usa l'evento per impedire la creazione di `webViews` con opzioni potenzialmente insicure.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Anche in questo caso, questo elenco minimizza semplicemente il rischio, non rimuoverlo. Se il tuo obiettivo è quello di visualizzare un sito web, un browser sarà un'opzione più sicura.

## 12) Disattivare o limitare la navigazione

Se la tua app non ha bisogno di navigare o solo di navigare su pagine conosciute, è una buona idea limitare la navigazione a quel campo di applicazione conosciuto, impedendo qualsiasi altro tipo di navigazione.

### Perchè?

La navigazione è un vettore di attacco comune. Se un utente malintenzionato può convincere la tua app a navigare lontano dalla sua pagina corrente, possono eventualmente forzare la tua app ad aprire siti web su Internet. Anche se i tuoi `contenuti web` sono configurati per essere più sicuri (come avere `nodeIntegration` disabilitato o `contextIsolation` abilitato), ottenere la tua app per aprire un sito web casuale renderà il lavoro di sfruttare la tua app molto più facile.

Un modello di attacco comune è che l'attaccante convince gli utenti della tua app a interagire con l'app in modo che si sposti su una delle pagine dell'attaccante. Questo viene solitamente fatto tramite link, plugin o altri contenuti generati dall'utente.

### Come?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`][will-navigate] handler. Se sai a quali pagine la tua app potrebbe navigare, controlla l'URL nel gestore dell'evento e lascia che la navigazione avvenga solo se corrisponde agli URL che ti aspetti.

Si consiglia di utilizzare l'analizzatore di Node per gli URL. I semplici confronti di stringhe possono a volte essere ingannati - un `startsWith('https://example.com')` test lascerebbe `https://example.com.attacker.com` attraverso.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Disabilita o limita la creazione di nuove finestre

Se hai un set di finestre conosciuto, è una buona idea limitare la creazione di finestre aggiuntive nella tua app.

### Perchè?

Proprio come la navigazione, la creazione di nuovi `contenuti web` è un vettore di attacco comune. Gli attacchi tentano di convincere la tua app a creare nuove finestre, fotogrammi, o altri processi di rendering con più privilegi di quelli che avevano prima; o con le pagine aperte che non potevano aprire prima.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. Questo è comunemente il caso per le applicazioni che aprono una `BrowserWindow` e non hanno bisogno di aprire un numero arbitrario di finestre aggiuntive al runtime.

### Come?

[`webContents`][web-contents] will delegate to its [window open handler][window-open-handler] before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) Non utilizzare `openEsterno` con contenuto non attendibile

Shell's [`openExternal`][open-external] allows opening a given protocol URI with the desktop's native utilities. Su macOS, per esempio, questa funzione è simile all'utilità di comando `open` del terminale e aprirà l'applicazione specifica in base all'associazione URI e filetype.

### Perchè?

Improper use of [`openExternal`][open-external] can be leveraged to compromise the user's host. Quando openExternal viene utilizzato con contenuti non attendibili, può essere leveraged per eseguire comandi arbitrari.

### Come?

```js
//  Bad
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
//  Good
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Disabilita il modulo `remoto`

Il modulo `remote` fornisce un modo per i processi di rendering per accedere alle API normalmente disponibili solo nel processo principale. Utilizzandolo, un renderer può invocare metodi di un oggetto di processo principale senza inviare esplicitamente messaggi interprocessi. Se l'applicazione desktop non esegue contenuti non attendibili, questo può essere un modo utile per avere l'accesso ai processi di rendering e lavorare con i moduli che sono disponibili solo per il processo principale, come moduli relativi all'interfaccia grafica (dialoghi, menu, ecc.).

However, if your app can run untrusted content and even if you [sandbox][sandbox] your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. Pertanto, dovrebbe essere disabilitato in tali circostanze.

### Perchè?

`remote` utilizza un canale IPC interno per comunicare con il processo principale. Gli attacchi "Prototype pollution" possono consentire l'accesso al codice dannoso al canale interno IPC, che può quindi essere utilizzato per sfuggire alla sandbox imitando `remoti` messaggi IPC e ottenendo l'accesso ai moduli di processo principali in esecuzione con privilegi più alti.

Inoltre, è possibile precaricare gli script per accidentalmente perdite di moduli su un renderer a sandbox . Perdere `remote` armi codice dannoso con una moltitudine di moduli di processo principali con cui eseguire un attacco.

Disabilitare il modulo `remoto` elimina questi vettori di attacco. Abilitando l'isolamento contestuale impedisce anche agli attacchi di "inquinamento prototipo" di successo.

### Come?

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview enableremotemodule="true" src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

> **Note:** The default value of `enableRemoteModule` is `false` starting from Electron 10. For prior versions, you need to explicitly disable the `remote` module by the means above.

## 16) Filtra il modulo `remoto`

Se non riesci a disabilitare il modulo `remoto` , dovresti filtrare i globali, Node, e moduli Electron (cosiddetti built-ins) accessibili tramite `remote` che la tua applicazione non richiede. Questo può essere fatto bloccando alcuni moduli interamente e sostituendo altri con proxy che espongono solo le funzionalità di cui la tua app ha bisogno.

### Perchè?

Grazie ai privilegi di accesso al sistema del processo principale, la funzionalità fornita dai moduli di processo principali può essere pericolosa nelle mani di codice dannoso in esecuzione in un processo di renderer compromesso. Limitando l'insieme di moduli accessibili al minimo che la tua app ha bisogno e filtrando gli altri, riduci il set di strumenti che il codice dannoso può usare per attaccare il sistema.

Si noti che l'opzione più sicura è quella di [disabilitare completamente il modulo remoto](#15-disable-the-remote-module). Se si sceglie di filtrare l'accesso piuttosto che disabilitare completamente il modulo, è necessario essere molto attenti a garantire che nessuna escalation di privilegio è possibile attraverso i moduli che consentite oltre il filtro.

### Come?

```js
const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) Usa una versione corrente di Electron

Dovresti sforzarti di utilizzare sempre l'ultima versione disponibile di Electron. Ogni volta che viene rilasciata una nuova versione principale, dovresti tentare di aggiornare la tua app il più rapidamente possibile.

### Perchè?

Un'applicazione costruita con una versione più vecchia di Electron, Cromo e Node. s è un obiettivo più facile di un'applicazione che sta utilizzando versioni più recenti di quei componenti. In generale, i problemi di sicurezza e gli exploit per le versioni precedenti di Cromo e Node.js sono più ampiamente disponibili.

Sia Chromium che Node.js sono impressionanti imprese di ingegneria costruita da migliaia di sviluppatori di talento. Data la loro popolarità, la loro sicurezza è accuratamente testata e analizzata da ricercatori di sicurezza ugualmente qualificati. Many of those researchers [disclose vulnerabilities responsibly][responsible-disclosure], which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. La tua applicazione sarà più sicura se sta eseguendo una versione recente di Electron (e quindi Chromium e Node. s) per per i quali le potenziali questioni di sicurezza non sono così ampiamente note.

[browser-window]: ../api/browser-window.md

[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[window-open-handler]: ../api/web-contents.md#contentssetwindowopenhandlerhandler
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options
[sandbox]: ../api/sandbox-option.md
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
