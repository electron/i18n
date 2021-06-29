# Débogage dans VSCode

Ce guide explique comment configurer le débogage de VSCode pour votre propre projet Electron ainsi que pour la base de code natif d'Electron.

## Débogage de votre application Electron

### Processus principal

#### 1. Ouvrez un projet Electron dans VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Ajouter un fichier `.vscode/launch.json` avec la configuration suivante :

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

#### 3. Débogage

Définissez quelques points d'arrêt dans `main.js`, et commencez à déboguer dans la [vue débogage](https://code.visualstudio.com/docs/editor/debugging). Vous devriez être en mesure de toucher les points d'arrêt.

Voici un projet pré-configuré que vous pouvez télécharger et déboguer directement dans VSCode : https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## Débogage du code de base d'Electron

Cette section vous aidera à tester vos modifications si vous souhaitez générer Electron à partir des sources et modifier le code natif de base d'Electron. .

Si vous ne savez pas où aller chercher ce code ce code ou comment le générer, [Electron's Build Tools](https://github.com/electron/build-tools) automatise et explique la plupart de ce processus. Si vous souhaitez configurer manuellement l’environnement, vous pouvez utiliser ces [instructions de génération](https://www.electronjs.org/docs/development/build-instructions-gn).

### Windows (C++)

#### 1. Ouvrez un projet Electron dans VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Ajouter un fichier `.vscode/launch.json` avec la configuration suivante :

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

**Configuration Notes**

* `cppvsdbg` requires the [built-in C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) be enabled.
* `${workspaceFolder}` is the full path to Chromium's `src` directory.
* `your-executable-location` will be one of the following depending on a few items:
  * `Testing`: If you are using the default settings of [Electron's Build-Tools](https://github.com/electron/build-tools) or the default instructions when [building from source](https://www.electronjs.org/docs/development/build-instructions-gn#building).
  * `Release`: If you built a Release build rather than a Testing build.
  * `your-directory-name`: If you modified this during your build process from the default, this will be whatever you specified.
* The `args` array string `"your-electron-project-path"` should be the absolute path to either the directory or `main.js` file of the Electron project you are using for testing. In this example, it should be your path to `electron-quick-start`.

#### 3. Débogage

Définissez quelques points d'arrêt dans le code natif Electron C++ et commencez à déboguer dans la [Vue débogage](https://code.visualstudio.com/docs/editor/debugging).
