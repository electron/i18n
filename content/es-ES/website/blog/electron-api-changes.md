---
title: Cambios API entrantes en Electron 1.0
author: zcbenz
date: '17-11-2015'
---

Desde el comienzo de Electron, comenzando cuando se llamaba Atom-Shell, hemos estado experimentando con proporcionar una buena API de JavaScript multiplataforma para el módulo de contenido de Chromium y componentes nativos GUI. Las APIs comenzaron muy orgánicamente, y con el tiempo hemos realizado varios cambios para mejorar los diseños iniciales.

---

Ahora que Electron se está preparando para una versión 1.0, nos gustaría aprovechar la oportunidad de cambio dirigiéndonos a los últimos detalles de la API. Los cambios descritos a continuación están incluidos en **0.35.**, con las antiguas APIs reportando advertencias de desaprobación para que puedas estar al día para la futura versión 1.0. Un Electron 1.0 no estará apagado por unos meses así que tiene algún tiempo antes de que estos cambios se rompan.

## Advertencias de destrucción

Por defecto, las advertencias se mostrarán si está usando APIs obsoletas. Para desactivarlos puede establecer `process.noDeprecation` a `true`. Para rastrear las fuentes de los usos de la API obsoletos, puede establecer `proceso. hrowDeprecation` a `verdadero` para lanzar excepciones en lugar de imprimir advertencias, o establecer `proceso. raceDeprecation` a `verdadero` para imprimir los rastros de las deprecaciones.

## Nueva forma de usar módulos integrados

Los módulos integrados ahora se agrupan en un solo módulo, en lugar de separarse en módulos independientes, así que puedes usarlos [sin conflictos con otros módulos](https://github.com/electron/electron/issues/387):

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

La antigua forma de `require('app')` sigue soportada por compatibilidad con versiones anteriores, pero también puedes desactivar:

```javascript
require('electron').hideInternal alModules()
require('app') // arroja un error.
```

## Una forma más fácil de usar el módulo `remoto`

Debido a la forma en que han cambiado los módulos integrados, hemos facilitado el uso de módulos del lado del proceso principal en el proceso de renderizado. Ahora puedes acceder a los atributos de `remoto`para usarlos:

```javascript
// Nueva manera.
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

En lugar de usar una cadena de requerimientos largos:

```javascript
// Viejo.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Dividiendo el módulo `ipc`

El módulo `ipc` existía tanto en el proceso principal como en el proceso de renderizado y la API era diferente en cada lado. que es bastante confuso para los nuevos usuarios. Hemos renombrado el módulo a `ipcMain` en el proceso principal, y `ipcRenderer` en el proceso de renderizado para evitar confusión:

```javascript
// In main process.
var ipcMain = require('electron').ipcMain
```

```javascript
// En proceso de rEnderizado.
var ipcRenderer = require('electron').ipcRenderer
```

Y para el módulo `ipcRenderer` , se ha añadido un objeto `evento` extra al recibir mensajes, para hacer coincidir cómo se manejan los mensajes en los módulos `ipcMain`:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Estandarizando `Opciones de Navegador`

Las opciones de `BrowserWindow` tenían diferentes estilos basados en las opciones de otras APIs, y fueron un poco difíciles de usar en JavaScript debido a la `-` en los nombres. Ahora están estandarizados a los nombres de JavaScript tradicionales:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Siguiendo las convenciones de DOM para nombres de API

Los nombres de la API en Electron que prefieren camelCase para todos los nombres de la API, como `Url` a `URL`, pero el DOM tiene sus propias convenciones, y prefieren `URL` a `Url`, mientras se usaba `Id` en lugar de `ID`. Hemos hecho los siguientes renombrados API para que coincidan con los estilos de DOM:

* `Url` se renombra a `URL`
* `Csp` se renombra a `CSP`

Va a notar muchas desaprobaciones cuando use Electron v0.35.0 para su aplicación debido a estos cambios. Una forma fácil de arreglarlos es reemplazar todas las instancias de `Url` por `URL`.

## Cambios a los nombres de eventos de `la bandeja`

El estilo de `nombres de eventos de la bandeja` era un poco diferente de otros módulos, por lo que se ha hecho un cambio de nombre para que coincida con los demás.

* `pulsado` renombrado a `click`
* `doble clic` se renombra a `doble clic`
* `pulsado con el botón derecho` se renombra a `clic derecho`

