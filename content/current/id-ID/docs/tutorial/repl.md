# REPL

Read-Eval-Print-Loop (REPL) merupakan lingkungan pemrograman komputer sederhana, interaktif yang membutuhkan input pengguna tunggal (yaitu satu ekspresi), mengevaluasi mereka, dan mengembalikan hasilnya kepada pengguna.

Modul `repl` menyediakan implementasi REPL yang dapat diakses menggunakan:

* Dengan asumsi Anda memiliki `electron` atau `electron-prebuilt` yang terinstal sebagai ketergantungan proyek lokal:
    
    ```sh
    ./node_modules/.bin/electron --interactive
    ```

* Dengan asumsi Anda memiliki `electron` atau `electron-prebuilt` diinstal secara global:
    
    ```sh
    electron --interactive
    ```

Hal ini hanya menciptakan REPL untuk proses utama. Anda dapat menggunakan tab konsol DevTool untuk mendapatkan REPL untuk proses renderer.

**Catatan:** `electron--interactive` tidak tersedia pada Windows.

Informasi lebih lanjut dapat ditemukan di [Dokumentasi Node.js REPL](https://nodejs.org/dist/latest/docs/api/repl.html).