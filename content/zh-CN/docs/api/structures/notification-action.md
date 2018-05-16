# NotificationAction 对象

* `type` 类型：String - 此类操作可以作为 `按钮`.
* `text` String (optional) - The label for the given action.

## 平台 / 操作 支持

| 操作类型 | 平台支持  | `text` 参数    | `text` 参数默认值                                                                                | 局限性                                                                                                                                                                                                                                                                       |
| ---- | ----- | ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `按钮` | macOS | button 显示的内容 | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOS系统上的按钮支持

为了在 macOS 上使用额外的通知按钮, 您的应用程序必须符合以下标准。

* 应用程序已签名
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

如果不满足其中任何一个条件，则按钮无法显示。