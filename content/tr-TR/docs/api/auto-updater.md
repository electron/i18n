# autoUpdater

> Kendiliğinden güncelleme yapmak için uygulamaları etkinleştirin.

Süreç: [Ana](../glossary.md#main-process)

`autoUpdater` modülü [Squirrel](https://github.com/Squirrel) frameworkü için bir arayüz sağlar.

Bu projelerden birini kullanarak uygulamanızı dağıtmak için bir çoklu platform yayın sunucusunu hızlı bir şekilde başlatabilirsiniz:

* [nuts](https://github.com/GitbookIO/nuts): *Uygulamalarınız için bir akıllı serbest bırakma sunucusudur ve Github'ı backend olarak kullanır. Squirrel ile otomatik güncelleştirmeler (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *Tam özellikli, elektron uygulamaları için kendinden barındırmalı serbest bırakma sunucusu, otomatik güncelleme ile uyumludur.*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *Squirrel için basit bir node.js sunucusu. Mac ve Squirrel. Windows için GitHub sürümleri kullanılıyor*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): * Squirrel için basit bir PHP uygulamasıdır. Windows güncelleştirmeleri bir klasörden okur. Delta güncelleştirmeleri destekler.*

## Platform bildirimleri

`autoUpdater` farklı platformlar için tekdüze bir API sağlamasına rağmen hala her platformda ince farklılıklar vardır.

### macOS

MacOS'ta, `autoUpdater` modulü [Squirrel](https://github.com/Squirrel/Squirrel.Mac) üzerine kurulmuştur. Mac'in anlamı onu çalışabilir yapmak için herhangi bir özel kuruma ihtiyacınız yok demektir. Sunucu tarafı gereksinimleri için [Sunucu desteği](https://github.com/Squirrel/Squirrel.Mac#server-support) okuyabilirsiniz. [Uygulama Aktarım Katmanı Güvenliği](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35)'nin (ATS) güncelleştirme işleminin bir parçası olarak yapılan tüm istekler için geçerli olduğunu unutmayın. Uygulamalar plist'lerine `NSAllowsArbitraryLoads` anahtarını ekleyerek ATS'nin devre dışı kalmasını sağlamalıdır.

**Not:** macOS'ta uygulamanız otomatik güncelleştirmeler için onaylı olmalıdır. Bu `Squirrel.Mac`'nin bir gereksinimidir.

### Windows

Windows'ta `autoUpdater`'ı kullanmadan önce uygulamanızı bir kullanıcının makinesine yüklemeniz gerekir. Bu nedenle Windows yükleyici paketi oluşturmak için [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) veya [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) kullanılması önerilir.

[electron-winstaller](https://github.com/electron/windows-installer) veya [electron-forge](https://github.com/electron-userland/electron-forge) kullanırken uygulamanız [ilk çalıştığında ](https://github.com/electron/windows-installer#handling-squirrel-events)güncellenmeye çalışmadığından emin olun ([Ayrıca daha fazla bilgi için buna bakın](https://github.com/electron/electron/issues/7155)). Ayrıca, uygulamanız için masaüstü kısayolları almak için [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) 'ı kullanmanız önerilir.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

### Linux

There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

## Events

The `autoUpdater` object emits the following events:

### Event: 'error'

Returns:

* `error` Error

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

Returns:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Methods

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.