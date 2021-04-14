---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

El equipo de Electron está encantado de anunciar que la primera versión estable de Electron 3 está ahora disponible en [electronjs. rg](https://electronjs.org/) y a través de `npm install electron@latest`! Está lleno de actualizaciones, correcciones y nuevas características, y no podemos esperar a ver lo que construyes con ellas. A continuación se detallan los detalles de esta versión, y le damos la bienvenida a sus comentarios mientras explora.

---

## Proceso de lanzamiento

A medida que comenzamos el desarrollo de `v3.0.`, buscamos definir más empíricamente criterios para una publicación estable formalizando el progreso de retroalimentación para versiones beta progresivas. `v3.0.` no habría sido posible sin nuestros socios del Programa de Comentarios de la aplicación [,](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) quien proporcionó pruebas tempranas y retroalimentación durante el ciclo beta. Gracias a Atlassian, Atom, equipos de Microsoft, Oculus, OpenFin, Slack, Symphony, VS Code y otros miembros del programa por su trabajo. Si quieres participar en futuras betas, por favor envíanos un correo electrónico a [info@electronjs.org](mailto:info@electronjs.org).

## Cambios / Nuevas características

Mayor bumba en varias partes importantes de la cadena de herramientas de Electron, incluyendo Chrome `v66.0.3359.181`, Nodo `v10.2.0`y V8 `v6.6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] feat: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] feat: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] feat: `process.getHeapStStatiss()`
* [[#12485](https://github.com/electron/electron/pull/12485)] feat: `win.moveTop()` para mover la ventana z-order a la parte superior
* [[#13110](https://github.com/electron/electron/pull/13110)] feat: TextField y Button APIs
* [[#13068](https://github.com/electron/electron/pull/13068)] función: netLog API para control de registro dinámico
* [[#13539](https://github.com/electron/electron/pull/13539)] feat: habilitar `webview` en renderizador sandbox
* [[#14118](https://github.com/electron/electron/pull/14118)] feat: `fs.readSync` ahora funciona con archivos masivos
* [[#14031](https://github.com/electron/electron/pull/14031)] feat: node `fs` wrappers para hacer `fs.realpathSync.native` y `fs.realpath.native` disponibles

## Rompiendo cambios de API

* [[#12362](https://github.com/electron/electron/pull/12362)] función: actualizaciones para el control del orden de los elementos del menú
* [[#13050](https://github.com/electron/electron/pull/13050)] refactor: APIs documentadas eliminadas
  * Ver [documentos](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) para más detalles
* [[#12477](https://github.com/electron/electron/pull/12477)] refactor: eliminado `did-get-response-details` y `did-get-redirect-request` eventos
* [[#12655](https://github.com/electron/electron/pull/12655)] función: por defecto para desactivar la navegación en arrastrar/soltar
* [[#12993](https://github.com/electron/electron/pull/12993)] feat: Nodo `v4.x` o superior es necesario utilizar el `electron` módulo npm
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refactor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] feat: ya no usar JSON para enviar el resultado de `ipcRenderer.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] feat: por defecto para ignorar los argumentos de la línea de comandos siguiendo una URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refactor: renombrar `api::Window` a `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] función: zoom visual ahora desactivado por defecto
* [[#12408](https://github.com/electron/electron/pull/12408)] refactor: renombrar comando de aplicación `media-play_pause` a `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] función: soporte de notificaciones del área de trabajo
* [[#12496](https://github.com/electron/electron/pull/12496)] feat: `tray.setIgnoreDoubleClickEvents(ignore)` para ignorar eventos de doble clic en la bandeja
* [[#12281](https://github.com/electron/electron/pull/12281)] función: funcionalidad de ratón adelante en macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] función: bloqueo de pantalla / desbloqueo de eventos

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] función: se añadió DIP a / desde conversiones de coordenadas de pantalla

**Nota Bene:** Cambiar a una versión anterior de Electron después de ejecutar esta versión requerirá que borre su directorio de datos de usuario para evitar el bloqueo de versiones antiguas. Puede obtener el directorio de datos de usuario ejecutando `console.log(app.getPath("userData"))` o ver [docs](https://electronjs.org/docs/api/app#appgetpathname) para más detalles.

## Corrección de errores

* [[#13397](https://github.com/electron/electron/pull/13397)] corrección: problema con `fs.statSyncNoException` arrojando excepciones
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] corrección: error al cargar el sitio con jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] reparación: error en `net::ClientSocketHandle` destructor
* [[#14453](https://github.com/electron/electron/pull/14453)] corrección: notificar el cambio de enfoque de inmediato en lugar de no en el siguiente tick

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] solución: problema permitiendo que los paquetes sean seleccionados en `<input file="type">` diálogo abrir archivo
* [[#12404](https://github.com/electron/electron/pull/12404)] solución: problema bloqueando el proceso principal cuando se utiliza el diálogo asíncrono
* [[#12043](https://github.com/electron/electron/pull/12043)] corrección: menú contextual clic en callback
* [[#12527](https://github.com/electron/electron/pull/12527)] reparación: fuga de evento al reutilizar el elemento de la barra táctil
* [[#12352](https://github.com/electron/electron/pull/12352)] corrección: error de título de la bandeja
* [[#12327](https://github.com/electron/electron/pull/12327)] corrección: regiones no arrastrables
* [[#12809](https://github.com/electron/electron/pull/12809)] corrección: para prevenir la actualización del menú mientras está abierto
* [[#13162](https://github.com/electron/electron/pull/13162)] corrección: límites de iconos de bandeja no permitidos valores negativos
* [[#13085](https://github.com/electron/electron/pull/13085)] corrección: título de la bandeja no invertiendo cuando se resalta
* [[#12196](https://github.com/electron/electron/pull/12196)] corrección: compilación de Mac cuando `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] solución: problemas adicionales en ventanas sin marco con vibración
* [[#13326](https://github.com/electron/electron/pull/13326)] corrección: para establecer el protocolo mac a ninguno después de llamar `app.removeAsDefaultProtocolent`
* [[#13530](https://github.com/electron/electron/pull/13530)] corrección: uso incorrecto de APIs privadas en la compilación MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] corrección: `bandeja tray.setContextMenu`
* [[#14205](https://github.com/electron/electron/pull/14205)] corrección: pulsando escape en un diálogo ahora lo cierra incluso si `defaultId` está establecido

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] corrección: `BrowserWindow.focus()` para ventanas fuera de pantalla

## Otras notas

* PDF Viewer actualmente no está funcionando, pero está siendo trabajado y será funcional una vez más pronto
* `TextField` y `Button` APIs son experimentales y por lo tanto están desactivadas por defecto
  * Pueden ser habilitados con la bandera de construcción de `enable_view_api`

# Lo siguiente

El equipo Electron continúa trabajando en la definición de nuestros procesos para mejoras más rápidas y fluidas a medida que buscamos mantener finalmente la paridad con las cadencias de desarrollo de Chromium, Nodo y V8.
