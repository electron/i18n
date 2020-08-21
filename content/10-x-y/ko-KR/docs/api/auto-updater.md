# autoUpdater

> 애플리케이션이 자동으로 업데이트를 진행할 수 있도록 기능을 활성화합니다.

프로세스: [Main](../glossary.md#main-process)

**참고 자료: [애플리케이션에 업데이트를 구현하는 방법에 대한 자세한 가이드](../tutorial/updates.md).**

`autoUpdater`는 [EventEmitter][event-emitter]입니다.

## 플랫폼별 주의사항

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

또한 각 플랫폼별 약간의 차이가 있습니다:

### macOS

macOS에서는`autoUpdater`가 [Squirrel.Mac][squirrel-mac]를 기반으로 작동합니다. 따라서 이 모듈을 작동시키기 위해 특별히 준비해야 할 작업은 없습니다. 서버 사이드 요구 사항은[서버 지원][server-support]을 참고하세요. Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. `app.setAppUserModelId` API를 통해 애플리케이션 ID를 동일하게 유지해야 합니다. 그렇지 않으면 Windows 작업 표시줄에 애플리케이션을 고정할 때 제대로 적용되지 않을 수 있습니다.

Squirrel.Mac과 다르게, Windows는 S3 또는 다른 static file host에서 host updates를 할 수 있습니다. You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

## Events

`autoUpdater` 객체는 다음과 같은 이벤트를 발생시킵니다:

### Event: 'error'

Returns:

* `error` Error

업데이트에 문제가 생기면 발생하는 이벤트입니다.

### Event: 'checking-for-update'

업데이트를 확인하기 시작할 때 발생하는 이벤트입니다.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

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

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Event: 'before-quit-for-update'

이 이벤트는 사용자가 `quitAndInstall()`을 호출한 뒤에 발생합니다.

이 API가 호출되면, `before-quit` 이벤트는 모든 창이 닫기 전까지 발생되지 않습니다. 결과적으로 프로세스가 종료되는 동안 창을 닫기 전에 `before-quit`의 수신을 대기하고 작업을 수행하려면 이 이벤트의 수신을 대기해야합니다.

## 메소드

`autoUpdater` 객체에서 사용할 수 있는 메서드입니다:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Record<String, String> (optional) _macOS_ - HTTP 요청 헤더.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

`url`을 설정하고 자동 업데이터를 초기화합니다.

### `autoUpdater.getFeedURL()`

Returns `String` - 현재 업데이트 피드 URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

`autoUpdater.quitAndInstall()`를 호출하면 모든 windows를 먼저 닫고 모든 window를 닫기 전에 자동으로 `app.quit()`를 호출합니다.

**주의:** 다음에 응용 프로그램을 시작할 때 성공적으로 다운로드된 업데이트가 항상 적용되므로 업데이트를 적용하기 위해 이 함수를 반드시 호출할 필요는 없습니다.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
