# NotificationAction オブジェクト

* `type` String - 動作タイプ、 `button`にすることができます。
* `text` String - (optional) 指定されたアクションのラベル。

## プラットフォーム/動作サポート

| 操作種類     | プラットフォームサポート | Usage of `text`                  | デフォルト`text` | 制限事項                                                                                                                                                                |
| -------- | ------------ | -------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS        | Used as the label for the button | "Show"      | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOSでのボタンサポート

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* アプリは署名済みである
* アプリ内の `info.plist` の `NSUserNotificationAlertStyle` が `alert` に設定されている

以上の要件が満たされていないとボタンは表示されません