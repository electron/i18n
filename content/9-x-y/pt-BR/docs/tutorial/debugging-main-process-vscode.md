# Depuração do Processo Principal em VSCode

### 1. Abra um Electron projeto em VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Adicione um arquivo `.vscode/launch.json` com a seguinte configuração:

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


### 3. Depuração

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Aqui está um projeto pré-configurado que você pode baixar e depurar diretamente no VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
