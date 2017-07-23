# Aksesibilitas

Membuat aplikasi dapat diakses penting dan kami senang untuk memperkenalkan fungsi baru untuk [Devtron](https://electron.atom.io/devtron) dan [Spectron](https://electron.atom.io/spectron) yang memberikan pengembang kesempatan untuk membuat aplikasi mereka lebih baik bagi semua orang.

* * *

Masalah Aksesibilitas dalam aplikasi elektron mirip dengan situs web karena mereka berdua merupakan HTML. Dengan aplikasi elektron, akan tetapi, Anda tidak dapat menggunakan sumber daya online untuk aksesibilitas audit karena app tidak memiliki URL untuk menunjuk ke auditor.

Fitur baru ini membawa alat audit tersebut ke aplikasi elektron anda. Anda dapat memilih untuk menambahkan Audit ke tes anda dengan Spectron atau menggunakannya dalam DevTools dengan Devtron. Baca terus untuk ringkasan tools atau kunjungi kami [aksesibilitas dokumentasi](https://electron.atom.io/docs/tutorial/accessibility) untuk informasi lebih lanjut.

### Spectron

Dalam framework pengujian Spectron, Anda sekarang dapat melakukan audit setiap jendela dan `<webview>`tag dalam aplikasi Anda. Sebagai contoh:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Anda dapat membaca lebih lanjut tentang fitur ini dalam [Dokumentasi Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

Dalam Devtron, ada tab aksesibilitas baru yang memungkinkan anda untuk melakukan audit halaman dalam aplikasi Anda, mengurutkan dan menyaring hasil.

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Kedua alat-alat ini menggunakan perpustakaan [ Alat Aksesibilitas pengembang](https://github.com/GoogleChrome/accessibility-developer-tools) yang dibangun oleh Google untuk Chrome. Anda dapat mempelajari lebih lanjut tentang aturan audit aksesibilitas yang menggunakan perpustakaan ini pada bahwa [repositori wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Jika Anda tahu perangkat akses lainnya untuk electron, menambahkannya ke [dokumentasi aksesibilitas](https://electron.atom.io/docs/tutorial/accessibility) dengan permintaan tarik.