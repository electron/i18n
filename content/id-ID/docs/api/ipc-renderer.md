# ipcRenderer

> Berkomunikasi secara asynchronous dari proses renderer ke proses utama.

Processo: [Renderizador](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ini menyediakan beberapa metode sehingga Anda dapat mengirim pesan sinkron dan asinkron dari proses render (halaman web) ke proses utama. Anda juga bisa menerima balasan dari proses utama.

Lihat  ipcMain </ 0> untuk contoh kode.</p> 

## Methods

The ` ipcRenderer </ 0> modul memiliki metode berikut untuk mendengarkan acara dan mengirim pesan:</p>

<h3><code>ipcRenderer.on (saluran, pendengar)`</h3> 

* `channel` String
* `pendengar` Fungsi 
  * `event` IpcRendererEvent
  * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p>Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3><code>ipcRenderer.sekali (saluran, pendengar)`</h3> 
    * ` saluran </ 0>  String</li>
<li><code>pendengar` Fungsi 
      * `event` IpcRendererEvent
      * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p>Hapus satu waktu <code> pendengar </ 0> fungsi untuk acara. Ini <code> pendengar </ 0> yang hanya satu kali pesan terkirim ke <code> saluran </ 0>, setelah itu hapus.</p>

<h3><code>ipcRenderer.pendengar menghapus (saluran, pendengar)`</h3> 
        * `channel` String
        * `pendengar` Fungsi 
          * ` ... args </ 0> ada []</li>
</ul></li>
</ul>

<p>Menghapus ditentukan <code> pendengar </ 0> dari array pendengar untuk <code> saluran </ 0> tertentu.</p>

<h3><code>ipcRenderer.removeAllListeners(channel)`</h3> 
            * `channel` String
            
            Menghapus semua pendengar, atau orang-orang dari yang ditentukan ` saluran </ 0> .</p>

<h3><code>ipcRenderer.send(channel, ...args)`</h3> 
            
            * `channel` String
            * ` ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan ke proses utama secara asinkron melalui <code> saluran </ 0> , Anda juga dapat mengirim argumen yang sewenang-wenang. Arguments will be serialized as JSON internally and
hence no functions or prototype chain will be included.</p>

<p>The main process handles it by listening for <code>channel` with the [`ipcMain`](ipc-main.md) module.</p> 
              ### `ipcRenderer.invoke(channel, ...args)`
              
              * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Returns <code>Promise<any>` - Resolves with the response from the main process.</p> 
                Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.
                
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
                
                * `channel` String
                * ` ... args </ 0> ada []</li>
</ul>

<p>Returns <code>any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.</p> 
                  Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Argumen akan diserialkan di JSON secara internal dan karenanya tidak ada fungsi atau rantai prototipe yang akan disertakan.
                  
                  The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.
                  
                  **Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.
                  
                  ### `ipcRenderer.sendTo(webContentsId, channel, ...args)`
                  
                  * `webContentsId` Number
                  * `channel` String
                  * ` ... args </ 0> ada []</li>
</ul>

<p>Sends a message to a window with <code>webContentsId` via `channel`.</p> 
                    ### `ipcRenderer.sendToHost(channel, ...args)`
                    
                    * `channel` String
                    * ` ... args </ 0> ada []</li>
</ul>

<p>Like <code>ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.</p> 
                      ## Objek acara
                      
                      The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.