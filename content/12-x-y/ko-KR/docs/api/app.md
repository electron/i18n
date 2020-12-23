# app

> 애플리케이션의 이벤트 생명 주기를 제어합니다.

프로세스:[Main](../glossary.md#main-process)

다음은 마지막 윈도우를 닫을 때 애플리케이션도 종료하는 예시입니다.

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Events

app 객체는 다음과 같은 이벤트를 가지고 있습니다:

### 이벤트: 'will-finish-launching'

애플리케이션이 기본적인 시작 준비를 마치면 발생하는 이벤트입니다. Windows, Linux 운영체제에서 `will-finish-launching` 이벤트는 `ready` 이벤트와 동일합니다. macOS에서 이벤트는 `NSApplication`의 `applicationWillFinishLaunching`에 대한 알림으로 표현됩니다. 대개 이곳에서 `open-file`과 `open-url` 이벤트 리스너를 설정하고 crash reporter와 auto updater를 시작합니다.

대부분의 경우, 모든 것을 `ready` 이벤트 핸들러 안에서 해결해야 합니다.

### 이벤트: 'ready'

반환:

* `event` Event
* `launchInfo` Record<string, any> | [NotificationResponse](structures/notification-response.md) _macOS_

Electron이 로드된 직후 한번만 발생합니다. On macOS, `launchInfo` holds the `userInfo` of the `NSUserNotification` or information from [`UNNotificationResponse`](structures/notification-response.md) that was used to open the application, if it was launched from Notification Center. 또한 `app.isReady()` 호출하여 이 이벤트가 이미 발생되었는지 확인할 수 있으며, `app.whenReady()`를 사용하여 Electron이 초기화되었을때 resolve되는 Promise를 얻을 수 있습니다.

### 이벤트: 'window-all-closed'

모든 윈도우를 닫을 때 발생 합니다.

이 이벤트를 구독하지 않고 모든 창이 닫혀있다면, 기본 동작은 앱을 종료시키는 것입니다. 그러나 당신이 이벤트를 구독한다면, 당신은 종료할지 안할지를 제어할 수 있습니다. 만약 사용자가 `Cmd + Q` 를 누르거나, 또는 개발자가 `app.quit()`을 호출 한다면, Electron은 첫번째로 모든 창을 닫을 것이고, 그 다음은 `will-quit` 이벤트를 발생시킬 것입니다. 그리고 이 경우는 `window-all-closed` 이벤트를 발생시키지 않을 것입니다.

### 이벤트: 'before-quit'

반환:

* `event` Event

응용 프로그램이 창을 닫기 전에 발생됩니다. `event.preventDefault()`를 호출하면 기본 동작의 수행 (애플리케이션 종료) 을 막습니다.

**참고:** 만약 어플리케이션이 `autoUpdater.quitAndInstall()`에 의해 종료되는 경우 모든 윈도우에서 `close`이벤트를 발생한 *후* `before-quit` 가 발생되고 윈도우를 닫습니다.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'will-quit'

반환:

* `event` Event

모든 창이 닫혀서 앱이 종료되기 직전에 발생됩니다. `event.preventDefault()`를 호출하면 기본 동작의 수행 (애플리케이션 종료) 을 막습니다.

`will-quit` 와 `window-all-closed` 이벤트들의 차이점에 대해서는 `window-all-closed`이벤트 설명을 참조하세요.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'quit'

반환:

* `event` Event
* `exitCode` Integer

어플리케이션을 종료할 때 발생된다.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'open-file' _macOS_

반환:

* `event` Event
* `path` String

사용자가 파일을 열려 할 때 송출됩니다. 주로 `open-file` 이벤트는 OS가 이미 열려있는 파일을 재사용하려 할 때에 송출됩니다. 또한, `open-file` 이벤트는 애플리케이션이 아직 실행되기 전에 파일을 드래그/드롭 했을 경우에도 발생합니다. 따라서 이러한 경우를 핸들링하기 위해서는 애플리케이션의 이른 초기화 단계에서 미리 `open-file` 이벤트를 구독하고 있어야 합니다. (`ready` 이벤트보다도 먼저 발생할 수 있습니다.)

이 이벤트를 처리하려면 `event.preventDefault()`를 호출해야 합니다.

윈도우에서, `process.argv`를 통해서 열기를 시도하는 파일의 경로를 얻어올 수 있습니다. (단, 메인 프로세스에서만 가능합니다.)

### Event: 'open-url' _macOS_

반환:

* `event` Event
* `url` String

사용자가 애플리케이션을 URL과 함께 열었을 때 발생합니다. `Info.plist` 파일의 `CFBundleURLTypes`키에 반드시 URL scheme을 정의해야 합니다. 그리고 `NSPrincipalClass`을 `AtomApplication`으로 설정해야 합니다.

이 이벤트를 처리하려면 `event.preventDefault()`를 호출해야 합니다.

### 이벤트: 'activate' _macOS_

반환:

* `event` Event
* `hasVisibleWindows` Boolean

애플리케이션이 활성화될 때 발생합니다. 여러 가지 행동이 이 이벤트를 발생시킬 수 있습니다. 예를 들어, 처음 애플리케이션을 실행할 때, 애플리케이션을 실행 중이지만 또 다시 실행할 때, 또는 애플리케이션의 독이나 작업표시줄 아이콘을 클릭할 때 등이 있습니다.

### Event: 'did-become-active' _macOS_

반환:

* `event` Event

Emitted when mac application become active. Difference from `activate` event is that `did-become-active` is emitted every time the app becomes active, not only when Dock icon is clicked or application is re-launched.

### 이벤트: 'continue-activity' _macOS_

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`][activity-type]와 맵핑됩니다.
* `userInfo` unknown - 다른 장치의 활동에 의해 저장된 앱별 상태를 포함합니다.

다른 기기에서의 작업을 가져와서 이어서 진행하려는 경우, [Handoff][handoff] 도중에 발생합니다. 이 이벤트를 핸들링하려면 `event.preventDefault()`를 반드시 호출해야합니다.

사용자 행동이 애플리케이션에서 이어지기 위해서는 반드시 행동 소스 앱과 같은 개발팀 ID를 가지고 있어야 하고, 해당 행동 타입을 지원하고 있어야 합니다. 지원되는 행동 타입은 앱의 `Info.plist` 내부의 `NSUserActivityTypes` 키에서 확인할 수 있습니다.

### 이벤트: 'will-continue-activity' _macOS_

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`][activity-type]와 맵핑됩니다.

[Handoff][handoff]중 다른 디바이스로부터 액티비티를 계속하려고 하기 직전에 발생합니다. 이 이벤트를 핸들링하려면 `event.preventDefault()`를 반드시 호출해야합니다.

### 이벤트: 'continue-activity-error' _macOS_

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`][activity-type]와 맵핑됩니다.
* `error` String - 에러의 변역된 설명 문자열

[Handoff][handoff] 도중에 다른 장치의 작업을 다시 시작할 수 없을 때 발생합니다.

### 이벤트: 'activity-was-continued' _macOS_

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`][activity-type]와 맵핑됩니다.
* `userInfo` unknown - 활동에 의해 저장된 앱별 상태를 포함합니다.

[Handoff][handoff]중인 디바이스의 액티비티를, 다른 디바이스에서 계속하는 데 성공한 뒤 발생합니다.

### 이벤트: 'update-activity-state' _macOS_

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`][activity-type]와 맵핑됩니다.
* `userInfo` unknown - 활동에 의해 저장된 앱별 상태를 포함합니다.

[Handoff][handoff]가 다른 기기에서 재시작될 때 발생합니다. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActivity()` in a timely manner. 그렇지 않으면 명령이 실패하여, `continue-activity-error` 가 호출됩니다.

### 이벤트: 'new-window-for-tab' _macOS_

반환:

* `event` Event

사용자가 macOS 기본 새 탭 버튼을 클릭했을 때 발생합니다. 현재 `BrowserWindow`에 `tabbingIdentifier`가 있을 때만 새 탭 버튼이 보입니다.

### 이벤트 'browser-window-blur'

반환:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md)에서 벗어날 때 발생됩니다.

### 이벤트: 'browser-window-focus'

반환:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md)에 초첨이 위치할 때 발생됩니다.

### 이벤트: 'browser-window-created'

반환:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md)가 생성되었을 때 발생됩니다.

### 이벤트: 'web-contents-created'

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)

[webContents](web-contents.md)가 생성되었을 때 발생됩니다.

### 이벤트: 'certificate-error'

반환:

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

반환:

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

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (optional)
  * `password` String (optional)

`webContents`가 기본 인증을 필요로 할 때 발생된다.

기본 동작은 모든 인증을 취소하는 것이다. 이것을 override 하기 위해서는 `event.preventDefault()`을 이용해 기본 동작이 일어나지 않도록 해야하고 자격정보와 함께`callback(username, password)`을 호출하면 된다.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

사용자 이름이나 비밀번호 없이 `콜백`을 호출하면 인증 요청이 취소되고 인증 오류가 페이지로 반환됩니다.

### 이벤트: 'gpu-info-update'

GPU 정보 업데이트가 있을 때마다 발생합니다.

### Event: 'gpu-process-crashed' _Deprecated_

반환:

* `event` Event
* `killed` Boolean

GPU 프로세스가 충돌하거나 종료될 때 발생합니다.

**Deprecated:** This event is superceded by the `child-process-gone` event which contains more information about why the child process disappeared. It isn't always because it crashed. The `killed` boolean can be replaced by checking `reason === 'killed'` when you switch to that event.

### Event: 'renderer-process-crashed' _Deprecated_

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

`webContents`의 렌더러 프로세스가 충돌하거나 종료될 때 발생합니다.

**Deprecated:** This event is superceded by the `render-process-gone` event which contains more information about why the render process disappeared. It isn't always because it crashed.  The `killed` boolean can be replaced by checking `reason === 'killed'` when you switch to that event.

#### Event: 'render-process-gone'

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `details` Object
  * `reason` String - The reason the render process is gone.  가능한 값:
    * `clean-exit` - Process exited with an exit code of zero
    * `abnormal-exit` - Process exited with a non-zero exit code
    * `killed` - Process was sent a SIGTERM or otherwise killed externally
    * `crashed` - Process crashed
    * `oom` - Process ran out of memory
    * `launch-failed` - Process never successfully launched
    * `integrity-failure` - Windows code integrity checks failed

Emitted when the renderer process unexpectedly disappears.  This is normally because it was crashed or killed.

#### Event: 'child-process-gone'

반환:

* `event` Event
* `details` Object
  * `type` String - 프로세스의 종류. 다음 값들 중 하나를 가짐:
    * `Utility`
    * `Zygote`
    * `Sandbox helper`
    * `GPU`
    * `Pepper Plugin`
    * `Pepper Plugin Broker`
    * `Unknown`
  * `reason` String - The reason the child process is gone. 가능한 값:
    * `clean-exit` - Process exited with an exit code of zero
    * `abnormal-exit` - Process exited with a non-zero exit code
    * `killed` - Process was sent a SIGTERM or otherwise killed externally
    * `crashed` - Process crashed
    * `oom` - Process ran out of memory
    * `launch-failed` - Process never successfully launched
    * `integrity-failure` - Windows code integrity checks failed
  * `exitCode` Number - The exit code for the process (e.g. status from waitpid if on posix, from GetExitCodeProcess on Windows).
  * `serviceName` String (optional) - The non-localized name of the process.
  * `name` String (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.

Emitted when the child process unexpectedly disappears. This is normally because it was crashed or killed. It does not include renderer processes.

### 이벤트: 'accessibility-support-changed' _macOS_ _Windows_

반환:

* `event` Event
* `accessibilitySupportEnabled` Boolean - Chrome의 접근성 지원이 활성화 됐을 땐 `true`, `false`는 그 이외.

Chrome의 accessibility 가 변경되면 발생합니다. 이 이벤트는 스크린리더와 같은 보조기술이 활성화 혹은 비활성화될 때 발생합니다. https://www.chromium.org/developers/design-documents/accessibility 에서 더 자세한 내용을 확인하세요.

### 이벤트: 'session-created'

반환:

* `session` [Session](session.md)

Electron이 새 `session`을 만들었을 때 발생합니다.

```javascript
const { app } = require('electron')

app.on('session-created', (session) => {
  console.log(session)
})
```

### 이벤트: 'second-instance'

반환:

* `event` Event
* `argv` String[] - 두 번째 instance의 명령줄 매개 변수의 Array입니다.
* `workingDirectory` String - 두 번재 instance의 작업 디렉토리입니다.

이 이벤트는 어플리케이션의 두번째 인스턴스가 실행되고 `app.requestSingleInstanceLock()`를 호출하면 첫번째 인스턴스에서 발생한다.

`argv`는 두번째 인스턴스의 명령행 인수의 배열입니다. `workingDirectory`는 이 인스턴스의 작업 디렉토리입니다. 일반적으로 어플리케이션은 기본 창에 초점을 맞추고 최소화하지 않도록하여 이에 응답합니다.

**Note:** If the second instance is started by a different user than the first, the `argv` array will not include the arguments.

이 이벤트는 `앱`의 `준비`이벤트가 생성된 후에 생성됩니다.

**참고:** 추가 명령 줄 인수는 `-original-process-start-time`과 같은 Chromium에 의해 추가 될 수 있습니다.

### 이벤트: 'desktop-capturer-get-sources'

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents`의 렌더러 프로세스에서 `desktopCapturer.getSources()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 호출하면 빈 소스를 반환합니다.

### Event: 'remote-require' _Deprecated_

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

`webContents`의 렌더러 프로세스에서 `remote.require()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### Event: 'remote-get-global' _Deprecated_

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

`webContents`의 렌더러 프로세스에서 `remote.getGlobal()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### Event: 'remote-get-builtin' _Deprecated_

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

`webContents`의 렌더러 프로세스에서 `remote.getBuiltin()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### Event: 'remote-get-current-window' _Deprecated_

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents`의 렌더러 프로세스에서 `remote.getCurrentWindow()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

### Event: 'remote-get-current-web-contents' _Deprecated_

반환:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents`의 렌더러 프로세스에서 `remote.getCurrentWebContents()`가 호출되었을 때 발생합니다. `event.preventDefault()`를 실행하면 모듈이 반환되지 않습니다. `event.returnValue`를 설정하여 임의의 값을 반환할 수 있습니다.

## 메소드

`app` 객체에서 사용할 수 있는 메서드입니다:

**참고:** 몇몇 메서드는 특정 운영체제에서만 사용할 수 있습니다.

### `app.quit()`

모든 창을 닫는 것을 시도합니다. 첫번째로 `before-quit` 이벤트가 발생합니다. 만약 모든 창이 성공적으로 닫혔다면, `will-quit` 이벤트가 발생하고, 일반적으로 애플리케이션이 종료됩니다.

이 메서드는 모든 `beforeunload` 와 `unload` 이벤트 핸들러가 올바르게 실행되는 것을 보장합니다. `beforeunload` 이벤트 핸들러에서 `false`를 반환하는 윈도우에 의해 종료 동작이 중단될 수 있습니다.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

`exitCode`로 즉시 종료합니다. `exitCode`의 기본 값은 0입니다.

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

`Boolean`을 반환 - 일렉트론이 초기화를 끝냈으면 `true`를, 그렇지 않으면 `false`를 반환합니다. See also `app.whenReady()`.

### `app.whenReady()`

일렉트론이 초기화될 때 이행(fulfilled)되는 `Promise<void>`를 반환합니다. `app.isReady()`를 확인하고 앱이 준비되지 않았을 때 `ready` 이벤트를 구독하는 작업 대신 편리하게 사용할 수 있습니다.

### `app.focus([options])`

* `options` Object (optional)
  * `steal` Boolean _macOS_ - Make the receiver the active app even if another app is currently active.

리눅스에서는 눈에 보이는 최상단의 윈도우에 포커스를 줍니다. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

You should seek to use the `steal` option as sparingly as possible.

### `app.hide()` _macOS_

모든 애플리케이션의 창을 최소화하지 않고 숨깁니다.

### `app.show()` _macOS_

창이 숨겨졌으면 보이게 합니다. 자동으로 창을 활성화시키지는 않습니다.

### `app.setAppLogsPath([path])`

* `path` String (선택) - 로그를 저장하기 위한 사용자 경로. 절대경로여야 함.

이후에 `app.getPath()` 또는 `app.setPath(pathName, newPath)`를 사용해서 다룰 수 있는, 사용자 앱의 로그를 저장하기 위한 디렉토리를 지정하거나 만듭니다.

`path` 파라미터없이 `app.setAppLogsPath()`를 호출하면, _macOS_에서는 `~/Library/Logs/YourAppName`으로 설정되고, _Linux_와 _Windows_에서는 `userData` 디렉토리 내부로 설정이 됩니다.

### `app.getAppPath()`

`String`을 반환 - 현재 애플리케이션 디렉토리.

### `app.getPath(name)`

* `name` String - You can request the following paths by the name:
  * `home` User의 home 디렉토리.
  * `appData` 사용자별 어플리케이션 데이터 디렉토리, 기본 값은 아래와 같다.
    * Windows에서 `%APPDATA%`
    * Linux에서 `$XDG_CONFIG_HOME` 또는 `~/.config`
    * macOS에서 `~/Library/Application Support`
  * `userData` 기본적으로 `appData` 뒤에 어플리케이션의 이름이 붙은 형태인, 앱의 설정 파일을 저장할 디렉토리입니다.
  * `캐시(Cache)`
  * `temp` Temp 디렉토리의 경로
  * `exe` 현재 실행파일의 경로.
  * `module` `libchromiumcontent` 라이브러리.
  * `desktop` 현재 User의 Desktop 경로.
  * `documents` User의 "My Documents" 폴더 경로.
  * `downloads` User의 downloads 폴더 경로.
  * `music` User의 music 폴더 경로.
  * `pictures` 사용자의 pictures 폴더 경로.
  * `videos` 사용자의 videos 폴더 경로.
  * `recent` Directory for the user's recent files (Windows only).
  * `logs` 사용자의 log 폴더 경로.
  * `crashDumps` Directory where crash dumps are stored.

Returns `String` - `name`과 연관된 디렉토리 또는 파일에 대한 경로입니다. 실패시, `Error`가 throw 됩니다.

If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.

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

* `name` String
* `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

`String` 을 반환 - 로드된 애플리케이션의 버전. 애플리케이션의 `package.json` 파일에 버전이 없을 경우 현재 번들 또는 실행 파일의 버전이 반환됩니다.

### `app.getName()`

`String`을 반환합니다 - `package.json`에 명시된 현재 애플리케이션의 이름

`package.json`의 `name` 필드는 npm 모듈 명세에 따라 대체로 짧은 소문자 문자열입니다. 애플리케이션 이름에 대문자를 포함하고 싶다면 `productName` 필드에 값을 설정하세요. 일렉트론을 이 필드의 값을 `name` 필드보다 우선 사용합니다.

### `app.setName(name)`

* `name` String

현재 애플리케이션의 이름을 덮어씁니다.

**참고:** 이 함수는 Electron 내부에서 쓰는 이름을 덮어씁니다. OS에서 사용하는 이름에는 영향을 주지 않습니다.

### `app.getLocale()`

Returns `String` - 현재 애플리케이션 locale. 가능한 반환 값은 [여기](locales.md)에서 문서화되어 있습니다.

로케일을 설정하려면, [여기](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md)에 쓰여있는 대로 앱 시작 시에 명령줄 switch를 사용하는 것이 좋습니다.

**참고:** 패키징 된 앱을 배포할 때는 `locales` 폴더도 포함해야 합니다.

**참고:** Windows에서는 `ready` 이벤트가 호출된 뒤에 호출해야 합니다.

### `app.getLocaleCountryCode()`

Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**참고:** 국가 로캘 코드를 감지할 수 없으면 빈 문자열을 반환합니다.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

최근 열어본 문서 목록에 `path`를 추가합니다.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

최근 문서 목록을 비웁니다.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) _Windows_ - The path to the Electron executable. Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Arguments passed to the executable. Defaults to an empty array

`Boolean` 반환 - 호출이 성공했는지에 대한 여부입니다.

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via [Electron Forge][electron-forge], [Electron Packager][electron-packager], or by editing `info.plist` with a text editor. Please refer to [Apple's documentation][CFBundleURLTypes] for details.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally.

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

Returns `Boolean` - Whether the current executable is the default handler for a protocol (aka URI scheme).

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation][LSCopyDefaultHandlerForURLScheme] for details.

The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally.

### `app.getApplicationNameForProtocol(url)`

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `String` - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.

### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `Promise<Object>` - Resolve with an object containing the following:

* `icon` NativeImage - the display icon of the app handling the protocol.
* `path` String  - installation path of the app handling the protocol.
* `name` String - display name of the app handling the protocol.

This method returns a promise that contains the application name, icon and path of the default handler for the protocol (aka URI scheme) of a URL.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks][tasks] category of the Jump List on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

`Boolean` 반환 - 호출이 성공했는지에 대한 여부입니다.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` _Windows_

Returns `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs][JumpListBeginListMSDN]).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. `name` 속성이 설정되었지만 `type` 속성이 생략된 경우, `type`은 `custom`으로 가정합니다.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
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
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}
```

### `app.hasSingleInstanceLock()`

`Boolean`을 반환합니다

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`][activity-type]와 맵핑됩니다.
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff][handoff] to another device afterward.

### `app.getCurrentActivityType()` _macOS_

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` _macOS_

Invalidates the current [Handoff][handoff] user activity.

### `app.resignCurrentActivity()` _macOS_

Marks the current [Handoff][handoff] user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`][activity-type]와 맵핑됩니다.
* `userInfo` any - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

[애플리케이션 유저 모델 ID][app-user-model-id]를 `id`로 변경합니다.

### `app.setActivationPolicy(policy)` _macOS_

* `policy` String - Can be 'regular', 'accessory', or 'prohibited'.

Sets the activation policy for a given app.

Activation policy types:

* 'regular' - The application is an ordinary app that appears in the Dock and may have a user interface.
* 'accessory' - The application doesn’t appear in the Dock and doesn’t have a menu bar, but it may be activated programmatically or by clicking on one of its windows.
* 'prohibited' - The application doesn’t appear in the Dock and may not create windows or be activated.

### `app.importCertificate(options, callback)` _Linux_

* `options` Object
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Function
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behavior.

This method can only be called before app is ready.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

**Note:** This information is only usable after the `gpu-info-update` event is emitted.

### `app.getGPUInfo(infoType)`

* `infoType` String - `basic` 또는 `complete`.

Returns `Promise<unknown>`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:

```js
{
  auxAttributes:
   {
     amdSwitchable: true,
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
     videoDecodeAcceleratorFlags: 0
   },
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModelName: 'MacBookPro',
  machineModelVersion: '11.5'
}
```

`basic` 값은 `vendorId` 나 `driverId` 와 같은 기본적인 정보가 필요할 때 만 사용하세요.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

`Boolean` 반환 - 호출이 성공했는지에 대한 여부입니다.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration][unity-requirement].

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
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds][mas-builds].
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds][mas-builds].
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds][mas-builds].
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds][mas-builds].
* `executableWillLaunchAtLogin` Boolean _Windows_ - `true` if app is set to open at login and its run key is not deactivated. This differs from `openAtLogin` as it ignores the `args` option, this property will be true if the given executable would be launched at login with **any** arguments.
* `launchItems` Object[] _Windows_
  * `name` String _Windows_ - name value of a registry entry.
  * `path` String _Windows_ - The executable to an app that corresponds to a registry entry.
  * `args` String[] _Windows_ - the command-line arguments to pass to the executable.
  * `scope` String _Windows_ - one of `user` or `machine`. Indicates whether the registry entry is under `HKEY_CURRENT USER` or `HKEY_LOCAL_MACHINE`.
  * `enabled` Boolean _Windows_ - `true` if the app registry key is startup approved and therefore shows as `enabled` in Task Manager and Windows settings.

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds][mas-builds].
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.
  * `enabled` Boolean (optional) _Windows_ - `true` will change the startup approved registry key and `enable / disable` the App in Task Manager and Windows Settings. Defaults to `true`.
  * `name` String (optional) _Windows_ - value name to write into registry. Defaults to the app's AppUserModelId(). Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel][Squirrel-Windows], you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. 예시:

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

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

이 API는 `ready` 이벤트가 발생한 후에 호출해야 합니다.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.showAboutPanel()`

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* `options` Object
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `version` String (optional) _macOS_ - The app's build version number.
  * `credits` String (optional) _macOS_ _Windows_ - Credit information.
  * `authors` String[] (optional) _Linux_ - List of app authors.
  * `website` String (optional) _Linux_ - The app's website.
  * `iconPath` String (optional) _Linux_ _Windows_ - Path to the app's icon in a JPEG or PNG file format. On Linux, will be shown as 64x64 pixels while retaining aspect ratio.

Set the about panel options. This will override the values defined in the app's `.plist` file on macOS. See the [Apple docs][about-panel-options] for more details. On Linux, values must be set in order to be shown; there are no defaults.

만약 `credits`을 설정하지 않았지만 계속해서 앱에 표시하려면 AppKit은 "Credits.html", "Credits.rtf", "Credits.rtfd"의 순서로 NSBundle클래스의 main 메소드에서 리턴된 번들에서 이를 찾는다. 첫번째 파일을 사용하고 만약 없다면 정보 영역을 비어있게 된다. 더 많은 정보는 애플의 [문서](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc)를 확인하세요.

### `app.isEmojiPanelSupported()`

반환 `Boolean` - 현재 OS 버전에서 기본 이모티콘 선택기를 사용할 수 있는지 여부

### `app.showEmojiPanel()` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// 파일 접근을 시작합니다.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.enableSandbox()`

Enables full sandbox mode on the app. This means that all renderers will be launched sandboxed, regardless of the value of the `sandbox` flag in WebPreferences.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (optional)
  * `conflictHandler` Function\<Boolean> (optional) - A handler for potential conflict in move failure.
    * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong.

By default, if an app of the same name as the one being moved exists in the Applications directory and is _not_ running, the existing app will be trashed and the active app moved into its place. If it _is_ running, the pre-existing running app will assume focus and the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior.  i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

예시:

```js
app.moveToApplicationsFolder({
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'An app of this name already exists'
      }) === 1
    }
  }
})
```

Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.

### `app.isSecureKeyboardEntryEnabled()` _macOS_

Returns `Boolean` - whether `Secure Keyboard Entry` is enabled.

By default this API will return `false`.

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean - Enable or disable `Secure Keyboard Entry`

Set the `Secure Keyboard Entry` is enabled in your application.

By using this API, important information such as password and other sensitive information can be prevented from being intercepted by other processes.

See [Apple's documentation](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) for more details.

**Note:** Enable `Secure Keyboard Entry` only when it is needed and disable it when it is no longer needed.

## 속성

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

`Boolean` 속성이며 Chrome의 접근성 지원이 활성화되어 있으면 `true`, 그 외에는 `false`다. 만약 스크린 리더와 같은 보조기술을 사용이 탐지되면 이 속성은 `true`가 된다. 이 속성을 `true`로 설정하여 Chrome의 접근성 지원을 수동으로 활성화하며 개발자가 앱 설정에서 접근성 스위치를 사용자에게 제공할 수 있도록 합니다.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

이 API는 `ready` 이벤트가 발생한 후에 호출해야 합니다.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.badgeCount` _Linux_ _macOS_

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration][unity-requirement].

**Note:** On macOS, you need to ensure that your application has the permission to display notifications for this property to take effect.

### `app.commandLine` _읽기전용_

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` _macOS_ _읽기전용_

A [`Dock`](./dock.md) `| undefined` object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` _읽기전용_

앱이 패키지되었을 경우에는 `true`를, 그렇지 않을 경우에는 `false`을 반환하는 `Boolean` 속성입니다. 다수의 앱에서, 이 속성은 개발 환경과 제품 환경을 구분하는데 사용될 수 있습니다.

### `app.name`

현재 애플리케이션의 이름을 가리키는 `String` 프로퍼티입니다. 애플리케이션의 `package.json` 파일에 있는 이름을 사용합니다.

`package.json`의 `name` 필드는 npm 모듈 명세에 따라 대체로 짧은 소문자 문자열입니다. 애플리케이션 이름에 대문자를 포함하고 싶다면 `productName` 필드에 값을 설정하세요. 일렉트론을 이 필드의 값을 `name` 필드보다 우선 사용합니다.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  It is useful for ensuring that your entire app has the same user agent.  Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `true`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).

### `app.runningUnderRosettaTranslation` _macOS_ _Readonly_

A `Boolean` which when `true` indicates that the app is currently running under the [Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_(software)).

You can use this property to prompt users to download the arm64 version of your application when they are running the x64 version under Rosetta incorrectly.

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
