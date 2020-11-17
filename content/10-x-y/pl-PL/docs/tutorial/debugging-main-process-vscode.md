# Debugowanie głównego procesu w VSCode

### 1. Otwórz projekt Electron w VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Dodaj plik `.vscode/launch.json` z następującą konfiguracją:

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


### 3. Debugowanie

Ustaw punkty wstrzymania w `main.js`i rozpocznij debugowanie w [Widoku debugowania](https://code.visualstudio.com/docs/editor/debugging). Powinieneś być w stanie uderzyć w punkty przerwania.

Oto wstępnie skonfigurowany projekt, który można pobrać i bezpośrednio debugować w VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
