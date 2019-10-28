# Debug del Processo Principale in VSCode

### 1. Apri un progetto Electron in VsCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Aggiungi un file `.vscode/launch.json` con la configurazione seguente:

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

Imposta alcuni breakpoint in `main.js` e avvia il debugging in [Debug View](https://code.visualstudio.com/docs/editor/debugging). Dovresti poterti bloccare ad ogni breakpoint.

Di seguito un progetto preconfigurato che puoi scaricare e debuggare direttamente in VsCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start