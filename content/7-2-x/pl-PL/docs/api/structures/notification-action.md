# Obiekt NotificationAction

* `type` String - rodzaj działania, może być `button`.
* `text` String (opcjonalny) - Etykieta danego działania.

## Platformy / Wsparcie Działań

| Typ czynności | Wspierane platformy | Użycie `text`                   | Domyślny `text`                                                                                                    | Ograniczenia                                                                                                                                                                                                                                                                             |
| ------------- | ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`      | macOS               | Używana jako etykieta przycisku | "Show" (lub odpowiedni ciąg znaków dla domyślnego języka systemu w przypadku pierwszego `button`, następnie pusty) | Wykorzystywany jest tylko pierwszy. Jeśli podano wiele elementów, te poza pierwszym będą wyświetlane jako dodatkowe akcje (wyświetlane, gdy mysz jest nad przyciskiem akcji). Każda taka akcja jest również niezgodna z `hasReply` i zostanie zignorowana, jeśli `hasReply` jest `true`. |

### Przycisk wsparcia na macOS

W celu zgłoszenia dodatkowych przycisków do pracy na macOS aplikacja musi spełniać następujące kryteria.

* Aplikacja jest podpisana
* Aplikacja ma ustawione `NSUserNotificationAlertStyle` na `alert` w `Info.plist`.

Jeśli jedno z wymagań nie jest spełnione, to przycisk nie będzie wyświetlany.
