## Class: Dock

> Control your app in the macOS dock

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Métodos de Instância

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Inteiro

Cancel the bounce of `id`.

#### `dock.downloadFinished(filePath)` no _macOS_

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

#### `dock.setBadge(text)` no _macOS_

* `text` String

Sets the string to be displayed in the dock’s badging area.

#### `dock.getBadge()` no _macOS_

Returns `String` - The badge string of the dock.

#### `dock.hide()` no _macOS_

Esconde o ícone na Dock.

#### `dock.show()` no _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

#### `dock.isVisible()` no _macOS_

Returns `Boolean` - Whether the dock icon is visible.

#### `dock.setMenu(menu)` no _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` no _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` no _macOS_

* `image` ([NativeImage](native-image.md) | String)

Define a `imagem` associada com o ícone do dock.
