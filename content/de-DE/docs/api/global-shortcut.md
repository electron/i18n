# globalShortcut

> Erkennen Sie Tastaturereignisse, wenn die Anwendung nicht über einen Tastaturfokus verfügt.

Prozess: [Main](../glossary.md#main-process)

Das `globalShortcut` Modul kann eine globale Tastenkombination beim Betriebssystem registrieren/aufheben, sodass Sie die Vorgänge für verschiedene -Verknüpfungen anpassen können.

**Hinweis:** Die Verknüpfung ist global; Es funktioniert auch dann, wenn die App nicht über den Tastaturfokus verfügt. Dieses Modul kann nicht verwendet werden, bevor das `ready` Ereignis des App-Moduls ausgesendet wird.

```javascript
const { app, globalShortcut } = require('electron')

app.whenReady().then()=> '
  * Registrieren Sie einen 'CommandOrControl+X'-Shortcut-Listener.
  const ret = globalShortcut.register('CommandOrControl+X', () => '
    console.log('CommandOrControl+X'
  ')

  wenn (!ret) -
    Konsole.log('Registrierung fehlgeschlagen')
  '

  / überprüfen Sie, ob eine Verknüpfung registriert ist.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
')

app.on('will-quit', () => '
  /
  globalShortcut.unregister('CommandOrControl+X')

  / Alle Verknüpfungen aufheben.
  globalShortcut.unregisterAll()
)
```

## Methoden

Das `globalShortcut` Modul verfügt über die folgenden Methoden:

### `globalShortcut.register(Beschleuniger, Rückruf)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Gibt `Boolean` zurück : Gibt an, ob die Verknüpfung erfolgreich registriert wurde.

Registriert eine globale Verknüpfung von `accelerator`. Der `callback` wird aufgerufen, wenn die registrierte Verknüpfung vom Benutzer gedrückt wird.

Wenn der Beschleuniger bereits von anderen Anwendungen übernommen wird, schlägt dieser Aufruf stillschweigend fehl. Dieses Verhalten wird von Betriebssystemen beabsichtigt, da sie nicht wollen, dass Anwendungen für globale Verknüpfungen kämpfen.

Die folgenden Beschleuniger werden nicht erfolgreich auf macOS 10.14 Mojave registriert, es sei denn, die App als [vertrauenswürdigen Zugriffsclient autorisiert wurde](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Medienwiedergabe/Pause"
* "Media Next Track"
* "Medien vorheriger Track"
* "Medienstopp"

### `globalShortcut.registerAll(Beschleuniger, Rückruf)`

* `accelerators` String[] - ein Array von [Accelerator](accelerator.md)s.
* `callback` Function

Registriert eine globale Verknüpfung aller `accelerator` Elemente in `accelerators`. Der `callback` wird aufgerufen, wenn eine der registrierten Verknüpfungen vom Benutzer gedrückt wird.

Wenn ein gegebener Beschleuniger bereits von anderen Anwendungen übernommen wird, schlägt dieser Aufruf stillschweigend fehl. Dieses Verhalten wird von Betriebssystemen beabsichtigt, da sie nicht wollen, dass Anwendungen für globale Verknüpfungen kämpfen.

Die folgenden Beschleuniger werden nicht erfolgreich auf macOS 10.14 Mojave registriert, es sei denn, die App als [vertrauenswürdigen Zugriffsclient autorisiert wurde](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Medienwiedergabe/Pause"
* "Media Next Track"
* "Medien vorheriger Track"
* "Medienstopp"

### `globalShortcut.isRegistered(Beschleuniger)`

* `accelerator` [Accelerator](accelerator.md)

Gibt `Boolean` zurück - Gibt an, ob diese Anwendung `accelerator`registriert hat.

Wenn der Beschleuniger bereits von anderen Anwendungen übernommen wird, gibt dieser Aufruf immer noch `false`zurück. Dieses Verhalten wird von Betriebssystemen beabsichtigt, da sie nicht möchten, dass Anwendungen für globale Verknüpfungen kämpfen.

### `globalShortcut.unregister(Beschleuniger)`

* `accelerator` [Accelerator](accelerator.md)

Entregistriert die globale Verknüpfung von `accelerator`.

### `globalShortcut.unregisterAll()`

Entregistriert alle globalen Verknüpfungen.
