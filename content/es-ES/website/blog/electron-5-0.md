---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '23-04-2019'
---

El equipo de Electron está encantado de anunciar el lanzamiento de Electron 5.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargar los tarballs desde [nuestra página de lanzamientos](https://github.com/electron/electron/releases/tag/v5.0.0). La versión está llena de actualizaciones, correcciones y nuevas características. ¡No podemos esperar a ver lo que construyes con ellos! ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

---

## ¿Qué hay de nuevo?

Gran parte de la funcionalidad de Electron es proporcionada por los componentes principales de Chromium, Node.js y V8. Electron se mantiene actualizado con estos proyectos para proporcionar a nuestros usuarios nuevas características de JavaScript, mejoras de rendimiento y correcciones de seguridad. Cada uno de estos paquetes tiene una versión mayor en Electron 5:

- cromo `73.0.3683.119`
  - [Nuevo en 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Nuevo en 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Nuevo en 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Nuevo en 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Nodo 12 Blog Post](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Nuevas características JS](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 también incluye mejoras en APIs específicas de Electron. Un resumen de los cambios principales está a continuación; para la lista completa de cambios, revisa las [notas de lanzamiento de Electron v5.0.0](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisificación

Electron 5 continúa [iniciativa de Promisificación](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) para convertir la API basada en la devolución de llamada de Electron para usar Promises. Estas APIs fueron convertidas para Electron 5:
* `app.getFileIcon`
* `contentTracing.getCategories`
* `contentTracing.startGrabando`
* `contentTracing.stopRecording`
* `debugger.sendCommand`
* API de cookies
* `shell.openExternal`
* `webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### Acceso a colores del sistema para macOS

Estas funciones fueron cambiadas o añadidas a `systemPreferences` para acceder a los colores de los sistemas macOS:
* `sistema.getAccentColor`
* `systemPreferences.getColor`
* `systemPreferences.getSystem Color`

### Información de la memoria del proceso

La función `process.getProcessMemoryInfo` ha sido añadida para obtener estadísticas de uso de memoria sobre el proceso actual.

### Filtrado adicional para API remotas

Para mejorar la seguridad en la API `` remota, se han añadido nuevos eventos remotos para que `sea remoto. etBuiltin`, `remoto. etCurrentWindow`, `remote.getCurrentWebContents` y `<webview>.getWebContents` puede ser [filtrado](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Múltiples vistas de navegador en la ventana de navegador

BrowserWindow ahora soporta la administración de múltiples BrowserViews dentro del mismo BrowserWindow.

## Restaurar archivos borrados

### Por defecto para aplicaciones empaquetadas

Las aplicaciones empaquetadas ahora se comportarán como la aplicación predeterminada: se creará un menú de aplicación predeterminado a menos que la aplicación tenga una y el evento `window-all-closed` se gestionará automáticamente a menos que la aplicación maneja el evento.

### Sandbox Mixto

El modo sandbox mixto está ahora activado por defecto. Los renderizadores lanzados con `sandbox: verdadero` ahora serán realmente sandboxed, donde previamente solo estarían enrollados si el modo mixed-sandbox también estaba activado.

### Mejoras de seguridad
Los valores por defecto de `nodeIntegration` y `webviewTag` ahora son `falso` para mejorar la seguridad.

### Comprobador ortográfico ahora asíncrono

La API de SpellCheck se ha cambiado para proporcionar [resultados asincrónicos](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Deprecaciones

Las siguientes APIs están recientemente obsoletas en Electron 5.0.0 y están previstas para su eliminación en 6.0.0:

### Binarios de instantánea Mksnapshot para brazo y arm64
Los binarios nativos de mksnapshot para brazo y arm64 están obsoletos y se eliminarán en 6. .0. Se pueden crear instantáneas para brazos y arm64 usando los binarios x64.

### API de ServiceWorker en WebContents
Las API de ServiceWorker Deprecated en WebContents para preparar su eliminación.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Módulos automáticos con contenido web encendido
Para mejorar la seguridad los siguientes módulos están siendo desaprobados para su uso directamente a través de `requieren` y en su lugar necesitarán ser incluidos a través de `remoto. requiere` en un contenido web:
* `electron.screen`
* `child_process`
* `fs`
* `os`
* `ruta`

## webFrame APIs del mundo Aislado
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` han sido desaprobados a favor de `webFrame.setIsolatedWorldInfo`.

### Sandbox Mixto
`enableMixedSandbox` y el conmutador de línea de comandos `--enable-mixed-sandbox` todavía existen por compatibilidad, pero están desaprobados y no tienen efecto.

## Fin de soporte para 2.0.x

Por nuestra [política de versiones soportada](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x ha llegado al fin de la vida.

## Programa de retroalimentación

Continuamos usando nuestro [Programa de Comentarios de la aplicación](https://electronjs.org/blog/app-feedback-program) para pruebas. Proyectos que participan en este programa prueban betas Electron en sus aplicaciones; y a cambio, los nuevos errores que encuentran están priorizados para la versión estable. Si quieres participar o aprender más, [echa un vistazo a nuestra publicación sobre el programa](https://electronjs.org/blog/app-feedback-program).

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [programa tentativo 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) mapea las fechas clave en el ciclo de vida de desarrollo de Electron 6. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
