# NotificationAction 对象

* `type` 类型：String - 此类操作可以作为 `按钮`.
* `text` 类型 String - 给定操作的标签（可选）。

## 平台 / 行为支持

| 行为类型     | 平台支持  | `text` 参数    | `text` 参数默认值 | 局限性                                                                                                                                                                  |
| -------- | ----- | ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS | button 显示的内容 | "Show"       | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOS系统上的按钮支持

为了使额外的通知按钮在macOS上工作，您的应用程序必须符合以下标准。

* 应用程序已签名
* 应用程序将`info.plist`变量中的`NSUserNotificationAlertStyle`属性值设置为`alert`.

任何一个条件不满足则按钮无法显示。