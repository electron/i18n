# Electron Fuse

> パッケージ時機能切り替え

## Fuse とはなんでしょうか?

Electron は機能の集合体なので、アプリケーション全体に渡って特定の機能を無効化しても合理的です。  例えば、99% のアプリは `ELECTRON_RUN_AS_NODE` を利用しないので、そういったアプリでその機能が利用できないバイナリを頒布できるようにしたいのです。  Electron の消費者がソースから Electron を構築することは技術的に大きな障害であり時間とお金両方のコストがかかるため、それも避けたいと考えています。

Fuse はこの問題の解決策です。高水準としては Electron バイナリ内の "マジックビット" であり、Electron アプリをパッケージングする際にそれらを反転させることで、特定の機能や制限を有効化/無効化できます。  アプリのコード署名前のパッケージ時に反転するので、OS は OS レベルのコード署名検証(Gatekeeper / App Locker) の時に反転しないようにする責任があります。

## Fuse の反転方法は何ですか?

### 簡単な方法

これら Fuse を簡単に反転させるために、便利なモジュール `@electron/fuses` を作成しました。  使用方法や潜在的なエラーケースといった詳細は、このモジュールの README を確認してください。

```js
require('@electron/fuses').flipFuses(
  // electron のパス
  require('electron'),
  // 反転する Fuse
  {
    runAsNode: false
  }
)
```

### 難しい方法

#### 簡易用語集

* **Fuse Wire**: Fuse の制御に使用する Electron バイナリ内のバイト列
* **Sentinel**: Fuse Wire の位置特定に使用できる静的な既知のバイト列
* **Fuse Schema**: Fuse Wire が許容する値の形式

手動で Fuse を反転させるには、Electron バイナリを編集し必要な Fuse の状態を表すバイト列になるように Fuse Wire を修正する必要があります。

Electron バイナリのどこかに、以下のようなバイト列があります。

```text
| ...binary | sentinel_bytes | fuse_version | fuse_wire_length | fuse_wire | ...binary |
```

* `sentinel_bytes` は厳密にこのような文字列 `dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX` です
* `fuse_version` は単一バイトで、その符号無し整数の値が Fuse Schema のバージョンを表します。
* `fuse_wire_length` は単一バイトで、その符号無し整数の値は後続の Fuse Wire にある Fuse の数を表します。
* `fuse_wire` は N バイトのシーケンスで、各バイトは 1 つの Fuse とその状態を表します。
  * "0" (0x30) は無効な Fuse を表します
  * "1" (0x31) は有効な Fuse を表します
  * "r" (0x72) は削除された Fuse を表し、このバイトを 1 や 0 に変更しても効果はありません。

Fuse を反転させるには、Fuse Wire の位置を見つけ、状態に応じて "0" または "1" に変更します。

現在のスキーマは [こちら](https://github.com/electron/electron/blob/master/build/fuses/fuses.json5) で閲覧できます。
