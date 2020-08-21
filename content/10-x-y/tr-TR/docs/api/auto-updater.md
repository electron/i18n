# autoUpdater

> Uygulamaları kendiliğinden güncelleme yapmak için etkinleştirin.

İşlem: [Ana](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter][event-emitter].

## Platform Bildirimleri

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Buna ek olarak, bu platformlarda bazı ufak farklar vardır:

### macOS

MacOS'ta, `autoUpdater` modulü [Squirrel][squirrel-mac] üzerine kurulmuştur. Mac'in anlamı onu çalışabilir yapmak için herhangi bir özel kuruma ihtiyacınız yok demektir. Sunucu tarafı gereksinimleri için [Sunucu desteği][server-support] okuyabilirsiniz. [Uygulama Aktarım Katmanı Güvenliği](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35)'nin (ATS) güncelleştirme işleminin bir parçası olarak yapılan tüm istekler için geçerli olduğunu unutmayın. Uygulamalar plist'lerine `NSAllowsArbitraryLoads` anahtarını ekleyerek ATS'nin devre dışı kalmasını sağlamalıdır.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). Ayrıca, uygulamanız için masaüstü kısayolları almak için [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) 'ı kullanmanız önerilir.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. Uygulamanız için `app.setAppUserModelId` API ile aynı ID'yi kullanmanız gerekiyor, aksi halde Windows görev çubuğunda uygulamanızı doğru bir şekilde sabitleyemeyecektir.

Squirrel.Mac'ten farklı olarak, Windows güncelleştirmeleri S3'te veya diğer herhangi bir statik dosya ana sisteminde tutabilir. You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

## Events

`autoUpdater` nesnesi aşağıdaki olaylarla ortaya çıkarır:

### Olay: 'error'

Returns:

* `error` Error

Güncelleştirilirken bir hata olduğunda ortaya çıkan.

### Event: 'checking-for-update'

Bir güncellemenin başlatılıp başlatılmadığını kontrol ederken ortaya çıkan.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Olay: 'update-not-available'

Mevcut bir güncelleme yokken ortaya çıkan.

### Event: 'update-downloaded'

Dönüşler:

* `olay` Olay
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Bir güncelleme indirildiğinde ortaya çıkan.

Windows üzerinde yalnızca `releaseName` kullanılabilir.

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Event: 'before-quit-for-update'

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

## Metodlar

`autoUpdater` nesnesi aşağıdaki yöntemleri içerir:

### `autoUpdater.setFeedURL(seçenekler)`

* `options` Object
  * `url` Dize
  * `headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

`url`'i belirler ve otomatik güncelleyici başlar.

### `autoUpdater.getFeedURL()`

`String`'i geri döndürür - Geçerli olan akış URL'ini günceller.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

** Not: **Bir güncelleme uygulamak bu metodu çağırmak kesinlikle gerekli değildir, Başarılı bir şekilde indirilmiş bir güncelleme uygulamanın bir sonraki başlatılmasında yinede devreye girecektir.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
