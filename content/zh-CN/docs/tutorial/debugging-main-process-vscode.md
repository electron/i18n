# 在 VSCode 中调试主进程

### 1.在 VSCode 中打开一个 Electron 项目。

```bash
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2.添加具有以下配置的文件 `.vscode/launch.json` ：

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
      "program": "${workspaceRoot}/main.js"
    }
  ]
}
```

**注意：**对于Windows，为 `runtimeExecutable`使用 `"${workspaceRoot}/node_modules/.bin/electron.cmd"` 。

### 3. 调试

在 `main.js`中设置一些断点，并在 [Debug 视图](https://code.visualstudio.com/docs/editor/debugging) 中开始调试。你应该能够命中断点。

这是一个预先配置的项目，你可以下载并直接在 VSCode中调试: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start