# shell

> Administra los archivos y los URLs utilizando las aplicaciones por defecto.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) (non-sandboxed only)

El módulo `shell` proporciona las funciones relacionadas con la integración de escritorio.

Ejemplo de cómo abrir un URL en el navegador por defecto del usuario:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

**Note:** While the `shell` module can be used in the renderer process, it will not function in a sandboxed renderer.

## Métodos

El módulo `shell` tiene los siguientes métodos:

### `shell.showItemInFolder(fullPath)`

* `fullPath` Cadena

Muestra el archivo dado en un gestor de archivos. Si es posible, seleccione el archivo.

### `shell.openPath(path)`

* `path` String

Returns `Promise<String>` - Resolves with a string containing the error message corresponding to the failure if a failure occurred, otherwise "".

Abre el archivo determinado en el escritorio por defecto.

### `shell.openExternal(url[, options])`

* `url` String - Máximo 2081 caracteres en windows.
* `options` Object (opcional)
  * `activate` Boolean (opcional) _macOs_ - `true` para llevar la aplicación abierta al primer plano. El valor por defecto es `true`.
  * `workingDirectory` String (opcional) _Windows_ - El directorio de trabajo.

Devuelve `Promise<void>`

Abre el protocolo URL externo dado de manera predeterminada en el escritorio. (Por ejemplo, mailto: URLs en el agente de correo predeterminado del usuario).

### `shell.trashItem(path)`

* `path` String - path to the item to be moved to the trash.

Returns `Promise<void>` - Resolves when the operation has been completed. Rejects if there was an error while deleting the requested item.

This moves a path to the OS-specific trash location (Trash on macOS, Recycle Bin on Windows, and a desktop-environment-specific location on Linux).

### `shell.beep()`

Reproduce el sonido bip.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (opcional) - El valor por defecto es `create`; puede ser uno de los siguientes:
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
