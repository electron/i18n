# NotificationAction オブジェクト

* `type` String - 動作タイプ、 `button`にすることができます。
* `text` String - (optional) 指定されたアクションのラベル。

## プラットフォーム/動作サポート

| 操作種類     | プラットフォームサポート | Usage of `text`                  | デフォルト`text` | 制限事項                                                                                                                                                                |
| -------- | ------------ | -------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS        | Used as the label for the button | "Show"      | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOSでのボタンサポート

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* アプリを署名します。
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.