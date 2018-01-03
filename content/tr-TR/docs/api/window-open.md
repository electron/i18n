# `window.open` Fonksiyonu

> Yeni bir pencere aç ve URL yükle.

Web sayfasında yeni bir pencere açmak için `window.open` çağırıldığında, `url` için yeni bir `BrowserWindow` örneği oluşturulur ve sayfanın üzerinde sınırlı kontrole sahip olması için proxy `window.open`'a döndürülür.

Proxy, geleneksel web sayfalarıyla uyumlu olması için uygulanan sınırlı standart işlevselliğe sahiptir. Yeni pencerenin tam kontrolü için doğrudan bir `BrowserWindow` oluşturmanız gerekmektedir.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### `window.open(url[, frameName][, features])`

* `url` Dize
* `frameName` String (optional)
* `features` String (optional)

Returns [`BrowserWindowProxy`](browser-window-proxy.md) - Creates a new window and returns an instance of `BrowserWindowProxy` class.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options.

**Notes:**

* Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
* Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
* JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
* Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContent`'s `new-window` event handler in the `additionalFeatures` argument.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Using Chrome's `window.open()` implementation

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Yerel `window.open()`, açılan pencerelere eşzamanlı erişime izin verir; Bir iletişim kutusu veya tercihler penceresi açmanız gerekiyorsa uygun bir seçim.

Bu seçenek aynı zamanda `<webview>` etiketlerinde de ayarlanabilir:

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