# NotificationAction 对象

* `type` 类型：String - 此类操作可以作为 `按钮`.
* `text` 类型 String - 给定操作的标签（可选）。

## 平台 / 行为支持

| 行为类型     | 平台支持  | `text` 参数                        | `text` 参数默认值 | 局限性                                                                                                                                                                 |
| -------- | ----- | -------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS | Used as the label for the button | "Show"       | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.