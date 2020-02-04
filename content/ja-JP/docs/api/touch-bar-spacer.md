## クラス: TouchBarSpacer

> ネイティブ macOS アプリケーション用のタッチバー内に2つのアイテム間のスペーサーを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` *実験的*

* `options` Object 
  * `size` String (任意) - スペーサーのサイズ。以下の値にできます。 
    * `small` - アイテム間の小さいスペース。`NSTouchBarItemIdentifierFixedSpaceSmall` に対応します。これは既定値です。
    * `large` - アイテム間の大きなスペース。`NSTouchBarItemIdentifierFixedSpaceLarge` に対応します。
    * `flexible` - 利用可能なスペースを全て占有します。`NSTouchBarItemIdentifierFlexibleSpace` に対応します。