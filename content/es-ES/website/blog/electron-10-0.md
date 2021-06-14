---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguía
date: '2020-08-25'
---

¡Electron 10.0.0 ha sido liberado! Incluye actualizaciones a Chromium `85`, V8 `8.5`y Node.js `12.16`. Hemos agregado varias integraciones y mejoras a la API. ¡Lea a continuación para más detalles!

---

El equipo de Electron esta emocionado de anunciar el lanzamiento de Electron 10.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). La versión está llena de actualizaciones, correcciones y nuevas características.

En la versión Electron 10, también hicimos un cambio en nuestras notas de publicación. Para que sea más fácil decir qué es nuevo en Electron 10 y qué puede haber cambiado entre Electron 10 y versiones pasadas, ahora también incluimos cambios que se introdujeron en Electron 10, pero que se hicieron backportados a versiones anteriores. Esperamos que esto facilite a las aplicaciones encontrar nuevas características y correcciones de errores al actualizar Electron.

¡No podemos esperar a ver lo que construyes con ellos! ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

## Cambios notables

### Cambios de pila

* Chromium `85.0.4183.84`
    * [Nuevo en Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Nuevo en Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Node 12.16.3 blog post](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 blog post](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 blog post](https://v8.dev/blog/v8-release-85)

### Destacar características

* Se añadió el método `contents.getBackgroundThrottling()` y la propiedad `contents.backgroundThrottling`. [#21036]
* Expuso el módulo `desktopCapturer` en el proceso principal. [#23548](https://github.com/electron/electron/pull/23548)
* Ahora puede comprobar si una `sesión` dada es persistente llamando a la API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Resolver problemas de red que impidieron que las llamadas RTC estuvieran conectadas debido a cambios de dirección IP de red e ICE. (Chromium issue 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Vea las [notas de lanzamiento 10.0.0](https://github.com/electron/electron/releases/tag/v10.0.0) para una lista completa de nuevas características y cambios.

## Restaurar archivos borrados

* Cambió el valor predeterminado de `enableRemoteModule` a `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Esto es parte de nuestros planes para desaprobar el módulo `remoto` y moverlo a tierra de usuario. Puede leer y seguir [este problema](https://github.com/electron/electron/issues/21408) que detalla nuestras razones para esto e incluye una línea temporal propuesta para la desaprobación.
* Cambió el valor predeterminado de `app.allowRendererProcessReuse` a `true`. [#22336](https://github.com/electron/electron/pull/22336) (También en [Electron 9](https://github.com/electron/electron/pull/22401))
   * Esto evitará la carga de módulos nativos no conscientes del contexto en los procesos de renderizado.
   * Puede leer y seguir [este problema](https://github.com/electron/electron/issues/18397) que detalla nuestras razones para esto e incluye una línea temporal propuesta para la desaprobación.
* Se corrigió la posición de los botones de ventana en macOS cuando la configuración regional del sistema operativo se ajusta a un idioma RTL (como árabe o hebreo). Es posible que las aplicaciones de ventanas sin marco tengan que tener en cuenta este cambio mientras estipula sus ventanas. [#22016](https://github.com/electron/electron/pull/22016)

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Cambios de API

* Sesión: Ahora puede comprobar si una sesión `` dada es persistente llamando a la API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Contenido: Añadida la propiedad `contents.getBackgroundThrottling()` y `contents.backgroundThrottling`. [#21036](https://github.com/electron/electron/pull/21036)

### APIs obsoletas

Las siguientes APIs ahora están obsoletas o eliminadas:

* Eliminada la propiedad `actual LoggingPath` obsoleta de `netLog`. Además, `netLog.stopLogging` ya no devuelve la ruta al registro registrado. [#22732](https://github.com/electron/electron/pull/22732)
* Subidas de errores descomprimidas sin comprimir en `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Fin de soporte para 7.x.y

Electron 7.x.y ha alcanzado el fin de soporte según la [política de soporte](https://electronjs.org/docs/tutorial/support#supported-versions) del proyecto. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Aunque tenemos cuidado de no hacer promesas sobre las fechas de publicación, nuestro plan es lanzar nuevas versiones importantes de Electron con nuevas versiones de esos componentes aproximadamente en cuarto. El [programa tentativo 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapea las fechas clave en el ciclo de vida de desarrollo de Electron 11.0. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Trabajo Continuado para la desaprobación del Módulo `remoto` (en Electron 11)
Empezamos a trabajar para eliminar el módulo remoto en [Electron 9](https://www.electronjs.org/blog/electron-9-0) y continuamos con los planes de eliminar el módulo `remoto`. En Electron 11, planeamos continuar el trabajo de refactorizar para implementar [WeakRef](https://v8.dev/features/weak-references) como lo hemos hecho en Electron 10. Por favor, lee y sigue [este problema](https://github.com/electron/electron/issues/21408) para ver los planes completos y los detalles para la desaprobación.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
