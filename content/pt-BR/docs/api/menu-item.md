## Class: MenuItem

> Adicione itens para menus e menus de contexto para aplicações nativas.

Processo: [Main](../glossary.md#main-process)

Veja [`Menu`](menu.md) para exemplos.

### `new MenuItem(options)`

* `opções` Object 
  * `click` Function (opcional) - Vai ser chamado com `click(menuItem, browserWindow, event)` quando o item de menu for clicado. 
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
* `copy`
* `paste`
* `pasteandmatchstyle`
* `selectall`
* `delete`
* `minimize` - Minimiza a janela atual
* `close` - Fecha a janela atual
* `quit`- Fecha a aplicação
* `reload` - Recarrega a janela atual
* `forcereload` - Recarrega a janela atual, ignorando o cache.
* `toggledevtools` - Alterna ferramentas de desenvolvedor na janela atual
* `togglefullscreen`- Alterna o modo de tela cheia na janela atual
* `resetzoom` - Reseta o zoom da pagina focada para seu valor original
* `zoomin` - O zoom na pagina focada é aumentado em 10%
* `zoomout` - O zoom na pagina focada é diminuido em 10%
* `editMenu` - Menu "Edit" padrão inteiro (Desfazer, Copiar, etc.)
* `windowMenu` - Menu "Window" padrão inteiro (Minimizar, Fechar, etc.)

As seguintes roles adicionais estão disponíveis no macOS:

* `about` - Mapeia para a ação `orderFrontStandardAboutPanel`
* `hide` - Mapeia para a ação `hide`
* `hideothers` - Mapeia para a ação `hideOtherApplications`
* `hideothers` - Mapeia para a ação `unhideAllApplications`
* `startspeaking` - Mapeia para a ação `startSpeaking`
* `startspeaking` - Mapeia para a ação `stopSpeaking`
* `hide` - Mapeia para a ação `arrangeInFront`
* `zoom` - Mapeia para a ação `performZoom`
* `toggletabbar` - Mapeia para a ação `toggleTabBar`
* `selectnexttab` - Mapeia para a ação `selectNextTab`
* `selectprevioustab` - Mapeia para a ação `selectPreviousTab`
* `mergeallwindows` - Mapeia para a ação `mergeAllWindows`
* `movetabtonewwindow` - Mapeia para a ação `moveTabToNewWindow`
* `window` -O submenu é um menu "Window"
* `help` - O submenu é um menu "Help"
* `services` - O submenu é um menu "Services"

Quando especificando uma `role` no macOS, `label` e `accelerator` são as únicas opções que irão afetar o item de menu. Todas as outras opções serão ignoradas.

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

Uma `String` representando os rótulos visíveis dos itens do menu

#### `menuItem.click`

Uma `Function` que é ativada quando um item de menu recebe um evento de clique