# Depanarea procesului principal în VSCode

### 1. Deschide un proiect Electron în VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Adaugă un fișier `.vscode/launch.json` cu următoarea configurație:

```json
{
  "versiune": "0.2. ",
  "configuraţii": [
    {
      "name": "Debug Main Process",
      "tip": "nod",
      "cerere": "lansare",
      "cwd": "${workspaceFolder}",
      "runtimeExecutabil": "${workspaceFolder}/node_modules/. in/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron. md"
      },
      "args" : [". ],
      "Ieșire capturată": "std"
    }
  ]
}
```


### 3. Depanare

Setează niște puncte de întrerupere în `main.js`, și începe depanarea în [Debug View](https://code.visualstudio.com/docs/editor/debugging). Ar trebui să puteți să atingeți punctele de pauză.

Aici este un proiect pre-configurat pe care îl puteți descărca și depana direct în VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
