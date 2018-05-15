# Depurando el Proceso Principal en VSCode

### Abrir un proyecto Electron en VSCode.

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

### 3. Depurar

Establece unos puntos de interrupción en `main.js`, y empieza a depurar en la [Debug View](https://code.visualstudio.com/docs/editor/debugging). Debe ser capaz de toparse con los puntos de interrupción.

Aquí hay un proyecto preconfigurado que puede descargar y depurar directamente en VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start