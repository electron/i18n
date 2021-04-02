## Klasse: Tray

> Fügen Sie Symbole und Kontextmenüs in den Benachrichtigungsbereich des Systems hinzu.

Prozess: [Main](../glossary.md#main-process)

`Tray` ist ein [EventEmitter][event-emitter].

```javascript
const { app, Menu, Tray } = require('electron')

lassen tray = null
app.whenReady().then() => '
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

```

__Plattform-Einschränkungen:__

* Unter Linux wird der App-Indikator verwendet, wenn er unterstützt wird, ansonsten wird `GtkStatusIcon` verwendet.
* Bei Linux-Distributionen, die nur App-Indikator-Unterstützung haben, müssen Sie `libappindicator1` installieren, damit das Tray-Symbol funktioniert.
* App-Indikator wird nur angezeigt, wenn es ein Kontextmenü hat.
* Wenn die App-Anzeige auf Linux verwendet wird, wird das `click` Ereignis ignoriert.
* Unter Linux, damit Änderungen an einzelnen `MenuItem`wirksam werden, sie `setContextMenu` erneut aufrufen müssen. Ein Beispiel:

```javascript
const { app, Menu, Tray } = require('electron')

appIcon = null
app.whenReady().then()=> '
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFrom Template([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  / Ändern Sie das Kontextmenü
  contextMenu.items[1].checked = false

  / Rufen Sie dies erneut für Linux auf, da wir das Kontextmenü
  appIcon.setContextMenu(contextMenu)
geändert haben.
```

* Unter Windows wird empfohlen, `ICO` Icons zu verwenden, um beste visuelle Effekte zu erhalten.

Wenn Sie genau die gleichen Verhaltensweisen auf allen Plattformen beibehalten möchten, sollten Sie sich nicht auf das `click` -Ereignis verlassen und immer ein Kontextmenü an das Tray-Symbol anhängen.

### `neues Fach(Bild, [guid])`

* `image` ([NativeImage](native-image.md) | String)
* `guid` String (optional) _Windows_ - Weist dem Traysymbol eine GUID zu. Wenn die ausführbare Datei signiert ist und die Signatur eine Organisation in der Betreffzeile enthält, ist die GUID dieser Signatur dauerhaft zugeordnet. EINSTELLUNGEN auf Betriebssystemebene wie die Position des Traysymbols in der Taskleiste bleiben auch dann erhalten, wenn sich der Pfad zur ausführbaren Datei ändert. Wenn die ausführbare Datei nicht mit Code signiert ist, ist die GUID dauerhaft dem Pfad zur ausführbaren Datei zugeordnet. Wenn Sie den Pfad zur ausführbaren Datei ändern, wird die Erstellung des Traysymbols durchgehen, und es muss eine neue GUID verwendet werden. Es wird jedoch dringend empfohlen, den GUID-Parameter nur in Verbindung mit der codesignierten ausführbaren Datei zu verwenden. Wenn eine App mehrere Traysymbole definiert, muss jedes Symbol eine separate GUID verwenden.

Erstellt ein neues Traysymbol, das dem `image`zugeordnet ist.

### Instanz Events

Das `Tray` Modul sendet folgende Ereignisse aus:

#### Ereignis: 'click'

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rechteck](structures/rectangle.md) - Die Grenzen des Tray-Symbols.
* `position` [Punkt](structures/point.md) - Die Position des Events.

Wird beim Klicken des Tray Icons gesendet.

#### Ereignis: 'right-click' _macOS_ _Windows_

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rechteck](structures/rectangle.md) - Die Grenzen des Tray-Symbols.

Wird durch einen Rechts Klick auf das Tray Icon gesendet.

#### Ereignis: 'double-click' _macOS_ _Windows_

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rechteck](structures/rectangle.md) - Die Grenzen des Tray-Symbols.

Emittiert, wenn das Traysymbol doppelt angeklickt wird.

#### Veranstaltung: 'Balloon-Show' _Windows_

Emittiert, wenn der Trayballon angezeigt wird.

#### Ereignis: 'Ballon-Klick' _Windows_

Emittiert, wenn auf die Tray-Sprechblase geklickt wird.

#### Veranstaltung: 'ballongeschlossen' _Windows_

Emittiert, wenn die Tray-Ballonwegen aufgrund eines Timeouts geschlossen wird oder der Benutzer sie manuell schließt.

#### Veranstaltung: 'drop' _macOS_

Ausgegeben, wenn gezogene Elemente auf dem Fachsymbol abgelegt werden.

#### Ereignis: 'Drop-Files' _macOS_

Rückgabewert:

* `event` Event
* `files` String[] - Die Pfade der gelöschten Dateien.

Emittiert, wenn gezogene Dateien im Tray-Symbol abgelegt werden.

#### Veranstaltung: 'Drop-Text' _macOS_

Rückgabewert:

* `event` Event
* `text` String - die gelöschte Textzeichenfolge.

Emittiert, wenn gezogener Text im Tray-Symbol abgelegt wird.

#### Ereignis: 'drag-enter' _macOS_

Emittiert, wenn ein Ziehvorgang in das Traysymbol eindringt.

#### Ereignis: 'drag-leave' _macOS_

Wird gesendet, wenn ein Ziehvorgang das Traysymbol verlässt.

#### Ereignis: 'Drag-End' _macOS_

Wird ausgegeben, wenn ein Ziehvorgang auf dem Fach oder an einer anderen Position endet.

#### Veranstaltung: 'mouse-up' _macOS_

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Punkt](structures/point.md) - Die Position des Events.

Emittiert, wenn die Maus durch Klicken auf das Tray-Symbol freigegeben wird.

Hinweis: Dies wird nicht angezeigt, wenn Sie ein Kontextmenü für Ihr Fach mit `tray.setContextMenu`festgelegt haben, da Einschränkungen auf macOS-Ebene vorgenommen wurden.

#### Veranstaltung: 'mouse-down' _macOS_

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Punkt](structures/point.md) - Die Position des Events.

Emittiert, wenn die Maus auf das Tray-Symbol klickt.

#### Ereignis: 'mouse-enter' _macOS_

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Punkt](structures/point.md) - Die Position des Events.

Emittiert, wenn die Maus das Tray-Symbol betritt.

#### Veranstaltung: 'mouse-leave' _macOS_

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Punkt](structures/point.md) - Die Position des Events.

Emittiert, wenn die Maus das Tray-Symbol verlässt.

#### Ereignis: 'mausbewegen' _macOS_ _Windows_

Rückgabewert:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Punkt](structures/point.md) - Die Position des Events.

Emittiert, wenn sich die Maus im Tray-Symbol bewegt.

### Instanz Methoden

Die `Tray` -Klasse verfügt über die folgenden Methoden:

#### `tray.destroy()`

Zerstört das Tray-Symbol sofort.

#### `tray.setImage(Bild)`

* `image` ([NativeImage](native-image.md) | String)

Legt die `image` fest, die diesem Fachsymbol zugeordnet sind.

#### `tray.setPressedImage(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Legt die `image` , die diesem Traysymbol zugeordnet sind, wenn sie unter macOS gedrückt werden.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Legt den Hover-Text für dieses Tray-Symbol fest.

#### `tray.setTitle(title[, options])` _macOS-_

* `title` String
* `options` Objekt (optional)
  * `fontType` String (optional) - Die anzuzeigende Schriftfamilienvariante kann `monospaced` oder `monospacedDigit`sein. `monospaced` ist in macOS 10.15+ und `monospacedDigit` in macOS 10.11+ verfügbar.  Wenn der Titel leer bleibt, verwendet er die Standardsystemschriftart.

Legt den Titel fest, der neben dem Tray Icon in der Statusleiste angezeigt wird (Unterstütz ANSI-Farben).

#### `tray.getTitle()` _macOS_

Gibt `String` zurück - der Titel, der neben dem Tray-Symbol in der Statusleiste angezeigt wird

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

Legt die Option zum Ignorieren von Doppelklickereignissen fest. Wenn Sie diese Ereignisse ignorieren, können Sie jeden einzelnen Klick auf das Tray-Symbol erkennen.

Dieser Wert ist standardmäßig auf false festgelegt.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Gibt `Boolean` zurück – Gibt an, ob Doppelklickereignisse ignoriert werden.

#### `tray.displayBalloon(options)` _Windows_

* `options` -Objekt
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Symbol, das verwendet werden soll, wenn `iconType` `custom`ist.
  * `iconType` String (optional) - Kann `none`, `info`, `warning`, `error` oder `custom`sein. Der Standardwert ist `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (optional) - Die große Version des Symbols sollte verwendet werden. Standard ist `true`. Karten zu [`NIIF_LARGE_ICON`][NIIF_LARGE_ICON].
  * `noSound` Boolean (optional) - Spielen Sie nicht den zugehörigen Sound ab. Standard ist `false`. Karten zu [`NIIF_NOSOUND`][NIIF_NOSOUND].
  * `respectQuietTime` Boolean (optional) - Zeigen Sie die Sprechblase nicht an, wenn sich der aktuelle Benutzer in "ruhiger Zeit" befindet. Standard ist `false`. Karten zu [`NIIF_RESPECT_QUIET_TIME`][NIIF_RESPECT_QUIET_TIME].

Zeigt eine Tray-Ballonanflugans an.

#### `tray.removeBalloon()` _Windows_

Entfernt einen Tray-Ballon.

#### `tray.focus()` _Windows_

Gibt den Fokus auf den Taskleistenbenachrichtigungsbereich zurück. Benachrichtigungsbereichssymbole sollten diese Meldung verwenden, wenn sie den UI-Vorgang abgeschlossen haben. Wenn das Symbol z. B. ein Kontextmenü anzeigt, der Benutzer esC jedoch drückt, um es abzubrechen, `tray.focus()` verwenden, um den Fokus auf den Infobereich zurückzugeben.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menü (optional)
* `position` [Punkt](structures/point.md) (optional) - Die Pop-up-Position.

Öffnet das Kontextmenü des Tray-Symbols. Wenn `menu` übergeben wird, wird die `menu` anstelle des Kontextmenüs des Fachsymbols angezeigt.

Die `position` ist nur unter Windows verfügbar und ist standardmäßig (0, 0).

#### `tray.closeContextMenu()` _macOS_ _Windows_

Schließt ein geöffnetes Kontextmenü, das von `tray.setContextMenu()`festgelegt ist.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Legt das Kontextmenü für dieses Symbol fest.

#### `tray.getBounds()` _macOS_ _Windows_

Returns [`Rectangle`](structures/rectangle.md)

Die `bounds` dieses Fachsymbols als `Object`.

#### `tray.isDestroyed()`

Gibt `Boolean` zurück - Gibt an, ob das Traysymbol zerstört ist.

[NIIF_NOSOUND]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010
[NIIF_LARGE_ICON]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020
[NIIF_RESPECT_QUIET_TIME]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
