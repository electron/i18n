Pastikan Anda menggunakan dokumen yang sesuai dengan versi Elektron Anda . Versi nomor harus menjadi bagian dari halaman URL. Jika tidak, Anda mungkin menggunakan dokumentasi cabang pengembangan yang mungkin berisi perubahan API yang tidak kompatibel dengan versi Elektron Anda . Untuk melihat yang lebih tua versi dokumentasi, Anda bisa [telusuri menurut tag](https://github.com/electron/electron/tree/v1.4.0) di GitHub dengan membuka drop-down "Switch branches/tags" dan memilih tag yang cocok dengan versimu.

## Pertanyaan Umum

Ada banyak pertanyaan yang sering diajukan. Lihat ini sebelum membuat masalah:

* [FAQ Elektronika](faq.md)

## Panduan

* [Daftar Istilah](glossary.md)
* [Platform yang Didukung](tutorial/supported-platforms.md)
* [Keamanan](tutorial/security.md)
* [Versi](tutorial/electron-versioning.md)
* [Distribusi Aplikasi](tutorial/application-distribution.md)
* [Panduan Pengiriman Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Panduan Toko Windows](tutorial/windows-store-guide.md)
* [Kemasan Aplikasi](tutorial/application-packaging.md)
* [Menggunakan Modul Node Asli](tutorial/using-native-node-modules.md)
* [Proses Utama Debugging](tutorial/debugging-main-process.md)
* [Menggunakan Selenium dan WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Ekstensi DevTools](tutorial/devtools-extension.md)
* [Menggunakan Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Menggunakan Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Pengujian pada Sistem CI tanpa kepala (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Rendering di luar layar](tutorial/offscreen-rendering.md)
* [Cara pintas keyboard](tutorial/keyboard-shortcuts.md)
* [Memperbarui Aplikasi](tutorial/updates.md)

## Tutorial

* [Mulai Cepat](tutorial/quick-start.md)
* [Integrasi Lingkungan Desktop](tutorial/desktop-environment-integration.md)
* [Deteksi Peristiwa Online / Offline](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Pemberitahuan Asli](tutorial/notifications.md)

## Referensi API

* [Ringkasan](api/synopsis.md)
* [Proses objek](api/process.md)
* [Saklar Baris Perintah Chrome yang Didukung](api/chrome-command-line-switches.md)
* [Variabel Lingkungan](api/environment-variables.md)

### Elemen DOM Khusus:

* [`File` Objek](api/file-object.md)
* [`<webview>`Tag](api/webview-tag.md)
* [`window.open` fungsi](api/window-open.md)

### Modul untuk Proses Utama:

* [aplikasi](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [TampilanBrowser](api/browser-view.md)
* [JendelaBrowser](api/browser-window.md)
* [pelacakan konten](api/content-tracing.md)
* [dialog](api/dialog.md)
* [jalan pintas global](api/global-shortcut.md)
* [ipc Utama](api/ipc-main.md)
* [Menu](api/menu.md)
* [ItemMenu](api/menu-item.md)
* [bersih](api/net.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protokol](api/protocol.md)
* [sesi](api/session.md)
* [preferensiSistem](api/system-preferences.md)
* [Nampan](api/tray.md)
* [kontenWeb](api/web-contents.md)

### Modul untuk proses Renderer (halaman Web):

* [penangkapDesktop](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remot](api/remote.md)
* [webBingkai](api/web-frame.md)

### Modul untuk kedua proses:

* [clipboard](api/clipboard.md)
* [kerusakanReporter](api/crash-reporter.md)
* [gambarasli](api/native-image.md)
* [layar](api/screen.md)
* [kulit](api/shell.md)

## Pengembangan

* [Model coding](development/coding-style.md)
* [Menggunakan dentang-format pada kode C++ Code](development/clang-format.md)
* [Struktur direktori sumber kode](development/source-code-directory-structure.md)
* [Perbedaan teknis untuk NW.js (sebelumnya node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Membangun sistem Tinjauan](development/build-system-overview.md)
* [Membangun petunjuk (macOS)](development/build-instructions-osx.md)
* [Membangun petunjuk (Windows)](development/build-instructions-windows.md)
* [Membangun petunjuk (Linux)](development/build-instructions-linux.md)
* [Debug petunjuk (macOS)](development/debugging-instructions-macos.md)
* [Debug petunjuk (Windows)](development/debug-instructions-windows.md)
* [Setting Up Server simbol di debugger](development/setting-up-symbol-server.md)
* [Dokumentasi Styleguide](styleguide.md)
* [Meningkatkan Chrome](development/upgrading-chrome.md)
* [Kromium pengembangan](development/chromium-development.md)
* [Pengembangan V8](development/v8-development.md)