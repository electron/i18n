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

### `nuova BrowserView([options])` _Sperimentale_

* `options` Object (optional)
  * `webPreferences` Object (opzionale) - Vedi [BrowserWindow](browser-window.md).

### Metodi Statici

#### `BrowserView.getAllViews()`

Restituisce `BrowserView[]` - una array di tutti i BrowserViews aperti.

#### `BrowserView.fromWebContents(webContents)`

* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Restituisce `BrowserView | null`-The BrowserView che possiede il dato `webContents` o `null` se il contenuto non è di proprietà di un BrowserView.

#### `BrowserView.fromId(id)`

* `id` Numero Intero

Restituisce `VistaBrowser` - La vista con l'`id` dato.

### Proprietà Istanze

Oggetti creato con `nuova VistaBrowser` hanno le seguenti proprietà:

#### `vista.Contenutiweb` _Sperimentale_

Un oggetto [`ContenutiWeb`](web-contents.md) da questa vista.

#### `vista.id` _Sperimentale_

Un numero `Intero` rappresentante l'unico ID di visualizzazione.

### Metodi Istanza

Oggetti creati con `nuova VistaBrowser` hanno i seguenti metodi d'istanza:

#### `view.destroy()`

Forza la chiusura della vista, gli enventi `unload` e `beforeunload` non verranno emessi per la pagina web. Dopo che hai finito con una vista, chiama questa funzione per liberare memoria e altre risorse il prima possibile.

#### `view.isDestroyed()`

Restituisce `Boolean` - Se la vista viene distrutta.

#### `vedi.impostaRidimensionaAutomaticamente(opzioni` _Sperimentale_

* `options` Object
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean - If `true`, the view's x position and width will grow and shrink proportionly with the window. `false` by default.
  * `vertical` Boolean - If `true`, the view's y position and height will grow and shrink proportinaly with the window. `false` by default.

#### `vista.impostaLimiti(limiti)` _Sperimentale_

* `bounds` [Rectangle](structures/rectangle.md)

Ridimensiona e muovi la vista ai limiti forniti relativamente alla finestra.

#### `vista.impostaColoreSfondo(colore)` _Sperimentale_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
