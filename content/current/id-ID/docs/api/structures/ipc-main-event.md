# AcaraUtamaIpc obyek meluas `Acara`

* `Bingkaiid` Integer-ID dari bingkai penyaji yang mengirim pesanan ini
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` KontenWeb - Mengembalikan `webContents` yang mengirimkan pesan
* `ports` MessagePortMain[] - A list of MessagePorts that were transferred with this message
* `balas` Function-fungsi yang akan mengirim pesan IPC ke frame renderer yang dikirim pesan asli yang sedang anda menangani.  You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame.
  *  saluran </ 0>  String</li>
<li><code> ... args </ 0> ada []</li>
</ul></li>
</ul>
