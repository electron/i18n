# Distribución de la Aplicación

To distribute your app with Electron, you need to package and rebrand it. The easiest way to do this is to use one of the following third party packaging tools:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Estas herramientas tendrán en consideración todos los pasos que se necesitan para finalizar con una aplicación Electron lista para ser distribuida, a saber: empaquetado de su aplicación, identificar el ejecutable, configurar los íconos apropiados y opcionalmente crear los instaladores.

## Distribución manual
You can also choose to manually get your app ready for distribution. The steps needed to do this are outlined below.

Para distribuir su aplicación con Electron, debe descargar los [binarios precompilados](https://github.com/electron/electron/releases) de Electron. Luego, la carpeta que contiene tu aplicación debe llamarse `app` y colocarse en el directorio de recursos de Electron como se muestra en los siguientes ejemplos. Tenga en cuenta que la ubicación de los binarios precompilados de Electron se indican con `electron/` en los ejemplos siguientes.

En macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

En Windows y Linux:

```plaintext
electron/recursos/aplicaciones
├── package.json
├── main.js
└── index.html
```

Luego ejecute `Electron.aplicaciones` (o `electron</ 0> en Linux, <code> electron.exe </ 0> en Windows), y Electron comenzará su aplicación. El directorio <code>electron` será entonces su distribución para entregar a los usuarios finales.

## Su aplicación se ha empaquetado en un archivo

Además de enviar su aplicación copiando todos sus archivos fuente, también puede empaquetar su aplicación en un archivo

asar</ 0> para evitar exponer el código fuente de su aplicación a los usuarios.</p> 

Para usar un archivo `asar` para reemplazar la carpeta `aplicación`, debe cambiar el nombre del archivo. archive a `app.asar`, y póngalo en el directorio de recursos de Electron como a continuación, y Electron intentará leer el archivo y comenzar desde allí.

En macOS:



```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```


En Windows y Linux:



```plaintext
electron/resources/
└── app.asar
```


Se pueden encontrar más detalles en [Empaquetado de aplicaciones](application-packaging.md).



## Cambio de marca con Binarios descargados

Después de agrupar su aplicación en Electron, querrá cambiar la marca de Electron antes de distribuirlo a los usuarios.



### Windows

Puede cambiar el nombre `electron.exe` a cualquier nombre que desee, y editar su icono y otra información con herramientas como [rcedit](https://github.com/electron/rcedit).



### macOS

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




### Linux

Puede cambiar el nombre del archivo ejecutable `electrón` a cualquier nombre que desee.



## Cambio de marca mediante la reconstrucción de la fuente de Electron

También es posible reidentificar Electron simplemente cambiando el nombre del producto y volver a compilarlo desde el código fuente. Para hacerlo, necesita que el argumento de compilación set corresponda con el nombre del producto (`electron_product_name = "YourProductName"`) en el archivo `args.gn` y recompilarlo.



### Crear un fork de Electron personalizado

Creando un tenedor personalizado de Electron seguramente no es algo que tendrá que hacer para compilar su aplicación, incluso para aplicaciones de "Nivel de producción". Usar una herramienta como `electron-packager` o `electron-fragua</ > te permitirá "Remarcar" Electron sin tener que hacer estos pasos.</p>

<p spaces-before="0">Necesita horquilla Electron cuando tienes el código C++ personalizado que han parcheado directamente en electrones, que pueden ser algunos, o ha sido rechazado de la versión oficial. Como mantenedores de Electron, que muy mucho le gustaría hacer su escenario de trabajo, así que por favor trate tan duro como puedas para conseguir los cambios en la versión oficial de Electron, será mucho más fácil en usted, y apreciamos su ayuda.</p>

<h4 spaces-before="0">Crear una versión personalizada con surf-build</h4>

<ol start="1">
<li><p spaces-before="0">Install <a href="https://github.com/surf-build/surf">Surf</a>, via npm:
<code>npm install -g surf-build@latest`</li> 

2 Cree un nuevo depósito S3 y cree la siguiente estructura de directorio vacía: 
  
  

    ```sh
    - electron/
      - symbols/
      - dist/
    ```


3 Establezca las siguientes variables de entorno:</ol> 

  * `ELECTRON_GITHUB_TOKEN` - Un token que puede crear versiones en GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - el lugar donde pondrá las cabeceras Node.js headers tanto como los símbolos
  * `ELECTRON_RELEASE` - Establece a `true` y la parte cargada se ejecutará, deja intacto y `surf-build` hará las comprobaciones de tipo CI apropiadas para correr por cada pull request.
  * `CI` - Configurar a `true` o algo distinto hará que falle
  * `GITHUB_TOKEN` - configurarlo como `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - configurar `C:\Temp` en Windows para evitar problemas con rutas muy largas
  * `TARGET_ARCH` - set to `ia32` or `x64`

4. En `script/upload.py`, se _debe_ configurar `ELECTRON_REPO` a la bifurcación (`MYORG/electron`), especialmente si eres un contribuidor formal de Electron.

5. `surf-build -r https://github.com/MYORG/electron -s TU_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Espere un tiempo muy, muy largo para que se complete la compilación.
