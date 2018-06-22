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

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. 참고, 그러나, 시작 화면에 고정 시킬 필요는 없습니다.
* Windows 7에서, notifications은 새로운 시스템에서 native notification과 시각적으로 유사하게 커스텀으로 구현함으로써 동작합니다.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

게다가, Windows 8에서 notification 본문의 최대 길이는 250 자이며, Windows 팀에서는 notifications을 200 자로 유지하도록 권장합니다. Windows 팀에서 합리적인 개발자가 되기를 요청한다고 말하면서, Windows 10에서 문자수 제한을 제거했습니다. 거대한 양의 텍스트를 API (수천 자) 로 보내려고 시도하면 불안정 할 수 있습니다.

### Advanced Notifications

최신 버전의 Windows에서는 사용자 지정 서식 파일, 이미지 및 기타 유연한 요소을 사용한 advanced notifications을 허용합니다. 이러한 notifications을 보내려면 (main process 또는 renderer process 에서), 사용자 공간(userland or userspace) 모듈 [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications)을 사용하거나, native Node 추가 기능을 사용하여 `ToastNotification` 및 `TileNotification` 개체를 보냅니다.

`electron-windows-notifications`을 사용해 버튼을 포함한 notifications이 동작하는 회신을 처리하려면 [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications)을 사용해야 합니다, 이는 필수 COM 구성 요소를 등록하고 입력 된 사용자 데이터를 사용하여 Electron 앱을 호출하는 데 도움이됩니다.

### Quiet Hours / Presentation Mode

Notification을 보낼 수 있는지 여부를 확인하려면, userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state)를 사용하십시오.

이렇게 하면 Windows가 알아서 notification을 던질지 말지를 미리 결정할 수 있습니다.

## macOS

MacOS에서는 Notifications이 간단하지만, Apple의 휴먼 인터페이스 가이드 라인([Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/)) 을 숙지해야합니다.

Notifications은 크기가 256 바이트로 제한되고 제한을 초과하면 잘립니다.

### Advanced Notifications

최신 버전의 macOS는 사용자가 notification에 신속하게 응답 할 수 있도록, 입력 필드가있는 notifications을 허용합니다. 입력 필드와 함께 notifications을 보내려면, userland 모듈 [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier)를 사용하십시오.

### Do not disturb / Session State

Notification을 보낼 수 있는지 여부를 확인하려면, userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state)를 사용하십시오.

이렇게 하면 notification을 표시 여부를 미리 정할 수 있습니다.

## Linux

Notifications은 libnotify</0를 사용하여 전송되며, Cinnamon, Enlightenment, Unity, GNOME, KDE를 포함한 <a href="https://developer.gnome.org/notification-spec/">Desktop Notifications Specification</a>을 따르는 어떠한 데스크톱 환경에도 notifications을 표시 할 수 있습니다..</p>