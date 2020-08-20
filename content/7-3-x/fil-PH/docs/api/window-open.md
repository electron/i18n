# `window.Buksan` Fuction

> Magbukas ng bagong window at mag-load ng isang URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### `window.buksan(url [, frameName] [,mga tampok])`

* `url` Tali
* `frameName` Tali (opsyonal)
* `Mga tampok` Tali (opsyonal)

Babalik ang [`BrowserWindowProxy`](browser-window-proxy.md) - Upang lumilikha ng isang bagong window at babalik ang isang halimbawa ng klase ng `BrowserWindowProxy`.

Ang`Mga tampok`ng string ay sumusunod sa format ng karaniwang browser, ngunit ang bawat tampok ay kailangang maging isang larangan ng `BrowserWindow` mga opsyon. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Halimbawa:
```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Mga Tala:**

* Ang pagsasama ng node ay laging hindi pagaganahin sa binuksang `window` kung ito ay hindi napagana sa bintana ng magulang.
* Ang paghihiwalay ng konteksto ay palaging bukas at gagana sa `bintana` kung ito ay napagana sa bintana ng magulang.
* Ang javaScript ay laging hindi gagana kung bubuksan sa `bintana` kung ito ay hindi gumagana sa bintana ng magulang.
* Hindi karaniwang mga tampok (na hindi hinahawakan ng Kromo o Elektron) na ibinigay sa `mga tampok` ay ipapasa sa anumang nakarehistro sa `webContent`'s ` bagong-window ` kaganapang handler sa ` karagdagang mga tampok ` na argumento.

### `window.tagabukas.postMessage (mensahe, targetOrigin)`

* `mensahe` Tali
* `targetOrigin` Tali

Nagpapadala ng mensahe sa window ng magulang na may tinukoy na pinanggalingan o `*` para sa hindi Pinagmulang pinanggalingan.

### Paggamit ng Chrome's `window.buksan()` ng pagpapatupad

Kung nais mong gamitin ang Chrome's na built-in`window.buksan()` na pagpapatupad, itakda `nativeWindowOpen` sa `tama` ang nasa` webPreferences`mga opsyon na bagay.

Ang native`window.buksan()` ay nagbibigay-daan sa pag-access ng kasabay sa mga binuksan na windows upang ito ay maginhawa na pagpipilian kung kailangan mo upang buksan ang isang dialog o isang kagustuhan window.

Maaari ring itakda ang opsyong ito sa `<webview>` mga tag na mabuti:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

Ang paglikha ng `BrowserWindow` ay napapasadya sa pamamagitan ng `WebContents` `bagong window` kaganapan.

```javascript
// pangunahing proseso
const mainWindow = bagong BrowserWindow ({
  lapad: 800,
  taas: 600,
  webPreferences: {
    nativeWindowOpen: totoo
  }
})
mainWindow.webContents.on ('bagong-bintana', (kaganapan, url, frameName, disposition, mga pagpipilian, additionalFeatures) = & gt; {
  kung (frameName === 'modal') {
    // buksan ang window bilang modal
    Kaganapan.preventDefault ()
    Bagay.assign (pagpipilian, {
      modal: totoo,
      magulang: mainWindow,
      lapad: 100,
      taas: 100
    })
    event.newGuest = bagong BrowserWindow (mga pagpipilian)
  }
})
```

```javascript
// proseso ng renderer (mainWindow)
hayaan modal = window.buksan ('', 'modal')
modal.document.isulat ('<h1>Hello</h1>')
```
