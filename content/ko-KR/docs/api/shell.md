# shell

> 기본 애플리케이션을 이용해 파일과 URL을 관리합니다.

프로세스:[메인](../glossary.md#main-process), [렌더러](../glossary.md#renderer-process)

` shell` 모듈은 데스크톱 통합과 연관된 함수를 제공합니다.

사용자의 기본 브라우저를 이용하여 URL을 여는 예시입니다 :

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## 메서드

`shell` 모듈은 아래의 메서드를 가지고 있습니다 :

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Show the given file in a file manager. If possible, select the file.

### `shell.openItem(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully opened.

Open the given file in the desktop's default manner.

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `options` Object (선택) 
  * `activate` Boolean (optional) *macOS* - `true` to bring the opened application to the foreground. The default is `true`.
  * `workingDirectory` String (optional) *Windows* - The working directory.

Returns `Promise<void>`

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