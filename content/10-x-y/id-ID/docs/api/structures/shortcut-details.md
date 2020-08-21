# Objek ShortcutDetails

* ` target </ 0>  String - Target untuk memulai dari shortcut ini.</li>
<li><code>cwd` String (opsional) - Direktori kerja. Secara default kosong.
* `args` String (opsional) - Argumen yang akan diterapkan ke `target` saat diluncurkan di pintasan ini. Secara default kosong.
* `description` String (opsional) - Deskripsi dari pintasan. Secara default kosong.
* `icon` String (opsional) - Jalur ke ikon, bisa berupa DLL atau EXE. `icon` dan `iconIndex` harus disatukan. Secara default kosong, yang menggunakan ikon dari target.
* `iconIndex` Number (opsional) - ID Sumberdaya ikon bila `icon` adalah sebuah DLL atau EXE. Secara default 0.
* `appUserModelId` String (opsional) - ID Model Pengguna Aplikasi. Secara default kosong.
