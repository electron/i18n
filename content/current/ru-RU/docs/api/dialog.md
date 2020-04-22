# диалоговые окна

> Показывает стандартные диалоги для открытия и сохранения файлов, предупреждения и т.п.

Процесс: [Основной](../glossary.md#main-process)

Пример для показа диалога выбора нескольких файлов:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Методы

Модуль `dialog` имеет следующие методы:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `title` String (опционально)
  * `defaultPath` String (опционально)
  * `buttonLabel` String(опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Позволяет выбирать файлы.
    * `openDirectory` - Позволяет выбирать папки.
    * `multiSelections` - Позволяет выбрать несколько объектов.
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Возвращает `String[] | undefined` - пути файла, выбранные пользователем; если диалог отменен, то возвращает `undefined`.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Например:

```javascript
{
  filters: [
    { name: 'Изображения', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Видео', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Свой тип файлов', extensions: ['as'] },
    { name: 'Все файлы', extensions: ['*'] }
  ]
}
```

Массив `extentions` должен содержать расширения файлов без шаблонов поиска и точек (например, `png` - верно, а `.png` и `*.png` - нет). Для того, чтобы показать все фалы, можно использовать шаблон поиска `'*'` (другие шаблоны не поддерживаются).

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `title` String (опционально)
  * `defaultPath` String (опционально)
  * `buttonLabel` String(опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Позволяет выбирать файлы.
    * `openDirectory` - Позволяет выбирать папки.
    * `multiSelections` - Позволяет выбрать несколько объектов.
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Возвращает `Promise<Object>` - Разрешить с объектом, содержащим следующее:

* `canceled` Boolean - независимо от того, был ли диалог отменен.
* `filePaths` String[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. Для его использования, `securityScopedBookmarks` должны быть активированы. (For return values, see [table here](#bookmarks-array).)

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Например:

```javascript
{
  filters: [
    { name: 'Изображения', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Видео', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Свой тип файлов', extensions: ['as'] },
    { name: 'Все файлы', extensions: ['*'] }
  ]
}
```

Массив `extentions` должен содержать расширения файлов без шаблонов поиска и точек (например, `png` - верно, а `.png` и `*.png` - нет). Для того, чтобы показать все фалы, можно использовать шаблон поиска `'*'` (другие шаблоны не поддерживаются).

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `title` String (опционально)
  * `defaultPath` String (опционально) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String(опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `String | undefined`, путь к файлу, выбранному пользователем; если диалог отменен, то возвращает `undefined`.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

`filters` определяет массив типов файлов, которые могут быть отображены. Для примера смотрите `dialog.showOpenDialog`.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `title` String (опционально)
  * `defaultPath` String (опционально) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String(опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `Promise<Object>` - Разрешить с объектом, содержащим следующее:
  * `canceled` Boolean - независимо от того, был ли диалог отменен.
  * `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present. (For return values, see [table here](#bookmarks-array).)

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

`filters` определяет массив типов файлов, которые могут быть отображены. Для примера смотрите `dialog.showOpenDialog`.

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `type` String (опционально) - Может быть `"none"`, `"info"`, `"error"`, `"question"` или `"warning"`. В Windows, `"question"` отображает ту же иконку, что и `"info"`, если вы не установили иконку, используя опцию `"icon"`. На macOS и `"warning"` и `"error"` отображают ту же иконку предупреждения (warning).
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (опционально) - Индекс кнопки в массиве кнопок, который будет выбран по умолчанию при открытии окна сообщения.
  * `title` String (необязательно) - Заголовок окна сообщения, некоторые платформы не смогут его отобразить.
  * `message` String - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (опционально)
  * `cancelId` Integer (опционально) - Индекс кнопки, которая будет использоваться для отмены диалога, через клавишу `Esc`. По умолчанию это назначается первой кнопке с меткой "Отмена" или "Нет". Если этот параметр не установлен и нет таких отмеченных кнопок, как возвращаемое значение будет использоваться `0`.
  * `noLink` Boolean (опционально) - В Windows Electron попытается выяснить, какие из `buttons` являются общими кнопками (например, «Отмена» или «Да»), и отобразить остальные как ссылки команд в диалоговом окне. Это может сделать диалог в стиле современных приложений Windows. Если вам не нравится такое поведение, вы можете установить `noLink` на `true`.
  * `normalizeAccessKeys` Boolean (опционально) - Нормализация клавиш доступа к клавиатуре на разных платформах. По умолчанию - `false`. Включение этого предполагает, что `&` используется в метках кнопок для размещения клавиши быстрого доступа, и метки будут преобразованы, чтобы они правильно работали на каждой платформе, символы `&` удаляются в macOS, преобразуются в `_` в Linux и остаются нетронутыми в Windows. Например, метка кнопки `Vie&w` будет преобразована в `Vie_w` в Linux и `View ` в macOS и может быть выбрана с помощью `Alt-W` в Windows и Linux.

Возвращает `Integer` - индекс нажатой кнопки.

Показывает окно сообщения, оно будет блокировать процесс, пока не будет закрыто окно сообщения. It returns the index of the clicked button.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным. If `browserWindow` is not shown dialog will not be attached to it. In such case It will be displayed as independed window.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `type` String (опционально) - Может быть `"none"`, `"info"`, `"error"`, `"question"` или `"warning"`. В Windows, `"question"` отображает ту же иконку, что и `"info"`, если вы не установили иконку, используя опцию `"icon"`. На macOS и `"warning"` и `"error"` отображают ту же иконку предупреждения (warning).
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (опционально) - Индекс кнопки в массиве кнопок, который будет выбран по умолчанию при открытии окна сообщения.
  * `title` String (необязательно) - Заголовок окна сообщения, некоторые платформы не смогут его отобразить.
  * `message` String - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (опционально)
  * `cancelId` Integer (опционально) - Индекс кнопки, которая будет использоваться для отмены диалога, через клавишу `Esc`. По умолчанию это назначается первой кнопке с меткой "Отмена" или "Нет". Если этот параметр не установлен и нет таких отмеченных кнопок, как возвращаемое значение будет использоваться `0`.
  * `noLink` Boolean (опционально) - В Windows Electron попытается выяснить, какие из `buttons` являются общими кнопками (например, «Отмена» или «Да»), и отобразить остальные как ссылки команд в диалоговом окне. Это может сделать диалог в стиле современных приложений Windows. Если вам не нравится такое поведение, вы можете установить `noLink` на `true`.
  * `normalizeAccessKeys` Boolean (опционально) - Нормализация клавиш доступа к клавиатуре на разных платформах. По умолчанию - `false`. Включение этого предполагает, что `&` используется в метках кнопок для размещения клавиши быстрого доступа, и метки будут преобразованы, чтобы они правильно работали на каждой платформе, символы `&` удаляются в macOS, преобразуются в `_` в Linux и остаются нетронутыми в Windows. Например, метка кнопки `Vie&w` будет преобразована в `Vie_w` в Linux и `View ` в macOS и может быть выбрана с помощью `Alt-W` в Windows и Linux.

Возвращает `Promise<Object>` - разрешает Promise, содержащие следующие свойства:
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Показывает окно сообщения, оно будет блокировать процесс, пока не будет закрыто окно сообщения.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

### `dialog.showErrorBox(title, content)`

* `title` String - Заголовок для отображения в поле ошибки.
* `title` String - Текстовое содержимое для отображения в поле ошибки.

Отображает модальное диалоговое окно, показывающее сообщение об ошибке.

Этот API можно безопасно вызывать до события `ready`, которое выдает модуль `app`, он обычно используется для сообщений об ошибках на ранней стадии запуска. При вызове до события app `ready` в Linux, сообщение будет выдано в stderr, и диалоговое окно GUI не появится.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - Сертификат доверия/импорта.
  * `message` String - Сообщение, отображаемое пользователю.

Возвращает `Promise<void>` - выполняется, когда показано диалоговое окно доверия сертификата.

На macOS отображается модальное диалоговое окно, которое показывает сообщение и сертификат информации, и предоставляет пользователю возможность доверия/импорта сертификата. Если вы укажете аргумент `browserWindow`, диалоговое окно будет присоединено к родительскому окну, что сделает его модальным.

В Windows параметры более ограничены, благодаря используемым API Win32:

* Не используется аргумент `message`, так как ОС предоставляет свое собственное подтверждение диалогового окна.
* Экран `browserWindow` игнорируется, поскольку невозможно сделать это диалоговое окно подтверждения.

## Bookmarks array

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`, and `showSaveDialogSync` will return a `bookmarks` array.

| Build Type | securityScopedBookmarks boolean | Return Type | Return Value                   |
| ---------- | ------------------------------- |:-----------:| ------------------------------ |
| macOS mas  | True                            |   Success   | `['LONGBOOKMARKSTRING']`       |
| macOS mas  | True                            |    Error    | `['']` (array of empty string) |
| macOS mas  | False                           |     NA      | `[]` (empty array)             |
| non mas    | any                             |     NA      | `[]` (empty array)             |

## "Листы"

В macOS диалоговые окна представляются в виде листов, прикрепленных к окну, если вы указали ссылку [`BrowserWindow`](browser-window.md) в параметре `browserWindow`, или являются модальными, если окно не предусмотрено.

Вы можете вызвать `BrowserWindow.getCurrentWindow().SetSheetOffset(offset)`, чтобы изменить смещение рамки окна, к которой прикреплены листы.
