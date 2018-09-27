# `window.open` Fonksiyon

> Yeni bir pencere aç ve URL yükle.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

Proxy, geleneksel web sayfalarıyla uyumlu olması için uygulanan sınırlı standart işlevselliğe sahiptir. Yeni pencerenin tam kontrolü için doğrudan bir `BrowserWindow` oluşturmanız gerekmektedir.

Yeni oluşturulan `BrowserWindow`, varsayılan olarak ana pencerenin seçeneklerini miras alır. Miras alınan seçeneklerin üstüne yazmak için `features` karakter dizisini kullanabilirsiniz.

### `window.open(url[, frameName][, features])`

* `url` Dize
* `frameName` String (opsiyonel)
* `features` String (opsiyonel)

[`BrowserWindowProxy`](browser-window-proxy.md) Döndürür - Yeni bir pencere oluşturur ve `BrowserWindowProxy` sınıfının bir örneğini döndürür.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Örneğin:

```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* Ana pencerede devre dışı bırakılmış ise, açılan `window`'de Node entegrasyonu devre dışı bırakılacaktır.
* Eğer Ortam izolasyonu, ana pencerede etkinleştirilmiş ise, açılan `window`'da daima etkinleştirilir.
* Eğer JavaScript, ana pencerede devre dışı bırakılmış ise, açılan `window`'da daima devre dışı bırakılır.
* `features`'ta verilen standart olmayan özellikler (Chromium veya Electron tarafından ele alınmaz) `additionalFeatures` argümanı içindeki kayıtlı `webContent`'in `new-windows` olay işleyicisine geçirilir.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Chrome' un `window.open()` uygulaması kullanılarak

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

This option can also be set on `<webview>` tags as well:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

```javascript
// main process
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // open window as modal
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      parent: mainWindow,
      width: 100,
      height: 100
    })
    event.newGuest = new BrowserWindow(options)
  }
})
```

```javascript
// renderer process (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```