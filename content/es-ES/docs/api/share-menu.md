## Clase: ShareMenu

> Create share menu on macOS.

Proceso: [Main](../glossary.md#main-process)

The `ShareMenu` class creates [Share Menu][share-menu] on macOS, which can be used to share information from the current context to apps, social media accounts, and other services.

For including the share menu as a submenu of other menus, please use the `shareMenu` role of [`MenuItem`](menu-item.md).

### `new ShareMenu(sharingItem)`

* `sharingItem` SharingItem - The item to share.

Creates a new share menu.

### Métodos de Instancia

The `shareMenu` object has the following instance methods:

#### `shareMenu.popup([options])`

* `options` PopupOptions (optional)
  * `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.
  * `x` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `y` es declarado.
  * `y` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `x` es declarado.
  * `positioningItem` Número (opcional) _macOS_ - El índice del elemento del menú que debe ser posicionado debajo del cursor en las coordenadas específicas. El valor predeterminado es -1.
  * `callback` Function (opcional) - Llamada cuando se cierra el menu.

Este menú aparece como un menú contextual en el [`BrowserWindow`](browser-window.md).

#### `shareMenu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.

Cierra el menú de contexto en la `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
