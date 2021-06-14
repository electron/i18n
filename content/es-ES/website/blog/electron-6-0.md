---
title: Electron 6.0.0
author:
  - sofianguía
  - ckerr
  - codebytere
date: '2019-07-30'
---

El equipo de Electron está encantado de anunciar el lanzamiento de Electron 6.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). La versión está llena de actualizaciones, correcciones y nuevas características. ¡No podemos esperar a ver lo que construyes con ellos! ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

---

## Novedades

Hoy marca una primera para el proyecto Electron: esta es la primera vez que hemos hecho una versión estable de Electron **el mismo día** que la correspondiente [versión estable de Chrome](https://www.chromestatus.com/features/schedule)! 🎉

Gran parte de la funcionalidad de Electron es proporcionada por los componentes principales de Chromium, Node.js y V8. Electron se mantiene actualizado con estos proyectos para proporcionar a nuestros usuarios nuevas características de JavaScript, mejoras de rendimiento y correcciones de seguridad. Cada uno de estos paquetes tiene una versión mayor en Electron 6:

- cromo `76.0.3809.88`
  - [Nuevo en 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Nuevo en 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Nuevo en 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Nodo 12.4.0 entrada del blog](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 entrada de blog](https://v8.dev/blog/v8-release-76)

Esta versión también incluye mejoras en las APIs de Electron. [Las notas de lanzamiento](https://github.com/electron/electron/releases/tag/v6.0.0) tienen una lista más completa, pero aquí están los resaltados:

### Promisificación

Electron 6.0 continúa la modernización [iniciativa](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) iniciada en 5.0 para mejorar el soporte de [Promesa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Estas funciones ahora devuelven Promesas y todavía soportan invocaciones antiguas basadas en llamadas:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Estas funciones ahora tienen dos formas, sincrónicas y asíncronas basadas en promesa:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Estas funciones ahora devuelven Promesas:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Renderer).app`, `Electron Helper (GPU).app` y `Electron Helper (Plugin).app`

Para activar el [tiempo de ejecución endurecido](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), que restringe cosas como memoria ejecutable y carga código firmado por un equipo diferente ID, es necesario conceder al Ayudante derechos especiales de firma de código.

Mantener estos derechos a los tipos de proceso que los requieran, Chromium [añadió](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) tres nuevas variantes de la aplicación Helper: una para renderizadores (`Electron Helper (Renderer). pp`), uno para el proceso GPU (`Electron Helper (GPU). pp`) y uno para plugins (`Electron Helper (Plugin).app`).

La gente usando `electron-osx-sign` para codiseñar su aplicación Electron no debería tener que hacer ningún cambio en su lógica de compilación. Si estás codiseñando tu aplicación con scripts personalizados, debes asegurarte de que las tres nuevas aplicaciones Helper están correctamente codiseñadas.

Para empaquetar tu aplicación correctamente con estos nuevos ayudantes, necesitas usar `electron-packager@14.0.4` o superior.  Si estás usando `electron-builder` deberías seguir [este problema](https://github.com/electron-userland/electron-builder/issues/4104) para rastrear el soporte para estos nuevos ayudantes.

## Restaurar archivos borrados

 * Esta versión comienza a sentar las bases para un futuro requisito de que los módulos nativos de Node cargados en el proceso de renderizador sean [N-API](https://nodejs.org/api/n-api.html) o [Contexto Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Las razones de este cambio son un rendimiento más rápido, una seguridad más fuerte y una menor carga de trabajo de mantenimiento. Lea todos los detalles incluyendo la línea temporal propuesta en [este asunto](https://github.com/electron/electron/issues/18397). Se espera que este cambio se complete en Electron v11.

 * `net.IncomingMessage` headers have [changed ligeramente](https://github.com/electron/electron/pull/17517#issue-263752903) to more closely match [Node. s comportamiento](https://nodejs.org/api/http.html#http_message_headers), particularmente con el valor de `set-cookie` y cómo se manejan los encabezados duplicados. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` ahora devuelve vacío y es una llamada asíncrona. [#17121](https://github.com/electron/electron/pull/17121)

 * Las aplicaciones ahora deben establecer explícitamente una ruta de registro llamando a la nueva función `app.setAppLogPath()` antes de usar `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Fin de soporte para 3.x.y

Por nuestra [política de apoyo](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y ha llegado al fin de la vida. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Programa de retroalimentación

Continuamos usando nuestro [Programa de Comentarios de la aplicación](https://electronjs.org/blog/app-feedback-program) para pruebas. Proyectos que participan en este programa prueban betas Electron en sus aplicaciones; y a cambio, los nuevos errores que encuentran están priorizados para la versión estable. Si quieres participar o aprender más, [echa un vistazo a nuestra publicación sobre el programa](https://electronjs.org/blog/app-feedback-program).

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [programa tentativo 7.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapea las fechas clave en el ciclo de vida de desarrollo de Electron 7. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
