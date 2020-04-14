# Domande frequenti su Electron

## Perché sto avendo problemi con l'installazione di Electron?

Quando si esegue `npm install electron`, alcuni utenti occasionalmente si imbattono in errori di installazione.

In quasi tutti i casi, questi errori sono il risultato di problemi di rete e non problemi reali con il pacchetto npm `electron`. Errori come `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` sono tutte indicazioni di un problemi di rete. La migliore soluzione è provare a cambiare rete, oppure attendere un po' di tempo e provare nuovamente ad eseguire l'installazione.

Puoi anche provare a scaricare Electron direttamente da [electron/electron/releases](https://github.com/electron/electron/releases) se l'installazione tramite `npm` non funziona.

## Quando verrà aggiornato Electron all'ultima versione di Chrome?

La versione di Chrome di Electron è generalmente rilasciata entro una o due settimane dopo che viene rilasciata una nuova versione stabile di Chrome. Questa stima non è garantita e dipende dalla quantità di lavoro necessario per l'aggiornamento.

Viene utilizzato solo il canale Chrome stabile. Se c'è una soluzione importante nel canale beta o dev, la supporteremo.

Per ulteriori informazioni, consulta [ l'introduzione alla sicurezza](tutorial/security.md).

## Quando verrà aggiornato Electron all'ultima versione di Node.js?

Quando viene rilasciata una nuova versione di Node.js, di solito aspettiamo circa un mese prima di aggiornare Electron. Quindi possiamo evitare di essere influenzati dai bug introdotti nelle nuove versioni di Node.js, cosa che accade molto spesso.

Le nuove funzionalità di Node.js sono solitamente apportate dagli aggiornamenti V8, poiché Electron utilizza il V8 fornito dal browser Chrome, la nuova funzionalità JavaScript di una nuova versione Node.js di solito è già in Electron.

## Come condividere i dati tra le pagine Web?

Per condividere i dati tra le pagine Web (i processi di rendering) il modo più semplice è utilizzare le API HTML5 che sono già disponibili nei browser. Buoni candidati sono [API Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)e [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Oppure puoi utilizzare il sistema IPC, che è specifico per Electron, per memorizzare gli oggetti nel processo principale come variabile globale, e poi per accedervi dai processi renderer attraverso la proprietà `remote` del modulo `elettron`:

```javascript
// Nel processo principale.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// Nella pagina 1.
richiede('elettronica').remote.getGlobal('sharedObject').someProperty = 'nuovo valore'
```

```javascript
// Nella pagina 2.
console.log(richiede('Electrn').remote.getGlobal('sharedObject').someProperty)
```

## La tray della mia app è scomparsa dopo pochi minuti.

Questo si verifica quando la variabile che è usata per archiviare la tray raccoglie scarti.

Se riscontri questo problema, i seguenti articoli potrebbero rivelarsi utili:

* [Gestione della Memoria](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Ambito Variabile](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Se vuoi una soluzione veloce, puoi rendere le variabili globali cambiando il tuo codice da questo:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

in questo:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Non posso usare jQuery/RequireJS/Meteor/AngularJS in Electron.

A causa dell'integrazione di Node.js di Electron, ci sono alcuni simboli aggiuntivi inseriti nel DOM come `module`, `exports`, `require`. Ciò causa problemi ad alcune librerie poiché vogliono inserire i simboli con lo stesso nome.

Per risolvere questo problema, puoi disattivare l'integrazione di Node in Electron:

```javascript
// Nel processo principale.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Ma se vuoi mantenere le capacità di usare Node.js ed Electron APIs, devi rinominare i simboli nella pagina prima di includere altre librerie:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('elettronica').xxx` non è definito.

Quando si utilizza il modulo integrato di Electron si potrebbe verificare un errore come questo:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Questo accade perchè il modulo [modulo npm `electron`](https://www.npmjs.com/package/electron), istallato localmente o globalmente, sovrascrive/sostituisce il modulo integrato di Electron.

Per verificare se stai utilizzando il modulo integrato corretto, è possibile stampare il percorso del modulo `elettron`:

```javascript
console.log(require.resolve('electron'))
```

e quindi controlla se è nel seguente formato:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Se è qualcosa come `node_modules/elettronica/index.js`, devi rimuovere il modulo npm `elettron` o rinominarlo.

```sh
npm uninstall electron
npm uninstall -g electron
```

Tuttavia, se si sta utilizzando il modulo integrato ma si riceve ancora questo errore, è molto probabile che si stia utilizzando il modulo nel processo sbagliato. Per esempio `elettron.app` può essere utilizzato solo nel processo principale, mentre `elettron.webFrame` è disponibile solo nei processi di rendering.

## Il carattere sembra sfocato, che cos'è e cosa posso fare?

Se [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) è disattivato, allora i font sugli schermi LCD possono sembrare sfocati. Esempio:

![modello di rendering dei sottopixel](images/subpixel-rendering-screenshot.gif)

L'anti-aliasing dei sottopixel richiede uno sfondo non trasparente del layer contenente i glifi del font. (Vedi [questo problema](https://github.com/electron/electron/issues/6344#issuecomment-420371918) per ulteriori informazioni).

Per raggiungere questo obiettivo, imposta lo sfondo nel costruttore per [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

L'effetto è visibile solo su (alcuni?) schermi LCD. Anche se non vedi una differenza, alcuni dei tuoi utenti potrebbero. Sempre meglio impostare così lo sfondo, a meno che tu non abbia ragioni di non farlo.

Nota che solo impostare lo sfondo nel CSS non ha l'effetto desiderato.