# Відлагодження Головного Процесу у VSCode

### 1. Відкрийте проект Electron у VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Додайте файл `.vscode/launch.json` з наступною конфігурацією:

```json
{
  "version": "0.2. ",
  "конфігурації": [
    {
      "name": "Debug Main Process",
      "type": "вузол",
      "запит": "запустити",
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


### 3. Відлагодження

Встановіть деякі точки зупинки в `main.js`та почніть відладку в [Debug View](https://code.visualstudio.com/docs/editor/debugging). Ви повинні мати можливість вдарити точки зупинки.

Ось попередньо налаштований проект, який ви можете завантажити і безпосередньо налагоджувати у VSCode: https://github.com/octref/vscode-electrg/tree/master/electron-quick-start
