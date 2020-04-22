# app

> application의 이벤트 생명주기를 제어합니다.

프로세스: [Main](../glossary.md#main-process)

다음은 마지막 윈도우를 닫을 때 애플리케이션도 종료하는 예시입니다.

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## 이벤트

app 객체는 다음과 같은 이벤트를 가지고 있습니다:

### 이벤트: 'will-finish-launching'

애플리케이션이 기본적인 시작 준비를 마치면 발생하는 이벤트입니다. Windows, Linux 운영체제에서 `will-finish-launching` 이벤트는 `ready` 이벤트와 동일합니다. macOS에서 이벤트는 `NSApplication`의 `applicationWillFinishLaunching`에 대한 알림으로 표현됩니다. 대개 이곳에서 `open-file`과 `open-url` 이벤트 리스너를 설정하고 crash reporter와 auto updater를 시작합니다.

대부분의 경우, 모든 것을 `ready` 이벤트 핸들러 안에서 해결해야 합니다.

### 이벤트: 'ready'

Returns:

* `launchInfo` 객체 _macOS_

Electron이 초기화를 끝냈을 때 발생하는 이벤트입니다. macOS에서는 알림 센터를 통해 앱이 시작된 경우 `launchInfo`에 앱을 여는데 사용된 `NSUserNotification`의 `userInfo`가 할당됩니다. `app.isReady()`를 사용해서 event가 해제되었는지 확인할 수 있습니다.

### 이벤트: 'window-all-closed'

모든 윈도우를 닫을 때 발생 합니다.

이 이벤트를 구독하지 않고 모든 창이 닫혀있다면, 기본 동작은 앱을 종료시키는 것입니다. 그러나 당신이 이벤트를 구독한다면, 당신은 종료할지 안할지를 제어할 수 있습니다. 만약 사용자가 `Cmd + Q` 를 누르거나, 또는 개발자가 `app.quit()`을 호출 한다면, Electron은 첫번째로 모든 창을 닫을 것이고, 그 다음은 `will-quit` 이벤트를 발생시킬 것입니다. 그리고 이 경우는 `window-all-closed` 이벤트를 발생시키지 않을 것입니다.

### 이벤트: 'before-quit'

Returns:

* `event` Event

Emitted before the application starts closing its windows. `event.preventDefault()`를 호출하면 기본 동작의 수행 (애플리케이션 종료) 을 막습니다.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'will-quit'

Returns:

* `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

`will-quit` 와 `window-all-closed` 이벤트들의 차이점에 대해서는 `window-all-closed`이벤트 설명을 참조하세요.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'quit'

반환:

* `event` Event
* `exitCode` Integer

어플리케이션을 종료할 때 발생된다.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'open-file' _macOS_

Returns:

* `event` Event
* `path` String

사용자가 파일을 열려 할 때 송출됩니다. 주로 `open-file` 이벤트는 OS가 이미 열려있는 파일을 재사용하려 할 때에 송출됩니다. 또한, `open-file` 이벤트는 애플리케이션이 아직 실행되기 전에 파일을 드래그/드롭 했을 경우에도 발생합니다. 따라서 이러한 경우를 핸들링하기 위해서는 애플리케이션의 이른 초기화 단계에서 미리 `open-file` 이벤트를 구독하고 있어야 합니다. (`ready` 이벤트보다도 먼저 발생할 수 있습니다.)

이 이벤트를 처리하려면 `event.preventDefault()`를 호출해야 합니다.

윈도우에서, `process.argv`를 통해서 열기를 시도하는 파일의 경로를 얻어올 수 있습니다. (단, 메인 프로세스에서만 가능합니다.)

### Event: 'open-url' _macOS_

Returns:

* `event` Event
* `url` String

사용자가 애플리케이션을 URL과 함께 열었을 때 발생합니다. 반드시 애플리케이션의 `Info.plist`파일에서 URL scheme을 `CFBundleURLTypes`키에서 정의하고 있어야 합니다. 또, `NSPrincipalClass`의 값이 `AtomApplication`으로 설정되어 있어야 합니다.

이 이벤트를 처리하려면 `event.preventDefault()`를 호출해야 합니다.

### 이벤트: 'activate' _macOS_

Returns:

* `event` Event
* `hasVisibleWindows` Boolean

애플리케이션이 활성화될 때 발생합니다. 여러 가지 행동이 이 이벤트를 발생시킬 수 있습니다. 예를 들어, 처음 애플리케이션을 실행할 때, 애플리케이션을 실행 중이지만 또 다시 실행할 때, 또는 애플리케이션의 독이나 작업표시줄 아이콘을 클릭할 때 등이 있습니다.

### 이벤트: 'continue-activity' _macOS_

Returns:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` 객체 - 다른 장치에서의 동작에 의한 app-specific 상태를 가지고 있습니다.

다른 기기에서의 작업을 가져와서 이어서 진행하려는 경우, [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 도중에 발생합니다. 이 이벤트를 핸들링하려면 `event.preventDefault()`를 반드시 호출해야합니다.

사용자 행동이 애플리케이션에서 이어지기 위해서는 반드시 행동 소스 앱과 같은 개발팀 ID를 가지고 있어야 하고, 해당 행동 타입을 지원하고 있어야 합니다. 지원되는 행동 타입은 앱의 `Info.plist` 내부의 `NSUserActivityTypes` 키에서 확인할 수 있습니다.

### 이벤트: 'will-continue-activity' _macOS_

Returns:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)중 다른 디바이스로부터 액티비티를 계속하려고 하기 직전에 발생합니다. 이 이벤트를 핸들링하려면 `event.preventDefault()`를 반드시 호출해야합니다.

### 이벤트: 'continue-activity-error' _macOS_

Returns:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `error` String - 에러의 변역된 설명 문자열

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 도중에 다른 장치의 작업을 다시 시작할 수 없을 때 발생합니다.

### 이벤트: 'activity-was-continued' _macOS_

Returns:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` 객체 - 액티비티가 저장한 app-specific 상태를 가지고 있습니다.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)중인 디바이스의 액티비티를, 다른 디바이스에서 계속하는 데 성공한 뒤 발생합니다.

### 이벤트: 'update-activity-state' _macOS_

Returns:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` 객체 - 액티비티가 저장한 app-specific 상태를 가지고 있습니다.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)가 다른 기기에서 재시작될 때 발생합니다. 송신된 정보를 업데이트할 필요가 있다면, 즉시 `event.preventDefault()`를 호출해주십시오. 그리고, 새 `userInfo` 딕셔너리를 구성하여, `app.updateCurrentActivity()`를 시의적절하게 호출해주십시오. 그렇지 않으면 명령이 실패하여, `continue-activity-error` 가 호출됩니다.

### 이벤트: 'new-window-for-tab' _macOS_

Returns:

* `event` Event

사용자가 macOS 기본 새 탭 버튼을 클릭했을 때 발생합니다. 현재 `BrowserWindow`에 `tabbingIdentifier`가 있을 때만 새 탭 버튼이 보입니다.

### 이벤트 'browser-window-blur'

Returns:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md)에서 벗어날 때 발생됩니다.

### 이벤트: 'browser-window-focus'

Returns:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md)에 초첨이 위치할 때 발생됩니다.

### 이벤트: 'browser-window-created'

Returns:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md)가 생성되었을 때 발생됩니다.

### 이벤트: 'web-contents-created'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)

[webContents](web-contents.md)가 생성되었을 때 발생됩니다.

### 이벤트: 'certificate-error'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - 에러 코드
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - 인증서를 신뢰할 수있는 것으로 간주할지 여부

`url`에 대한 `certificate`를 확인하지 못했을 때 발생하며, 인증서를 신뢰할 경우 `event.preventDefault()`선언과 `callback(true)`의 호출로 기본 동작의 실행을 방지해야 합니다.

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### 이벤트: 'select-client-certificate'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificate](structures/certificate.md) (선택)

클라이언트의 인증서를 요청했을 때 발생합니다.

`url` 은 클라이언트 인증서를 요청한 경로에 대응됩니다. 또한 `callback`은 리스트에서 필터링 된 항목으로 호출될 수 있습니다. `event.preventDefault()`를 사용하여, application이 저장되어있는 첫 번째 인증서를 사용하지 못하도록 할 수 있습니다.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Event: 'login'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `request` Object
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

`webContents`가 기본 인증을 필요로 할 때 발생된다.

기본 동작은 모든 인증을 취소하는 것이다. 이것을 override 하기 위해서는 `event.preventDefault()`을 이용해 기본 동작이 일어나지 않도록 해야하고 자격정보와 함께`callback(username, password)`을 호출하면 된다.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### 이벤트: 'gpu-process-crashed'

Returns:

* `event` Event
* `killed` Boolean

Gpu 프로세스가 죽었을 때 발생한다.

### 이벤트: 'renderer-process-crashed'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

`webContents`의 렌더러 프로세스가 충돌하거나 종료될 때 발생합니다.

### 이벤트: 'accessibility-support-changed' _macOS_ _Windows_

Returns:

* `event` Event
* `accessibilitySupportEnabled` Boolean - Chrome의 접근성 지원이 활성화 됐을 땐 `true`, `false`는 그 이외.

Chrome의 accessibility 가 변경되면 발생합니다. 이 이벤트는 스크린리더와 같은 보조기술이 활성화 혹은 비활성화될 때 발생합니다. https://www.chromium.org/developers/design-documents/accessibility 에서 더 자세한 내용을 확인하세요.

### 이벤트: 'session-created'

Returns:

* `session` [Session](session.md)

Electron이 새 `session`을 만들었을 때 발생합니다.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### 이벤트: 'second-instance'

Returns:

* `event` Event
* `argv` String[] - 두 번째 instance의 명령줄 매개 변수의 Array입니다.
* `workingDirectory` String - 두 번재 instance의 작업 디렉토리입니다.

이 이벤트는 어플리케이션의 두번째 인스턴스가 실행되고 `app.requestSingleInstanceLock()`를 호출하면 첫번째 인스턴스에서 발생한다.

`argv`는 두번째 인스턴스의 명령행 인수의 배열입니다. `workingDirectory`는 이 인스턴스의 작업 디렉토리입니다. 일반적으로 어플리케이션은 기본 창에 초점을 맞추고 최소화하지 않도록하여 이에 응답합니다.

이 이벤트는 `앱`의 `준비`이벤트가 생성된 후에 생성됩니다.

**참고:** 추가 명령 줄 인수는 `-original-process-start-time`과 같은 Chromium에 의해 추가 될 수 있습니다.

### 이벤트: 'desktop-capturer-get-sources'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents`의 렌더러 프로세스에서 `desktopCapturer.getSources()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 호출하면 빈 소스를 반환합니다.

### 이벤트: 'remote-require'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

`webContents`의 렌더러 프로세스에서 `remote.require()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### 이벤트: 'remote-get-global'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

`webContents`의 렌더러 프로세스에서 `remote.getGlobal()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### 이벤트 'remote-get-builtin'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

`webContents`의 렌더러 프로세스에서 `remote.getBuiltin()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### 이벤트: 'remote-get-current-window'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents`의 렌더러 프로세스에서 `remote.getCurrentWindow()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### 이벤트: 'remote-get-current-web-contents'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents`의 렌더러 프로세스에서 `remote.getCurrentWebContents()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### 이벤트: 'remote-get-guest-web-contents'

Returns:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

`webContents`의 렌더러 프로세스에서 `<webview>.getWebContents()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

## 메소드

`app` 객체에서 사용할 수 있는 메서드입니다:

**참고:** 몇몇 메서드는 특정 운영체제에서만 사용할 수 있습니다.

### `app.quit()`

모든 창을 닫는 것을 시도합니다. 첫번째로 `before-quit` 이벤트가 발생합니다. 만약 모든 창이 성공적으로 닫혔다면, `will-quit` 이벤트가 발생하고, 일반적으로 애플리케이션이 종료됩니다.

이 메서드는 모든 `beforeunload` 와 `unload` 이벤트 핸들러가 올바르게 실행되는 것을 보장합니다. `beforeunload` 이벤트 핸들러에서 `false`를 반환하는 윈도우에 의해 종료 동작이 중단될 수 있습니다.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

`exitCode`와 함께 프로그램을 즉시 종료한다. `exitCode`의 기본값은 0이다.

사용자에게 묻지 않고 모든 창이 즉시 닫히고, `before-quit` 이벤트와 `will-quit` 이벤트가 발생하지 않습니다.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (optional)
  * `execPath` String (optional)

현재 인스턴스가 종료되면 앱을 다시 실행합니다.

기본적으로 새로 실행될 인스턴스는 현재 인스턴스와 동일한 실행 경로, 실행 명령의 인자값을 사용합니다. `args`가 지정된 경우, 기존 인스턴스의 실행 명령의 인자값 대신 `args`를 실행 명령의 매개변수로 넘겨줍니다. `execPath`가 지정된 경우, 앱이 재시작될 때 현재 앱의 경로 대신 `execPath`경로에 있는 앱이 실행됩니다.

이 메서드는 호출했을 때 현재 실행중인 앱을 종료하는 것이 아니기 때문에, 앱을 재시작하기 위해서는 `app.relaunch`를 호출한 후에 `app.quit`혹은 `app.exit`을 호출해야 합니다.

`app.relaunch`가 여러번 호출되면, 현재 인스턴스가 종료된 후에 여러개의 인스턴스가 시작됩니다.

현재 인스턴스를 즉시 재시작하면서 실행 명령에 새로운 매개변수를 추가하는 예제입니다:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

`Boolean`을 반환 - 일렉트론이 초기화를 끝냈으면 `true`를, 그렇지 않으면 `false`를 반환합니다.

### `app.whenReady()`

일렉트론이 초기화될 때 이행(fulfilled)되는 `Promise<void>`를 반환합니다. `app.isReady()`를 확인하고 앱이 준비되지 않았을 때 `ready` 이벤트를 구독하는 작업 대신 편리하게 사용할 수 있습니다.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

모든 애플리케이션의 창을 최소화하지 않고 숨깁니다.

### `app.show()` _macOS_

창이 숨겨졌으면 보이게 합니다. 자동으로 창을 활성화시키지는 않습니다.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

이후에 `app.getPath()` 또는 `app.setPath(pathName, newPath)`를 사용해서 다룰 수 있는, 사용자 앱의 로그를 저장하기 위한 디렉토리를 지정하거나 만듭니다.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

`String`을 반환 - 현재 애플리케이션 디렉토리.

### `app.getPath(name)`

* PrinterInfo Object

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

아래와 같은 경로를 name에 넣어 함수를 호출할 수 있습니다.

* `home` User의 home 디렉토리.
* `appData` Per-user application data directory, which by default points to:
  * Windows에서 `%APPDATA%`
  * Linux에서 `$XDG_CONFIG_HOME` 또는 `~/.config`
  * macOS에서 `~/Library/Application Support`
* `userData` 기본적으로 `appData` 뒤에 어플리케이션의 이름이 붙은 형태인, 앱의 설정 파일을 저장할 디렉토리입니다.
* `temp` Temp 디렉토리의 경로
* `exe` 현재 실행파일의 경로.
* `module` `libchromiumcontent` 라이브러리.
* `desktop` 현재 User의 Desktop 경로.
* `documents` User의 "My Documents" 폴더 경로.
* `downloads` User의 downloads 폴더 경로.
* `music` User의 music 폴더 경로.
* `pictures` 사용자의 pictures 폴더 경로.
* `videos` 사용자의 videos 폴더 경로.
* `logs` 사용자의 log 폴더 경로.
* `pepperFlashSystemPlugin` Pepper Flash 플러그인의 시스템 버전에 대한 전체 경로.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - _Linux_에서는 48x48, _Windows_에서는 32x32, _macOS_에서는 지원하지 않습니다.
* `callback` Function
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Path와 관련된 아이콘을 가져옵니다.

_Windows_에는 두 가지 종류의 아이콘이 있다.

* `.mp3`, `.png`등과 같이 특정 파일 확장명과 관련된 아이콘
* `.exe`, `.dll`, `.ico`와 같이 파일 안에 있는 아이콘.

_Linux_와 _macOS_에서 아이콘은 mime type과 관련된 어플리케이션에 따라 다릅니다.

**[곧 중단 예정](modernization/promisification.md)**

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - _Linux_에서는 48x48, _Windows_에서는 32x32, _macOS_에서는 지원하지 않습니다.

`Promise<NativeImage>` 반환 - [NativeImage](native-image.md) 형태의 앱 아이콘

Path와 관련된 아이콘을 가져옵니다.

_Windows_에는 2종류의 아이콘이 있습니다:

* `.mp3`, `.png`등과 같이 특정 파일 확장명과 관련된 아이콘
* `.exe`, `.dll`, `.ico`와 같이 파일 안에 있는 아이콘.

_Linux_와 _macOS_에서 아이콘은 mime type과 관련된 어플리케이션에 따라 다릅니다.

### `app.setPath(name, path)`

* PrinterInfo Object
* `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. 애플리케이션 이름에 대문자를 포함하고 싶다면 `productName` 필드에 값을 설정하세요. 일렉트론을 이 필드의 값을 `name` 필드보다 우선 사용합니다.

### `app.setName(name)`

* PrinterInfo Object

현재 애플리케이션의 이름을 덮어씁니다.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

최근 열어본 문서 목록에 `path`를 추가합니다.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

최근 문서 목록을 비웁니다.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) _Windows_ - Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Defaults to an empty array

`Boolean` 반환 - 호출이 성공했는지에 대한 여부입니다.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) _Windows_ - Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Defaults to an empty array

`Boolean` 반환 - 호출이 성공했는지에 대한 여부입니다.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) _Windows_ - Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Defaults to an empty array

`Boolean`을 반환합니다

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

`Boolean` 반환 - 호출이 성공했는지에 대한 여부입니다.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` _Windows_

Returns `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**참고:** `JumpListCategory` 객체가 `type`, `name` 속성 둘 다 없다면, `type`은 `tasks`로 가정합니다.  `name` 속성이 설정되었지만 `type` 속성이 생략된 경우, `type`은 `custom`으로 가정합니다.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: '최근 프로젝트',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // 이름이 있으니 `type` 값은 "custom" 으로 간주됩니다.
    name: '도구',
    items: [
      {
        type: 'task',
        title: '도구 A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: '도구 A 실행'
      },
      {
        type: 'task',
        title: '도구 B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: '도구 B 실행'
      }
    ]
  },
  { type: 'frequent' },
  { // 이름과 타입이 없으니 `type` 값은 "tasks" 로 간주됩니다.
    items: [
      {
        type: 'task',
        title: '새 프로젝트',
        program: process.execPath,
        args: '--new-project',
        description: '새 프로젝트를 생성합니다.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: '프로젝트 복구',
        program: process.execPath,
        args: '--recover-project',
        description: '프로젝트 복구'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

`Boolean`을 반환합니다

The return value of this method indicates whether or not this instance of your application successfully obtained the lock.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

두 번째 인스턴스가 실행됐을 때 주 인스턴스의 창을 활성화하는 예제입니다.

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 두 번째 인스턴스를 만들려고 하면 원래 있던 윈도우에 포커스를 준다.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // myWindow를 만들고 나머지 과정을 처리한다.
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

`Boolean`을 반환합니다

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` _macOS_

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

[애플리케이션 유저 모델 ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)를 `id`로 변경합니다.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Function
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - 값은 `basic`을 사용하여 기본적인 정보, ` complete`로 완성형 정보를 사용할 수 있습니다.

`Promise`를 반환합니다.

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:
```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```
`basic` 값은 `vendorId` 나 `driverId` 와 같은 기본적인 정보가 필요할 때 만 사용하세요.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

`Boolean` 반환 - 호출이 성공했는지에 대한 여부입니다.

현재 앱의 배지의 수를 설정합니다. `0`으로 설정하여 배지를 숨길 수 있습니다.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` _Linux_

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. 예시:

``` javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

**[곧 중단 예정](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

이 API는 `ready` 이벤트가 발생한 후에 호출해야 합니다.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[곧 중단 예정](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `version` String (optional) - The app's build version number. _macOS_
  * `credits` String (optional) - Credit information. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Set the about panel options. 이는 맥OS에서 앱의 `.plist`에 정의된 값을 덮어쓸 것입니다. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details. On Linux, values must be set in order to be shown; there are no defaults.

만약 `credits`을 설정하지 않았지만 계속해서 앱에 표시하려면 AppKit은 "Credits.html", "Credits.rtf", "Credits.rtfd"의 순서로 NSBundle클래스의 main 메소드에서 리턴된 번들에서 이를 찾는다. 첫번째 파일을 사용하고 만약 없다면 정보 영역을 비어있게 된다. 더 많은 정보는 애플의 [문서](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc)를 확인하세요.

### `app.isEmojiPanelSupported`

반환 `Boolean` - 현재 OS 버전에서 기본 이모티콘 선택기를 사용할 수 있는지 여부

### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// 파일 접근을 시작합니다.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// 이제 샌드박스 외부에서 파일에 접근할 수 있습니다 🎉

// 끝났으면 파일 접근을 중지해야 할 것을 명심하세요.
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** This will not affect `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - A command-line switch

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - A command-line switch

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

### `app.enableSandbox()` _실험적_

Enables full sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` an ID representing the request.

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` _macOS_

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` _macOS_

* `text` String

Dock 아이콘의 알림 배지(badge) 안에 표현될 텍스트를 설정합니다.

### `app.dock.getBadge()` _macOS_

`String`을 반환 - Dock 아이콘의 알림 배지(badge) 안에 있는 문자열을 반환합니다.

### `app.dock.hide()` _macOS_

Dock 아이콘을 숨깁니다.

### `app.dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

애플리케이션의 [dock 메뉴](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/)를 설정합니다.

### `app.dock.getMenu()` _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

`image` Dock 메뉴의 아이콘과 관련된 이미지를 설정합니다.

## 속성

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

`Boolean` 속성이며 Chrome의 접근성 지원이 활성화되어 있으면 `true`, 그 외에는 `false`다. 만약 스크린 리더와 같은 보조기술을 사용이 탐지되면 이 속성은 `true`가 된다. 이 속성을 `true`로 설정하여 Chrome의 접근성 지원을 수동으로 활성화하며 개발자가 앱 설정에서 접근성 스위치를 사용자에게 제공할 수 있도록 합니다.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

이 API는 `ready` 이벤트가 발생한 후에 호출해야 합니다.

**주의:** 접근성 트리를 렌더링하는 것은 당신앱의 성능에 중대한 영향을 줄 수 있습니다. 기본으로 활성화하지 마세요.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

앱이 패키지되었을 경우에는 `true`를, 그렇지 않을 경우에는 `false`을 반환하는 `Boolean` 속성입니다. 다수의 앱에서, 이 속성은 개발 환경과 제품 환경을 구분하는데 사용될 수 있습니다.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).
