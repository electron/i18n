## Clase: Dock

> Controla tu aplicación en el dock de macOS

Proceso: [Main](../glossary.md#main-process)

El siguiente ejemplo muestra como rebotar tu ícono en el dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Métodos de Instancia

#### `dock.bounce([type])` _macOS_

* `type` String (opcional) - Puede ser `critical` o `informational`. Por defecto es `informational`

Devuelve `Integer` - un ID que representa la solicitud.

Cuando `critical` es pasado, el ícono del punto rebotará hasta que la aplicación se vuelva activa o la petición sea cancelada.

Cuando `informational` es pasado, el icono del dock rebotará por un segundo. Sin embargo, la solicitud permanece activa hasta que la aplicación se vuelta activa o la solicitud sea cancelada.

**Nota Bene:** Este método solo puede ser usada mientras la aplicación no este enfocada; cuando la aplicación está enfocada retornará -1.

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

Establece el \[dock menu\]\[dock-menu\] de la aplicación.

#### `dock.getMenu()` _macOS_

Devuelve `Menu | null` -El \[dock menu\]\[dock-menu\] de la aplicación.

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Establece la `image` asociada con el ícono del punto.
