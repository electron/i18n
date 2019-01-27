# メインプロセスのデバッグ

ElectronブラウザウィンドウのDevToolは、そのウィンドウで実行されているJavaScript(例えば、ウェブページ)のみデバッグできます。 メインプロセス中のJavaScriptをデバッグしたい場合は、Electronを`--inspect`または、`--inspect-brk`フラグ付きで起動し、外部デバッガを使用する必要があります。

## コマンドライン オプション

Electronのメインプロセスをデバッグするためには、次のコマンドラインスイッチを使用します：

### `--inspect=[port]`

外部のデバッガーが接続する必要のある特定の `port` 上で Electronは V8 inspector protocol messages を待ち受けます。このデフォルト `port` は `5858` です。

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

`--inspect` と同様ですが、最初の行でスクリプトを中断します。

## 外部デバッガ

V8 inspector protocol をサポートするデバッガーを使用する必要があります。

- `chrome://inspect` を開いて Chrome に接続しそこから起動された Electron アプリを検査することを選択します。
- [VS Code におけるメインプロセスのデバッグ](debugging-main-process-vscode.md)