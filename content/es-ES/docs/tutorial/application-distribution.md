# Distribución de la Aplicación

Para distribuir su aplicación con Electron, debe descargar los [binarios precompilados](https://github.com/electron/electron/releases) de Electron. Luego, la carpeta que contiene tu aplicación debe llamarse `aplicación` y colocarse en el directorio de recursos de Electron como se muestra en los siguientes ejemplos. Tenga en cuenta que la ubicación de los binarios precompilados de Electron se indican con `electron/` en los ejemplos siguientes.

En macOS:

```text
electron/Electron.aplicaciones/Contenidos/Recursos/Aplicaciones/
├── package.json
├── main.js
└── index.html
```

En Windows y Linux:

```text
electron/recursos/aplicaciones
├── package.json
├── main.js
└── index.html
```

Luego ejecute `Electron.aplicaciones` (o `electron</ 0> en Linux, <code> electron.exe </ 0> en Windows), y Electron comenzará su aplicación. El directorio <code>electron` será entonces su distribución para entregar a los usuarios finales.

## Su aplicación se ha empaquetado en un archivo

Además de enviar su aplicación copiando todos sus archivos fuente, también puede empaquetar su aplicación en un archivo asar</ 0> para evitar exponer el código fuente de su aplicación a los usuarios.</p> 

Para usar un archivo `asar` para reemplazar la carpeta `aplicación`, debe cambiar el nombre del archivo. archive a `app.asar`, y póngalo en el directorio de recursos de Electron como a continuación, y Electron intentará leer el archivo y comenzar desde allí.

En macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

En Windows y Linux:

```text
electron/resources/
└── app.asar
```

Se pueden encontrar más detalles en [Empaquetado de aplicaciones](application-packaging.md).

## Cambio de marca con Binarios descargados

Después de agrupar su aplicación en Electron, querrá cambiar la marca de Electron antes de distribuirlo a los usuarios.

### Windows

Puede cambiar el nombre `electron.exe` a cualquier nombre que desee, y editar su icono y otra información con herramientas como [rcedit](https://github.com/atom/rcedit).

### macOS

Puede cambiar el nombre `Electron.ap ` a cualquier nombre que desee, y también debe cambiar el nombre de los campos `CFBundleDisplayName`, `CFBundleIdentifier` y `CFBundleName` en los siguientes archivos:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

The structure of a renamed app would be like:

```text
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    ├── MyApp Helper EH.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper EH
    ├── MyApp Helper NP.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper NP
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

You can rename the `electron` executable to any name you like.

## Packaging Tools

Apart from packaging your app manually, you can also choose to use third party packaging tools to do the work for you:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [Electron-builder](https://github.com/electron-userland/electron-builder)
* [Empaquetador de Electron](https://github.com/electron-userland/electron-packager)

## Rebranding by Rebuilding Electron from Source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to modify the `atom.gyp` file and have a clean rebuild.

### Crear un tenedor Electronico personalizado

Creando un tenedor personalizado de Electron seguramente no es algo que tendrá que hacer para compilar su aplicación, incluso para aplicaciones de "Nivel de producción". Using a tool such as `electron-packager` or `electron-forge` will allow you to "Rebrand" Electron without having to do these steps.

Necesita horquilla Electron cuando tienes el código C++ personalizado que han parcheado directamente en electrones, que pueden ser algunos, o ha sido rechazado de la versión oficial. Como mantenedores de Electron, que muy mucho le gustaría hacer su escenario de trabajo, así que por favor trate tan duro como puedas para conseguir los cambios en la versión oficial de Electron, será mucho más fácil en usted, y apreciamos su ayuda.

#### Creating a Custom Release with surf-build

1. Install [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Create a new S3 bucket and create the following empty directory structure:
    
    ```sh
- atom-shell/
  - symbols/
  - dist/
```

3. Set the following Environment Variables:

* `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload node.js headers as well as symbols
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will just do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
* `TARGET_ARCH` - set to `ia32` or `x64`

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Wait a very, very long time for the build to complete.