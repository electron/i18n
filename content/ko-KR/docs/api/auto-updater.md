# autoUpdater

> 애플리케이션이 자동으로 업데이트를 진행할 수 있도록 기능을 활성화합니다.

프로세스:[Main](../glossary.md#main-process)

`autoUpdater` 모듈은 [Squirrel](https://github.com/Squirrel) 프레임워크에 대한 인터페이스를 제공합니다.

다음 프로젝트 중 하나를 선택하여, 애플리케이션을 배포하기 위한 멀티-플랫폼 릴리즈 서버를 손쉽게 구축할 수 있습니다:

* [nuts](https://github.com/GitbookIO/nuts): *애플리케이션을 위한 똑똑한 릴리즈 서버이며 GitHub를 백엔드로 사용합니다. Squirrel을 통해 자동 업데이트를 지원합니다. (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *완벽하게 모든 기능을 지원하는 electron 애플리케이션을 위한 자가 호스트 릴리즈 서버입니다. autoUpdater와 호환됩니다.*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *GitHub 릴리즈를 사용하는 Squirrel.Mac 와 Squirrel.Windows를 위한 간단한 node.js 기반 서버입니다.*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *Squirrel을 위한 간단한 PHP 어플리케이션입니다. Windows which reads updates from a folder. Supports delta updates.*

## 플랫폼별 참고 사항

`autoUpdater`는 기본적으로 모든 플랫폼에 대해 같은 API를 제공하지만, 여전히 플랫폼별로 약간씩 다른 점이 있습니다.

### macOS

macOS에서는`autoUpdater`가 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac)를 기반으로 작동합니다. 따라서 이 모듈을 작동시키기 위해 특별히 준비해야 할 작업은 없습니다. 서버 사이드 요구 사항은[서버 지원](https://github.com/Squirrel/Squirrel.Mac#server-support)을 참고하세요. Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** macOS에서 자동 업데이트를 지원하려면 반드시 사인이 되어있어야 합니다. 이것은 `Squirrel.Mac`의 요구 사항입니다.

### Windows

Windows에선 `autoUpdater` 를 사용하기 전에 애플리케이션을 사용자의 장치에 설치해야 합니다. [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) 또는 [grunt-electron-installer](https://github.com/electron/grunt-electron-installer)를 사용하여 애플리케이션 인스톨러를 만드는 것을 권장합니다.

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

Squirrel로 생성된 인스톨러는 [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)와 함께 `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`으로 형식화된 바로가기 아이콘을 생성합니다. `com.squirrel.slack.Slack` 과 `com.squirrel.code.Code`가 그 예시입니다. `app.setAppUserModelId` API를 통해 애플리케이션 ID를 동일하게 유지해야 합니다. 그렇지 않으면 Windows 작업 표시줄에 애플리케이션을 고정할 때 제대로 적용되지 않을 수 있습니다.

Squirrel.Mac과 다르게, Windows는 S3 또는 다른 static file host에서 host updates를 할 수 있습니다. Squirrel.Windows의 동작에 대한 자세한 내용은 [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows)을 참고하세요.

### Linux

Linux는 따로 autoUpdater를 지원하지 않습니다. 각 배포판의 패키지 관리자를 통해 애플리케이션 업데이트를 제공하는 것을 권장합니다.

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

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (optional) - HTTP 요청 헤더.

`url`을 설정하고 자동 업데이터를 초기화합니다.

### `autoUpdater.getFeedURL()`

Returns `String` - 현재 업데이트 피드 URL.

### `autoUpdater.checkForUpdates()`

서버에 새로운 업데이트가 있는지 요청을 보내 확인합니다. API를 사용하기 전에 `setFeedURL`를 호출해야 합니다.

### `autoUpdater.quitAndInstall()`

애플리케이션을 다시 시작하고 다운로드된 업데이트를 설치합니다. 이메소드는 `update-downloaded` 이벤트가 발생한 이후에만 사용할 수 있습니다.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.