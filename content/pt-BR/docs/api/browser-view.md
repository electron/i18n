## Classe: BrowserView

> Cria e controla views.

**Nota:** A API BrowserView atualmente é experimental e pode mudar ou ser removida em versões futuras do Electron.

Processo: [Main](../glossary.md#main-process)

Uma `BrowserView` pode ser usada para incorporar conteúdo web adicional em uma `BrowserWindow`. Ela é como uma janela filha, exceto que ela está posicionada em relação à janela a que pertence. Isso quer dizer que ela pretende ser uma alternativa à tag `webview`.

## Exemplo

```javascript
// No processo main.
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
view.webContents.loadURL('https://electron.atom.io')
```

### `new BrowserView([opções])` *Experimental*

* `opções` Objeto (opcional) 
  * `webPreferences` Objeto (opcional) - Veja [BrowserWindow](browser-window.md).

### Métodos estáticos

#### `BrowserView.fromId(id)`

* `id` Inteiro

Retorna `BrowserView` - A view com o `id` passado.

### Propriedades da Instância

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *Experimental*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Instance Methods

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `options` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.