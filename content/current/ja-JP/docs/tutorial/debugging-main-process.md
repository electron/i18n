# メインプロセスのデバッグ

Electron ブラウザウィンドウのデベロッパー ツールは、そのウィンドウで実行されている JavaScript (例えばウェブページ) のみをデバッグできます。 メインプロセスの JavaScript をデバッグしたい場合は、Electron を `--inspect` や `--inspect-brk` フラグで起動し、外部デバッガを使用する必要があります。

## コマンドラインオプション

Electron のメインプロセスをデバッグするためには、以下のコマンドラインスイッチを使用します。

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

`--inspect` と同様ですが、最初の行でスクリプトを中断します。

## 外部デバッガ

V8 インスペクタープロトコルをサポートするデバッガを使用する必要があります。

- `chrome://inspect` を開いて Chrome に接続し、起動した Electron アプリのインスペクトをそこから選択します。
- [VS Code におけるメインプロセスのデバッグ](debugging-main-process-vscode.md)
