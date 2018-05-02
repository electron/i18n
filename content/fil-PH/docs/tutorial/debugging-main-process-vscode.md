# "Debugging", Pangunahing Proseso sa "VSCode"

### 1. Buksan ang proyekto ng Elektron sa VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Idagdag ang payl na `.vscode/launch.json` gamit ang sumusunod na kumpigurasyon:

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

### 3. "Debugging"

Itakda ang ilang "breakpoints" sa `main.js`, at simulang ang "debugging" sa [Debug View](https://code.visualstudio.com/docs/editor/debugging). Kinakailangan mong matamaan ang "breakpoints".

Ito ang proyekto na ginamitan na ng kumpigurasyon na maaaring kunin o "download" at direktang gagamitan ng "debug" sa VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start