# NotificationAction Object

* `type` String - The type of action, can be `button`.
* `text` String (optional) - The label for the given action.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text`                  | Default `text`                                                                              | Einschränkungen                                                                                                                                                                                                                                                           |
| ----------- | ---------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS            | Used as the label for the button | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button Unterstützung auf macOS

Damit zusätzliche Benachrichtigungs-Buttons unter macOS funktionieren, muss deine App die folgenden Kriterien erfüllen.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Ist eine dieser Voraussetzungen nicht erfüllt, wird der Button einfach nicht angezeigt.