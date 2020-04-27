## クラス: TouchBarSpacer

> ネイティブ macOS アプリケーション用のタッチバー内に2つのアイテム間のスペーサーを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _実験的_

* `options` Object
  * `size` String (任意) - スペーサのサイズ。設定可能な値:
    * `small` - アイテム間の小さいスペース。
    * `large` - アイテム間の大きいスペース。
    * `flexible` - 利用可能なスペース全てを埋める。
