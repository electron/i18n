# Ladění hlavního procesu ve VSCode

### 1. Otevřete Electron projekt ve VSCode.

```sh
$ git klonon git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Přidat soubor `.vscode/launch.json` s následující konfigurací:

```json
{
  "version": "0.2. ",
  "configurations": [
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
      "výstup": "std"
    }
  ]
}
```

### 3. Ladění

Nastavte některé zarážky v `main.js`a začněte ladit v [Debug View](https://code.visualstudio.com/docs/editor/debugging). Měli byste být schopni dosáhnout zarážek.

Zde je přednastavený projekt, který si můžete stáhnout a přímo ladit ve VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
