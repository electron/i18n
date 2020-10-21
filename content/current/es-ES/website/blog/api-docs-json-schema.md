---
title: Documentos de la API de Electron como Datos Estructurales
author: zeke
date: '2016-09-27'
---

Hoy estamos anunciando algunas mejoras en la documentación de Electron. Cada nuevo lanzamiento ahora incluye un [archivo JSON](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) que describe todas las APIs públicas de Electron en detalle. Hemos creado este archivo para permitir a los desarrolladores usar la documentación de la API de Electron de nuevas maneras interesantes.

---

## Resumen del esquema

Cada API es un objeto con propiedades como nombre, descripción, tipo, etc. Clases como `BrowserWindow` y `Menu` tienen propiedades adicionales que describen sus métodos de instancia, propiedades de instancia, eventos de instancia, etc.

Aquí hay un fragmento del esquema que describe la clase `BrowserWindow`:

```js
{
  name: 'BrowserWindow',
  description: 'Crear y controlar ventanas del navegador. ,
  proceso: {
    main: true,
    renderer: false
  },
  tipo: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

Y aquí hay un ejemplo de la descripción de un método, en este caso el método de instancia `apis.BrowserWindow.instanceMethods.setMaximumSize`:

```js
{
  name: 'setMaximumSize',
  signature: '(width, height)', Descripción
  : 'Establece el tamaño máximo de la ventana a anchura y altura. ,
  parámetros: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Usando los nuevos datos

Para facilitar a los desarrolladores el uso de estos datos estructurados en sus proyectos, hemos creado [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), un pequeño paquete npm que se publica automáticamente cada vez que hay una nueva versión de Electron .

```sh
npm install electron-api-docs --save
```

Para una gratificación instantánea, pruebe el módulo en su REPL de Node.js:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Cómo se recogen los datos

La documentación de la API de Electron se adhiere al [Estilo de codificación de Electrón](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) y al [Estilo de Electrón](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), para que su contenido pueda ser analizado programáticamente.

El [electron-docs-linter](https://github.com/electron/electron-docs-linter) es una nueva dependencia de desarrollo del repositorio `electron/electron`. Es una herramienta de línea de comandos que muestra todos los archivos de markdown e impone la reglas del styleguide. Si se encuentran errores, se listan y el proceso de liberación se detiene. Si los documentos de la API son válidos, `electron-json. pi` archivo es creado y [subido a GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) como parte de la versión Electron.

## Javascript estándar y Markdown estándar

A principios de este año, el código base de Electron fue actualizado para usar el linter [`estándar`](http://standardjs.com/) para todos los JavaScript. El README de estándar resume el razonamiento detrás de esta opción:

> Adoptar el estilo estándar significa clasificar la importancia de la claridad del código y las convenciones comunitarias más altas que el estilo personal. Esto podría no tener sentido para el 100% de los proyectos y las culturas de desarrollo, sin embargo el código abierto puede ser un lugar hostil para los novatos. Establecer expectativas claras y automatizadas de los colaboradores hace que un proyecto sea más saludable.

También recientemente creamos [estándar markdown](https://github.com/zeke/standard-markdown) para verificar que todos los fragmentos de código JavaScript en nuestra documentación son válidos y consistentes con el estilo en la base de código.

Juntas, estas herramientas nos ayudan a utilizar la integración continua (IC) para encontrar automáticamente errores en las solicitudes de extracción. Esto reduce la carga impuesta a los humanos haciendo revisión del código , y nos da más confianza sobre la precisión de nuestra documentación.

### Un esfuerzo comunitario

La documentación de Electron está mejorando constantemente, y tenemos a nuestra increíble comunidad de código abierto para agradecérsela. A partir de esta escritura, cerca de 300 personas han contribuido a la documentación.

Estamos encantados de ver qué hacen las personas con estos nuevos datos estructurados. Los posibles usos incluyen:

- Mejoras a [https://electronjs.org/docs/](https://electronjs.org/docs/)
- Un [archivo de definición de TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) para un desarrollo de Electron más streamlined en proyectos usando TypeScript.
- Buscar documentación fuera de línea para herramientas como [Dash.app](https://kapeli.com/dash) y [devdocs.io](http://devdocs.io/)

