# Debug 主處理序

Electron 瀏覽器視窗中的 DevTools 只能用來 debug 在該視窗中的 JavaScript (就是網頁)。 要 debug 主處理序裡執行的 JavaScript，得使用外部 debugger，並在啟動 Electron 時透過 `--inspect` 或 `--inspect-brk` 參數啟用相關功能。

## 命令列參數

使用以下的命令列參數，啟用主處理序 Debug 功能:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Like `--inspect` but pauses execution on the first line of JavaScript.

## 外部 Debug 工具

You will need to use a debugger that supports the V8 inspector protocol.

- Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- [在 VSCode 中 Debug 主處理序](debugging-main-process-vscode.md)