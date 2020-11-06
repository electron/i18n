# Debuggen des Hauptprozesses in VSCode

### 1. Öffnen Sie ein Electron Projekt in VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Fügen Sie eine Datei `.vscode/launch.json` mit der folgenden Konfiguration hinzu:

```json
{
  "version": "0.2. ",
  "configurations": [
    {
      "name": "Hauptprozess debug",
      "Typ": "Knoten",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/. in/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron. md"
      },
      "args" : [". ],
      "outputCapture": "std"
    }
  ]
}
```

### 3. Debugging

Legen Sie einige Haltepunkte in `main.js`fest und starten Sie das Debugging in der [Debug View](https://code.visualstudio.com/docs/editor/debugging). Du solltest in der Lage sein, die Haltepunkte zu treffen.

Hier finden Sie ein vorkonfiguriertes Projekt, dass Sie herunterladen und direkt in VSCode debuggen können: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
