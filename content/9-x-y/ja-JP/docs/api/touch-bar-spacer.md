## クラス: TouchBarSpacer

> ネイティブ macOS アプリケーション用のタッチバー内に2つのアイテム間のスペーサーを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _実験的_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - アイテム間の小さいスペース。 Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - アイテム間の大きいスペース。 Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - 利用可能なスペース全てを埋める。 Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
