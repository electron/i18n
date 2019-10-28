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

Muestra el archivo determinado en un administrador de archivo. Si es posible, selecciona el archivo.

### `shell.openItem(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se abrió o no con éxito.

Abre el archivo determinado en el escritorio por defecto.

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `opciones` Object (opcional) 
  * `activate` Boolean (optional) *macOS* - `true` to bring the opened application to the foreground. The default is `true`.
  * `workingDirectory` String (optional) *Windows* - The working directory.

Returns `Promise<void>`

Abra la URL del protocolo externo dado en la forma predeterminada del escritorio. (Por ejemplo, mailto: URL en el agente de correo predeterminado del usuario).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` Cadena

Returns `Boolean` - Whether the item was successfully moved to the trash.

Move the given file to trash and returns a boolean status for the operation.

### `shell.beep()`

Play the beep sound.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following: 
  * `create` - Creates a new shortcut, overwriting if necessary.
  * `update` - Updates specified properties only on an existing shortcut.
  * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully.

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Returns [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.