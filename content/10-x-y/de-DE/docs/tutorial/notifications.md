# Benachrichtigungen (Windows, Linux, MacOS)

Alle drei Betriebssysteme bieten Möglichkeiten für Anwendungen, um Benachrichtigungen an den Benutzer zu senden. Electron ermöglicht Entwicklern das Senden von Benachrichtigungen mit der [HTML5 Notification-API](https://notifications.spec.whatwg.org/), durch die Verwendung der nativen notification APIs des laufenden Betriebssystems.

**Hinweis:** Da es sich um eine HTML5-API handelt, ist sie nur im renderer prozess verfügbar. Wenn Sie Benachrichtigungen im main process anzeigen möchten, schauen Sie sich bitte das Modul [Notification](../api/notification.md) an.

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Während Code und Benutzererfahrung innerhalb der Betriebssysteme ähnlich sind, gibt es leichte Unterschiede.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Dies kann während der Entwicklung überkill sein, daher macht das Hinzufügen von `node_modules\electron\dist\electron.exe` auch den Trick. Navigieren Sie zur Datei im Explorer, mit der rechten Maustaste und dem 'Pin to Start Menu'. Sie müssen dann die Zeile `app.setAppUserModelId(process.execPath)` zu Ihrem Hauptprozess hinzufügen, um Benachrichtigungen zu sehen.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Note, however, that it does not need to be pinned to the Start screen.
* Unter Windows 7 funktionieren Benachrichtigungen über eine benutzerdefinierte Implementierung, die visuell der nativen auf neueren Systemen ähnelt.

Electron versucht die Arbeit um die Application User Model ID zu automatisieren. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Darüber hinaus wird Electron erkennen, dass Squirrel verwendet wurde und wird automatisch `app.setAppUserModelId()` mit dem korrekten Wert aufrufen. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Außerdem beträgt die maximale Länge für den Benachrichtigungstext unter Windows 8 250 Zeichen, mit dem Windows-Team, das empfiehlt, Benachrichtigungen bis 200 Zeichen zu halten. Allerdings wurde diese Einschränkung in Windows 10 entfernt, da das Windows-Team die Entwickler auffordert, vernünftig zu sein. Der Versuch, gigantische Textmengen an die API zu senden (Tausende von Zeichen) könnte zu Instabilität führen.

### Erweiterte Benachrichtigungen

Spätere Windows-Versionen ermöglichen erweiterte Benachrichtigungen, mit benutzerdefinierten Vorlagen, Bildern und anderen flexiblen Elementen. Um diese Benachrichtigungen zu senden (von entweder dem Hauptprozess oder dem Renderer-Prozess), verwenden Sie das Userland Modul [Elektron-Windows-Benachrichtigungen](https://github.com/felixrieseberg/electron-windows-notifications), welches native Node-Addons verwendet, um `ToastNotification` und `TileNotification` Objekte zu senden.

Während Benachrichtigungen mit Schaltflächen funktionieren mit `Elektron-Windows-Benachrichtigungen`, Die Bearbeitung von Antworten erfordert die Verwendung von [`Elektron-windows-interactive-Benachrichtigungen`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), das hilft, die benötigten COM-Komponenten zu registrieren und Ihre Electron-App mit der eingegebenen Benutzerdaten aufzurufen.

### Ruhige Stunden / Präsentationsmodus

Um festzustellen, ob Sie eine Benachrichtigung senden dürfen oder nicht, verwenden Sie das Userland-Modul [Elektron-Benachrichtigungsstatus](https://github.com/felixrieseberg/electron-notification-state).

So können Sie vorzeitig festlegen, ob Windows die Benachrichtigung stillschweigend wegwerfen wird oder nicht.

## macOS

Benachrichtigungen sind auf macOS geradlinig, aber du solltest dir [Apples Human Interface-Richtlinien bezüglich Benachrichtigungen](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/) bewusst sein.

Beachten Sie, dass Benachrichtigungen auf 256 Bytes in der Größe begrenzt sind und abgeschnitten werden, wenn Sie dieses Limit überschreiten.

### Erweiterte Benachrichtigungen

Spätere Versionen von macOS ermöglichen Benachrichtigungen mit einem Eingabefeld, so dass Benutzer schnell auf eine Benachrichtigung antworten kann. Um Benachrichtigungen mit einem Eingabefeld zu senden, verwenden Sie das Userland-Modul [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Nicht stören / Sitzungszustand

Um festzustellen, ob Sie eine Benachrichtigung senden dürfen oder nicht, verwenden Sie das Userland-Modul [Elektron-Benachrichtigungsstatus](https://github.com/felixrieseberg/electron-notification-state).

Dadurch können Sie frühzeitig erkennen, ob die Benachrichtigung angezeigt wird oder nicht.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
