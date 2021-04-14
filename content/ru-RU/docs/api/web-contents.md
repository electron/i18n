# webContents

> Рендер и управление веб-страницами.

Процесс: [Основной](../glossary.md#main-process)

`webContents` является [EventEmitter][event-emitter]. Он ответственен за рендер и управление веб-страницы и является свойством объекта [`BrowserWindow`](browser-window.md). Пример доступа к объекту `webContents`:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

const contents = win.webContents
console.log(contents)
```

## Методы

Эти методы доступны из модуля `webContents`:

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Возвращает `WebContents` - массив всех экземпляров `WebContents`. Этот массив содержит веб-контент всех окон, webviews, открытых инструментов разработчика и расширений инструментов разработчика на фоновых страницах.

### `webContents.getFocusedWebContents()`

Возвращает `WebContents` - веб-контент, который сейчас активен в этом приложении, в ином случае возвращает `null`.

### `webContents.fromId (id)`

* `id` Integer

Возвращает `WebContents` | неопределенный - Экземпляр WebContents с данным идентификатором, или `undefined` если нет WebContents, связанных с данный идентификатор.

## Класс: WebContents

> Рендерит и управляет контент экземпляра BrowserWindow.

Процесс: [Основной](../glossary.md#main-process)

### События экземпляра

#### Событие: 'did-finish-load'

Излучаемый при навигации, т.е. спиннер вкладки перестал вращаться , и `onload` событие было отправлено.

#### Событие: 'не-не-нагрузка'

Возвращает:

* `event` Event
* `errorCode` Integer
* `errorDescription` Струна
* `validatedURL` Струна
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Это событие, как `did-finish-load` , но излучается, когда нагрузка не удалось. Полный список кодов ошибок и их значение можно найти [здесь](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

#### Событие: 'did-fail-provisional-load'

Возвращает:

* `event` Event
* `errorCode` Integer
* `errorDescription` Струна
* `validatedURL` Струна
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Это событие, как `did-fail-load` , но излучается, когда нагрузка была (например. `window.stop()` была вызвана).

#### Событие: 'did-frame-finish-load'

Возвращает:

* `event` Event
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Испускаемый, когда рама сделала навигацию.

#### Событие: 'did-start-loading'

Соответствует точкам времени, когда спиннер вкладки начал вращаться.

#### Событие: 'did-stop-loading'

Соответствует точкам времени, когда спиннер вкладки перестал вращаться.

#### Событие: 'dom-ready'

Возвращает:

* `event` Event

Испускаемый при загрузке документа в данном кадре.

#### Событие: 'page-title-updated'

Возвращает:

* `event` Event
* `title` String
* `explicitSet` Boolean

Высовыток, когда заголовок страницы устанавливается во время навигации. `explicitSet` является ложным, название синтезируется из URL-адреса файла.

#### Событие: 'page-favicon-updated'

Возвращает:

* `event` Event
* `favicons` String - Массив URL-адресов.

Излучаемый при просмотре страницы favicon URL-адреса.

#### Событие: "новое окно" _Deprecated_

Возвращает:

* `event` NewWindowWebContentsEvent
* `url` String
* `frameName` String
* `disposition` - может быть `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` и `other`.
* `options` BrowserWindowConstructorOptions - Варианты, которые будут использоваться для создания новых [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String - Нестандартные функции (функции, не обрабатываемые хромом или электроном), данные `window.open()`.
* `referrer` [реферер](structures/referrer.md) - реферер, который будет передан в новое окно. Может или не может привести к отправке `Referer` заголовка , в зависимости от политики реферера.
* `postBody` [PostBody](structures/post-body.md) (по желанию) - почтовые данные, которые будут отправлены в новое окно, вместе с соответствующими головами, которые будут установлены. Если данные о должности не будут отправлены, значение будет `null`. Определяется только , когда окно создается формой, которая устанавливает `target=_blank`.

Deprecated в пользу [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Излучается, когда страница просит открыть новое окно для `url`. Это может быть , запрошенный `window.open` или внешней ссылке, как `<a target='_blank'>`.

По умолчанию для `BrowserWindow` будет создан новый `url`.

Вызов `event.preventDefault()` предотвратит автоматическое создание Electron новой [`BrowserWindow`](browser-window.md). Если вы звоните `event.preventDefault()` и вручную создаете новый [`BrowserWindow`](browser-window.md) то вы должны установить `event.newGuest` для ссылки на новый [`BrowserWindow`](browser-window.md) например, невыполнение этого может привести к неожиданному поведению. Например:

```javascript
myBrowserWindow.webContents.on ('новое окно', (событие, URL, frameName, расположение, варианты, additionalFeatures, реферер, postBody) -> -
  event.preventDefault()
  const win - новый BrowserWindow (no
    webContents: options.webContents, // использовать существующие webContents при условии
    показать: ложные
  q)
  win.once ('ready--ready--to-show', () -> win.show ())
  если (!options.webContents) -
    const loadOptions - {
      httpReferrer: referrer
    }
    если (postBody ! ) -
      const { data, contentType, boundary } - postBody
      loadOptions.postData - postBody.data
      loadOptions.extraHeaders - "тип контента: ${contentType}; граница"${boundary}'
    -

    win.loadURL (url, loadOptions) // Существующие webContents будут перемещаться автоматически
  -
  event.newGuest - win
)
```

#### Событие: 'сделал-создать-окно'

Возвращает:
* `window` BrowserWindow
* `details` объект
    * `url` String - URL для созданного окна.
    * `frameName` String - Имя, данное созданному окну в `window.open()` вызова.
    * `options` BrowserWindowConstructorOptions - варианты, используемые для создания BrowserWindow. Они объединены в увеличиваемый приоритет: варианты, от родителя, разобранной опции из строки `features` от `window.open()`, и варианты, данные [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Непризнанные параметры не отфильтрованы.
    * `additionalFeatures` String - Нестандартные функции (функции, не обработаны хромом или электроном) _deprecated_
    * `referrer` [реферер](structures/referrer.md) - реферер, который будет передан в новое окно. Может или не может привести к отправке `Referer` заголовка , в зависимости от политики реферера.
    * `postBody` [PostBody](structures/post-body.md) (по желанию) - почтовые данные которые будут отправлены в новое окно, наряду с соответствующими которые будут установлены. Если данные о должности не будут отправлены, значение будет `null`. Определяется только тогда, когда окно создается формой, которая устанавливает `target=_blank`.
    * `disposition` - может быть `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` и `other`.

Излучаемые _после_ успешного создания окна через `window.open` в рендере. Не излучается, если создание окна отменяется из [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Более подробную [`window.open()`](window-open.md) и как использовать это в сочетании с `webContents.setWindowOpenHandler`.

#### Событие: 'will-navigate'

Возвращает:

* `event` Event
* `url` String

Излучается, когда пользователь или страница хочет начать навигацию. Это может произойти `window.location` объекте или пользователь нажимает на ссылку на странице.

Это событие не будет излучать, когда навигация запущена программно с API, `webContents.loadURL` и `webContents.back`.

Он также не излучается для навигации на страницах, таких как нажатие якорных ссылок или обновление `window.location.hash`. Используйте `did-navigate-in-page` событие для этой цели.

Вызов `event.preventDefault()` предотвратит навигацию.

#### Событие: 'did-start-navigation'

Возвращает:

* `event` Event
* `url` String
* `isInPlace` Булан
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Излучается, когда любой кадр (включая основной) начинает навигацию. `isInPlace` будет `true` для навигации на страницах.

#### Событие: 'будет перенаправление'

Возвращает:

* `event` Event
* `url` String
* `isInPlace` Булан
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Излучаемый в качестве сервера сторона перенаправления происходит во время навигации.  Например, 302 перенаправления.

Это событие будет излучаться после `did-start-navigation` и всегда до `did-redirect-navigation` события для той же навигации.

Вызов `event.preventDefault()` предотвратит навигацию (а не только перенаправление).

#### Событие: 'did-перенаправление-навигация'

Возвращает:

* `event` Event
* `url` String
* `isInPlace` Булан
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Излучаемый после перенаправления стороны сервера происходит во время навигации.  Например, 302 перенаправления.

Это событие не может быть предотвращено, если вы хотите предотвратить перенаправления, то должны проверить событие`will-redirect` выше.

#### Событие: 'did-navigate'

Возвращает:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 для не http навигации
* `httpStatusText` Строка - пустой для не HTTP навигации

Излучается при навигации основного кадра.

Это событие не излучается для навигации на страницах, таких как нажатие якорных ссылок или обновление `window.location.hash`. Используйте `did-navigate-in-page` событие для этой цели.

#### Событие: 'did-frame-navigate'

Возвращает:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 для не http навигации
* `httpStatusText` String - пустой для не http навигации,
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Излучается при навигации по кадрам.

Это событие не излучается для навигации на страницах, таких как нажатие якорных ссылок или обновление `window.location.hash`. Используйте `did-navigate-in-page` событие для этой цели.

#### Событие: 'сделал-навигация в странице'

Возвращает:

* `event` Event
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Интегрер
* `frameRoutingId` Интегрер

Излучается при навигации на странице в любом кадре.

При навигации на странице URL-адрес страницы изменяется, но не навигации за пределами страницы. Примерами этого являются случаи, когда якорные ссылки на кнопку или когда `hashchange` событие DOM.

#### Событие: 'will-prevent-unload'

Возвращает:

* `event` Event

Испускаемый `beforeunload` обработчик событий пытается отменить выгрузку страницы.

Вызов `event.preventDefault()` будет игнорировать `beforeunload` событий и позволит выгрузить страницу.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Вы действительно хотите покинуть этот сайт?',
    message: 'Изменения не могут быть сохранены.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### Событие: "разбитый" _Deprecated_

Возвращает:

* `event` Event
* `killed` Boolean

Испускаемый при с крахе процесса рендерера или его погиб.

**:** Это событие затухает событие `render-process-gone` , содержит больше информации о том, почему процесс визуализации исчез. Это не всегда, потому что он разбился.  На `killed` boolean можно заменить проверки `reason === 'killed'` при переходе на это событие.

#### Событие: 'рендер-процесс-ушел'

Возвращает:

* `event` Event
* `details` объект
  * `reason` Строка - Причина, по которой процесс рендеров исчез.  Возможные значения:
    * `clean-exit` - Процесс вышел с кодом выхода нуля
    * `abnormal-exit` - Процесс вышел с ненулевой код выхода
    * `killed` - Процесс был отправлен SIGTERM или иным образом убит извне
    * `crashed` - Процесс разбился
    * `oom` - Процесс закончился в памяти
    * `launch-failed` - Процесс так и не был успешно запущен
    * `integrity-failure` - Проверки целостности кода Windows не удалось
  * `exitCode` Integer - Код выхода процесса, если `reason` не `launch-failed`, и в этом случае `exitCode` будет платформы конкретных код ошибки запуска.

Испускаемый при процессе рендерера неожиданно исчезает.  Это, как правило потому что он разбился или погиб.

#### Событие: 'unresponsive'

Вызывается, когда страница "не отвечает".

#### Событие: 'responsive'

Происходит, когда страница, которая "не отвечала", снова реагирует.

#### Событие: 'plugin-crashed'

Возвращает:

* `event` Event
* `name` String
* `version` String

Излучается при сноме плагина.

#### Событие: 'destroyed'

Излучается при `webContents` разрушается.

#### Событие: 'before-input-event'

Возвращает:

* `event` Event
* `input` объект - Входные свойства.
  * `type` строка - либо `keyUp` или `keyDown`.
  * `key` строка - эквивалент [KeyboardEvent.key][keyboardevent].
  * `code` строка - эквивалент [KeyboardEvent.code][keyboardevent].
  * `isAutoRepeat` Boolean - Эквивалент [KeyboardEvent.повторить][keyboardevent].
  * `isComposing` Boolean - эквивалент [KeyboardEvent.isComposing][keyboardevent].
  * `shift` Boolean - эквивалент [KeyboardEvent.shiftKey][keyboardevent].
  * `control` Boolean - эквивалент [KeyboardEvent.controlKey][keyboardevent].
  * `alt` Boolean - эквивалент [KeyboardEvent.altKey][keyboardevent].
  * `meta` Boolean - эквивалент [KeyboardEvent.metaKey][keyboardevent].

Излучается перед отправкой `keydown` и `keyup` событий на странице. Вызов `event.preventDefault` предотвратит страницу `keydown`/`keyup` события и ярлыки меню.

Чтобы предотвратить только ярлыки меню, используйте [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore):

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // Например, включать сочетания клавиш меню приложения
  // Только когда Ctrl/Cmd нажаты.
  win.webContents.setIgnoreMenuShortcuts (!input.control && !input.meta)
))
```

#### Событие: 'enter-html-full-screen'

Происходит, когда окно входит в полноэкранный режим с помощью HTML API.

#### Событие: 'leave-html-full-screen'

Происходит, когда окно выходит из полноэкранного режима с помощью HTML API.

#### Событие: 'зум-изменен'

Возвращает:

* `event` Event
* `zoomDirection` строка - может быть `in` или `out`.

Излучается, когда пользователь просит изменить уровень масштабирования с помощью колеса мыши.

#### Событие: 'devtools-opened'

Излучается при открытии DevTools.

#### Событие: 'devtools-closed'

Излучается, когда DevTools закрыт.

#### Событие: 'devtools-ориентированных'

Излучаемый, когда DevTools сосредоточен / открыт.

#### Событие: 'certificate-error'

Возвращает:

* `event` Event
* `url` String
* `error` String - код ошибки.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Указывает, можно ли считать сертификат доверенным.

Излучается, когда не удалось проверить `certificate` для `url`.

Использование то же самое с [ `certificate-error` событие `app`](app.md#event-certificate-error).

#### Событие: 'select-client-certificate'

Возвращает:

* `event` Event
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Сертификат](structures/certificate.md) - Должен быть сертификат из данного списка.

Происходит, когда запрошен сертификат клиента.

Использование то же самое с [ `select-client-certificate` событие `app`](app.md#event-select-client-certificate).

#### Событие: 'login'

Возвращает:

* `event` Event
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (опционально)
  * `password` String (опционально)

Происходит, когда `webContents` выполняет базовую аутентификацию.

Использование то же самое с [ `login` событие `app`](app.md#event-login).

#### Событие: 'certificate-error'

Возвращает:

* `event` Event
* `result` объект
  * `requestId` Интегрер
  * `activeMatchOrdinal` Integer - Позиция активного матча.
  * `matches` Integer - Количество матчей.
  * `selectionArea` Rectangle - Координаты первого региона матча.
  * `finalUpdate` Булан

Излучается, когда результат доступен для `webContents.findInPage`и запроса.

#### Событие: 'media-started-playing'

Излучается, когда средства массовой информации начинают играть.

#### Событие: 'media-paused'

Излучается, когда мультимедиа приостанавливается или делается воспроизведение.

#### Событие: 'did-change-theme-color'

Возвращает:

* `event` Event
* `color` (String | null) - Тематический цвет в формате "#rrggbb". Это не `null` когда нет цвета темы устанавливается.

Излучается при изменении цвета темы страницы. Это, как правило, из- с мета-тег:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Событие: 'update-target-url'

Возвращает:

* `event` Event
* `url` String

Излучается, когда мышь перемещается по ссылке или клавиатура перемещает фокус на ссылку.

#### Событие: 'cursor-changed'

Возвращает:

* `event` Event
* `type` String
* `image` [NativeImage](native-image.md) (опционально)
* `scale` Float (необязательно) - фактор масштабирования для пользовательского курсора.
* `size` [размер](structures/size.md) (необязательно) - размер `image`.
* `hotspot` [Point](structures/point.md) (по желанию) - координаты точки доступа пользовательского курсора.

Излучается при изменении типа курсора. Параметр `type` может быть `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` или `custom`.

Если `type` параметр `custom`, параметр `image` будет держать пользовательский курсор изображения в [`NativeImage`](native-image.md), и `scale`, `size` и `hotspot` будет дополнительную информацию о пользовательском курсоре.

#### Событие: 'context-menu'

Возвращает:

* `event` Event
* `params` объект
  * `x` - x координаты.
  * `y` Интегр - у координат.
  * `linkURL` String - URL ссылки, которая содержит узел контекстного меню, было вызвано.
  * `linkText` Строка - Текст, связанный со ссылкой. Может быть пустой строки, если содержимое ссылки является изображением.
  * `pageURL` String - URL страницы верхнего уровня, на которую было контекстное меню.
  * `frameURL` String - URL подрамник, на который было вызвано контекстное меню.
  * `srcURL` Строка - URL-адрес источника для элемента, на который было контекстное меню. Элементы с исходными URL-адресами являются изображениями, аудио и видео.
  * `mediaType` Строка - Тип узла, на который было вызвано контекстное меню. Не быть `none`, `image`, `audio`, `video`, `canvas`, `file` или `plugin`.
  * `hasImageContents` Boolean - Было ли вызвано контекстное меню на изображении которое имеет непустое содержимое.
  * `isEditable` Boolean - Является ли контекст редактируемым.
  * `selectionText` String - Текст выделения, на который было вызвано контекстное меню.
  * `titleText` String - Название или альт текст выбора, что контекст был вызван на.
  * `misspelledWord` Строка - Неправильное слово под курсором, если таковые имеются.
  * `dictionarySuggestions` String - Массив предлагаемых слов, чтобы показать , чтобы заменить `misspelledWord`.  Доступен только в том случае, если имеется слово и орфография включены.
  * `frameCharset` String - Кодирование символа кадра, на который было вызвано меню.
  * `inputFieldType` String - Если контекстное меню было вызвано на в поле, тип этого поля. Возможные значения являются `none`, `plainText`, `password`, `other`.
  * `menuSourceType` Строка - Входной источник, который ссылался на контекстное меню. Может быть `none`, `mouse`, `keyboard`, `touch` или `touchMenu`.
  * `mediaFlags` объект - Флаги для элемента мультимедиа, на которые было контекстное меню.
    * `inError` Boolean - Ли элемент средств разбился.
    * `isPaused` Boolean - приостанавливается ли элемент мультимедиа.
    * `isMuted` Boolean - Является ли элемент средств массовой информации приглушен.
    * `hasAudio` Boolean - Имеет ли элемент мультимедиа звук.
    * `isLooping` Boolean - Является ли элемент мультимедиа циклом.
    * `isControlsVisible` Boolean - Являются ли элементы управления медиа- видны.
    * `canToggleControls` Boolean - Являются ли элементы управления медиа- переключаемыми.
    * `canRotate` Boolean - Можно ли повернуть элемент мультимедиа.
  * `editFlags` - Эти флаги указывают на то, считает ли , что он способен выполнить соответствующее действие.
    * `canUndo` - Считает ли рендерер, что это может отменить.
    * `canRedo` Boolean - Считает ли рендерер, что он может перекрасить.
    * `canCut` Boolean - считает ли рендерер, что он может сократить.
    * `canCopy` Boolean - Считает ли рендерер, что он может скопировать
    * `canPaste` Boolean - считает ли рендерер, что он может вставить.
    * `canDelete` Boolean - Считает ли рендерер, что он может удалить.
    * `canSelectAll` Boolean - Считает ли рендерер, что он может выбрать все.

Излучается при новом контексте меню, которое должно быть обработано.

#### Событие: 'select-bluetooth-device'

Возвращает:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String

Излучается, когда Bluetooth устройство должно быть выбрано по вызову, чтобы `navigator.bluetooth.requestDevice`. Для использования `navigator.bluetooth` api `webBluetooth` должна быть включена. Если `event.preventDefault` не называется, будет выбрано первое доступное устройство. `callback` должны быть вызваны с `deviceId` , которые будут выбраны, передавая пустую строку `callback` , отмените запрос.

```javascript
const { app, BrowserWindow } - требуют ('электрон')

пусть выигрывают - null
app.commandLine.appendSwitch ('enable-experimental-web-platform-features')

app.whenReady.)., затем ((() -> -
  win - новый BrowserWindow ({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (событие,  win.webContents.on.) deviceList, обратный вызов) -> -
    event.preventDefault()
    const result - deviceList.find (((устройство) -> -
      return device.deviceName - "тест"
    q)
    если (!result) -
      обратный вызов ('
    )

      (
  )
)
```

#### Событие: 'paint'

Возвращает:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - Данные изображения всего кадра.

Излучается при сгенерировании нового кадра. Только грязная область передается в буфере.

```javascript
const { BrowserWindow } и требуют ('электрон')

const выигрыша - новый BrowserWindow (веб-предрекания: { offscreen: true } )
win.webContents.on ('paint', (событие, грязное, изображение) -> -
  // updateBitmap (грязный, image.getBitmap())
q)
win.loadURL ('http://github.com')
```

#### Событие: 'devtools-reload-page'

Излучаемый, когда окно devtools инструктирует webContents перезагрузить

#### Событие: 'will-attach-webview'

Возвращает:

* `event` Event
* `webPreferences` WebPreferences - веб-предпочтения, которые будут использоваться гостем странице. Этот объект может быть изменен, чтобы настроить предпочтения для гостевой странице.
* `params` запись<string, string> - Другие параметры `<webview>` , такие как url `src` . Этот объект может быть изменен для настройки параметров гостевой страницы.

Испускаемый, `<webview>`веб-содержимое компании прилагается к этому веб- содержимому. Вызов `event.preventDefault()` уничтожит гостевую страницу.

Это событие может быть использовано для настройки `webPreferences` для `webContents` `<webview>` до его загрузки и обеспечивает возможность установки настроек которые не могут быть установлены с помощью `<webview>` атрибутов.

**Примечание:** Указанный вариант `preload` скрипта будет отображаться как `preloadURL` (не `preload`) в `webPreferences` , испускаемом этим событием.

#### Событие: 'did-attach-webview'

Возвращает:

* `event` Event
* `webContents` WebContents - Гостевой веб-контент, который используется `<webview>`.

Излучается, когда `<webview>` был прикреплен к этому веб-содержимому.

#### Событие: 'консоль-сообщение'

Возвращает:

* `event` Event
* `level` Integer - уровень журнала, от 0 до 3. Для того, чтобы он `verbose`, `info`, `warning` и `error`.
* `message` строка - фактическое сообщение консоли
* `line` Integer - Номер строки источника, который вызвал это сообщение консоли
* `sourceId` Струна

Испускаемое, когда связанное окно регистрирует сообщение консоли.

#### Событие: «предустановка-ошибка»

Возвращает:

* `event` Event
* `preloadPath` Струна
* `error` Error

Испускаемый при предварительной загрузке `preloadPath` бросает неохвоженные `error`.

#### Событие: 'ipc-сообщение'

Возвращает:

* `event` Event
* `channel` String (Строка)
* `...args` any[]

Излучается, когда процесс рендерера отправляет асинхронное сообщение через `ipcRenderer.send()`.

#### Событие: 'ipc-сообщение-синхронизация'

Возвращает:

* `event` Event
* `channel` String (Строка)
* `...args` any[]

Излучается, когда процесс рендерера отправляет синхронное сообщение через `ipcRenderer.sendSync()`.

#### Событие: 'desktop-capturer-get-sources'

Возвращает:

* `event` Event

Излучается при `desktopCapturer.getSources()` вызывается в процессе рендерера. Вызов `event.preventDefault()` вернет пустые источники.

#### Событие: «дистанционное требует» _Deprecated_

Возвращает:

* `event` IpcMainEvent
* `moduleName` String

Излучается при `remote.require()` вызывается в процессе рендерера. Вызов `event.preventDefault()` предотвращает возврат модуля. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

#### Событие: «дистанционно-получить-глобальный» _Deprecated_

Возвращает:

* `event` IpcMainEvent
* `globalName` String

Излучается при `remote.getGlobal()` вызывается в процессе рендерера. Вызов `event.preventDefault()` предотвращает возврат глобального значения. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

#### Событие: 'удаленный-получить-builtin' _Deprecated_

Возвращает:

* `event` IpcMainEvent
* `moduleName` String

Излучается при `remote.getBuiltin()` вызывается в процессе рендерера. Вызов `event.preventDefault()` предотвращает возврат модуля. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

#### Событие: 'дистанционное начало-текущее окно' _Deprecated_

Возвращает:

* `event` IpcMainEvent

Излучается при `remote.getCurrentWindow()` вызывается в процессе рендерера. Вызов `event.preventDefault()` предотвращает возврат объекта. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

#### Событие: "дистанционное получить-текущий-веб-содержимое" _Deprecated_

Возвращает:

* `event` IpcMainEvent

Излучается при `remote.getCurrentWebContents()` вызывается в процессе рендерера. Вызов `event.preventDefault()` предотвращает возврат объекта. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

#### Событие: 'preferred-size-changed'

Возвращает:

* `event` Event
* `preferredSize` [размер](structures/size.md) - минимальный размер, должен содержать макет документа, не требуя прокрутки.

Испускаемый при `WebContents` предпочтительный размер изменился.

Это событие будет излучаться только тогда `enablePreferredSizeMode` когда он будет `true` в `webPreferences`.

### Методы экземпляра

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (опционально)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (опционально) - URL-адрес HTTP ссылки.
  * `userAgent` String (опционально) - user-agent, создающий запрос.
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` ([UploadRawData)](structures/upload-raw-data.md) | [UploadFile)](structures/upload-file.md)) (по желанию)
  * `baseURLForDataURL` String (опционально) - Базовый Url (с разделителем пути), для файлов, которые будут загружены по Url данных. This is needed only if the specified `url` is a data url and needs to load other files.

Возвращает `Promise<void>` - обещание разрешится, когда страница закончит загрузку (см. [`did-finish-load`](web-contents.md#event-did-finish-load)), и отклоняет , если страница не загружается (см. [`did-fail-load`](web-contents.md#event-did-fail-load)). Обработчик отклонения нооп уже прикреплен, что позволяет избежать неопроверженных ошибок отказа.

Загружает `url` в окно. В `url` должен содержаться приставка протокола, например, `http://` или `file://`. Если нагрузка должна обойти кэш http, использовать `pragma` заголовок для ее достижения.

```javascript
const { webContents } - требуют ('электрон')
вариантов const - экстраголов: 'pragma: нет кэша\n' s
webContents.loadURL('https://github.com', варианты)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (опционально)
  * `query` Record<String, String> (опционально) - переданная в `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Возвращает `Promise<void>` - промис будет разрешен, когда страница завершит загрузку (см. [`did-finish-load`](web-contents.md#event-did-finish-load)), и отклоняет, если страница не удачно загрузилась (см. [`did-fail-load`](web-contents.md#event-did-fail-load)).

Загружает данный файл в окно, `filePath` должен быть путь к HTML файл по отношению к корню вашего приложения.  Например, структуру приложения, как это:

```sh
| корневые
| - package.json
| - src
|   - главное.js
|   - индекс.html
```

Потребуется код, как это

```js
win.loadFile (src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Инициирует загрузку ресурса на `url` навигации. Начнется `will-download` событие `session` года.

#### `contents.getURL()`

Возвращает `String` - URL текущей веб-страницы.

```javascript
const { BrowserWindow } - требуют ('электрон')
const win - новый BrowserWindow ({ width: 800, height: 600 })
win.loadURL ('http://github.com')., то ((() -> -
  const currentURL - win.webContents.getURL()
  консоль.log (currentURL)

```

#### `contents.getTitle()`

Возвращает `String` - Название текущей веб-страницы.

#### `contents.isDestroyed()`

Возвращает `Boolean` - Будет ли веб-страница уничтожена.

#### `contents.focus()`

Фокусирует веб-страницу.

#### `contents.isFocused()`

Возвращает `Boolean` - Ориентирована ли веб-страница.

#### `contents.isLoading()`

Возвращает `Boolean` - Является ли веб-страница по-прежнему загрузки ресурсов.

#### `contents.isLoadingMainFrame()`

Возвращает `Boolean` - является ли основной кадр (а не только iframes или кадры в нем) -прежнему загрузки.

#### `contents.isWaitingForResponse()`

Возвращает `Boolean` - ждет ли веб-страница первого ответа от основного ресурса страницы.

#### `contents.stop()`

Остановка любой ожидаемой навигации.

#### `contents.reload()`

Перезагрузка текущей веб-страницы.

#### `contents.reloadIgnoringCache()`

Перезагружает текущую страницу и игнорирует кэш.

#### `contents.canGoBack()`

Возвращает `Boolean` - Может ли браузер вернуться на предыдущую веб-страницу.

#### `contents.canGoForward()`

Возвращает `Boolean` - Может ли браузер перейти на следующую веб-страницу.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Возвращает `Boolean` - Может ли веб-страница перейти к `offset`.

#### `contents.clearHistory()`

Очищает историю навигации.

#### `contents.goBack()`

Делает браузер вернуться веб-страницы.

#### `contents.goForward()`

Делает браузер идти вперед веб-страницы.

#### `contents.goToIndex(index)`

* `index` Integer

Переходит браузер к указанному абсолютному индексу веб-страниц.

#### `contents.goToOffset(offset)`

* `offset` Integer

Переходит к указанному смещению из "текущей записи".

#### `contents.isCrashed()`

Возвращает `Boolean` - разбился ли процесс рендерера.

#### `contents.forcefullyCrashRenderer()`

Принудительно завершает процесс визуализации, который в настоящее время хостинг этой `webContents`. Это приведет к `render-process-gone` , которое будет излучаться с `reason=killed || reason=crashed`. Пожалуйста, обратите внимание, что некоторые webContents доля процессов и, следовательно, называя этот метод может также сбой для других webContents, а также.

Вызов `reload()` сразу после вызова этого метода заставит перезагрузку произойти в новом процессе. Это следует использовать когда этот процесс нестабилен или непригоден для использования, например, для из `unresponsive` события.

```js
contents.on ('unresponsive', async () -> -
  const { response } - ждут dialog.showMessageBox (сообщение
    : 'App X стал безответным',
    название: "Вы хотите попробовать принудительно перезагрузить приложение?", кнопки
    : "OK", "Отмена",
    cancelId: 1
  )
  если (ответ No 0) -
    contents.forcefullyCrashRenderer()
    contents.reload()


```

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Переопределяет агента пользователя для этой веб-страницы.

#### `contents.getUserAgent()`

Возвращает `String` - пользовательский агент для этой веб-страницы.

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (опционально)
  * `cssOrigin` String (по желанию) - может быть либо "пользователем", либо "автором"; Указание "пользователя" позволяет предотвратить переопределение веб-сайтов CSS, которые вы вставляете. По умолчанию является "автором".

Возвращает `Promise<String>` - Обещание, которое разрешает с ключом для вставленных CSS, которые впоследствии могут быть использованы для удаления CSS через `contents.removeInsertedCSS(key)`.

Вводит CSS на текущую веб-страницу и возвращает уникальный ключ для вставленного таблицы.

```js
contents.on ('did-finish-load', () -> -
  contents.insertCSS ('html, кузов - фоновый цвет: #f00; q')
)
```

#### `contents.removeInsertedCSS (ключ)`

* `key` String

Возвращает `Promise<void>` - Разрешает, если удаление было успешным.

Удаляет вставленный CSS с текущей веб-страницы. Таблица стилей идентифицируется ключом, который возвращается из `contents.insertCSS(css)`.

```js
contents.on ('did-finish-load', async () -> -
  const key - ждут contents.insertCSS ('html, тело - фоновый цвет: #f00; q')
  contents.removeInsertedCSS (ключ)
)
```

#### `contents.executeJavaScript (код, userGesture)`

* `code` String
* `userGesture` Boolean (опиционально) - по умолчанию `false`.

Возвращает `Promise<any>` - Обещание, которое разрешается с результатом выполненного кода или отвергается, если результатом кода является отклоненное обещание.

Вычисляет `code` на странице.

В окне браузера некоторые HTML API как `requestFullScreen` может быть только вызван жестом пользователя. Указание `userGesture` как `true` снимает это ограничение.

Выполнение кода будет приостановлено до тех пор, пока веб-страница не прекратит загрузку.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // должен быть объект JSON  из запрашиваемого вызова
  })
```

#### `contents.executeJavaScriptInIsolatedWorld (worldId, скрипты, userGesture)`

* `worldId` Integer - Идентификатор мира для запуска javascript в, `0` является мир по умолчанию, `999` это мир, используемый в `contextIsolation` Electron.  Вы можете предоставить любой integer здесь.
* `scripts` [WebSource](structures/web-source.md)
* `userGesture` Boolean (опиционально) - по умолчанию `false`.

Возвращает `Promise<any>` - Обещание, которое разрешается с результатом выполненного кода или отвергается, если результатом кода является отклоненное обещание.

Работает как `executeJavaScript` но оценивает `scripts` в изолированном контексте.

#### `contents.setIgnoreMenuShortcuts (игнорировать)`

* `ignore` Boolean

Игнорируйте ярлыки меню приложений, в то время как это веб-содержимое сфокусировано.

#### `contents.setWindowOpenHandler(handler)`

* `handler` Function<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * `details` объект
    * `url` String - The _resolved_ version of the URL passed to `window.open()`. e.g. opening a window with `window.open('foo')` will yield something like `https://the-origin/the/current/path/foo`.
    * `frameName` String - Name of the window provided in `window.open()`
    * `features` String - Comma separated list of window features provided to `window.open()`.

  Returns `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` cancels the creation of the new window. `allow` will allow the new window to be created. Specifying `overrideBrowserWindowOptions` allows customization of the created window. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

Вызывается перед созданием окна, `window.open()` вызывается из рендерера. Более подробную [`window.open()`](window-open.md) и как использовать это в сочетании с `did-create-window`.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Отключить звук на текущей веб-странице.

#### `contents.isAudioMuted()`

Возвращает `Boolean` - Была ли эта страница отключена.

#### `contents.isCurrentlyAudible ()`

Возвращает `Boolean` - Ли аудио в настоящее время играет.

#### `contents.setZoomFactor(factor)`

* `factor` Двойной - Увеличить фактор; по умолчанию составляет 1,0.

Изменяет коэффициент масштабирования на указанный фактор. Коэффициент увеличения на 100, так что 300% и 3,0.

Коэффициент должен быть больше 0,0.

#### `contents.getZoomFactor()`

Возвращает `Number` - текущий коэффициент масштабирования.

#### `contents.setZoomLevel(level)`

* `level` Number - уровень увеличения.

Изменяет уровень масштаба на указанный уровень. Оригинальный размер 0 и каждое приращение выше или ниже представляет масштабирование 20% больше или меньше, по умолчанию ограничение на 300% и 50% от исходного размера, соответственно. Формула для этого `scale := 1.2 ^ level`.

> **ПРИМЕЧАНИЕ**: Политика масштабирования на уровне Chromium имеет одно и то же происхождение, что означает, что уровень масштабирования для определенного домена распространяется во всех экземплярах окон с одним и тем же доменом. Дифференциация URL-адресов окон позволит увеличить работу на окно.

#### `contents.getZoomLevel()`

Возвращает `Number` - текущий уровень масштабирования.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Возвращает `Promise<void>`

Устанавливает максимальный и минимальный уровень пинч-маштабирования.

> **ПРИМЕЧАНИЕ**: Визуальный зум отключен по умолчанию в Electron. Чтобы включить его, позвоните:
> 
> ```js
contents.setVisual'oomLevelLimits (1, 3)
```

#### `contents.undo()`

Выполняет команду редактирования `undo` веб-странице.

#### `contents.redo()`

Выполняет команду редактирования `redo` веб-странице.

#### `contents.cut ()`

Выполняет команду редактирования `cut` веб-странице.

#### `contents.copy ()`

Выполняет команду редактирования `copy` веб-странице.

#### `contents.copyImageAt (x, y)`

* `x` Integer
* `y` Integer

Копировать изображение в данном положении буфер обмена.

#### `contents.paste()`

Выполняет команду редактирования `paste` веб-странице.

#### `contents.pasteAndMatchStyle()`

Выполняет команду редактирования `pasteAndMatchStyle` веб-странице.

#### `contents.delete ()`

Выполняет команду редактирования `delete` веб-странице.

#### `contents.selectAll ()`

Выполняет команду редактирования `selectAll` веб-странице.

#### `contents.unselect()`

Выполняет команду редактирования `unselect` веб-странице.

#### `contents.replace (текст)`

* `text` String

Выполняет команду редактирования `replace` веб-странице.

#### `contents.replaceMisspelling (текст)`

* `text` String

Выполняет команду редактирования `replaceMisspelling` веб-странице.

#### `contents.insertText (текст)`

* `text` String

Возвращает `Promise<void>`

Вставляет `text` в элемент с фокусом.

#### `contents.findInPage(text[, options])`

* `text` Строка - Содержимое для поиска, не должно быть пустым.
* `options` Object (опционально)
  * `forward` Boolean (по желанию) - Следует ли искать вперед или назад, по умолчанию `true`.
  * `findNext` Boolean (по желанию) - Является ли операция первым запросом или последующей деятельности, по умолчанию `false`.
  * `matchCase` Boolean (по желанию) - Должен ли поиск быть деликатным, по умолчанию `false`.

Возвращает `Integer` - идентификатор запроса, используемый для запроса.

Начинается запрос на поиск всех совпадений для `text` на веб-странице. Результат запроса можно получить , подписавшись на [`found-in-page`](web-contents.md#event-found-in-page) событие.

#### `contents.stopFindInPage (действие)`

* `action` String - Определяет действие, которое состоится при и`webContents.findInPage`запроса.
  * `clearSelection` - Очистить выбор.
  * `keepSelection` - Перевести выбор в нормальный выбор.
  * `activateSelection` - Сосредоточьтесь и нажмите на узел выбора.

Прекращает `findInPage` запрос на `webContents` с предоставленным `action`.

```javascript
const { webContents } требуют ('электрон')
webContents.on ('найдено-в-странице', (событие, результат) -> -
  если (result.finalUpdate) webContents.stopFindInPage ('clearSelection')
q)

const requestId - webContents.findInPage ('api')
console.log (requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (по желанию) - область страницы, которая должна быть захвачена.

Возвращает `Promise<NativeImage>` - разрешается с [NativeImage](native-image.md)

Захватывает снимок страницы в границах `rect`. Пропустив `rect`, будет сделан захват всей видимой страницы.

#### `contents.isBeingCaptured()`

Возвращает `Boolean` - Является ли эта страница в настоящее время захвачены. Он возвращается верно, когда захват большой, то 0.

#### `contents.incrementCapturerCount (размер, stayHidden)`

* `size` [размер](structures/size.md) (по желанию) - предпочтительный размер для захвата.
* `stayHidden` Boolean (по желанию) - Держите страницу скрытой, а не видимой.

Увеличьте количество захвата на один. Страница считается видимой, когда окно браузера скрыто, а количество захватилов не является нулевым. Если вы хотите, чтобы страница была скрыта, вы должны убедиться, что `stayHidden` установлен на реальность.

Это также влияет на API видимости Страницы.

#### `contents.decrementCapturerCount ([stayHidden])`

* `stayHidden` Boolean (по желанию) - Держите страницу в скрытом состоянии, а не видимым.

Уменьшите количество захвата на один. Страница будет настроена в скрытое или закрытый состояние, когда окна браузера скрыты или закрыты, а количество захватилов достигнет нуля. Если вы хотите количество скрытых захватов, вместо этого вы должны установить `stayHidden` с реальностью.

#### `contents.getPrinters ()`

Получить список системных принтеров.

Возвращает [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Object (опционально)
  * `silent` Boolean (по желанию) - Не спрашивайте у пользователя настройки печати. По умолчанию - `false`.
  * `printBackground` Boolean (по желанию) - Печать фонового цвета и веб-страницы. По умолчанию - `false`.
  * `deviceName` String (по желанию) - Установите имя устройства принтера для использования. Должно быть системно-определяемое имя, а не «дружественное» имя, например «Brother_QL_820NWB», а не «Брат ЗЛ-820НВБ».
  * `color` Boolean (по желанию) - Установите, будет ли печатная веб-страница в цвете или серой шкале. По умолчанию - `true`.
  * `margins` (по желанию)
    * `marginType` String (по желанию) - может быть `default`, `none`, `printableArea`, или `custom`. Если `custom` выбран, вам также нужно будет указать `top`, `bottom`, `left`и `right`.
    * `top` (по желанию) - верхняя маржа печатной веб-страницы, в пикселях.
    * `bottom` (по желанию) - нижняя маржа печатной веб-страницы, в пикселях.
    * `left` (по желанию) - левая маржа печатной веб-страницы, в пикселях.
    * `right` (по желанию) - правая маржа печатной веб-страницы, в пикселях.
  * `landscape` Boolean (по желанию) - Следует ли печатать веб-страницу в ландшафтном режиме. По умолчанию - `false`.
  * `scaleFactor` номер (необязательно) - коэффициент масштаба веб-страницы.
  * `pagesPerSheet` (необязательно) - количество страниц для печати на листе страницы.
  * `collate` Boolean (по желанию) - Следует ли собирать веб-страницу.
  * `copies` номер (необязательно) - количество копий веб-страницы для печати.
  * `pageRanges` Объект» (необязательно) - диапазон страниц для печати. На macOS, только один диапазон почитается.
    * `from` - Индекс первой страницы для печати (0 на основе).
    * `to` - Индекс последней страницы для печати (включительно) (0 на основе).
  * `duplexMode` String (по желанию) - Установите дуплексный режим печатной веб-страницы. Может быть `simplex`, `shortEdge`, или `longEdge`.
  * `dpi` запись<string, number> (по желанию)
    * `horizontal` (по желанию) - Горизонтальный dpi.
    * `vertical` (необязательно) - Вертикальный dpi.
  * `header` String (по желанию) - Строка для печати в качестве заголовка страницы.
  * `footer` String (по желанию) - Строка, которая будет напечатана в качестве страницы footer.
  * `pageSize` струнные | Размер (необязательно) - Укажите размер страницы печатного документа. Может быть `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` или объект, содержащий `height`.
* `callback` Function (опционально)
  * `success` Boolean - указывает на успех печатного звонка.
  * `failureReason` Строка - Описание ошибки перезвехивает, если печать не удается.

Когда пользовательский `pageSize` пройден, Chromium пытается проверить конкретные минимальные значения платформы для `width_microns` и `height_microns`. Ширина и высота должны быть не менее 353 микрон, но могут быть выше на некоторых операционных системах.

Печать веб-страницы окна. Когда `silent` установлен на `true`, Electron будет выбирать системы по умолчанию принтер, если `deviceName` пуст и настройки по умолчанию для печати.

Используйте `page-break-before: always;` CSS, чтобы заставить печатать на новой странице.

Пример использования:

```js
варианты const :
  silent: true,
  deviceName: 'My-Printer',
  pageRanges:{
    from: 0,
    to: 1
  }

- win.webContents.print (опции, (успех, errorType) -> -
  если (!успех) консоль.log (errorType)
)
```

#### `contents.printToPDF(options)`

* `options` Object
  * `headerFooter` запись<string, string> (по желанию) - заголовок и лакея для PDF.
    * `title` String - Название заголовка PDF.
    * `url` String - URL для pdf footer.
  * `landscape` Boolean (по желанию) - `true` для пейзажа, `false` для портрета.
  * `marginsType` Integer (необязательно) - определяет тип маржи для использования. Использует 0 для по умолчанию, 1 без маржи и 2 для минимальной маржи.
  * `scaleFactor` номер (необязательно) - коэффициент масштаба веб-страницы. Может варьироваться от 0 до 100.
  * `pageRanges` запись<string, number> (по желанию) - диапазон страниц для печати.
    * `from` - Индекс первой страницы для печати (0 на основе).
    * `to` - Индекс последней страницы для печати (включительно) (0 на основе).
  * `pageSize` струнные | Размер (необязательно) - Укажите размер страницы сгенерированного PDF. Может быть `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` или объект, содержащий `height` и `width` в микронах.
  * `printBackground` Boolean (необязательно) - Следует ли печатать CSS фоны.
  * `printSelectionOnly` Boolean (необязательно) - Следует ли печатать только выбор.

Возвращает `Promise<Buffer>` - Разрешает с генерируемыми данными PDF.

Печатает веб-страницу окна как PDF с пользовательскими настройками печати предварительного просмотра Chromium настройками.

Данные `landscape` проигнорированы, если `@page` csS at-rule используется на веб-странице.

По умолчанию пустая `options` будет рассматриваться как:

```javascript

  marginsType: 0,
  printBackground: ложный,
  printSelectionСвыборно: ложный,
  пейзаж: ложный,
  pageSize: 'A4',
  scaleFactor: 100
.
```

Используйте `page-break-before: always;` CSS, чтобы заставить печатать на новой странице.

Пример `webContents.printToPDF`:

```javascript
const { BrowserWindow } - требуют ('электрон')
const fs и требуют ('fs')
const путь - требуют ('путь')
const os - требуют ('os')

const win - новый BrowserWindow ({ width: 800, height: 600 })
win.loadURL ('http://github.com> ')

win.webContents.on ('did-finish-load', () -> -
  // Используйте параметры печати по умолчанию
  win.webContents.printToPDF (яп.), затем (данные -> -
    const pdfPath - path.join(os.homedir),) 'temp.pdf')
    fs.writeFile (pdfPath, данные, (ошибка) -  -
      если (ошибка) ошибка броска
      консоли.log ('Написал PDF успешно ${pdfPath}')
    q)
  q).catch (ошибка No> и
    консоли.log ('Не удалось написать PDF на ${pdfPath}: ', ошибка)
  )
)
```

#### `contents.addWorkSpace(path)`

* `path` String

Добавляет указанный путь в рабочее пространство DevTools. Должно быть использовано после создания devTools :

```javascript
const { BrowserWindow } - требуют ('электрон')
const win - новый BrowserWindow ()
win.webContents.on ('devtools-opened', () -> -
  win.webContents.addWorkSpace (__dirname)
)
```

#### `contents.removeWorkSpace(path)`

* `path` String

Удаляет указанный путь из рабочего пространства DevTools.

#### `contents.setDevToolsWebContents (devToolsWebContents)`

* `devToolsWebContents` WebContents

Использует `devToolsWebContents` в качестве целевого `WebContents` , чтобы показать devtools.

Меню `devToolsWebContents` не должно было делать никакой навигации, и оно не использоваться для других целей после звонка.

По умолчанию Electron управляет devtools, создавая внутренний `WebContents` с родным видом, который разработчики имеют очень ограниченный контроль. С помощью `setDevToolsWebContents` , разработчики могут использовать любые `WebContents` , чтобы показать в нем, в том числе `BrowserWindow`, `BrowserView` и `<webview>` тег.

Обратите внимание, что закрытие devtools не разрушает `devToolsWebContents`, это ответственность абонента, чтобы уничтожить `devToolsWebContents`.

Пример отображения devtools в теге `<webview>` :

```html
<html>
<head>
  <style type="text/css">
    - маржа: 0;
    #browser - высота: 70%;
    #devtools - высота: 30%;
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } - требуют ('электрон')
    const emittedOnce (элемент, eventName) -> новое обещание (разрешение -> -
      element.addEventListener(eventName, событие> разрешение (событие), { once: true })
    q)
    const browserView - document.getElementById ('browser')
    const devtoolsView - document.getElementById ('devtools')
    const browserReady - emittedOnce (browserView , 'дом-готов')
    const devtoolsReady - излучаемыйOnce (devtoolsView, 'дом-готов')
    Promise.all ('browserReady, devtoolsReady).,тогда (() -> -
      конст targetId - browserView.getWebContentsId ()
      const devtoolsId - devtoolsView.getWebContentsId()
      ipcRenderer.send ('open-devtools', targetId, devtoolsId)
    )
  </script>
</body>
</html>
```

```js
Основной процесс
const { ipcMain, webContents } требуют ('электрон')
ipcMain.on ('open-devtools', (событие, targetContentsId, devtoolsContentsId) -> -
  констовая цель - webContents.fromId (targetContentsId)
  const devtools - webContents.fromId (devtoolsContentsId)
  target.setDevToolsWebContents (devtools)
  target.openDevTools(
)
```

Пример отображения devtools в `BrowserWindow`:

```js
const { app, BrowserWindow } - требуют ('электрон')

пусть выигрывают - null
пусть devtools - null

app.whenReady ().., затем () -> -
  win - новый BrowserWindow ()
  devtools - новый BrowserWindow()
  win.loadURL ('https://github.com')
  win.webContents.setDevToolsWebContents (devtools.webContents)
  win.webContents.openDevTools ({ mode: 'detach' })
)
```

#### `contents.openDevTools([options])`

* `options` Object (опционально)
  * `mode` String - Открывает devtools с указанным состоянием дока, может быть `right`, `bottom`, `undocked`, `detach`. По умолчанию для последнего используемого состояния дока. В `undocked` режиме можно пристыковаться назад. В `detach` режиме это не так.
  * `activate` Boolean (необязательно) - Следует ли вывести открытое окно devtools на первый план. По умолчанию `true`.

Открывает devtools.

Когда `contents` является тегом `<webview>` , `mode` будет `detach` по умолчанию, явно проходя пустой `mode` может заставить использовать последнее используемое состояние дока.

#### `contents.closeDevTools()`

Закрывает devtools.

#### `contents.isDevToolsOpened()`

Возвращает `Boolean` - Открыты ли devtools.

#### `contents.isDevToolsФокусировано()`

Возвращает `Boolean` - Ориентировано ли представление devtools.

#### `contents.toggleDevTools()`

Переключает инструменты разработчика.

#### `contents.inspectЭлement (x, y)`

* `x` Integer
* `y` Integer

Начинается проверка элемента на позиции (`x`, `y`).

#### `contents.inspectSharedWorker()`

Открывает инструменты разработчика для общего контекста работника.

#### `contents.inspectSharedWorkerById (рабочийid)`

* `workerId` Струна

Проверяет общего работника на основе его идентификатора.

#### `contents.getAllSharedWorkers()`

Возвращает [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Информация обо всех общих работников.

#### `contents.inspectServiceWorker()`

Открывает инструменты разработчика для контекста работника службы.

#### `contents.send (канал, ... аргс)`

* `channel` String (Строка)
* `...args` any[]

Отправить асинхронное сообщение процессу рендерера через `channel`, наряду с аргументами. Аргументы будут сериализованы с [клонов алгоритм][SCA], как [`postMessage`][], так что прототип цепи не будут включены. Функции отправки, обещания, символы, WeakMaps или WeakSets вы можете сделать исключение.

> **ПРИМЕЧАНИЕ**: Отправка нестандартных типов JavaScript, таких как объекты DOM или специальные объекты Electron, станет исключением.

Процесс рендерера может обрабатывать сообщение, слушая `channel` с [`ipcRenderer`](ipc-renderer.md) модулем.

Пример отправки сообщений из основного процесса в процесс рендерера:

```javascript
// В основном процессе.
const { app, BrowserWindow } - требуют ('электрон')
пусть выигрывают - null

app.whenReady ()..., то ((()) -> -
  win - новый BrowserWindow ({ width: 800, height: 600 })
  win.loadURL ('файл://${__dirname}/index.html')
  win.webContents.on ('did-finish-load', () -> -
    win.webContents.send ("пинг", "whoooooooh!")
  })
})
```

```html<!-- индекс.html --><html>
<body>
  <script>
    требуют ('электрон').ipcRenderer.on('ping', (событие, сообщение) -> -
      консоли.log (сообщение) // Печатает 'whoooooooh!'
    В)
  </script>
</body>
</html>
```

#### `contents.sendToFrame (frameId, канал, ... аргс)`

* `frameId` Интегр | «Число, число» - идентификатор кадра для отправки или пара `[processId, frameId]` если кадр находится в другом процессе с кадра.
* `channel` String (Строка)
* `...args` any[]

Отправить асинхронное сообщение в определенный кадр в процессе рендерера через `channel`, наряду с аргументами. Аргументы будут сериализованы с [алгоритмом клонов][SCA], как и [`postMessage`][], поэтому прототип цепи не будут включены. Отправка Функции, Обещания, Символы, WeakMaps, , что WeakSets будет бросать исключение.

> **ПРИМЕЧАНИЕ:** отправка нестандартных типов JavaScript, таких как объекты DOM или специальные объекты Electron, станет исключением.

Процесс рендерера может обрабатывать сообщение, слушая `channel` с [`ipcRenderer`](ipc-renderer.md) модулем.

Если вы хотите получить `frameId` данного контекста рендерера, вы должны использовать `webFrame.routingId` значение.  Например,

```js
В процессе рендеринга
консоли.log ('My frameId is:', require ('electron').webFrame.routingId)
```

Вы также можете прочитать `frameId` всех входящих сообщений IPC в основном процессе.

```js
В основном процессе
ipcMain.on ('ping', (событие) -> -
  console.info ("Сообщение пришло из frameId:', event.frameId)
)
```

#### `contents.postMessage (канал, сообщение, [transfer])`

* `channel` String (Строка)
* `message` any
* `transfer` MessagePortMain (по желанию)

Отправить сообщение процессу рендерера, по желанию передав право собственности на ноль или более -`MessagePortMain`объектов.

Переданные `MessagePortMain` объекты будут доступны в процессе , получить доступ `ports` к свойству испускаемого события. Когда они в рендер, они будут родными DOM `MessagePort` объектов.

Например:

```js
Основной процесс
const { port1, port2 } - новый MessageChannelMain ()
webContents.postMessage ('port', { message: 'hello' }, [port1])

// Процесс рендерера
ipcRenderer.on ('port', (e, msg) ->
  const [port] и e.ports
  // ...
})
```

#### `contents.enableDeviceEmulation (параметры)`

* `parameters` объект
  * `screenPosition` Строка - Укажите тип экрана для эмулировать (по умолчанию: `desktop`):
    * `desktop` - Тип экрана рабочего стола.
    * `mobile` - Мобильный тип экрана.
  * `screenSize` [размер](structures/size.md) - Установите эмулированный размер экрана (screenPosition - мобильный).
  * `viewPosition` [Point](structures/point.md) - Распоитите вид на экране (screenPosition - мобильный) (по умолчанию: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Установите коэффициент масштаба устройства (если ноль по умолчанию исходный коэффициент масштаба устройства) (по умолчанию: `0`).
  * `viewSize` [размер](structures/size.md) - Установите эмулировать размер представления (пустой означает отсутствие переопределения)
  * `scale` Float - Шкала эмулировать вид внутри доступного пространства (не в просмотра) (по умолчанию: `1`).

Включить эмуляцию устройства с учетом данных параметров.

#### `contents.disableDeviceEmulation()`

Отключить эмуляцию устройства, включенную `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent (входEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [клавиатураInputEvent](structures/keyboard-input-event.md)

Отправляет входную `event` на страницу. **Примечание:** [`BrowserWindow`](browser-window.md) , содержащий содержимое, должен быть сфокусирован для `sendInputEvent()` работы.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (опиционально) - по умолчанию `false`.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Начните подписку на презентационые мероприятия и снятые кадры, `callback` будут называться с `callback(image, dirtyRect)` , когда будет события.

The `image` является примером [NativeImage](native-image.md) , который хранит захваченный кадр.

The `dirtyRect` является объектом с `x, y, width, height` свойствами, описывает, какая часть страницы была перекрашена. Если `onlyDirty` установлен на `true`, `image` будет содержать только перекрашенной области. `onlyDirty` по умолчанию `false`.

#### `contents.endFrameSubscription()`

Окончание подписки на события презентации кадров.

#### `contents.startDrag(item)`

* `item` объект
  * `file` Струна | Строка - Путь (ы) к файлу (ы) перетаскиваются.
  * `icon` [NativeImage](native-image.md) | Строка - Изображение должно быть непустое на macOS.

Устанавливает `item` как перетаскивание элемента для текущей операции перетаскивания, `file` — это абсолютный путь , который нужно перетаскивать, и `icon` — это изображение, показывающее под курсор при перетаскивании.

#### `contents.savePage (fullPath, saveType)`

* `fullPath` Строка - Полный путь файла.
* `saveType` строка - Укажите тип сохранения.
  * `HTMLOnly` - Сохранить только HTML страницы.
  * `HTMLComplete` - Сохранить полный HTML страницу.
  * `MHTML` - Сохранить полный html страницу, как MHTML.

Возвращает `Promise<void>` - решает, если страница сохранена.

```javascript
const { BrowserWindow } - требуют ('электрон')
const win - новый BrowserWindow ()

win.loadURL ('https://github.com')

win.webContents.on ('did-finish-load', async () ->
  win.webContents.savePage ('/tmp/test.html', 'HTMLComplete'.log
    > ).
  В).поймать (ошибка>
    консоли.log (ошибка)
  )
)
```

#### `contents.showDefinitionForSelection()` _macOS_

Показывает всплывающий словарь, который ищет выбранное слово на странице.

#### `contents.isOffscreen()`

Возвращает `Boolean` - Указывает, *ли включена* рендеринг.

#### `contents.startPainting()`

Если *экран рендеринга* включен, а не живопись, начните рисовать.

#### `contents.stopPainting()`

Если *экран рендеринга* включен и живопись, прекратите рисовать.

#### `contents.isPainting()`

Возвращает `Boolean` - Если *экран рендеринга* возвращается ли он в настоящее время живопись.

#### `contents.setFrameRate (fps)`

* `fps` Интегрер

Если *экранная рендеринг* включена, устанавливает частоту кадров к указанному номеру. Принимаются только значения от 1 до 240.

#### `contents.getFrameRate()`

Возвращает `Integer` - Если *экран рендеринга* включен возвращает текущую частоту кадров.

#### `contents.invalidate()`

Расписание полной перекраски окна этого веб-содержимого дюйма

Если *экранная рендеринг* включена, аннулирует кадр и генерирует один через `'paint'` событие.

#### `contents.getWebRTCIPHandlingPolicy()`

Возвращает `String` - Возвращает WebRTC IP Обработка политики.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` строка - Укажите политику обработки IP-адресов WebRTC.
  * `default` - Выставляет публичные и локальные ИП пользователя. Это поведение по умолчанию. При использовании этой политики WebRTC имеет право перечислять все интерфейсы и связывать их для обнаружения общедоступных интерфейсов.
  * `default_public_interface_only` - Предоставляет общедоступный IP пользователя, но не разоблачает локальный IP пользователя. При использовании этой политики WebRTC должен использовать только маршрут, используемый http. Это не предоставляет никаких локальных адресов.
  * `default_public_and_private_interfaces` - Выставляет публичные и локальные пользователей. При использовании этой политики WebRTC следует использовать только маршрут по умолчанию, используемый по http. Это также предоставляет связанный с этим частный адрес по умолчанию. Маршрут по умолчанию — это маршрут, выбранный ОС на многохомной конечной точке.
  * `disable_non_proxied_udp` - Не разоблачает публичные или местные ИП. При использовании webRTC следует использовать TCP только для связи с коллегами или серверами, если прокси-сервер поддерживает UDP.

Установка политики обработки IP-адресов WebRTC позволяет контролировать, какие IP-адреса через WebRTC. Более подробную [смотрите](https://browserleaks.com/webrtc) BrowserLeaks веб-сайтах.

#### `contents.getOSProcessId()`

Возвращает `Integer` - Операционная система `pid` связанного процесса рендерера.

#### `contents.getProcessId()`

Возвращает `Integer` - Хром внутреннего `pid` связанного рендерера. Можно с тем, `frameProcessId` пройденный кадром конкретных событий навигации (например. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Путь к выходному файлу.

Возвращает `Promise<void>` - указывает, был ли моментальный снимок создан успешно.

Делает снимок кучи V8 и сохраняет его в `filePath`.

#### `contents.getBackgroundThrottling()`

Возвращает `Boolean` - будет ли этот WebContents дроссельной анимации и таймеры когда страница становится фоном. Это также влияет на API видимости Страницы.

#### `contents.setBackgroundThrottling (разрешено)`

* `allowed` Булан

Контролирует, будет ли этот WebContents дроссельной анимации и таймеры когда страница становится фоновой. Это также влияет на API видимости Страницы.

#### `contents.getType()`

Возвращает `String` - тип webContent. Может быть `backgroundPage`, `window`, `browserView`, `remote`, `webview` или `offscreen`.

### Свойства экземпляра

#### `contents.audioMuted`

Свойство `Boolean` , которое определяет, отключена ли эта страница.

#### `contents.userAgent`

Учетная `String` , которое определяет агента пользователя для этой веб-страницы.

#### `contents.zoomLevel`

Свойство `Number` которое определяет уровень масштабирования для этого веб-содержимого.

Первоначальный размер 0, и каждый прирост выше или ниже представляет собой масштабирование 20% больше или меньше по умолчанию пределы 300% и 50% от первоначального размера, соответственно. Формула для этого `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

Свойство `Number` которое определяет коэффициент масштабирования для этого веб-содержимого.

Коэффициентом масштабирования является процент масштабирования, разделенный на 100, так что 300% и 3,0.

#### `contents.frameRate`

`Integer` , которое устанавливает частоту кадров веб-содержимого на указанный номер. Принимаются только значения от 1 до 240.

Применяется только в том случае *когда* за кадром  включен.

#### `contents.id` _Readonly_

Веб `Integer` представляющий уникальный идентификатор этого WebContents. Каждый идентификатор уникален среди `WebContents` экземпляров всего приложения Electron.

#### `contents.session` _Readonly_

Новый [`Session`](session.md) используется этим webContents.

#### `contents.hostWebContents` _Readonly_

Пример [`WebContents`](web-contents.md) , который может владеть этой `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

Новое `WebContents | null` , представляющее devTools `WebContents` связано с данной `WebContents`.

**Примечание:** пользователи никогда не должны хранить этот объект, потому что он может `null` , когда DevTools был закрыт.

#### `contents.debugger` _Readonly_

Пример [`Debugger`](debugger.md) для этого webContents.

#### `contents.backgroundThrottling`

Свойство `Boolean` , которое определяет, будет ли этот WebContents задушить анимацию и таймеры когда страница станет фоновой. Это также влияет на API видимости Страницы.

#### `contents.mainFrame` _Только чтение_

[`WebFrameMain`](web-frame-main.md) , представляющее верхнюю рамку иерархии кадров страницы.

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
