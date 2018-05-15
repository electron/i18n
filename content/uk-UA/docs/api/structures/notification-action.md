# Об'єкт NotificationAction

* `type` String - Тип дії, може бути `button`.
* `text` String (optional) - The label for the given action.

## Платформа / Підтримка дії

| Тип дії  | Підтримка платформами | Вмкористання `text`                  | `text` за замовчуванням                                                                     | Обмеження                                                                                                                                                                                                                                                                 |
| -------- | --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS                 | Використовується як напис для кнопки | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button підтримка на macOS

Щоб додаткові кнопки повідомлень працювали на macOS, ваш додаток має відповідати наступним вимогам.

* Застосунок підписано
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

В іншому випадку кнопка просто не з'явиться.