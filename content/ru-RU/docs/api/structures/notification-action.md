# NotificationAction Объект

* `type` String - Тип действия, может быть `button`.
* `text` String - (опиционально) Метка для данного действия.

## Платформа / Поддержка действий

| Action Тип | Поддержка платформы | Использование `text`                     | По умолчанию `text` | Ограничения                                                                                                                                                         |
| ---------- | ------------------- | ---------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`   | macOS               | Используется в качестве метки для кнопки | "Show"              | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.