## Classe: VistaBrowser

> Crea e controlla visite.

Processo: [Main](../glossary.md#main-process)

Una `BrowserView` può essere usata per incorporare del contenuto web aggiuntivo all'interno di una [`BrowserWindow`](browser-window.md). È come una finestra piccola, eccetto per il fatto che è posta in parentela alla finestra propria. È considerato essere un alternativa al tag `webview`.

### Esempio

```javascript
// Nel processo principale(main).
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `nuova BrowserView([options])` _Sperimentale_

* `options` Object (optional)
  * `webPreferences` Object (opzionale) - Vedi [BrowserWindow](browser-window.md).

### Proprietà Istanza

Oggetti creato con `nuova VistaBrowser` hanno le seguenti proprietà:

#### `vista.Contenutiweb` _Sperimentale_

Un oggetto [`ContenutiWeb`](web-contents.md) da questa vista.

### Metodi Istanza

Oggetti creati con `nuova VistaBrowser` hanno i seguenti metodi d'istanza:

#### `vedi.impostaRidimensionaAutomaticamente(opzioni` _Sperimentale_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `vista.impostaLimiti(limiti)` _Sperimentale_

* `bounds` [Rectangle](structures/rectangle.md)

Ridimensiona e muovi la vista ai limiti forniti relativamente alla finestra.

#### `view.getBounds()` _Experimental_

Ritorna [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `vista.impostaColoreSfondo(colore)` _Sperimentale_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
