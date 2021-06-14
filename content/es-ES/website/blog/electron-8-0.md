---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguía
date: '2020-02-04'
---

¡Electron 8.0.0 ha sido liberado! Incluye actualizaciones a Chromium `80`, V8 `8.0`y Node.js `12.13.0`. ¡Hemos añadido el corrector ortográfico integrado de Chrome y mucho más!

---

El equipo de Electron está encantado de anunciar el lanzamiento de Electron 8.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). La versión está llena de actualizaciones, correcciones y nuevas características. ¡No podemos esperar a ver lo que construyes con ellos! ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

## Cambios notables

### Cambios de pila
* cromo `80.0.3987.86`
    * [Nuevo en Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Nuevo en Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Nodo 12.13.0 entrada del blog](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 entrada de blog](https://v8.dev/blog/v8-release-79)
    * [Entrada de blog V8 8.0](https://v8.dev/blog/v8-release-80)

### Destacar características
* Implementado el uso de la función de correctores ortográficos incorporados de Chrome. Ver más detalles en [#20692](https://github.com/electron/electron/pull/20692) y [#21266](https://github.com/electron/electron/pull/21266).
* La comunicación IPC ahora utiliza el algoritmo de clon estructurado de v8. Esto es más rápido, más característico y menos sorprendente que la lógica existente, y genera un aumento de rendimiento de 2x para búferes grandes y objetos complejos. La latencia de los mensajes pequeños no se ve afectada significativamente. Ver más detalles en [#20214](https://github.com/electron/electron/pull/20214).

Vea las [notas de lanzamiento 8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) para una lista completa de nuevas características y cambios.

## Restaurar archivos borrados

* Mostrar el nombre del módulo en advertencia de desaprobación para los módulos que se ajustan al contexto. [#21952](https://github.com/electron/electron/pull/21952)
    * Esto es trabajo continuo para un futuro requisito de que los módulos nativos de Node cargados en el proceso de renderizado sean [N-API](https://nodejs.org/api/n-api.html) o [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). La información completa y la línea temporal propuesta se detallan en [este problema](https://github.com/electron/electron/issues/18397).
* Los valores enviados a través de IPC ahora se serializan con el algoritmo de clon estructurado.  [#20214](https://github.com/electron/electron/pull/20214)
* Ofscreen Rendering está actualmente deshabilitado debido a la falta de un mantenedor para trabajar en esta función.  Se rompió durante la actualización de Chromium y posteriormente fue desactivado. [#20772](https://github.com/electron/electron/issues/20772)

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Cambios de API
* `cambios en la aplicación` API:
    * Añadido `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Añadido soporte `app.showAboutPanel()` y `app.setAboutPanelOptions(options)` en Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `Cambios de la API del navegador Ventana`:
    * Documentos actualizados para tener en cuenta que las opciones de BrowserWindow `hasShadow` están disponibles en todas las plataformas [#20038](https://github.com/electron/electron/pull/20038)
    * Se añadió la opción `trafficicLightPosition` a las opciones de ventana del navegador para permitir posicionamiento personalizado para los botones de semáforo. [#21781](https://github.com/electron/electron/pull/21781)
    * Se añadió la opción `accessibleTitle` a BrowserWindow para establecer el título de la ventana accesible [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` ahora puede devolver null [#19983](https://github.com/electron/electron/pull/19983)
    * Añadido `BrowserWindow.getMediis) ourceId()` y `BrowserWindow.move(mediaId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Añadido soporte para el evento `will -move` en macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Documentado previamente indocumentado `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `cambios en el cuadro de diálogo` API:
    * Añadida la propiedad `dontAddToRecent` a `dialog.showOpenDialog` y `diálogo. howOpenDialogSync` para evitar que los documentos se añadan a documentos recientes en Windows en diálogos abiertos. [#19669](https://github.com/electron/electron/pull/19669)
    * Añadida personalización de propiedades a `dialog.showSaveDialog` y `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Cambios de notificación` API:
    * Se añadió la opción `timeoutType` para permitir a los usuarios de Linux/Windows establecer el tipo de tiempo de espera de notificación. [#20153](https://github.com/electron/electron/pull/20153)
    * Se añadió la opción de `urgencia`  para establecer la urgencia en las notificaciones de Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `cambios en la sesión` API:
    * Documentación actualizada en `session.setProxy(config)` y `session.setCertificateVerifyProc(proc)` para tener en cuenta las opciones opcionales. [#19604](https://github.com/electron/electron/pull/19604)
    * Añadido `session.downloadURL(url)` para permitir activar descargas sin un BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Se añadió soporte para sugerencias de recursos de preconexión HTTP a través de `session.preconnect(options)` y el evento `preconexión`. [#18671](http://github.com/electron/electron/pull/18671)
    * Añadido `session.addWordToSpellCheckerDictionary` para permitir palabras personalizadas en el diccionario [#21297](http://github.com/electron/electron/pull/21297)
* Se añadió la opción a `shell.moveItemToTrash(fullPath[, deleteOnFail])` en macOS para especificar lo que sucede cuando moveItemToTrash falla. [#19700](https://github.com/electron/electron/pull/19700)
* `cambios en las preferencias del sistema` API:
    * Se actualizó la documentación de `systemPreferences.getColor(color)` para macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * Añadido `pantalla` tipo multimedia a `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Añadido `nativeTheme.themeSource` para permitir que las aplicaciones anulen Chromium y la elección del tema del SO. [#19960](https://github.com/electron/electron/pull/19960)
* Cambios en la API de TouchBar:
    * Se añadió la propiedad `accessibilityLabel` a `TouchBarButton` y `TouchBarLabel` para mejorar la accesibilidad de TouchBarButton/TouchBarLabel. [#20454](https://github.com/electron/electron/pull/20454)
    * Documentación de TouchBar actualizada [#19444](https://github.com/electron/electron/pull/19444)
* `bandeja` cambios de API:
    * Se añadieron nuevas opciones a `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` y `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Añadida tray.removeBalloon(), que elimina una notificación de globo ya mostrada. [#19547](https://github.com/electron/electron/pull/19547)
    * Añadido tray.focus(), que devuelve el foco al área de notificación de la barra de tareas. función: añadir tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContents` Cambios de API:
    * Añadido `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` para exponer executeJavaScriptInIsolatedWorld en la API de contenido web. [#21190](https://github.com/electron/electron/pull/21190)
    * Métodos añadidos para capturar un contenido web oculto. [#21679](https://github.com/electron/electron/pull/21679)
    * Se añadieron opciones a `webContents.print([options], [callback])` para habilitar la personalización de los encabezados y pie de página de impresión. [#19688](https://github.com/electron/electron/pull/19688)
    * Se ha añadido la capacidad de inspeccionar trabajadores compartidos específicos a través de `webContents.getAllSharedWorkers()` y `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Se añadió el soporte de las opciones `fitToPageEnabled` y `scaleFactor` en WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Se actualizó la documentación de `webview.printToPDF` para indicar que el tipo de retorno es ahora Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### APIs obsoletas
Las siguientes APIs están ahora obsoletas:
* Desaprobar la no funcional opción `visibleOnFullScreen` dentro de `BrowserWindow.setVisibleOnAllWorkspaces` antes de su eliminación en la siguiente versión principal. [#21732](https://github.com/electron/electron/pull/21732)
* Desaprobado `alternate-selected-control-text` en `systemPreferences.getColor(color)` para macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Obsoleto `setLayoutZoomLevelLimits` en `webContents`, `webFrame`, y `<webview> <webview> Tag` porque Chromium eliminó esta capacidad. [#21296](https://github.com/electron/electron/pull/21296)
* El valor predeterminado de `false` para `app.allowRendererProcessReuse` ahora está desaprobado. [#21287](https://github.com/electron/electron/pull/21287)
* Obsoleto `<webview>.getWebContents()` ya que depende del módulo remoto. [#20726](https://github.com/electron/electron/pull/20726)

## Fin de soporte para 5.x.y

Electron 5.x.y ha alcanzado el final de soporte según la [política de soporte](https://electronjs.org/docs/tutorial/support#supported-versions) del proyecto. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Programa de retroalimentación

Continuamos usando nuestro [Programa de Comentarios de la aplicación](https://electronjs.org/blog/app-feedback-program) para pruebas. Proyectos que participan en este programa prueban betas Electron en sus aplicaciones; y a cambio, los nuevos errores que encuentran están priorizados para la versión estable. Si quieres participar o aprender más, [echa un vistazo a nuestra publicación sobre el programa](https://electronjs.org/blog/app-feedback-program).

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [programa tentativo 9.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapea las fechas clave en el ciclo de vida de desarrollo de Electron 9. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Deprecación de `Módulo` remoto (comenzando en Electron 9)
Debido a graves responsabilidades de seguridad, estamos comenzando a desaprobar el módulo [`remoto`](https://www.electronjs.org/docs/api/remote) a partir de Electron 9. Puede leer y seguir [este problema](https://github.com/electron/electron/issues/21408) que detalla nuestras razones para esto e incluye una línea temporal propuesta para la desaprobación.
