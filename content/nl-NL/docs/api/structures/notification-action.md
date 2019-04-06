# NotificationAction Object

* `type` String - Het type actie van de actie, kan `button` zijn.
* `text` String (optioneel) - Het label voor de gegeven actie.

## Platform- / Actie-ondersteuning

| Type actie | Platform-ondersteuning | Gebruik van `tekst`              | Standaard `tekst`                                                                           | Limitaties                                                                                                                                                                                                                                                                |
| ---------- | ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`   | macOS                  | Used as the label for the button | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

If either of these requirements are not met the button won't appear.