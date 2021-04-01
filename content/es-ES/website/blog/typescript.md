---
title: "Anunciando soporte de TypeScript en Electron"
author: zeke
date: '01-06-2017'
---

El paquete `electron` npm ahora incluye un archivo de definición de TypeScript que proporciona anotaciones detalladas de toda la API de Electron. Estas anotaciones pueden mejorar su experiencia de desarrollo de Electron **incluso si está escribiendo vanilla JavaScript**. Solo `npm install electron` para actualizar los tipos de Electron en su proyecto.

---

TypeScript es un lenguaje de programación de código abierto creado por Microsoft. Es un superconjunto de JavaScript que extiende el idioma agregando soporte para tipos estáticos. La comunidad TypeScript ha crecido rápidamente en los últimos años, y TypeScript fue clasificado entre los [lenguajes de programación más queridos](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) en una reciente encuesta de desarrollador de Stack Overflow.  TypeScript se describe como "JavaScript que escala", y equipos en [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), y [Microsoft](https://github.com/Microsoft/vscode) lo están usando para escribir aplicaciones de Electron escalables que son usadas por millones de personas.

TypeScript soporta muchas de las características de lenguaje más recientes en JavaScript como clases , destrucción de objetos, y async/await, pero su característica diferencial real es **anotaciones de tipo**. Declarar los tipos de datos de entrada y salida esperados por su programa puede [reducir errores](https://slack.engineering/typescript-at-slack-a81307fa288d) ayudándole a encontrar errores en el tiempo de compilación. y las anotaciones también pueden servir como una declaración formal de [cómo funciona su programa](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Cuando las librerías están escritas en Javascript de vainilla, los tipos a menudo son vagamente definidos como una reflexión posterior al escribir la documentación. Las funciones a menudo pueden aceptar más tipos de los documentados, o una función puede tener restricciones invisibles que no están documentadas, lo que puede llevar a errores en tiempo de ejecución.

TypeScript resuelve este problema con **archivos de definición**. Un archivo de definición de TypeScript describe todas las funciones de una biblioteca y sus tipos de entrada y salida esperados. Cuando los autores de la biblioteca empaquetan un archivo de definición de TypeScript con su biblioteca publicada, los consumidores de esa biblioteca pueden [explorar su API directamente dentro de su editor](https://code.visualstudio.com/docs/editor/intellisense) y empezar a usarla de inmediato, a menudo sin necesidad de consultar la documentación de la biblioteca.

Muchos proyectos populares como [Angular](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (y ahora Electron! compile su propio archivo de definición y añádelo con su paquete npm publicado. Para proyectos que no empaquetan su propio archivo de definición, hay [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), un ecosistema de terceros de archivos de definición mantenidos por la comunidad.

## Instalación

A partir de la versión 1.6.10, cada versión de Electron incluye su propio archivo de definición de TypeScript. Cuando instalas el paquete `electron` de npm, el archivo `electron.d.ts` se incluye automáticamente con el paquete instalado.

La forma [más segura](https://electronjs.org/docs/tutorial/electron-versioning/) de instalar Electron es usando un número de versión exacto:

```sh
npm install electron --save-dev --save-exact
```

O si estás usando [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn añadir electrón --dev --exact
```

Si ya estaba usando definiciones de terceros como `@types/electron` y `@types/node`, debes eliminarlos de tu proyecto Electron para prevenir cualquier colisión.

El archivo de definición se deriva de nuestra [documentación de API estructurada](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), por lo que siempre será consistente con la [documentación de la API de Electron](https://electronjs.org/docs/api/). Simplemente instala `electrón` y siempre obtendrás definiciones de TypeScript que están actualizadas con la versión de Electron que estás usando.

## Uso

Para un resumen de cómo instalar y utilizar las nuevas anotaciones de Electron TypeScript, mira esta pequeña pantalla de demostración: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Si está usando [Visual Studio Code](https://code.visualstudio.com/), ya tiene el soporte de TypeScript incorporado. También hay plugins mantenidos por la comunidad para [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), y [editores más](https://www.typescriptlang.org/index.html#download-links).

Una vez que tu editor esté configurado para TypeScript, empezarás a ver más comportamiento sensible al contexto como sugerencias de autocompletado, referencia de método en línea, comprobación de argumentos y más.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Método de autocompletado">
  <figcaption>Auto-finalización del método</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Referencia del método">
  <figcaption>Referencia del método en línea</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Comprobación de argumentos">
  <figcaption>Comprobación de argumentos</figcaption>
</figure>

## Comenzando con TypeScript

Si eres nuevo en TypeScript y quieres obtener más información, este [vídeo introductorio de Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) ofrece una descripción general de la razón por la que se creó el lenguaje, cómo funciona, cómo usarlo y hacia dónde se dirige.

También hay un manual [](https://www.typescriptlang.org/docs/handbook/basic-types.html) y un [patio de juegos](https://www.typescriptlang.org/play/index.html) en el sitio web oficial de TypeScript.

Debido a que TypeScript es un superconjunto de JavaScript, su código JavaScript existente es TypeScript válido. Esto significa que puedes hacer una transición gradual de un proyecto de JavaScript de existente a TypeScript, rociando en las nuevas características del lenguaje según sea necesario.

## Gracias

Este proyecto no habría sido posible sin la ayuda de la comunidad de mantenedores de código abierto de Electron. Gracias a [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), y muchos otros para sus correcciones de errores, mejoras de documentación, y orientación técnica.

## Soperte

Si encuentra algún problema usando los nuevos archivos de definición de TypeScript de Electron, envíe un problema en el repositorio [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues).

¡Feliz TypeScripting!
