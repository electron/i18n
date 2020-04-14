# Multithreading

Dengan [Pekerja Web](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), dimungkinkan untuk menjalankan JavaScript dalam tingkat OS-benang.

## Multi-threaded Node.js

Mungkin untuk menggunakan fitur Node.js di elektron 's Web pekerja, untuk melakukannya `nodeIntegrationInWorker` pilihan harus ditetapkan `benar` dalam `webPreferences`.

```javascript
biarkan win = BrowserWindow baru ({webPreferences: {
    nodeIntegrationInWorker: true
  }})
```

`NodeIntegrationInWorker` dapat digunakan independen dari `nodeIntegration`, tapi `sandbox` harus tidak diatur ke `true`.

## API yang tersedia

Semua built-in modul Node.js didukung dalam Pekerja Web, dan ` asar </ 0> 
arsip masih dapat dibaca dengan Node.js API . Namun tidak ada modul built-in Electron yang dapat digunakan di lingkungan multi-threaded.</p>

<h2 spaces-before="0">Modul Node.js asli</h2>

<p spaces-before="0">Setiap modul Node.js asli dapat dimuat langsung di Web Workers, namun sangat disarankan untuk tidak melakukannya. Sebagian besar modul asli yang ada telah ditulis dengan asumsi lingkungan single-threaded, menggunakannya di Web Workers akan menyebabkan crash dan korupsi memori.</p>

<p spaces-before="0">Perhatikan bahwa meskipun modul Node.js asli adalah benang-aman, masih tidak aman untuk memuatnya di Pekerja Web karena fungsi <code> process.dlopen </ 0> bukan thread yang aman.</p>

<p spaces-before="0">Satu-satunya cara untuk memuat modul asli dengan aman untuk saat ini, adalah memastikan bahwa aplikasi tidak memuat modul asli setelah Pekerja Web memulai.</p>

<pre><code class="javascript">process.dlopen = () = & gt; {
   buang Kesalahan baru ('Muat modul asli tidak aman')} biarkan pekerja = Pekerja baru ('script.js')
`</pre>
