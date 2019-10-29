## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

プロセス: [Main](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Chrome Command Line Switches](./chrome-command-line-switches.md) document.

### インスタンスメソッド

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - 主要なものを除くコマンドラインスイッチ `--`
* `value` String (任意) - 与えられたスイッチの値

Chromiumのコマンドラインに (オプションの `value` と一緒に) スイッチを追加します。

**注:** これは`process.argv` に影響を与えません。 The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `value` String - コマンドラインに追加された引数

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

`--switch=value` のような引数を追加している場合は、代わりに `appendSwitch('switch', 'value')` を使用することを検討してください。

**注:** これは`process.argv` に影響を与えません。 The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - コマンドラインスイッチ

戻り値 `Boolean` - コマンドラインスイッチがあるかどうか。

#### `commandLine.getSwitchValue(switch)`

* `switch` String - コマンドラインスイッチ

戻り値 `String` - コマンドラインスイッチの値

**注意:** スイッチが存在しないか値がない場合、これは空文字列を返します。
