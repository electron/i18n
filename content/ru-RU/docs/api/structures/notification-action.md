# Объект NotificationAction

* `type` String - тип действия, может быть `button`.
* `text` String (optional) - The label for the given action.

## Платформа / Поддержка действий

| Тип действия | Поддержка платформы | Использование `text`                     | По умолчанию `text`                                                                         | Ограничения                                                                                                                                                                                                                                                               |
| ------------ | ------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`     | macOS               | Используется в качестве метки для кнопки | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button поддерживается на macOS

Чтобы дополнительные кнопки уведомлений работали на macOS, ваше приложение должно соответствовать следующим критериям.

* Приложение подписано
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Если одно из этих требований не будет выполнено, кнопка просто не появится.