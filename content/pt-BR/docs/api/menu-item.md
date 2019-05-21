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
  * `role` String (optional) - Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteandmatchstyle`, `delete`, `selectall`, `reload`, `forcereload`, `toggledevtools`, `resetzoom`, `zoomin`, `zoomout`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideothers`, `unhide`, `quit`, `startspeaking`, `stopspeaking`, `close`, `minimize`, `zoom` or `front` - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
  * `type` String (opcional) - Pode ser `normal`, `separator`, `submenu`, `checkbox` ou `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (opcional) - Atalho
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (optional) - Se falso, o item do menu vai ser não-clicável e cinza.
  * `visible` Boolean (opcional) - Se falso, o item do menu será inteiramente escondido.
  * `checked` Boolean (opcinal) - Deve ser especificado apenas para `checkbox` ou `radio` tipos de item de menu.
  * `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (opcional) - Unico em um menu. Se definido, pode então ser utilizado como uma referencia para esse item pelo atributo de posição.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

### Roles

Roles permitem itens de menu items terem funcionamentos pré-definidos.

É melhor especificar `role` para qualquer item de menu que utiliza uma role padrão, ao invés de tentar implementar manualmente um funcionamento em uma função de `click`. O funcionamento built-in `role` dará a melhor experiência nativa.

O valor de `label` e de `accelerator`são opcionais quando utilizando uma `role` e lhes serão dados valores padrão apropriados para cada plataforma.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

A propriedade `role` pode ter os seguintes valores:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - Minimiza a janela atual.
* `close` - Fecha a janela atual.
* `quit` - Quit the application.
* `reload` - Recarrega a janela atual.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen` - Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `fileMenu` - Whole default "File" menu (Close / Quit)
* `editMenu` - Menu "Edit" padrão inteiro (Desfazer, Copiar, etc.).
* `viewMenu` - Whole default "View" menu (Reload, Toggle Developer Tools, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Zoom, etc.).

The following additional roles are available on *macOS*:

* `appMenu` - Whole default "App" menu (About, Services, etc.)
* `about` - Mapeia para a ação `orderFrontStandardAboutPanel`.
* `hide` - Mapeia para a ação `hide`.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `hideothers` - Mapeia para a ação `unhideAllApplications`.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `hide` - Mapeia para a ação `arrangeInFront`.
* `zoom` - Mapeia para a ação `performZoom`.
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

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

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

Uma `String` representando os rótulos visíveis dos itens do menu.

#### `menuItem.click`

Uma `Function` que é ativada quando um item de menu recebe um evento de clique.