# ShareMenu

The `ShareMenu` class creates [Share Menu][share-menu] on macOS, which can be used to share information from the current context to apps, social media accounts, and other services.

For including the share menu as a submenu of other menus, please use the `shareMenu` role of [`MenuItem`](menu-item.md).

## Class: ShareMenu

> Create share menu on macOS.

Processus : [Main](../glossary.md#main-process)

### `new ShareMenu(sharingItem)`

* `sharingItem` SharingItem - The item to share.

Creates a new share menu.

### Méthodes d’instance

The `shareMenu` object has the following instance methods:

#### `shareMenu.popup([options])`

* `options` PopupOptions (optional)
  * `browserWindow` [BrowserWindow](browser-window.md) (facultatif) - La fenêtre focalisée est par défaut.
  * `x` Number (facultatif) - C'est par défaut la position actuelle du curseur de la souris. Doit être déclaré si `y` est déclaré.
  * `x` Number (facultatif) - C'est par défaut la position actuelle du curseur de la souris. Doit être déclaré si `x` est déclaré.
  * `positioningItem` Number (facultatif) _macOS_ - L'index de l'élément de menu à positionner sous le curseur de la souris aux coordonnées spécifiées. est. La valeur par défaut est -1.
  * `callback` Fonction (facultatif) - Appelée lorsque le menu est fermé.

Dépile ce menu sous la forme d'un menu contextuel dans la [`BrowserWindow`](browser-window.md).

#### `shareMenu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif) - La fenêtre focalisée est par défaut.

Ferme le menu contextuel dans la `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
