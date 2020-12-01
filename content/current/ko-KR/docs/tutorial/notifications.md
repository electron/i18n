# 알림 (Windows, Linux, macOS)

## 개요

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](../api/notification.md) module.

## Example

### Show notifications in the Renderer process

Assuming you have a working Electron application from the [Quick Start Guide](quick-start.md), add the following line to the `index.html` file before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

and add the `renderer.js` file:

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

After launching the Electron application, you should see the notification:

![Notification in the Renderer process](../images/notification-renderer.png)

If you open the Console and then click the notification, you will see the message that was generated after triggering the `onclick` event:

![Onclick message for the notification](../images/message-notification-renderer.png)

### Show notifications in the Main process

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

After launching the Electron application, you should see the notification:

![Notification in the Main process](../images/notification-main.png)

## Additional information

전반적인 코드 및 사용자 경험(UX)은 운영체제마다 비슷하지만, 약간의 차이가 있습니다.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* Windows 8.1 및 Windows 8.0 에서는 [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)와 앱의 바로가기가 시작화면(Start screen)에 설치되어 있어야 합니다. 그러나, 시작화면에 고정시킬 필요는 없습니다.
* Windows 7에서, notifications은 새로운 시스템에서 native notification과 시각적으로 유사하게 커스텀으로 구현함으로써 동작합니다.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) yourself.

게다가, Windows 8에서 notification 본문의 최대 길이는 250 자이며, Windows 팀에서는 notifications을 200 자로 유지하도록 권장합니다. Windows 팀에서 합리적인 개발자가 되기를 요청한다고 말하면서, Windows 10에서 문자수 제한을 제거했습니다. 거대한 양의 텍스트를 API (수천 자) 로 보내려고 시도하면 불안정 할 수 있습니다.

#### 고급 알림

최신 버전의 Windows에서는 사용자 지정 서식 파일, 이미지 및 기타 유연한 요소을 사용한 advanced notifications을 허용합니다. 이러한 notifications을 보내려면 (main process 또는 renderer process 에서), 사용자 공간(userland or userspace) 모듈 [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications)을 사용하거나, native Node 추가 기능을 사용하여 `ToastNotification` 및 `TileNotification` 개체를 보냅니다.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### 조용한 시간 / 프리젠테이션 모드

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

MacOS에서는 Notifications이 간단하지만, Apple의 휴먼 인터페이스 가이드 라인([Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/)) 을 숙지해야합니다.

Notifications은 크기가 256 바이트로 제한되고 제한을 초과하면 잘립니다.

#### 고급 알림

최신 버전의 macOS는 사용자가  notification에 신속하게 응답 할 수 있도록, 입력 필드가있는 notifications을 허용합니다. 입력 필드와 함께 notifications을 보내려면, userland 모듈 [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier)를 사용하십시오.

#### 방해금지 / 세션 상태

Notification을 보낼 수 있는지 여부를 확인하려면, userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state)를 사용하십시오.

이렇게 하면 notification을 표시 여부를 미리 정할 수 있습니다.

### Linux

Notifications은 libnotify</0를 사용하여 전송되며, Cinnamon, Enlightenment, Unity, GNOME, KDE를 포함한 <a href="https://developer.gnome.org/notification-spec/">Desktop Notifications Specification</a>을 따르는 어떠한 데스크톱 환경에도 notifications을 표시 할 수 있습니다..</p>
