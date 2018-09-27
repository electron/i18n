# app

> 애플리케이션의 이벤트 생명 주기를 제어합니다.

프로세스:[Main](../glossary.md#main-process)

밑의 예시는 마지막 윈도우가 종료되었을 때, 애플리케이션을 종료시키는 예시입니다:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## 이벤트

app 객체는 다음과 같은 이벤트를 가지고 있습니다:

### 이벤트: 'will-finish-launching'

애플리케이션이 기본적인 시작 준비를 마치면 발생하는 이벤트입니다. Windows, Linux 운영체제에서 `will-finish-launching` 이벤트는 `ready` 이벤트와 동일합니다. macOS에서 이벤트는 `NSApplication`의 `applicationWillFinishLaunching`에 대한 알림으로 표현됩니다. 대개 이곳에서 `open-file`과 `open-url` 이벤트 리스너를 설정하고 crash reporter와 auto updater를 시작합니다.

In most cases, you should do everything in the `ready` event handler.

### 이벤트: 'ready'

반환:

* `launchInfo` 객체 *macOS*

Electron이 초기화를 끝냈을 때 발생하는 이벤트입니다. macOS에서는 알림 센터를 통해 앱이 시작된 경우 `launchInfo`에 앱을 여는데 사용된 `NSUserNotification`의 `userInfo`가 할당됩니다. `app.isReady()`를 사용해서 event가 해제되었는지 확인할 수 있습니다.

### 이벤트: 'window-all-closed'

모든 윈도우를 닫을 때 발생 합니다.

이 이벤트를 구독하지 않고 모든 창이 닫혀있다면, 기본 동작은 앱을 종료시키는 것입니다. 그러나 당신이 이벤트를 구독한다면, 당신은 종료할지 않할지를 제어할 수 있습니다. 만약 사용자가 `Cmd + Q` 를 누르거나, 또는 개발자가 `app.quit()`을 호출 한다면, Electron은 첫번째로 모든 창을 닫을 것이고, 그 다음은 `will-quit` 이벤트를 발생시킬 것입니다. 그리고 이 경우는 `window-all-closed` 이벤트를 발생시키지 않을 것입니다.

### 이벤트: 'before-quit'

반환:

* `event` Event

어플리케이션이 윈도우를 닫기 시작하기 전에 발생 합니다. `Event.preventDefault()`를 호출하면 기본 동작인 어플리케이션 종료를 하지 않습니다.

**참고:** 만약 어플리케이션이 `autoUpdater.quitAndInstall()`에 의해 종료되는 경우 모든 윈도우에서 `close`이벤트를 발생한 *후* `before-quit` 가 발생되고 윈도우를 닫습니다.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'will-quit'

Returns:

* `event` Event

모든 윈도우가 닫히고 어플리케이션이 종료될 때 발생된다. `event.preventDefault()`를 호출하면 기본 동작인 어플리케이션 종료를 하지 않습니다.

`will-quit` 와 `window-all-closed` 이벤트들의 차이점에 대해서는 `window-all-closed`이벤트 설명을 참조하세요.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'quit'

반환:

* `event` Event
* `exitCode` Integer

어플리케이션을 종료할 때 발생된다.

**참고**: Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 앱이 종료되는 경우 해당 이벤트가 발생하지 않습니다.

### 이벤트: 'open-file' *macOS*

Returns:

* `event` Event
* `path` String

사용자가 파일을 열려 할 때 송출됩니다. 주로 `open-file` 이벤트는 OS가 이미 열려있는 파일을 재사용하려 할 때에 송출됩니다. 또한, `open-file` 이벤트는 애플리케이션이 아직 실행되기 전에 파일을 드래그/드롭 했을 경우에도 발생합니다. 따라서 이러한 경우를 핸들링하기 위해서는 애플리케이션의 이른 초기화 단계에서 미리 `open-file` 이벤트를 구독하고 있어야 합니다. (`ready` 이벤트보다도 먼저 발생할 수 있습니다.)

이 이벤트를 처리하려면 `event.preventDefault()`를 호출해야 합니다.

윈도우에서, `process.argv`를 통해서 열기를 시도하는 파일의 경로를 얻어올 수 있습니다. (단, 메인 프로세스에서만 가능합니다.)

### 이벤트: 'open-url' *macOS*

반환:

* `event` Event
* `url` String

사용자가 애플리케이션을 URL과 함께 열었을 때 발생합니다. 반드시 애플리케이션의 `Info.plist`파일에서 URL scheme을 `CFBundleURLTypes`키에서 정의하고 있어야 합니다. 또, `NSPrincipalClass`의 값이 `AtomApplication`으로 설정되어 있어야 합니다.

이 이벤트를 처리하려면 `event.preventDefault()`를 호출해야 합니다.

### 이벤트: 'activate' *macOS*

반환:

* `event` Event
* `hasVisibleWindows` Boolean

애플리케이션이 활성화될 때 발생합니다. 여러 가지 행동이 이 이벤트를 발생시킬 수 있습니다. 예를 들어, 처음 애플리케이션을 실행할 때, 애플리케이션을 실행 중이지만 또 다시 실행할 때, 또는 애플리케이션의 독이나 작업표시줄 아이콘을 클릭할 때 등이 있습니다.

### 이벤트: 'continue-activity' *macOS*

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` 객체 - 다른 장치에서의 동작에 의한 app-specific 상태를 가지고 있습니다.

다른 기기에서의 작업을 가져와서 이어서 진행하려는 경우, [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 도중에 발생합니다. 이 이벤트를 핸들링하려면 `event.preventDefault()`를 반드시 호출해야합니다.

사용자 행동이 애플리케이션에서 이어지기 위해서는 반드시 행동 소스 앱과 같은 개발팀 ID를 가지고 있어야 하고, 해당 행동 타입을 지원하고 있어야 합니다. 지원되는 행동 타입은 앱의 `Info.plist` 내부의 `NSUserActivityTypes` 키에서 확인할 수 있습니다.

### 이벤트: 'will-continue-activity' *macOS*

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) before an activity from a different device wants to be resumed. 이 이벤트를 핸들링하려면 `event.preventDefault()`를 반드시 호출해야합니다.

### 이벤트: 'continue-activity-error' *macOS*

반환:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `error` String - 에러의 변역된 설명 문자열

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device fails to be resumed.

### Event: 'activity-was-continued' *macOS*

Returns:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` Object - Contains app-specific state stored by the activity.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.

### Event: 'update-activity-state' *macOS*

Returns:

* `event` Event
* `type` String - 활동을 식별하는 문자열. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` Object - Contains app-specific state stored by the activity.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise the operation will fail and `continue-activity-error` will be called.

### 이벤트: 'new-window-for-tab' *macOS*

반환:

* `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### 이벤트 'browser-window-blur'

반환:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md)에서 벗어날 때 발생됩니다.

### 이벤트: 'browser-window-focus'

Returns:

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
* `callback` 함수 
  * `isTrusted` Boolean - 인증서를 신뢰할 수있는 것으로 간주할지 여부

`url`에 대한 `certificate`를 확인하지 못했을 때 발생하며, 인증서를 신뢰할 경우 `event.preventDefault()`선언과 `callback(true)`의 호출로 기본 동작의 실행을 방지해야 합니다.

```javascript
const {app} = require('electron')

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
* `callback` 함수 
  * `certificate` [Certificate](structures/certificate.md) (optional)

Emitted when a client certificate is requested.

The `url` corresponds to the navigation entry requesting the client certificate and `callback` can be called with an entry filtered from the list. Using `event.preventDefault()` prevents the application from using the first certificate from the store.

```javascript
const {app} = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### 이벤트: 'login'

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
* `callback` 함수 
  * `username` String
  * `password` String

Emitted when `webContents` wants to do basic auth.

The default behavior is to cancel all authentications, to override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### 이벤트: 'gpu-process-crashed'

Returns:

* `event` Event
* `killed` Boolean

Emitted when the gpu process crashes or is killed.

### 이벤트: 'accessibility-support-changed' *macOS* *Windows*

Returns:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitted when Chrome's accessibility support changes. This event fires when assistive technologies, such as screen readers, are enabled or disabled. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### Event: 'session-created'

반환:

* `event` Event
* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const {app} = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Returns:

* `event` Event
* `argv` String[] - An array of the second instance's command line arguments
* `workingDirectory` String - The second instance's working directory

This event will be emitted inside the primary instance of your application when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

## 메소드

`app` 객체에서 사용할 수 있는 메서드입니다:

**참고:** 몇몇 메서드는 특정 운영체제에서만 사용할 수 있습니다.

### `app.quit()`

모든 창을 닫는 것을 시도합니다. 첫번째로 `before-quit` 이벤트가 발생합니다. 만약 모든 창이 성공적으로 닫혔다면, `will-quit` 이벤트가 발생하고, 일반적으로 애플리케이션이 종료됩니다.

이 메서드는 모든 `beforeunload` 와 `unload` 이벤트 핸들러가 올바르게 실행되는 것을 보장합니다. `beforeunload` 이벤트 핸들러에서 `false`를 반환하는 윈도우에 의해 종료 동작이 중단될 수 있습니다.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

`exitCode`로 즉시 종료합니다. `exitCode`의 기본값은 0 입니다.

사용자에게 묻지 않고 모든 창이 즉시 닫히고, `before-quit` 이벤트와 `will-quit` 이벤트가 발생하지 않습니다.

### `app.relaunch([options])`

* `options` Object (선택) 
  * `args` String[] (optional)
  * `execPath` String (optional)

현재 인스턴스가 종료되면 앱을 다시 실행합니다.

기본적으로 새로 실행될 인스턴스는 현재 아직 종료되지 않은 인스턴스와 동일한 실행 경로, 실행 명령의 인자값을 사용합니다. `args`가 지정된 경우, 기존 인스턴스의 실행 명령의 인자값 대신 `args`를 실행 명령의 매개변수로 넘겨줍니다. `execPath`가 지정된 경우, 앱이 재시작될 때 현재 앱의 경로 대신 `execPath`경로에 있는 앱이 실행됩니다.

이 메서드는 호출했을 때 현재 실행중인 앱을 종료하는 것이 아니기 때문에, 앱을 재시작하기 위해서는 `app.relaunch`를 호출한 후에 `app.quit`혹은 `app.exit`을 호출해야 합니다.

`app.relaunch`가 여러번 호출되면, 현재 인스턴스가 종료된 후에 여러개의 인스턴스가 시작됩니다.

현재 인스턴스를 즉시 재시작하면서 실행 명령에 새로운 매개변수를 추가하는 예제입니다:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

`Boolean`을 반환 - 일렉트론이 초기화를 끝냈으면 `true`를, 그렇지 않으면 `false`를 반환합니다.

### `app.whenReady()`

Returns `Promise` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

Linux에서는, visible상태인 윈도우 중 첫번째 창에 focus를 줍니다. macOS에서는 해당 일렉트론 애플리케이션 활성화합니다. Windows에서는 해당 일렉트론 애플리케이션 첫번째 윈도우에 focus를 줍니다.

### `app.hide()` *macOS*

모든 애플리케이션의 창을 최소화하지 않고 숨깁니다.

### `app.show()` *macOS*

애플리케이션의 숨겨진 윈도우를 다시 보이도록 합니다. 자동으로 창이 포커스되지는 않습니다.

### `app.getAppPath()`

`String`을 반환 - 현재 애플리케이션 디렉토리.

### `app.getPath(name)`

* PrinterInfo Object

`String` 반환 - `name`과 관련된 특정한 디렉토리 또는 연관된 파일까지의 경로. 실패 시 `Error`를 발생시킵니다.

아래와 같은 경로를 name에 넣어 함수를 호출할 수 있습니다.

* `home` User의 home 디렉토리.
* `appData` /user 의 Application Data 디렉토리. 기본적으로 아래와 같은 경로를 가리킵니다: 
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
* `pictures` Directory for a user's pictures.
* `videos` Directory for a user's videos.
* `logs` Directory for your app's log folder.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (선택) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on *Linux*, 32x32 on *Windows*, unsupported on *macOS*.
* `callback` 함수 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
* Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* PrinterInfo Object
* `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* PrinterInfo Object

Overrides the current application's name.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows you have to call it after the `ready` events gets emitted.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Clears the recent documents list.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

`Boolean`을 반환합니다

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Returns `Boolean` - Whether the call succeeded.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

Returns `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**참고:** `JumpListCategory` 객체가 `type`, `name` 속성 둘 다 없다면, `type`은 `tasks`로 가정합니다. `name` 속성이 설정되었지만 `type` 속성이 생략된 경우, `type`은 `custom`으로 가정합니다.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

```javascript
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // 이름이 지정됬으니 `type`는 "custom" 입니다.
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
  { // 이름과 종류가 없으니 `type`는 "tasks" 입니다.
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

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

두 번째 인스턴스가 실행됐을 때 주 인스턴스의 창을 활성화하는 예제입니다.

```javascript
const {app} = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

`Boolean`을 반환합니다

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)와 맵핑됩니다.
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

[애플리케이션 유저 모델 ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)를 `id`로 변경합니다.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` 함수 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

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

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (선택) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. 예시:

```javascript
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

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` *macOS*

* `options` Object 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - `critical` 혹은 `informational`가 될 수 있습니다. 기본값은 `informational` 입니다.

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Dock 아이콘의 알림 배지(badge) 안에 표현될 텍스트를 설정합니다.

### `app.dock.getBadge()` *macOS*

`String`을 반환 - Dock 아이콘의 알림 배지(badge) 안에 있는 문자열을 반환합니다.

### `app.dock.hide()` *macOS*

Dock 아이콘을 숨깁니다.

### `app.dock.show()` *macOS*

Dock 아이콘을 표시합니다.

### `app.dock.isVisible()` *macOS*

`Boolean`을 반환 - dock 아이콘이 보이는지를 나타냅니다. `app.dock.show()` 요청은 비동기라서 이 메서드는 직후에 바로 실행하면 참을 반환하지 않을 수 있습니다.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

`image` Dock 메뉴의 아이콘과 관련된 이미지를 설정합니다.

## 속성

### `app.isPackaged`

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.