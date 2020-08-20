# "Debugging Ang pangunahing Proseso sa "VSCode"

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


### 3. Debugging

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Ito ang proyekto na ginamitan na ng kumpigurasyon na maaaring kunin o "download" at direktang gagamitan ng "debug" sa VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
