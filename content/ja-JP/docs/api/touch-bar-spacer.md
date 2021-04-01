## クラス: TouchBarSpacer

> ネイティブ macOS アプリケーション用のタッチバー内に2つのアイテム間のスペーサーを作成する

プロセス: [Main](../glossary.md#main-process)

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (任意) - スペーサのサイズ。以下は設定可能な値です。
    * `small` - アイテム間の小さいスペース。 `NSTouchBarItemIdentifierFixedSpaceSmall` に対応します。 これが既定値です。
    * `large` - アイテム間の大きいスペース。 `NSTouchBarItemIdentifierFixedSpaceLarge` に対応します。
    * `flexible` - 利用可能なスペース全てを埋める。 `NSTouchBarItemIdentifierFlexibleSpace` に対応します。

### インスタンスプロパティ

`TouchBarSpacer` のインスタンスには以下のプロパティがあります。

#### `touchBarSpacer.size`

このススペーサーのサイズを表す `String`。  `small`、`large`、`flexible` のいずれかにできます。
