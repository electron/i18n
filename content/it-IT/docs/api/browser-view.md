## Classe: VistaBrowser

> Crea e controlla visite.

**Nota:** La VistaBrowser API è attualmente sperimentale e potrebbe cambiare o essere rimossa nei rilasci futuri di Electron.

Processo: [Main](../glossary.md#main-process)

Una `VistaBrowser` può essere usato per incorporare contenuti web aggiuntivi nella `FinestraBrowsee`. È come una finestra piccola, eccetto per il fatto che è posta in parentela alla finestra propria. È considerato essere un alternativa al tag `vistaweb`.

## Esempio

```javascript
// Nel processo principale.
const {BrowserView, BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

let view = new BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
})
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `nuova VistaBrowser([options])` *Sperimentale*

* `opzioni` Oggetto (opzionale) 
  * `Preferenzeweb` Oggetto (opzionale) - Vedi [FinestraBrowser](browser-window.md).

### Metodi Statici

#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - An array of all opened BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `ContenutiWeb` [ContenutiWeb](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Numero Intero

Returns `BrowserView` - The view with the given `id`.

### Proprietà Istanza

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *Experimental*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Metodi Istanza

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `opzioni` Oggetto 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `limiti` [Rettangolo](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.