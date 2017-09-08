# メインプロセスのデバッグ

ElectronブラウザウィンドウのDevToolは、そのウィンドウで実行されているJavaScript(例えば、ウェブページ)のみデバッグできます。 To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

## コマンドライン オプション

Electronのメインプロセスをデバッグするためには、次のコマンドラインスイッチを使用してください：

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Like `--inspector` but pauses execution on the first line of JavaScript.

## 外部デバッガ

You will need to use a debugger that supports the V8 inspector protocol.

- Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- [Debugging the Main Process in VSCode](debugging-main-process-vscode.md)