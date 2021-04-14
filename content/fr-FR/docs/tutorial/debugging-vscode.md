# Débogage dans VSCode

Ce guide explique comment configurer le débogage de VSCode pour votre propre projet Electron ainsi que pour la base de code natif d'Electron.

## Débogage de votre application Electron

### Main process

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

## Débogage de la base de code Electron

Si vous souhaitez construire Electron à partir de la source et modifier la base de code Electron native, cette section vous aidera à tester vos modifications.

Pour ceux qui ne savent pas où acquérir ce code ou comment le construire, [Electron’s Build Tools](https://github.com/electron/build-tools) automatise et explique la majeure partie de ce processus. Si vous souhaitez configurer manuellement l’environnement, vous pouvez plutôt utiliser ces [des instructions](https://www.electronjs.org/docs/development/build-instructions-gn).

### Fenêtres (C++)

#### 1. Ouvrez un projet Electron dans VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Ajouter un fichier `.vscode/launch.json` avec la configuration suivante :

```json
{
  « version »: « 0.2.0 »,
  « configurations »: [
    {
      « nom »: « (Windows) Lancement »,
      « type »: « cppvsdbg »,
      « demande »: « lancement »,
      « programme »: « ${workspaceFolder}\\out\\your-executable-location\\electron.exe »,
      « args »: ["your-electron-project-path"],
      « stopAtEntry »: faux,
      " cwd « : "${workspaceFolder}« ,
      " environnement « : [
          {"nom »: « ELECTRON_ENABLE_LOGGING », « value »: « true"},
          {"nom »: « ELECTRON_ENABLE_STACK_DUMPING », « valeur »: « vrai"},
          {"nom »: « ELECTRON_RUN_AS_NODE », « valeur »: « "},
      ],
      « externalConsole »: faux,
      « sourceFileMap »: {
          « o:\\ »: "${workspaceFolder}« ,
      },
    },
  ]
}
```

**Configuration Notes**

* `cppvsdbg` nécessite que ['extension C/C++ intégrée soit](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) activée.
* `${workspaceFolder}` 'est le chemin complet vers l’annuaire `src` Chrome.
* `your-executable-location` sera l’un des éléments suivants en fonction de quelques éléments:
  * `Testing`: Si vous utilisez les paramètres par défaut de [Electron’s Build-Tools](https://github.com/electron/build-tools) ou les instructions par défaut lorsque [bâtiment à partir de la source](https://www.electronjs.org/docs/development/build-instructions-gn#building).
  * `Release`: Si vous avez construit une build Release plutôt qu’une build Testing.
  * `your-directory-name`: Si vous avez modifié ce processus pendant votre processus de build à partir de la valeur par défaut, ce sera tout ce que vous avez spécifié.
* Le `args` chaîne de `"your-electron-project-path"` devrait être le chemin absolu vers le répertoire ou le fichier `main.js` du projet Electron que vous utilisez pour les tests. Dans cet exemple, il devrait être votre chemin vers `electron-quick-start`.

#### 3. Débogage

Définissez quelques points d’arrêt dans les fichiers .cc de votre choix dans le code C++ d’Electron natif, et commencez à débouger dans la vue [Debug](https://code.visualstudio.com/docs/editor/debugging).
