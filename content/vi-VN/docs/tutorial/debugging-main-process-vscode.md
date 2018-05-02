# Debug Main Process trong VSCode

### 1. Mở project Electron trong VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Thêm file cài đặt `.vscode/launch.json`:

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

### 3. Debugging

Thiết lập các breakpoint trong `main.js` và bắt đầu chạy debug trong [Debug View](https://code.visualstudio.com/docs/editor/debugging). Bạn sẽ thấy quá trình được ngắt tại các breakpoint.

Đây là 1 project được cấu hình sẳn để bạn có thể download và bebug trực tiếp trong VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start