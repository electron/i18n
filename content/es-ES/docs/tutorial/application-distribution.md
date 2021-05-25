# Distribución de la Aplicación

## Descripción general

Para distribuir tu aplicación de Electron, necesitas empaquetarla y cambiar el nombre. Para hacer esto, puedes usar herramientas especializadas o manualmente.

## Usando herramientas

Puedes usar las siguientes herramientas para distribuir tu aplicación:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Estas herramientas se encargaran de todo los pasos necesarios para crear una aplicación de Electron distribuible, como empaquetar tu aplicación, cambiar el nombre del ejecutable y configurar los iconos correctos.

You can check the example of how to package your app with `electron-forge` in the [Quick Start guide](quick-start.md#package-and-distribute-your-application).

## Proceso manual

### Con binarios precompilados

Para distribuir tu aplicación manualmente, necesitas descargar los [prebuilt binaries](https://github.com/electron/electron/releases) de Electron. Luego, la carpeta que contiene tu aplicación debe llamarse `app` y colocarse en el directorio de recursos de Electron como se muestra en los siguientes ejemplos.

> *NOTA:* la ubicación de los binarios preconstruidos de Electron esta indicado con `electron/` en los siguientes ejemplos.

*En macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*En Windows y Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Luego ejecuta `Electron.app` en macOS, `electron` en Linux, o `electron.exe` en Windows, y tu aplicación Electron se ejecutará. El directorio `electron` será el que hay que dar a tus usuarios.

### Con un archivo de código fuente de la aplicación

En lugar de enviar tu aplicación copiando todos sus archivos de origen, puedes empaquetar tu aplicación en un archivo [asar][] para mejorar el rendimiento de los archivos de lectura en plataformas como Windows, si aún no estás usando un bundler como como Parcel o WebPack.

Para usar un archivo `asar` para reemplazar la carpeta `app`, debe cambiar el nombre del archivo. archive a `app.asar`, y póngalo en el directorio de recursos de Electron como a continuación, y Electron intentará leer el archivo y comenzar desde allí.

*En macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*En Windows y Linux:*

```plaintext
electron/resources/
└── app.asar
```

Puedes encontrar más detalles de como usar `asar` en el [repositorio `electron/asar` ][asar].

### Renombrando binarios descargados

Después de empaquetar su aplicación en Electron, querrá cambiar la marca de Electron antes de distribuirlo a sus usuarios.

#### macOS

Puede cambiar el nombre `Electron.app` a cualquier nombre que desee, y también debe cambiar el valor de los campos `CFBundleDisplayName`, `CFBundleIdentifier` y `CFBundleName` en los siguientes archivos:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

También puede cambiar el nombre de la aplicación auxiliar para evitar mostrar `Electron Helper` en el Monitor de actividad, pero asegúrese de haber cambiado el nombre del archivo ejecutable de la aplicación auxiliar.

La estructura de una aplicación renombrada sería similar a:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

Puede cambiar el nombre `electron.exe` a cualquier nombre que desee, y editar su icono y otra información con herramientas como [rcedit](https://github.com/electron/rcedit).

#### Linux

Puede cambiar el nombre del archivo ejecutable `electron` a cualquier nombre que desee.

### Renombrar compilando Electron desde el código fuente

También es posible renombrar Electron simplemente cambiando el nombre del producto y volver a compilarlo desde el código fuente. Para hacerlo, necesita que el argumento de compilación se corresponda con el nombre del producto (`electron_product_name = "YourProductName"`) en el archivo `args.gn` y recompilarlo.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
