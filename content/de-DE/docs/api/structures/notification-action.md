# NotificationAction Objekt

* `type` String - Der Typ der Aktion, beispielsweise `button`.
* `text` String (optional) - Die Bezeichnung für die Aktion.

## Plattform- / Aktionsunterstützung

| Aktionstyp | Plattformunterstützung | Verwendung von `text`                      | Standardwert `text`                                                                         | Einschränkungen                                                                                                                                                                                                                                                                                         |
| ---------- | ---------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`   | macOS                  | Verwendung als die Bezeichnung des Buttons | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Nur das erste wird genutzt. Falls mehrere angegeben sind werden die weiteren Objekte als zusätzliche Aktionen aufgelistet (diese werden angezeigt, wenn die Maus über dem Aktionsbutton steht). Jede Aktion ist inkompatibel mit `hasReply` und wird ignoriert, wenn `hasReply` auf `true` gesetzt ist. |

### Button Unterstützung auf macOS

Damit zusätzliche Benachrichtigungs-Buttons unter macOS funktionieren, muss deine App die folgenden Kriterien erfüllen.

* Die App ist signiert
* Die App hat ihren `NSUserNotificationAlertStyle` in `Info.plist` zu `alert` gesetzt.

Ist eine dieser Voraussetzungen nicht erfüllt, wird der Button einfach nicht angezeigt.