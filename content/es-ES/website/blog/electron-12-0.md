---
title: Electron 12.0.0
author:
  - VerteDinde
  - mlaurencin
  - sofianguía
date: '2021-03-02'
---

¡Electron 12.0.0 ha sido liberado! Incluye actualizaciones para Chromium `89`, V8 `8.9` y Node.js `14.16`. Hemos agregados cambios al módulo remoto, nuevos valores por defecto para contextIsolation, una nueva API webFrameMain y mejoras generales. ¡Lea a continuación para más detalles!

---

El equipo de Electron esta emocionado de anunciar el lanzamiento de Electron 12.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

## Cambios notables

### Cambios de pila

* Chromium `89`
    * [Nuevo en Chrome 88](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [Nuevo en Chrome 89](https://developer.chrome.com/blog/new-in-chrome-89/)
* Node.js `14.16`
    * [Node 14.16.0 blog post](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 blog post](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `8.9`
    * [V8 8.8 blog post](https://v8.dev/blog/v8-release-88)
    * [V8 8.9 blog post](https://v8.dev/blog/v8-release-89)

### Destacar características

* El método ContextBridge `exposeInMainWorld` ahora puede exponer APIs non-object. [#26834](https://github.com/electron/electron/pull/26834)
* Actualizado de Node 12 a Node 14. [#23249](https://github.com/electron/electron/pull/25249)
* Se añadio nueva API `webFrameMain` para acceder a subframes de una instancia `WebContents` desde el main process. [#25464](https://github.com/electron/electron/pull/25464)
* Los valores por defecto de `contextIsolation` y `worldSafeExecuteJavaScript` ahora son `true`. [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

Vea la [notas de lanzamiento 12.0.0](https://github.com/electron/electron/releases/tag/v12.0.0) para la lista completa de nuevas características y cambios.

## Restaurar archivos borrados

* Obsoleto el módulo `remote`. Es reemplazado por [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
    * Si actualmente está usando el módulo `remote`, hemos escrito [una guía para migrar a `@electron/remote` aquí.](https://github.com/electron/remote#migrating-from-remote)
* Se cambió el valor por defecto de `contextIsolation` a `true`. [#27949](https://github.com/electron/electron/pull/27949)
* Se cambió el valor por defecto de `worldSafeExecuteJavaScript` a `true`. [#27502](https://github.com/electron/electron/pull/27502)
* Se cambió el valor por defecto de `crashReporter.start({ compress })` de `false` a `true`. [#25288](https://github.com/electron/electron/pull/25288)
* Eliminado el soporte de Flash: Chromium ha eliminado el soporte para Flash, el cual fue eliminado también en Electron 12. Vea [Chromium's Flash Roadmap](https://www.chromium.org/flash-roadmap) para más detalles.
* Requerido SSE3 para Chrome en x86: Chromium ha eliminado el soporte para [CPUs x86 más viejos que no reúnen un soporte mínimo SSE3 (Streaming SIMD Extensions 3)](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64). Este soporte fue eliminado también en Electron 12.

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Cambios de API

* Agregada API `webFrameMain`: El módulo `webFrameMain` puede ser usado para buscar marcos a través instancias [`WebContents`](/docs/api/web-contents.md) existentes. Este es el equivalente del proceso principal de la API existente webFrame. Más información acerca de esta nueva API puede ser encontrada [aquí](https://github.com/electron/electron/pull/25464), y en nuestra [documentación](https://www.electronjs.org/docs/api/web-frame-main).
* `cambios en la aplicación` API:
    * Se añadió non-localized `serviceName` a `'child-process-gone'` / `app.getAppMetrics()`. [#25975](https://github.com/electron/electron/pull/25975)
    * Se añadió nueva propiedad `app.runningUnderRosettaTranslation` para detectar cuando se ejecuta bajo rosetta en Apple silicon. [#26444](https://github.com/electron/electron/pull/26444)
    * Se añadió `exitCode` a `render-process-gone` detalles (app & webContents). [#27677](https://github.com/electron/electron/pull/27677)
* `Cambios de la API del navegador Ventana`:
    * Se añadió API `BrowserWindow.isTabletMode()`. [#25209](https://github.com/electron/electron/pull/25209)
    * Se añadió los eventos `resized` (Windows/macOS) y `moved` (Windows) a `BrowserWindow`. [#26216](https://github.com/electron/electron/pull/26216)
    * Se añadió nuevo evento `system-context-menu` para permitir prevenir y anular el menú contextual del sistema. [#25795](https://github.com/electron/electron/pull/25795)
    * Se añadió `win.setTopBrowserView()` para que pueda ser lanzadado `BrowserView`. [#27713](https://github.com/electron/electron/pull/27713)
    * Se añadió `webPreferences.preferredSizeMode` para permitir el tamaño de las vista de acuerdo con el tamaño mínimo de su documento. [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` Cambios en la API:
    * Permitido el método ContextBridge `exposeInMainWorld` para exponer APIs non-object. [#26834](https://github.com/electron/electron/pull/26834)
* `display` Cambios en la API:
    * Se añadió la propiedad `displayFrequency` al objeto `Display` para permitir obtener información sobre el ratio de actualización en Windows. [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` Cambios en la API:
    * Se añadió soporte para algunas APIs `chrome.management`. [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` Cambios API:
    * Se añadió para mostrar el menú compartir de macOS. [#25629](https://github.com/electron/electron/pull/25629)
* `net` Cambios en la API:
    * Se añadió una nueva opción `credentials` para `net.request()`. [#25284](https://github.com/electron/electron/pull/25284)
    * Se añadió `net.online` para detectar si actualmente hay conexión a Internet. [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` Cambios en la API:
    * Se añadió `powerMonitor.onBatteryPower`. [#26494](https://github.com/electron/electron/pull/26494)
    * Se añadió el evento cambio rápido de usuario a powerMonitor en macOS. [#25321](https://github.com/electron/electron/pull/25321)
* `cambios en la sesión` API:
    * Se añadió la opción `allowFileAccess` a la API `ses.loadExtension()` API. [#27702](https://github.com/electron/electron/pull/27702)
    * Se añadió la API `display-capture` para `session.setPermissionRequestHandler`. [#27696](https://github.com/electron/electron/pull/27696)
    * Se añadió una opción `disabledCipherSuites` a `session.setSSLConfig`. [#25818](https://github.com/electron/electron/pull/25818)
    * Se añadió los eventos `extension-loaded`, `extension-unloaded`, y `extension-ready` a `session`. [#25385](https://github.com/electron/electron/pull/25385)
    * Se añadió `session.setSSLConfig()` para permitir configurar SSL. [#25461](https://github.com/electron/electron/pull/25461)
    * Se añadió soporte para especificar específicamente los modos `direct`, `auto_detect` o `system` en `session.setProxy()`. [#24937](https://github.com/electron/electron/pull/24937)
    * Se añadió soporte [Serial API](https://web.dev/serial/). [#25237](https://github.com/electron/electron/pull/25237)
    * Se añadió APIs para activar/desactivar el corrector ortográfico. [#26276](https://github.com/electron/electron/pull/26276)
* `cambios en el shell` API:
    * Se añadió API asíncrona `shell.trashItem()`, en reemplazo de la sincróna `shell.moveItemToTrash()`. [#25114](https://github.com/electron/electron/pull/25114)
* `webContents` Cambios de API:
    * Se añadió una pequeña sugerencia de consola a la consola para ayudar a depurar los fallos del renderizador. [#25317](https://github.com/electron/electron/pull/25317)
    * Se añadió las propiedades `frame` y `webContents` al detalle del objeto en los manejadores webRequest. [#27334](https://github.com/electron/electron/pull/27334)
    * Added `webContents.forcefullyCrashRenderer()` to forcefully terminate a renderer process to assist with recovering a hung renderer. [#25580](https://github.com/electron/electron/pull/25580)
    * Se añadió la API `setWindowOpenHandler` para las ventanas hijas creadas por el renderer, y se desaprueba el evento `new-window` event. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` Cambios en la API:
    * Se añadió la API de revisión ortográfica al renderer. [#25060](https://github.com/electron/electron/pull/25060)

### Cambios Eliminado/Obsoletos

Las siguientes APIs han sido eliminadas o ahora están obsoletas:

* Obsoleto el módulo `remote`. Es reemplazado por [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
* Se eliminaron APIs `crashReporter` obsoletas. [#26709](https://github.com/electron/electron/pull/26709)
* Se eliminó los enlaces a la página web de Electron del menú 'Ayuda' por defecto en las aplicaciones empaquetadas. [#25831](https://github.com/electron/electron/pull/25831)

## Fin de soporte para 9.x.y

Electron 9.x.y ha alcanzado el fin de soporte según la [política de soporte ](https://electronjs.org/docs/tutorial/support#supported-versions) del proyecto. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [calendario tentativo 13.0.0](https://electronjs.org/docs/tutorial/electron-timelines) traza fechas claves en el ciclo de vida del desarrollo de Electron 13.0. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
