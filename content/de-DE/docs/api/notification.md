# Mitteilung

> Erstellen von OS-Desktopbenachrichtigungen

Prozess: [Main](../glossary.md#main-process)

## Verwendung im Rendererprozess

Wenn Sie Benachrichtigungen aus einem Renderer-Prozess anzeigen möchten, sollten Sie die [HTML5-Benachrichtigungs-API verwenden,](../tutorial/notifications.md)

## Klasse: Benachrichtigung

> Erstellen von OS-Desktopbenachrichtigungen

Prozess: [Main](../glossary.md#main-process)

`Notification` ist ein [EventEmitter][event-emitter].

Es erstellt eine neue `Notification` mit systemeigenen Eigenschaften, die von der `options`festgelegt werden.

### Static Methods

Die `Notification` -Klasse verfügt über die folgenden statischen Methoden:

#### `Notification.isSupported()`

Gibt `Boolean` zurück - Gibt an, ob Desktopbenachrichtigungen auf dem aktuellen System unterstützt werden

### `neue Benachrichtigung ([options])`

* `options` Objekt (optional)
  * `title` String (optional) - Ein Titel für die Benachrichtigung, der oben im Benachrichtigungsfenster angezeigt wird, wenn sie angezeigt wird.
  * `subtitle` String (optional) _macOS_ - Ein Untertitel für die Benachrichtigung, der unter dem Titel angezeigt wird.
  * `body` String (optional) - Der Textkörper der Benachrichtigung, der unter dem Titel oder Untertitel angezeigt wird.
  * `silent` boolesch (optional) - Gibt an, ob beim Anzeigen der Benachrichtigung ein OS-Benachrichtigungsrauschen ausgesendet werden soll.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - Ein Symbol, das in der Benachrichtigung verwendet werden soll.
  * `hasReply` boolesche (optional) _macOS_ - Gibt an, ob der Benachrichtigung eine Inline-Antwortoption hinzugefügt werden soll.
  * `timeoutType` String (optional) _Linux_ _Windows_ - Die Timeoutdauer der Benachrichtigung. Kann 'default' oder 'never' sein.
  * `replyPlaceholder` String (optional) _macOS_ - Der Platzhalter, der in das Eingabefeld für inline Antworten geschrieben werden soll.
  * `sound` String (optional) _macOS_ - Der Name der Sounddatei, die wiedergegeben werden soll, wenn die Benachrichtigung angezeigt wird.
  * `urgency` String (optional) _Linux_ - Die Dringlichkeitsstufe der Benachrichtigung. Kann "normal", "kritisch" oder "niedrig" sein.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) _macOS_ - Aktionen, die der Benachrichtigung hinzugefügt werden sollen. Bitte lesen Sie die verfügbaren Aktionen und Einschränkungen in der dokumentation `NotificationAction` .
  * `closeButtonText` String (optional) _macOS_ - Ein benutzerdefinierter Titel für die Schaltfläche Schließen einer Warnung. Eine leere Zeichenfolge bewirkt, dass der standardmäßige lokalisierte Text verwendet wird.
  * `toastXml` String (optional) _Windows_ - Eine benutzerdefinierte Beschreibung der Benachrichtigung unter Windows ersetzt alle oben genannten Eigenschaften. Bietet die vollständige Anpassung des Entwurfs und des Verhaltens der Benachrichtigung.

### Instanz Events

Objekte, die mit `new Notification` erstellt wurden, senden die folgenden Ereignisse aus:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

#### Event: 'show'

Rückgabewert:

* `event` Event

Wenn die Benachrichtigung dem Benutzer angezeigt wird, beachten Sie, dass dies mehrmals ausgelöst werden kann, da eine Benachrichtigung mehrmals über die `show()` -Methode angezeigt werden kann.

#### Ereignis: 'click'

Rückgabewert:

* `event` Event

Wird gesendet, wenn der Benutzer auf die Benachrichtigung klickt.

#### Event: 'close'

Rückgabewert:

* `event` Event

Emittiert, wenn die Benachrichtigung durch manuelles Eingreifen des Benutzers geschlossen wird.

Dieses Ereignis wird nicht garantiert in allen Fällen ausgesendet, in denen die Benachrichtigung geschlossen wird.

#### Ereignis: 'Antwort' _macOS_

Rückgabewert:

* `event` Event
* `reply` String - Die Zeichenfolge, die der Benutzer in das Inline-Antwortfeld eingegeben hat.

Ausgegeben, wenn der Benutzer auf die Schaltfläche "Antworten" in einer Benachrichtigung mit `hasReply: true`klickt.

#### Veranstaltung: 'Aktion' _macOS_

Rückgabewert:

* `event` Event
* `index` - Der Index der aktivierten Aktion.

#### Ereignis: 'fehlgeschlagen' _Windows_

Rückgabewert:

* `event` Event
* `error` String - Der Fehler, der bei der Ausführung der `show()` -Methode aufgetreten ist.

Wird angezeigt, wenn beim Erstellen und Anzeigen der systemeigenen Benachrichtigung ein Fehler auftritt.

### Instanz Methoden

Objekte, die mit `new Notification` erstellt wurden, verfügen über die folgenden Instanzmethoden:

#### `notification.show()`

Sofort zeigt die Benachrichtigung an den Benutzer, bitte beachten Sie, dass dies bedeutet, im Gegensatz zu den HTML5-Benachrichtigungsimplementierung, Instanziieren eines `new Notification` es nicht sofort dem Benutzer anzeigt, müssen Sie diese Methode aufrufen, bevor das Betriebssystem sie anzeigt.

Wenn die Benachrichtigung zuvor angezeigt wurde, wird die zuvor angezeigte Benachrichtigung verworfen und eine neue Benachrichtigung mit identischen Eigenschaften erstellt.

#### `notification.close()`

Die Benachrichtigung wird verworfen.

### Instanz Eigenschaften

#### `notification.title`

Eine `String` Eigenschaft, die den Titel der Benachrichtigung darstellt.

#### `notification.subtitle`

Eine `String` Eigenschaft, die den Untertitel der Benachrichtigung darstellt.

#### `notification.body`

Eine `String` Eigenschaft, die den Text der Benachrichtigung darstellt.

#### `notification.replyPlaceholder`

Eine `String` Eigenschaft, die den Antwortplatzhalter der Benachrichtigung darstellt.

#### `notification.sound`

Eine `String` Eigenschaft, die den Klang der Benachrichtigung darstellt.

#### `notification.closeButtonText`

Eine `String` Eigenschaft, die den Text der Schaltfläche schließen der Benachrichtigung darstellt.

#### `benachrichtigung.silent`

Eine `Boolean` Eigenschaft, die angibt, ob die Benachrichtigung stumm ist.

#### `notification.hasReply`

Eine `Boolean` Eigenschaft, die angibt, ob die Benachrichtigung über eine Antwortaktion verfügt.

#### `notification.urgency` _Linux-_

Eine `String` Eigenschaft, die die Dringlichkeitsstufe der Benachrichtigung darstellt. Kann "normal", "kritisch" oder "niedrig" sein.

Standard ist "niedrig" - weitere Informationen finden Sie unter [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) .

#### `notification.timeoutType` _Linux_ _Windows_

Eine `String` Eigenschaft, die den Typ der Timeoutdauer für die Benachrichtigung darstellt. Kann 'default' oder 'never' sein.

Wenn `timeoutType` auf "nie" festgelegt ist, läuft die Benachrichtigung nie ab. Sie bleibt geöffnet, bis sie von der aufrufenden API oder dem Benutzer geschlossen wird.

#### `benachrichtigung.Aktionen`

Eine [`NotificationAction[]`](structures/notification-action.md) Eigenschaft, die die Aktionen der Benachrichtigung darstellt.

#### `notification.toastXml` _Windows-_

Eine `String` Eigenschaft, die den benutzerdefinierten Popup-XML der Benachrichtigung darstellt.

### Wiedergabe von Sounds

Unter macOS können Sie den Namen des Sounds angeben, den Sie wiedergeben möchten, wenn die Benachrichtigung angezeigt wird. Jeder der Standard-Sounds (unter Systemeinstellungen > Sound) kann zusätzlich zu benutzerdefinierten Sounddateien verwendet werden. Stellen Sie sicher, dass die Sound- -Datei unter dem App-Bundle (z. B. `YourApp.app/Contents/Resources`) kopiert wird, oder einer der folgenden Speicherorte:

* `Bibliothek/Sounds`
* `/Bibliothek/Sounds`
* `/Netzwerk/Bibliothek/Sounds`
* `/System/Bibliothek/Sounds`

Weitere Informationen finden Sie in den [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) -Dokumenten.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
