## Class: Menu

> Cria menus de aplicativo e menus de contexto nativos.

Processo: [Main](../glossary.md#main-process)

### `new Menu()`

Cria um novo menu.

### Métodos estáticos

A classe `Menu` tem os seguintes métodos estáticos:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Define `menu` como o menu de aplicação no macOS. No Windows e Linux, o `menu` será definido como o menu superior de cada janela.

Também no Windows e Linux, você pode usar um `&` no nome do item de alto nível para indicar qual letra deve receber um acelerador gerado. Por exemplo, o uso de `&File` para o menu de arquivos resultaria em um acelerador de `Alt-F` gerado que abre o menu associado. O caractere indicado na etiqueta do botão recebe um sublinhado. O caractere `&` não é exibido na etiqueta do botão.

Passar `null` suprimirá o menu padrão. No Windows e Linux, isso tem o efeito adicional de remover a barra de menu da janela.

**Nota:** O menu padrão será criado automaticamente se o aplicativo não definir um. Contém itens padrão como `File`, `Edit`, `View`, `Window` e `Help`.

#### `Menu.getApplicationMenu()`

Retorna `Menu | null` - O menu do aplicativo, se definido, ou `null`, se não fora definido.

**Nota:** A instancia `Menu` retornada não suporta adição dinâmica ou remoção de itens de menu. [Instance properties](#instance-properties) ainda podem ser modificadas dinamicamente.

#### `Menu.sendActionToFirstResponder(action)` __macOS

* `action` String

Envia o `action` para o socorrista de aplicação. Isso é usado para imitar comportamentos padrão do menu macOS. Normalmente você usaria a propriedade [`role`](menu-item.md#roles) de um [`MenuItem`](menu-item.md).

Consulte o guia de tratamento de eventos [macOS Cacau](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) para obter mais informações sobre as ações nativas do macOS.

#### `Menu.buildFromTemplate(modelo)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Retornos `Menu`

Geralmente, o `template` é uma matriz de `options` para a construção de um menu</a>. O uso pode ser referenciado acima.</p> 

Você também pode anexar outros campos ao elemento do `template` e eles se tornarão propriedades dos itens do menu construído.



### Métodos de Instância

O objeto `menu` possui os seguintes métodos de instância:



#### `menu.popup([options])`

* objeto `options` (opcional) 
    * `window` [BrowserWindow](browser-window.md) (opcional) - Padrão é a janela focada.
  * `x` Número (opcional) - Padrão é a posição atual do cursor do mouse. Deve ser declarado se `y` for declarado.
  * `y` Número (opcional) - Padrão é a posição atual do cursor do mouse. Deve ser declarado se `x` for declarado.
  * número `positioningItem` (opcional) __ do macOS - O índice do item do menu ser posicionado sob o cursor do mouse nas coordenadas especificadas. O padrão é -1.
  * função `callback` (opcional) - Chamado quando o menu estiver fechado.

Aparece este menu como um menu de contexto no [`BrowserWindow`](browser-window.md).



#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Padrão é a janela focada.

Fecha o menu de contexto em `browserWindow`.



#### `menu.append(menuItem)`

* menu `menuItem` [Item](menu-item.md)

Acrescenta o `menuItem` ao menu.



#### `menu.getMenuItemById(id)`

* `id` String

Devoluções `MenuItem | null` o item com o `id`especificado



#### `menu.Insert(pos, menuItem)`

* `pos` Integer
* menu `menuItem` [Item](menu-item.md)

Insere o `menuItem` na posição `pos` do menu.



### Eventos de instância

Objetos criados com `new Menu` ou devolvidos por `Menu.buildFromTemplate` emitir os seguintes eventos:

**Nota:** Alguns eventos só estão disponíveis em sistemas operacionais específicos e são rotulados como tal.



#### Evento: 'menu-will-show'

Retorna:

* `event` Event

Emitido quando `menu.popup()` é chamado.



#### Evento: 'menu-will-close'

Retorna:

* `event` Event

Emitido quando um popup é fechado manualmente ou com `menu.closePopup()`.



### Propriedades de Instância

Objetos `menu` também possuem as seguintes propriedades:



#### `menu.items`

Um array `MenuItem[]` contendo os itens do menu.

Cada `Menu` consiste de múltiplos [`MenuItem`](menu-item.md)s e cada `MenuItem` pode ter um submenu.



## Exemplos

Um exemplo de criação do menu de aplicativos com a API de modelo simples:



```javascript
const { app, Menu } = require ('elétron')

const isMac = process.platform === 'darwin'

modelo const = [
  // { role: 'appMenu' }
  ... (isMac? [{
    rótulo: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]

      
    
    { role: 'fileMenu' }
  
  } { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ... (isMac? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          rótulo: 'Fala',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    rótulo: 'Janela',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ... (isMac? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ]
        { role: 'close' }

    ]
  } ,
  {
    papel: 'ajuda',
    submenu: [
      {
        rótulo: 'Saiba mais',
        clique: async () => {
          const { shell } = require ('electron')
          aguardam shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

menu const = Menu.buildFromTemplate(modelo)
Menu.setApplicationMenu(menu)
```




### Processo de renderização

Para criar menus iniciados pelo processo renderizador, envie as informações necessárias para o processo principal usando iPC e que o processo principal exiba o menu em nome da renderizador.

Abaixo está um exemplo de mostrar um menu quando o usuário clica com o botão direito do usuário na página:



```js
renderer
janela.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, comando) => {
  // ...
})

// principal
ipcMain.on ('show-context-menu', (evento) => {
  modelo const = [
    {
      rótulo: 'Item do menu 1',
      clique: () => { event.sender.send('context-menu-command', 'menu-item-1') }
    },
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  menu const = Menu.buildFromTemplate(template)
  menu.popup (BrowserWindow.fromWebContents(event.sender))
})
```




## Notas sobre o Menu de aplicativo no macOS

o macOS tem um estilo completamente diferente de menu de aplicativos do Windows e Linux. Aqui estão algumas notas sobre como tornar o menu do seu aplicativo mais nativo.



### Menus Padrão

No macOS existem muitos menus padrão definidos pelo sistema, como os menus [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) e `Windows` . Para tornar seu menu um menu padrão, você deve definir a `role` do seu menu para um dos seguintes e a Electron irá reconhecê-los e fazê-los se tornarem menus padrão:

* `window`
* `help`
* `services`



### Ações padronizadas para Item de Menu

O macOS fornece ações padronizadas para alguns itens de menu, como `About xxx`, `Hide xxx`, and `Hide Others`. Para definir a ação de um item do menu a uma ação padrão , você deve definir o atributo `role` do item do menu.



### Nome do Menu Principal

No macOS, o rótulo do primeiro item do menu do aplicativo é sempre o nome do seu app, não importa qual rótulo você definir. Para alterá-lo, modifique o arquivo `Info.plist` do seu pacote de aplicativos. Consulte [sobre arquivos de lista de propriedades de informações][AboutInformationPropertyListFiles] para obter mais informações.



## Configuração de menu para janela específica do navegador (*Linux* **do Windows )

O método [`setMenu`][setMenu] das janelas do navegador pode definir o menu de certas janelas de navegador.



## Posição do Item de menu

Você pode fazer uso de `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` e `id` para controlar como o item será colocado ao construir um menu com `Menu.buildFromTemplate`.

* `before` - Insira este item antes do item com a etiqueta especificada. Se o item não existir, o item será inserido no final de menu. Também implica que o item do menu em questão deve ser colocado no mesmo "grupo" que o item.

* `after` - Insira este item após o item com a etiqueta especificada. Se o item não existir, o item será inserido no final de menu. Também implica que o item do menu em questão deve ser colocado no mesmo "grupo" que o item.

* `beforeGroupContaining` - Fornece um meio para que um único menu de contexto declare a colocação de seu grupo contendo antes do grupo contendo do item com o rótulo especificado.

* `afterGroupContaining` - Fornece um meio para que um único menu de contexto declare colocação de seu grupo contendo após o grupo contendo do item com o rótulo especificado.

Por padrão, os itens serão inseridos na ordem em que existem no modelo, a menos que uma das palavras-chave de posicionamento especificadas seja usada.



### Exemplos

Modelo:



```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```


Menu:



```sh
- 1
- 2
- 3
- 4
```


Modelo:



```javascript
[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', rótulo: 'três', antes doGroupContaining: ['1'] },
  { id: '4', rótulo: 'quatro', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
```


Menu:



```sh
- 3
- 4
- ---
- 1
- ---
- 2
```


Modelo:



```javascript
[
  { id: '1', rótulo: 'um', depois: ['3'] },
  { id: '2', rótulo: 'dois', antes: ['1'] },
  { id: '3', label: 'three' }
]
```


Menu:



```sh
- ---
- 3
- 2
- 1
```

[AboutInformationPropertyListFiles]: https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html
[setMenu]: https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows
