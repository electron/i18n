# NotificationAction オブジェクト

* `type` String - アクションタイプ。`button` にできる。
* `text` String (optional) - The label for the given action.

## プラットフォーム / 動作サポート

| アクションタイプ | サポートプラットフォーム | `text` の用途 | デフォルト `text`                                                                                | 制限事項                                                                                                                                                                                                                                                                      |
| -------- | ------------ | ---------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS        | ボタンのラベル    | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### macOS でのボタンサポート

macOS で追加の通知ボタンを動作させるには、アプリは以下の要件を満たす必要があります。

* アプリが署名済みであること
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

上記いずれかの要件が満たされていないと、ボタンは表示されません。