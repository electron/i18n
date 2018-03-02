# Obiekt NotificationAction

* `type` String - rodzaj działania, może być `button`.
* `text` String - (opcjonalne) etykieta dla danej akcji.

## Platformy / wsparcie działań

| Typ czynności | Wspierane platformy | Użycie `text`                   | Domyślny `text` | Ograniczenia                                                                                                                                                                                         |
| ------------- | ------------------- | ------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `przycisk`    | macOS               | Używana jako etykieta przycisku | "Pokaż"         | Maksymalnie jeden przycisk, jeśli zostanie podane więcej niż jdeden, to używany jest tylko ostatni. Ta akcja jest także niezgodna z `hasReply` i zostanie zignorowana, jeśli `hasReply` jest `true`. |

### Przycisk wsparcia na macOS

W celu zgłoszenia dodatkowych przycisków do pracy na macOS aplikacja musi spełniać następujące kryteria.

* Aplikacja jest podpisana
* Aplikacja ma ustawione `NSUserNotificationAlertStyle` na `alert` w `info.plist`.

Jeśli jedno z wymagań nie jest spełnione, to przycisk po prostu nie będzie wyświetlany.