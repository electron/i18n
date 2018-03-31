## Class: MenuItem

> Adicione itens para menus e menus de contexto para aplicações nativas.

Processo: [Main](../glossary.md#main-process)

Veja [`Menu`](menu.md) para exemplos.

### `new MenuItem(opcoes)`

* `opções` Object 
  * `click` Function(opcional) Vai ser chamado com `click(menuItem, browserWindow, event)` quando o item de menu for clicado. 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * `event` Event
  * `role` String (opcional) - Define a ação do click no menu, quando especificado a propriedade `click` será ignorada. Veja [roles](#roles).
  * `type` String (opcional) - Pode ser `normal`, `separator`, `submenu`, `checkbox` ou `radio`.
  * `label` String - (opcional)
  * `sublabel` String - (opcional)
  * `accelerator` [Accelerator](accelerator.md) (opcional) - Atalho
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (optional) - Se falso, o item do menu vai ser não-clicável e cinza.
  * `visible` Boolean (opcional) - Se falso, o item do menu será inteiramente escondido.
  * `checked` Boolean (opcinal) - Deve ser especificado apenas para `checkbox` ou `radio` tipos de item de menu.
  * `submenu` (MenuItemConstructorOptions[] | Menu) (opcional) - Deve ser especificado para os tipos de menu `submenu`. Se `submenu` for especificado, o `type: 'submenu'` pode ser omitido. Se o valor não for um `Menu` então ele será automaticamente convertido para um, utilizando `Menu.buildFromTemplate`.
  * `id` String (opcional) - Unico em um menu. Se definido, pode então ser utilizado como uma referencia para esse item pelo atributo de posição.
  * `position` String (opcional) - Esse campo permite definição estrita da localização específica dentro de um dado menu.

### Roles

Roles permitem itens de menu items terem funcionamentos pré-definidos.

É melhor especificar `role` para qualquer item de menu que utiliza uma role padrão, ao invés de tentar implementar manualmente um funcionamento em uma função de `click`. O funcionamento built-in `role` dará a melhor experiência nativa.

O valor de `label` e de `accelerator`são opcionais quando utilizando uma `role` e lhes serão dados valores padrão apropriados para cada plataforma.

A propriedade `role` pode ter os seguintes valores:

* `undo`
* `redo`
* `cut`
* `copiar`
* `paste`
* `pasteandmatchstyle`
* `selectall`
* `delete`
* `minimize` - Minimiza a janela atual
* `close` - Fecha a janela atual
* `quit`- Fecha a aplicação
* `reload` - Recarrega a janela atual
* `forcereload` - Recarrega a janela atual, ignorando o cache.
* `toggledevtools` - Toggle developer tools in the current window
* `togglefullscreen`- Toggle full screen mode on the current window
* `resetzoom` - Reset the focused page's zoom level to the original size
* `zoomin` - Zoom in the focused page by 10%
* `zoomout` - Zoom out the focused page by 10%
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.)

The following additional roles are available on macOS:

* `about` - Map to the `orderFrontStandardAboutPanel` action
* `hide` - Map to the `hide` action
* `hideothers` - Map to the `hideOtherApplications` action
* `unhide` - Map to the `unhideAllApplications` action
* `startspeaking` - Map to the `startSpeaking` action
* `stopspeaking` - Map to the `stopSpeaking` action
* `front` - Map to the `arrangeInFront` action
* `zoom` - Map to the `performZoom` action
* `toggletabbar` - Map to the `toggleTabBar` action
* `selectnexttab` - Map to the `selectNextTab` action
* `selectprevioustab` - Map to the `selectPreviousTab` action
* `mergeallwindows` - Map to the `mergeAllWindows` action
* `movetabtonewwindow` - Map to the `moveTabToNewWindow` action
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored.

### Propriedades da Instância

The following properties are available on instances of `MenuItem`:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event