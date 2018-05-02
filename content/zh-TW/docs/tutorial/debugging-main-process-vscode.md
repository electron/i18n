# 在 VSCode 中 Debug 主處理序

### 1. 在 VSCode 中開啟 Electron 專案。

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. 新增 `.vscode/launch.json` 檔，貼上以下設定:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."]
    }
  ]
}
```

### 3. Debug

在 `main.js` 中設定一些中斷點，然後在 [Debug 視景](https://code.visualstudio.com/docs/editor/debugging) 中開始 debug。你應該能看到程式執行到中斷點時停下來。

這裡有一個預先設定好的專案，你可以直接下載並在 VSCode 中 debug: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start