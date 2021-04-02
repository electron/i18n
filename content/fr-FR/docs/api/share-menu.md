## Classe: ShareMenu

> Créez un menu de partage sur macOS.

Processus : [Main](../glossary.md#main-process)

La `ShareMenu` crée [share menu][share-menu] sur macOS, qui peut être utilisé pour partager des informations du contexte actuel aux applications, médias sociaux comptes, et d’autres services.

Pour inclure le menu de partage comme un sous-nombre d’autres menus, s’il vous plaît utiliser `shareMenu` rôle de [`MenuItem`](menu-item.md).

### `nouveau ShareMenu (sharingItem)`

* `sharingItem` SharingItem - L’élément à partager.

Crée un nouveau menu de partage.

### Méthodes d’instance

L `shareMenu` objet a les méthodes d’instance suivantes :

#### `shareMenu.popup ([options])`

* `options` PopupOptions (facultatif)
  * `browserWindow` [BrowserWindow](browser-window.md) (facultatif) - La fenêtre focalisée est par défaut.
  * `x` Number (facultatif) - C'est par défaut la position actuelle du curseur de la souris. Doit être déclaré si `y` est déclaré.
  * `x` Number (facultatif) - C'est par défaut la position actuelle du curseur de la souris. Doit être déclaré si `x` est déclaré.
  * `positioningItem` Number (facultatif) _macOS_ - L'index de l'élément de menu à positionner sous le curseur de la souris aux coordonnées spécifiées. est. La valeur par défaut est -1.
  * `callback` Fonction (facultatif) - Appelée lorsque le menu est fermé.

Dépile ce menu sous la forme d'un menu contextuel dans la [`BrowserWindow`](browser-window.md).

#### `shareMenu.closePopup ([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif) - La fenêtre focalisée est par défaut.

Ferme le menu contextuel dans la `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
