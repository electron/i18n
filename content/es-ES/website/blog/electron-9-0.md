---
title: Electron 9.0.0
author:
  - sofianguía
  - VerteDinde
date: '2020-05-19'
---

¡Electron 9.0.0 ha sido liberado! Incluye actualizaciones a Chromium `83`, V8 `8.3`y Node.js `12.14`. Hemos añadido varias integraciones de la API para nuestra función de corrector ortográfico, habilitado visor PDF, y mucho más!

---

El equipo de Electron está encantado de anunciar el lanzamiento de Electron 9.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). La versión está llena de actualizaciones, correcciones y nuevas características. ¡No podemos esperar a ver lo que construyes con ellos! ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

## Cambios notables

### Cambios de pila

* cromo `83.0.4103.64`
    * [Nuevo en Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Se omitió el cromo 82](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Nuevo en Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Nodo 12.14.1 entrada de blog](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 entrada de blog](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 entrada de blog](https://v8.dev/blog/v8-release-83)

### Destacar características

* Múltiples mejoras en la función del corrector ortográfico. Ver más detalles en [#22128](https://github.com/electron/electron/pull/22128) y [#22368](https://github.com/electron/electron/pull/22368).
* Mejorada la eficiencia del manejador de eventos de ventanas en Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Activar visor PDF. [#22131](https://github.com/electron/electron/pull/22131).

Vea las notas de lanzamiento de [9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0) para una lista completa de nuevas características y cambios.

## Restaurar archivos borrados

* Aviso de desbloqueo al usar `remoto` sin `enableRemoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Este es el primer paso en nuestros planes para desaprobar el módulo `remoto` y moverlo a tierra de usuario. Puede leer y seguir [este problema](https://github.com/electron/electron/issues/21408) que detalla nuestras razones para esto e incluye una línea temporal propuesta para la desaprobación.
* Establece `app.enableRendererProcessReuse` a true por defecto. [#22336](https://github.com/electron/electron/pull/22336)
    * Esto es trabajo continuo para un futuro requisito de que los módulos nativos de Node cargados en el proceso de renderizado sean [N-API](https://nodejs.org/api/n-api.html) o [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). La información completa y la línea temporal propuesta se detallan en [este problema](https://github.com/electron/electron/issues/18397).
* Enviar objetos no JavaScript sobre IPC ahora arroja una excepción. [#21560](https://github.com/electron/electron/pull/21560)
    * Este comportamiento fue depreciado en Electron 8.0. En Electron 9.0, el antiguo algoritmo de serialización ha sido removido, y el envío de tales objetos no serializables arrojará ahora un error de "objeto no pudo ser clonado".

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Cambios de API

* `cambios en el shell` API:
   * La API `shell.openItem` ha sido reemplazada por una asíncrona API `shell.openPath`. [propuesta](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `cambios en la sesión`API:
   * Añadido `session.listWordsFromSpellCheckerDictionary` API para listar palabras personalizadas en el diccionario. [#22128](https://github.com/electron/electron/pull/22128)
   * Añadido `session.removeWordFromSpellCheckerDictionary` API para eliminar palabras personalizadas en el diccionario. [#22368](https://github.com/electron/electron/pull/22368)
   * Añadida `session.serviceWorkerContext` API para acceder a la información básica del trabajador del servicio y recibir registros de consola de los trabajadores del servicio. [#22313](https://github.com/electron/electron/pull/22313)
* `cambios en la aplicación` API:
   * Se añadió un nuevo parámetro de fuerza a `app.focus()` en macOS para permitir que las aplicaciones tomen el foco forzosamente. [#23447](https://github.com/electron/electron/pull/23447)
* `Cambios de la API del navegador Ventana`:
   * Se añadió soporte para el acceso a propiedades para algunos pares getter/setter en `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### APIs obsoletas

Las siguientes APIs ahora están obsoletas o eliminadas:

* `shell.openItem` API ahora está depreciada, y reemplazada por un asincrónico `shell.openPath API`.
* `<webview>.getWebContents`, que fue desaprobado en Electron 8.0, ahora se elimina.
* `webFrame.setLayoutZoomLevelLimits`, que fue desaprobado en Electron 8.0, ahora es removido.

## Fin de soporte para 6.x.y

Electron 6.x.y ha alcanzado el final de soporte según la [política de soporte](https://electronjs.org/docs/tutorial/support#supported-versions) del proyecto. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [calendario 10.0.0 tentativo](https://electronjs.org/docs/tutorial/electron-timelines) mapea las fechas clave en el ciclo de vida de desarrollo de Electron 10.0. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Cambiar el valor predeterminado de `contextIsolation` de `false` a `true` (comenzando en Electron 10)

Sin contextIsolation, cualquier código que se ejecute en un proceso de renderizado puede llegar fácilmente a los internos de Electron o al script de precarga de una aplicación. Ese código puede entonces realizar acciones privilegiadas que Electron quiere mantener restringidas.

Cambiar este valor por defecto mejora la seguridad por defecto de las aplicaciones Electron para que las aplicaciones tengan que optar deliberadamente por el comportamiento inseguro. Electron depreciará el valor predeterminado actual de `contextIsolation` en Electron 10. , y cambiar al nuevo valor por defecto (`true`) en Electron 12.0.

Para más información sobre `contextIsolation`, cómo activarlo fácilmente y sus beneficios de seguridad, por favor vea nuestro dedicado [Documento de Aislación de Contexto](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
