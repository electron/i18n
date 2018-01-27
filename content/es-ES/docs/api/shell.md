# shell

> Administra los archivos y los URLs utilizando las aplicaciones por defecto.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

El módulo `shell` proporciona las funciones relacionadas con la integración de escritorio.

Ejemplo de cómo abrir un URL en el navegador por defecto del usuario:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Métodos

El módulo `shell` tiene los siguientes métodos:

### `shell.showItemInFolder(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se mostró o no con éxito

Muestra el archivo determinado en un administrador de archivo. Si es posible, selecciona el archivo.

### `shell.openItem(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se abrió o no con éxito.

Abre el archivo determinado en el escritorio por defecto.

### `shell.openExternal(url[, options, callback])`

* `url` Cadena
* `options` Objeto (opcional) *macOS* 
  * `activate` Booleano - `true` para traer la aplicación abierta al primer plano. Por defecto es `true`.
* `callback` Función (opcional) - Si se especifica se abrirá de forma asincrónica. *macOS* 
  * `error` Error

Devuelve `Boolean` - Si una aplicación estaba disponible para abrir el URL. Si el callback se especifica, siempre devuelve true.

Abre el URL determinado de protocolo externo en el escritorio de forma predeterminada. (Por ejemplo, mailto: URLs en el agente de correo predeterminado del usuario).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` Cadena

Devuelve `Boolean` - Si el elemento se movió o no con éxito a la papelera

Mueve el archivo determinado a la papelera y devuelve un valor boleano para la operación.

### `shell.beep()`

Reproduce el sonido bip.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` Cadena (optional) - Por defecto es `create`, puede ser uno de los siguientes: 
  * `create` - Crea un nuevo acceso directo, sobrescribiendo si es necesario.
  * `update` - Actualiza las propiedades especificadas solo en un acceso directo existente.
  * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Returns [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.