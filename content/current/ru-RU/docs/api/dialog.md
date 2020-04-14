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

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (опционально)
  * `buttonLabel` String(опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `properties` String[] (опционально) - Содержит список функций, которые будут доступны в диалоговом окне. Возможны следующие значения: 
    * `openFile` - Позволяет выбирать файлы.
    * `openDirectory` - Позволяет выбирать папки.
    * `multiSelections` - Позволяет выбрать несколько объектов.
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` *macOS* - Позволяет создавать новые директории из диалога.
    * `promptToCreate` *Windows* - Запрашивает подтверждение на создание недостающих папок по выбранному пути, если они не существуют. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` *macOS* - Отключает автоматическую обработку cимволических ссылок (symlink). Все symlink-и будут возвращать свой, а не целевой путь.
    * `treatPackageAsDirectory` *macOS* - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
    * `dontAddToRecent` *Windows* - Do not add the item being opened to the recent documents list.
  * `message` String (опционально) *macOS* - Сообщение, которое будет отображено над полями ввода.
  * `securityScopedBookmarks` Boolean (опционально) *macOS* *mas* - Создает [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16), при сборке пакета для Mac App Store.

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

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (опционально)
  * `buttonLabel` String (опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `properties` String[] (опционально) - Содержит список функций, которые будут доступны в диалоговом окне. Возможны следующие значения: 
    * `openFile` - Позволяет выбирать файлы.
    * `openDirectory` - Позволяет выбирать папки.
    * `multiSelections` - Позволяет выбрать несколько объектов.
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` *macOS* - Позволяет создавать новые директории из диалога.
    * `promptToCreate` *Windows* - Запрашивает подтверждение на создание недостающих папок по выбранному пути, если они не существуют. На самом деле, эта функция не создаёт их. Она всего лишь позволяет возвращать несуществующие пути из диалогового окна, которые должны после этого быть созданы приложением.
    * `noResolveAliases` *macOS* - Отключает автоматическую обработку cимволических ссылок (symlink). Все symlink-и будут возвращать свой, а не целевой путь.
    * `treatPackageAsDirectory` *macOS* - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
    * `dontAddToRecent` *Windows* - Do not add the item being opened to the recent documents list.
  * `message` String (опционально) *macOS* - Сообщение, которое будет отображено над полями ввода.
  * `securityScopedBookmarks` Boolean (опционально) *macOS* *mas* - Создает [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16), при сборке пакета для Mac App Store.

Возвращает `Promise<Object>` - Разрешить с объектом, содержащим следующее:

* `canceled` Boolean - независимо от того, был ли диалог отменен.
* `filePaths` String[] - массив путей файлов, выбранных пользователем. Если диалог отменён, это будет пустой массив.
* `bookmarks` String[] (опционально) *macOS* *mas* - Массив строк, соответствующих массиву `filePaths`, в кодировке base64, который содержит закладки с областью безопасности. Для его использования, `securityScopedBookmarks` должны быть активированы. (For return values, see [table here](#bookmarks-array).)

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

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (опционально) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String (опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `message` String (опционально) *macOS* - Сообщение, которое будет показано над полями ввода.
  * `nameFieldLabel` String (опционально) *macOS* - Специальная метка для текста, отображаемая перед текстовым полем с именем файла.
  * `showsTagField` Boolean (необязательно) *macOS* - Показать поле ввода тегов, по умолчанию `true`.
  * `properties` String[] (optional) 
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` *macOS* - Позволяет создавать новые директории из диалога.
    * `treatPackageAsDirectory` *macOS* - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
    * `showOverwriteConfirmation` *Linux* - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` *Windows* - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (необязательно) *maxOS* *mas* - Создавать [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) при сборке для Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `String | undefined`, путь к файлу, выбранному пользователем; если диалог отменен, то возвращает `undefined`.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

`filters` определяет массив типов файлов, которые могут быть отображены. Для примера смотрите `dialog.showOpenDialog`.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `title` String (опционально)
  * `defaultPath` String (опционально) - Абсолютный путь к директории, файлу или имя файла выбранного по умолчанию.
  * `buttonLabel` String (опционально) - Пользовательский текст кнопки подтверждения. Если оставить пустым будет использован стандартный текст.
  * `filters` [FileFilter[]](structures/file-filter.md) (опционально)
  * `message` String (опционально) *macOS* - Сообщение, которое будет показано над полями ввода.
  * `nameFieldLabel` String (опционально) *macOS* - Специальная метка для текста, отображаемая перед текстовым полем с именем файла.
  * `showsTagField` Boolean (optional) *macOS* - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional) 
    * `showHiddenFiles` - Отображает в диалоге скрытые файлы.
    * `createDirectory` *macOS* - Позволяет создавать новые директории из диалога.
    * `treatPackageAsDirectory` *macOS* - Считает пакеты, такие как папки `.app`, за папки, а не файлы.
    * `showOverwriteConfirmation` *Linux* - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` *Windows* - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (необязательно) *maxOS* *mas* - Создавать [закладки с областью безопасности](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) при сборке для Mac App Store. Если эта опция включена и выбранного файла не существует, то пустой файл будет создан по выбранному пути.

Возвращает `Promise<Object>` - Разрешить с объектом, содержащим следующее:

    * `canceled` Boolean - независимо от того, был ли диалог отменен.
    * `filePath` String (опционально) - если диалог отменен, будет `undefined`.
    * `bookmark` String (optional) _macOS_ _mas_ - Строка в кодировке base64, содержащая зкладку с областью безопасности сохранённого файла. `securityScopedBookmarks` должны быть активированы для её использования. (For return values, see [table here](#bookmarks-array).)
    

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

`filters` определяет массив типов файлов, которые могут быть отображены. Для примера смотрите `dialog.showOpenDialog`.

**Заметка:** На MacOS, рекомендуется асинхронная версия, чтобы избежать проблем при расширении и свёртывании окна.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `type` String (опционально) - Может быть `"none"`, `"info"`, `"error"`, `"question"` или `"warning"`. В Windows, `"question"` отображает ту же иконку, что и `"info"`, если вы не установили иконку, используя опцию `"icon"`. На macOS и `"warning"` и `"error"` отображают ту же иконку предупреждения (warning).
  * `buttons` String[] (опционально) - Массив текстов для кнопок. В Windows пустой массив приведет к одной кнопке с названием "OK".
  * `defaultId` Integer (опционально) - Индекс кнопки в массиве кнопок, который будет выбран по умолчанию при открытии окна сообщения.
  * `title` String (необязательно) - Заголовок окна сообщения, некоторые платформы не смогут его отобразить.
  * `message` String - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой.
  * `checkboxChecked` Boolean (опционально) - Первоначальное проверяемое состояние флажка. `false` по умолчанию.
  * `icon` ([NativeImage](native-image.md) | String) (опционально)
  * `cancelId` Integer (опционально) - Индекс кнопки, которая будет использоваться для отмены диалога, через клавишу `Esc`. По умолчанию это назначается первой кнопке с меткой "Отмена" или "Нет". Если этот параметр не установлен и нет таких отмеченных кнопок, как возвращаемое значение будет использоваться `0`.
  * `noLink` Boolean (опционально) - В Windows Electron попытается выяснить, какие из `buttons` являются общими кнопками (например, «Отмена» или «Да»), и отобразить остальные как ссылки команд в диалоговом окне. Это может сделать диалог в стиле современных приложений Windows. Если вам не нравится такое поведение, вы можете установить `noLink` на `true`.
  * `normalizeAccessKeys` Boolean (опционально) - Нормализация клавиш доступа к клавиатуре на разных платформах. По умолчанию - `false`. Включение этого предполагает, что `&` используется в метках кнопок для размещения клавиши быстрого доступа, и метки будут преобразованы, чтобы они правильно работали на каждой платформе, символы `&` удаляются в macOS, преобразуются в `_` в Linux и остаются нетронутыми в Windows. Например, метка кнопки `Vie&w` будет преобразована в `Vie_w` в Linux и `View ` в macOS и может быть выбрана с помощью `Alt-W` в Windows и Linux.

Возвращает `Integer` - индекс нажатой кнопки.

Показывает окно сообщения, оно будет блокировать процесс до тех пор, пока окно сообщения не будет закрыто. Он возвращает индекс нажатой кнопки.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально)
* `options` Object 
  * `type` String (опционально) - Может быть `"none"`, `"info"`, `"error"`, `"question"` или `"warning"`. В Windows, `"question"` отображает ту же иконку, что и `"info"`, если вы не установили иконку, используя опцию `"icon"`. На macOS и `"warning"` и `"error"` отображают ту же иконку предупреждения (warning).
  * `buttons` String[] (опционально) - Массив текстов для кнопок. В Windows пустой массив приведет к одной кнопке с названием "OK".
  * `defaultId` Integer (опционально) - Индекс кнопки в массиве кнопок, который будет выбран по умолчанию при открытии окна сообщения.
  * `title` String (опционально) - Заголовок окна сообщения, некоторые платформы не смогут его отобразить.
  * `message` Строка - содержимое сообщения.
  * `detail` String (опционально) - Дополнительные сведения о сообщении.
  * `checkboxLabel` String (опционально) - Если это предусмотрено, в окне сообщения будет установлен флажок с данной меткой.
  * `checkboxChecked` Boolean (опционально) - Первоначальное проверяемое состояние флажка. `false` по умолчанию.
  * `icon` [NativeImage](native-image.md) (опционально)
  * `cancelId` Integer (опционально) - Индекс кнопки, которая будет использоваться для отмены диалога, через клавишу `Esc`. По умолчанию это назначается первой кнопке с меткой "Отмена" или "Нет". Если этот параметр не установлен и нет таких отмеченных кнопок, как возвращаемое значение будет использоваться `0`.
  * `noLink` Boolean (опционально) - В Windows Electron попытается выяснить, какие из `buttons` являются общими кнопками (например, «Отмена» или «Да»), и отобразить остальные как ссылки команд в диалоговом окне. Это может сделать диалог в стиле современных приложений Windows. Если вам не нравится такое поведение, вы можете установить `noLink` на `true`.
  * `normalizeAccessKeys` Boolean (опционально) - Нормализация клавиш доступа к клавиатуре на разных платформах. По умолчанию - `false`. Включение этого предполагает, что `&` используется в метках кнопок для размещения клавиши быстрого доступа, и метки будут преобразованы, чтобы они правильно работали на каждой платформе, символы `&` удаляются в macOS, преобразуются в `_` в Linux и остаются нетронутыми в Windows. Например, метка кнопки `Vie&w` будет преобразована в `Vie_w` в Linux и `View ` в macOS и может быть выбрана с помощью `Alt-W` в Windows и Linux.

Возвращает `Promise<Object>` - разрешает Promise, содержащие следующие свойства:

    * `response` Number - индекс нажатой кнопки.
    * `checkboxChecked` Boolean - Проверяется состояние отмеченного флажка, если
    `checkboxLabel` был установлен. В противном случае `false`.
    

Показывает окно сообщения, оно будет блокировать процесс, пока не будет закрыто окно сообщения.

Аргумент `browserWindow` позволяет диалоговому окну прикрепляться к родительскому, что делает его модальным.

### `dialog.showErrorBox(title, content)`

* `title` String - Заголовок для отображения в поле ошибки.
* `title` String - Текстовое содержимое для отображения в поле ошибки.

Отображает модальное диалоговое окно, показывающее сообщение об ошибке.

Этот API можно безопасно вызывать до события `ready`, которое выдает модуль `app`, он обычно используется для сообщений об ошибках на ранней стадии запуска. При вызове до события app `ready` в Linux, сообщение будет выдано в stderr, и диалоговое окно GUI не появится.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` *macOS* *Windows*

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