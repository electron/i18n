# powerMonitor

> Überwachen Sie Die Energiezustandsänderungen.

Prozess: [Main](../glossary.md#main-process)

## Ereignisse

Das `powerMonitor` -Modul gibt die folgenden Ereignisse aus:

### Ereignis: 'suspend' _macOS_ _Windows_

Emittiert, wenn das System angehalten wird.

### Ereignis: 'Fortsetzen' _macOS_ _Windows_

Emittiert, wenn das System wieder aufgenommen wird.

### Event: 'on-ac' _macOS_ _Windows_

Emittiert, wenn das System auf Wechselstrom umgeht.

### Event: 'on-battery' _macOS_  _Windows_

Emittiert, wenn das System die Batterieleistung ändert.

### Ereignis: 'Shutdown' _Linux_ _macOS_

Wird gesendet, wenn das System kurz vor einem Neustart oder Herunterfahren steht. Wenn der Ereignishandler `e.preventDefault()`aufruft, versucht Electron, das Herunterfahren des Systems zu verzögern , damit die App ordnungsgemäß beendet werden kann. Wenn `e.preventDefault()` aufgerufen wird, sollte die App so schnell wie möglich beendet werden, indem sie so etwas wie `app.quit()`aufrufen.

### Ereignis: 'Sperrbildschirm' _macOS_ _Windows_

Emittiert, wenn das System im Begriff ist, den Bildschirm zu sperren.

### Event: 'Unlock-Screen' _macOS_ _Windows_

Emittiert, sobald der Systembildschirm entsperrt ist.

### Ereignis: 'user-did-become-active' _macOS_

Emittiert, wenn eine Anmeldesitzung aktiviert ist. Weitere Informationen finden Sie in [Dokumentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) .

### Veranstaltung: 'user-did-resign-active' _macOS_

Emittiert, wenn eine Anmeldesitzung deaktiviert ist. Weitere Informationen finden Sie in [Dokumentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) .

## Methoden

Das `powerMonitor` Modul verfügt über die folgenden Methoden:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Ganzzahl

Gibt `String` zurück - Der aktuelle Status des Systems. Kann `active`, `idle`, `locked` oder `unknown`sein.

Berechnen Sie den Imlaufzustand des Systems. `idleThreshold` ist die Zeit (in Sekunden), die vor dem Leerlauf betrachtet wird.  `locked` ist nur auf unterstützten Systemen verfügbar.

### `powerMonitor.getSystemIdleTime()`

Gibt `Integer` zurück - Leerlaufzeit in Sekunden

Berechnen Sie die Leerlaufzeit des Systems in Sekunden.

### `powerMonitor.isOnBatteryPower()`

Gibt `Boolean` zurück - Gibt an, ob das System mit Batteriestrom betrieben wird.

Um auf Änderungen an dieser Eigenschaft zu überwachen, verwenden Sie die `on-battery` und `on-ac` Ereignisse.

## Eigenschaften

### `powerMonitor.onBatteryPower`

Eine `Boolean` Eigenschaft. True, wenn das System mit Batteriestrom betrieben wird.

Siehe [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).
