# AcaraUtamaIpc obyek meluas `Acara`

* `Bingkaiid` Integer-ID dari bingkai penyaji yang mengirim pesanan ini
* `returnValue` any -set ini ke nilai yang akan dikembalikan dalam pesan sinkronis
* `sender` KontenWeb - Mengembalikan `webContents` yang mengirimkan pesan
* `balas` Function-fungsi yang akan mengirim pesan IPC ke frame renderer yang dikirim pesan asli yang sedang anda menangani.  Anda harus menggunakan cara ini untuk "Balas" ke pesan yang dikirim untuk menjamin balasan akan pergi ke proses yang tepat dan dibingkai.
  * `...args` setiap[] IpcRenderer
