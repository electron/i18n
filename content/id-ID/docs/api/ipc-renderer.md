# ipc Renderer

> Berkomunikasi secara asynchronous dari proses renderer ke proses utama.

Proses:  Renderer </ 0></p> 

The ` ipcRenderer </ 0> modul adalah turunan dari
 <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> acara Emitter </ 1> kelas. Ini menyediakan beberapa metode sehingga Anda dapat mengirim pesan sinkron dan asinkron dari proses render (halaman web) ke proses utama.  Anda juga bisa menerima balasan dari proses utama.</p>

<p>Lihat <a href="ipc-main.md"> ipcMain </ 0> untuk contoh kode.</p>

<h2>Metode</h2>

<p>The <code> ipcRenderer </ 0> modul memiliki metode berikut untuk mendengarkan acara dan mengirim pesan:</p>

<h3><code>ipcRenderer.on (saluran, pendengar)`</h3> 

* ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Mendengarkan <code> saluran </ 0> , ketika sebuah pesan baru tiba <code> pendengar </ 0> akan dipanggil dengan
 <code> pendengar (acara, args ...) </ 0> .</p>

<h3><code>ipcRenderer.sekali (saluran, pendengar)`</h3> 
    * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Hapus satu waktu <code> pendengar </ 0> fungsi untuk acara. Ini <code> pendengar </ 0> yang hanya satu kali pesan terkirim ke <code> saluran </ 0>, setelah itu hapus.</p>

<h3><code>ipcRenderer.pendengar menghapus (saluran, pendengar)`</h3> 
        * ` saluran </ 0>  String</li>
<li><code> pendengar </ 0> Fungsi</li>
</ul>

<p>Menghapus ditentukan <code> pendengar </ 0> dari array pendengar untuk <code> saluran </ 0> tertentu.</p>

<h3><code>ipcRenderer.pendengar menghapus semua ( [saluran] )`</h3> 
            * ` saluran </ 0>  String (opsional)</li>
</ul>

<p>Menghapus semua pendengar, atau orang-orang dari yang ditentukan <code> saluran </ 0> .</p>

<h3><code>ipcRenderer.kirim (saluran [, arg1] [, arg2] [, ...])`</h3> 
                * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan ke proses utama secara asinkron melalui <code> saluran </ 0> , Anda juga dapat mengirim argumen yang sewenang-wenang. Argumen akan diserialkan di JSON secara internal dan karenanya tidak ada fungsi atau rantai prototipe yang akan disertakan.</p>

<p>The main process handles it by listening for <code>channel` with `ipcMain` module.</p> 
                    ### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`
                    
                    * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Returns <code>any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.</p> 
                        Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Argumen akan diserialkan di JSON secara internal dan karenanya tidak ada fungsi atau rantai prototipe yang akan disertakan.
                        
                        The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.
                        
                        **Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.
                        
                        ### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`
                        
                        * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Like <code>ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.</p>