## Class: BrowserView

> Cria e controla views.

Processo: [Main](../glossary.md#main-process)

Uma `BrowserView` pode ser usado para transformar um conteúdo web em

BrowserWindow`. Ela é como uma janela filha, exceto que ela está posicionada em relação à janela a que pertence. Isso quer dizer que ela pretende ser uma alternativa à tag <code>webview`.</p> 



### Exemplo



```javascript
// No processo main.
const { BrowserView, BrowserWindow } = require ('electron')

const win = novo BrowserWindow({ width: 800, height: 600 })

visor de const = novo BrowserView()
win.setBrowserView(visualização)
view.setBounds({ x: 0, y: 0, largura: 300, altura: 300 })
view.webContents.loadURL ('https://electronjs.org')
```




### `new BrowserView([options])` _Experimental_

* objeto `options` (opcional) 
    * `webPreferences` Objeto (opcional) - Veja [BrowserWindow](browser-window.md).



### Propriedades de Instância

Objectos criados com `new BrowserView` posuem as seguintes propriedades:



#### `view.webContents` _Experimental_

Um objeto [`WebContents`](web-contents.md) que pertence à esta vizualização.



### Métodos de Instância

Objectos criados com `new BrowserView` possuem os seguintes métodos de instâncias:



#### </em>Experimental `view.setAutoResize(options)` _</h4> 

* objeto `options` 
    * `width` Booleano (opcional) - Se `true`, a largura da vista crescerá e encolherá junto com a janela. `false` por padrão.
  * `height` Booleano (opcional) - Se `true`, a altura da vista crescerá e encolherá junto com a janela. `false` por padrão.
  * `horizontal` Booleano (opcional) - Se `true`, a posição e largura x da vista crescerão e diminuirão proporcionalmente com a janela. `false` por padrão.
  * `vertical` Booleano (opcional) - Se `true`, a posição e a altura da vista crescerão e diminuirão proporcionalmente com a janela. `false` por padrão.



#### </em>Experimental `view.setBounds(bounds)` _</h4> 

* `bounds` [Rectangle](structures/rectangle.md)

Redimensiona e move a visão para os limites fornecidos em relação à janela.



#### </em>Experimental `view.getBounds()` _</h4> 

Retornos [`Rectangle`](structures/rectangle.md)

A `bounds` desta instância do BrowserView como `Object`.



#### </em>Experimental `view.setBackgroundColor(color)` _</h4> 

* `color` String - Cor na forma `#aarrggbb` ou `#argb` . O canal alfa é opcional.
