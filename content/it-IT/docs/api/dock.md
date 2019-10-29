## Class: Dock

> Control your app in the macOS dock

Processo: [Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Metodi Istanza

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Quando `critico` è passato, l'icona del dock rimbalza finché l'app diventa attiva o la richiesta viene annullata.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Numero Intero

Annulla il rimbalzo dell'`id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `Percorsofile` Stringa

Rimbalza il download impilato se il Percorsofile è nella cartella dei file scaricati.

#### `dock.setBadge(text)` _macOS_

* `testo` Stringa

Imposta la stringa da mostrare nell'area del dock di badging.

#### `dock.getBadge()` _macOS_

Restituisce `Stringa` - La stringa del badge del dock.

#### `dock.hide()` _macOS_

Nasconde l'icona del dock.

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

* `immagine` ([ImmagineNativa](native-image.md) | Stringa)

Imposta l'`immagine` associata a questa icona del dock.
