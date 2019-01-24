# Resmi Rehberler

Lütfen, Electron sürümünüzle eşleşen belgeleri kullandığınızdan, emin olunuz. Sürüm numarası, sayfa URL'inin bir parçası olmalıdır. Eğer değilse, muhtemelen kullandığınız bir geliştirme dal dokümantasyonu, Electron sürümünüzle uyumlu olmayan API değişikliklerini içeriyor olabilir. Dokümantasyonun eski sürümlerini görüntülemek için, [etikete göre gözatın](https://github.com/electron/electron/tree/v1.4.0) ile GitHub'da "Switch branches/tags" seçeneklerini açarak, sürümünüzle eşleşen etiketi seçebilirsiniz.

## SSS

Sıklıkla sorulan sorular vardır. Bir sorun oluşturmadan önce bakınız:

* [Electron SSS](faq.md)

## 1 whan to business in online application

* [Geliştirme Ortamını Kurmak](tutorial/development-environment.md) 
  * [MacOS İçin Kurulum](tutorial/development-environment.md#setting-up-macos)
  * [Linux İçin Kurulum](tutorial/development-environment.md#setting-up-windows)
  * [Linux İçin Kurulum](tutorial/development-environment.md#setting-up-linux)
  * [Bir Editör Seçme](tutorial/development-environment.md#a-good-editor)
* [İlk Uygulamanızı Oluşturma](tutorial/first-app.md) 
  * [Electron'u Yükleme](tutorial/first-app.md#installing-electron)
  * [Özetçe Elektron için Geliştirme](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Uygulamanızı Çalıştırma](tutorial/first-app.md#running-your-app)
* [Demirbaşlar ve KSA'lar](tutorial/boilerplates-and-clis.md) 
  * [Demirbaş KSA'a Karşı](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Diğer Araçlar ve Demirbaşlar](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Uygulama Mimarisi](tutorial/application-architecture.md) 
  * [Ana ve Oluşturucu İşlemleri](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Electron API'lerini Kullanma](tutorial/application-architecture.md#using-electron-apis)
  * [Node.js API'lerini Kullanma](tutorial/application-architecture.md#using-nodejs-apis)
  * [Yerli Node.js Modüllerini Kullanma](tutorial/using-native-node-modules.md)
* Uygulamanıza Özellikler Ekleme 
  * [Bildirimler](tutorial/notifications.md)
  * [Son Günlerdeki Dokümanlar](tutorial/desktop-environment-integration.md#recent-documents)
  * [Uygulama İlerleyişi](tutorial/progress-bar.md)
  * [Özel Dock Menü](tutorial/macos-dock.md)
  * [Özel Windows Görev Çubuğu](tutorial/windows-taskbar.md)
  * [Özel Linux Masaüstü Eylemleri](tutorial/linux-desktop-actions.md)
  * [Klavye Kısayolları](tutorial/keyboard-shortcuts.md)
  * [Çevrimdışı/Çevrimiçi Algılama](tutorial/online-offline-events.md)
  * [MacOS BrowserWindows için temsil edilen dosya](tutorial/represented-file.md)
  * [Yerel dosya sürükle & bırak](tutorial/native-file-drag-drop.md)
* [Erişilebilirlik](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Erişilebilirliği Etkinleştirmek](tutorial/accessibility.md#enabling-accessibility)
* [Test ve Hata Ayıklama](tutorial/application-debugging.md) 
  * [Ana İşlem Hata Ayıklama](tutorial/debugging-main-process.md)
  * [Selenyum ve WebDriver Kullanma](tutorial/using-selenium-and-webdriver.md)
  * [Headless CI Sistemlerinde (Travis, Jenkins) Test Etme](tutorial/testing-on-headless-ci.md)
  * [DevTools Eklentisi](tutorial/devtools-extension.md)
  * [Özel Bir Sürücü ile Otomatik Test](tutorial/automated-testing-with-a-custom-driver.md)
* Paketleme 
  * [Kod İmzalama](tutorial/code-signing.md)
* [Yayınlama](tutorial/application-distribution.md) 
  * [Destek](tutorial/support.md)
  * [Mac Uygulama Mağazası](tutorial/mac-app-store-submission-guide.md)
  * [Windows Mağaza](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Güvenlik](tutorial/security.md) 
  * [Güvenlik sorunlarını raporlama](tutorial/security.md#reporting-security-issues)
  * [Chromium Güvenlik Sorunları ve Yükseltmeleri](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Güvenlik Uyarıları](tutorial/security.md#electron-security-warnings)
  * [Güvenlik Kontrol Listesi](tutorial/security.md#checklist-security-recommendations)
* [Güncellemeler](tutorial/updates.md) 
  * [Güncelleme Sunucusunu Dağıtma](tutorial/updates.md#deploying-an-update-server)
  * [Uygulama içerisinde güncellemeleri yapmak](tutorial/updates.md#implementing-updates-in-your-app)
  * [Güncellemeleri Uygulama](tutorial/updates.md#applying-updates)

## Detaylı Öğreticiler

Bu bireysel eğitimler, yukardaki kılavuz üzerinde tartışılan konularda genişler.

* [Ayrıntılı olarak: Electron Yüklemek](tutorial/installation.md) 
  * [Vekil Sunucular](tutorial/installation.md#proxies)
  * [Özel Aynalar ve Önbellekler](tutorial/installation.md#custom-mirrors-and-caches)
  * [Arıza giderme](tutorial/installation.md#troubleshooting)
* [Ayrıntılı olarak: Electron'un sürüm şeması](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Dengeleme Dalları](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Bültenleri ve Hata Düzeltmeleri](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [Ayrıntılı olarak: asar ile App Kaynak Kodu Paketlemek](tutorial/application-packaging.md) 
  * [asar Arşivleri Üretmek](tutorial/application-packaging.md#generating-asar-archives)
  * [Arşivleri asar kullanma](tutorial/application-packaging.md#using-asar-archives)
  * [Kısıtlamalar](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [asar Arşivlerine Paketlenmemiş Dosyaları Eklemek](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Ayrıntılı olarak: Widevine CDM Sınamak](tutorial/testing-widevine-cdm.md)
* [Ayrıntılı olarak: Pepper Flash Eklentisi Kullanmak](tutorial/using-pepper-flash-plugin.md)
* [Ekran Dışı İşleme](tutorial/offscreen-rendering.md)

* * *

* [Terimler Sözlüğü](glossary.md)

## API Referansları

* [Konu Özeti](api/synopsis.md)
* [İşlem Nesnesi](api/process.md)
* [Desteklenen Chrome Komut Satırı Anahtarları](api/chrome-command-line-switches.md)
* [Ortam Değişkenleri](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### Özel DOM Elementleri:

* [`File` Nesne](api/file-object.md)
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
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
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

Bakınız <development/README.md>