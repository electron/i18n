## Class: Dock

> Control your app in the macOS dock

Proceso: [Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Métodos de Instancia

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Cuando `critical` es pasado, el ícono del punto rebotará hasta que la aplicación se vuelva activa o la petición sea cancelada.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Íntegro

Cancela el rebote de `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Rebota la apilación de descargas si el archivo de camino está dentro de la carpeta de descargas.

#### `dock.setBadge(text)` _macOS_

* `texto` String

Establece la cadena para ser mostrada en el área de insignia del punto.

#### `dock.getBadge()` _macOS_

Devuelve `Cadena` - La insignia cadena del punto.

#### `dock.hide()` _macOS_

Esconde el icono del punto.

#### `dock.show()` _macOS_

Devuelve `Promise<void>` - Se resuelve cuando se muestra el icono del dock.

#### `dock.isVisible()` _macOS_

Devuelve `Boolean` - Si el icono del dock es visible.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Establece la `image` asociada con el ícono del punto.
