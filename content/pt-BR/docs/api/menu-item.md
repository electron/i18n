## Class: MenuItem

> Adicione itens para menus e menus de contexto para aplicações nativas.

Processo: [Main](../glossary.md#main-process)

Veja [`Menu`](menu.md) para exemplos.

### `new MenuItem(options)`

* `options` Object
  * `click` Função (opcional) - Será chamado com `click(menuItem, browserWindow, event)` quando o item do menu for clicado.
    * `menuItem` MenuItem
    * </a> | do Navegador `browserWindow`

indefinido - Isso não será definido se nenhuma janela estiver aberta.</li> 
      
          * `event` [KeyboardEvent](structures/keyboard-event.md)</ul></li> 

  * `role` String (opcional) - Pode ser `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `zoom``stopSpeaking`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` ou `windowMenu` - Defina a ação do item do menu, quando especificado o `click` propriedade será ignorado. Veja [papéis](#roles).
  * `type` String (opcional) - Pode ser `normal`, `separator`, `submenu`, `checkbox` ou `radio`.
  * `label` String (opcional)
  * `sublabel` String (opcional)
  * `toolTip` String (opcional) __ macOS - Texto hover para este item do menu.
  * `accelerator` [Accelerator](accelerator.md) (opcional) - Atalho
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (optional) - Se falso, o item do menu vai ser não-clicável e cinza.
  * `acceleratorWorksWhenHidden` Boolean (opcional) __ do macOS - o padrão é `true`, e quando `false` impedirá o acelerador de acionar o item se o item não estiver visível".
  * `visible` Boolean (opcional) - Se falso, o item do menu será inteiramente escondido.
  * `checked` Boolean (opcinal) - Deve ser especificado apenas para `checkbox` ou `radio` tipos de item de menu.
  * `registerAccelerator` Boolean (opcional) _Linux_ __ Do Windows - Se falso, o acelerador não será registrado com o sistema, mas ainda será exibido. Padrão para verdade.
  * `sharingItem` SharingItem (opcional) __ macOS - O item a ser compartilhado quando o `role` é `shareMenu`.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (opcional) - Deve ser especificado para itens do menu de `submenu` tipo. Se `submenu` for especificado, o `type: 'submenu'` pode ser omitido. Se o valor não for um [`Menu`](menu.md) , ele será automaticamente convertido para um usando `Menu.buildFromTemplate`.
  * `id` String (opcional) - Única dentro de um único menu. Se definido, então ele pode ser usado como uma referência a este item pelo atributo de posição.
  * `before` String[] (opcional) - Insere este item antes do item com a etiqueta especificada. Se o item referenciado não existir, o item será inserido no final do menu. Também implica que o item do menu em questão deve ser colocado no mesmo "grupo" que o item.
  * `after` String[] (opcional) - Insere este item após o item com a etiqueta especificada. Se o item não existir, o item será inserido no final de menu.
  * `beforeGroupContaining` String[] (opcional) - Fornece um meio para que um único menu de contexto declare colocação de seu grupo de contenção antes que o grupo contendo do item com o rótulo especificado.
  * `afterGroupContaining` String[] (opcional) - Fornece um meio para que um único menu de contexto declare a colocação de seu grupo contendo após o grupo contendo do item com o rótulo especificado.</ul></li> </ul> 

**Nota:** `acceleratorWorksWhenHidden` é especificada como sendo apenas para macOS porque os aceleradores sempre funcionam quando os itens estão escondidos no Windows e linux. A opção é exposta aos usuários para dar-lhes a opção de desligá-lo, pois isso é possível no desenvolvimento nativo do macOS. Esta propriedade só é utilizável no macOS High Sierra 10.13 ou mais recente.



### Roles

Roles permitem itens de menu items terem funcionamentos pré-definidos.

É melhor especificar `role` para qualquer item de menu que utiliza uma role padrão, ao invés de tentar implementar manualmente um funcionamento em uma função de `click`. O funcionamento built-in `role` dará a melhor experiência nativa.

O valor de `label` e de `accelerator`são opcionais quando utilizando uma `role` e lhes serão dados valores padrão apropriados para cada plataforma.

Cada item do menu deve ter uma `role`, `label`, ou no caso de um separador um `type`.

A propriedade `role` pode ter os seguintes valores:

* `undo`
* `about` - Acione um nativo sobre painel (caixa de mensagem personalizada na janela, que não fornece a sua própria).
* `redo`
* `cut`
* `copy`
* `paste`
* `colarAndMatchStyle`
* `Selectall`
* `delete`
* `minimize` - Minimiza a janela atual.
* `close` - Fecha a janela atual.
* `quit` - Saia do pedido.
* `reload` - Recarrega a janela atual.
* `forceReload` - Recarregue a janela atual ignorando o cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `togglefullscreen` - Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `toggleSpellChecker` - Enable/disable builtin spell checker.
* `fileMenu` - Whole default "File" menu (Close / Quit)
* `editMenu` - Menu "Edit" padrão inteiro (Desfazer, Copiar, etc.).
* `viewMenu` - Whole default "View" menu (Reload, Toggle Developer Tools, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Zoom, etc.).

The following additional roles are available on _macOS_:

* `appMenu` - Whole default "App" menu (About, Services, etc.)
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
* `services` - The submenu is a ["Services"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) menu. This is only intended for use in the Application Menu and is *not* the same as the "Services" submenu used in context menus in macOS apps, which is not implemented in Electron.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.
* `shareMenu` - The submenu is [share menu][ShareMenu]. The `sharingItem` property must also be set to indicate the item to share.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on macOS.



### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `MenuItem`:



#### `menuItem.id`

A `String` indicating the item's unique id, this property can be dynamically changed.



#### `menuItem.label`

A `String` indicating the item's visible label.



#### `menuItem.click`

Uma `Function` que é ativada quando um item de menu recebe um evento de clique. It can be called with `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)



#### `menuItem.submenu`

A `Menu` (optional) containing the menu item's submenu, if present.



#### `menuItem.type`

A `String` indicating the type of the item. Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.



#### `menuItem.role`

A `String` (optional) indicating the item's role, if set. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`



#### `menuItem.accelerator`

A `Accelerator` (optional) indicating the item's accelerator, if set.



#### `menuItem.icon`

A `NativeImage | String` (optional) indicating the item's icon, if set.



#### `menuItem.sublabel`

A `String` indicating the item's sublabel.



#### `menuItem.toolTip` _macOS_

A `String` indicating the item's hover text.



#### `menuItem.enabled`

Um `Boolean` indicando se o item está ativo, essa propriedade pode ser alterada dinamicamente.



#### `menuItem.visible`

Um `Boolean` indicando se o item está visível, essa propriedade pode ser alterada dinamicamente.



#### `menuItem.checked`

Um `Boolean` indicando se o item está ativo ou não, essa propriedade pode ser alterada dinamicamente.

Um item do menu de um `checkbox` irá mudar a propriedade `checked` para ativa ou não quando selecionada.

Um item do menu de um `radio` irá ativar a sua propriedade `checked` quando clicado, e irá desativar essa propriedade para todos os itens adjacentes no mesmo menu.

Você pode adicionar uma função `click` para comportamentos adicionais.



#### `menuItem.registerAccelerator`

A `Boolean` indicating if the accelerator should be registered with the system or just displayed.

This property can be dynamically changed.



#### `menuItem.sharingItem` _macOS_

A `SharingItem` indicating the item to share when the `role` is `shareMenu`.

This property can be dynamically changed.



#### `menuItem.commandId`

A `Number` indicating an item's sequential unique id.



#### `menuItem.menu`

A `Menu` that the item is a part of.

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
