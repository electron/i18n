# Debuggen des Hauptprozesses in VSCode

### 1. Öffnen Sie ein Electron Projekt in VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Fügen Sie eine Datei `.vscode/launch.json` mit der folgenden Konfiguration hinzu:

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

Hier finden Sie ein vorkonfiguriertes Projekt, dass Sie herunterladen und direkt in VSCode debuggen können: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
