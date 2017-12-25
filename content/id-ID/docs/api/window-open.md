# `window.open` fungsi

> Buka jendela baru dan muat URL.

Ketika ` window.open ` dipanggil untuk membuat jendela baru di halaman web, sebuah instance baru dari ` BrowserWindow ` akan dibuat untuk ` url ` dan sebuah proxy akan dikembalikan ke ` window.open ` untuk membiarkan halaman memiliki kontrol terbatas terhadapnya.

Proxy memiliki fungsionalitas standar terbatas yang diimplementasikan agar kompatibel dengan halaman web tradisional. Untuk kontrol penuh jendela baru Anda harus membuat ` BrowserWindow ` secara langsung.

Yang baru dibuat ` BrowserWindow ` akan mewarisi pilihan jendela induk secara default. Untuk mengganti opsi yang diwarisi Anda dapat mengaturnya di string ` fitur `.

### `window.open (url [, frameName] [, fitur])`

* `url` String
* `frameName`String (opsional)
* `fitur` String (opsional)

Mengembalikan [` BrowserWindowProxy `](browser-window-proxy.md) - Membuat jendela baru dan mengembalikan sebuah instance dari kelas ` BrowserWindowProxy `.

String `features` mengikuti format browser standar, namun masing-masing fitur harus berupa bidang `pilihan BrowserWindow`.

**Catatan:**

* Integrasi node akan selalu dinonaktifkan di jendela ` yang terbuka ` jika dinonaktifkan pada jendela induk.
* Isolasi konteks akan selalu diaktifkan di jendela ` yang terbuka ` jika diaktifkan pada jendela induk.
* JavaScript akan selalu dinonaktifkan di jendela `yang terbuka` jika dinonaktifkan pada jendela induk.
* Fitur non-standar (yang tidak ditangani oleh Chromium atau Elektron) yang diberikan pada `fitur` akan diteruskan ke jendela baru ` webContent `baru` `event handler dalam argumen `tambahanFeatures`.

### `window.opener.postMessage (pesan, targetOrigin)`

* `pesan` String
* ` targetOrigin </ 0> String</li>
</ul>

<p>Sends a message to the parent window with the specified origin or <code>*` for no origin preference.</p> 
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