# Distribución de aplicaciones

Para distribuir tu aplicación con electrones, es necesario descargar [prebuilt binaries](https://github.com/electron/electron/releases) del electrón. A continuación, la carpeta que contiene su aplicación debe ser nombrada `app` y colocada en el directorio de recursos de electrones como se muestra en los ejemplos siguientes. Tenga en cuenta que la ubicación de los binarios precompilados del electrón se indica con `electron/` en los siguientes ejemplos.

En macOS:

```text
electron/Electron.app/Contents/Resources/app/ ├── package.json ├── main.js └── index.html
```

En Windows y Linux:

```text
aplicación de recursos de electrón ├── package.json ├── main.js └── index.html
```

Luego ejecuta `Electron.app` (o `electron` en Linux, `electron.exe` en Windows), y electrónica comenzará su aplicación. El directorio de `electron` será su distribución a usuarios finales.

## Su aplicación de empaquetado en un archivo

Aparte de enviar su aplicación por copiar todos sus archivos fuente, también puede empaquetar su aplicación en un archivo [asar](https://github.com/electron/asar) para evitar exponer el código fuente de la aplicación de los usuarios.

Para utilizar un archivo `asar` para reemplazar la carpeta de `app`, necesita renombrar el archivo a `app.asar` y poner bajo directorio de recursos del electrón como a continuación, y electrón entonces intentar leer el archivo e iniciar desde él.

En macOS:

```text
electron/Electron.app/Contents/Resources/ └── app.asar
```

En Windows y Linux:

```text
electrón/recursos/app.asar └──
```

Más detalles pueden encontrarse en [Application packaging](application-packaging.md).

## Rebranding con binarios descargados

Después de empaquetar su aplicación en electrónica, tienes que rebrand electrón antes de distribuirlo a los usuarios.

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

* [electrón-builder](https://github.com/electron-userland/electron-builder)
* [Empaquetador de electrón](https://github.com/electron-userland/electron-packager)

## Rebranding de reconstrucción electrónica de la fuente de

También es posible marca electrón cambiando el nombre del producto y compilar desde las fuentes. Para ello necesitará modificar el archivo `atom.gyp` y tienen una limpia reconstrucción.

### Ronco-construir-átomo-shell

Marcando manualmente código del electrón y la reconstrucción pueden ser complicados, por lo que se ha creado una tarea de Grunt, que se encargará de esto automáticamente:[grunt-build-atom-shell](https://github.com/paulcbetts/grunt-build-atom-shell).

Esta tarea encargará automáticamente de editar el archivo `.gyp`, compilar desde las fuentes, y luego reconstruir nativa nodo módulos de su aplicación para coincidir con el nuevo nombre del archivo ejecutable.

### Crear un tenedor electrónico personalizado

Creando un tenedor personalizado de electrón seguramente no es algo que tendrá que hacer para construir su aplicación, incluso para aplicaciones de "Nivel de producción". Utilizando una herramienta como `electron-packager` o `electron-builder` le permitirá "Rebrand" electrón sin tener que hacer estos pasos.

Necesita horquilla electrón cuando tienes el código C++ personalizado que han parcheado directamente en electrones, que pueden ser algunos, o ha sido rechazado de la versión oficial. Como mantenedores de electrón, que muy mucho le gustaría hacer su escenario de trabajo, así que por favor trate tan duro como puedas para conseguir los cambios en la versión oficial de electrón, será mucho más fácil en usted, y apreciamos su ayuda.

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