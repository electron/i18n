# NotificationAction オブジェクト

* `type` String - アクションタイプで、`button` にすることができます。
* `text` String - (任意) 指定されたアクションのラベル。

## プラットフォーム / 動作サポート

| アクションタイプ | サポートプラットフォーム | `text` の用途 | デフォルト `text` | 制限事項                                                                                                                                                                |
| -------- | ------------ | ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS        | ボタンのラベル    | "Show"       | Maximum of one button, if multiple are provided only the last is used. This action is also incomptible with `hasReply` and will be ignored if `hasReply` is `true`. |

### macOSでのボタンサポート

macOSで追加の通知ボタンを動作させるには、アプリは以下の要件を満たす必要があります。

* アプリが署名済みであること
* `info.plist` でアプリの `NSUserNotificationAlertStyle` が `alert` に設定されていること。

上記いずれかの要件が満たされていないとボタンは単純に表示されません。