# shell

> Управление файлами и URL-ами, используя стандартные приложения для их открытия.

Процессы: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Модуль `shell` предоставляет функции, относящиеся к десктопной интеграции.

Пример открытия ссылки в стандартном браузере пользователя:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Методы

Модуль `shell` имеет следующие методы:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Возвращает `Boolean` - Успешно ли был показан объект.

Показывает данный файл в файловом менеджере. Если возможно, выбирает файл.

### `shell.openItem(fullPath)`

* `fullPath` String

Возвращает `Boolean` - Успешно ли был открыт объект.

Open the given file in the desktop's default manner.

### `shell.openExternal(url[, options, callback])`

* `url` String - max 2081 characters on windows, or the function returns false.
* `options` Object (опционально) *macOS* 
  * `activate` Boolean - `true` to bring the opened application to the foreground. The default is `true`.
* `callback` Function (optional) *macOS* - If specified will perform the open asynchronously. 
  * `error` Error

Returns `Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

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