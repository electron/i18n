# Pruebas

Nuestro objetivo es mantener la cobertura de código de electrón alto. Pedimos que todas la solicitudes de extracción requeridas no solo pasen todas las pruebas existentes, lo ideal seria añadir nuevas pruebas para cubrir los cambios en el código y nuevos escenarios. Asegurando que capturamos muchas rutas de código y casos de uso de Electrón es posible asegurar que todas las aplicaciones tengan menos errores.

Este repositorio viene con reglas de borrado tanto para JavaScript como para C++ – así como pruebas de unidad e integración. Para obtener más información sobre el estilo de codificación de Electrón, consulte el documento [coding-style(coding-style.md).

## Borrado

Asegúrese de que su JavaScript cumpla con la codificación de Electron estilo, run `npm run lint-js`, que se ejecutara `standard` contra ambos tanto el propio electrón, así como las pruebas unitarias. Si estás usando un editor con un sistema de plugin/addon, es posible que desees utilizar uno de los muchos [ Complementos de StandardJS ](https://standardjs.com/#are-there-text-editor-plugins), para estar informado de violaciones de estilo de codificación antes de comprometerlas.

Para ejecutar `estándar` con parámetros, ejecute `npm run lint-js --` seguido de los argumentos que quieras pasar a `estándar`.

Para garantizar que tu C ++ cumpla con el estilo de codificación de electrones, ejecuta `npm run lint-cpp`, que ejecuta un script `cpplint`. Le recomendamos que utilice el `Formato clang` y se prepare con [un breve tutorial](clang-format.md).

No hay mucho de Python en este repositorio, pero también se rige por las reglas de estilo de codificación. `npm run lint-py` que comprobará todos los Python, utilizando `pylint` para hacerlo.

## Pruebas unitarias

Para ejecutar todas las pruebas de unidad, ejecute `npm run test`. Las pruebas de unidad son una aplicación de Electrón(¡sorpresa!) que puede encontrarse en la carpeta de `spec`. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only a selected number of tests, run `npm run test -match=NAME`, replacing the `NAME` with the file name of the test suite you would like to run. As an example: If you want to run only IPC suites, you would run `npm run test -match=ipc`.