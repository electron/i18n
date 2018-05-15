# Panduan Resmi

Pastikan Anda menggunakan dokumen yang sesuai dengan versi Electron Anda. Nomor versi harus menjadi bagian dari URL halaman. Jika tidak, Anda mungkin menggunakan dokumentasi cabang pengembangan yang mungkin berisi perubahan API yang tidak kompatibel dengan versi Elektron Anda . Untuk melihat yang lebih tua versi dokumentasi, Anda bisa [telusuri menurut tag](https://github.com/electron/electron/tree/v1.4.0) di GitHub dengan membuka drop-down "Switch branches/tags" dan memilih tag yang cocok dengan versimu.

## Pertanyaan Umum

Ada banyak pertanyaan yang sering diajukan. Lihat ini sebelum membuat masalah:

* [Elektron FAQ](faq.md)

## Panduan dan Tutorial

* [Setting up the Development Environment](tutorial/development-environment.md) 
  * [Menyiapkan macOS](tutorial/development-environment.md#setting-up-macos)
  * [Menyiapkan Windows](tutorial/development-environment.md#setting-up-windows)
  * [Menyiapkan Linux](tutorial/development-environment.md#setting-up-linux)
  * [Memilih Editor](tutorial/development-environment.md#a-good-editor)
* [Membuat Aplikasi Pertama Anda](tutorial/first-app.md) 
  * [Memasang Elektron](tutorial/first-app.md#installing-electron)
  * [Pengembangan Elektron dalam Singkatnya](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Menjalankan Aplikasi Anda](tutorial/first-app.md#running-your-app)
* [Boilerplates dan CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Alat dan Boilerplate lainnya](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Application Architecture](tutorial/application-architecture.md) 
  * [Main and Renderer Processes](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Using Electron's APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Using Node.js APIs](tutorial/application-architecture.md#using-node.js-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Inter-Process Communication](tutorial/application-architecture.md#)
* Adding Features to Your App 
  * [pemberitahuan](tutorial/notifications.md)
  * [Recent Documents](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Cara pintas keyboard](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Aksesibilitas](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Mengaktifkan Aksesibilitas](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Debugging Proses Utama](tutorial/debugging-main-process.md)
  * [Menggunakan Selenium dan WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pengujian pada Sistem CI tanpa kepala (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Ekstensi DevTools](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Keamanan](tutorial/security.md) 
  * [Melaporkan Issue Baru](tutorial/security.md#reporting-security-issues)
  * [Masalah keamanan Kromium dan upgrade](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Peringatan Keamanan Elektronika](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Instalasi Global versus Lokal](tutorial/installation.md#global-versus-local-installation)
  * [Proxy](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Penyelesaian masalah](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Cabang Stabilisasi](tutorial/electron-versioning.md#stabilization-branches)
  * [Rilis Beta dan Perbaikan Bug](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Keterbatasan](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Rendering di luar layar](tutorial/offscreen-rendering.md)

* * *

* [Daftar Istilah](glossary.md)

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
* [BrowserWindow](api/browser-window.md)
* [pelacakan konten](api/content-tracing.md)
* [dialog](api/dialog.md)
* [jalan pintas global](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
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

Lihat <development/README.md>