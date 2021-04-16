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
    * `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).



#### `shareMenu.closePopup ([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

Fecha o menu de contexto em `browserWindow`.
