## クラス: TouchBarSpacer

> ネイティブ macOS アプリケーション用のタッチバー内に2つのアイテム間のスペーサーを作成する

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` *実験的*

* `options` Object 
  * `size` String (任意) - スペーサーのサイズ。以下の値にできます。 
    * `small` - アイテム間の小さいスペース。
    * `large` - アイテム間の大きいスペース。
    * `flexible` - 利用可能なスペース全てを埋める。