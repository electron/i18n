# ipc Utama

> Berkomunikasi asynchronous dari proses utama ke proses renderer.

Proses: [Main](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter). Bila digunakan dalam proses utama, ia menangani pesan asinkron dan sinkron yang dikirim dari proses renderer (halaman web). Pesan yang dikirim dari penyaji akan dipancarkan ke modul ini.

## Mengirim Pesan

Hal ini juga memungkinkan untuk mengirim pesan dari proses utama ke proses renderer, lihat  isi web.kirim</ 0> untuk informasi lebih lanjut.</p> 

* Saat mengirim pesan, nama acara adalah ` saluran </ 0> .</li>
<li>Untuk membalas pesan sinkron, Anda perlu mengatur <code> acara.kembali di nilai </ 0> .</li>
<li>To send an asynchronous message back to the sender, you can use
<code>event.reply(...)`. This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

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

<h3><code>ipcMain.di (saluran, pendengar)`</h3> 

* `channel` String
* `pendengar` Fungsi 
  * `event` IpcMainEvent
  * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p>Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3><code>ipcMain.sekali (saluran, pendengar)`</h3> 
    * `channel` String
    * `pendengar` Fungsi 
      * `event` IpcMainEvent
      * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p>Hapus satu waktu <code> pendengar </ 0> fungsi untuk acara. Ini <code> pendengar </ 0> yang hanya satu kali pesan terkirim ke <code> saluran </ 0>, setelah itu hapus.</p>

<h3><code>ipcMain.pendengar menghapus (saluran, pendengar)`</h3> 
        * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Menghapus ditentukan <code> pendengar </ 0> dari array pendengar untuk <code> saluran </ 0> tertentu.</p>

<h3><code>ipcMain.pendengar menghapus semua( [channel] )`</h3> 
          * ` saluran </ 0>  String (opsional)</li>
</ul>

<p>Menghapus pendengar yang ditentukan <code> saluran </ 0> .</p>

<h3><code>ipcMain.handle(channel, listener)`</h3> 
            * ` saluran </ 0>  String</li>
<li><code>pendengar` Fungsi<Promise<void> | any> 
              * `event` IpcMainInvokeEvent
              * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p>Adds a handler for an <code>invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.</p> 
                If `listener` returns a Promise, the eventual result of the promise will be returned as a reply to the remote caller. Otherwise, the return value of the listener will be used as the value of the reply.
                
                ```js
                // Main process
                ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
                  const result = await somePromise(...args)
                  return result
                })
                
                // Renderer process
                async () => {
                  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
                  // ...
                }
                ```
                
                The `event` that is passed as the first argument to the handler is the same as that passed to a regular event listener. It includes information about which WebContents is the source of the invoke request.
                
                ### `ipcMain.handleOnce(channel, listener)`
                
                * ` saluran </ 0>  String</li>
<li><code>pendengar` Fungsi<Promise<void> | any> 
                  * `event` IpcMainInvokeEvent
                  * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p>Handles a single <code>invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.</p> 
                    ### `ipcMain.removeHandler(channel)`
                    
                    * ` saluran </ 0>  String</li>
</ul>

<p>Removes any handler for <code>channel`, if present.</p> 
                      ## IpcMainEvent object
                      
                      The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.
                      
                      ## IpcMainInvokeEvent object
                      
                      The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.