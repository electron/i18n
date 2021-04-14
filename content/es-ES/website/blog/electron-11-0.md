---
title: Electron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

¡Electron 11.0.0 ha sido liberado! Incluye actualizaciones para cromo `87`, V8 `8.7`y node. js `12.18.3`. Agregamos soporte para el silicio de Apple y mejoras generales. ¡Lea a continuación para más detalles!

---

El equipo de Electron esta emocionado de anunciar el lanzamiento de Electron 11.0.0! Puedes instalarlo con npm a través de `npm install electron@latest` o descargarlo desde nuestra [página web de lanzamientos](https://electronjs.org/releases/stable). El lanzamiento está repleto de actualizaciones, correcciones y soporte nuevo para el hardware M1 de Apple.

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

* Soporte para Apple M1: el 10 de noviembre, Apple anunció su [nuevos chips M1, que se incluirán en su próxima](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/)de hardware. A partir de Electron 11, Electron enviará versiones separadas de Electron para Macs Intel (x64) y el próximo M1 hardware (arm64) de Apple. Puedes obtener más información acerca de cómo obtener tu [de App electrónica ejecutándose en el hardware M1 de Apple aquí.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Se agregó información de ubicación y mensaje de caída V8 a los parámetros de crashReport. [#24771](https://github.com/electron/electron/pull/24771)
* Se mejoró el rendimiento de enviar objetos anchos a través del puente de contexto. [#24671](https://github.com/electron/electron/pull/24671)

Consulta las notas del lanzamiento de [11.0.0](https://github.com/electron/electron/releases/tag/v11.0.0) para obtener una lista completa de las nuevas características y los cambios.

## Cambios de última hora

* API experimentales eliminadas: `BrowserView.{fromId, fromWebContents, getAllViews}` y la propiedad `id` de `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Puede encontrar más información sobre estos y futuros cambios en la página [Cambios de rotación planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Cambios de API

* Se agregó `app.getApplicationInfoForProtocol()` API que devuelve información detallada acerca de la App que maneja un protocolo determinado. [#24112](https://github.com/electron/electron/pull/24112)
* Se agregó `app.createThumbnailFromPath()` API que devuelve una imagen de vista previa de un archivo dada su ruta de archivo y un tamaño máximo de miniatura. [#24802](https://github.com/electron/electron/pull/24802)
* Se agregó `webContents.forcefullyCrashRenderer()` para terminar forzosamente un proceso de representador para ayudar con la recuperación de un renderizador colgado. [#25756](https://github.com/electron/electron/pull/25756)

## Fin del soporte para 8. x. y

Electron 8. x. y ha llegado al final del soporte según la política de soporte de [del proyecto](https://electronjs.org/docs/tutorial/support#supported-versions). Se anima a los desarrolladores y aplicaciones a actualizar a una nueva versión de Electron.

## Lo siguiente

A corto plazo puedes esperar que el equipo continúe enfocándose en mantener al día con el desarrollo de los principales componentes que componen Electron, incluyendo Chromium, Node, y V8. A pesar de que tenemos cuidado de no hacer promesas acerca de las fechas de lanzamiento, nuestro plan es lanzar nuevas versiones principales de electrones con nuevas versiones de esos componentes aproximadamente trimestralmente. El [calendario tentativo 12.0.0](https://electronjs.org/docs/tutorial/electron-timelines) traza fechas claves en el ciclo de vida del desarrollo de Electron 12.0. También, [vea nuestro documento de versionamiento](https://electronjs.org/docs/tutorial/electron-versioning) para obtener información más detallada sobre el versionado en Electron.

Para obtener información sobre los cambios de ruptura planificados en las próximas versiones de Electron, [vea nuestro documento de Cambios de ruptura planificados](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Trabajo continuado para la Desprelación de `remote` módulo
Comenzamos a trabajar para eliminar el módulo de `remote` en [Electron 9](https://www.electronjs.org/blog/electron-9-0). Planeamos eliminar el módulo de `remote` en sí en Electron 14.

Sigue y lee [este asunto](https://github.com/electron/electron/issues/21408) para conocer los planes completo y detalles para la desaprobación.

### Paso final para requerir que los módulos de nodo nativos sean conscientes del contexto o N-API (en Electron 12)
Desde Electron 6 en adelante, hemos estado sentando las bases para requerir [módulos de nodo nativos](https://nodejs.org/api/addons.html) cargados en el proceso del representador para ser [](https://nodejs.org/api/n-api.html) N-API o [consciente del contexto](https://nodejs.org/api/addons.html#addons_context_aware_addons). Hacer cumplir este cambio permite una seguridad más fuerte, un rendimiento más rápido y una carga de trabajo de mantenimiento reducida. El último paso de este plan es eliminar la capacidad de inhabilitar la reutilización del proceso de renderización en Electron 12.

Lee y sigue [esta propuesta](https://github.com/electron/electron/issues/18397) para conocer todos los detalles, incluido el cronograma propuesto.
