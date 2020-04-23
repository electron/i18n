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

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

**더이상 사용하지 않음**

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash.

Move the given file to trash and returns a boolean status for the operation.

### `shell.beep()`

경고음 소리를 재생합니다.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following:
  * `create` - 새로운 단축 링크를 만들며, 필요할 때 덮어씌웁니다.
  * `update` - 이미 존재하는 단축 링크에만 지정된 속성값을 수정합니다.
  * `replace` - 존재하는 단축 링크를 덮어씌우고, 단축 링크가 존재하지 않으면 실패하도록 합니다.
* `options` [ShortcutDetails](structures/shortcut-details.md)

`Boolean`을 반환합니다. - 단축 링크가 성공적으로 만들어졌는지에 대한 여부입니다.

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

[`ShortcutDetails`](structures/shortcut-details.md)를 반환합니다.

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.
