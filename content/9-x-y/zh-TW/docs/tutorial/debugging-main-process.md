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

類似 `--inspect`，但在執行 JavaScript 的第一行時就會暫停。

## 外部 Debug 工具

你需要使用支援 V8 inspector 通訊協定的 debugger。

- 在 Chrome 網址列輸入 `chrome://inspect`，可以由顯示的清單中選取要偵查的 Electron 應用程式。
- [在 VSCode 中 Debug 主處理序](debugging-main-process-vscode.md)
