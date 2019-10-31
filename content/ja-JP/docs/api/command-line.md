## クラス: CommandLine

> Chromium が読み取るアプリのコマンドライン引数を操作します

プロセス: [Main](../glossary.md#main-process)

以下の例は、`-disable-gpu` フラグが設定されているかどうかを確認する方法を示しています。

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

使用できるフラグとスイッチの種類の詳細については、[Chrome コマンドラインスイッチ](./chrome-command-line-switches.md) ドキュメントを参照してください。

### インスタンスメソッド

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - 主要なものを除くコマンドラインスイッチ `--`
* `value` String (任意) - 与えられたスイッチの値

Chromiumのコマンドラインに (オプションの `value` と一緒に) スイッチを追加します。

**注:** これは`process.argv` に影響を与えません。 この関数は主に Chromium の振る舞いを制御するために使われます。

#### `commandLine.appendArgument(value)`

* `value` String - コマンドラインに追加された引数

Chromiumのコマンドラインに引数を追加します。 引数は正しく引用符で囲ってください。 スイッチは、追加順序に関係なく引数に先行します。

`--switch=value` のような引数を追加している場合は、代わりに `appendSwitch('switch', 'value')` を使用することを検討してください。

**注:** これは`process.argv` に影響を与えません。 この関数は主に Chromium の振る舞いを制御するために使われます。

#### `commandLine.hasSwitch(switch)`

* `switch` String - コマンドラインスイッチ

戻り値 `Boolean` - コマンドラインスイッチがあるかどうか。

#### `commandLine.getSwitchValue(switch)`

* `switch` String - コマンドラインスイッチ

戻り値 `String` - コマンドラインスイッチの値

**注意:** スイッチが存在しないか値がない場合、これは空文字列を返します。
