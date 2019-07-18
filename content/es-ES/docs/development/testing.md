# Pruebas

Nuestro objetivo es mantener la cobertura de código de electrón alto. Pedimos que todas la solicitudes de extracción requeridas no solo pasen todas las pruebas existentes, lo ideal seria añadir nuevas pruebas para cubrir los cambios en el código y nuevos escenarios. Asegurando que capturamos muchas rutas de código y casos de uso de Electrón es posible asegurar que todas las aplicaciones tengan menos errores.

Este repositorio viene con reglas de borrado tanto para JavaScript como para C++ – así como pruebas de unidad e integración. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Borrador

Asegúrese de que su JavaScript cumpla con la codificación de Electron estilo, run `npm run lint-js`, que se ejecutara `standard` contra ambos tanto el propio electrón, así como las pruebas unitarias. Si estás usando un editor con un sistema de plugin/addon, es posible que desees utilizar uno de los muchos [ Complementos de StandardJS ](https://standardjs.com/#are-there-text-editor-plugins), para estar informado de violaciones de estilo de codificación antes de comprometerlas.

Para ejecutar `estándar` con parámetros, ejecute `npm run lint-js --` seguido de los argumentos que quieras pasar a `estándar`.

Para garantizar que tu C ++ cumpla con el estilo de codificación de electrones, ejecuta `npm run lint-cpp`, que ejecuta un script `cpplint`. Le recomendamos que utilice el `Formato clang` y se prepare con [un breve tutorial](clang-format.md).

No hay mucho de Python en este repositorio, pero también se rige por las reglas de estilo de codificación. `npm run lint-py` que comprobará todos los Python, utilizando `pylint` para hacerlo.

## Pruebas unitarias

Para ejecutar todas las pruebas de unidad, ejecute `npm run test`. Las pruebas de unidad son una aplicación de Electrón(¡sorpresa!) que puede encontrarse en la carpeta de `spec`. Tenga en cuenta que tiene su propio `package.json` y que sus dependencias por lo tanto no se definen en el nivel superior `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

### Testing on Windows 10 devices

[Some Windows 10 devices](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) do not ship with the Meiryo font installed, which may cause a font fallback test to fail. To install Meiryo:

1. Push the Windows key and search for *Manage optional features*.
2. Click *Add a feature*.
3. Select *Japanese Supplemental Fonts* and click *Install*.