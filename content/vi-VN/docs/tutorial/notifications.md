# Bảng thông báo (Windows, Linux, macOS)

Tất cả ba điều hành hệ thống cung cấp phương tiện cho các ứng dụng có thể gửi thông báo cho người dùng. Electron cho phép nhà phát triển để gửi thông báo một các tiện lợi với [API thông báo của HTML5](https://notifications.spec.whatwg.org/), bằng cách sử dụng thông báo của hệ điều hành đang chạy API để hiển thị nó.

**Note:** Since this is an HTML5 API it is only available in the renderer process. If you want to show Notifications in the main process please check out the [Notification](../api/notification.md) module.

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Code và cả trải nghiệm của người dùng là như nhau trong cả ba hệ điều hành, không có sự khác biệt một các tinh tế.

## Windows

* Trên Windows 10, thông báo luôn làm việc.
* Trên Windows 8.1 và Windows 8, một phím tắt cho ứng dụng của bạn, với một \[Application User Model ID\]\[app-user-model-id\], phải được cài đặt vào màn hình của Start. Lưu ý, Tuy nhiên, nó không cần phải được ghim vào màn hình Start.
* Trên Windows 7, thông báo làm việc thông qua thực hiện một tùy chỉnh trực quan tương tự như trên các hệ thống mới hơn.

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