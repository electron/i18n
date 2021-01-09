---
title: BrowserView window.open() Vulnerability Fix
author: ckerr
date: '2019-02-03'
---

Kerentanan kode telah ditemukan yang memungkinkan Node untuk diaktifkan kembali di jendela anak.

---

Membuka Browser View dengan ` sandbox: true ` atau ` nativeWindowOpen: true ` dan ` nodeIntegration: false ` menghasilkan webContents di mana ` window.open ` bisa dipanggil dan jendela anak yang baru dibuka akan mengaktifkan ` nodeIntegration `. This vulnerability affects all supported versions of Electron.

## Mitigation

Kami telah menerbitkan versi terbaru Electron yang menyertakan perbaikan untuk kerentanan ini: [ ` 2.0.17 ` ](https://github.com/electron/electron/releases/tag/v2.0.17), [ ` 3.0.15 ` ](https://github.com/electron/electron/releases/tag/v3.0.15), [ ` 3.1.3 ` ](https://github.com/electron/electron/releases/tag/v3.1.3), [ ` 4.0.4 ` ](https://github.com/electron/electron/releases/tag/v4.0.4), dan [ ` 5.0.0-beta.2 ` ](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Kami mendorong semua pengembang Electron untuk segera memperbarui aplikasi mereka ke versi stabil terbaru.

Jika karena alasan tertentu Anda tidak dapat meningkatkan versi Electron Anda, Anda dapat mengurangi masalah ini dengan menonaktifkan semua konten web:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Further Information

Kerentanan ini ditemukan dan dilaporkan secara bertanggung jawab ke proyek Electron oleh [ PalmerAL ](https://github.com/PalmerAL).

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial](https://electronjs.org/docs/tutorial/security).

If you wish to report a vulnerability in Electron, email security@electronjs.org.
