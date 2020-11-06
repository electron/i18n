# Depuração do Processo Principal em VSCode

### 1. Abra um Electron projeto em VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Adicione um arquivo `.vscode/launch.json` com a seguinte configuração:

```json
{
  "version": "0.2. ",
  "configurations": [
    {
      "name": "Depurar processo principal",
      "type": "node",
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

### 3. Depuração

Defina alguns pontos de interrupção no `main.js`, e inicie a depuração no [Debug View](https://code.visualstudio.com/docs/editor/debugging). Você deveria ser capaz de bater nos pontos de interrupção.

Aqui está um projeto pré-configurado que você pode baixar e depurar diretamente no VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
