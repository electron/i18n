# Отладка в VSCode

Это руководство посвящено тому, как настроить VSCode отладку как для вашего проекта Electron, так и для родного кода Electron.

## Отладка приложения Electron

### Главный процесс

#### 1. Откройте проект Electron в VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Создайте файл `.vscode/launch.json` со следующей конфигурацией:

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
      "args" : ["."]
    }
  ]
}
```

#### 3. Отладка

Установите некоторые точки останова в `main.js`и начните отладку в [Debug View](https://code.visualstudio.com/docs/editor/debugging). Вы должны иметь возможность попасть в точки останова.

Это заранее настроенный проект, который вы можете скачать и непосредственно отладить в VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## Отладка кода Electron

Если вы хотите собрать Electron из исходного кода и модифицировать его, данный раздел поможет тестировать ваши изменения.

Для тех, кто не знает, где получить или как собрать его, [Electron Build Tools](https://github.com/electron/build-tools) автоматизирует и объясняет большую часть этого процесса. Если вы хотите самостоятельно настроить окружение, вы можете использовать эти [инструкции по сборке](https://www.electronjs.org/docs/development/build-instructions-gn).

### Windows (C++)

#### 1. Откройте проект Electron в VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Создайте файл `.vscode/launch.json` со следующей конфигурацией:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(Windows) Launch",
      "type": "cppvsdbg",
      "request": "launch",
      "program": "${workspaceFolder}\\out\\your-executable-location\\electron.exe",
      "args": ["your-electron-project-path"],
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}",
      "environment": [
          {"name": "ELECTRON_ENABLE_LOGGING", "value": "true"},
          {"name": "ELECTRON_ENABLE_STACK_DUMPING", "value": "true"},
          {"name": "ELECTRON_RUN_AS_NODE", "value": ""},
      ],
      "externalConsole": false,
      "sourceFileMap": {
          "o:\\": "${workspaceFolder}",
      },
    },
  ]
}
```

**Примечания к настройке**

* `cppvsdbg` требует включённого [встроенного расширения C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).
* `${workspaceFolder}` – это полный путь к каталогу `src` Chromium.
* `your-executable-location` будет одним из следующих, в зависимости от нескольких пунктов:
  * `Testing`: Если вы используете стандартные настройки [Electron Build Tools](https://github.com/electron/build-tools) или полностью следуете [инструкции по сборке](https://www.electronjs.org/docs/development/build-instructions-gn#building).
  * `Release`: Если вы собирали release-версию, а не testing.
  * `your-directory-name`: Если вы изменили его во время сборки, оно будет таким, каким вы его указали.
* Массив `args` должен содержать строки `your-electron-project-path`, которые являются абсолютными путями до каждой директории или `main.js` файла проекта, который вы хотели бы протестировать. В данном примере в нём должен быть путь до `electron-quick-start`.

#### 3. Отладка

Установите некоторые точки останова в .cc файле выбранного вами кода Electron C++ и начните отладку в [Debug View](https://code.visualstudio.com/docs/editor/debugging).
