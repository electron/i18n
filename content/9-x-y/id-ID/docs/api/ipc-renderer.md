# ipc Renderer

> Berkomunikasi secara asynchronous dari proses renderer ke proses utama.

Processo: [Renderizador](../glossary.md#renderer-process)

The `ipcRenderer` module is an  [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ini menyediakan beberapa metode sehingga Anda dapat mengirim pesan sinkron dan asinkron dari proses render (halaman web) ke proses utama. Anda juga bisa menerima balasan dari proses utama.

Lihat

 ipcMain </ 0> untuk contoh kode.</p> 



## Methods

The ` ipcRenderer </ 0> modul memiliki metode berikut untuk mendengarkan acara dan mengirim pesan:</p>

<h3 spaces-before="0"><code>ipcRenderer.on (saluran, pendengar)`</h3> 

* ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi

<ul>
<li><code>event` IpcRendererEvent
  * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p spaces-before="0">Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3 spaces-before="0"><code>ipcRenderer.sekali (saluran, pendengar)`</h3> 
    * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi

<ul>
<li><code>event` IpcRendererEvent
  * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p spaces-before="0">Adds a one time <code>listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.</p> 

### `ipcRenderer.pendengar menghapus (saluran, pendengar)`

* ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi

<ul>
<li><code> ... args </ 0> ada []</li>
</ul></li>
</ul>

<p spaces-before="0">Menghapus ditentukan <code> pendengar </ 0> dari array pendengar untuk <code> saluran </ 0> tertentu.</p>

<h3 spaces-before="0"><code>ipcRenderer.removeAllListeners(channel)`</h3> 
  * `channel` String
Menghapus semua pendengar, atau orang-orang dari yang ditentukan ` saluran </ 0> .</p>

<h3 spaces-before="0"><code>ipcRenderer.send(channel, ...args)`</h3> 

* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Send an asynchronous message to the main process via <code>channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.</p> 

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.



### `ipcRenderer.invoke(channel, ...args)`

* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Returns <code>Promise<any>` - Resolves with the response from the main process.</p> 
  Send a message to the main process via `channel` and expect a result asynchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.
  
  

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Sebagai contoh:


```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```




### `ipcRenderer.sendSync(channel, ...args)`

* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Mengembalikan <code> sembarang </ 0> - Nilai dikirim kembali oleh handler <a href="ipc-main.md"><code> ipcMain </ 1> .</p>

<p spaces-before="0">Send a message to the main process via <code>channel` and expect a result synchronously. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.</p> 

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.



> :warning: **WARNING**: Sending a synchronous message will block the whole renderer process until the reply is received, so use this method only as a last resort. It's much better to use the asynchronous version, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).



### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Sends a message to a window with <code>webContentsId` via `channel`.</p> 

### `ipcRenderer.sendToHost(channel, ...args)`

* ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p spaces-before="0">Seperti <code> ipcrenderer.kirim </ 0> tapi acara akan dikirim ke <code><webview>` elemen di tuan rumah halaman bukan proses utama.</p> 

## Objek acara

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.
