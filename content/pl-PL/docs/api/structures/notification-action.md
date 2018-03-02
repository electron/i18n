# Obiekt NotificationAction

* `type` String - rodzaj działania, może być `button`.
* `text` String - (opcjonalne) etykieta dla danej akcji.

## Platformy / wsparcie działań

| Typ czynności | Wspierane platformy | Użycie `text`                   | Domyślny `text` | Ograniczenia                                                                                                                                                         |
| ------------- | ------------------- | ------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `przycisk`    | macOS               | Używana jako etykieta przycisku | "Pokaż"         | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.