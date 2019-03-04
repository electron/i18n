# Debuggando il Processo Principale in VSCode

### 1. Apri un progetto Electron in CodiceVS.

```sh
$ git clone git@github.com:electron/electron-avvio-veloce.git
$ codice electron-avvio-veloce
```

### 2. Aggiungi un file `.codicevs/lancia.json` con la configurazione seguente:

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
      "args" : ["."],
      "outputCapture": "std"
    }
  ]
}
```

### 3. Debugging

Imposta alcuni punti di rottura in `principale.js` e avvia il debugging in [Vista Debug](https://code.visualstudio.com/docs/editor/debugging). Dovresti poter colpire i punti di rottura.

Qui un progetto preconfigurato che puoi scaricare e debuggare direttamente in CodiceVS: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start