# ipc Utama

> Berkomunikasi asynchronous dari proses utama ke proses renderer.

Proses: [Main](../glossary.md#main-process)

` ipc Main </ 0> modul adalah turunan dari
 <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> acara Emitter </ 1> kelas. Bila digunakan dalam proses utama, ia menangani pesan asinkron dan sinkron yang dikirim dari proses renderer (halaman web). Pesan yang dikirim dari penyaji akan dipancarkan ke modul ini.</p>

<h2>Mengirim Pesan</h2>

<p>It is also possible to send messages from the main process to the renderer
process, see <a href="web-contents.md#contentssendchannel-arg1-arg2-">webContents.send</a> for more information.</p>

<ul>
<li>Saat mengirim pesan, nama acara adalah <code> saluran </ 0> .</li>
<li>Untuk membalas pesan sinkron, Anda perlu mengatur <code> acara.kembali di nilai </ 0> .</li>
<li>Untuk mengirim pesan asinkron kembali ke pengirim, Anda dapat menggunakan
 <code> acara.pengirim.kirim (...) </ 0> .</li>
</ul>

<p>Contoh pengiriman dan penanganan pesan antara proses render dan utama:</p>

<pre><code class="javascript">// Dalam proses utama.
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
`</pre> 

```javascript
// Dalam proses renderer (halaman web).
const {ipcRenderer} = require ('electron')
console.log (ipcRenderer.sendSync ('pesan sinkron', 'ping')) // mencetak "pong"

ipcRenderer.on ('asinkron-reply', (event, arg) = > {
   console.log (arg) // mencetak "pong"
})
ipcRenderer.send ('asynchronous-message', 'ping')
```

## Metode

Modul ` ipcMain </ 0> memiliki metode berikut untuk mendengarkan acara:</p>

<h3><code>ipcMain.di (saluran, pendengar)`</h3> 

* `channel` String
* ` pendengar </ 0> Fungsi</li>
</ul>

<p>Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3><code>ipcMain.sekali (saluran, pendengar)`</h3> 
    * `channel` String
    * ` pendengar </ 0> Fungsi</li>
</ul>

<p>Hapus satu waktu <code> pendengar </ 0> fungsi untuk acara. Ini <code> pendengar </ 0> yang hanya satu kali pesan terkirim ke <code> saluran </ 0>, setelah itu hapus.</p>

<h3><code>ipcMain.pendengar menghapus (saluran, pendengar)`</h3> 
        * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Menghapus ditentukan <code> pendengar </ 0> dari array pendengar untuk <code> saluran </ 0> tertentu.</p>

<h3><code>ipcMain.pendengar menghapus semua( [channel] )`</h3> 
            * ` saluran </ 0>  String</li>
</ul>

<p>Menghapus pendengar yang ditentukan <code> saluran </ 0> .</p>

<h2>Objek acara</h2>

<p><code> acara </ 0> objek diteruskan ke <code> callback </ 0> memiliki metode berikut:</p>

<h3><code>acara.kembali di nilai`</h3> 
                Atur ini ke nilai yang akan dikembalikan dalam pesan sinkron.
                
                ### `acara.pengirim`
                
                Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for more information.