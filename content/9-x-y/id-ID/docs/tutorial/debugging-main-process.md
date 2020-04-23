# Debugging Proses Utama

DevTools di jendela browser Elektron hanya bisa men-debug JavaScript itu dieksekusi di jendela itu (yaitu halaman web). Untuk men-debug JavaScript itu dieksekusi dalam proses utama Anda perlu menggunakan debugger eksternal dan luncurkan Elektron dengan tombol `--periksa`atau `--periksa-brk`.

## Saklar Baris Perintah

Gunakan salah satu dari switch baris perintah berikut untuk mengaktifkan debugging main proses:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Seperti `--periksa` tapi jeda eksekusi pada baris pertama JavaScript.

## Debuggers Eksternal

Anda perlu menggunakan debugger yang mendukung protokol inspektur V8.

- Sambungkan Chrome dengan mengunjungi `chrome://periksa` dan pilih untuk memeriksa meluncurkan aplikasi Elektron hadir di sana.
- [Debugging Proses Utama di VSCode](debugging-main-process-vscode.md)
