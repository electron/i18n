## Class: Menu

> Cria menus de aplicativo e menus de contexto nativos.

Processo: [Main](../glossary.md#main-process)

### `new Menu()`

Cria um novo menu.

### Métodos estáticos

A classe `menu` tem os seguintes métodos estáticos:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Define `menu` como o menu de aplicativo no macOS. No Windows e no Linux, o `menu` será definido como menu superior de cada janela.

Passando `null` removerá a barra de menus no Windows e Linux, mas não tem efeito no macOS.

**Nota:** Esta API tem que ser chamada após o evento `ready` do módulo do `app`.

#### `Menu.getApplicationMenu()`

Retorna `Menu | null` - O menu do aplicativo, se definido, ou `null`, se não fora definido.

**Nota:** A instancia `Menu` retornada não suporta adição dinâmica ou remoção de itens de menu. [Instance properties](#instance-properties) ainda podem ser modificadas dinamicamente.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

Sends the `action` to the first responder of application. This is used for emulating default macOS menu behaviors. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

See the [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) for more information on macOS' native actions.

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

Returns `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

Você também pode anexar outros campos ao elemento do `template` e eles se tornarão propriedades dos itens de menu construídos.

### Métodos de Instância

O objeto `menu` possui os seguintes métodos de instância:

#### `menu.popup(options)`

* `options` Object 
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

Fecha o menu de contexto em `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Acrescenta o `menuItem` ao menu.

#### `menu.getMenuItemById(id)`

* `id` String

Returns `MenuItem` the item with the specified `id`

#### `menu.Insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

Insere o `menuItem` na posição `pos` do menu.

### Eventos de instância

Objects created with `new Menu` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### Event: 'menu-will-show'

Retorna:

* `event` Event

Emitted when `menu.popup()` is called.

#### Event: 'menu-will-close'

Retorna:

* `event` Event

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### Propriedades de Instância

Objetos `menu` também possuem as seguintes propriedades:

#### `menu.items`

Um array `MenuItem[]` contendo os itens do menu.

Cada `Menu` consiste de múltiplos [`MenuItem`](menu-item.md)s e cada `MenuItem` pode ter um submenu.

### Eventos de instância

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## Exemplos

A classe `Menu` só está disponível no processo principal, mas você também pode usá-lo no processo de renderização através do módulo [`remoto`](remote.md).

### Processo principal

Um exemplo de criar o menu do aplicativo no processo principal com a API do modelo simples:

```javascript
const {app, Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Processo de renderização

Abaixo está um exemplo de criação dinâmica de um menu em uma página da web (processo de renderização) usando o módulo [`remoto`](remote.md), e o mostra quando o usuário clica com o botão direito na página:

```html
<!-- index.html -->
<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({window: remote.getCurrentWindow()})
}, false)
</script>
```

## Notas sobre o Menu de aplicativo no macOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Menus Padrão

On macOS there are many system-defined standard menus, like the `Services` and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `window`
* `help`
* `services`

### Ações padronizadas para Item de Menu

O macOS fornece ações padronizadas para alguns itens de menu, como `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### Nome do Menu Principal

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## Setting Menu for Specific Browser Window (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Posição do Item de menu

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
* `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### Exemplos

Template:

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
<br />- 1
- 2
- 3
- 4
```

Template:

```javascript
[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', label: 'three', beforeGroupContaining: ['1'] },
  { id: '4', label: 'four', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
```

Menu:

```sh
<br />- 3
- 4
- ---
- 1
- ---
- 2
```

Template:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Menu:

```sh
<br />- ---
- 3
- 2
- 1
```