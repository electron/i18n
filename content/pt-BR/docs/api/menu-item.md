## Class: MenuItem

> Adicione itens para menus e menus de contexto para aplicações nativas.

Processo: [Main](../glossary.md#main-process)

Veja [`Menu`](menu.md) para exemplos.

### `new MenuItem(options)`

* objeto `options`
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
* `toggleDevTools` - Alternar ferramentas de desenvolvedor na janela atual.
* `togglefullscreen` - Alterne o modo de tela cheia na janela atual.
* `resetZoom` - Redefinir o nível de zoom da página focada para o tamanho original.
* `zoomIn` - Zoom na página focada em 10%.
* `zoomOut` - Ampliar a página focada em 10%.
* `toggleSpellChecker` - Ativar/desativar o verificador ortomfeito incorporado.
* `fileMenu` - Menu "Arquivo" padrão completo (Fechar / Sair)
* `editMenu` - Menu "Edit" padrão inteiro (Desfazer, Copiar, etc.).
* `viewMenu` - Menu padrão completo "Exibir" (Recarregar, Alternar ferramentas de desenvolvedor, etc.)
* `windowMenu` - Menu "Janela" padrão completo (Minimizar, Zoom, etc.).

As seguintes funções adicionais estão disponíveis no</em>_macOS :</p> 

* `appMenu` - Menu padrão completo de "App" (Sobre, Serviços, etc.)
* `hide` - Mapeia para a ação `hide`.
* `hideOthers` - Mapa para a ação `hideOtherApplications` .
* `hideothers` - Mapeia para a ação `unhideAllApplications`.
* `startSpeaking` - Mapa para a ação `startSpeaking` .
* `stopSpeaking` - Mapa para a ação `stopSpeaking` .
* `hide` - Mapeia para a ação `arrangeInFront`.
* `zoom` - Mapeia para a ação `performZoom`.
* `toggleTabBar` - Mapa para a ação `toggleTabBar` .
* `selectNextTab` - Mapa para a ação `selectNextTab` .
* `selectPreviousTab` - Mapa para a ação `selectPreviousTab` .
* `mergeAllWindows` - Mapa para a ação `mergeAllWindows` .
* `moveTabToNewWindow` - Mapa para a ação `moveTabToNewWindow` .
* `window` - O submenu é um menu "Janela".
* `help` - O submenu é um menu "Ajuda".
* `services` - O submenu é um menu</a> "Serviços". Este é destinado apenas para uso no Menu de Aplicativos e não é *não* o mesmo que o submenu "Serviços" usado em menus de contexto em aplicativos macOS, que não é implementado na Electron.</li> 
  
  * `recentDocuments` - O submenu é um menu "Open Recent".
* `clearRecentDocuments` - Mapa para a ação `clearRecentDocuments` .
* `shareMenu` - O submenu é [menu de compartilhamento][ShareMenu]. A propriedade `sharingItem` também deve ser definida para indicar o item a compartilhar.</ul> 

Ao especificar um `role` no macOS, `label` e `accelerator` são as únicas opções que afetarão o item do menu. Todas as outras opções serão ignoradas. `role`minúsculas, por exemplo. `toggledevtools`, ainda é apoiado.

**Nota Bene:** As propriedades `enabled` e `visibility` não estão disponíveis para itens de menu de alto nível na bandeja no macOS.



### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `MenuItem`:



#### `menuItem.id`

Uma `String` indicando o id exclusivo do item, esta propriedade pode ser alterada dinamicamente.



#### `menuItem.label`

Um `String` indicando o rótulo visível do item.



#### `menuItem.click`

Uma `Function` que é ativada quando um item de menu recebe um evento de clique. Pode ser chamado com `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* </a>do Navegador `focusedWindow` </li> 
  
  * `focusedWebContents` [WebContents](web-contents.md)</ul> 



#### `menuItem.submenu`

Um `Menu` (opcional) contendo o menu submenu do item, se presente.



#### `menuItem.type`

Um `String` indicando o tipo do item. Pode ser `normal`, `separator`, `submenu`, `checkbox` ou `radio`.



#### `menuItem.role`

Um `String` (opcional) indicando a função do item, se definido. Podem ser `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`,  ,  , `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu` `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` ou `windowMenu`



#### `menuItem.acelerador`

Um `Accelerator` (opcional) indicando o acelerador do item, se definido.



#### `menuItem.ícone`

Um `NativeImage | String` (opcional) indicando o ícone do item , se definido.



#### `menuItem.sublabel`

Um `String` indicando a sublato do item.



#### `menuItem.toolTip` __macOS

Um `String` indicando o texto do item pairando.



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

Uma `Boolean` indicando se o acelerador deve ser registrado no sistema ou apenas exibido.

Esta propriedade pode ser alterada dinamicamente.



#### `menuItem.sharingItem` __macOS

Um `SharingItem` indicando o item para compartilhar quando o `role` é `shareMenu`.

Esta propriedade pode ser alterada dinamicamente.



#### `menuItem.commandId`

Um `Number` indicando o id único sequencial de um item.



#### `menuItem.menu`

Um `Menu` que o item faz parte.

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
