# Recent Documents (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**jumplist:**

![Daftar Langsung Berkas Terbaru](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menu dermaga aplikasi:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Untuk menambahkan file ke dokumen baru-baru ini, Anda dapat menggunakan  app.addRecentDocument </ 0> API :</p> 

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Dan Anda dapat menggunakan [app.clearRecentDocuments ](../api/app.md#appclearrecentdocuments-macos-windows) API untuk mengosongkan daftar dokumen baru-baru:

```javascript
onst { app } = require('electron')
app.clearRecentDocuments()
```

## catatan Windows

Agar dapat menggunakan fitur ini pada Windows , aplikasi Anda harus terdaftar sebagai handler dari jenis file dokumen, jika file tersebut tidak akan muncul di jumplist bahkan setelah Anda telah menambahkan. Anda dapat menemukan semuanya di mendaftarkan aplikasi Anda di  Aplikasi Pendaftaran </ 0> .</p> 

Ketika pengguna mengklik file dari jumplist, contoh baru dari aplikasi Anda akan mulai dengan path dari file ditambahkan sebagai argumen baris perintah.

## Catatan macOS

Ketika sebuah file yang diminta dari menu dokumen terakhir, `open-file` acara dari `app` modul akan dipancarkan untuk itu.