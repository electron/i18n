# Obiekt NotificationAction

* `type` String - rodzaj działania, może być `button`.
* `text` String - (opcjonalne) etykieta dla danej akcji.

## Platformy / wsparcie działań

| Typ czynności | Wspierane platformy | Użycie `text`                   | Domyślny `text` | Ograniczenia                                                                                                                                                        |
| ------------- | ------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `przycisk`    | macOS               | Używana jako etykieta przycisku | "Pokaż"         | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Przycisk wsparcia na macOS

W celu zgłoszenia dodatkowych przycisków do pracy na macOS aplikacja musi spełniać następujące kryteria.

* Aplikacja jest podpisana
* Aplikacja ma ustawione `NSUserNotificationAlertStyle` na `alert` w `info.plist`.

Jeśli jedno z wymagań nie jest spełnione, to przycisk po prostu nie będzie wyświetlany.