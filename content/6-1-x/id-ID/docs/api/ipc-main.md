# ipc Main

> Berkomunikasi asynchronous dari proses utama ke proses renderer.

Proses: [Main](../glossary.md#main-process)

` ipc Main </ 0> modul adalah turunan dari
 <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> acara Emitter </ 1> kelas. Bila digunakan dalam proses utama, ia menangani pesan asinkron dan sinkron yang dikirim dari proses renderer (halaman web). Pesan yang dikirim dari penyaji akan dipancarkan ke modul ini.</p>

<h2 spaces-before="0">Mengirim Pesan</h2>

<p spaces-before="0">Hal ini juga memungkinkan untuk mengirim pesan dari proses utama ke proses renderer, lihat <a href="web-contents.md#contentssendchannel-arg1-arg2-"> isi web.kirim</ 0> untuk informasi lebih lanjut.</p>

<ul>
<li>Saat mengirim pesan, nama acara adalah <code> saluran </ 0> .</li>
<li>Untuk membalas pesan sinkron, Anda perlu mengatur <code> acara.kembali di nilai </ 0> .</li>
<li>To send an asynchronous message back to the sender, you can use
<code>event.reply(...)`.  This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.</li> </ul>

Contoh pengiriman dan penanganan pesan antara proses render dan utama:

```javascript
// Dalam proses utama.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// Dalam proses renderer (halaman web).
const { ipcRenderer } = require ('electron')
console.log (ipcRenderer.sendSync ('pesan sinkron', 'ping')) // mencetak "pong"

ipcRenderer.on ('asinkron-reply', (event, arg) = > {
   console.log (arg) // mencetak "pong"
})
ipcRenderer.send ('asynchronous-message', 'ping')
```

## Metode

Modul ` ipcMain </ 0> memiliki metode berikut untuk mendengarkan acara:</p>

<h3 spaces-before="0"><code>ipcMain.di (saluran, pendengar)`</h3>

* ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi

<ul>
<li><code>event` IpcMainEvent
  * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p spaces-before="0">Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3 spaces-before="0"><code>ipcMain.sekali (saluran, pendengar)`</h3>

* ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi

<ul>
<li><code>event` IpcMainEvent
  * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p spaces-before="0">Adds a one time <code>listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.</p>

### `ipcMain.pendengar menghapus (saluran, pendengar)`

* `channel` String
* ` pendengar </ 0> Fungsi</li>
</ul>

<p spaces-before="0">Menghapus ditentukan <code> pendengar </ 0> dari array pendengar untuk <code> saluran </ 0> tertentu.</p>

<h3 spaces-before="0"><code>ipcMain.pendengar menghapus semua( [channel] )`</h3>

* ` saluran </ 0>  String</li>
</ul>

<p spaces-before="0">Menghapus pendengar yang ditentukan <code> saluran </ 0> .</p>

<h2 spaces-before="0">Objek acara</h2>

<p spaces-before="0">The documentation for the <code>event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.</p>