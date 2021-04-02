## Classe: Dock

> Contrôlez votre application sur le dock macOS

Processus : [Main](../glossary.md#main-process)

L’exemple suivant montre comment faire rebondir votre icône sur le dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Méthodes d’instance

#### `dock.bounce([type])` _macOS_

* `type` String (facultatif) - Peut être `critical` ou `informational`. La valeur par défaut est `informational`

Retourne `Integer` - une pièce d’identité représentant la demande.

Lorsque la `critical` est passé, l’icône du dock rebondira jusqu'à ce que l’application redevienne active ou que la requête est annulée.

Lorsque `informational` est passé, l’icône du dock rebondit pendant une seconde. Toutefois, la demande reste active jusqu’à ce que l’application active ou que la demande soit annulée.

**Nota Bene:** méthode ne peut être utilisée que lorsque l’application n’est pas ciblée; lorsque l’application est ciblée, elle reviendra -1.

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

Retourne `Promise<void>` - Se résout lorsque l’icône du dock est affichée.

#### `dock.isVisible()` _macOS_

Retours `Boolean` - Si l’icône du dock est visible.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Définit le [menu dock] de l’application[dock-menu].

#### `dock.getMenu()` _macOS_

Retours `Menu | null` - Le [menu dock] de l’application[dock-menu].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône du dock.
