---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

¡Electron 11.0.0 ha sido liberado! Incluye actualizaciones a Chromium `87`, V8 `8.7`, y Node.js `12.18.3`. Añadimos soporte para Apple silicon, y mejoras generales. ¡Lea a continuación para más detalles!

---

El equipo de Electron esta emocionado de anunciar el lanzamiento de Electron 11.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). La versión está llena de actualizaciones, correcciones y nuevo soporte para el hardware de Apple's M1.

¡No podemos esperar a ver lo que construyes con ellos! ¡Sigue leyendo para obtener más detalles sobre esta versión, y por favor comparte tus comentarios!

## Cambios notables

### Cambios de pila

* Chromium `87.0.4280.47`
    * [Nuevo en Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [Nuevo en Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Node.js `12.18.3`
    * [Node 12.18.3 blog post](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Node 12.7.0 blog post](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 blog post](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 blog post](https://v8.dev/blog/v8-release-87)

### Destacar características

* Support for Apple M1: On November 10, Apple announced their [new M1 chips, which will be included in their upcoming hardware](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/). Beginning in Electron 11, Electron will be shipping separate versions of Electron for Intel Macs (x64) and Apple's upcoming M1 hardware (arm64). You can learn more about how to get your Electron app [running on Apple's M1 hardware here.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Added V8 crash message and location information to crashReport parameters. [#24771](https://github.com/electron/electron/pull/24771)
* Improved the performance of sending wide objects over the context bridge. [#24671](https://github.com/electron/electron/pull/24671)

See the [11.0.0 release notes](https://github.com/electron/electron/releases/tag/v11.0.0) for a full list of new features and changes.

## Restaurar archivos borrados

* Removed experimental APIs: `BrowserView.{fromId, fromWebContents, getAllViews}` and the `id` property of `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Cambios de API

* Added `app.getApplicationInfoForProtocol()` API that returns detailed information about the app that handles a certain protocol. [#24112](https://github.com/electron/electron/pull/24112)
* Added `app.createThumbnailFromPath()` API that returns a preview image of a file given its file path and a maximum thumbnail size. [#24802](https://github.com/electron/electron/pull/24802)
* Added `webContents.forcefullyCrashRenderer()` to forcefully terminate a renderer process to assist with recovering a hung renderer. [#25756](https://github.com/electron/electron/pull/25756)

## Fin de soporte para 8.x.y

Electron 8.x.y ha alcanzado el fin de soporte según la [política de soporte ](https://electronjs.org/docs/tutorial/support#supported-versions) del proyecto. Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. Although we are careful not to make promises about release dates, our plan is to release new major versions of Electron with new versions of those components approximately quarterly. El [calendario tentativo 12.0.0](https://electronjs.org/docs/tutorial/electron-timelines) traza fechas claves en el ciclo de vida del desarrollo de Electron 12.0. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Continued Work for Deprecation of `remote` Module
We started work to remove the `remote` module in [Electron 9](https://www.electronjs.org/blog/electron-9-0). We plan to remove the `remote` module itself in Electron 14.

Sigue y lee [este asunto](https://github.com/electron/electron/issues/21408) para conocer los planes completo y detalles para la desaprobación.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12.

Read and follow [this issue](https://github.com/electron/electron/issues/18397) for full details, including the proposed timeline.
