# диалоговые окна

> Показывает стандартные диалоги для открытия и сохранения файлов, предупреждения и т.п.

Процесс: [Главный](../glossary.md#main-process)

Пример для показа диалога выбора нескольких файлов и папок:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
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
    * `createDirectory` _macOS_ - Позволяет создавать новые директории из диалога.
    * `promptToCreate` _Windows_ - Запрашивает подтверждение на создание недостающих папок по выбранному пути, если они не существуют. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
  * `message` String (опционально) _macOS_ - Сообщение, которое будет отображено над полями ввода.
  * `securityScopedBookmarks` Boolean (необязательно) _masOS_ _mas_ - Создает [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16), при сборке пакета для Mac App Store.

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

**Замечание:** на Windows и Linux в диалоговом окне нельзя дновременно выбирать и файлы, и директории, так что если вы установили `properties` в `['openFile', 'openDirectory']` на этих платформах, то возможно будет выбирать только директории.

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
  * `buttonLabel` String (опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Позволяет выбирать файлы.
    * `openDirectory` - Позволяет выбирать папки.
    * `multiSelections` - Позволяет выбрать несколько объектов.
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` _macOS_ - Позволяет создавать новые директории из диалога.
    * `promptToCreate` _Windows_ - Запрашивает подтверждение на создание недостающих папок по выбранному пути, если они не существуют. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
  * `message` String (опционально) _macOS_ - Сообщение, которое будет отображено над полями ввода.
  * `securityScopedBookmarks` Boolean (необязательно) _masOS_ _mas_ - Создает [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16), при сборке пакета для Mac App Store.
* `callback` Function (опционально)

Returns `Promise<Object>` - Resolve wih an object containing the following:

* `canceled` Boolean - независимо от того, был ли диалог отменен.
* `filePaths` String[] (optional) - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. Для его использования, `securityScopedBookmarks` должны быть активированы.

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

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `title` String (опционально)
  * `defaultPath` String (опционально) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String(опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `message` String (необязательно) _macOS_ - Сообщение, которое будет показано над полями ввода.
  * `nameFieldLabel` String (необязательно) _macOS_ - Специальная метка для текста, отображаемая перед текстовым полем с именем файла.
  * `showsTagField` Boolean (необязательно) _macOS_ - Показать поле ввода тегов, по умолчанию `true`.
  * `securityScopedBookmarks` Boolean (необязательно) _maxOS_ _mas_ - Создавать [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) при сборке для Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `String | undefined`, путь к файлу, выбранному пользователем; если диалог отменен, то возвращает `undefined`.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `title` String (опционально)
  * `defaultPath` String (необязательно) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String(опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `message` String (необязательно) _macOS_ - Сообщение, которое будет показано над полями ввода.
  * `nameFieldLabel` String (необязательно) _macOS_ - Специальная метка для текста, отображаемая перед текстовым полем с именем файла.
  * `showsTagField` Boolean (необязательно) _macOS_ - Показать поле ввода тегов, по умолчанию `true`.
  * `securityScopedBookmarks` Boolean (необязательно) _maxOS_ _mas_ - Создавать [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) при сборке для Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `Promise<Object>` - Разрешить с объектом, содержащим следующее:
  * `canceled` Boolean - независимо от того, был ли диалог отменен.
  * `filePath` String (optional) If the dialog is canceled this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` должны быть активированы для её использования.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

`filters` определяет массив типов файлов, которые могут быть отображены. Для примера смотрите `dialog.showOpenDialog`.

**Заметка:** На MacOS, рекомендуется асинхронная версия, чтобы избежать проблем при расширении и свёртывании окна.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (опционально) - Заголовок окна сообщения, некоторые платформы не смогут его отобразить.
  * `message` String - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (опционально)
  * `cancelId` Integer (опционально) - Индекс кнопки, которая будет использоваться для отмены диалога, через клавишу `Esc`. По умолчанию это назначается первой кнопке с меткой "Отмена" или "Нет". If no such labeled buttons exist and this option is not set, `0` will be used as the return value or callback response.
  * `noLink` Boolean (опционально) - В Windows Electron попытается выяснить, какие из `buttons` являются общими кнопками (например, «Отмена» или «Да»), и отобразить остальные как ссылки команд в диалоговом окне. Это может сделать диалог в стиле современных приложений Windows. Если вам не нравится такое поведение, вы можете установить `noLink` на `true`.
  * `normalizeAccessKeys` Boolean (опционально) - Нормализация клавиш доступа к клавиатуре на разных платформах. По умолчанию - `false`. Включение этого предполагает, что `&` используется в метках кнопок для размещения клавиши быстрого доступа, и метки будут преобразованы, чтобы они правильно работали на каждой платформе, символы `&` удаляются в macOS, преобразуются в `_` в Linux и остаются нетронутыми в Windows. Например, метка кнопки `Vie&w` будет преобразована в `Vie_w` в Linux и `View ` в macOS и может быть выбрана с помощью `Alt-W` в Windows и Linux.

Возвращает `Integer` - индекс нажатой кнопки.

Показывает окно сообщения, оно будет блокировать процесс, пока не будет закрыто окно сообщения. It returns the index of the clicked button.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (опционально)
  * `cancelId` Integer (опционально) - Индекс кнопки, которая будет использоваться для отмены диалога, через клавишу `Esc`. По умолчанию это назначается первой кнопке с меткой "Отмена" или "Нет". If no such labeled buttons exist and this option is not set, `0` will be used as the return value or callback response.
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

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - Сертификат доверия/импорта.
  * `message` String - Сообщение, отображаемое пользователю.
* `callback` Function

На macOS отображается модальное диалоговое окно, которое показывает сообщение и сертификат информации, и предоставляет пользователю возможность доверия/импорта сертификата. Если вы укажете аргумент `browserWindow`, диалоговое окно будет присоединено к родительскому окну, что сделает его модальным.

В Windows параметры более ограничены, благодаря используемым API Win32:

* Не используется аргумент `message`, так как ОС предоставляет свое собственное подтверждение диалогового окна.
* Экран `browserWindow` игнорируется, поскольку невозможно сделать это диалоговое окно подтверждения.

**[Скоро устареет](modernization/promisification.md)**

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

## "Листы"

В macOS диалоговые окна представляются в виде листов, прикрепленных к окну, если вы указали ссылку [`BrowserWindow`](browser-window.md) в параметре `browserWindow`, или являются модальными, если окно не предусмотрено.

Вы можете вызвать `BrowserWindow.getCurrentWindow().SetSheetOffset(offset)`, чтобы изменить смещение рамки окна, к которой прикреплены листы.
