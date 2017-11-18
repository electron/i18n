# Debug 主處理序

The DevTools in an Electron browser window can only debug JavaScript that's executed in that window (i.e. the web pages). To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

## Command Line Switches

使用以下的命令列開關，啟用主處理序 Debug 功能:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Like `--inspector` but pauses execution on the first line of JavaScript.

## 外部 Debug 工具

You will need to use a debugger that supports the V8 inspector protocol.

- Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- [在 VSCode 中 Debug 主處理序](debugging-main-process-vscode.md)