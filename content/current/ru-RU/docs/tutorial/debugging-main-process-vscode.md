# Отладка главного процесса в VSCode

### 1. Откройте проект Electron в VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Создайте файл `.vscode/launch.json` со следующей конфигурацией:

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

### 3. Отладка

Установите некоторые точки останова в `main.js`и начните отладку в [Виде отладки](https://code.visualstudio.com/docs/editor/debugging). Вы должны иметь возможность попасть в точки останова.

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
