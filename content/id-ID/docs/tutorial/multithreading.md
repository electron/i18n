# Multithreading

With [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), it is possible to run JavaScript in OS-level threads.

## Multi-threaded Node.js

It is possible to use Node.js features in Electron's Web Workers, to do so the `nodeIntegrationInWorker` option should be set to `true` in `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

The `nodeIntegrationInWorker` can be used independent of `nodeIntegration`, but `sandbox` must not be set to `true`.

## API yang tersedia

Semua built-in modul Node.js didukung dalam Pekerja Web, dan ` asar </ 0> 
arsip masih dapat dibaca dengan Node.js API . Namun tidak ada modul built-in Electron yang dapat digunakan di lingkungan multi-threaded.</p>

<h2>Modul Node.js asli</h2>

<p>Setiap modul Node.js asli dapat dimuat langsung di Web Workers, namun sangat disarankan untuk tidak melakukannya. Sebagian besar modul asli yang ada telah ditulis dengan asumsi lingkungan single-threaded, menggunakannya di Web Workers akan menyebabkan crash dan korupsi memori.</p>

<p>Perhatikan bahwa meskipun modul Node.js asli adalah benang-aman, masih tidak aman untuk memuatnya di Pekerja Web karena fungsi <code> process.dlopen </ 0> bukan thread yang aman.</p>

<p>Satu-satunya cara untuk memuat modul asli dengan aman untuk saat ini, adalah memastikan bahwa aplikasi tidak memuat modul asli setelah Pekerja Web memulai.</p>

<pre><code class="javascript">process.dlopen = () = & gt; {
   buang Kesalahan baru ('Muat modul asli tidak aman')} biarkan pekerja = Pekerja baru ('script.js')
`</pre>