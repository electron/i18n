# Powiadomienia (Windows, Linux, macOS)

Wszystkie trzy systemy operacyjne zapewniają środki dla aplikacji do wysyłania powiadomień do użytkownika. Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

**Note:** Since this is an HTML5 API it is only available in the renderer process. Jeśli chcesz pokazać Powiadomienia w głównym procesie sprawdź moduł [Powiadomienia](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

While code and user experience across operating systems are similar, there are subtle differences.

## Windows

* W systemie Windows 10, powiadomienia "po prostu działają".
* On Windows 8.1 and Windows 8, a shortcut to your app, with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx), must be installed to the Start screen. Należy pamiętać jednak, że nie musi być przypięte do ekranu startowego.
* W systemie Windows 7, powiadomienia działają przez niestandardową implementację, która wizualnie przypomina macierzyste z nowszych systemów.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

### Zaawansowane powiadomienia

Późniejsze wersje systemu Windows pozwalają na zaawansowane powiadomienia, z niestandardowymi szablonami, obrazkami oraz innymi elastycznymi elementami. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Godziny ciszy / Tryb prezentacji

Do wykrywania, czy masz możliwość wysłać powiadomienie, użyj modułu użytkownika [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Pamiętaj, że powiadomienia są ograniczone do 256 bajtów i zostają przycinane, jeśli przekroczysz limit.

### Zaawansowane powiadomienia

Późniejsze wersje macOS pozwalają na powiadomienia z polem tekstowym, pozwalając użytkownikowi szybko odpowiedzieć na powiadomienie. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Nie przeszkadzać / Stan sesji

Do wykrywania, czy masz możliwość wysłać powiadomienie, użyj modułu użytkownika [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.