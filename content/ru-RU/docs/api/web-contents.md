# webContents

> Render and control web pages.

Процесс: [Основной](../glossary.md#main-process)

`webContents` is an [EventEmitter][event-emitter]. Он ответственен за рендер и управление веб-страницы и является свойством объекта [`BrowserWindow`](browser-window.md). Пример доступа к объекту `webContents`:

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

### `webContents.fromId(id)`

* `id` Integer

Returns `WebContents` | undefined - A WebContents instance with the given ID, or `undefined` if there is no WebContents associated with the given ID.

## Класс: WebContents

> Рендерит и управляет контент экземпляра BrowserWindow.

Процесс: [Основной](../glossary.md#main-process)

### События экземпляра

#### Event: 'did-finish-load'

Emitted when the navigation is done, i.e. the spinner of the tab has stopped spinning, and the `onload` event was dispatched.

#### Event: 'did-fail-load'

Возвращает:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-finish-load` but emitted when the load failed. The full list of error codes and their meaning is available [here](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

#### Event: 'did-fail-provisional-load'

Возвращает:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-fail-load` but emitted when the load was cancelled (e.g. `window.stop()` was invoked).

#### Event: 'did-frame-finish-load'

Возвращает:

* `event` Event
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when a frame has done navigation.

#### Событие: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab started spinning.

#### Событие: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stopped spinning.

#### Событие: 'dom-ready'

Возвращает:

* `event` Event

Emitted when the document in the given frame is loaded.

#### Событие: 'page-title-updated'

Возвращает:

* `event` Event
* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

#### Событие: 'page-favicon-updated'

Возвращает:

* `event` Event
* `favicons` String[] - Array of URLs.

Emitted when page receives favicon urls.

#### Event: 'new-window' _Deprecated_

Возвращает:

* `event` NewWindowWebContentsEvent
* `url` String
* `frameName` String
* `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` BrowserWindowConstructorOptions - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - The non-standard features (features not handled by Chromium or Electron) given to `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.
* `postBody` [PostBody](structures/post-body.md) (optional) - The post data that will be sent to the new window, along with the appropriate headers that will be set. If no post data is to be sent, the value will be `null`. Only defined when the window is being created by a form that set `target=_blank`.

Deprecated in favor of [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

By default a new `BrowserWindow` will be created for the `url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. Например:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    const loadOptions = {
      httpReferrer: referrer
    }
    if (postBody != null) {
      const { data, contentType, boundary } = postBody
      loadOptions.postData = postBody.data
      loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`
    }

    win.loadURL(url, loadOptions) // existing webContents will be navigated automatically
  }
  event.newGuest = win
})
```

#### Event: 'did-create-window'

Возвращает:
* `window` BrowserWindow
* `details` объект
    * `url` String - URL for the created window.
    * `frameName` String - Name given to the created window in the `window.open()` call.
    * `options` BrowserWindowConstructorOptions - The options used to create the BrowserWindow. They are merged in increasing precedence: options inherited from the parent, parsed options from the `features` string from `window.open()`, and options given by [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Unrecognized options are not filtered out.
    * `additionalFeatures` String[] - The non-standard features (features not handled Chromium or Electron) _Deprecated_
    * `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.
    * `postBody` [PostBody](structures/post-body.md) (optional) - The post data that will be sent to the new window, along with the appropriate headers that will be set. If no post data is to be sent, the value will be `null`. Only defined when the window is being created by a form that set `target=_blank`.
    * `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.

Emitted _after_ successful creation of a window via `window.open` in the renderer. Not emitted if the creation of the window is canceled from [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

See [`window.open()`](window-open.md) for more details and how to use this in conjunction with `webContents.setWindowOpenHandler`.

#### Событие: 'will-navigate'

Возвращает:

* `event` Event
* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `webContents.loadURL` and `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` will prevent the navigation.

#### Event: 'did-start-navigation'

Возвращает:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInPlace` will be `true` for in-page navigations.

#### Event: 'will-redirect'

Возвращает:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation.  For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

#### Event: 'did-redirect-navigation'

Возвращает:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation.  For example a 302 redirect.

Это событие не может быть предотвращено, если вы хотите предотвратить перенаправления, то должны проверить событие`will-redirect` выше.

#### Событие: 'did-navigate'

Возвращает:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-frame-navigate'

Возвращает:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations,
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-navigate-in-page'

Возвращает:

* `event` Event
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

#### Событие: 'will-prevent-unload'

Возвращает:

* `event` Event

Emitted when a `beforeunload` event handler is attempting to cancel a page unload.

Calling `event.preventDefault()` will ignore the `beforeunload` event handler and allow the page to be unloaded.

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

#### Event: 'crashed' _Deprecated_

Возвращает:

* `event` Event
* `killed` Boolean

Emitted when the renderer process crashes or is killed.

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

Emitted when a plugin process has crashed.

#### Событие: 'destroyed'

Emitted when `webContents` is destroyed.

#### Событие: 'before-input-event'

Возвращает:

* `event` Event
* `input` Object - Input properties.
  * `type` String - Either `keyUp` or `keyDown`.
  * `key` String - Equivalent to [KeyboardEvent.key][keyboardevent].
  * `code` String - Equivalent to [KeyboardEvent.code][keyboardevent].
  * `isAutoRepeat` Boolean - Equivalent to [KeyboardEvent.repeat][keyboardevent].
  * `isComposing` Boolean - Equivalent to [KeyboardEvent.isComposing][keyboardevent].
  * `shift` Boolean - Equivalent to [KeyboardEvent.shiftKey][keyboardevent].
  * `control` Boolean - Equivalent to [KeyboardEvent.controlKey][keyboardevent].
  * `alt` Boolean - Equivalent to [KeyboardEvent.altKey][keyboardevent].
  * `meta` Boolean - Equivalent to [KeyboardEvent.metaKey][keyboardevent].

Emitted before dispatching the `keydown` and `keyup` events in the page. Calling `event.preventDefault` will prevent the page `keydown`/`keyup` events and the menu shortcuts.

To only prevent the menu shortcuts, use [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore):

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // Например, включать сочетания клавиш меню приложения
  // Только когда Ctrl/Cmd нажаты.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Событие: 'enter-html-full-screen'

Происходит, когда окно входит в полноэкранный режим с помощью HTML API.

#### Событие: 'leave-html-full-screen'

Происходит, когда окно выходит из полноэкранного режима с помощью HTML API.

#### Event: 'zoom-changed'

Возвращает:

* `event` Event
* `zoomDirection` String - Can be `in` or `out`.

Emitted when the user is requesting to change the zoom level using the mouse wheel.

#### Событие: 'devtools-opened'

Emitted when DevTools is opened.

#### Событие: 'devtools-closed'

Emitted when DevTools is closed.

#### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.

#### Событие: 'certificate-error'

Возвращает:

* `event` Event
* `url` String
* `error` String - код ошибки.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Indicates whether the certificate can be considered trusted.

Emitted when failed to verify the `certificate` for `url`.

The usage is the same with [the `certificate-error` event of `app`](app.md#event-certificate-error).

#### Событие: 'select-client-certificate'

Возвращает:

* `event` Event
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificate](structures/certificate.md) - Must be a certificate from the given list.

Происходит, когда запрошен сертификат клиента.

The usage is the same with [the `select-client-certificate` event of `app`](app.md#event-select-client-certificate).

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

The usage is the same with [the `login` event of `app`](app.md#event-login).

#### Событие: 'certificate-error'

Возвращает:

* `event` Event
* `result` Object
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position of the active match.
  * `matches` Integer - Number of Matches.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Emitted when a result is available for [`webContents.findInPage`] request.

#### Событие: 'media-started-playing'

Emitted when media starts playing.

#### Событие: 'media-paused'

Emitted when media is paused or done playing.

#### Событие: 'did-change-theme-color'

Возвращает:

* `event` Event
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Событие: 'update-target-url'

Возвращает:

* `event` Event
* `url` String

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

#### Событие: 'cursor-changed'

Возвращает:

* `event` Event
* `type` String
* `image` [NativeImage](native-image.md) (опционально)
* `scale` Float (optional) - scaling factor for the custom cursor.
* `size` [Size](structures/size.md) (optional) - the size of the `image`.
* `hotspot` [Point](structures/point.md) (optional) - coordinates of the custom cursor's hotspot.

Emitted when the cursor's type changes. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Событие: 'context-menu'

Возвращает:

* `event` Event
* `params` Object
  * `x` Integer - x coordinate.
  * `y` Integer - y coordinate.
  * `linkURL` String - URL of the link that encloses the node the context menu was invoked on.
  * `linkText` String - Text associated with the link. May be an empty string if the contents of the link are an image.
  * `pageURL` String - URL of the top level page that the context menu was invoked on.
  * `frameURL` String - URL of the subframe that the context menu was invoked on.
  * `srcURL` String - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
  * `mediaType` String - Type of the node the context menu was invoked on. Can be `none`, `image`, `audio`, `video`, `canvas`, `file` or `plugin`.
  * `hasImageContents` Boolean - Whether the context menu was invoked on an image which has non-empty contents.
  * `isEditable` Boolean - Whether the context is editable.
  * `selectionText` String - Text of the selection that the context menu was invoked on.
  * `titleText` String - Title or alt text of the selection that the context was invoked on.
  * `misspelledWord` String - The misspelled word under the cursor, if any.
  * `dictionarySuggestions` String[] - An array of suggested words to show the user to replace the `misspelledWord`.  Only available if there is a misspelled word and spellchecker is enabled.
  * `frameCharset` String - The character encoding of the frame on which the menu was invoked.
  * `inputFieldType` String - If the context menu was invoked on an input field, the type of that field. Possible values are `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on.
    * `inError` Boolean - Whether the media element has crashed.
    * `isPaused` Boolean - Whether the media element is paused.
    * `isMuted` Boolean - Whether the media element is muted.
    * `hasAudio` Boolean - Whether the media element has audio.
    * `isLooping` Boolean - Whether the media element is looping.
    * `isControlsVisible` Boolean - Whether the media element's controls are visible.
    * `canToggleControls` Boolean - Whether the media element's controls are toggleable.
    * `canRotate` Boolean - Whether the media element can be rotated.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
    * `canUndo` Boolean - Whether the renderer believes it can undo.
    * `canRedo` Boolean - Whether the renderer believes it can redo.
    * `canCut` Boolean - Whether the renderer believes it can cut.
    * `canCopy` Boolean - Whether the renderer believes it can copy
    * `canPaste` Boolean - Whether the renderer believes it can paste.
    * `canDelete` Boolean - Whether the renderer believes it can delete.
    * `canSelectAll` Boolean - Whether the renderer believes it can select all.

Emitted when there is a new context menu that needs to be handled.

#### Событие: 'select-bluetooth-device'

Возвращает:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    const result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Событие: 'paint'

Возвращает:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - The image data of the whole frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Событие: 'devtools-reload-page'

Emitted when the devtools window instructs the webContents to reload

#### Событие: 'will-attach-webview'

Возвращает:

* `event` Event
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Event: 'did-attach-webview'

Возвращает:

* `event` Event
* `webContents` WebContents - The guest web contents that is used by the `<webview>`.

Emitted when a `<webview>` has been attached to this web contents.

#### Событие: 'консоль-сообщение'

Возвращает:

* `event` Event
* `level` Integer - The log level, from 0 to 3. Для того, чтобы он `verbose`, `info`, `warning` и `error`.
* `message` строка - фактическое сообщение консоли
* `line` Integer - The line number of the source that triggered this console message
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
