# Notifications (Windows, Linux, macOS)

세 가지 운영 체제 모두 응용 프로그램에서 사용자에게 notifications을 보내는 수단을 제공합니다. Electron은 개발자가 [HTML5 Notification API](https://notifications.spec.whatwg.org/)를 사용하여 알림을 보내고, 현재 실행중인 운영 체제의 native notification API를 사용하여 편리하게 표시 할 수 있습니다.

**Note:** HTML5 API 이므로 오직 렌더러 프로세스에서만 사용이 가능합니다. 만약 main process에 Notifications을 표시하려면 [Notification](../api/notification.md) 모듈을 확인하십시오.

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

운영 체제 전반에서 코드 및 사용자 경험이 비슷하지만, 미묘한 차이가 있습니다.

## Windows

* Windows 10에서 notifications은 "작동 합니다".
* Windows 8.1 및 Windows 8에서는 [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)와 앱의 바로 가기가 시작 화면에 설치되어 있어야 합니다. 참고, 그러나, 시작 화면에 고정 시킬 필요는 없습니다.
* Windows 7에서, notifications은 새로운 시스템에서 native notification과 시각적으로 유사하게 커스텀으로 구현함으로써 동작합니다.

게다가, Windows 8에서 notification 본문의 최대 길이는 250 자이며, Windows 팀에서는 notifications을 200 자로 유지하도록 권장합니다. Windows 팀에서 합리적인 개발자가 되기를 요청한다고 말하면서, Windows 10에서 문자수 제한을 제거했습니다. 거대한 양의 텍스트를 API (수천 자) 로 보내려고 시도하면 불안정 할 수 있습니다.

### Advanced Notifications

최신 버전의 Windows에서는 사용자 지정 서식 파일, 이미지 및 기타 유연한 요소을 사용한 advanced notifications을 허용합니다. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Quiet Hours / Presentation Mode

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Advanced Notifications

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.