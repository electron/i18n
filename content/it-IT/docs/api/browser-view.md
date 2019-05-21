## Classe: VistaBrowser

> Crea e controlla visite.

Processo: [Main](../glossary.md#main-process)

Una `BrowserView` può essere usata per incorporare del contenuto web aggiuntivo all'interno di una [`BrowserWindow`](browser-window.md). È come una finestra piccola, eccetto per il fatto che è posta in parentela alla finestra propria. È considerato essere un alternativa al tag `webview`.

## Esempio

```javascript
// Nel processo principale(main).
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

let view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `nuova BrowserView([options])` *Sperimentale*

* `options` Object (opzionale) 
  * `webPreferences` Object (opzionale) - Vedi [BrowserWindow](browser-window.md).

### Metodi Statici

#### `BrowserView.getAllViews()`

Restituisce `BrowserView[]` - una array di tutti i BrowserViews aperti.

#### `BrowserView.fromWebContents(webContents)`

* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Restituisce `BrowserView | null`-The BrowserView che possiede il dato `webContents` o `null` se il contenuto non è di proprietà di un BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Restituisce `VistaBrowser` - La vista con l'`id` dato.

### Proprietà Istanza

Oggetti creato con `nuova VistaBrowser` hanno le seguenti proprietà:

#### `view.webContents` *Sperimentale*

Un oggetto [`ContenutiWeb`](web-contents.md) da questa vista.

#### `view.id` *Sperimentale*

Un numero `Intero` rappresentante l'unico ID di visualizzazione.

### Metodi Istanza

Oggetti creati con `nuova VistaBrowser` hanno i seguenti metodi d'istanza:

#### `view.destroy()`

Forza la chiusura della vista, gli enventi `unload` e `beforeunload` non verranno emessi per la pagina web. Dopo che hai finito con una vista, chiama questa funzione per liberare memoria e altre risorse il prima possibile.

#### `view.isDestroyed()`

Restituisce `Boolean` - Se la vista viene distrutta.

#### `view.setAutoResize(options)` *Sperimentale*

* `options` Oggetto 
  * `width` Boolean - Se `true` la larghezza della vista crescerà e si contrarrà insieme alla finestra. `false` di default.
  * `height` Boolean - Se `true`, la vista dell'altezza crescerà e si contrarrà con la finestra. `false` di default.

#### `view.setBounds(bounds)` *Sperimentale*

* `bounds` [Rectangle](structures/rectangle.md)

Ridimensiona e muovi la vista ai limiti forniti relativamente alla finestra.

#### `view.setBackgroundColor(color)` *Sperimentale*

* `color` String - Colore nel formato `#aarrggbb` o `#argb`. Il canale alpha é opzionale.