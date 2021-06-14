---
title: Electron 7.0.0
author:
  - sofianguía
  - ckerr
date: '22-10-2019'
---

¡Electron 7.0.0 ha sido liberado! Incluye actualizaciones a Chromium 78, V8 7.8 y Node.js 12.8.1. Hemos añadido una ventana en versión de Arm 64, métodos IPC más rápidos, un nuevo API `nativeTheme` y mucho más!

---

El equipo de Electron está encantado de anunciar el lanzamiento de Electron 7.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). La versión está llena de actualizaciones, correcciones y nuevas características. ¡No podemos esperar a ver lo que construyes con ellos! ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

## Cambios notables
 * Mejoras de pila:

   | Pila    | Versión en Electron 6 | Versión en Electron 7 | Novedades                                                                                                                                                                                                                                                                 |
   |:------- |:--------------------- |:--------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Cromo   | 76.0.3809.146         | **78.0.3905.1**       | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                   | **7.8**               | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0                | **12.8.1**            | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Se agregó Windows en versión de Arm (64 bit). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Añadido `ipcRenderer.invoke()` y `ipcMain.handle()` para IPC asíncrona request/response-style Estos son altamente recomendados en el módulo `remoto`. Vea esta publicación del blog "[El módulo "remoto" de Electron se considera perjudicial](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)" para más información. [#18449](https://github.com/electron/electron/pull/18449)
 * Se añadió `nativeTheme` API para leer y responder a los cambios en el tema y esquema de color del SO. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Cambiado a un nuevo generador de Definiciones de TypeScript [](https://github.com/electron/docs-parser). Las definiciones resultantes son más precisas; así que si su compilación de TypeScript falla, esta es la causa probable. [#18103](https://github.com/electron/electron/pull/18103)

Vea las [notas de lanzamiento 7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0) para una lista más larga de cambios.

## Restaurar archivos borrados

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).

 * APIs obsoletas eliminadas:
     * Versiones basadas en la llamada de funciones que ahora usan Promises. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` ya no permite filtrar las entradas de caché limpiadas. [#17970](https://github.com/electron/electron/pull/17970)
 * Las interfaces nativas en macOS (menús, diálogos, etc.) ahora coinciden automáticamente con la configuración del modo oscuro en la máquina del usuario. [#19226](https://github.com/electron/electron/pull/19226)
 * Actualizado el módulo `electrón` para usar `@electron/get`.  La versión mínima soportada del nodo es ahora el nodo 8. [#18413](https://github.com/electron/electron/pull/18413)
 * El archivo `electron.asar` ya no existe. Cualquier script de empaque que dependa de su existencia debe ser actualizado. [#18577](https://github.com/electron/electron/pull/18577)

## Fin de soporte para 4.x.y

Electron 4.x.y ha alcanzado el final de soporte según la [política de soporte](https://electronjs.org/docs/tutorial/support#supported-versions) del proyecto. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Programa de retroalimentación

Continuamos usando nuestro [Programa de Comentarios para aplicaciones](https://electronjs.org/blog/app-feedback-program) para pruebas. Proyectos que participan en este programa prueban betas Electron en sus aplicaciones; y a cambio, los nuevos errores que encuentran son priorizados para la versión estable. Si quieres participar o aprender más, [revisa nuestra publicación de nuestro blog sobre el programa](https://electronjs.org/blog/app-feedback-program).

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [programa tentativo 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapea las fechas clave en el ciclo de vida de desarrollo de Electron 8. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
