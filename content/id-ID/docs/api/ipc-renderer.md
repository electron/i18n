# ipcRenderer

> Communicate asynchronously from a renderer process to the main process.

Proses:  Renderer </ 0></p> 

The `ipcRenderer` module is an instance of the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class. It provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process. You can also receive replies from the main process.

See [ipcMain](ipc-main.md) for code examples.

## Methods

The `ipcRenderer` module has the following method to listen for events and send messages:

### `ipcRenderer.on(channel, listener)`

* ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3><code>ipcRenderer.once(channel, listener)`</h3> 
    * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Adds a one time <code>listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.</p> 
        ### `ipcRenderer.removeListener(channel, listener)`
        
        * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Removes the specified <code>listener` from the listener array for the specified `channel`.</p> 
            ### `ipcRenderer.removeAllListeners([channel])`
            
            * `channel` String (optional)
            
            Removes all listeners, or those of the specified `channel`.
            
            ### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`
            
            * ` saluran </ 0>  String</li>
<li><code>...args` any[]
            
            Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.
            
            The main process handles it by listening for `channel` with `ipcMain` module.
            
            ### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`
            
            * ` saluran </ 0>  String</li>
<li><code>...args` any[]
            
            Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.
            
            Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.
            
            The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.
            
            **Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.
            
            ### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`
            
            * ` saluran </ 0>  String</li>
<li><code>...args` any[]
            
            Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.