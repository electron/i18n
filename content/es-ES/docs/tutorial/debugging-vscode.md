# Depurando en VSCode

Esta guía va sobre cómo configurar la depuración VSCode para tu propio proyecto de electrones, así como la base de código de electrones nativa.

## Depurar tu App Electron

### Proceso principal

#### 1. Abrir un proyecto Electron en VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Añadir un archivo `.vscode/launch.json` con la siguiente configuración:

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

#### 3. Depurar

Establece algunos puntos de interrupción en `main.js`, y comienza a depurar en la [Vista de depuración](https://code.visualstudio.com/docs/editor/debugging). Debería ser capaz de golpear los puntos de interrupción.

Aquí hay un proyecto preconfigurado que puede descargar y depurar directamente en VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## Depurar la base de código de electrones

Si deseas construir Electron desde la fuente y modificar la base de código electrón nativa, esta sección te ayudará a probar tus modificaciones.

Para aquellos que no están seguro de dónde adquirir este código o cómo construirla, [herramientas de construcción de Electron](https://github.com/electron/build-tools) automatiza y explica la mayor parte de este proceso. Si deseas configurar de forma manual el entorno, puedes usar en su lugar estas instrucciones de construcción de [](https://www.electronjs.org/docs/development/build-instructions-gn).

### Windows (C++)

#### 1. Abrir un proyecto Electron en VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Añadir un archivo `.vscode/launch.json` con la siguiente configuración:

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

**Notas de configuración**

* `cppvsdbg` requiere la [extensión de C/C++ integrada](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) habilitarse.
* `${workspaceFolder}` es la ruta completa al directorio de `src` de Chromium.
* `your-executable-location` será uno de los siguientes según algunos elementos:
  * `Testing`: Si estás usando los parámetros predeterminados de las herramientas de construcción de [Electron](https://github.com/electron/build-tools) o las instrucciones predeterminadas cuando [construir desde la fuente](https://www.electronjs.org/docs/development/build-instructions-gn#building).
  * `Release`: si construiste una compilación de lanzamiento en lugar de una compilación de prueba.
  * `your-directory-name`: si Modificaste esto durante tu proceso de construcción desde el predeterminado, será lo que especificaste.
* La cadena de la matriz de `args` `"your-electron-project-path"` debe ser la ruta absoluta al directorio o al archivo `main.js` del proyecto electrónico que estás utilizando para la prueba. En este ejemplo, debe ser tu ruta para `electron-quick-start`.

#### 3. Depurar

Establece algunos puntos de interrupción en los archivos. CC que elijas en el código nativo de Electron C++, e inicia la depuración en el</a>vista de depuración.</p>
