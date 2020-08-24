# 在 VSCode 中 Debug 主處理序

### 1. Open an Electron project in VSCode.

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
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."],
      "outputCapture": "std"
    }
  ]
}
```


### 3. Debug

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

這裡有一個預先設定好的專案，你可以直接下載並在 VSCode 中 debug: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
