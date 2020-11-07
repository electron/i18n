# Perangkat Resmi

Pastikan Anda menggunakan dokumen yang sesuai dengan versi Electron Anda. Nomor versi harus menjadi bagian dari URL halaman. Jika tidak, Anda mungkin menggunakan dokumentasi cabang pengembangan yang mungkin berisi perubahan API yang tidak kompatibel dengan versi Elektron Anda .

Untuk melihat yang lebih tua versi dokumentasi, Anda bisa [telusuri menurut tag](https://github.com/electron/electron/tree/v1.4.0) di GitHub dengan membuka drop-down "Switch branches/tags" dan memilih tag yang cocok dengan versimu.</p> 



## Pertanyaan Umum

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron FAQ](faq.md)



## Panduan dan Tutorial

* [Setting up the Development Environment](tutorial/development-environment.md) 
    * [Menyiapkan macOS](tutorial/development-environment.md#setting-up-macos)
  * [Menyiapkan Windows](tutorial/development-environment.md#setting-up-windows)
  * [Menyiapkan Linux](tutorial/development-environment.md#setting-up-linux)
  * [Memilih Editor](tutorial/development-environment.md#a-good-editor)
* [Membuat Aplikasi Pertama Anda](tutorial/quick-start.md) 
    * [Prasyarat](tutorial/quick-start.md#prerequisites)
  * [Create a basic application](tutorial/quick-start.md#create-a-basic-application)
  * [Package and distribute the application](tutorial/quick-start.md#package-and-distribute-the-application)
* [Boilerplates dan CLIs](tutorial/boilerplates-and-clis.md) 
    * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Alat dan Boilerplate lainnya](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Arsitektur Aplikasi](tutorial/quick-start.md#application-architecture) 
    * [Main and Renderer Processes](tutorial/quick-start.md#main-and-renderer-processes)
  * [Electron API](tutorial/quick-start.md#electron-api)
  * [Node.js API](tutorial/quick-start.md#nodejs-api)
  * [Menggunakan Modul Node.js Asli](tutorial/using-native-node-modules.md)
  * [Strategi dan Kinerja](tutorial/performance.md)
* Menambahkan Fitur ke Aplikasi Anda 
    * [Pemberitahuan](tutorial/notifications.md)
  * [Dokumen Terkini](tutorial/recent-documents.md)
  * [Progres Aplikasi](tutorial/progress-bar.md)
  * [Menu Dock Kustom](tutorial/macos-dock.md)
  * [Windows Taskbar Kustom](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Cara pintas keyboard](tutorial/keyboard-shortcuts.md)
  * [Deteksi Luring/Daring](tutorial/online-offline-events.md)
  * [File yang direpresentasikan untuk BrowserWindows macOS](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
  * [Rendering di luar layar](tutorial/offscreen-rendering.md)
  * [Dark Mode](tutorial/dark-mode.md)
  * [Web penyemat elektron](tutorial/web-embeds.md)
* [Aksesibilitas](tutorial/accessibility.md) 
    * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Manually Enabling Accessibility Features](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Pengujian dan Debugging](tutorial/application-debugging.md) 
    * [Debugging Proses Utama](tutorial/debugging-main-process.md)
  * [Debugging with Visual Studio Code](tutorial/debugging-vscode.md)
  * [Menggunakan Selenium dan WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pengujian pada Sistem CI tanpa kepala (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Ekstensi DevTools](tutorial/devtools-extension.md)
  * [Pengujian Otomatis dengan Driver Khusus](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribusi](tutorial/application-distribution.md) 
    * [Platform yang Didukung](tutorial/support.md#supported-platforms)
  * [Penandatanganan Kode](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Keamanan](tutorial/security.md) 
    * [Melaporkan Issue Baru](tutorial/security.md#reporting-security-issues)
  * [Masalah keamanan Kromium dan upgrade](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Peringatan Keamanan Elektron](tutorial/security.md#electron-security-warnings)
  * [Daftar Periksa Keamanan](tutorial/security.md#checklist-security-recommendations)
* [Pembaruan](tutorial/updates.md) 
    * [Menerapkan Server Pembaruan](tutorial/updates.md#deploying-an-update-server)
  * [Menerapkan pembaruan di aplikasi Anda](tutorial/updates.md#implementing-updates-in-your-app)
  * [Menerapkan Pembaruan](tutorial/updates.md#applying-updates)
* [Mendapat Dukungan](tutorial/support.md)



## Tutorial Rinci

Tutorial individu ini memperluas topik yang dibahas dalam panduan di atas.

* [Memasang Elektron](tutorial/installation.md) 
    * [Proxy](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Penyelesaian masalah](tutorial/installation.md#troubleshooting)
* Rilis Electron & Developer Feedback 
    * [Kebijakan Pembuatan Versi](tutorial/electron-versioning.md)
  * [Garis Waktu Rilis](tutorial/electron-timelines.md)
* [Pengemasan Sumber Kode Aplikasi dengan asar](tutorial/application-packaging.md) 
    * [Menghasilkan Arsip asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Menggunakan Arsip asar](tutorial/application-packaging.md#using-asar-archives)
  * [Keterbatasan](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Menambahkan File yang Belum Dikemas ke Arsip asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Pengetesan Widevine CDM](tutorial/testing-widevine-cdm.md)



---

* [Daftar Istilah](glossary.md)



## Referensi API

* [Ringkasan](api/synopsis.md)
* [Proses objek](api/process.md)
* [Sakelar Baris Perintah yang Didukung](api/command-line-switches.md)
* [Variabel Lingkungan](api/environment-variables.md)
* [Dukungan Ekstensi Chrome](api/extensions.md)
* [Perubahan API yang dapat menyebabkan gangguan](breaking-changes.md)



### Elemen DOM Khusus:

* [`File` Objek](api/file-object.md)
* [`<webview>`Tag](api/webview-tag.md)
* [`window.open` fungsi](api/window-open.md)
* [Objek `BrowserWindowProxy`](api/browser-window-proxy.md)



### Modul untuk Proses Utama:

* [aplikasi](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [TampilanBrowser](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [pelacakan konten](api/content-tracing.md)
* [dialog](api/dialog.md)
* [jalan pintas global](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipc Utama](api/ipc-main.md)
* [Menu](api/menu.md)
* [ItemMenu](api/menu-item.md)
* [bersih](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Pemberitahuan](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protokol](api/protocol.md)
* [layar](api/screen.md)
* [sesi](api/session.md)
* [preferensiSistem](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Nampan](api/tray.md)
* [konten web](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)



### Modul untuk proses Renderer (halaman Web):

* [penangkapDesktop](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remot](api/remote.md)
* [webBingkai](api/web-frame.md)



### Modul untuk kedua proses:

* [clipboard](api/clipboard.md)
* [kerusakanReporter](api/crash-reporter.md)
* [gambarasli](api/native-image.md)
* [kulit](api/shell.md)



## Pengembangan

Lihat [development/README.md](development/README.md)
