# shell

> Administra los archivos y los URLs utilizando las aplicaciones por defecto.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

El módulo `shell` proporciona las funciones relacionadas con la integración de escritorio.

Ejemplo de cómo abrir un URL en el navegador por defecto del usuario:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## Métodos

El módulo `shell` tiene los siguientes métodos:

### `shell.showItemInFolder(fullPath)`

* `fullPath` Cadena

Show the given file in a file manager. If possible, select the file.

### `shell.openItem(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se abrió o no con éxito.

Abre el archivo determinado en el escritorio por defecto.

### `shell.openExternalSync(url[, options])`

* `url` String - Máximo 2081 caracteres en Windows, o la función retorna falso.
* `options` Object (opcional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Devuelve `Boolean` - Si una aplicación estaba disponible para abrir la URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

**Cambiar**

### `shell.openExternal(url[, options])`

* `url` String - Máximo 2081 caracteres en windows.
* `options` Object (opcional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Devuelve `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se movió o no con éxito a la papelera.

Mueve el archivo determinado a la papelera y devuelve un valor boleano para la operación.

### `shell.beep()`

Reproduce el sonido bip.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following:
  * `create` - Crea un nuevo acceso directo, sobrescribiendo si es necesario.
  * `update` - Actualiza las propiedades especificadas solo en un acceso directo existente.
  * `replace` - Sobrescribe un acceso directo existente. Y falla si el acceso directo no existe.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Devuelve `Boolean` - Si el acceso directo fue creado con éxito.

Crea o actualiza un enlace de acceso directo a `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

Devuelve [`ShortcutDetails`](structures/shortcut-details.md)

Resuelve el enlace de acceso directo a `shortcutPath`.

Aparecerá una excepción cuando ocurre cualquier error.
