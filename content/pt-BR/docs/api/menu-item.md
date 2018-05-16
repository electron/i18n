## Class: MenuItem

> Adicione itens para menus e menus de contexto para aplicações nativas.

Processo: [Main](../glossary.md#main-process)

Veja [`Menu`](menu.md) para exemplos.

### `new MenuItem(options)`

* `opções` Object 
  * `click` Function (opcional) - Vai ser chamado com `click(menuItem, browserWindow, event)` quando o item de menu for clicado. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Event
  * `role` String (opcional) - Define a ação do click no menu, quando especificado a propriedade `click` será ignorada. Veja [roles](#roles).
  * `type` String (opcional) - Pode ser `normal`, `separator`, `submenu`, `checkbox` ou `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (opcional) - Atalho
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (optional) - Se falso, o item do menu vai ser não-clicável e cinza.
  * `visible` Boolean (opcional) - Se falso, o item do menu será inteiramente escondido.
  * `checked` Boolean (opcinal) - Deve ser especificado apenas para `checkbox` ou `radio` tipos de item de menu.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. Se `submenu` for especificado, o `type: 'submenu'` pode ser omitido. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
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
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - Minimize current window.
* `close` - Close current window.
* `quit`- Quit the application.
* `reload` - Reload the current window.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen`- Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.).
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.).

The following additional roles are available on *macOS*:

* `about` - Map to the `orderFrontStandardAboutPanel` action.
* `hide` - Map to the `hide` action.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Map to the `unhideAllApplications` action.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Map to the `arrangeInFront` action.
* `zoom` - Map to the `performZoom` action.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a "Services" menu.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

### Propriedades da Instância

As seguintes propriedades estão disponíveis em instâncias de `MenuItem`:

#### `menuItem.enabled`

Um `Boolean` indicando se o item está ativo, essa propriedade pode ser alterada dinamicamente.

#### `menuItem.visible`

Um `Boolean` indicando se o item está visível, essa propriedade pode ser alterada dinamicamente.

#### `menuItem.checked`

Um `Boolean` indicando se o item está ativo ou não, essa propriedade pode ser alterada dinamicamente.

Um item do menu de um `checkbox` irá mudar a propriedade `checked` para ativa ou não quando selecionada.

Um item do menu de um `radio` irá ativar a sua propriedade `checked` quando clicado, e irá desativar essa propriedade para todos os itens adjacentes no mesmo menu.

Você pode adicionar uma função `click` para comportamentos adicionais.

#### `menuItem.label`

A `String` representing the menu items visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.