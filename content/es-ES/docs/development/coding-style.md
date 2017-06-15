# Estilo de codificación

Estas son las directrices de estilo de codificación en el Electron.

Puede ejecutar `npm ejecutar lint` para mostrar los problemas de estilo detectados por `cpplint` y `eslint`.

## C++ y Python

Para C++ y Python, seguimos [Coding Style](http://www.chromium.org/developers/coding-style) de cromo. Puede utilizar[clang-format](clang-format.md) para formatear automáticamente el código de C++. También hay un script `script/cpplint.py` para comprobar si se ajustan todos los archivos.

La versión de Python que estamos utilizando ahora es Python 2.7.

El código C++ utiliza un montón de abstracciones y de cromo, por lo que se recomienda familiarizarse con ellos. Un buen lugar para empezar es de cromo [Important abstracciones y datos Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) documento. El documento menciona algunos tipos especiales, tipos con ámbito (que liberan automáticamente la memoria cuando van fuera de alcance), mecanismos de registro etcetera.

## JavaScript

* Escriba [standard](http://npm.im/standard) JavaScript estilo.
* Nombres de archivo deben ser concatenados con `-` en lugar de `_`, por ejemplo `file-name.js` en lugar de `file_name.js`, porque en el módulo[github/atom](https://github.com/github/atom) nombres son generalmente en forma de `module-name`. Esta regla sólo se aplica a los archivos de `.js`.
* Uso de sintaxis ES6/ES2015 nuevas necesarias 
  * requiere [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) para y otras constantes
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) para la definición de variables
  * Functions</a> de Arrow en lugar de `function () { }`</li> 
    
    * Literals</a> de Template en vez de usar de concatenación de cadena `+`</li> </ul></li> </ul> 
      
      ## Nombrar las cosas
      
      Electrónica API utiliza el mismo esquema de capitalización como Node.js:
      
      * Cuando el módulo en sí es una clase como `BrowserWindow`, use `CamelCase`.
      * Cuando el módulo es un conjunto de APIs, como `globalShortcut`, use `mixedCase`.
      * Cuando el API es una propiedad del objeto, y es lo suficientemente complejo como para estar en un capítulo aparte como el `win.webContents`, use `mixedCase`.
      * Otras API de módulo de no usar títulos naturales, como `<webview> Tag` o `Process Object`.
      
      Cuando se crea una nueva API, se prefiere utilizar getters y setters en lugar de estilo de una función de jQuery. Por ejemplo, `.getText ()` y `.setText (texto) ` se prefiere a </code> .text ([text]). Hay un<a href="https://github.com/electron/electron/issues/46">discussion</a> en esto.</p>