# autoUpdater

> 애플리케이션이 자동으로 업데이트를 진행할 수 있도록 기능을 활성화합니다.

프로세스:[Main](../glossary.md#main-process)

**You can find a detailed guide about how to implement updates into your application [here](../tutorial/updates.md).**

## Platform Notices

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

In addition, there are some subtle differences on each platform:

### macOS

macOS에서는`autoUpdater`가 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac)를 기반으로 작동합니다. 따라서 이 모듈을 작동시키기 위해 특별히 준비해야 할 작업은 없습니다. 서버 사이드 요구 사항은[서버 지원](https://github.com/Squirrel/Squirrel.Mac#server-support)을 참고하세요. Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** macOS에서 자동 업데이트를 지원하려면 반드시 사인이 되어있어야 합니다. 이것은 `Squirrel.Mac`의 요구 사항입니다.

### Windows

Windows에선 `autoUpdater` 를 사용하기 전에 애플리케이션을 사용자의 장치에 설치해야 합니다. [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) 또는 [grunt-electron-installer](https://github.com/electron/grunt-electron-installer)를 사용하여 애플리케이션 인스톨러를 만드는 것을 권장합니다.

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

Squirrel로 생성된 인스톨러는 [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)와 함께 `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`으로 형식화된 바로가기 아이콘을 생성합니다. `com.squirrel.slack.Slack` 과 `com.squirrel.code.Code`가 그 예시입니다. `app.setAppUserModelId` API를 통해 애플리케이션 ID를 동일하게 유지해야 합니다. 그렇지 않으면 Windows 작업 표시줄에 애플리케이션을 고정할 때 제대로 적용되지 않을 수 있습니다.

Squirrel.Mac과 다르게, Windows는 S3 또는 다른 static file host에서 host updates를 할 수 있습니다. Squirrel.Windows의 동작에 대한 자세한 내용은 [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows)을 참고하세요.

## 이벤트

`autoUpdater` 객체는 다음과 같은 이벤트를 발생시킵니다:

### Event: 'error'

Returns:

* `error` Error

업데이트에 문제가 생기면 발생하는 이벤트입니다.

### Event: 'checking-for-update'

업데이트를 확인하기 시작할 때 발생하는 이벤트입니다.

### Event: 'update-available'

사용 가능한 업데이트가 있을 때 발생하는 이벤트입니다. 이벤트는 자동으로 다운로드 됩니다.

### Event: 'update-not-available'

사용 가능한 업데이트가 없을 때 발생하는 이벤트입니다.

### Event: 'update-downloaded'

반환:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

업데이트의 다운로드가 완료되었을 때 발생하는 이벤트입니다.

Windows에서는 `releaseName`만 사용이 가능합니다.

## 메소드

`autoUpdater` 객체에서 사용할 수 있는 메서드입니다:

### `autoUpdater.setFeedURL(options)`

* `options` Object 
  * `url` String
  * `headers` Object (optional) *macOS* - HTTP request headers.
  * `serverType` String (optional) *macOS* - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

`url`을 설정하고 자동 업데이터를 초기화합니다.

### `autoUpdater.getFeedURL()`

Returns `String` - 현재 업데이트 피드 URL.

### `autoUpdater.checkForUpdates()`

서버에 새로운 업데이트가 있는지 요청을 보내 확인합니다. API를 사용하기 전에 `setFeedURL`를 호출해야 합니다.

### `autoUpdater.quitAndInstall()`

애플리케이션을 다시 시작하고 다운로드된 업데이트를 설치합니다. 이메소드는 `update-downloaded` 이벤트가 발생한 이후에만 사용할 수 있습니다.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** If the application is quit without calling this API after the `update-downloaded` event has been emitted, the application will still be replaced by the updated one on the next run.