# Distribución de aplicaciones

Para distribuir tu aplicación con electrones, es necesario descargar [prebuilt binaries](https://github.com/electron/electron/releases) del Electron. A continuación, la carpeta que contiene su aplicación debe ser nombrada `app` y colocada en el directorio de recursos de electrones como se muestra en los ejemplos siguientes. Tenga en cuenta que la ubicación de los binarios precompilados del Electron se indica con `electron/` en los siguientes ejemplos.

En macOS:

```text
electron/Electron.app/Contents/Resources/app/ ├── package.json ├── main.js └── index.html
```

En Windows y Linux:

```text
aplicación de recursos de Electron ├── package.json ├── main.js └── index.html
```

Luego ejecuta `Electron.app` (o `electron` en Linux, `electron.exe` en Windows), y Electron comenzará su aplicación. El directorio de `electron` será su distribución a usuarios finales.

## Su aplicación de empaquetado en un archivo

Aparte de enviar su aplicación por copiar todos sus archivos fuente, también puede empaquetar su aplicación en un archivo [asar](https://github.com/electron/asar) para evitar exponer el código fuente de la aplicación de los usuarios.

Para utilizar un archivo `asar` para reemplazar la carpeta de `app`, necesita renombrar el archivo a `app.asar` y poner bajo directorio de recursos del Electron como a continuación, y Electron entonces intentar leer el archivo e iniciar desde él.

En macOS:

```text
electron/Electron.app/Contents/Resources/ └── app.asar
```

En Windows y Linux:

```text
Electron/recursos/app.asar └──
```

Más detalles pueden encontrarse en [Application packaging](application-packaging.md).

## Rebranding con binarios descargados

Después de empaquetar su aplicación en Electron, tienes que rebrand Electron antes de distribuirlo a los usuarios.

### Windows

Puede cambiar el nombre de `electron.exe` a cualquier nombre que desee y editar el icono y otra información con herramientas como [rcedit](https://github.com/atom/rcedit).

### MacOS

Usted puede cambiar el nombre `Electron.app` a cualquier nombre que quieras, y también tienes que cambiar el nombre de los campos `CFBundleDisplayName`, `CFBundleIdentifier` y `CFBundleName` en los siguientes archivos:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

También puede cambiar el nombre de la aplicación de ayuda para dejar de mostrar `Electron Helper` en el Monitor de actividad, pero asegúrese de que han nombre nombre del archivo ejecutable de la aplicación auxiliar.

La estructura de una aplicación de nombre sería:

    MyApp.app/Contents ├── Info.plist ├── MacOS / │ └── MyApp └── Marcos / ├── MyApp ayudante EH.app |   ├── Info.plist |   └── MacOS / |       └── MyApp ayudante EH ├── MyApp ayudante NP.app |   ├── Info.plist |   └── MacOS / |       └── MyApp ayudante NP └── MyApp Helper.app ├── Info.plist └── MacOS / └── MyApp ayudante
    

### Linux

Puedes renombrar el ejecutable `electron` a cualquier nombre que desee.

## Herramientas de empaquetado

Aparte de empaquetando la aplicación manualmente, también puede optar por utilizar herramientas de empaquetado de terceros para hacer el trabajo para usted:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding de reconstrucción Electron de la fuente de

También es posible marca Electron cambiando el nombre del producto y compilar desde las fuentes. Para ello necesitará modificar el archivo `atom.gyp` y tienen una limpia reconstrucción.

### Creating a Custom Electron Fork

Creating a custom fork of Electron is almost certainly not something you will need to do in order to build your app, even for "Production Level" applications. Using a tool such as `electron-packager` or `electron-forge` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Crear una versión Custom con estructura de surf

1. Instalar [Surf](https://github.com/surf-build/surf), través de MNP:`npm instalar surf-build@latest` -g

2. Crear un nuevo cubo S3 y crear la siguiente estructura de directorio vacío:
    
        -átomo-shell / - símbolos-dist /
        

3. Conjunto las siguientes Variables de entorno:

* `ELECTRON_GITHUB_TOKEN` - lanzamientos de un token que puede crear en GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - el lugar donde subire node.js encabezados así como símbolos
* `ELECTRON_RELEASE` - Set `true` y la carga se ejecutará la parte, anular la licencia y `surf-build` sólo hará controles tipo CI, correspondientes a cada solicitud de extracción.
* `CI` - establecida en `true` o bien dejará de
* `GITHUB_TOKEN` - establecer en el mismo `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set para `C:\Temp` en Windows para evitar temas demasiado largo camino
* `TARGET_ARCH` - en `ia32` o `x64` 

1. En `script/upload.py`, *must* establece `ELECTRON_REPO` en la horquilla (`MYORG/electron`), especialmente si usted es colaborador de electrones adecuado.

2. `Surf-build https://github.com/MYORG/electron - r -s YOUR_COMMIT - n 'surf-plataforma-arco'`

3. Esperar mucho, mucho tiempo para la construcción completar.