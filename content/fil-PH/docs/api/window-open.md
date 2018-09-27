# ` bintana. buksan ` Tungkulin

> Magbukas ng bagong window at mag-load ng isang URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

Ang proxy ay may limitadong pamantayan na pag-andar na ipinatupad para katugma sa tradisyonal ng mga web page. Para sa ganap na kontrol sa bagong window dapat kang lumikha ng `BrowserWindow ` direkta.

Ang bagong nilikhang `BrowserWindow` ay magmamana ng mga opsyon sa bintana ng magulang sa pamamagitan ng default. Upang i-override ang mga pagpipilian na minana maaari mong itakda ang mga ito sa `mga tampok` string.

### `window.buksan(url [, frameName] [,mga tampok])`

* `url` String
* `frameName` Tali (opsyonal)
* `Mga tampok` Tali (opsyonal)

Babalik ang [`BrowserWindowProxy`](browser-window-proxy.md) - Upang lumilikha ng isang bagong window at babalik ang isang halimbawa ng klase ng `BrowserWindowProxy`.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Halimbawa:

```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* Ang pagsasama ng node ay laging hindi pagaganahin sa binuksang `window` kung ito ay hindi napagana sa bintana ng magulang.
* Ang paghihiwalay ng konteksto ay palaging bukas at gagana sa `bintana` kung ito ay napagana sa bintana ng magulang.
* Ang javaScript ay laging hindi gagana kung bubuksan sa `bintana` kung ito ay hindi gumagana sa bintana ng magulang.
* Hindi karaniwang mga tampok (na hindi hinahawakan ng Kromo o Elektron) na ibinigay sa `mga tampok` ay ipapasa sa anumang nakarehistro sa `webContent`'s ` bagong-window ` kaganapang handler sa ` karagdagang mga tampok ` na argumento.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Paggamit ng Chrome's `window.buksan()` ng pagpapatupad

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