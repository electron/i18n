# Depurando el Proceso Principal en VSCode

### 1. Abrir un proyecto Electron en VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. Añadir un archivo `.vscode/launch.json` con la siguiente configuración:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Depurar el Proceso Principal",
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


### 3. Depurar

Establece algunos puntos de interrupción en `main.js`, y comienza a depurar en la [Vista de depuración](https://code.visualstudio.com/docs/editor/debugging). Debería ser capaz de golpear los puntos de interrupción.

Aquí hay un proyecto preconfigurado que puede descargar y depurar directamente en VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
