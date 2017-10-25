# 通知 (Windows, Linux, macOS)

所有三个操作系统都提供了应用程序向用户发送通知的手段。 Electron允许开发者使用 [HTML5 Notification API](https://notifications.spec.whatwg.org/) 发送通知，并使用当前运行的操作系统的本地通知 API 来显示它。

**注意:** 由于这是一个 HTML5 API，它只能在渲染器进程中使用。 如果你想在主进程中显示通知，请查看 [Notification](../api/notification.md) 模块.

```javascript
let myNotification = new Notification('标题', {
  body: '通知正文内容'
})

myNotification.onclick = () => {
  console.log('通知被点击')
}
```

While code and user experience across operating systems are similar, there are subtle differences.

## Windows

* On Windows 10, notifications "just work".
* On Windows 8.1 and Windows 8, a shortcut to your app, with an \[Application User Model ID\]\[app-user-model-id\], must be installed to the Start screen. Note, however, that it does not need to be pinned to the Start screen.
* On Windows 7, notifications work via a custom implementation which visually resembles the native one on newer systems.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

### Advanced Notifications

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Quiet Hours / Presentation Mode

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Advanced Notifications

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows \[Desktop Notifications Specification\]\[notification-spec\], including Cinnamon, Enlightenment, Unity, GNOME, KDE.