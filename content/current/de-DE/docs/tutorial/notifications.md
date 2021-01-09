# Notifications (Windows, Linux, macOS)

## Übersicht

Alle drei Betriebssysteme bieten Mittel für Anwendungen, um Benachrichtigungen an den Benutzer zu senden. Die Technik der Anzeige von Benachrichtigungen ist anders für die Haupt- und Renderer-Prozesse.

Für den Renderer-Prozess ermöglicht Electron Entwicklern das Senden von Benachrichtigungen mit der [HTML5 Notification API](https://notifications.spec.whatwg.org/), Verwendung der nativen Benachrichtigungs-APIs des laufenden Betriebssystems , um sie anzuzeigen.

Um Benachrichtigungen im Hauptprozess anzuzeigen, müssen Sie das [Benachrichtigungsmodul](../api/notification.md) verwenden.

## Beispiel

### Benachrichtigungen im Renderer-Prozess anzeigen

Angenommen, Sie haben eine funktionierende Electron-Anwendung aus dem [Schnellstart-Leitfaden](quick-start.md), füge die folgende Zeile dem `Index hinzu. tml` Datei vor dem Schließen `</body>` Tag:

```html
<script src="renderer.js"></script>
```

und fügen Sie die `renderer.js` Datei hinzu:

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Nach dem Start der Electron-Anwendung sollten Sie die Benachrichtigung sehen:

![Benachrichtigung im Renderer-Prozess](../images/notification-renderer.png)

Wenn Sie die Konsole öffnen und dann auf die Benachrichtigung klicken, du wirst die Nachricht sehen, die nach dem Auslösen des `onclick` Ereignisses generiert wurde:

![Onclick-Nachricht für die Benachrichtigung](../images/message-notification-renderer.png)

### Benachrichtigungen im Hauptprozess anzeigen

Beginnend mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` Datei mit den folgenden Zeilen:

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Nach dem Start der Electron-Anwendung sollten Sie die Benachrichtigung sehen:

![Benachrichtigung im Hauptprozess](../images/notification-main.png)

## Zusätzliche Informationen

Während Code und Benutzererfahrung innerhalb der Betriebssysteme ähnlich sind, gibt es leichte Unterschiede.

### Windows

* Unter Windows 10 muss eine Verknüpfung mit Ihrer App mit einer [Anwendungsbenutzer-ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) im Startmenü installiert werden. Dies kann während der Entwicklung überkill sein. Das Hinzufügen von `node_modules\electron\dist\electron.exe` in Ihr Startmenü führt auch den Trick aus. Navigieren Sie zur Datei im Explorer, mit der rechten Maustaste und dem 'Pin to Start Menu'. Sie müssen dann die Zeile `app.setAppUserModelId(process.execPath)` zu Ihrem Hauptprozess hinzufügen, um Benachrichtigungen zu sehen.
* Unter Windows 8.1 und Windows 8 muss eine Verknüpfung zu Ihrer App mit einer [Anwendungsbenutzer Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) auf dem Startbildschirm installiert sein. Note, however, that it does not need to be pinned to the Start screen.
* Unter Windows 7 funktionieren Benachrichtigungen über eine benutzerdefinierte Implementierung, die visuell der nativen auf neueren Systemen ähnelt.

Electron versucht die Arbeit um die Application User Model ID zu automatisieren. Wenn Electron zusammen mit dem Installations- und Update-Framework Squirrel verwendet wird, werden [Verknüpfungen automatisch korrekt](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events) gesetzt. Darüber hinaus wird Electron erkennen, dass Squirrel verwendet wurde und wird automatisch `app.setAppUserModelId()` mit dem korrekten Wert aufrufen. Während der Entwicklung können Sie aufrufen [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) selbst.

Außerdem beträgt die maximale Länge für den Benachrichtigungstext unter Windows 8 250 Zeichen, mit dem Windows-Team, das empfiehlt, Benachrichtigungen bis 200 Zeichen zu halten. Allerdings wurde diese Einschränkung in Windows 10 entfernt, da das Windows-Team die Entwickler auffordert, vernünftig zu sein. Der Versuch, gigantische Textmengen an die API zu senden (Tausende von Zeichen) könnte zu Instabilität führen.

#### Erweiterte Benachrichtigungen

Spätere Windows-Versionen ermöglichen erweiterte Benachrichtigungen, mit benutzerdefinierten Vorlagen, Bildern und anderen flexiblen Elementen. Um diese Benachrichtigungen zu senden (von entweder dem Hauptprozess oder dem Renderer-Prozess), verwenden Sie das Userland Modul [Elektron-Windows-Benachrichtigungen](https://github.com/felixrieseberg/electron-windows-notifications), welches native Node-Addons verwendet, um `ToastNotification` und `TileNotification` Objekte zu senden.

Während Benachrichtigungen mit Schaltflächen funktionieren mit `Elektron-Windows-Benachrichtigungen`, Die Bearbeitung von Antworten erfordert die Verwendung von [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), , was hilft, die benötigten COM-Komponenten zu registrieren und Ihre Electron-App mit den eingegebenen Benutzerdaten aufzurufen.

#### Ruhige Stunden / Präsentationsmodus

Um festzustellen, ob Sie eine Benachrichtigung senden dürfen oder nicht, verwenden Sie das Userland Modul [Elektron-Benachrichtigungsstatus](https://github.com/felixrieseberg/electron-notification-state).

So können Sie vorzeitig festlegen, ob Windows die Benachrichtigung stillschweigend wegwirft.

### macOS

Benachrichtigungen sind auf macOS geradlinig, aber du solltest dir [Apples Human Interface-Richtlinien bezüglich Benachrichtigungen](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/) bewusst sein.

Beachten Sie, dass Benachrichtigungen auf 256 Bytes in der Größe begrenzt sind und abgeschnitten werden, wenn Sie dieses Limit überschreiten.

#### Erweiterte Benachrichtigungen

Spätere Versionen von macOS ermöglichen Benachrichtigungen mit einem Eingabefeld, so dass Benutzer schnell auf eine Benachrichtigung antworten kann. Um Benachrichtigungen mit einem Eingabefeld zu senden, verwenden Sie das Userland-Modul [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Nicht stören / Sitzungszustand

Um festzustellen, ob Sie eine Benachrichtigung senden dürfen oder nicht, verwenden Sie das Userland-Modul [Elektron-Benachrichtigungsstatus](https://github.com/felixrieseberg/electron-notification-state).

Dadurch können Sie frühzeitig erkennen, ob die Benachrichtigung angezeigt wird oder nicht.

### Linux

Benachrichtigungen werden mit `libnotify` gesendet, die Benachrichtigungen in jeder Desktopumgebung anzeigen können, die [Desktopbenachrichtigungen Spezifikation](https://developer.gnome.org/notification-spec/)folgt einschließlich Cinnamon, Aufklärung, Einheit, GNOME, KDE.
