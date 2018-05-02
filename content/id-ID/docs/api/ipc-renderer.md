# ipcRenderer

> Berkomunikasi secara asynchronous dari proses renderer ke proses utama.

Proses:[Renderer](../glossary.md#renderer-process)

The ` ipcRenderer </ 0> modul adalah turunan dari
 <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> acara Emitter </ 1> kelas. Ini menyediakan beberapa metode sehingga Anda dapat mengirim pesan sinkron dan asinkron dari proses render (halaman web) ke proses utama. Anda juga bisa menerima balasan dari proses utama.</p>

<p>Lihat <a href="ipc-main.md"> ipcMain </ 0> untuk contoh kode.</p>

<h2>Methods</h2>

<p>The <code> ipcRenderer </ 0> modul memiliki metode berikut untuk mendengarkan acara dan mengirim pesan:</p>

<h3><code>ipcRenderer.on (saluran, pendengar)`</h3> 

* `channel` String
* ` pendengar </ 0> Fungsi</li>
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

<h3><code>ipcRenderer.removeAllListeners(channel)`</h3> 
            * `channel` String
            
            Menghapus semua pendengar, atau orang-orang dari yang ditentukan ` saluran </ 0> .</p>

<h3><code>ipcRenderer.kirim (saluran [, arg1] [, arg2] [, ...])`</h3> 
            
            * `channel` String
            * ` ... args </ 0> ada []</li>
</ul>

<p>Kirim pesan ke proses utama secara asinkron melalui <code> saluran </ 0> , Anda juga dapat mengirim argumen yang sewenang-wenang. Argumen akan diserialkan di JSON secara internal dan karenanya tidak ada fungsi atau rantai prototipe yang akan disertakan.</p>

<p>The main process handles it by listening for <code>channel` with [`ipcMain`](ipc-main.md) module.</p> 
                ### `ipcRenderer.sikron di kirim (saluran [, arg1] [, arg2] [, ...])`
                
                * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Mengembalikan <code> sembarang </ 0> - Nilai dikirim kembali oleh handler <a href="ipc-main.md"><code> ipcMain </ 1> .</p>

<p>Kirim pesan ke proses utama secara serentak melalui <code> saluran </ 0> , Anda juga dapat mengirim argumen yang sewenang-wenang. Argumen akan diserialkan di JSON secara internal dan karenanya tidak ada fungsi atau rantai prototipe yang akan disertakan.</p>

<p>The main process handles it by listening for <code>channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.</p> 
                    ** Catatan: </ 0> Mengirimkan pesan sinkron akan memblokir keseluruhan proses perenderan, kecuali jika Anda tahu apa yang Anda lakukan, Anda tidak boleh menggunakannya.</p> 
                    
                    ### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`
                    
                    * `windowId` Number
                    * `channel` String
                    * ` ... args </ 0> ada []</li>
</ul>

<p>Sends a message to a window with <code>windowid` via `channel`.</p> 
                        ### `ipcRenderer.kirim ke tuan rumah(saluran [, arg1] [, arg2] [, ...])`
                        
                        * ` saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul>

<p>Seperti <code> ipcrenderer.kirim </ 0> tapi acara akan dikirim ke <code><webview>` elemen di tuan rumah halaman bukan proses utama.</p>