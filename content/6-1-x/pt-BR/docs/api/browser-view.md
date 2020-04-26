## Class: BrowserView

> Cria e controla views.

Processo: [Main](../glossary.md#main-process)

Uma `BrowserView` pode ser usado para transformar um conteúdo web em

BrowserWindow`. Ela é como uma janela filha, exceto que ela está posicionada em relação à janela a que pertence. Isso quer dizer que ela pretende ser uma alternativa à tag <code>webview`.</p> 



## Exemplo



```javascript
// No processo main.
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




### `new BrowserView([options])` _Experimental_

* `options` Object (optional) 
    * `webPreferences` Objeto (opcional) - Veja [BrowserWindow](browser-window.md).



### Métodos estáticos



#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - Uma array of todos os BrowserViews abertos.



#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Retorna `BrowserView | null` - O BrowserView que possui o `webContents` ou `null` se um BrowserView não é o dono.



#### `BrowserView.fromId(id)`

* `id` Inteiro

Retorna `BrowserView` - A view com o `id` passado.



### Propriedades de Instância

Objectos criados com `new BrowserView` posuem as seguintes propriedades:



#### `view.webContents` _Experimental_

Um objeto [`WebContents`](web-contents.md) que pertence à esta vizualização.



#### `view.id` _Experimental_

Um `Integer` representanto o único ID da visualização.



### Métodos de Instância

Objectos criados com `new BrowserView` possuem os seguintes métodos de instâncias:



#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.



#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.



#### `view.setAutoResize(options)` _Experimental_

* `options` Object 
    * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean - If `true`, the view's x position and width will grow and shrink proportionly with the window. `false` by default.
  * `vertical` Boolean - If `true`, the view's y position and height will grow and shrink proportinaly with the window. `false` by default.



#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.



#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
