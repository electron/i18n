# Notifiche (Windows, Linux, macOS)

Tutti i tre sistemi operativi forniscono metodi per inviare notifiche all'utente alla applicazione. Electron consente convenientemente agli sviluppatori di inviare notifiche con l'[API Notifiche HTML5](https://notifications.spec.whatwg.org/), usando l'API notifiche nativa del il sistema operativo in uso per mostrarle.

**Nota:** Essendo questa una API HTML5 è solo disponibile nel processo di rendering. Se vuoi mostrare le notifiche nel processo principale controlla il modulo [Notifiche](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Mentre il codice e l'esperienza utente per il sistema operativo sono simili, ci sono differenze.

## Windows

* Su Windows 10, le notifiche "funzionano".
* Su Windows 8.1 e Windows 8, una shortcut alla tua app, con un [Modello ID App Utente](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx), va installato alla schermata Start. Nota, comunque, che non necessita di essere inserito nella schermata Start.
* Su Windows 7, le notifiche lavorano per un'implementazione personalizzata che riassembla visualmente quella nativa sui sistemi più nuovi.

Inoltre, in Windows 8, la lunghezza massima per il corpo notifica è 250 caratteri, con il team di Windows raccomandante che le notifiche dovrebbero essere mantenute a 200 caratteri. Detto questo, tale limitazione è stata rimossa in Windows 10, con il team di Windows richiedente agli sviluppatori di essere ragionevoli. Provare ad inviare giganti quantità di testo all'API (migliaia di caratteri) potrebbe risultare in instabilità.

### Notifiche Avanzate

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Quiet Hours / Presentation Mode

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Notifiche Avanzate

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.