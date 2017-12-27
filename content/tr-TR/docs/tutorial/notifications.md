# Bildirimler (Windows, Linux, macOS)

All three operating systems provide means for applications to send notifications to the user. Elektron, geliştiricilerin [ HTML5 Bildirim API'sı ](https://notifications.spec.whatwg.org/), ile halihazırda çalışan işletim sistemlerinin yerel bildirim API'sini görüntüleme için kullanarak bildirim göndermeleri için elverişlidir.

** Not: ** Bu bir HTML5 API'sı olduğundan, yalnızca oluşturucu işleminde kullanılabilir. Eğer ana süreç içerisinde bildirimleri göstermek istiyorsanız lütfen [Notification](../api/notification.md) modülünü inceleyin.

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

İşletim sistemlerinde kod ve kullanıcı deneyimi benzer olduğu halde ince farklılıklar vardır.

## Windows

* Windows 10'da, bildirimler "sadece çalışır".
* Windows 8.1 ve Windows 8'de, uygulamanızın bir kısayolu [ Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) ile, başlangıç ​​ekranına yüklenmelidir. Not, ancak başlangıç ekranına tutturulmasına gerek yoktur.
* On Windows 7, notifications work via a custom implementation which visually resembles the native one on newer systems.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

### Gelişmiş bildirimler

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Quiet Hours / Presentation Mode

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Gelişmiş bildirimler

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.