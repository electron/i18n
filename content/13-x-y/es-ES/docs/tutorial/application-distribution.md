# Distribución de la Aplicación

## Descripción general

Para distribuir tu aplicación con Electron, necesitas empaquetarla y remarcarla. Para hacer esto, puedes usar herramientas especializadas o enfoques manuales.

## Con herramientas

Puedes usar las siguientes herramientas para distribuir tu aplicación:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [Electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Estas herramientas se encargaran de todo los pasos que necesitas para terminar con una aplicación de Electron distribuible, como empaquetar tu aplicación, cambiar el nombre del ejecutable y configurar los iconos correctos.

Puedes comprobar el ejemplo de como empaquetar tu aplicación con `electron-forge` en nuestra [Guía de Inicio Rápido](quick-start.md#package-and-distribute-the-application).

## Distribución manual

### Con binarios precompilados

Para distribuir tu aplicación manualmente, necesitas descargar el [prebuilt binaries](https://github.com/electron/electron/releases) de Electron. Luego, la carpeta que contiene tu aplicación debe llamarse `app` y colocarse en el directorio de recursos de Electron como se muestra en los siguientes ejemplos.

> *NOTA:* la ubicación de los binarios preconstruidos de Electron esta indicado en  `electron/` en los siguientes ejemplos.

*En macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*En Windows y Linux:*

```plaintext
electron/recursos/aplicaciones
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### Con un archivo de código fuente de la aplicación

En lugar de enviar tu aplicación copiando todos sus archivos de origen, puedes empaquetar tu aplicación en un archivo [asar][] para mejorar el rendimiento de los archivos de lectura en plataformas como Windows, si aún no estás usando un bundler como como paquete o WebPack.

Para usar un archivo `asar` para reemplazar la carpeta `aplicación`, debe cambiar el nombre del archivo. archive a `app.asar`, y póngalo en el directorio de recursos de Electron como a continuación, y Electron intentará leer el archivo y comenzar desde allí.

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

Puedes encontrar más detalles de como usar `asar` en el [repositorio`electron/asar` ][asar].

### Remarcando con binarios descargados

Después de agrupar su aplicación en Electron, querrá cambiar la marca de Electron antes de distribuirlo a los usuarios.

#### macOS

Puede cambiar el nombre `Electron.ap ` a cualquier nombre que desee, y también debe cambiar el nombre de los campos `CFBundleDisplayName`, `CFBundleIdentifier` y `CFBundleName` en los siguientes archivos:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

También puede cambiar el nombre de la aplicación auxiliar para evitar mostrar `Electron Helper` en el Monitor de actividad, pero asegúrese de haber cambiado el nombre del archivo ejecutable de la aplicación auxiliar.

La estructura de una aplicación renombrada sería como:

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

Puede cambiar el nombre del archivo ejecutable `electrón` a cualquier nombre que desee.

### Remarcando al construir Electron desde al fuente

También es posible reidentificar Electron simplemente cambiando el nombre del producto y volver a compilarlo desde el código fuente. Para hacerlo, necesita que el argumento de compilación set corresponda con el nombre del producto (`electron_product_name = "YourProductName"`) en el archivo `args.gn` y recompilarlo.

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
