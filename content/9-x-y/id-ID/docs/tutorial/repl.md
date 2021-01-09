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

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Catatan:** `electron--interactive` tidak tersedia pada Windows.

Informasi lebih lanjut dapat ditemukan di [Dokumentasi Node.js REPL](https://nodejs.org/dist/latest/docs/api/repl.html).
