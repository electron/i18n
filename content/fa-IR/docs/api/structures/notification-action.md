# شئ NotificationAction

* `نوع` رشته - نوعی عمل، که می تواند `دکمه` باشد.
* `متن` رشته - (اختیاری) برچسب برای عمل داده شده می باشد.

## پلت فرم / پشتیبانی عمل

| نوع عمل | پشتیبانی پلت فرم | `متن` - مورد استفاده         | `متن` پیشفرض | محدودیت ها                                                                                                                                                          |
| ------- | ---------------- | ---------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `دکمه`  | مک‌اواس          | برچسب مورد استفاده برای دکمه | "نمایش"      | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.