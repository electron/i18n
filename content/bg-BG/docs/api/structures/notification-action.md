# Обект NotificationAction

* `type` String - Типът действие може да бъде `button`.
* `text` String (optional) - The label for the given action.

## Платформа / Поддръжка на действията

| Тип действие | Поддържана платформа | Използване на `text`            | `text` по подразбиране                                                                      | Ограничения                                                                                                                                                                                                                                                               |
| ------------ | -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `бутон`      | macOS                | Използван като етикет на бутона | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Поддръжка на бутони под macOS

За да може допълнителните съобщителни бутони да работят под macOS, вашето приложение трябва да изпълни следващите критерии.

* Приложението е подписано
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

If either of these requirements are not met the button simply won't appear.