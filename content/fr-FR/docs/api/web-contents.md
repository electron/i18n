# webContents

> Contrôle et rendu des pages web.

Processus : [Main](../glossary.md#main-process)

`webContents` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Il est responsable du rendu et du contrôle d'une page web et est une propriété de l'objet [`BrowserWindow`](browser-window.md). Un exemple d'accès à l'objet `webContents` :

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## Méthodes

Ces méthodes sont accessibles depuis le module `webContents` :

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Retourne `WebContents[]` - Un tableau de toutes les instances de `WebContents`. Celui-ci contiendra le contenu web de toutes les fenêtres, webviews, devtools ouverts et pages devtools d'extention en arrière-plan.

### `webContents.getFocusedWebContents()`

Retourne `WebContents` - Le contenu web qui est au premier-plan dans cette application, autrement cela retourne `null`.

### `webContents.fromId(id)`

* `id` Integer

Retourne `WebContents` - Une instance WebContents avec l'ID donné.

## Classe : WebContents

> Affiche et contrôle le contenu d'une instance de BrowserWindow.

Processus : [Main](../glossary.md#main-process)

### Événements d’instance

#### Événement : 'did-finish-load'

Émis lorsque la navigation est fini, par exemple le loader de l'onglet a cessé de tourner, et l'événement `onload` a été émis.

#### Événement : 'did-fail-load'

Retourne :

* `event` Événement
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-finish-load` but emitted when the load failed. La liste complète des codes d'erreur et leur signification est disponible [ici](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Event: 'did-fail-provisional-load'

Retourne :

* `event` Événement
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-fail-load` but emitted when the load was cancelled (e.g. `window.stop()` was invoked).

#### Événement : 'did-frame-finish-load'

Retourne :

* `event` Événement
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when a frame has done navigation.

#### Événement : 'did-start-loading'

Corresponds to the points in time when the spinner of the tab started spinning.

#### Événement : 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stopped spinning.

#### Événement : 'dom-ready'

Retourne :

* `event` Événement

Emitted when the document in the given frame is loaded.

#### Événement : 'page-title-updated'

Retourne :

* `event` Événement
* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

#### Événement : 'page-favicon-updated'

Retourne :

* `event` Événement
* `favicons` String[] - Tableau d'URLs.

Emitted when page receives favicon urls.

#### Événement : 'new-window'

Retourne :

* `event` Événement
* `url` String
* `frameName` String
* `disposition` String - Peut être `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` et `other`.
* `options` BrowserWindowConstructorOptions - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - The non-standard features (features not handled by Chromium or Electron) given to `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

By default a new `BrowserWindow` will be created for the `url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. Par exemple :

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    win.loadURL(url) // existing webContents will be navigated automatically
  }
  event.newGuest = win
})
```

#### Événement : 'will-navigate'

Retourne :

* `event` Événement
* `url` String

Émis quand un utilisateur ou la page veut démarrer la navigation. Cela peut arriver quand l'objet `window.location` est modifié ou un utilisateur clique sur un lien dans la page.

This event will not emit when the navigation is started programmatically with APIs like `webContents.loadURL` and `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` will prevent the navigation.

#### Event: 'did-start-navigation'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInplace` will be `true` for in-page navigations.

#### Event: 'will-redirect'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation. For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

#### Event: 'did-redirect-navigation'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation. For example a 302 redirect.

This event can not be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### Événement : 'did-navigate'

Retourne :

* `event` Événement
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

Cet événement n'est également pas émis pour les navigations à l'intérieur de la page, comme cliquer sur les liens d'ancrage ou la mise à jour de `window.location.hash`. Utilisez l'événement `did-navigate-in-page` pour cet usage.

#### Event: 'did-frame-navigate'

Retourne :

* `event` Événement
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations,
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame navigation is done.

Cet événement n'est également pas émis pour les navigations à l'intérieur de la page, comme cliquer sur les liens d'ancrage ou la mise à jour de `window.location.hash`. Utilisez l'événement `did-navigate-in-page` pour cet usage.

#### Événement : 'did-navigate-in-page'

Retourne :

* `event` Événement
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

En cas de navigation dans la page, l'URL de la page change mais ne provoque pas de navigation à l'extérieur de la page. Par exemple, lorsque vous cliquez sur un lien d'ancrage ou lorsque l'événement DOM `hashchange` est déclenché.

#### Event: 'will-prevent-unload'

Retourne :

* `event` Événement

Emitted when a `beforeunload` event handler is attempting to cancel a page unload.

Calling `event.preventDefault()` will ignore the `beforeunload` event handler and allow the page to be unloaded.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBox(win, {
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Do you want to leave this site?',
    message: 'Changes you made may not be saved.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### Événement : 'crashed'

Retourne :

* `event` Événement
* `killed` Boolean

Emitted when the renderer process crashes or is killed.

#### Événement : 'unresponsive'

Émis lorsque la page web cesse de répondre.

#### Événement : 'responsive'

Émis lorsque la page web répond à nouveau.

#### Événement : 'plugin-crashed'

Retourne :

* `event` Événement
* `name` String
* `version` String

Emitted when a plugin process has crashed.

#### Événement : 'destroyed'

Emitted when `webContents` is destroyed.

#### Event: 'before-input-event'

Retourne :

* `event` Événement
* `input` Object - Input properties. 
  * `type` String - Either `keyUp` or `keyDown`.
  * `key` String - Equivalent to [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `code` String - Equivalent to [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `isAutoRepeat` Boolean - Equivalent to [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `shift` Boolean - Equivalent to [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `control` Boolean - Equivalent to [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `alt` Boolean - Equivalent to [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `meta` Boolean - Equivalent to [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Emitted before dispatching the `keydown` and `keyup` events in the page. Calling `event.preventDefault` will prevent the page `keydown`/`keyup` events and the menu shortcuts.

To only prevent the menu shortcuts, use [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // Par exemple, seulement activer les raccourcis lorsque
  // Ctrl/Cmd sont inexistant.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Événement : 'enter-html-full-screen'

Émis lorsque la fenêtre entre dans un état de plein écran déclenchée par l’API HTML.

#### Événement : 'leave-html-full-screen'

Émis lorsque la fenêtre revient d'un état de plein écran déclenchée par l’API HTML.

#### Event: 'zoom-changed'

Retourne :

* `event` Événement
* `zoomDirection` String - Can be `in` or `out`.

Emitted when the user is requesting to change the zoom level using the mouse wheel.

#### Événement : 'devtools-opened'

Émis lorsque la DevTools est ouverte.

#### Événement : 'devtools-closed'

Émis lorsque la DevTools est fermée.

#### Événement : 'devtools-focused'

Émis lorsque la DevTools est active / ouverte.

#### Événement 'certificate-error'

Retourne :

* `event` Événement
* `url` String
* `error` String - The error code.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - Indicates whether the certificate can be considered trusted.

Emitted when failed to verify the `certificate` for `url`.

The usage is the same with [the `certificate-error` event of `app`](app.md#event-certificate-error).

#### Événement : 'select-client-certificate'

Retourne :

* `event` Événement
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) - Must be a certificate from the given list.

Émis lorsqu'un certificat client est demandé.

The usage is the same with [the `select-client-certificate` event of `app`](app.md#event-select-client-certificate).

#### Événement : 'login'

Retourne :

* `event` Événement
* `request` Objet 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Objet 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Émis lorsque `webContents` veut faire une authentification normale.

The usage is the same with [the `login` event of `app`](app.md#event-login).

#### Événement : 'found-in-page'

Retourne :

* `event` Événement
* `result` Objet 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position du résultat actif.
  * `matches` Integer - Nombre de résultats.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Emitted when a result is available for [`webContents.findInPage`] request.

#### Événement : 'media-started-playing'

Émis lorsqu'un média se démarre.

#### Événement : 'media-paused'

Émis lorsque le média est suspendu ou terminé.

#### Événement : 'did-change-theme-color'

Retourne :

* `event` Événement
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Événement : 'update-target-url'

Retourne :

* `event` Event
* `url` String

Émis lorsque la souris passe sur un lien ou le clavier déplace le focus vers un lien.

#### Event: 'cursor-changed'

Retourne :

* `event` Événement
* `type` String
* `image` [NativeImage](native-image.md) (facultatif)
* `scale` Float (optional) - scaling factor for the custom cursor.
* `size` [Size](structures/size.md) (optional) - the size of the `image`.
* `hotspot` [Point](structures/point.md) (optional) - coordinates of the custom cursor's hotspot.

Emitted when the cursor's type changes. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Event: 'context-menu'

Retourne :

* `event` Événement
* `params` Objet 
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

#### Event: 'select-bluetooth-device'

Retourne :

* `event` Événement
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function 
  * `deviceId` String

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    let result = deviceList.find((device) => {
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

#### Event: 'paint'

Retourne :

* `event` Événement
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - The image data of the whole frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Event: 'devtools-reload-page'

Emitted when the devtools window instructs the webContents to reload

#### Event: 'will-attach-webview'

Retourne :

* `event` Événement
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will be appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Event: 'did-attach-webview'

Retourne :

* `event` Événement
* `webContents` WebContents - The guest web contents that is used by the `<webview>`.

Emitted when a `<webview>` has been attached to this web contents.

#### Événement : 'console-message'

Retourne :

* `event` Événement
* `level` Integer
* `message` Chaîne de caractères
* `line` Integer
* `sourceId` String

Emitted when the associated window logs a console message. Will not be emitted for windows with *offscreen rendering* enabled.

#### Event: 'preload-error'

Retourne :

* `event` Événement
* `preloadPath` String
* `error` Error

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### Événement : 'ipc-message'

Retourne :

* `event` Événement
* `channel` String
* `...args` any[]

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`.

#### Event: 'ipc-message-sync'

Retourne :

* `event` Événement
* `channel` String
* `...args` any[]

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`.

#### Event: 'desktop-capturer-get-sources'

Retourne :

* `event` Événement

Emitted when `desktopCapturer.getSources()` is called in the renderer process. Calling `event.preventDefault()` will make it return empty sources.

#### Événement : 'remote-require'

Retourne :

* `event` IpcMainEvent
* `module` String

Emitted when `remote.require()` is called in the renderer process. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Évènement : 'remote-get-global'

Retourne :

* `event` IpcMainEvent
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement : 'remote-get-builtin'

Retourne :

* `event` IpcMainEvent
* `module` String

Emitted when `remote.getBuiltin()` is called in the renderer process. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement : 'remote-get-current-window'

Retourne :

* `event` IpcMainEvent

Emitted when `remote.getCurrentWindow()` is called in the renderer process. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement : 'remote-get-current-web-contents'

Retourne :

* `event` IpcMainEvent

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement : 'remote-get-guest-web-contents'

Retourne :

* `event` IpcMainEvent
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Méthodes d’instance

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (facultatif) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (facultatif) 
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

Would require code like this

```js
win.loadFile('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `contents.getURL()`

Returns `String` - The URL of the current web page.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

Returns `String` - The title of the current web page.

#### `contents.isDestroyed()`

Returns `Boolean` - Whether the web page is destroyed.

#### `contents.focus()`

Focuses the web page.

#### `contents.isFocused()`

Returns `Boolean` - Whether the web page is focused.

#### `contents.isLoading()`

Returns `Boolean` - Whether web page is still loading resources.

#### `contents.isLoadingMainFrame()`

Retourne `Boolean` - Si la frame principale (et pas seulement un iframe ou frames qu'il contient) sont toujours en chargement.

#### `contents.isWaitingForResponse()`

Returns `Boolean` - Whether the web page is waiting for a first-response from the main resource of the page.

#### `contents.stop()`

Arrête toute navigation en attente.

#### `contents.reload()`

Reloads the current web page.

#### `contents.reloadIgnoringCache()`

Reloads current page and ignores cache.

#### `contents.canGoBack()`

Returns `Boolean` - Whether the browser can go back to previous web page.

#### `contents.canGoForward()`

Returns `Boolean` - Whether the browser can go forward to next web page.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### `contents.clearHistory()`

Clears the navigation history.

#### `contents.goBack()`

Makes the browser go back a web page.

#### `contents.goForward()`

Makes the browser go forward a web page.

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

#### `contents.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for this web page.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.getUserAgent()`

Returns `String` - The user agent for this web page.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (facultatif) 
  * `cssOrigin` String (optional) - Can be either 'user' or 'author'; Specifying 'user' enables you to prevent websites from overriding the CSS you insert. Default is 'author'.

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

```js
contents.on('did-finish-load', function () {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async function () {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (facultatif) - `false` par défaut.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Évalue le `code` dans la page.

Dans la fenêtre du navigateur, certaines APIs HTML comme `requestFullScreen` peut être invoqué seulement par un geste de l'utilisateur. Définir `userGesture` à `true` supprimera cette limitation.

Code execution will be suspended until web page stop loading.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `contents.setZoomFactor(factor)`

* `factor` Number - Facteur de zoom.

Change le facteur de zoom par le facteur spécifié. Le facteur de zoom est le pourcentage divisé par 100, donc 300% = 3.0.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.setZoomLevel(level)`

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement. The formula for this is `scale := 1.2 ^ level`.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Returns `Promise<void>`

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> ```js
contents.setVisualZoomLevelLimits(1, 3)
```

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Returns `Promise<void>`

Définit le maximum et minimum du niveau de zoom axée sur la mise en page (c'est-à-dire non visuels).

#### `contents.undo()`

Executes the editing command `undo` in web page.

#### `contents.redo()`

Executes the editing command `redo` in web page.

#### `contents.cut()`

Executes the editing command `cut` in web page.

#### `contents.copy()`

Executes the editing command `copy` in web page.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.

#### `contents.paste()`

Executes the editing command `paste` in web page.

#### `contents.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.

#### `contents.delete()`

Executes the editing command `delete` in web page.

#### `contents.selectAll()`

Executes the editing command `selectAll` in web page.

#### `contents.unselect()`

Executes the editing command `unselect` in web page.

#### `contents.replace(text)`

* `text` String

Executes the editing command `replace` in web page.

#### `contents.replaceMisspelling(text)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.

#### `contents.insertText(text)`

* `text` String

Returns `Promise<void>`

Insère le `text` à l'élément ciblé.

#### `contents.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` Object (facultatif) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request. 
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optionnel) - La zone de la page dont on doit réaliser la capture.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `contents.getPrinters()`

Get the system printer list.

Returns [`PrinterInfo[]`](structures/printer-info.md).

#### `contents.print([options], [callback])`

* `options` Object (facultatif) 
  * `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Default is `true`.
  * `margins` Object (facultatif) 
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Default is `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Record<string, number> (optional) - The page range to print. Should have two keys: `from` and `to`.
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Object (facultatif) 
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
* `callback` Function (facultatif) 
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Called back if the print fails; can be `cancelled` or `failed`.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Use `page-break-before: always;` CSS style to force to print to a new page.

Example usage:

```js
const options = { silent: true, deviceName: 'My-Printer' }
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` Objet 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Removes the specified path from DevTools workspace.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:

```html
<html>
<head>
  <style type="text/css">

    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools"></webview>
  <script>
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    browserView.addEventListener('dom-ready', () => {
      const browser = browserView.getWebContents()
      browser.setDevToolsWebContents(devtoolsView.getWebContents())
      browser.openDevTools()
    })
  </script>
</body>
</html>
```

An example of showing devtools in a `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `options` Object (facultatif) 
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. The default is `true`.

Opens the devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `contents.closeDevTools()`

Closes the devtools.

#### `contents.isDevToolsOpened()`

Returns `Boolean` - Whether the devtools is opened.

#### `contents.isDevToolsFocused()`

Returns `Boolean` - Whether the devtools view is focused .

#### `contents.toggleDevTools()`

Toggles the developer tools.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel, ...args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. Les arguments seront sérialisés en JSON en interne et par conséquent aucune fonction ou chaîne de prototype ne sera inclus.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// Dans le processus main.
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer
* `channel` String
* `...args` any[]

Send an asynchronous message to a specific frame in a renderer process via `channel`. Arguments will be serialized as JSON internally and as such no functions or prototype chains will be included.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value. E.g.

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Objet 
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`): 
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optional) - Defaults to `false`.
* `callback` Function 
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Objet 
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

Shows pop-up dictionary that searches the selected word on the page.

#### `contents.isOffscreen()`

Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.

#### `contents.startPainting()`

If *offscreen rendering* is enabled and not painting, start painting.

#### `contents.stopPainting()`

If *offscreen rendering* is enabled and painting, stop painting.

#### `contents.isPainting()`

Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.

#### `contents.setFrameRate(fps)`

* `fps` Integer

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

**[Déprécié ](modernization/property-updates.md)**

#### `contents.invalidate()`

Schedules a full repaint of the window this web contents is in.

If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy. 
  * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### `contents.getOSProcessId()`

Returns `Integer` - The operating system `pid` of the associated renderer process.

#### `contents.getProcessId()`

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.getType()`

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

### Propriétés d'instance

#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.

#### `contents.userAgent`

A `String` property that determines the user agent for this web page.

#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 60 are accepted.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` *Readonly*

A `Integer` representing the unique ID of this WebContents.

#### `contents.session` *Readonly*

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents` *Readonly*

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents` *Readonly*

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger` *Readonly*

A [`Debugger`](debugger.md) instance for this webContents.