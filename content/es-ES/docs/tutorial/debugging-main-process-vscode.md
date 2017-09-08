# Depurar el proceso principal en VSCode

### 1. Abra un proyecto de Electron en VSCode.

```bash
$ git clone git@github.com:electron / Electron-rápido-start.git $ código Electron-quick-start
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

**Note:** para Windows, utilice `"${workspaceRoot}/node_modules/.bin/electron.cmd"` para `runtimeExecutable`.

### 3. depuración

Establecer algunos puntos de interrupción en `main.js` y empezar a depurar en el View</a> de Debug. Usted debe ser capaz de golpear los puntos de desempate.</p> 

Aquí está un proyecto preconfigurado que puede descargar y depurar directamente en VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start