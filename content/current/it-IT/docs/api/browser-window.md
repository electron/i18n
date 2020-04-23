# BrowserWindow

> Crea e controlla finestre browser.

Processo: [Main](../glossary.md#main-process)

```javascript
// Nel processo principale(main).
const { BrowserWindow } = require('electron')

// O usa 'remote' dai processi render.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
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

## Utilizzare l'evento `ready-to-show`

Durante il caricamento della pagina, l'evento `ready-to-show` verrà emesso quando il Renderer Process ha eseguito il rendering della pagina per la prima volta e se la finestra non è stata ancora visualizzata. Mostrare la finestra dopo questo evento non mostrerà flash visuali:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Questo evento è di solito emesso dopo l'evento `did-finish-load`, ma per le pagine con molte risorse potrebbe essere emesso prima di `did-finish-load`.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`

## Impostare il colore di sfondo(`backgroundColor`)

Per un'app complessa, l'evento `ready-to-show` potrebbe essere emessa troppo tardi rendendo l'app lenta. In questo caso, è raccomandato mostrare la finestra immediatamente ed usare un colore di sfondo(`backgroundColor`) simile a quello della tua app:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Nota come anche per le app è usato l'evento `ready-to-show`, è raccomandato impostare il `backgroundColor` per far sembrare le app più native.

## Finestra padre e figlio

Usando l'opzione `parent`, puoi creare finestre figlie, impostando una relazione gerarchica tra le finesre:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

La finestra `child` sarà sempre mostrata sopra la finestra `top`.

## Finestre modali

Una finestra modale è una finestra figlia che disabilita le finestre padri, per crearne una devi impostare entrambe le opzioni `parent` e `modal`:

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Visibilità pagina

L' [Api di Visibilità Pagina](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) lavora come segue:

* Su tutte le piattaforme, lo stato di visibilità traccia se la finestra è nascosta/minimizzata o no.
* In aggiunta, su macOS, lo stato di visibilità traccia anche lo stato di occlusione della finestra. Se la finestra è occlusa (totalmente coperta) da un'altra, lo stato di visibilità sarà nascosta (`nascosta`). Su altre piattaforme, lo stato di visibilità sarà `hidden` solo quando la finestra è minimizzata o nascosta esplicitamente con `win.hide()`.
* Se una nuova `BrowserWindow` è stata creata con `show: false`, lo stato di visibilità iniziale sarà `visibile` nonostante la finestra risulti essere nascosta.
* Se il `backgroundThrottling` è disabilitato, lo stato di visibilità rimarrà `visible` anche se la finestra è minimizzata, occlusa o nascosta.

Si raccomanda di mettere in pausa le operazioni dispendiose quando lo stato di visibilità è `hidden` per minimizzare il consumo energetico.

## Avvisi di piattaforma

* Su macOS le finestre modali saranno mostrate come fogli allegate alla finestra genitore.
* Su macOS le finestre figlie manterranno le proprie posizioni relative alla finestra genitore quando questa si muove, mentre su Windows e Linux queste non si muoveranno.
* Su Linux il tipo di finestre modali sarà cambiato in `dialog`.
* Su Linux molti ambienti desktop non supportano il nascondere una finestra modale.

## Classe: BrowserWindow

> Crea e controlla le finestre del browser.

Processo: [Main](../glossary.md#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Crea una nuova Finestra `BrowserWindow` con proprietà native come da `options`.

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * `useContentSize` Booleano (opzionale) - La `width` e l'`height` saranno usate come dimensioni della pagina web, il che vuol dire che la dimensione attuale della finestra includerà le dimensioni della cornice della finestra ed è lievemente più grande. Di default è `false`.
  * `center` Boolean (opzionale) - Mostra la finestra al centro dello schermo.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. Di default `true`.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. Di default `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. Di default `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. Di default `true`.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. Di default `true`.
  * `focusable` Boolean (opzionale) - Se la finestra è focalizzabile. Di default è `true`. Su Windows impostando `focusable: false` implica anche l'impostazione `skipTaskbar: true`. Su Linux, impostando `focusable: false` blocca l'interazione della finestra con il wm, così la finestra resterà sempre in primo piano rispetto alle aree di lavoro.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Di default è `false`.
  * `fullscreen` Boolean (opzionale) - Se la finestra dovrebbe mostrarsi a schermo intero. Quando esplicitamente impostati a `false` il pulsante schermo intero sarà nascosto o disabilitato su macOS. Di default è `false`.
  * `fullscreenable` Boolean (opzionale) - Se la finestra è impostabile in modalità schermo intero. Su macOS, anche se il pulsante massimizza/ingrandisci potrebbe impostare la modalità schermo intero o massimizza finestra. Di default `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Di default è `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Di default è `false`.
  * `title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `icon` ([>NativeImage](native-image.md) | Stringa) (opzionale) - L'icona della finestra. Su Windows si raccomanda di usare le icone `ICO` per ottenere migliori effetti visuali, puoi anche lasciarlo non impostato, così sarà usata l'icona dell'eseguibile.
  * `show` Boolean (optional) - Whether window should be shown when created. Di default è `true`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created.  In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`.  Setting this to `false` will cause the `ready-to-show` event to not fire.  Di default `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Di default `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Di default è `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Di default è `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Di default è `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. Di default è `false`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. Di default `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Di default è `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). Di default è `false`. On Windows, does not work unless the window is frameless.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. I valori possibili sono:
    * `default` - risultato di colore grigio opaco come barra del titolo del Mac.
    * `hidden` - genera una barra del titolo nascosta e una finestra a tutto schermo per il contenuto e inoltre la barra del titolo contiene nell'angolo in alto a sinistra i tipici controlli per la finestra ("semaforo").
    * `hiddenInset` - Nasconde la barra del titolo, permettendone un aspetto alternativo. I pulsanti a semaforo sono leggermente inseriti verso il bordo della finestra.
    * `customButtonsOnHover` Boolean (opzionale) - Permette di creare bottoni di chiusura, riduci a icona, e schermo intero personalizzati per finestre senza bordo su macOS. Questi pulsanti non verranno visualizzati se non si posiziona il puntatore del mouse in alto a sinistra nella finestra. Questi pulsanti personalizzati prevengono problemi con gli eventi del mouse che si verificano con i pulsanti standard della barra degli strumenti di una finestra. **Note:** Questa opzione è attualmente sperimentale.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Di default è `false`.
  * `thickFrame` Boolean (opzionale) - Usa lo stile `WS_THICKFRAME` per finestre senza bordi su Windows, che aggiunge un bordo standard. Impostandolo a `false` le animazioni e le ombre della finestra. Di default `true`.
  * `vibrancy` String (opzionale) - Aggiunge un effetto di trasparenza sulla finestra, solo su macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`.  Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Se `true`, la finestra crescerà alla larghezza preferita della pagina web ingrandita, `false` lo causerà sull'ingrandimento della larghezza dello schermo. Questo avrà effetto inoltre sul comportamento di `maximize()` quando chiamata direttamente. Di default è `false`.
  * `tabbingIdentifier` String (opzionale) - Nome del gruppo di schede, permette la finestra come scheda nativa di macOS da 10.12+. Windows con lo stesso identificatore di scheda verrà raggruppato insieme. Questo aggiunge anche un nuovo pulsante nativo per una nuova scheda alla barra delle schede, consentendo l'`app` e la finestra di ricevere l'evento `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (opzionale) - Consente di abilitare gli strumenti di sviluppo. Se impostato su `false`, non sarà possibilite usare `BrowserWindow.webContents.openDevTools()` per aprire gli strumenti di sviluppo. Di default `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Di default è `false`.
    * `nodeIntegration` Boolean (opzionale) - Abilita le integrazioni con Node. Il valore predefinito è `true`. Di default è `false`. Maggiori informazioni possono essere trovate su [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * `preload` String (opzionale) - Specifica uno script che verrà caricato prima che vengano eseguiti gli script della pagina. Questi script avranno sempre accesso alle API di Node, non importa se l'integrazione con Node è attivata o disattivata. Il valore dovrebbe essere il percorso assoluto del file allo script. Quando l'integrazione di Node è disattivata, lo script di `preload` può reintrodurre dei simboli di portata globale. Vedi l'esempio [qua](process.md#event-loaded).
    * `sandbox` Boolean (opzionale) - Se impostato, questo renderà sandbox il renderer associato alla finestra, rendendolo compatibile con Chromium Sandbox a livello di sistema operativo e disabilita il motore di Node.js. Questo non è uguale all'opzione `nodeIntegration` e le API disponibili per lo script di precaricamento sono più limitati. Maggiori informazioni sull'opzione [qui](sandbox-option.md).
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Di default `true`.
    * `session` [Session](session.md#class-session) (opzionale) - Imposta la sessione utilizzata dalla pagina. Invece di passare direttamente l'oggetto Session, puoi anche scegliere di usare l'opzione ` partition `, che accetta una stringa di partizione. Quando sia la `session` sia la `partition` sono fornite, la `session` sarà preferita. Di default è la default session.
    * `partition` String (opzionale) - Imposta la sessione utilizzata dalla pagina in base alla stringa di partizione della sessione. Se `partition` inizia con `persist:`, la pagina userà una sessione persistente disponibile per tutte le pagine dell'app con la stessa `partition`. Se non c'è un prefisso `persist: `, la pagina userà una sessione in memoria. Assegnando la stessa `partition`, è possibile condividere per più pagine la stessa sessione. Di default è la default session.
    * ` affinity ` String (opzionale) - Se specificato, le pagine web con lo stesso ` affinity ` verranno eseguite nello stesso processo di rendering. Si noti che a causa del riutilizzo il processo di rendering, anche alcune opzioni ` webPreferences ` saranno condivise tra le pagine Web anche quando hai specificato valori diversi per loro, inclusi, ma non limitati da ` preload`, ` sandbox ` e ` nodeIntegration `. Pertanto, si consiglia di utilizzare esattamente le stesse ` WebPreferences` per le pagine Web con la stessa `affinity`. _Questa proprietà è sperimentale_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Di default `true`.
    * ` webSecurity ` Boolean (opzionale) - Quando è ` false `, esso disabiliterà la politica della stessa origine (di solito utilizzando siti Web di test da parte di persone), e impostata ` allowRunningInsecureContent ` a ` true ` se questa opzione non è stata impostata dall'utente. Di default `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Di default è `false`.
    * `images` Boolean (optional) - Enables image support. Di default `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Di default `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Di default è `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Di default è `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Di default è `false`.
    * `enableBlinkFeatures` String (opzionale) - Una lista di stringhe caratteristiche separate da `,`, come `CSSVariables,KeyboardEventKey` da abilitare. L'elenco completo delle stringe supportate si possono trovare nel file [ RuntimeEnabledFeatures.json5 ](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * ` disableBlinkFeatures ` String (opzionale) - Un elenco di stringhe di feature separate da `, `, come ` CSSVariables, KeyboardEventKey ` da disabilitare. L'elenco completo delle stringe supportate si possono trovare nel file [ RuntimeEnabledFeatures.json5 ](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
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
    * ` contextIsolation ` Boolean (opzionale): esegue le API Electron e lo script ` preload` specificato in un contesto JavaScript separato. Il valore predefinito è `false`. Il contesto in cui viene eseguito lo script ` preload ` continuerà ad avere accesso completo ai ` documenti ` e ` finestre `, ma verrà utilizzato il suo insieme di builtin JavaScript (` Array`, ` Object`, ` JSON `, ecc.) e sarà isolato da eventuali modifiche apportate all'ambiente globale dalla pagina caricata. Le API Electron saranno disponibili solo nello script ` preload` e non nella pagina caricata. Questa opzione dovrebbe essere usata quando il caricamento dei contenuti remoti sono potenzialmente non attendibili per garantire il contenuto caricato non può manomettere lo script ` preload` e tutte le API Electron in uso. Questa opzione utilizza la stessa tecnica utilizzata da [ Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). È possibile accedere a questo contesto negli strumenti di sviluppo selezionando La voce "Electron Isolated Context" nella casella combinata nella parte superiore della scheda Console.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Il valore predefinito è `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (opzionale) - Abilita il [`<webview>` tag](webview-tag.md). Il valore predefinito è `false`. **Nota:** Lo script di `preload` configurato per la `<webview>` avrà la nodeIntegration abilitata quando viene eseguita, quindi è necessario garantire che il contenuto remoto/non attendibile non sia in grado di creare una `<webview>` con tag di `preload` potenzialmente dannosi. Puoi utilizzare l'evento `will-attach-webview ` su [webContents](web-contents.md) per rimuovere lo script ` preload` e per convalidare o modificare le impostazioni iniziali della `<webview>`.
    * `additionalArguments` String[] (opzionale) - Una lista di stringhe che saranno appese al `process.argv` nel processo di render di questa app. Utile per passare piccole bit di dati agli script di precaricamento del processo di renderer.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Di default è `false`.
    * `safeDialogsMessage` String (opzionale) - Setta il messaggio da visualizzare quando viene attivata la protezione da dialog consecutiva. Se non definito verrà usato il messaggio predefinito, notare che il messaggio predefinito è in Inglese e non localizzato.
    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. Di default è `false`.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Di default è `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Di default è `false`.

Quando si imposta la dimensione della finestra minima o massima con `minWidth` / `maxWidth ` / `minHeight` / `maxHeight`, limita l'utente. Non ti impedirà di farlo passando una dimensione che non segue vincoli dimensionali a `setBounds ` / ` setSize ` o al costruttore di `BrowserWindow `.

The possible values and behaviors of the `type` option are platform dependent. I valori possibili sono:

* Su Linux, i tipi possibili sono `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`.
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
* `explicitSet` Boolean

Emesso quando il documento cambia il suo titolo, chiamando `event.preventDefault()` impedirà al titolo della finestra nativa di cambiare. `explicitSet` is false when title is synthesized from file URL.

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
_**Nota**: C'è una sottile differenza tra il comportamento di `window.onbeforeunload = handler` e `window.addEventListener('beforeunload', handler)`. E' raccomandato settare sempre esplicitamente l' `event.returnValue`, invece di restituire soltanto un valore, così come il primo lavora più coerentemente con Electron._

#### Evento: 'closed'

Emesso quando la finestra viene chiusa. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Evento: 'session-end' _Windows_

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

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`

#### Evento: 'maximize'

Emesso quando la finestra è massimizzata.

#### Evento: 'unmaximize'

Emesso quando la finestra esce da uno stato ingrandito.

#### Evento: 'minimize'

Emesso quando la finestra è minimizzata.

#### Evento: 'restore'

Emesso quando la finestra è ripristinata da una stato minimizzato.

#### Event: 'will-resize' _macOS_ _Windows_

Restituisce:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Evento: 'resize'

Emitted after the window has been resized.

#### Event: 'will-move' _macOS_ _Windows_

Restituisce:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Evento: 'move'

Emesso quando la finestra viene mossa verso una nuova posizione.

__Nota__: Su macOS questo evento è un alias di `moved`.

#### Evento: 'moved' _macOS_

Emesso una volta quando la finestra è stata spostata in una nuova posizione.

#### Evento: 'enter-full-screen'

Emesso quando la finestra entra in uno stato full-screen.

#### Evento: 'leave-full-screen'

Emesso quando la finestra esce da uno stato full-screen.

#### Evento: 'enter-html-full-screen'

Emesso quando la finestra entra in uno stato full-screen attivata da un API HTML.

#### Evento: 'leave-html-full-screen'

Emesso quando la finestra esce da uno stato full-screen attivata da un API HTML.

#### Event: 'always-on-top-changed'

Restituisce:

* `event` Event
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' _Windows_ _Linux_

Restituisce:

* `event` Event
* `command` String

Emesso quando un [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) è invocato. Queste sono tipicamente collegate ai tasti multimediali della tastiera o a comandi browser, così come il pulsante 'Indietro' integrato all'interno di alcuni mouse su Windows.

I comandi sono in lowercase style, under_score style sono rimpiazzati con trattini, e il prefisso `APPCOMMAND_` viene rimosso. es. `APPCOMMAND_BROWSER_BACKWARD` è emesso come `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Ritorna alla finestra precedente quando l'utente preme il pulsante indietro sul mouse
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### Evento: 'scroll-touch-begin' _macOS_

Emesso quando la fase dell'evento dello scorrimento per rotella è incominciato.

#### Evento: 'scroll-touch-end' _macOS_

Emesso quando la fase di scorrimento della rotella è terminata.

#### Evento: 'scroll-touch-edge' _macOS_

Emesso quando la fase dell'evento di scorrimento della rotella l'elemento ha raggiunto il bordo.

#### Evento: 'swipe' _macOS_

Restituisce:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

The method underlying this event is built to handle older macOS-style trackpad swiping, where the content on the screen doesn't move with the swipe. Most macOS trackpads are not configured to allow this kind of swiping anymore, so in order for it to emit properly the 'Swipe between pages' preference in `System Preferences > Trackpad > More Gestures` must be set to 'Swipe with two or three fingers'.

#### Event: 'rotate-gesture' _macOS_

Restituisce:

* `event` Event
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Evento: 'sheet-begin' _macOS_

Emesso quando la finestra apre un foglio.

#### Evento: 'sheet-end' _macOS_

Emesso quando la finestra ha chiuso un foglio.

#### Evento: 'nuova-finestra-per-scheda' _macOS_

Emesso quando il pulsante nativo di una tab è stata cliccata.

### Metodi Statici

La classe `BrowserWindow` ha i seguenti metodi statici:

#### `BrowserWindow.getAllWindows()`

Restituisce `BrowserWindow[]` - Un array di tutte le finestre del browser aperte.

#### `BrowserWindow.getFocusedWindow()`

Restituisce `BrowserWindow | null` - La finestra che è focalizzata nell'applicazione, altrimenti restituisce `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Returns `BrowserWindow | null` - The window that owns the given `webContents` or `null` if the contents are not owned by a window.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Numero Intero

Restituisce `BrowserWindow` - La finestra con l'`id` dato.

#### `BrowserWindow.addExtension(path)`

* `path` String

Aggiunge estensioni Chrome situate in `path`, e restituisce il nome dell'estensione.

Questo metodo, inoltre, non restituirà se il manifesto dell'estensione manca o è incompleto.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.removeExtension(name)`

* `name` Stringa

Rimuove un'estensione Chrome per nome.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.getExtensions()`

Returns `Record<String, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Aggiunge l'estensione DevTools situata in `path`, e restituisce il nome dell'estensione.

L'estensione sarà memorizzata così devi chiamarla soltanto una volta questa API, questa API non ha un uso di programmazione. Se provi ad aggiungere un estensione che è stata già caricata, questo metodo non restituirà niente e visualizzerà un warning log in console.

Questo metodo, inoltre, non restituirà se il manifesto dell'estensione manca o è incompleto.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` Stringa

Rimuove un estensione DevTools per nome.

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Record<string, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

Per controllare se un estensione DevTools è installata puoi avviare il seguente codice:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Nota:** Questa API non può essere chiamata prima che l'evento `ready` del modulo `app` viene emesso.

### Proprietà Istanza

Oggetti creati con `new BrowserWindow` hanno le seguenti proprietà:

```javascript
const { BrowserWindow } = require('electron')
// In questo esempio `win` è la nostra istanza
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Vedi [Documentazione `webContents` ](web-contents.md) per i suoi metodi e eventi.

#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window.

#### `win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, setting this property to `true` won't hide it immediately.

#### `win.minimizable`

A `Boolean` property that determines whether the window can be manually minimized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.maximizable`

A `Boolean` property that determines whether the window can be manually maximized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.fullScreenable`

A `Boolean` property that determines whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.resizable`

A `Boolean` property that determines whether the window can be manually resized by user.

#### `win.closable`

A `Boolean` property that determines whether the window can be manually closed by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.movable`

A `Boolean` property that determines Whether the window can be moved by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

#### `win.accessibleTitle`

A `String` property that defines an alternative title provided only to accessibility tools such as screen readers. This string is not directly visible to users.

### Metodi Istanza

Oggetti creati con `new BrowserWindow` hanno i seguenti metodi d'istanza:

**Nota:** Alcuni metodi sono disponibili solo su sistemi operativi specifici e sono etichettati come tali.

#### `win.destroy()`

Forza la chiusura della finestra, gli eventi `unload` e `beforeunload` non verranno emessi per la pagina web, e l'evento `close` inoltre non verrà emesso per questa finestra, ma è garantito che l'evento `closed` verrà emesso.

#### `win.chiudi()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focalizza()`

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

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Rimuove l'ingrandimento della finestra.

#### `win.isMaximized()`

Ritorna `Boolean` - se la finestra é stata ingrandita.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Ripristina la finestra dallo stato minimizzato allo stato precedente.

#### `win.isMinimized()`

Restituire `Boolean` - Se la finestra è minimizzata.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Imposta se la finestra dovrebbe essere in modalità schermo intero.

#### `win.isFullScreen()`

Ritorna `Boolean` - Se la finestra é a tutto schermo.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Entra o esce in modalità schermo intero semplice.

La modalità schermo intero semplice emula il comportamento nativo dello schermo intero trovata nelle versioni di Mac OS X precedenti a Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Restituisce `Boolean` - Se la finestra è in modalità schermo intero semplice (prima di Lion).

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* `aspectRatio` Float - Rapporto aspetto da mantenere per certe porzioni della vista del contenuto.
* `extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.

Questo farà si che la finestra manterrà un rapporto aspetto. La dimensione extra permette allo sviluppatore di avere spazio, specificata in pixel, non inclusa all'interno del calcolo del rapporto aspetto. Questa API già prende in considerazione la differenza tra la dimensione della finestra e la dimensione del suo contenuto.

Considera una normale finestra con un riproduttore video HD e controlli associati. Probabilmente ci sono 15 pixels di controllo su bordo sinistro, 25 pixels di controllo sul bordo destro e 50 pixels di controllo al di sotto del riproduttore. In modo da mantenere un rapporto aspetto di 16:9 (rapporto aspetto standard per HD @1920x1080) all'interno del riproduttore stesso potremmo chiamare questa funzione con argomenti di 16/9 e [ 40, 50 ]. Il secondo argomento non importa dove la larghezza e lunghezza extra si trovano all'interno nella vista del contenuto--ma solo che esistano. Somma ogni area di larghezza e altezza extra che tu hai all'interno nella vista del contenuto.

Chiamando questa funzione con un valore di `0` rimuoverà qualsiasi precedente configurazione del rapporto aspetto.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - Il percorso assoluto al file per l'anteprima con QuickLook. Questo è importante in quanto Quick Look usa il nome del file e l'estensione sulla path per determinare il tipo di contenuto del file da aprire.
* `displayName` String (opzionale) - Il nome del file da mostrare sulla vista modale di Quick Look. Questo è puramente visuale e non influisce sul tipo di contenuto del file. Valore predefinito è `path`.

Usa [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) per l'anteprima di un file su un dato percorso.

#### `win.closeFilePreview()` _macOS_

Chiude il pannello attualmente aperto di [Quick Look](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (opzionale) _macOS_

Ridimensiona e muove la finestra ai limiti forniti. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window as `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opzionale) _macOS_

Ridimensiona e muove l'area client della finestra (es. la pagina web) ai limiti forniti.

#### `win.getContentBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window's client area as `Object`.

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Disabilita o abilita la finestra.

#### `win.isEnabled()`

Returns Boolean - whether the window is enabled.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (opzionale) _macOS_

Ridimensiona la finestra con `width` e `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Restituisce `Integer[]` - Contiene la larghezza e l'altezza della finestra.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (opzionale) _macOS_

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

**[Deprecato](modernization/property-updates.md)**

#### `win.isResizable()`

Restituisce `Boolean` - Se la finestra può essere manualmente ridimensionata dall'utente.

**[Deprecato](modernization/property-updates.md)**

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

**[Deprecato](modernization/property-updates.md)**

#### `win.isMovable()` _macOS_ _Windows_

Restituisce `Boolean` - Se la finestra può essere mossa dall'utente.

Su Linux restituisce sempre `true`.

**[Deprecato](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

**[Deprecato](modernization/property-updates.md)**

#### `win.isMinimizable()` _macOS_ _Windows_

Restituisce `Boolean` - Se la finestra può essere manualmente minimizzata dall'utente

Su Linux restituisce sempre `true`.

**[Deprecato](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[Deprecato](modernization/property-updates.md)**

#### `win.isMaximizable()` _macOS_ _Windows_

Restituisce `Boolean` - Se la finestra può essere manualmente massimizzata dall'utente.

Su Linux restituisce sempre `true`.

**[Deprecato](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Imposta se il pulsante massimizza/ingrandisci alterna modalità schermo intero o massimizza la finestra.

**[Deprecato](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Restituisce `Boolean` - Se il pulsante massimizza/ingrandisci alterna tra la modalità schermo intero o massimizza la finestra.

**[Deprecato](modernization/property-updates.md)**

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

**[Deprecato](modernization/property-updates.md)**

#### `win.isClosable()` _macOS_ _Windows_

Restituisce `Boolean` - Se la finestra può essere manualmente chiusa dall'utente.

Su Linux restituisce sempre `true`.

**[Deprecato](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Integer (opzionale) _macOS_ - Il numero di livelli più alto da impostare per finestra relativa dato un `livello`. Il valore di default è `0`. Nota che Apple scoraggia di impostare livelli più alti del 1 o al di sopra dello `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Restituisce `Boolean` - Se la finestra è sempre più in alto delle altre finestre.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

#### `win.moveTop()`

Muove la finestra verso l'alto (ordine z) indipendentemente dal focus

#### `win.center()`

Muove la finestra al centro delle schermo.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opzionale) _macOS_

Move la finestra a `x` e `y`.

#### `win.getPosition()`

Restituisce `Integer[]` - Contiene la posizione corrente della finestra.

#### `win.setTitle(title)`

* `Titolo` Stringa

Cambia il titolo della finestra nativa a `title`.

#### `win.getTitle()`

Restituisce `String` - Il titolo della finestra nativa.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (opzionale)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Ad esempio:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Inizia o ferma di lampeggiare la finestra per attirare l'attenzione dell'utente.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Fa si che la finestra non venga mostrata nella barra delle applicazioni.

#### `win.setKiosk(flag)`

* `flag` Boolean

Entra o esce in modalità kiosk.

#### `win.isKiosk()`

Restituisce `Boolean` - Se la finestra è in modalità kiosk.

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Restituisce `Buffer` - Il gestore della piattaforma specifica della finestra.

Il tipo nativo del gestore è `HWND` su Windows, `NSView*` su macOS, e `Window` (`unsigned long`) su Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Funzione

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Restituisce `Boolean` - `true` or `false` a seconda se il messaggio è agganciato.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Sgancia il messaggio dalla finestra.

#### `win.unhookAllWindowMessages()` _Windows_

Sgancia tutti i messaggi dalla finestra.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Imposta il percorso del file che la finestra rappresenta, e l'icona del file che verrà mostrata sulla barra del titolo della finestra.

#### `win.getRepresentedFilename()` _macOS_

Restituisce `String` - Il percorso del file che rappresenta la finestra.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Specifica se il documento della finestra è stato modificato, e l'icona nella barra del titolo diventerà grigia quando viene impostato su `true`.

#### `win.isDocumentEdited()` _macOS_

Restituisce `Boolean` - Se il documento della finestra è stato modificato.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - Le misure da ottenere

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, opzioni])`

* `url` Stringa
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (opzionale) - Un user agent originato dalla richiesta.
  * `extraHeaders` String (opzionale) - Extra headers separati da "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (opzionale)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

L' `url` può essere un indirizzo remoto (e.g. `http://`) o il percorso a un file HTML locale attraverso l'uso del protocollo `file://`.

Per assicurarsi che gli URLs dei file sono formattati in modo corretto, è raccomandato l'uso del metodo di Node [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject):

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

Puoi caricare un URL usando una richiesta `POST` con i dati dell'URL codificati in questo modo:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `Percorsofile` Stringa
* `options` Object (optional)
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Proprio come `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progresso` Double
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Rimuove la barra del progresso quando il progresso è minore di 0; Cambia in "indeterminate" quando il progresso è maggiore di 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - L'icona mostrata nella barra degli strumenti come anteprima.
  * `click` Funzione
  * `tooltip` Stringa (opzionale) - Il testo del tooltip del pulsante.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

I `flags` sono un insieme che include le seguenti `String`:

* `enabled` - Il pulsante è attivato e disponibile all'utente.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Quando il pulsante è cliccato, la finestra miniaturizzata si chiude immediatamente.
* `nobackground` - Non disegna i bordi del pulsante, usa solo l'immagine.
* `hidden` - Il pulsante non è mostrato all'utente.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

**[Deprecato](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

**[Deprecato](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows _deprecated_

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Changes whether the window can be focused.

On macOS it does not remove the focus from the window.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` _macOS_

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` _macOS_

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` _macOS_

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` _macOS_

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` _macOS_

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` _macOS_

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTrafficLightPosition(position)` _macOS_

* `posizione` [Punto](structures/point.md)

Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The current position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.setTouchBar(touchBar)` _macOS_ _Experimental_

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` _Sperimentale_

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

#### `win.addBrowserView(browserView)` _Sperimentale_

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` _Sperimentale_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Experimental_

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Nota:** La VistaBrowser API è attualmente sperimentale e potrebbe cambiare o essere rimossa nei rilasci futuri di Electron.
