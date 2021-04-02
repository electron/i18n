# Тег `<webview>`

## Предупреждение

Тег Electron `webview` основан на [Chromium, `webview`][chrome-webview]который драматические архитектурные изменения. Это влияет на стабильность `webviews`, включая визуализацию, навигацию и маршрутизацию событий. В настоящее время мы рекомендуем использовать тег `webview` и рассмотреть альтернативные варианты, такие как `iframe`, Electron's `BrowserView`, или архитектура, которая позволяет избежать встроенного контента в целом.

## Включение

По умолчанию `webview` отключен в Electron >No 5.  Вы должны включить тег, настройки `webviewTag` webPreferences при построении вашего `BrowserWindow`. Для более подробной информации [документах конструктора BrowserWindow](browser-window.md).

## Обзор

> Отображение внешнего веб-контента в изолированном кадре и процессе.

Процесс: [Графический](../glossary.md#renderer-process)

Используйте тег `webview` для встраивания содержимого «гостей» (например, веб-страниц) в приложение Electron. Содержимое гостевого номера содержится в `webview` контейнера. Встроенная страница в приложении контролирует, как выкладывается содержимое гостя и рендер.

В отличие `iframe`, `webview` работает в отдельном процессе, чем ваше приложение. Он не имеет тех же разрешений, что и ваша веб-страница, и все взаимодействия приложением и встроенным контентом будут асинхронными. Это обеспечивает безопасность от встроенного содержимого. **Примечание:** большинство методов, веб-просмотр с хост-страницы требуют синхронного вызова к основному процессу.

## Пример

Чтобы встроить веб-страницу в приложение, добавьте тег `webview` на встраиваемую страницу приложения (это страница приложения, на которую будет отображаться содержимое гостя). В своей форме тег `webview` включает в себя `src` веб-страницы и стилей css которые контролируют внешний вид `webview` контейнера:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Если вы хотите контролировать гостевой контент каким-либо образом, вы можете написать JavaScript , который слушает события `webview` и реагирует на эти события с помощью `webview` методов. Вот пример кода с двумя слушателями событий: один, который слушает для веб-страницы, чтобы начать загрузку, другой для веб-страницы, чтобы остановить загрузку, и отображает "загрузку ..." сообщение во время загрузки:

```html
<script>
  onload () -> -
    const webview - document.querySelector ('webview')
    const indicator - document.querySelector ('.indicator')

    const loadstart (
      > )
    

    конст-нагрузок () -> - индикатор
      .innerText - ''
    -

    webview.addEventListener ("did-start-loading",, loadstart)
    webview.addEventListener ('did-stop-loading', loadstop)

</script>
```

## Внутренняя реализация

Под капотом `webview` реализована с [вне процесса iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). Тег `webview` по существу пользовательский элемент, использующий теневой DOM, чтобы обернуть `iframe` элемент внутри него.

Так что поведение `webview` очень похоже на кросс-доменную `iframe`, примеры:

* При нажатии на `webview`, фокус страницы будет двигаться от встраиваемого кадра к `webview`.
* Вы не можете добавить клавиатуру, мышь, и прокрутки событий слушателей `webview`.
* Все реакции между рамкой встраиваемого `webview` асинхронными.

## CSS Укладка Примечания

Обратите внимание, что стиль тега `webview` использует `display:flex;` внутренне для обеспечения того, чтобы элемент `iframe` ребенка заполнял всю высоту и ширину контейнера `webview` при использовании с традиционными макетами flexbox. Пожалуйста, не переписать значение `display:flex;` CSS, если не указать `display:inline-flex;` для inline макета.

## Атрибуты тегов

Тег `webview` имеет следующие атрибуты:

### `Src`

```html
<webview src="https://www.github.com/"></webview>
```

Веб `String` представляющий видимый URL. Написание этого атрибута инициирует навигацию уровня.

Назначение `src` собственного значения перезагрузит текущую страницу.

Атрибут `src` может также принимать URL-адреса данных, такие как `data:text/plain,Hello, world!`.

### `узла`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

А `Boolean`. При этом атрибуте гостевая страница в `webview` будет иметь интеграцию и может использовать API узла, такие как `require` и `process` , для доступа к низкоуровневым системных ресурсов. Интеграция узла отключена по умолчанию на странице узла.

### `узлаинтеграцииubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

Метод `Boolean` экспериментального варианта для включения поддержки NodeJS в подрамнике, таких как iframes внутри `webview`. Все ваши предустановки будут загружаться для каждого iframe, вы использовать `process.isMainFrame` , чтобы определить, если вы находитесь в основной кадр или нет. Эта опция отключена по умолчанию на странице гостя.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

А `Boolean`. При использовании этого `false` страница в `webview` не будет иметь доступа к [`remote`](remote.md) модулю. Удаленный модуль недоступен по умолчанию.

### `Плагины`

```html
<webview src="https://www.github.com/" plugins></webview>
```

А `Boolean`. При этом атрибуте гостевая страница в `webview` сможет использовать плагины браузера. Плагины отключены по умолчанию.

### `предварительная загрузка`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Веб `String` который определяет сценарий, который будет загружен до запуска других скриптов на странице страницы. Протокол URL-адреса скрипта должен быть либо `file:` , либо `asar:`, так как он загружен `require` гостевой странице под капотом.

Когда у гостевой страницы нет интеграции узла, этот скрипт по-прежнему будет иметь доступ ко всем API узла, но глобальные объекты, введенные Node, будут удалены после завершения выполнения этого скрипта.

**Примечание:** Эта опция будет отображаться как `preloadURL` (не `preload`) `webPreferences` , указанном `will-attach-webview` событии.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Веб `String` , который устанавливает URL-адрес реферера для гостевой страницы.

### `Useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Веб `String` , который устанавливает агента пользователя для гостевой страницы, прежде чем страница перемещается. После загрузки страницы используйте `setUserAgent` для изменения пользовательского агента.

### `disablewebбезопасность`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

А `Boolean`. При этом атрибуте гостевая страница будет отключена. Веб-безопасность включена по умолчанию.

### `Раздел`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

Веб `String` , который устанавливает сеанс, используемый страницей. Если `partition` начинается с `persist:`, страница будет использовать постоянный сеанс, доступный для всех страниц приложения с же `partition`. если нет `persist:` префикса, страница будет использовать сеанс в памяти. При присваивании одинаковой `partition`, разные страницы могут иметь одинаковую сессию. Если `partition` неустановлен, то будет использоваться сеанс по умолчанию.

Это значение может быть изменено только до первой навигации, так как процесса активного рендерера не может измениться. Последующие попытки изменить значение не увенчаются успехом за исключением DOM.

### `позволяютпопупы`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

А `Boolean`. При этом атрибуте гостевой странице будет разрешено открывать новые окна. Всплывающие окна отключены по умолчанию.

### `веб-предосудения`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

Веб `String` который является запятой разделенный список строк, который определяет веб-предпочтения, которые будут установлены на веб-просмотр. Полный список поддерживаемых строк предпочтений можно найти в [BrowserWindow](browser-window.md#new-browserwindowoptions).

Строка следует тому же формату, что и строка функций в `window.open`. Имя само по себе дается `true` значение. Предпочтение может быть установлено на другое значение, включив `=`, а затем значение. Специальные значения `yes` и `1` интерпретируются как `true`, в то `no` и `0` интерпретируются как `false`.

### `включитьblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

В `String` , который является списком строк, в которых указаны функции мигать, которые будут включены разделенными `,`. Полный список поддерживаемых строк функций можно найти в [RuntimeEnabledFeatures.json5][runtime-enabled-features] файле.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

В `String` , который является списком строк, в которых указаны функции мигать, которые будут отключены разделены `,`. Полный список поддерживаемых строк функций можно найти в [RuntimeEnabledFeatures.json5][runtime-enabled-features] файле.

## Методы

Тег `webview` имеет следующие методы:

**Примечание:** элемент веб-просмотр должен быть загружен перед использованием методов.

**Пример**

```javascript
const веб-просмотр - document.querySelector ('webview')
webview.addEventListener ('дом-готов', () -> -
  webview.openDevTools ()
)
```

### `<webview>.loadURL (url, опционы)`

* `url` URL
* `options` Object (опционально)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (опционально) - URL-адрес HTTP ссылки.
  * `userAgent` String (опционально) - user-agent, создающий запрос.
  * `extraHeaders` String (опционально) - Дополнительные заголовки, разделенные "\n"
  * `postData` ([UploadRawData)](structures/upload-raw-data.md) | [UploadFile)](structures/upload-file.md)) (по желанию)
  * `baseURLForDataURL` String (опционально) - Базовый Url (с разделителем пути), для файлов, которые будут загружены по Url данных. This is needed only if the specified `url` is a data url and needs to load other files.

Возвращает `Promise<void>` - Обещание разрешится, когда страница закончит загрузку (см. [`did-finish-load`](webview-tag.md#event-did-finish-load)), и отклоняет , если страница не загружается (см. [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Загружает `url` в веб-просмотре, `url` должен содержать приставку протокола, например, `http://` или `file://`.

### `<webview>.downloadURL (url)`

* `url` String

Инициирует загрузку ресурса на `url` навигации.

### `<webview>.getURL()`

Возвращает `String` - URL страницы гостя.

### `<webview>.getTitle()`

Возвращает `String` - Название гостевой страницы.

### `<webview>.isLoading()`

Возвращает `Boolean` - Будет ли гостевая страница по-прежнему загружать ресурсы.

### `<webview>.isLoadingMainFrame()`

Возвращает `Boolean` - является ли основной кадр (а не только iframes или кадры в нем) -прежнему загрузки.

### `<webview>.isWaitingForResponse()`

Возвращает `Boolean` - ждет ли гостевая страница первого ответа на основной ресурс страницы.

### `<webview>.stop()`

Остановка любой ожидаемой навигации.

### `<webview>.reload()`

Перезагрузка гостевой страницы.

### `<webview>.reloadIgnoringCache()`

Перезагружает страницу гостя и игнорирует кэш.

### `<webview>.canGoBack()`

Возвращает `Boolean` - может ли гостевая страница вернуться.

### `<webview>.canGoForward ()`

Возвращает `Boolean` - Может ли гостевая страница идти вперед.

### `<webview>.canGoToOffset (смещение)`

* `offset` Integer

Возвращает `Boolean` - Может ли гостевая страница перейти к `offset`.

### `<webview>.clearИстория()`

Очищает историю навигации.

### `<webview>.goBack()`

Делает гостевую страницу вернуться.

### `<webview>.goForward ()`

Делает страницу гостя идти вперед.

### `<webview>.goToIndex (индекс)`

* `index` Integer

Переходит к указанному абсолютному индексу.

### `<webview>.goToOffset (смещение)`

* `offset` Integer

Переходит к указанному смещению из "текущей записи".

### `<webview>.isCrashed()`

Возвращает `Boolean` - разбился ли процесс рендерера.

### `<webview>.setUserAgent (userAgent)`

* `userAgent` String

Переопределяет агента пользователя для гостевой страницы.

### `<webview>.getUserAgent()`

Возвращает `String` - Пользовательский агент для гостевой страницы.

### `<webview>.insertCSS (css)`

* `css` String

Возвращает `Promise<String>` - Обещание, которое разрешает с ключом для вставленного CSS, которые позже могут быть использованы для удаления CSS через `<webview>.removeInsertedCSS(key)`.

Вводит CSS на текущую веб-страницу и возвращает уникальный ключ для вставленного таблицы.

### `<webview>.removeInsertedCSS (ключ)`

* `key` String

Возвращает `Promise<void>` - Разрешает, если удаление было успешным.

Удаляет вставленный CSS с текущей веб-страницы. Таблица стилей идентифицируется ключом, который возвращается из `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript (код, userGesture)`

* `code` String
* `userGesture` Булан (по желанию) - По умолчанию `false`.

Возвращает `Promise<any>` - Обещание, которое разрешается с результатом выполненного кода или отвергается, если результатом кода является отклоненное обещание.

Вычисляет `code` на странице. Если `userGesture` установлен, это создаст контекст жестов на странице. HTML API, `requestFullScreen`, которые требуют действий пользователя, могут воспользоваться этой опцией для автоматизации.

### `<webview>.openDevTools()`

Открывает окно DevTools для гостевой страницы.

### `<webview>.closeDevTools()`

Закрывает окно DevTools гостевой страницы.

### `<webview>.isDevToolsOpened ()`

Возвращает `Boolean` - Имеет ли гостевая страница прикрепленное окно DevTools.

### `<webview>.isDevToolsFocused ()`

Возвращает `Boolean` - Ли DevTools окно гостевой страницы сосредоточена.

### `<webview>.inspectElement (x, y)`

* `x` Integer
* `y` Integer

Начинает проверку элемента на позиции (`x`, `y`) гостевой страницы.

### `<webview>.inspectSharedWorker()`

Открывает DevTools для общего контекста работника, присутствуют на гостевой странице.

### `<webview>.inspectServiceWorker()`

Открывает DevTools для контекста работника службы, присутствуют на гостевой странице.

### `<webview>.setAudioMuted (мутирован)`

* `muted` Boolean

Установите страницу гостя приглушенной.

### `<webview>.isAudioMuted()`

Возвращает `Boolean` - Была ли отключена гостевая страница.

### `<webview>.isCurrentlyAudible ()`

Возвращает `Boolean` - Ли аудио в настоящее время играет.

### `<webview>.undo()`

Выполняет `undo` на странице.

### `<webview>.redo()`

Выполняет `redo` на странице.

### `<webview>.cut()`

Выполняет `cut` на странице.

### `<webview>.copy()`

Выполняет `copy` на странице.

### `<webview>.paste()`

Выполняет `paste` на странице.

### `<webview>.pasteAndMatchStyle()`

Выполняет `pasteAndMatchStyle` на странице.

### `<webview>.delete ()`

Выполняет `delete` на странице.

### `<webview>.selectAll ()`

Выполняет `selectAll` на странице.

### `<webview>.unselect()`

Выполняет `unselect` на странице.

### `<webview>.replace (текст)`

* `text` String

Выполняет `replace` на странице.

### `<webview>.replaceMisspelling (текст)`

* `text` String

Выполняет `replaceMisspelling` на странице.

### `<webview>.insertText (текст)`

* `text` String

Возвращает `Promise<void>`

Вставляет `text` в элемент с фокусом.

### `<webview>.findInPage (текст, опции)`

* `text` Строка - Содержимое для поиска, не должно быть пустым.
* `options` Object (опционально)
  * `forward` Boolean (по желанию) - Следует ли искать вперед или назад, по умолчанию `true`.
  * `findNext` Boolean (по желанию) - Является ли операция первым запросом или последующей деятельности, по умолчанию `false`.
  * `matchCase` Boolean (по желанию) - Должен ли поиск быть деликатным, по умолчанию `false`.

Возвращает `Integer` - идентификатор запроса, используемый для запроса.

Начинается запрос на поиск всех совпадений для `text` на веб-странице. Результат запроса можно получить , подписавшись на [`found-in-page`](webview-tag.md#event-found-in-page) событие.

### `<webview>.stopFindInPage (действие)`

* `action` String - Определяет действие, которое происходит при [`<webview>.findInPage`](#webviewfindinpagetext-options) запроса.
  * `clearSelection` - Очистить выбор.
  * `keepSelection` - Перевести выбор в нормальный выбор.
  * `activateSelection` - Сосредоточьтесь и нажмите на узел выбора.

Прекращает `findInPage` запрос на `webview` с предоставленным `action`.

### `<webview>.print ([options])`

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
  * `pageRanges` Объект» (необязательно) - диапазон страниц для печати.
    * `from` - Индекс первой страницы для печати (0 на основе).
    * `to` - Индекс последней страницы для печати (включительно) (0 на основе).
  * `duplexMode` String (по желанию) - Установите дуплексный режим печатной веб-страницы. Может быть `simplex`, `shortEdge`, или `longEdge`.
  * `dpi` запись<string, number> (по желанию)
    * `horizontal` (по желанию) - Горизонтальный dpi.
    * `vertical` (необязательно) - Вертикальный dpi.
  * `header` String (по желанию) - Строка для печати в качестве заголовка страницы.
  * `footer` String (по желанию) - Строка, которая будет напечатана в качестве страницы footer.
  * `pageSize` струнные | Размер (необязательно) - Укажите размер страницы печатного документа. Может быть `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` или объект, содержащий `height`.

Возвращает `Promise<void>`

Печать `webview`'s веб-страницы. Так же, как `webContents.print([options])`.

### `<webview>.printToPDF (варианты)`

* `options` Object
  * `headerFooter` запись<string, string> (по желанию) - заголовок и лакея для PDF.
    * `title` String - Название заголовка PDF.
    * `url` String - URL для pdf footer.
  * `landscape` Boolean (по желанию) - `true` для пейзажа, `false` для портрета.
  * `marginsType` Integer (необязательно) - определяет тип маржи для использования. Использует 0 для по умолчанию, 1 без маржи и 2 для минимальной маржи. и `width` в микронах.
  * `scaleFactor` номер (необязательно) - коэффициент масштаба веб-страницы. Может варьироваться от 0 до 100.
  * `pageRanges` запись<string, number> (по желанию) - диапазон страниц для печати. На macOS почитается только первый ряд.
    * `from` - Индекс первой страницы для печати (0 на основе).
    * `to` - Индекс последней страницы для печати (включительно) (0 на основе).
  * `pageSize` струнные | Размер (необязательно) - Укажите размер страницы сгенерированного PDF. Может быть `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` или объект, содержащий `height`
  * `printBackground` Boolean (необязательно) - Следует ли печатать CSS фоны.
  * `printSelectionOnly` Boolean (необязательно) - Следует ли печатать только выбор.

Возвращает `Promise<Uint8Array>` - Разрешает с генерируемыми данными PDF.

Печать `webview`веб-страницы, как PDF, так же, как `webContents.printToPDF(options)`.

### `<webview>.capturePage ([rect])`

* `rect` [Rectangle](structures/rectangle.md) (по желанию) - область страницы, которая должна быть захвачена.

Возвращает `Promise<NativeImage>` - разрешается с [NativeImage](native-image.md)

Захватывает снимок страницы в границах `rect`. Пропустив `rect`, будет сделан захват всей видимой страницы.

### `<webview>.send (канал, ... аргс)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `Promise<void>`

Отправить асинхронное сообщение для процесса рендерера через `channel`, вы также можете произвольные аргументы. Процесс рендерера может обрабатывать сообщение, слушать `channel` с помощью [`ipcRenderer`](ipc-renderer.md) модуля.

Смотрите [webContents.send](web-contents.md#contentssendchannel-args) для примеров.

### `<webview>.sendInputEvent (событие)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [клавиатураInputEvent](structures/keyboard-input-event.md)

Возвращает `Promise<void>`

Отправляет входную `event` на страницу.

Подробнее [объекта можно усмотреть на сайте webContents.](web-contents.md#contentssendinputeventinputevent) `event` InputEvent.

### `<webview>.set'oomFactor (фактор)`

* `factor` Number - фактор увилечения.

Изменяет коэффициент масштабирования на указанный фактор. Коэффициент увеличения на 100, так что 300% и 3,0.

### `<webview>.set'oomLevel (уровень)`

* `level` Number - уровень увеличения.

Изменяет уровень масштаба на указанный уровень. Оригинальный размер 0 и каждое приращение выше или ниже представляет масштабирование 20% больше или меньше, по умолчанию ограничение на 300% и 50% от исходного размера, соответственно. Формула для этого `scale := 1.2 ^ level`.

> **ПРИМЕЧАНИЕ**: Политика масштабирования на уровне Chromium имеет одно и то же происхождение, что означает, что уровень масштабирования для определенного домена распространяется во всех экземплярах окон с одним и тем же доменом. Дифференциация URL-адресов окон позволит увеличить работу на окно.

### `<webview>.get'oomFactor()`

Возвращает `Number` - текущий коэффициент масштабирования.

### `<webview>.get'oomLevel()`

Возвращает `Number` - текущий уровень масштабирования.

### `<webview>.setVisual'oomLevelLimits (минимумУровень, максимальныйУровень)`

* `minimumLevel` Number
* `maximumLevel` Number

Возвращает `Promise<void>`

Устанавливает максимальный и минимальный уровень пинч-маштабирования.

### `<webview>.showDefinitionForSelection()` _macOS_

Показывает всплывающий словарь, который ищет выбранное слово на странице.

### `<webview>.getWebContentsId()`

Возвращает `Number` - WebContents ID этого `webview`.

## СОБЫТИЯ DOM

Следующие события DOM доступны для тега `webview` :

### Событие: 'нагрузка-коммит'

Возвращает:

* `url` String
* `isMainFrame` Boolean

Уволен, когда нагрузка совершила. Это включает навигацию в рамках текущего документа, а также нагрузки уровня подформера, но не включает асинхронные ресурсные нагрузки.

### Событие: 'did-finish-load'

Уволенный при навигации, т.е. спиннер вкладки остановится спиннинг, и `onload` событие будет отправлено.

### Событие: 'не-не-нагрузка'

Возвращает:

* `errorCode` Integer
* `errorDescription` Струна
* `validatedURL` Струна
* `isMainFrame` Boolean

Это событие, как `did-finish-load`, но выстрелил, когда нагрузка не удалось отменена, например. `window.stop()` вызывается.

### Событие: 'did-frame-finish-load'

Возвращает:

* `isMainFrame` Boolean

Работает, когда рама сделала навигацию.

### Событие: 'did-start-loading'

Соответствует точкам времени, когда спиннер вкладки начинает вращаться.

### Событие: 'did-stop-loading'

Соответствует точкам времени, когда спиннер вкладки перестает вращаться.

### Событие: 'dom-ready'

Устанавливается при загрузке документа в данном кадре.

### Событие: 'page-title-updated'

Возвращает:

* `title` String
* `explicitSet` Boolean

Высовыток, когда заголовок страницы устанавливается во время навигации. `explicitSet` является ложным, название синтезируется из URL-адреса файла.

### Событие: 'page-favicon-updated'

Возвращает:

* `favicons` String - Массив URL-адресов.

Уволенный, когда страница получает favicon URL-адреса.

### Событие: 'enter-html-full-screen'

Запущен, когда страница входит в полноэкранный экран, вызванный HTML API.

### Событие: 'leave-html-full-screen'

Уволенный, когда страница покидает полноэкранный экран, вызванный HTML API.

### Событие: 'консоль-сообщение'

Возвращает:

* `level` Integer - уровень журнала, от 0 до 3. Для того, чтобы он `verbose`, `info`, `warning` и `error`.
* `message` строка - фактическое сообщение консоли
* `line` Integer - Номер строки источника, который вызвал это сообщение консоли
* `sourceId` Струна

Выстрел, когда окно гостя регистрирует сообщение консоли.

Следующий пример кода направляет все сообщения журнала на консоль встраиваемого учета уровня журнала или других свойств.

```javascript
const веб-просмотр - document.querySelector ('webview')
webview.addEventListener ("консоль-сообщение", (е) -> - консоль
  .log ("Гостевая страница зарегистрировала сообщение:', e.message)
)
```

### Событие: 'certificate-error'

Возвращает:

* `result` объект
  * `requestId` Интегрер
  * `activeMatchOrdinal` Integer - Позиция активного матча.
  * `matches` Integer - Количество матчей.
  * `selectionArea` Rectangle - Координаты первого региона матча.
  * `finalUpdate` Булан

Уволен, когда результат доступен для [`webview.findInPage`](#webviewfindinpagetext-options) запроса.

```javascript
const веб-просмотр - document.querySelector ('webview')
webview.addEventListener ('найдено на странице', (e) -> -
  webview.stopFindInPage ('keepSelection')
q)

const requestId - webview.findInPage ('test')
консоли.log (запрос)
```

### Событие: 'new-window'

Возвращает:

* `url` String
* `frameName` String
* `disposition` - может быть `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` и `other`.
* `options` BrowserWindowConstructorOptions - Варианты, которые должны быть использованы для создания новых [`BrowserWindow`](browser-window.md).

Уволенный, когда гостевая страница пытается открыть новое окно браузера.

Следующий пример кода открывает новый URL в браузере системы по умолчанию.

```javascript
const { shell } требуют ('электрон')
const webview - document.querySelector ('webview')

webview.addEventListener ('новое окно', async (e) -> - протокол
  const (новый URL(e.url)).Протокол
  если (протокол No 'http:' || протокол 'https:') -
    ждут shell.openExternal (e.url)
  и
)
```

### Событие: 'will-navigate'

Возвращает:

* `url` String

Излучается, когда пользователь или страница хочет начать навигацию. Это может произойти `window.location` объекте или пользователь нажимает на ссылку на странице.

Это событие не будет излучать, когда навигация запущена программно с API, `<webview>.loadURL` и `<webview>.back`.

Он также не излучается во время на странице навигации, такие как нажатие якорных ссылок или обновление `window.location.hash`. Используйте `did-navigate-in-page` событие для этой цели.

Вызов `event.preventDefault()` не __может__ никакого эффекта.

### Событие: 'did-navigate'

Возвращает:

* `url` String

Испускаемый при навигации.

Это событие не излучается для навигации на страницах, таких как нажатие якорных ссылок или обновление `window.location.hash`. Используйте `did-navigate-in-page` событие для этой цели.

### Событие: 'сделал-навигация в странице'

Возвращает:

* `isMainFrame` Boolean
* `url` String

Испускаемый при навигации на странице.

При навигации на странице URL-адрес страницы изменяется, но не навигации за пределами страницы. Примерами этого являются случаи, когда якорные ссылки на кнопку или когда `hashchange` событие DOM.

### Событие: 'close'

Уволенный, когда гостевая страница пытается закрыться.

Следующий пример кода перемещается по `webview` `about:blank` когда гость пытается закрыться.

```javascript
const веб-просмотр - document.querySelector ('webview')
webview.addEventListener ('close', () -> -
  webview.src - 'о:blank'
)
```

### Событие: 'ipc-сообщение'

Возвращает:

* `channel` String (Строка)
* `args` любой из них.

Уволен, когда гостевая страница отправила асинхронное сообщение на страницу встраивания.

С `sendToHost` и `ipc-message` событием вы можете общаться страницей гостя и страницей встраивания:

```javascript
На странице встраиваемого встраивания.
const webview - document.querySelector ('webview')
webview.addEventListener ('ipc-message', (событие) -> -
  консоль.log (event.channel)
  // Печать "понг"
)
webview.send ('ping')
```

```javascript
На гостевой странице.
const { ipcRenderer } требуют ('электрон')
ipcRenderer.on ('ping', () -> -
  ipcRenderer.sendToHost ('pong')
)
```

### Событие: 'crashed'

Произведено при сверительной обработке.

### Событие: 'plugin-crashed'

Возвращает:

* `name` String
* `version` String

Уволен при сноме плагина.

### Событие: 'destroyed'

Уволен при уничтожении WebContents.

### Событие: 'media-started-playing'

Излучается, когда средства массовой информации начинают играть.

### Событие: 'media-paused'

Излучается, когда мультимедиа приостанавливается или делается воспроизведение.

### Событие: 'did-change-theme-color'

Возвращает:

* `themeColor` Струна

Излучается при изменении цвета темы страницы. Это, как правило, из-за встречи мета-тег:

```html
<meta name='theme-color' content='#ff0000'>
```

### Событие: 'update-target-url'

Возвращает:

* `url` String

Излучается, когда мышь перемещается по ссылке или клавиатура перемещает фокус на ссылку.

### Событие: 'devtools-opened'

Излучается при открытии DevTools.

### Событие: 'devtools-closed'

Излучается, когда DevTools закрыт.

### Событие: 'devtools-ориентированных'

Излучаемый, когда DevTools сосредоточен / открыт.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[chrome-webview]: https://developer.chrome.com/docs/extensions/reference/webviewTag/
