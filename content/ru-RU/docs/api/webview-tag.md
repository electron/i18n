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

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

Возвращает `Boolean` - Ли аудио в настоящее время играет.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.unselect()`

Executes editing command `unselect` in page.

### `<webview>.replace(text)`

* `text` String

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `text` String

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `text` String

Возвращает `Promise<void>`

Вставляет `text` в элемент с фокусом.

### `<webview>.findInPage(text[, options])`

* `text` Строка - Содержимое для поиска, не должно быть пустым.
* `options` Object (опционально)
  * `forward` Boolean (по желанию) - Следует ли искать вперед или назад, по умолчанию `true`.
  * `findNext` Boolean (по желанию) - Является ли операция первым запросом или последующей деятельности, по умолчанию `false`.
  * `matchCase` Boolean (по желанию) - Должен ли поиск быть деликатным, по умолчанию `false`.

Возвращает `Integer` - идентификатор запроса, используемый для запроса.

Начинается запрос на поиск всех совпадений для `text` на веб-странице. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
  * `clearSelection` - Очистить выбор.
  * `keepSelection` - Перевести выбор в нормальный выбор.
  * `activateSelection` - Сосредоточьтесь и нажмите на узел выбора.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

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
  * `pageRanges` Object[] (optional) - The page range to print.
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

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `options` Object
  * `headerFooter` запись<string, string> (по желанию) - заголовок и лакея для PDF.
    * `title` String - Название заголовка PDF.
    * `url` String - URL для pdf footer.
  * `landscape` Boolean (по желанию) - `true` для пейзажа, `false` для портрета.
  * `marginsType` Integer (необязательно) - определяет тип маржи для использования. Использует 0 для по умолчанию, 1 без маржи и 2 для минимальной маржи. and `width` in microns.
  * `scaleFactor` номер (необязательно) - коэффициент масштаба веб-страницы. Может варьироваться от 0 до 100.
  * `pageRanges` запись<string, number> (по желанию) - диапазон страниц для печати. On macOS, only the first range is honored.
    * `from` - Индекс первой страницы для печати (0 на основе).
    * `to` - Индекс последней страницы для печати (включительно) (0 на основе).
  * `pageSize` струнные | Размер (необязательно) - Укажите размер страницы сгенерированного PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`
  * `printBackground` Boolean (необязательно) - Следует ли печатать CSS фоны.
  * `printSelectionOnly` Boolean (необязательно) - Следует ли печатать только выбор.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (по желанию) - область страницы, которая должна быть захвачена.

Возвращает `Promise<NativeImage>` - разрешается с [NativeImage](native-image.md)

Захватывает снимок страницы в границах `rect`. Пропустив `rect`, будет сделан захват всей видимой страницы.

### `<webview>.send(channel, ...args)`

* `channel` String (Строка)
* `...args` any[]

Возвращает `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Возвращает `Promise<void>`

Отправляет входную `event` на страницу.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - фактор увилечения.

Изменяет коэффициент масштабирования на указанный фактор. Коэффициент увеличения на 100, так что 300% и 3,0.

### `<webview>.setZoomLevel(level)`

* `level` Number - уровень увеличения.

Изменяет уровень масштаба на указанный уровень. Оригинальный размер 0 и каждое приращение выше или ниже представляет масштабирование 20% больше или меньше, по умолчанию ограничение на 300% и 50% от исходного размера, соответственно. Формула для этого `scale := 1.2 ^ level`.

> **ПРИМЕЧАНИЕ**: Политика масштабирования на уровне Chromium имеет одно и то же происхождение, что означает, что уровень масштабирования для определенного домена распространяется во всех экземплярах окон с одним и тем же доменом. Дифференциация URL-адресов окон позволит увеличить работу на окно.

### `<webview>.getZoomFactor()`

Возвращает `Number` - текущий коэффициент масштабирования.

### `<webview>.getZoomLevel()`

Возвращает `Number` - текущий уровень масштабирования.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Возвращает `Promise<void>`

Устанавливает максимальный и минимальный уровень пинч-маштабирования.

### `<webview>.showDefinitionForSelection()` _macOS_

Показывает всплывающий словарь, который ищет выбранное слово на странице.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Возвращает:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Event: 'did-fail-load'

Возвращает:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Event: 'did-frame-finish-load'

Возвращает:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Событие: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Событие: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Событие: 'dom-ready'

Fired when document in the given frame is loaded.

### Событие: 'page-title-updated'

Возвращает:

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Событие: 'page-favicon-updated'

Возвращает:

* `favicons` String[] - Array of URLs.

Fired when page receives favicon urls.

### Событие: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Событие: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Событие: 'консоль-сообщение'

Возвращает:

* `level` Integer - The log level, from 0 to 3. Для того, чтобы он `verbose`, `info`, `warning` и `error`.
* `message` строка - фактическое сообщение консоли
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` Струна

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Событие: 'certificate-error'

Возвращает:

* `result` Object
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position of the active match.
  * `matches` Integer - Number of Matches.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Событие: 'new-window'

Возвращает:

* `url` String
* `frameName` String
* `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = (new URL(e.url)).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### Событие: 'will-navigate'

Возвращает:

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does __NOT__ have any effect.

### Событие: 'did-navigate'

Возвращает:

* `url` String

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### Event: 'did-navigate-in-page'

Возвращает:

* `isMainFrame` Boolean
* `url` String

Emitted when an in-page navigation happened.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

### Событие: 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Событие: 'ipc-сообщение'

Возвращает:

* `channel` String (Строка)
* `args` any[]

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```javascript
// In guest page.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Событие: 'crashed'

Fired when the renderer process is crashed.

### Событие: 'plugin-crashed'

Возвращает:

* `name` String
* `version` String

Fired when a plugin process is crashed.

### Событие: 'destroyed'

Fired when the WebContents is destroyed.

### Событие: 'media-started-playing'

Emitted when media starts playing.

### Событие: 'media-paused'

Emitted when media is paused or done playing.

### Событие: 'did-change-theme-color'

Возвращает:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Событие: 'update-target-url'

Возвращает:

* `url` String

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

### Событие: 'devtools-opened'

Emitted when DevTools is opened.

### Событие: 'devtools-closed'

Emitted when DevTools is closed.

### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[chrome-webview]: https://developer.chrome.com/docs/extensions/reference/webviewTag/
