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

Setzen sie einige Haltepunkte in `main.js` und starten Sie das Debugging in der [Debug View](https://code.visualstudio.com/docs/editor/debugging). Es sollte Ihnen möglich sein, die Haltepunkte zu erreichen.

Hier finden Sie ein vorkonfiguriertes Projekt, dass Sie herunterladen und direkt in VSCode debuggen können: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start