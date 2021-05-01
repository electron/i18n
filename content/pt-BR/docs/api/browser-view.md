# BrowserView

Uma `BrowserView` pode ser usado para transformar um conteúdo web em

BrowserWindow`. Ela é como uma janela filha, exceto que ela está posicionada em relação à janela a que pertence. Isso quer dizer que ela pretende ser uma alternativa à tag <code>webview`.</p> 



## Class: BrowserView



> Cria e controla views.

Processo: [Main](../glossary.md#main-process)



### Exemplo



```javascript
// No processo main.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```




### `new BrowserView([options])` _Experimental_

* `options` Object (optional) 
    * `webPreferences` Objeto (opcional) - Veja [BrowserWindow](browser-window.md).



### Propriedades de Instância

Objectos criados com `new BrowserView` posuem as seguintes propriedades:



#### `view.webContents` _Experimental_

Um objeto [`WebContents`](web-contents.md) que pertence à esta vizualização.



### Métodos de Instância

Objectos criados com `new BrowserView` possuem os seguintes métodos de instâncias:



#### `view.setAutoResize(options)` _Experimental_

* `options` Object 
    * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.



#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.



#### `view.getBounds()` _Experimental_

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.



#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
