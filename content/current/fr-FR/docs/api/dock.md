## Class: Dock

> Control your app in the macOS dock

Processus : [Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Méthodes d’instance

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Lorsque la `critical` est passé, l’icône du dock rebondira jusqu'à ce que l’application redevienne active ou que la requête est annulée.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Annule le rebond de l'`id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Fait rebondir la pile de téléchargements si le chemin d'accès se trouve le dossier Téléchargements.

#### `dock.setBadge(text)` _macOS_

* `text` String

Définit la chaîne de caractères à afficher dans la zone du badge du dock.

#### `dock.getBadge()` _macOS_

Retourne `String` - Le texte du badge du dock.

#### `dock.hide()` _macOS_

Masque l’icône du dock.

#### `dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

#### `dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône du dock.
