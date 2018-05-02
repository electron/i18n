# Débogguer le main process dans VSCode

### 1. Ouvrez un projet Electron dans VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Ajouter un fichier `.vscode/launch.json` avec la configuration suivante :

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

### Débogage

Définissez des points d’arrêt dans `main.js` et démarrez le débogage dans la [Vue Debug](https://code.visualstudio.com/docs/editor/debugging). Vous devriez être en mesure de toucher les points d’arrêt.

Voici un projet pré-configuré que vous pouvez télécharger et déboguer directement dans VSCode : https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start