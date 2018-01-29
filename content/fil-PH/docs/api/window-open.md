# `window.Buksan` Fuction

> Magbukas ng bagong window at mag-load ng isang URL.

Kapag ang `window.binuksan` ay tinatawag para sa bagong window na likha sa isang web page, isang bagong pagkakataon ng ` BrowserWindow ` ay malilikha para sa `url` at ibabalik ang isang proxy sa ` window.buksan` upang hayaan ang pahina na magkaroon ng limitadong kontrol sa mga ito.

Ang proxy ay may limitadong pamantayan na pag-andar na ipinatupad para katugma sa tradisyonal ng mga web page. Para sa ganap na kontrol sa bagong window dapat kang lumikha ng `BrowserWindow ` direkta.

Ang bagong nilikhang `BrowserWindow` ay magmamana ng mga opsyon sa bintana ng magulang sa pamamagitan ng default. Upang i-override ang mga pagpipilian na minana maaari mong itakda ang mga ito sa `mga tampok` string.

### `window.buksan(url [, frameName] [,mga tampok])`

* `url` Tali
* `frameName` Tali (opsyonal)
* `Mga tampok` Tali (opsyonal)

Babalik ang [`BrowserWindowProxy`](browser-window-proxy.md) - Upang lumilikha ng isang bagong window at babalik ang isang halimbawa ng klase ng `BrowserWindowProxy`.

Ang`Mga tampok`ng string ay sumusunod sa format ng karaniwang browser, ngunit ang bawat tampok ay kailangang maging isang larangan ng `BrowserWindow` mga opsyon.

**Mga Tala:**

* Ang pagsasama ng node ay laging hindi pagaganahin sa binuksang `window` kung ito ay hindi napagana sa bintana ng magulang.
* Ang paghihiwalay ng konteksto ay palaging bukas at gagana sa `bintana` kung ito ay napagana sa bintana ng magulang.
* Ang javaScript ay laging hindi gagana kung bubuksan sa `bintana` kung ito ay hindi gumagana sa bintana ng magulang.
* Hindi karaniwang mga tampok (na hindi hinahawakan ng Kromo o Elektron) na ibinigay sa `mga tampok` ay ipapasa sa anumang nakarehistro sa `webContent`'s ` bagong-window ` kaganapang handler sa ` karagdagang mga tampok ` na argumento.

### `window.tagabukas.postMessage (mensahe, targetOrigin)`

* `mensahe` Tali
* `targetOrigin` Tali

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Using Chrome's `window.open()` implementation

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