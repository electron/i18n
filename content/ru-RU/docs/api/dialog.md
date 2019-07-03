# dialog

> Показывает стандартные диалоги для открытия и сохранения файлов, предупреждения и т.п.

Process: [Main](../glossary.md#main-process)

Пример для показа диалога выбора нескольких файлов и папок:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
```

Диалоговое окно открывается из основного потока Electron. Если вы хотите использовать объект диалогового окна из графического процесса, не забудьте, что доступ к нему можно получить только через модуль remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Методы

Модуль `dialog` имеет следующие методы:

### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (опционально)
  * `buttonLabel` String (необязательно) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (необязательно)
  * `properties` String[] (необязательно) - Содержит список функций, которые будут доступны в диалоговом окне. Возможны следующие значения: 
    * `openFile` - Позволяет выбирать файлы.
    * `openDirectory` - Позволяет выбирать папки.
    * `multiSelections` - Позволяет выбрать несколько объектов.
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` *macOS* - Позволяет создавать новые директории из диалога.
    * `promptToCreate` *Windows* - Запрашивает подтверждение на создание недостающих папок по выбранному пути, если они не существуют. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` *macOS* - Отключает автоматическую обработку cимволических ссылок (symlink). Все symlink-и теперь вернут свой путь, а не ее целевой путь.
    * `treatPackageAsDirectory` *macOS* - Открывает пакеты, такие как папки `.app`, как директорию, а не как файл.
  * `message` String (опционально) *macOS* - Сообщение, которое будет показан над блоками ввода.
  * `securityScopedBookmarks` Boolean (опционально) *masOS* *mas* - Создает [защищенные закладки](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16), когда создается пакет для Mac App Store.
* `callback` Function (опционально) 
  * `filePaths` String[] (optional) - An array of file paths chosen by the user. If the dialog is cancelled this will be `undefined`.
  * `bookmarks` String[] (optional) *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` должны быть активированы, чтобы массив был создан.

Возвращает `String[] | undefined`, массив путей к файлам, выбранных пользователем, или `undefined` если передан коллбэк.

Аргумент `browserWindow` позволяет диалогу прикреплять себя к родительскому окну, что делает его модальным.

Аргумент `filters` указывает массив типов файлов, которые могут быть показаны или выбраны, если вы хотите ограничить пользователя на определенном типе файла. Например:

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

Массив `extentions` должен содержать расширения файлов без шаблонов поиска или точек (например, `png` - это верно, а `.png` и `*.png` - неверно). Для того, чтобы показать все фалы, можно использовать шаблон поиска `'*'` (другие шаблоны не поддерживаются).

Если был передан `callback`, вызов API будет асинхронным и результат будет передан через `callback(filenames)`.

**Заметка:** на Windows и Linux открытый диалог не может одновременно выбирать и файлы и директории, так что, если вы установили `properties` в `['openFile', 'openDirectory']` на этих платформах, то показан будет только выбор директорий.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (опционально) - Абсолютный путь к директории, файлу или имя файла для использования по умолчанию.
  * `buttonLabel` String(опционально) - Альтернативный текст для кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `message` String (опционально) *macOS* - Сообщение, которое будет показано поверх полей ввода.
  * `nameFieldLabel` String (опционально) *macOS* - Специальная метка для текста, отображаемая перед текстовым полем с именем файла.
  * `showsTagField` Boolean (опционально) *macOS* - Показать поле ввода тегов, по умолчанию `true`.
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. Если эта опция включена и такого файла не существует, то пустой файл будет создан по выбранному пути.
* `callback` Function (опционально) 
  * `filename` String (optional) If the dialog is cancelled this will be `undefined`.
  * `bookmark` String (optional) *macOS* *mas* - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

Returns `String | undefined`, the path of the file chosen by the user, if a callback is provided or the dialog is cancelled it returns `undefined`.

Аргумент `browserWindow` позволяет диалогу прикреплять себя к родительскому окну, что делает его модальным.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`.

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value or callback response.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. По умолчанию - `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.
* `callback` Function (опционально) 
  * `response` Number - The index of the button that was clicked.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Returns `Integer`, the index of the clicked button, if a callback is provided it returns undefined.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

Аргумент `browserWindow` позволяет диалогу прикреплять себя к родительскому окну, что делает его модальным.

If the `callback` and `browserWindow` arguments are passed, the dialog will not block the process. The API call will be asynchronous and the result will be passed via `callback(response)`.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.
* `callback` Function

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.