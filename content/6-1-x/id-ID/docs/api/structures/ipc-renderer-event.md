# Objek IpcRendererEvent memperluas `Event`

* `sender` IpcRenderer - `IpcRenderer` yang pada awalnya menyebebabkan kejadian tersebut
* `senderId` Bilangan Bulat - `webContents.id` yang mengirimkan pesan, anda dapat menghubiungi `event.sender.sendTo(event.senderId, ...)` untuk membalas pesan, kunjungi [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) untuk informasi lebih lanjut. Ini hanya berlaku untuk pesan yang dikirim dari pengirim yang berbeda. Pesan yang dikirim langsung dari proses utama diatur dari `event.senderId` ke `0`.
