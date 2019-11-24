# диалоговые окна

> Показывает стандартные диалоги для открытия и сохранения файлов, предупреждения и т.п.

Process: [Main](../glossary.md#main-process)

Пример для показа диалога выбора нескольких файлов:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

Диалоговое окно открывается из основного потока Electron. Если вы хотите использовать объект диалогового окна из графического процесса, не забудьте, что доступ к нему можно получить только через модуль remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Методы

Модуль `dialog` имеет следующие методы:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `title` String (необязательно)
  * `defaultPath` String (опционально)
  * `buttonLabel` String(необязательно) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (необязательно)
  * `properties` String[] (необязательно) - Содержит список функций, которые будут доступны в диалоговом окне. Возможны следующие значения: 
    * `openFile` - Позволяет выбирать файлы.
    * `openDirectory` - Позволяет выбирать папки.
    * `multiSelections` - Позволяет выбрать несколько объектов.
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` *macOS* - Позволяет создавать новые директории из диалога.
    * `promptToCreate` *Windows* - Запрашивает подтверждение на создание недостающих папок по выбранному пути, если они не существуют. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` *macOS* - Отключает автоматическую обработку cимволических ссылок (symlink). Все symlink-и будут возвращать свой, а не целевой путь.
    * `treatPackageAsDirectory` *macOS* - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
  * `message` String (необязательно) *macOS* - Сообщение, которое будет отображено над полями ввода.
  * `securityScopedBookmarks` Boolean (необязательно) *macOS* *mas* - Создает [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16), при сборке пакета для Mac App Store.

Возвращает `String[] | undefined` - пути файла, выбранные пользователем; если диалог отменен, то возвращает `undefined`.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

Аргумент `filters` должен содержать массив типов файлов, которые могут будут показаны и смогут быть выбраны, если вы хотите позволить выбор только определённых файлов. Например:

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

**Замечание:** на Windows и Linux в диалоговом окне нельзя дновременно выбирать и файлы, и директории, так что если вы установили `properties` в `['openFile', 'openDirectory']` на этих платформах, то возможно будет выбирать только директории.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `title` String (необязательно)
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
    * `noResolveAliases` *macOS* - Отключает автоматическую обработку cимволических ссылок (symlink). Все symlink-и будут возвращать свой, а не целевой путь.
    * `treatPackageAsDirectory` *macOS* - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
  * `message` String (необязательно) *macOS* - Сообщение, которое будет отображено над полями ввода.
  * `securityScopedBookmarks` Boolean (необязательно) *macOS* *mas* - Создает [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16), при сборке пакета для Mac App Store.

Возвращает `Promise<Object>` - Разрешить с объектом, содержащим следующее:

* `canceled` Boolean - независимо от того, был ли диалог отменен.
* `filePaths` String[] - массив путей файлов, выбранных пользователем. Если диалог отменён, это будет пустой массив.
* `bookmarks` String[] (необязательно) *macOS* *mas* - Массив строк, соответствующих массиву `filePaths`, в кодировке base64, который содержит закладки с областью безопасности. Для его использования, `securityScopedBookmarks` должны быть активированы.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

Аргумент `filters` должен содержать массив типов файлов, которые могут будут показаны и смогут быть выбраны, если вы хотите позволить выбор только определённых файлов. Например:

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

**Замечание:** на Windows и Linux в диалоговом окне нельзя дновременно выбирать и файлы, и директории, так что если вы установили `properties` в `['openFile', 'openDirectory']` на этих платформах, то возможно будет выбирать только директории.

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

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (необязательно) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String (необязательно) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (необязательно)
  * `message` String (необязательно) *macOS* - Сообщение, которое будет показано над полями ввода.
  * `nameFieldLabel` String (необязательно) *macOS* - Специальная метка для текста, отображаемая перед текстовым полем с именем файла.
  * `showsTagField` Boolean (необязательно) *macOS* - Показать поле ввода тегов, по умолчанию `true`.
  * `securityScopedBookmarks` Boolean (необязательно) *maxOS* *mas* - Создавать [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) при сборке для Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `String | undefined`, путь к файлу, выбранному пользователем; если диалог отменен, то возвращает `undefined`.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (необязательно) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String (необязательно) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (необязательно)
  * `message` String (необязательно) *macOS* - Сообщение, которое будет показано над полями ввода.
  * `nameFieldLabel` String (необязательно) *macOS* - Специальная метка для текста, отображаемая перед текстовым полем с именем файла.
  * `showsTagField` Boolean (необязательно) *macOS* - Показать поле ввода тегов, по умолчанию `true`.
  * `securityScopedBookmarks` Boolean (необязательно) *maxOS* *mas* - Создавать [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) при сборке для Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `Promise<Object>` - Разрешить с объектом, содержащим следующее:

    * `canceled` Boolean - независимо от того, был ли диалог отменен.
    * `filePath` String (опционально) - если диалог отменен, будет `undefined`.
    * `bookmark` String (optional) _macOS_ _mas_ - Строка в кодировке base64, содержащая зкладку с областью безопасности сохранённого файла. `securityScopedBookmarks` должны быть активированы для её использования.
    

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

**Заметка:** На MacOS, рекомендуется асинхронная версия, чтобы избежать проблем при расширении и свёртывании окна.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` Строка - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. По умолчанию - `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` Строка - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. По умолчанию - `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:

    * `response` Number - The index of the clicked button.
    * `checkboxChecked` Boolean - The checked state of the checkbox if
    `checkboxLabel` was set. Otherwise `false`.
    

Shows a message box, it will block the process until the message box is closed.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (необязательно)
* `options` Object 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## "Листы"

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.