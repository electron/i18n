Lütfen, Electron sürümünüzle eşleşen belgeleri kullandığınızdan, emin olunuz. Sürüm numarası, sayfa URL'inin bir parçası olmalıdır. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. To view older versions of the documentation, you can [browse by tag](https://github.com/electron/electron/tree/v1.4.0) on GitHub by opening the "Switch branches/tags" dropdown and selecting the tag that matches your version.

## SSS

Sıklıkla sorulan sorular vardır. Bir sorun oluşturmadan önce bakınız:

* [Electron SSS](faq.md)

## Kılavuzlar

* [Terimler Sözlüğü](glossary.md)
* [Desteklenen Platformlar](tutorial/supported-platforms.md)
* [Güvenlik](tutorial/security.md)
* [Sürüm](tutorial/electron-versioning.md)
* [Uygulama Dağıtımı](tutorial/application-distribution.md)
* [Mac App Store'a Gönderme Kılavuzu](tutorial/mac-app-store-submission-guide.md)
* [Windows Uygulama Mağazası'na Gönderme Kılavuzu](tutorial/windows-store-guide.md)
* [Uygulama Paketleme](tutorial/application-packaging.md)
* [Yerel Düğüm Modüllerini Kullanmak](tutorial/using-native-node-modules.md)
* [Ana İşlem Hata Ayıklama](tutorial/debugging-main-process.md)
* [Selenyum ve WebDriver Kullanma](tutorial/using-selenium-and-webdriver.md)
* [DevTools Eklentisi](tutorial/devtools-extension.md)
* [Pepper Flash Eklentisini Kullanma](tutorial/using-pepper-flash-plugin.md)
* [Widevine CDM Eklentisini Kullanma](tutorial/using-widevine-cdm-plugin.md)
* [Headless CI Sistemlerinde (Travis, Jenkins) Test Etme](tutorial/testing-on-headless-ci.md)
* [Ekran Dışı İşleme](tutorial/offscreen-rendering.md)
* [Klavye Kısayolları](tutorial/keyboard-shortcuts.md)
* [Uygulamaları Güncelleme](tutorial/updates.md)

## Eğitimler

* [Hızlı Başlangıç](tutorial/quick-start.md)
* [Masaüstü Ortam Entegrasyonu](tutorial/desktop-environment-integration.md)
* [Çevrimiçi/Çevrimdışı Olay Algılama](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Yerel Bildirimler](tutorial/notifications.md)

## API Referansları

* [Konu Özeti](api/synopsis.md)
* [İşlem Nesnesi](api/process.md)
* [Desteklenen Chrome Komut Satırı Anahtarları](api/chrome-command-line-switches.md)
* [Ortam Değişkenleri](api/environment-variables.md)

### Özel DOM Elementleri:

* [`Dosya` Nesne](api/file-object.md)
* [`<webview>`Etiket](api/webview-tag.md)
* [`window.open` Fonksiyon](api/window-open.md)

### Ana Süreç İçin Modüller:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### Oluşturma Süreci (Web Sayfası) İçin Modüller:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Her İki Süreç Modülleri:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Geliştirme

* [Kodlama Stili](development/coding-style.md)
* [C++ Kodunda Clang-Format Kullanma](development/clang-format.md)
* [Kaynak Kodu Dizin Yapısı](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Sistem Genel Bakışı Oluşturma](development/build-system-overview.md)
* [İnşaa Talimatları (macOS)](development/build-instructions-osx.md)
* [İnşaa Talimatları (Windows)](development/build-instructions-windows.md)
* [İnşaa Talimatları (Linux)](development/build-instructions-linux.md)
* [Hata Ayıklama Talimatları (macOS)](development/debugging-instructions-macos.md)
* [Hata Ayıklama Talimatları (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Stil Kılavuz Dokümantasyonu](styleguide.md)
* [Chrome Yükseltme](development/upgrading-chrome.md)
* [Chromium Geliştirme](development/chromium-development.md)
* [V8 Geliştirme](development/v8-development.md)