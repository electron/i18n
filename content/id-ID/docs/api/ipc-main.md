# ipc Main

> Berkomunikasi asynchronous dari proses utama ke proses renderer.

Proses:  Utama </ 0></p> 

` ipc Main </ 0> modul adalah turunan dari
 <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> acara Emitter </ 1> kelas. Bila digunakan dalam proses utama, ia menangani pesan asinkron dan sinkron yang dikirim dari proses renderer (halaman web). Pesan yang dikirim dari penyaji akan dipancarkan ke modul ini.</p>

<h2>Mengirim Pesan</h2>

<p>Hal ini juga memungkinkan untuk mengirim pesan dari proses utama ke proses renderer, lihat <a href="web-contents.md#webcontentssendchannel-arg1-arg2-"> isi web.kirim</ 0> untuk informasi lebih lanjut.</p>

<ul>
<li>Saat mengirim pesan, nama acara adalah <code> saluran </ 0> .</li>
<li>Untuk membalas pesan sinkron, Anda perlu mengatur <code> acara.kembali di nilai </ 0> .</li>
<li>Untuk mengirim pesan asinkron kembali ke pengirim, Anda dapat menggunakan
 <code> acara.pengirim.kirim (...) </ 0> .</li>
</ul>

<p>Contoh pengiriman dan penanganan pesan antara proses render dan utama:</p>

<pre><code class="javascript">// Dalam proses utama.
const {ipcMain} = require ('electron') ipcMain.on ('asynchronous_pesan', ( acara , arg) = & gt; {
   console.log (arg) // mencetak "ping"
 Acara.pengirim.kirim ('asynchronous -dulain ',' pong ')}) ipcMain.on (' pesan sinkron ', ( scara, arg) = & gt; {
 Menghibur.log (arg) // mencetak "ping"
 Acara .kembali di nilai =' pong '})      
`</pre> 

```javascript
// Dalam proses renderer (halaman web).
const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Metode

Modul ` ipcMain </ 0> memiliki metode berikut untuk mendengarkan acara:</p>

<h3><code>ipcMain.di (saluran, pendengar)`</h3> 

* ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3><code>ipcMain.sekali (saluran, pendengar)`</h3> 
    * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Adds a one time <code>listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.</p> 
        ### `ipcMain.removeListener(channel, listener)`
        
        * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Removes the specified <code>listener` from the listener array for the specified `channel`.</p> 
            ### `ipcMain.removeAllListeners([channel])`
            
            * ` saluran </ 0>  String</li>
</ul>

<p>Removes listeners of the specified <code>channel`.</p> 
                ## Event object
                
                The `event` object passed to the `callback` has the following methods:
                
                ### `event.returnValue`
                
                Set this to the value to be returned in a synchronous message.
                
                ### `event.sender`
                
                Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](web-contents.md#webcontentssendchannel-arg1-arg2-) for more information.