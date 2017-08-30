# メインプロセスのデバッグ

ElectronブラウザウィンドウのDevToolは、そのウィンドウで実行されているJavaScript(例えば、ウェブページ)のみデバッグできます。 メインプロセス中のJavaScriptをデバッグしたい場合は、Electronを`--debug`または、`--debug-brk`フラグ付きで起動し、外部デバッガを使用する必要があります。

## コマンドライン オプション

Electronのメインプロセスをデバッグするためには、次のコマンドラインスイッチを使用してください：

### `--debug=[port]`

このスイッチを使ったとき、Electronは、 `port` 上でV8デバッガープロトコルメッセージをリッスンします。デフォルトの `port` は `5858`です。

```shell
electron --debug=5858 your/app
```

### `--debug-brk=[port]`

`--debug`と同様ですが、最初の行でスクリプトを中断します。

## 外部デバッガ

V8デバッガープロトコルをサポートしたデバッガを使用する必要があります。下記の解説が役に立つことと思います。

- [Debugging the Main Process in VSCode](debugging-main-process-vscode.md)
- [Debugging the Main Process in node-inspector](debugging-main-process-node-inspector.md)