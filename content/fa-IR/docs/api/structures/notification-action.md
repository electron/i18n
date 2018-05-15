# شئ NotificationAction

* `نوع` رشته - نوعی عمل، که می تواند `دکمه` باشد.
* `text` String (optional) - The label for the given action.

## پلت فرم / پشتیبانی عمل

| نوع عمل | پشتیبانی پلت فرم | `متن` - مورد استفاده         | `متن` پیشفرض                                                                                | محدودیت ها                                                                                                                                                                                                                                                                |
| ------- | ---------------- | ---------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `دکمه`  | سیستم عامل مک    | برچسب مورد استفاده برای دکمه | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### پشتیبانی دکمه در مک‌اواس

به منظور استفاده از دکمه در مک‌اواس، برنامه شما باید شرایط زیر داشته باشد.

* برنامه حضور داشته باشد
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

اگر هر یک از این نیاز ها برآورده نشده باشد، دکمه ظاهر نخواهد شد.