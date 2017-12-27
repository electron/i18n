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

Ayrıca, Windows 8'de bildirim gövdesi için maksimum uzunluk 250 karakterken, Windows ekibi, bildirimlerin 200 karakterde tutulması gerektiğini önermektedir. Yani, Windows ekibi geliştiriciler için makul olmak isteyerek bu limiti Windows 10 ile birlikte kaldırıldığını söyledi. API'ya dev miktarlarda metin göndermek (binlerce karakter) dengesizlik yaratabilir.

### Gelişmiş bildirimler

Windows'un daha sonraki sürümleri, gelişmiş bildirimlere, özel şablonlara, görüntüler ve diğer esnek öğelere izin verir. Bu bildirimleri göndermek için (ana işlemde yada oluşturucu işleminde), göndermek için yerel düğüm eklentilerini `ToastNotification` ve `TileNotification` objelerini kullanan userland modülünü kullanın [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications).

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