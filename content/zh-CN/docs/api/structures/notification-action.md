# NotificationAction 对象

* `type` 类型：String - 此类操作可以作为 `按钮`.
* `text` 类型 String - 给定操作的标签（可选）。

## 平台 / 行为支持

| 行为类型     | 平台支持  | `text` 参数    | `text` 参数默认值 | 局限性                                                                                                 |
| -------- | ----- | ------------ | ------------ | --------------------------------------------------------------------------------------------------- |
| `button` | macOS | button 显示的内容 | "Show"       | 最多仅支持一个button, 如果设置了多个只有最后一个会被使用。也跟` hasReplay `不兼容，如果` hasReplay `被设置成了` true ` 那么这个button 行为将被忽略。 |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.