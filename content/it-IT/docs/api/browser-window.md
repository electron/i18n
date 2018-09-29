# BrowserWindow

> Crea e controlla le finestre del browser.

Processo: [Main](../glossary.md#main-process)

```javascript
// Nel processo principale(main).
const {BrowserWindow} = require('electron')

// O usa 'remote' dai processi render.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

// Carica un URL remoto
win.loadURL('https://github.com')

// O carica un file HTML
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Finestra senza bordi

Per creare una finestra senza chrome, o una finestra trasparente in forma arbitraria, puoi usare l'API [Frameless Window](frameless-window.md).

## Mostrare la finestra in maniera elegante

Quando si carica una pagina direttamente nella finestra, l'utente potrebbe vedere la pagina caricare in modo incrementale, che non è una esperienza buona per un'app nativa. Per mostrare la finestra senza flash visuale esistono due soluzioni per due differenti situazioni.

### Utilizzare l'evento `ready-to-show`

Durante il caricamento della pagina, l'evento `ready-to-show` verrà emesso quando il Renderer Process ha eseguito il rendering della pagina per la prima volta e se la finestra non è stata ancora visualizzata. Mostrare la finestra dopo questo evento non mostrerà flash visuali:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Questo evento è di solito emesso dopo l'evento `did-finish-load`, ma per le pagine con molte risorse potrebbe essere emesso prima di `did-finish-load`.

### Impostare il colore di sfondo(`backgroundColor`)

Per un'app complessa, l'evento `ready-to-show` potrebbe essere emessa troppo tardi rendendo l'app lenta. In questo caso, è raccomandato mostrare la finestra immediatamente ed usare un colore di sfondo(`backgroundColor`) simile a quello della tua app:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Nota come anche per le app è usato l'evento `ready-to-show`, è raccomandato impostare il `backgroundColor` per far sembrare le app più native.

## Finestra padre e figlio

Usando l'opzione `parent`, puoi creare finestre figlie, impostando una relazione gerarchica tra le finesre:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

La finestra `child` sarà sempre mostrata sopra la finestra `top`.

### Finestre modali

Una finestra modale è una finestra figlia che disabilita le finestre padri, per crearne una devi impostare entrambe le opzioni `parent` e `modal`:

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### Visibilità pagina

L' [Api di Visibilità Pagina](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) lavora come segue:

* Su tutte le piattaforme, lo stato di visibilità traccia se la finestra è nascosta/minimizzata o no.
* In aggiunta, su macOS, lo stato di visibilità traccia anche lo stato di occlusione della finestra. Se la finestra è occlusa (totalmente coperta) da un'altra, lo stato di visibilità sarà nascosta (`nascosta`). Su altre piattaforme, lo stato di visibilità sarà `hidden` solo quando la finestra è minimizzata o nascosta esplicitamente con `win.hide()`.
* Se una nuova `BrowserWindow` è stata creata con `show: false`, lo stato di visibilità iniziale sarà `visibile` nonostante la finestra risulti essere nascosta.
* Se il `backgroundThrottling` è disabilitato, lo stato di visibilità rimarrà `visible` anche se la finestra è minimizzata, occlusa o nascosta.

Si raccomanda di mettere in pausa le operazioni dispendiose quando lo stato di visibilità è `hidden` per minimizzare il consumo energetico.

### Avvisi di piattaforma

* Su macOS le finestre modali saranno mostrate come fogli allegate alla finestra genitore.
* Su macOS le finestre figlie manterranno le proprie posizioni relative alla finestra genitore quando questa si muove, mentre su Windows e Linux queste non si muoveranno.
* Su Windows non è supportato il cambiamento dinamico delle finestre genitori.
* Su Linux il tipo di finestre modali sarà cambiato in `dialog`.
* Su Linux molti ambienti desktop non supportano il nascondere una finestra modale.

## Classe: BrowserWindow

> Crea e controlla le finestre del browser.

Processo: [Main](../glossary.md#main-process)

`BrowserWindow` è un [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Crea una nuova Finestra `BrowserWindow` con proprietà native come da `options`.

### `new BrowserWindow([options])`

* `options` Object (opzionale) 
  * `width` Intero (opzionale) - La larghezza in pixel della finestra. Di default è di `800`.
  * `height` Intero (opzionale) - L'altezza in pixel della finestra. Di default è di `600`.
  * `x` Intero (opzionale) (**richiesto** se è usato y) - Offset sinistro della finestra dallo schermo. Di default è al centro della finestra.
  * `y` Intero (opzionale) (**richiesto** se è usato x) - L'offset superiore della finestra dallo schermo. Di default è al centro della finestra.
  * `useContentSize` Booleano (opzionale) - La `width` e l'`height` saranno usate come dimensioni della pagina web, il che vuol dire che la dimensione attuale della finestra includerà le dimensioni della cornice della finestra ed è lievemente più grande. Di default è `false`.
  * `center` Boolean (opzionale) - Mostra la finestra al centro dello schermo.
  * `minWidth` Intero (opzionale) - Larghezza minima della finestra. Di default è `0`.
  * `minHeight` Intero (opzionale) - Altezza minima della finestra. Di default è `0`.
  * `maxWidth` Intero (opzionale) - Larghezza massima della finestra. Di default non ha limiti.
  * `maxHeight` Intero (opzionale) - Altezza massima della finestra. Di default è senza limiti.
  * `resizable` Boolean (opzione) - Se la finestra è ridimensionabile. Di default è `true`.
  * `movable` Boolean (opzionale) - Se la finestra è mobile. Non è implementato su Linux. Di default è `true`.
  * `minimizable` Boolean (opzionale) - Se la finestra è minimizzabile. Non implementato su Linux. Di default è `true`.
  * `maximizable` Boolean (opzionale) - Se la finestra è massimizzabile. Non implementato su Linux. Di default è `true`.
  * `closable` Boolean (opzionale) - Se la finestra è chiudibile. Non implementato su Linux. Di default è `true`.
  * `focusable` Boolean (opzionale) - Se la finestra è focalizzabile. Di default è `true`. Su Windows impostando `focusable: false` implica anche l'impostazione `skipTaskbar: true`. Su Linux, impostando `focusable: false` blocca l'interazione della finestra con il wm, così la finestra resterà sempre in primo piano rispetto alle aree di lavoro.
  * `alwaysOnTop` Boolean (opzionale) - Se la finestra dovrebbe sempre rimanere al top delle altre finestre. Di default è `false`.
  * `fullscreen` Boolean (opzionale) - Se la finestra dovrebbe mostrarsi a schermo intero. Quando esplicitamente impostati a `false` il pulsante schermo intero sarà nascosto o disabilitato su macOS. Di default è `false`.
  * `fullscreenable` Boolean (opzionale) - Se la finestra è impostabile in modalità schermo intero. Su macOS, anche se il pulsante massimizza/ingrandisci potrebbe impostare la modalità schermo intero o massimizza finestra. Il valore predefinito è `true`.
  * `simpleFullscreen` Boolean (opzionale) - Modalità a schermo intero su macOS pre-Lion. Default è `false`.
  * `skipTaskbar` Boolean (opzionale) - Se mostrare la finestra nella taskbar. Di default è `false`.
  * `kiosk` Boolean (opzionale) - Modalità kiosk. Di default è `false`.
  * `title` String (opzionale) Titolo di default della finestra. Di default è `"Electron"`.
  * `icon` ([>NativeImage](native-image.md) | Stringa) (opzionale) - L'icona della finestra. Su Windows si raccomanda di usare le icone `ICO` per ottenere migliori effetti visuali, puoi anche lasciarlo non impostato, così sarà usata l'icona dell'eseguibile.
  * `show` Boolean (opzionale) - Se la finestra deve essere visualizzata quando creata. Di default è `true`.
  * `frame` Boolean (opzionale) - Specifica `false` per creare una [Finestra senza bordi](frameless-window.md). Di default è `true`.
  * `parent` BrowserWindow (opzionale) - Specifica la finestra genitore. Di default è `null`.
  * `modal` Boolean (opzionale) - Se si tratta di una finestra modale. Funziona solo se la finestra è figlia. Di default è `false`.
  * `acceptFirstMouse` Boolean (opzionale) - Se la web view accetta un singolo evento mouse-down che simultaneamente attiva la finestra. Di default è `false`.
  * `disableAutoHideCursor` Boolean (opzionale) - Se nascondere il cursore in digitazione. Di default è `false`.
  * `autoHideMenuBar` Boolean (opzionale) - Nascondi automaticamente la barra dei menu senza che il tasto `Alt` sia premuto. Di default è `false`.
  * `enableLargerThanScreen` Boolean (opzionale) - Abilita la finestra ad un ridimensionamento più elevato dello schermo. Di default è `false`.
  * `backgroundColor` String (opzionale) - Colore di sfondo della finestra rappresentato come valore esadecimale, come `#66CD00` o `#FFF` o `#80FFFFFF` (la trasparenza è supportata). Di default è `#FFF` (bianco). Se `transparent` è impostato su `true`, solo valori con valori alfa trasparenti (`#00-------`) o opachi (`#FF-----`) saranno rispettati.
  * `hasShadow` Boolean (opzionale) - Specifica se la finestra debba supportare l'ombreggiamento. Questa impostazione è solo implementata per macOS. Di default è `true`.
  * `opacity` Number (opzionale) - Imposta l'opacità iniziale della finestra, tra 0.0 (completamente trasparente) e 1.0 (completamente opaco). Questo è implementato solo su Windows e macOS.
  * `darkTheme` Boolean (opzionale) - Forza l'utilizzo del tema scuro per la finestra, funziona solo su alcuni ambienti desktop GTK+3. Di default è `false`.
  * `transparent` Boolean (opzionale) - rende la finestra [trasparente](frameless-window.md). Valore predefinito è `false`.
  * `type` String (opzionale): il tipo di finestra, impostazione predefinita è normale finestra. Vedi di più su questo qui sotto.
  * `titleBarStyle` String (opzionale) - lo stile della barra del titolo della finestra. Impostazione predefinita è `default`. I valori possibili sono: 
    * `default` - risultato di colore grigio opaco come barra del titolo del Mac.
    * `hidden` - genera una barra del titolo nascosta e una finestra a tutto schermo per il contenuto e inoltre la barra del titolo contiene nell'angolo in alto a sinistra i tipici controlli per la finestra ("semaforo").
    * `hiddenInset` - Nasconde la barra del titolo, permettendone un aspetto alternativo. I pulsanti a semaforo sono leggermente inseriti verso il bordo della finestra.
    * `customButtonsOnHover` Boolean (opzionale) - Permette di creare bottoni di chiusura, riduci a icona, e schermo intero personalizzati per finestre senza bordo su macOS. Questi pulsanti non verranno visualizzati se non si posiziona il puntatore del mouse in alto a sinistra nella finestra. Questi pulsanti personalizzati prevengono problemi con gli eventi del mouse che si verificano con lo i pulsanti standard della barra degli strumenti di una finestra. **Note:** Questa opzione è attualmente sperimentale.
  * `fullscreenWindowTitle` Boolean (opzionale) - Mostra il titolo nella barra del titolo in modalità a schermo intero su macOS per tutte le opzioni di `titleBarStyle`. Il valore predefinito è `false</ 0>.</li>
<li><code>thickFrame` Boolean (opzionale) - Usa lo stile `WS_THICKFRAME` per finestre senza bordi su Windows, che aggiunge un bordo standard. Impostandolo a `false` le animazioni e le ombre della finestra. Il valore predefinito è `true`.
  * `vibrancy` String (opzionale) - Aggiunge un effetto di trasparenza sulla finestra, solo su macOS. Può essere `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Si prega di notare che utilizzando `frame: false` in combinazione con un valore di trasparenza è necessario utilizzare anche il non predefinito `titleBarStyle</ 0>.</li>
<li><code>zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Se `true`, la finestra crescerà alla larghezza preferita della pagina web ingrandita, `false` lo causerà sull'ingrandimento della larghezza dello schermo. Questo avrà effetto inoltre sul comportamento di `maximize()` quando chiamata direttamente. Di default è `false`.
  * `tabbingIdentifier` String (opzionale) - Nome del gruppo di schede, permette la finestra come scheda nativa di macOS da 10.12+. Windows con lo stesso identificatore di scheda verrà raggruppato insieme. Questo aggiunge anche un nuovo pulsante nativo per una nuova scheda alla barra delle schede, consentendo l'`app` e la finestra di ricevere l'evento `new-window-for-tab`.
  * `webPreferences` Object (opzionale) - Impostazioni delle funzionalità della pagina web. 
    * `devTools` Boolean (opzionale) - Consente di abilitare gli strumenti di sviluppo. Se impostato su `false`, non sarà possibilite usare `BrowserWindow.webContents.openDevTools()` per aprire gli strumenti di sviluppo. Il valore predefinito è `true`.
    * `nodeIntegration` Boolean (opzionale) - Abilita le integrazioni con Node. Il valore predefinito è `true`.
    * `nodeIntegration` Boolean (opzionale) - Abilita le integrazioni con Node. Il valore predefinito è `true`. Il valore predefinito è `false`. Maggiori informazioni possono essere trovate su [Multithreading](../tutorial/multithreading.md).
    * `preload` String (opzionale) - Specifica uno script che verrà caricato prima che vengano eseguiti gli script della pagina. Questi script avranno sempre accesso alle API di Node, non importa se l'integrazione con Node è attivata o disattivata. Il valore dovrebbe essere il percorso assoluto del file allo script. Quando l'integrazione di Node è disattivata, lo script di `preload` può reintrodurre dei simboli di portata globale. Vedi l'esempio [qua](process.md#event-loaded).
    * `sandbox` Boolean (opzionale) - Se impostato, questo renderà sandbox il renderer associato alla finestra, rendendolo compatibile con Chromium Sandbox a livello di sistema operativo e disabilita il motore di Node.js. Questo non è uguale all'opzione `nodeIntegration` e le API disponibili per lo script di precaricamento sono più limitati. Maggiori informazioni sull'opzione [qui](sandbox-option.md). **Nota:** Questa opzione è attualmente sperimentale e potrebbe cambiare o essere rimossa nelle versioni future di Electron.
    * `session` [Session](session.md#class-session) (opzionale) - Imposta la sessione utilizzata dalla pagina. Invece di passare direttamente l'oggetto Session, puoi anche scegliere di usare l'opzione ` partition `, che accetta una stringa di partizione. Quando sia la `session` sia la `partition` sono fornite, la `session` sarà preferita. Di default è la default session.
    * `partition` String (opzionale) - Imposta la sessione utilizzata dalla pagina in base alla stringa di partizione della sessione. Se `partition` inizia con `persist:`, la pagina userà una sessione persistente disponibile per tutte le pagine dell'app con la stessa `partition`. Se non c'è un prefisso `persist: `, la pagina userà una sessione in memoria. Assegnando la stessa `partition`, è possibile condividere per più pagine la stessa sessione. Di default è la default session.
    * ` affinity ` String (opzionale) - Se specificato, le pagine web con lo stesso ` affinity ` verranno eseguite nello stesso processo di rendering. Si noti che a causa del riutilizzo il processo di rendering, anche alcune opzioni ` webPreferences ` saranno condivise tra le pagine Web anche quando hai specificato valori diversi per loro, inclusi, ma non limitati da ` preload`, ` sandbox ` e ` nodeIntegration `. Pertanto, si consiglia di utilizzare esattamente le stesse ` WebPreferences` per le pagine Web con la stessa `affinity`. *Questa proprietà è sperimentale*
    * `zoomFactor` Number (opzionale) - Il fattore di zoom predefinito della pagina, ` 3.0 ` rappresenta il ` 300%`. L'impostazione predefinita è ` 1.0 `.
    * ` javascript ` Boolean (opzionale) - Abilita il supporto JavaScript. L'impostazione predefinita è ` true `.
    * ` webSecurity ` Boolean (opzionale) - Quando è ` false `, esso disabiliterà la politica della stessa origine (di solito utilizzando siti Web di test da parte di persone), e impostata ` allowRunningInsecureContent ` a ` true ` se questa opzione non è stata impostata dall'utente. Il valore predefinito è `true`.
    * ` allowRunningInsecureContent ` Boolean (facoltativo): consente l'esecuzione da una pagina Https: JavaScript, CSS o plugin da URL http. Il valore predefinito è ` falso `.
    * `images` Boolean (opzionale) - Abilita il support alle immagini. Il valore predefinito è `true`.
    * ` textAreasAreResizable ` Boolean (opzionale) - Rende ridimensionabili gli elementi TextArea. Il valore predefinito è ` true`.
    * ` webgl ` Boolean (opzionale) - Abilita il supporto WebGL. L'impostazione predefinita è ` true `.
    * ` webaudio ` Boolean (opzionale) - Abilita il supporto WebAudio. L'impostazione predefinita è ` true `.
    * ` plugins ` Boolean (opzionale) - Se i plug-in devono essere abilitati. Il valore predefinito è ` false`.
    * ` experimentalFeatures ` Boolean (opzionale): abilita le funzionalità sperimentali di Chromium. Il valore predefinito è ` false`.
    * ` experimentalCanvasFeatures ` Boolean (facoltativo): abilita i canvas sperimentali di Chromium. Il valore predefinito è ` false`.
    * ` scrollBounce ` Boolean (opzionale) - Abilita l'effetto bounce di scorrimento (effetto gomma) su macOS. Il valore predefinito è ` false`.
    * `enableBlinkFeatures` String (opzionale) - Una lista di stringhe caratteristiche separate da `,`, come `CSSVariables,KeyboardEventKey` da abilitare. L'elenco completo delle stringe supportate si possono trovare nel file [ RuntimeEnabledFeatures.json5 ](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * ` disableBlinkFeatures ` String (opzionale) - Un elenco di stringhe di feature separate da `, `, come ` CSSVariables, KeyboardEventKey ` da disabilitare. L'elenco completo delle stringe supportate si possono trovare nel file [ RuntimeEnabledFeatures.json5 ](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (opzionale) - Imposta il font predefinito per il font-family. 
      * `standard` String (opzionale) - Il valore predefinito è il `Times New Roman`.
      * `serif` String (opzionale) -Il valore predefinito è il `Times New Roman`.
      * `sansSerif` String (opzionale) - Il valore predefinito è l'`Arial`.
      * `monospace` String (opzionale) - Il valore predefinito è il `Courier New`.
      * `cursive` String (opzionale) - Il valore predefinito è l'`Script`.
      * `fantasy` String (opzionale) - Il valore predefinito è l'`Impact`.
    * `defaultFontSize` Integer (opzionalel) - Il valore predefinito è `16`.
    * `defaultMonospaceFontSize` Integer (opzionale) - Il valore predefinito è `13`.
    * `minimumFontSize` Integer (opzionale) - Il valore predefinito è `0`.
    * `defaultEncoding` String (opzionale) - Il valore predefinito è l'`ISO-8859-1`.
    * `backgroundThrottling` Boolean (opzionale) - Limita le animazioni e i timer quando la pagina è in background. Questo influenza anche il [ Page Visibility API](#page-visibility). Il valore predefinito è `true`.
    * `offscreen ` Boolean (opzionale): se abilitato permette il rendering fuori schermo per la finestra del browser. Il valore predefinito è `false`. Vedi il[ Tutorial per il rendering offscreen ](../tutorial/offscreen-rendering.md) per maggiori dettagli.
    * ` contextIsolation ` Boolean (opzionale): esegue le API Electron e lo script ` preload` specificato in un contesto JavaScript separato. Il valore predefinito è `false`. Il contesto in cui viene eseguito lo script ` preload ` continuerà ad avere accesso completo ai ` documenti ` e ` finestre `, ma verrà utilizzato il suo insieme di builtin JavaScript (` Array`, ` Object`, ` JSON `, ecc.) e sarà isolato da eventuali modifiche apportate all'ambiente globale dalla pagina caricata. Le API Electron saranno disponibili solo nello script ` preload` e non nella pagina caricata. Questa opzione dovrebbe essere usata quando il caricamento dei contenuti remoti sono potenzialmente non attendibili per garantire il contenuto caricato non può manomettere lo script ` preload` e tutte le API Electron in uso. Questa opzione utilizza la stessa tecnica utilizzata da [ Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). È possibile accedere a questo contesto negli strumenti di sviluppo selezionando La voce "Electron Isolated Context" nella casella combinata nella parte superiore della scheda Console. **Nota:** Questa opzione è attualmente sperimentale e potrebbe cambiare o essere rimossa nelle versioni future di Electron.
    * `nativeWindowOpen` Boolean (opzionale) - Permettere di usare la funzione nativa `window.open()`. Di default è `false`. **Nota:** Questa funzione è sperimentale.
    * `webviewTag` Boolean (opzionale) - Abilita il [`<webview>` tag](webview-tag.md). Il valore di default è come l'opzione di `nodeIntegration`. **Nota:** Lo script di `preload` configurato per la `<webview>` avrà la nodeIntegration abilitata quando viene eseguita, quindi è necessario garantire che il contenuto remoto/non attendibile non sia in grado di creare una `<webview>` con tag di `preload` potenzialmente dannosi. Puoi utilizzare l'evento `will-attach-webview ` su [webContents](web-contents.md) per rimuovere lo script ` preload` e per convalidare o modificare le impostazioni iniziali della `<webview>`.
    * `additionalArguments` String[] (opzionale) - Una lista di stringhe che saranno appese al `process.argv` nel processo di render di questa app. Utile per passare piccole bit di dati agli script di precaricamento del processo di renderer.
    * `safeDialogs` Boolean (opzionale): Se abilitata, attiva la protezione da dialog consecutivi stile browser. Il valore predefinito è `false`.
    * `safeDialogsMessage` String (opzionale) - Setta il messaggio da visualizzare quando viene attivata la protezione da dialog consecutiva. Se non definito verrà usato il messaggio predefinito, notare che il messaggio predefinito è in Inglese e non localizzato.
    * `navigateOnDragDrop` Boolean (opzionale) - Indica se trascinare e rilasciare un file o un collegamento sulla pagina causa una navigazione. Il valore predefinito è `false`.

Quando si imposta la dimensione della finestra minima o massima con `minWidth` / `maxWidth ` / `minHeight` / `maxHeight`, limita l'utente. Non ti impedirà di farlo passando una dimensione che non segue vincoli dimensionali a `setBounds ` / ` setSize ` o al costruttore di `BrowserWindow `.

I possibili valori e il comportamento dell'opzione `type` sono dipendenti dalla piattaforma. I valori possibili sono:

* Su Linux, i tipi possibili sono `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* Su macOS, i possibili valori sono `desktop`, `textured`. 
  * Il tipo `textured` aggiunge un aspetto di gradiente metallico (`NSTexturedBackgroundWindowMask`).
  * Il tipo `desktop` posiziona la finestra al livello del background del desktop (`kCGDesktopWindowLevel - 1`). Nota che la finestra desktop non riceveranno focus, tastiera o eventi del mouse, ma puoi comunque usare `globalShortcut` per ricevere input con moderazione.
* Su Windows, il tipo possibile è `toolbar`.

### Eventi dell'istanza

Oggetti creati con `new BrowserWindow` emettono i seguente eventi:

**Nota:** Alcuni metodi sono disponibili solo su sistemi operativi specifici e sono etichettati come tali.

#### Evento: 'page-title-updated'

Restituisce:

* `event` Event
* `Titolo` Stringa

Emesso quando il documento cambia il suo titolo, chiamando `event.preventDefault()` impedirà al titolo della finestra nativa di cambiare.

#### Evento: 'close'

Restituisce:

* `event` Event

Emesso quando la finestra sta per essere chiusa. E' emesso prima dell'evento `beforeunload` e `unload` del DOM. Chiamando `event.preventDefault()` cancellerà la chiusura.

Solitamente tu vorresti usare l'handler `beforeunload` per decidere se la finestra deve essere chiusa, il quale verrà anche chiamato quando la finestra è ricaricata. Su Electron, restituendo qualsiasi altro valore da `undefined` annullerebbe la chiusura. Ad esempio:

```javascript
window.onbeforeunload = (e) => {
  console.log('Non voglio essere chiusa')

  // A differenza dei soliti browsers che stampano un messaggio in un box all'utente, restituendo
  // un valore non-void silenziosamente annullerà la chiusura.
  // E' raccomandato usare la API di dialogo per far confermare all'utente la chiusura
// dell'applicazione.
  e.returnValue = false // equivalente a `return false` ma non è raccomandato
}
```

***Nota**: C'è una sottile differenza tra il comportamento di `window.onbeforeunload = handler` e `window.addEventListener('beforeunload', handler)`. E' raccomandato settare sempre esplicitamente l' `event.returnValue`, invece di restituire soltanto un valore, così come il primo lavora più coerentemente con Electron.*

#### Evento: 'closed'

Emesso quando la finestra è chiusa. Dopo che hai ricevuto questo evento dovresti rimuovere il riferimento alla finestra ed evitarne l'uso.

#### Evento: 'session-end' *Windows*

Emesso quando la finestra in sessione sta per essere chiusa a causa di uno spegnimento forzato o un riavvio della macchina o per una disconnessione.

#### Evento: 'unresponsive'

Emesso quando la pagina web diventa non responsive.

#### Evento: 'responsive'

Emesso quando la pagina web non responsive diventa responsive di nuovo.

#### Evento: 'blur'

Emesso quando la finestra perde il focus.

#### Evento: 'focus'

Emesso quando la finestra ottiene focus.

#### Evento: 'show'

Emesso quando la finestra è mostrata.

#### Evento: 'hide'

Emesso quando la finestra è nascosta.

#### Evento: 'ready-to-show'

Emesso quando la pagine web è stata renderizzata (mentre ancora non è mostrata) e la finestra può essere visualizzata senza un flash visuale.

#### Evento: 'maximize'

Emesso quando la finestra è massimizzata.

#### Evento: 'unmaximize'

Emesso quando la finestra esce da uno stato ingrandito.

#### Evento: 'minimize'

Emesso quando la finestra è minimizzata.

#### Evento: 'restore'

Emesso quando la finestra è ripristinata da una stato minimizzato.

#### Evento: 'resize'

Emesso quando la finestra viene ridimensionata.

#### Evento: 'move'

Emesso quando la finestra viene mossa verso una nuova posizione.

**Nota**: Su macOS questo evento è un alias di `moved`.

#### Evento: 'moved' *macOS*

Emesso una volta quando la finestra è stata spostata in una nuova posizione.

#### Evento: 'enter-full-screen'

Emesso quando la finestra entra in uno stato full-screen.

#### Evento: 'leave-full-screen'

Emesso quando la finestra esce da uno stato full-screen.

#### Evento: 'enter-html-full-screen'

Emesso quando la finestra entra in uno stato full-screen attivata da un API HTML.

#### Evento: 'leave-html-full-screen'

Emesso quando la finestra esce da uno stato full-screen attivata da un API HTML.

#### Evento: 'app-command' *Windows*

Restituisce:

* `event` Event
* `command` String

Emesso quando un [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) è invocato. Queste sono tipicamente collegate ai tasti multimediali della tastiera o a comandi browser, così come il pulsante 'Indietro' integrato all'interno di alcuni mouse su Windows.

I comandi sono in lowercase style, under_score style sono rimpiazzati con trattini, e il prefisso `APPCOMMAND_` viene rimosso. es. `APPCOMMAND_BROWSER_BACKWARD` è emesso come `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Ritorna alla finestra precedente quando l'utente preme il pulsante indietro sul mouse
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Evento: 'scroll-touch-begin' *macOS*

Emesso quando la fase dell'evento dello scorrimento per rotella è incominciato.

#### Evento: 'scroll-touch-end' *macOS*

Emesso quando la fase di scorrimento della rotella è terminata.

#### Evento: 'scroll-touch-edge' *macOS*

Emesso quando la fase dell'evento di scorrimento della rotella l'elemento ha raggiunto il bordo.

#### Evento: 'swipe' *macOS*

Restituisce:

* `event` Event
* `direction` String

Emesso su uno swipe fatto con 3 dita. Le possibili direzioni sono `up`, `right`, `down`, `left`.

#### Evento: 'sheet-begin' *macOS*

Emesso quando la finestra apre un foglio.

#### Evento: 'sheet-end' *macOS*

Emesso quando la finestra ha chiuso un foglio.

#### Evento: 'nuova-finestra-per-scheda' *macOS*

Emesso quando il pulsante nativo di una tab è stata cliccata.

### Metodi Statici

La classe `BrowserWindow` ha i seguenti metodi statici:

#### `BrowserWindow.getAllWindows()`

Restituisce `BrowserWindow[]` - Un array di tutte le finestre del browser aperte.

#### `BrowserWindow.getFocusedWindow()`

Restituisce `BrowserWindow | null` - La finestra che è focalizzata nell'applicazione, altrimenti restituisce `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Restituisce `BrowserWindow` - La finestra che possiede i `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Restituisce `BrowserWindow | null` - La finestra che possiede la `browserView`. Se la vista data non è attaccata a nessuna finestra, restituisce `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Restituisce `BrowserWindow` - La finestra con l'`id` dato.

#### `BrowserWindow.addExtension(path)`

* `path` String

Aggiunge estensioni Chrome situate in `path`, e restituisce il nome dell'estensione.

Questo metodo, inoltre, non restituirà se il manifesto dell'estensione manca o è incompleto.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Rimuove un'estensione Chrome per nome.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.getExtensions()`

Restituisce `Object` - Le chiavi sono i nomi dell'estensioni e ogni valore è un oggetto che contiene le proprietà `name` e `version`.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Aggiunge l'estensione DevTools situata in `path`, e restituisce il nome dell'estensione.

L'estensione sarà memorizzata così devi chiamarla soltanto una volta questa API, questa API non ha un uso di programmazione. Se provi ad aggiungere un estensione che è stata già caricata, questo metodo non restituirà niente e visualizzerà un warning log in console.

Questo metodo, inoltre, non restituirà se il manifesto dell'estensione manca o è incompleto.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Rimuove un estensione DevTools per nome.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.getDevToolsExtensions()`

Restituisce `Object` - Le chiavi sono i nomi dell'estensioni e ogni valore è un oggetto che contiene le proprietà `name` e `version`.

Per controllare se un estensione DevTools è installata puoi avviare il seguente codice:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

### Proprietà Istanza

Oggetti creati con `new BrowserWindow` hanno le seguenti proprietà:

```javascript
const {BrowserWindow} = require('electron')
// In questo esempio `win` è la nostra istanza
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

Un oggetto `WebContents` che questa finestra possiede. Tutte le pagine web relative agli eventi e operazioni saranno fatte tramite questo.

Vedi [Documentazione `webContents` ](web-contents.md) per i suoi metodi e eventi.

#### `win.id`

Un `Integer` che rappresenta l'ID univoco della finestra.

### Metodi Istanza

Oggetti creati con `new BrowserWindow` hanno i seguenti metodi d'istanza:

**Nota:** Alcuni metodi sono disponibili solo su sistemi operativi specifici e sono etichettati come tali.

#### `win.destroy()`

Forza la chiusura della finestra, gli eventi `unload` e `beforeunload` non verranno emessi per la pagina web, e l'evento `close` inoltre non verrà emesso per questa finestra, ma è garantito che l'evento `closed` verrà emesso.

#### `win.close()`

Prova a chiudere la finestra. Questo ha lo stesso effetto come se un utente clicca manualmente il pulsante di chiusura della finestra. Anche se la pagina web può annullare la chiusura. Vedi [evento close](#event-close).

#### `win.focus()`

Focalizza la finestra.

#### `win.blur()`

Rimuove la focalizzazione dalla finestra.

#### `win.isFocused()`

Ritorna `Boolean` - Se la finestra é focalizzata.

#### `win.isDestroyed()`

Ritorna `Boolean` - se la finestra é stata distrutta.

#### `win.show()`

Visualizza la finestra e la focalizza.

#### `win.showInactive()`

Mostra la finestra, senza focalizzarla.

#### `win.hide()`

Nasconde la finestra.

#### `win.isVisible()`

Ritorna `Boolean` - Se la finestra é visibile all'utente.

#### `win.isModal()`

Ritorna `Boolean` - Se la finestra corrente é modale.

#### `win.maximize()`

Ingrandisce la finestra. Nel caso in cui non sia giá visualizzata, la finestra verrá mostrata (ma non focalizzata).

#### `win.unmaximize()`

Rimuove l'ingrandimento della finestra.

#### `win.isMaximized()`

Ritorna `Boolean` - se la finestra é stata ingrandita.

#### `win.minimize()`

Minimizza la finestra. Su alcune piattaforme la finestra minimizzata verrà mostrata nel Dock.

#### `win.restore()`

Ripristina la finestra dallo stato minimizzato allo stato precedente.

#### `win.isMinimized()`

Restituire `Boolean` - Se la finestra è minimizzata.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Imposta se la finestra dovrebbe essere in modalità schermo intero.

#### `win.isFullScreen()`

Ritorna `Boolean` - Se la finestra é a tutto schermo.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Entra o esce in modalità schermo intero semplice.

La modalità schermo intero semplice emula il comportamento nativo dello schermo intero trovata nelle versioni di Mac OS X precedenti a Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Restituisce `Boolean` - Se la finestra è in modalità schermo intero semplice (prima di Lion).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - Rapporto aspetto da mantenere per certe porzioni della vista del contenuto.
* `extraSize` [Size](structures/size.md) - La dimensione extra non inclusa mantenendo il rapporto aspetto.

Questo farà si che la finestra manterrà un rapporto aspetto. La dimensione extra permette allo sviluppatore di avere spazio, specificata in pixel, non inclusa all'interno del calcolo del rapporto aspetto. Questa API già prende in considerazione la differenza tra la dimensione della finestra e la dimensione del suo contenuto.

Considera una normale finestra con un riproduttore video HD e controlli associati. Probabilmente ci sono 15 pixels di controllo su bordo sinistro, 25 pixels di controllo sul bordo destro e 50 pixels di controllo al di sotto del riproduttore. In modo da mantenere un rapporto aspetto di 16:9 (rapporto aspetto standard per HD @1920x1080) all'interno del riproduttore stesso potremmo chiamare questa funzione con argomenti di 16/9 e [ 40, 50 ]. Il secondo argomento non importa dove la larghezza e lunghezza extra si trovano all'interno nella vista del contenuto--ma solo che esistano. Somma ogni area di larghezza e altezza extra che tu hai all'interno nella vista del contenuto.

Chiamando questa funzione con un valore di `0` rimuoverà qualsiasi precedente configurazione del rapporto aspetto.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - Il percorso assoluto al file per l'anteprima con QuickLook. Questo è importante in quanto Quick Look usa il nome del file e l'estensione sulla path per determinare il tipo di contenuto del file da aprire.
* `displayName` String (opzionale) - Il nome del file da mostrare sulla vista modale di Quick Look. Questo è puramente visuale e non influisce sul tipo di contenuto del file. Valore predefinito è `path`.

Usa [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) per l'anteprima di un file su un dato percorso.

#### `win.closeFilePreview()` *macOS*

Chiude il pannello attualmente aperto di [Quick Look](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opzionale) *macOS*

Ridimensiona e muove la finestra ai limiti forniti

#### `win.getBounds()`

Restituisce [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opzionale) *macOS*

Ridimensiona e muove l'area client della finestra (es. la pagina web) ai limiti forniti.

#### `win.getContentBounds()`

Restituisce [`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Disabilita o abilita la finestra.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (opzionale) *macOS*

Ridimensiona la finestra con `width` e `height`.

#### `win.getSize()`

Restituisce `Integer[]` - Contiene la larghezza e l'altezza della finestra.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (opzionale) *macOS*

Ridimensiona l'area client della finestra (es. la pagina web) a `width` e `height`.

#### `win.getContentSize()`

Restituisce `Integer[]` - Contiene la larghezza e l'altezza dell'area client della finestra.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Imposta la dimensione minima della finestra a `width` e `height`.

#### `win.getMinimumSize()`

Restituisce `Integer[]` - Contiene la minima larghezza e altezza della finestra.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Imposta la dimensione massima della finestra a `width` e `height`.

#### `win.getMaximumSize()`

Restituisce `Integer[]` - Contiene la massima larghezza e altezza della finestra.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Imposta se la finestra può essere manualmente ridimensionata dall'utente.

#### `win.isResizable()`

Restituisce `Boolean` - Se la finestra può essere manualmente ridimensionata dall'utente.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Imposta se la finestra può essere mossa dall'utente. Su Linux non fa niente.

#### `win.isMovable()` *macOS* *Windows*

Restituisce `Boolean` - Se la finestra può essere mossa dall'utente.

Su Linux restituisce sempre `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Imposta se la finestra può essere manualmente minimizzata dall'utente. Su Linux non fa niente.

#### `win.isMinimizable()` *macOS* *Windows*

Restituisce `Boolean` - Se la finestra può essere manualmente minimizzata dall'utente

Su Linux restituisce sempre `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

Su Linux restituisce sempre `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

Su Linux restituisce sempre `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.moveTop()` *macOS* *Windows*

Moves window to top(z-order) regardless of focus

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opzionale) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `Titolo` Stringa

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves the kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Funzione

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` Stringa
* `options` Object (opzionale) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Same as `webContents.loadURL(url[, options])`.

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath)`

* `Percorsofile` Stringa

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (opzionale) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setShape(rects)` *Windows* *Linux* *Experimental*

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Oggetto 
  * `icon` [NativeImage](native-image.md) - L'icona mostrata nella barra degli strumenti come anteprima.
  * `click` Funzione
  * `tooltip` Stringa (opzionale) - Il testo del tooltip del pulsante.
  * `flags` Stringa[] (opzionale) - Controlla specifici comportamenti e comportamenti del pulsante. Di default è `['enabled']`.

I `flags` sono un insieme che include le seguenti `String`:

* `enabled` - Il pulsante è attivato e disponibile all'utente.
* `disabled` - Il pulsante é disabilitato. È presente ma lo stato visuale che lo indica non risponderà all'azione dell'utente.
* `dismissonclick` - Quando il pulsante è cliccato, la finestra miniaturizzata si chiude immediatamente.
* `nobackground` - Non disegna i bordi del pulsante, usa solo l'immagine.
* `hidden` - Il pulsante non è mostrato all'utente.
* `noninteractive` - Il pulsante è abilitato ma non interattivo; il pulsante è mostrato in uno stato di 'non premuto'. Questo valore è inteso per istanze in cui il pulsante è usato in una notifica.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Oggetto 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icona` [ImmagineNativa](native-image.md)

Changes window icon.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (opzionale) 
  * `forward` Boolean (optional) *macOS* *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` *Sperimentale*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Sperimentale*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Nota:** La VistaBrowser API è attualmente sperimentale e potrebbe cambiare o essere rimossa nei rilasci futuri di Electron.