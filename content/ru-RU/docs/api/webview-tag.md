# Тег `<webview>`

## Warning

Electron's `webview` tag is based on [Chromium's `webview`][chrome-webview], which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5.  You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## Обзор

> Display external web content in an isolated frame and process.

Процесс: [Графический](../glossary.md#renderer-process)

Use the `webview` tag to embed 'guest' content (such as web pages) in your Electron app. The guest content is contained within the `webview` container. An embedded page within your app controls how the guest content is laid out and rendered.

Unlike an `iframe`, the `webview` runs in a separate process than your app. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content. **Note:** Most methods called on the webview from the host page require a synchronous call to the main process.

## Пример

To embed a web page in your app, add the `webview` tag to your app's embedder page (this is the app page that will display the guest content). In its simplest form, the `webview` tag includes the `src` of the web page and css styles that control the appearance of the `webview` container:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

If you want to control the guest content in any way, you can write JavaScript that listens for `webview` events and responds to those events using the `webview` methods. Here's sample code with two event listeners: one that listens for the web page to start loading, the other for the web page to stop loading, and displays a "loading..." message during the load time:

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## Internal implementation

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard, mouse, and scroll event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## CSS Styling Notes

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Tag Attributes

The `webview` tag has the following attributes:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

A `String` representing the visible URL. Writing to this attribute initiates top-level navigation.

Assigning `src` its own value will reload the current page.

The `src` attribute can also accept data URLs, such as `data:text/plain,Hello, world!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

А `Boolean`. When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources. Node integration is disabled by default in the guest page.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. This option is disabled by default in the guest page.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

А `Boolean`. When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is unavailable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

А `Boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `предварительная загрузка`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

**Note:** This option will appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

А `Boolean`. When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. если нет `persist:` префикса, страница будет использовать сеанс в памяти. При присваивании одинаковой `partition`, разные страницы могут иметь одинаковую сессию. If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

А `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

## Методы

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**Пример**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL (url, опционы)`

* `url` URL
* `options` Object (опционально)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (опционально) - URL-адрес HTTP ссылки.
  * `userAgent` String (опционально) - user-agent, создающий запрос.
  * `extraHeaders` String (опционально) - Дополнительные заголовки, разделенные "\n"
  * `postData` ([UploadRawData)](structures/upload-raw-data.md) | [UploadFile)](structures/upload-file.md)) (по желанию)
  * `baseURLForDataURL` String (опционально) - Базовый Url (с разделителем пути), для файлов, которые будут загружены по Url данных. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` String

Инициирует загрузку ресурса на `url` навигации.

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isLoadingMainFrame()`

Возвращает `Boolean` - является ли основной кадр (а не только iframes или кадры в нем) -прежнему загрузки.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

Остановка любой ожидаемой навигации.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Очищает историю навигации.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

* `index` Integer

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Переходит к указанному смещению из "текущей записи".

### `<webview>.isCrashed()`

Возвращает `Boolean` - разбился ли процесс рендерера.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` String

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Вводит CSS на текущую веб-страницу и возвращает уникальный ключ для вставленного таблицы.

### `<webview>.removeInsertedCSS(key)`

* `key` String

Возвращает `Promise<void>` - Разрешает, если удаление было успешным.

Удаляет вставленный CSS с текущей веб-страницы. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

Возвращает `Promise<any>` - Обещание, которое разрешается с результатом выполненного кода или отвергается, если результатом кода является отклоненное обещание.

Вычисляет `code` на странице. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### `<webview>.openDevTools()`

Opens a DevTools window for guest page.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

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
