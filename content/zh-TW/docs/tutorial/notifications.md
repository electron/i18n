# 通知 (Windows, Linux, macOS)

三種作業系統都提供了由應用程式發送通知給使用者的方法。 Electron 讓開發者能方便的透過 [HTML5 通知 API](https://notifications.spec.whatwg.org/) 發送通知，再交由各作業系統原生的通知 API 來顯示。

**注意:** 因為 HTML5 API 只能在畫面轉譯處理序裡用。 如果你想由主處理序顯示通知，請參考 [Notification](../api/notification.md) 模組。

```javascript
let myNotification = new Notification('標題', {
  body: '鼠牛虎兔龍蛇馬羊猴雞狗豬'
})

myNotification.onclick = () => {
  console.log('點了通知')
}
```

While code and user experience across operating systems are similar, there are subtle differences.

## Windows

* On Windows 10, notifications "just work".
* On Windows 8.1 and Windows 8, a shortcut to your app, with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx), must be installed to the Start screen. Note, however, that it does not need to be pinned to the Start screen.
* On Windows 7, notifications work via a custom implementation which visually resembles the native one on newer systems.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

### 進階通知

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### 勿打擾時間 / 簡報模式

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### 進階通知

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### 勿擾模式 / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.