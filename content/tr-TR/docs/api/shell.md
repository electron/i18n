# shell

> Varsayılan uygulamalarını kullanarak dosyaları ve URL'leri yönetin.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

The `shell` module provides functions related to desktop integration.

Bir URL'yi kullanıcının varsayılan tarayıcısında açmaya örnek:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Metodlar

The `shell` module has the following methods:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully shown

Verilen dosyayı bir dosya yöneticisinde görüntüler. Mümkünse, dosyayı seçin.

### `shell.openItem(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully opened.

Verilen dosyayı masaüstünün varsayılan yöntemiyle açın.

### `shell.openExternal(url[, options, callback])`

* `url` Dize
* `options` Obje (isteğe bağlı) *macOS* 
  * `activate` Boolean - `true` to bring the opened application to the foreground. The default is `true`.
* `callback` Function (optional) - If specified will perform the open asynchronously. *macOS* 
  * `error` Hata 

Returns `Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.

Verilen harici protokol URL'sini masaüstünde varsayılan şekilde açın. (Örneğin, mailto: kullanıcının varsayılan posta aracısındaki URL'leri).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash

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

Returns `Boolean` - Whether the shortcut was created successfully

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Returns [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

Bir hata oluştuğunda istisna atılır.