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

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start