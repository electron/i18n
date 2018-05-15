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

String `features` mengikuti format browser standar, namun masing-masing fitur harus berupa bidang `pilihan BrowserWindow`.

**Catatan:**

* Integrasi node akan selalu dinonaktifkan di jendela ` yang terbuka ` jika dinonaktifkan pada jendela induk.
* Isolasi konteks akan selalu diaktifkan di jendela ` yang terbuka ` jika diaktifkan pada jendela induk.
* JavaScript akan selalu dinonaktifkan di jendela `yang terbuka` jika dinonaktifkan pada jendela induk.
* Fitur non-standar (yang tidak ditangani oleh Chromium atau Elektron) yang diberikan pada `fitur` akan diteruskan ke jendela baru ` webContent `baru` `event handler dalam argumen `tambahanFeatures`.

### `window.opener.postMessage (pesan, targetOrigin)`

* ` pesan </ 0> String</li>
<li><code> targetOrigin </ 0> String</li>
</ul>

<p>Mengirim pesan ke jendela induk dengan asal yang ditentukan atau <code>*` tanpa preferensi asal.</p> 
    ### Menggunakan penerapan `window.open()` Chrome
    
    Jika Anda ingin menggunakan penerapan built-in `window.open()`, setel `nativeWindowOpen` ke `benar` di `webPreferences` pilihan objek
    
    Native `window.open()` memungkinkan akses sinkron ke jendela yang terbuka sehingga pilihan yang tepat jika Anda perlu membuka dialog atau jendela preferensi.
    
    Opsi ini juga dapat disetel pada tag `<webview>` juga:
    
    ```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

Pembuatan ` BrowserWindow ` dapat dikustomisasi melalui acara ` WebContents ` '`new-window`.

```javascript
// main process 
const mainWindow = new BrowserWindow ({width: 800, height: 600, webPreferences: {nativeWindowOpen: true}}) mainWindow.webContents.on ('new-window', (event, url, frameName, disposition, options , AdditionalFeatures) = & gt; {if (frameName === 'modal') {//buka jendela sebagai modal event.preventDefault () Object.assign (opsi, {modal: true, parent: mainWindow, width: 100, height: 100}) event.newGuest = new BrowserWindow (pilihan)}})
```

```javascript
// renderer process (mainWindow) biarkan modal = window.open ('', 'modal') modal.document.write('<h1>Halo</h1>')
```