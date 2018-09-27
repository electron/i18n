# `window.open` Fungsi

> Buka jendela baru dan muat URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

Proxy memiliki fungsionalitas standar terbatas yang diimplementasikan agar kompatibel dengan halaman web tradisional. Untuk kontrol penuh jendela baru Anda harus membuat ` BrowserWindow ` secara langsung.

Yang baru dibuat ` BrowserWindow ` akan mewarisi pilihan jendela induk secara default. Untuk mengganti opsi yang diwarisi Anda dapat mengaturnya di string ` fitur `.

### `window.open (url [, frameName] [, fitur])`

* ` url </ 0> String</li>
<li><code>frameName`String (opsional)
* `fitur` String (opsional)

Mengembalikan [` BrowserWindowProxy `](browser-window-proxy.md) - Membuat jendela baru dan mengembalikan sebuah instance dari kelas ` BrowserWindowProxy `.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Sebagai contoh:

```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* Integrasi node akan selalu dinonaktifkan di jendela ` yang terbuka ` jika dinonaktifkan pada jendela induk.
* Isolasi konteks akan selalu diaktifkan di jendela ` yang terbuka ` jika diaktifkan pada jendela induk.
* JavaScript akan selalu dinonaktifkan di jendela `yang terbuka` jika dinonaktifkan pada jendela induk.
* Fitur non-standar (yang tidak ditangani oleh Chromium atau Elektron) yang diberikan pada `fitur` akan diteruskan ke jendela baru ` webContent `baru` `event handler dalam argumen `tambahanFeatures`.

### `window.opener.postMessage (pesan, targetOrigin)`

* ` pesan </ 0> String</li>
<li><code> targetOrigin </ 0> String</li>
</ul>

<p>Sends a message to the parent window with the specified origin or <code>*` for no origin preference.</p> 
    ### Menggunakan penerapan `window.open()` Chrome
    
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