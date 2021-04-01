---
title: Usar características V8 y cromo en Electron
author: señor
date: '07-01-2016'
---

Construir una aplicación Electron significa que sólo necesita crear un código base y diseño para un navegador, lo que es muy práctico. Pero debido a que Electron permanece actualizado con el nodo [. s](http://nodejs.org) y [Chromium](https://www.chromium.org) a medida que se lanzan, también tienes que hacer uso de las grandes características que incorporan. En algunos casos esto elimina las dependencias que puede haber necesitado incluir anteriormente en una aplicación web.

---

Hay muchas características y cubriremos algunas aquí como ejemplos, pero si estás interesado en aprender sobre todas las funciones, puedes vigilar el [blog de Google Chromium](http://blog.chromium.org) y [Nodo. s registros de cambios](https://nodejs.org/en/download/releases). Puede ver qué versiones de Node.js, Chromium y V8 Electron está usando en [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## Soporte de ES6 a través de V8

Electron combina la biblioteca de renderizado de Chromium con Node.js. Los dos comparten el mismo motor de JavaScript, [V8](https://developers.google.com/v8). Muchas de las características ECMAScript 2015, 6, ya están incorporadas en el V8, lo que significa que puede usarlas en su aplicación Electron sin ningún compilador.

A continuación se muestran algunos ejemplos pero también se pueden obtener clases (en modo estricto), alcance de bloques, promesas, matrices escritas y más. Mira [esta lista](https://nodejs.org/en/docs/es6/) para más información sobre las características de ES6 en V8.

**Funciones de flecha**

```js
findTime () => {
  console.log(new Date())
}
```
**Interpolación de cadenas**

```js
var octocat = "Mona Lisa";
console.log(`El nombre del octogato es ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "No nuevo";
  consola. og("New October cat");
}

// Arroja
October cat();
// Registra
new October cat();
```

**Matriz incluye**

```js
 // Devuelve true
[1, 2].includes(2);
```

**Parámetros de descanso**

```js
// Representa el número indefinido de argumentos como un array
(o, c, ...args) => {
  console.log(args.length)
}
```

## Características de cromo

Gracias a todo el duro trabajo que Google y sus colaboradores ponen en Chromium, cuando construyes aplicaciones Electron también puedes usar cosas interesantes como (pero no limitado a):

- [MouseEvent.getModifierState ()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Obtener API Streaming](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Siga junto con el [blog de Google Chromium](http://blog.chromium.org) para aprender acerca de las características a medida que nuevas versiones envían y de nuevo, puedes comprobar la versión de Chromium que usa Electron [aquí](https://electronjs.org/#electron-versions).

## ¿De qué te entusiasma?

Tweet para nosotros [@ElectronJS](https://twitter.com/electronjs) con tus características favoritas incorporadas en V8 o Chromium.

