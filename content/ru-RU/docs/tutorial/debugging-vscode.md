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

Установите некоторые точки останова в `main.js`и начните отладку в [Виде отладки](https://code.visualstudio.com/docs/editor/debugging). Вы должны иметь возможность попасть в точки останова.

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## Отладка кодовой базы Electron

Если вы хотите построить Electron из источника и изменить родную кодовую базу Electron, этот раздел поможет вам в тестировании ваших модификаций.

Для тех, кто не знает, где приобрести этот код или как его построить, [Electron's Build Tools](https://github.com/electron/build-tools) автоматизирует и объясняет большую часть этого процесса. Если вы хотите настроить среду вручную, вместо этого можно использовать эти [инструкции](https://www.electronjs.org/docs/development/build-instructions-gn).

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

**Примечание о настройке**

* `cppvsdbg` требует включённого [built-in C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).
* `${workspaceFolder}` – это полный путь к каталогу `src` Хрома.
* `ваше исполняемое местоположение` будет одним из следующих в зависимости от нескольких элементов:
  * `Testing`: Если вы используете настройки по умолчанию [Electron's Build-Tools](https://github.com/electron/build-tools) или инструкции по умолчанию при [из исходных](https://www.electronjs.org/docs/development/build-instructions-gn#building).
  * `Release`: Если вы построили сборку выпуска, а не сборку тестирования.
  * `your-directory-name`: Если вы изменили это во время процесса сборки по умолчанию, это будет все, что вы указали.
* Строка `args` массива `"your-electron-project-path"` должна быть абсолютным путем к каталогу или `main.js` файла проекта Electron, который вы используете для тестирования. В этом примере должен быть ваш путь к `electron-quick-start`.

#### 3. Отладка

Установите некоторые точки останова в .cc файле выбранного вами кода Electron C++ и начните отладку в [Debug View](https://code.visualstudio.com/docs/editor/debugging).
