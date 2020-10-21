---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Il team Electron è entusiasta di annunciare che la versione stabile di Electron 4 è ora disponibile! Puoi installarlo da [electronjs.org](https://electronjs.org/) o da npm via `npm install electron@latest`. Il rilascio è pieno di aggiornamenti, correzioni e nuove funzionalità, e non vediamo l'ora di vedere cosa si costruisce con loro. Leggi di più per i dettagli su questa release, e per favore condividi qualsiasi feedback che hai come esplori!

---

## Che Cosa È Nuovo?

Una gran parte della funzionalità di Electron's è fornita da Chromium, Node.js, e V8, i componenti principali che compongono Electron. Come tale, un obiettivo chiave per il team Electron è quello di tenere il passo con le modifiche di questi progetti per quanto possibile, fornendo agli sviluppatori che costruiscono applicazioni Electron l'accesso alle nuove funzionalità web e JavaScript. A tal fine, Electron 4 dispone di importanti dossi della versione per ciascuno di questi componenti; Electron v4.0.0 include Cromo `69. .3497.106`, Nodo `10.11.0`, e V8 `6.9.427.24`.

Inoltre, Electron 4 include modifiche alle API specifiche per elettroni. Qui sotto puoi trovare un riassunto delle principali modifiche di Electron 4; per l'elenco completo delle modifiche, controlla il [Electron v4. .0 note di rilascio](https://github.com/electron/electron/releases/tag/v4.0.0).

### Disabilitare il modulo `remoto`

Ora hai la possibilità di disabilitare il modulo `remoto` per motivi di sicurezza. Il modulo può essere disabilitato per i tag `BrowserWindow`s e `webview`:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Vedi la documentazione [BrowserWindow](https://electronjs.org/docs/api/browser-window) and [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) per maggiori informazioni.

### Filtraggio `remote.require()` / `remote.getGlobal()` Richieste

Questa funzione è utile se non vuoi disattivare completamente il modulo `remoto` nel tuo processo di renderer o `webview` ma vorresti un controllo aggiuntivo su quali moduli possono essere richiesti via `remoto. equire`.

Quando è richiesto un modulo tramite `remoto. equiare` in un processo di renderer, un evento `remote-require` viene sollevato sull'app [`` modulo](https://electronjs.org/docs/api/app). È possibile chiamare `event.preventDefault()` sull'evento (il primo argomento) per evitare che il modulo venga caricato. L'istanza [`WebContents`](https://electronjs.org/docs/api/web-contents) dove la richiesta si è verificata è passata come secondo argomento, e il nome del modulo viene passato come terzo argomento. Lo stesso evento viene emesso anche nell'istanza `WebContents` , ma in questo caso gli unici argomenti sono l'evento e il nome del modulo. In entrambi i casi, è possibile restituire un valore personalizzato impostando il valore di `event.returnValue`.

```javascript
// Control `remote.require` from all WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Controlla `remote.require` da una specifica istanza di Contenuto Web:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

In modo simile, quando `remote.getGlobal(name)` viene chiamato, viene generato un evento `remote-get-global`. Questo funziona come l'evento `remote-require` : call `preventDefault()` per evitare che il globale venga restituito, e imposta `evento. eturnValue` per restituire un valore personalizzato.

```javascript
// Control `remote.getGlobal` from all WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// Controlla `remote.getGlobal` da una specifica istanza di Contenuto Web:
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Per ulteriori informazioni, vedere la seguente documentazione:

* [`remote.require`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`WebContents`](https://electronjs.org/docs/api/web-contents)

### Accesso JavaScript al Pannello Informazioni

Su macOS, ora puoi chiamare l'app `. howAboutPanel()` per mostrare programmaticamente il pannello Informazioni, proprio come fare clic sulla voce di menu creata tramite `{role: 'about'}`. Vedi la documentazione [`showAboutPanel`](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) per maggiori informazioni

### Controllare `WebContents` Background Throttling

`WebContents` istanze ora hanno un metodo `setBackgroundThrottling(permesso)` per abilitare o disabilitare la limitazione dei timer e delle animazioni quando la pagina è backgrounded.

```javascript
let win = new BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

Vedi [la documentazione `setBackgroundThrottling`](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) per maggiori informazioni.

## Breaking Changes

### Nessun supporto macOS 10.9

Chromium non supporta più macOS 10.9 (OS X Mavericks), e di conseguenza [Electron 4.0 e oltre non supporta né](https://github.com/electron/electron/pull/15357).

### Blocco Istanza Singola

In precedenza, per rendere la tua app un'applicazione singola istanza (garantendo che solo un'istanza della tua app sia in esecuzione in qualsiasi momento), si potrebbe utilizzare l'app `. akeSingleInstance()` method. A partire da Electron 4.0, è necessario utilizzare `app.requestSingleInstanceLock()`. Il valore di ritorno di questo metodo indica se questa istanza della tua applicazione ha ottenuto con successo il blocco. Se non è riuscito a ottenere il blocco, si può presumere che un'altra istanza della vostra applicazione è già in esecuzione con il lucchetto ed uscire immediatamente.

Per un esempio di utilizzo di `requestSingleInstanceLock()` e informazioni sul comportamento sfumato su varie piattaforme, [vedi la documentazione per l'app `. equestSingleInstanceLock()` e metodi correlati](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) e [ `seconda istanza` evento](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Quando si costruiscono moduli nativi per le finestre, la variabile `win_delay_load_hook` nel modulo `binding.gyp` deve essere true (che è il predefinito). Se questo hook non è presente, il modulo nativo non riesce a caricare su Windows, con un messaggio di errore come `Impossibile trovare il modulo`. [Vedi la guida per il modulo nativo](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) per maggiori informazioni.

## Deprecazioni

I seguenti cambiamenti di rottura sono pianificati per Electron 5.0, e quindi sono deprecati in Electron 4.0.

### Integrazione Node.js Disabilitata per `nativeWindowOpen`-ed Windows

A partire da Electron 5.0, le finestre figlie aperte con l'opzione `nativeWindowOpen` avranno sempre l'integrazione Node.js disabilitata.

### `webPreferences` Valori predefiniti

Quando si crea una nuova `BrowserWindow` con l'opzione `webPreferences` impostata, le seguenti `Preferenze web` opzioni predefinite sono deprecate a favore dei nuovi valori predefiniti elencati di seguito:

<div class="table table-ruled table-full-width">

<unk> Proprietà <unk> Predefinito Deprecato <unk> Nuovo Predefinito <unk>
<unk> ----------<unk> --------------------<unk> -------------<unk>
<unk> `contextIsolation` <unk> `false` <unk> `true` <unk>
<unk> `nodeIntegration` <unk> `true` <unk> `false` <unk>
<unk> `webviewTag` <unk> valore di `nodeIntegration` se impostato, altrimenti `true` <unk> `false` <unk>

</div>

Nota bene: esiste attualmente [un bug conosciuto (#9736)](https://github.com/electron/electron/issues/9736) che impedisce al tag `webview` di funzionare se `contextIsolation` è attivo. Tieni d'occhio il problema di GitHub per informazioni aggiornate!

Scopri di più sull'isolamento del contesto, l'integrazione del Nodo e il tag `webview` in [il documento di sicurezza Electron](https://electronjs.org/docs/tutorial/security).

Electron 4.0 userà ancora le impostazioni predefinite correnti, ma se non passi un valore esplicito per loro, vedrai un avviso di deprecazione. Per preparare la tua app per Electron 5.0, usa valori espliciti per queste opzioni. [Vedi i documenti `BrowserWindow`](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) per dettagli su ciascuna di queste opzioni.

### `webContents.findInPage(text[, options])`

Le opzioni `medialCapitalAsWordStart` e `wordStart` sono state deprecate in quanto rimosse a monte.

## Programma Feedback App

Il [App Feedback Program](https://electronjs.org/blog/app-feedback-program) che abbiamo istituito durante lo sviluppo di Electron 3. ha avuto successo, così abbiamo continuato durante lo sviluppo di 4.0 pure. Vorremmo estendere un ringraziamento massiccio a Atlassian, Discord, MS Team, OpenFin, Slack, Symphony, WhatsApp, e gli altri membri del programma per il loro coinvolgimento durante il 4. ciclo beta. Per saperne di più sull'App Feedback Program e per partecipare a future betas, [dai un'occhiata al nostro post sul nostro blog sul programma](https://electronjs.org/blog/app-feedback-program).

## Cosa È Successivo

A breve termine, ci si può aspettare che il team continui a concentrarsi sul tenere il passo con lo sviluppo dei principali componenti che compongono Electron, inclusi Cromo, Nodo e V8. Anche se siamo attenti a non fare promesse sulle date di rilascio, il nostro piano è il rilascio di nuove principali versioni di Electron con le nuove versioni di quei componenti circa trimestralmente. [Vedi il nostro documento di versionamento](https://electronjs.org/docs/tutorial/electron-versioning) per informazioni più dettagliate sul versionamento in Electron.

Per informazioni sui cambiamenti di rottura pianificati nelle prossime versioni di Electron, [consulta il nostro documento sui cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
