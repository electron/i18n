# 从渲染进程打开窗口

There are several ways to control how windows are created from trusted or untrusted content within a renderer. 可以通过两种方式从渲染进程创建窗口：

* clicking on links or submitting forms adorned with `target=_blank`
* JavaScript calling `window.open()`

In non-sandboxed renderers, or when `nativeWindowOpen` is false (the default), this results in the creation of a [`BrowserWindowProxy`](browser-window-proxy.md), a light wrapper around `BrowserWindow`.

However, when the `sandbox` (or directly, `nativeWindowOpen`) option is set, a `Window` instance is created, as you'd expect in the browser. For same-origin content, the new window is created within the same process, enabling the parent to access the child window directly. This can be very useful for app sub-windows that act as preference panels, or similar, as the parent can render to the sub-window directly, as if it were a `div` in the parent.

Electron pairs this native Chrome `Window` with a BrowserWindow under the hood. You can take advantage of all the customization available when creating a BrowserWindow in the main process by using `webContents.setWindowOpenHandler()` for renderer-created windows.

BrowserWindow constructor options are set by, in increasing precedence order: options inherited from the parent, parsed options from the `features` string from `window.open()`, security-related webPreferences inherited from the parent, and options given by [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Note that `webContents.setWindowOpenHandler` has final say and full privilege because it is invoked in the main process.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String（可选）
* `features` String（可选）

Returns [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` is a comma-separated key-value list, following the standard format of the browser. Electron will parse `BrowserWindowConstructorOptions` out of this list where possible, for convenience. For full control and better ergonomics, consider using `webContents.setWindowOpenHandler` to customize the BrowserWindow creation.

A subset of `WebPreferences` can be set directly, unnested, from the features string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, and `webviewTag`.

例如：

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**说明：**

* 如果在父窗口中禁用了 Node integration, 则在打开的 `window ` 中将始终被禁用。
* 如果在父窗口中启用了上下文隔离, 则在打开的 ` window ` 中将始终被启用。
* 父窗口禁用 Javascript，打开的 `window` 中将被始终禁用
* Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContents`'s `did-create-window` event handler in the `additionalFeatures` argument.

To customize or cancel the creation of the window, you can optionally set an override handler with `webContents.setWindowOpenHandler()` from the main process. Returning `false` cancels the window, while returning an object sets the `BrowserWindowConstructorOptions` used when creating the window. Note that this is more powerful than passing options through the feature string, as the renderer has more limited privileges in deciding security preferences than the main process.

### `BrowserWindowProxy` example

```javascript

// main.js
const mainWindow = new BrowserWindow()

mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url.startsWith('https://github.com/')) {
    return { action: 'allow' }
  }
  return { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // For example...
  childWindow.webContents('will-navigate', (e) => {
    e.preventDefault()
  })
})
```

```javascript
// renderer.js
const windowProxy = window.open('https://github.com/', null, 'minimizable=false')
windowProxy.postMessage('hi', '*')
```

### Native `Window` example

```javascript
// main.js
const mainWindow = new BrowserWindow({
  webPreferences: {
    nativeWindowOpen: true
  }
})

// In this example, only windows with the `about:blank` url will be created.
// All other urls will be blocked.
mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url === 'about:blank') {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: false,
        fullscreenable: false,
        backgroundColor: 'black',
        webPreferences: {
          preload: 'my-child-window-preload-script.js'
        }
      }
    }
  }
  return { action: 'deny' }
})
```

```javascript
// renderer process (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```
