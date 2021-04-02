## Classe: ShareMenu

> Crie menu de compartilhamento no macOS.

Processo: [Main](../glossary.md#main-process)

A classe `ShareMenu` cria</a>

Menu de Compartilhamento no macOS, que pode ser usado para compartilhar informações do contexto atual para aplicativos, contas de de mídia social e outros serviços.</p> 

Para incluir o menu de ações como um submenu de outros menus, use o `shareMenu` papel de [`MenuItem`](menu-item.md).



### `novo ShareMenu (sharingItem)`

* `sharingItem` SharingItem - O item a compartilhar.

Cria um novo menu de ações.



### Métodos de Instância

O objeto `shareMenu` tem os seguintes métodos de instância:



#### `shareMenu.popup ([options])`

* `options` PopupOptions (opcional) 
    * `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Padrão é a janela focada.
  * `x` Número (opcional) - Padrão é a posição atual do cursor do mouse. Deve ser declarado se `y` for declarado.
  * `y` Número (opcional) - Padrão é a posição atual do cursor do mouse. Deve ser declarado se `x` for declarado.
  * número `positioningItem` (opcional) __ do macOS - O índice do item do menu ser posicionado sob o cursor do mouse nas coordenadas especificadas. O padrão é -1.
  * função `callback` (opcional) - Chamado quando o menu estiver fechado.

Aparece este menu como um menu de contexto no [`BrowserWindow`](browser-window.md).



#### `shareMenu.closePopup ([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Padrão é a janela focada.

Fecha o menu de contexto em `browserWindow`.
