# NotificationAction オブジェクト

* `type` String - 動作タイプ、 `button`にすることができます。
* `text` String - (optional) 指定されたアクションのラベル。

## プラットフォーム/動作サポート

| アクションのタイプ | サポートプラットフォーム | `text` の用途 | デフォルト`text` | 制限事項                                                                                                                                                                 |
| --------- | ------------ | ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`  | macOS        | ボタンのラベル    | "Show"      | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### MacOSでのボタンサポート

macOSにおいて通知ボタンを表示させるにはアプリは以下の要件を満たす必要があります

* アプリは署名済みである
* アプリ内の `info.plist` の `NSUserNotificationAlertStyle` が `alert` に設定されている

以上の要件が満たされていないとボタンは表示されません