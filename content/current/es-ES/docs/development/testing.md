# Pruebas

Nuestro objetivo es mantener la cobertura de código de electrón alto. Pedimos que todas la solicitudes de extracción requeridas no solo pasen todas las pruebas existentes, lo ideal seria añadir nuevas pruebas para cubrir los cambios en el código y nuevos escenarios. Asegurando que capturamos muchas rutas de código y casos de uso de Electrón es posible asegurar que todas las aplicaciones tengan menos errores.

Este repositorio viene con reglas de borrado tanto para JavaScript como para C++ – así como pruebas de unidad e integración. Para aprender más sobre el estilo de código de Electron, por favor vea el documento [coding-style](coding-style.md).

## Borrador

Asegúrese de que su JavaScript cumpla con la codificación de Electron estilo, run `npm run lint-js`, que se ejecutara `standard` contra ambos tanto el propio electrón, así como las pruebas unitarias. Si estás usando un editor con un sistema de plugin/addon, es posible que desees utilizar uno de los muchos [ Complementos de StandardJS ](https://standardjs.com/#are-there-text-editor-plugins), para estar informado de violaciones de estilo de codificación antes de comprometerlas.

Para ejecutar `estándar` con parámetros, ejecute `npm run lint-js --` seguido de los argumentos que quieras pasar a `estándar`.

Para garantizar que tu C ++ cumpla con el estilo de codificación de electrones, ejecuta `npm run lint-cpp`, que ejecuta un script `cpplint`. Le recomendamos que utilice el `Formato clang` y se prepare con [un breve tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Pruebas unitarias

If you are not using [build-tools](https://github.com/electron/build-tools), ensure that that name you have configured for your local build of Electron is one of `Testing`, `Release`, `Default`, `Debug`, or you have set `process.env.ELECTRON_OUT_DIR`. Without these set, Electron will fail to perform some pre-testing steps.

Para ejecutar todas las pruebas de unidad, ejecute `npm run test`. Las pruebas de unidad son una aplicación de Electrón(¡sorpresa!) que puede encontrarse en la carpeta de `spec`. Tenga en cuenta que tiene su propio `package.json` y que sus dependencias por lo tanto no se definen en el nivel superior `package.json`.

Para correr solo pruebas especificas que coincidan con un patrón, corra `npm run test -- -g=PATTERN`, reempleazando el `PATTERN` con una expresión regular que coinciden con los test que le gustaría correr. Como un ejemplo: Si solo quiere correr pruebas IPC, usted debería correr `npm run test -- -g ipc`.

### Probando en dispositivos Windows 10

#### Extra steps to run the unit test:

1. Visual Studio 2019 must be installed.
2. Node headers have to be compiled for your configuration.
   ```powershell
   ninja -C out\Testing third_party\electron_node:headers
   ```
3. The electron.lib has to be copied as node.lib.
   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```

#### Missing fonts

[Algunos dispositivos Windows 10](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) no se incluye la fuente Meiryo instalada, lo que puede causar que falle una prueba. Para instalar Meiryo:
1. Presione la tecla Windows y busca _Administrar herramientas opcionales_.
2. Haga clic en _Añadir una herramienta_.
3. Seleccione _Fuentes suplementarias japonesas_ y haga clic en _Instalar_.

#### Pixel measurements

Algunas pruebas que dependen de medidas precisas a nivel de píxel pueden no funcionar correctamente en dispositivos con ajustes de pantalla Hi-DPI debido a errores de precisión de puntos flotantes. Para ejecutar correctamente estas pruebas, asegúrese de que el dispositivo está fijado para escalar el 100%.

Para configurar el escalamiento de pantalla:
1. Presione la tecla Windows y busca _Ajustes de pantalla_.
2. Bajo _Escalar y disposición_, asegúrese de que el dispositivo está fijado al 100%.
