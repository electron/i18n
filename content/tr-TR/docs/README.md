Lütfen, Electron sürümünüzle eşleşen belgeleri kullandığınızdan, emin olunuz. Sürüm numarası, sayfa URL'inin bir parçası olmalıdır. Eğer değilse, muhtemelen kullandığınız bir geliştirme dal dokümantasyonu, Electron sürümünüzle uyumlu olmayan API değişikliklerini içeriyor olabilir. Dokümantasyonun eski sürümlerini görüntülemek için, [etikete göre gözatın](https://github.com/electron/electron/tree/v1.4.0) ile GitHub'da "Switch branches/tags" seçeneklerini açarak, sürümünüzle eşleşen etiketi seçebilirsiniz.

## SSS

Sıklıkla sorulan sorular vardır. Bir sorun oluşturmadan önce bakınız:

* [Electron SSS](faq.md)

## Kılavuzlar

* [Terimler Sözlüğü](glossary.md)
* [Desteklenen Platformlar](tutorial/supported-platforms.md)
* [Güvenlik](tutorial/security.md)
* [Versiyonlama](tutorial/electron-versioning.md)
* [Uygulama Dağıtımı](tutorial/application-distribution.md)
* [Mac App Store'a Gönderme Kılavuzu](tutorial/mac-app-store-submission-guide.md)
* [Windows Uygulama Mağazası'na Gönderme Kılavuzu](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
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

* [`File` Nesne](api/file-object.md)
* [`<webview>`Etiket](api/webview-tag.md)
* [`window.open` Fonksiyonu](api/window-open.md)

### Ana Süreç İçin Modüller:

* [uygulama](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [diyalog](api/dialog.md)
* [evrenselKısayol](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [ağ](api/net.md)
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
* [uzak](api/remote.md)
* [webFrame](api/web-frame.md)

### Her İki Süreç Modülleri:

* [pano](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Geliştirme

* [Kodlama Stili](development/coding-style.md)
* [C++ Kodunda Clang-Format Kullanma](development/clang-format.md)
* [Test Etme](development/testing.md)
* [Kaynak Kodu Dizin Yapısı](development/source-code-directory-structure.md)
* [NW.js (eski adı node-webkit)'le Teknik Farklılıkları](development/atom-shell-vs-node-webkit.md)
* [Sistem Genel Bakışı Oluşturma](development/build-system-overview.md)
* [İnşaa Talimatları (macOS)](development/build-instructions-osx.md)
* [İnşaa Talimatları (Windows)](development/build-instructions-windows.md)
* [İnşaa Talimatları (Linux)](development/build-instructions-linux.md)
* [Hata Ayıklama Talimatları (macOS)](development/debugging-instructions-macos.md)
* [Hata Ayıklama Talimatları (Windows)](development/debug-instructions-windows.md)
* [Hata Ayıklayıcı'daki Sembol Sunucu Kurulumu](development/setting-up-symbol-server.md)
* [Stil Kılavuz Dokümantasyonu](styleguide.md)
* [Chromium yükseltiliyor](development/upgrading-chromium.md)
* [Chromium Geliştirme](development/chromium-development.md)
* [V8 Geliştirme](development/v8-development.md)