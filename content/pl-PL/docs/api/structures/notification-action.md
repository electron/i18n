# Obiekt NotificationAction

* `type` String - rodzaj działania, może być `button`.
* `text` String (optional) - The label for the given action.

## Platformy / wsparcie działań

| Typ czynności | Wspierane platformy | Użycie `text`                   | Domyślny `text`                                                                             | Ograniczenia                                                                                                                                                                                                                                                              |
| ------------- | ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `przycisk`    | macOS               | Używana jako etykieta przycisku | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Przycisk wsparcia na macOS

W celu zgłoszenia dodatkowych przycisków do pracy na macOS aplikacja musi spełniać następujące kryteria.

* Aplikacja jest podpisana
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Jeśli jedno z wymagań nie jest spełnione, to przycisk po prostu nie będzie wyświetlany.