# Debuggen van het hoofdproces in VSCode

### 1. Open een Electron project in VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Voeg een bestand `.vscode/launch.json` toe met de volgende configuratie:

```json
{
  "version": "0.2. ",
  "configuraties": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/. in/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron. md"
      },
      "args" : [". ],
      "Uitvoerkap": "std"
    }
  ]
 } }
```


### 3. Foutopsporing

Stel wat breekpunten in `main.js`in en start debugging in de [Debug View](https://code.visualstudio.com/docs/editor/debugging). Je zou de breekpunten moeten kunnen bereiken.

Hier is een vooraf geconfigureerd project dat je kunt downloaden en direct debuggen in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
