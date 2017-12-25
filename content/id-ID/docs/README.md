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
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Modules for the Renderer Process (Web Page):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules for Both Processes:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Development

* [Coding Style](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [Source Code Directory Structure](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Build System Overview](development/build-system-overview.md)
* [Build Instructions (macOS)](development/build-instructions-osx.md)
* [Build Instructions (Windows)](development/build-instructions-windows.md)
* [Build Instructions (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Upgrading Chrome](development/upgrading-chrome.md)
* [Chromium Development](development/chromium-development.md)
* [V8 Development](development/v8-development.md)