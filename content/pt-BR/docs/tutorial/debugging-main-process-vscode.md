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

### 3. Depuração

Defina alguns pontos de interrupção em `main.js`, e inicie a depuração no [Debug View](https://code.visualstudio.com/docs/editor/debugging). Você deve ser capaz de acertar os pontos de interrupção.

Aqui está um projeto pré-configurado que você pode baixar e depurar diretamente no VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start