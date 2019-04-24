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

Devuelve `Boolean` - Si el elemento se mostró o no con éxito.

Muestra el archivo determinado en un administrador de archivo. Si es posible, selecciona el archivo.

### `shell.openItem(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se abrió o no con éxito.

Abre el archivo determinado en el escritorio por defecto.

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `opciones` Object (opcional) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `opciones` Objecto (opcional) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se movió o no con éxito a la papelera.

Mueve el archivo determinado a la papelera y devuelve un valor boleano para la operación.

### `shell.beep()`

Reproduce el sonido bip.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (opcional) - Por defecto `create`, puede ser uno de los siguientes: 
  * `create` - Crea un nuevo acceso directo, sobrescribiendo si es necesario.
  * `update` - Actualiza las propiedades especificadas solo en un acceso directo existente.
  * `replace` - Sobrescribe un acceso directo existente. Y falla si el acceso directo no existe.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Devuelve `Boolean` - Si el acceso directo fue creado con éxito.

Crea o actualiza un enlace de acceso directo a `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Devuelve [`ShortcutDetails`](structures/shortcut-details.md)

Resuelve el enlace de acceso directo a `shortcutPath`.

Aparecerá una excepción cuando ocurre cualquier error.