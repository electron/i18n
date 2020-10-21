---
title: Mac App Store y Windows Auto Updater en Electron
author: señor
date: '05-11-2015'
---

Recientemente Electron ha añadido dos características interesantes: una versión compatible con Mac App Store y una actualización automática incorporada de Windows.

---

## Soporte de Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

A partir de `v0.34.0` cada versión de Electron incluye una compilación compatible con la Mac App Store. Anteriormente, una aplicación creada en Electron no cumplía con los requisitos de Apcate para la Mac App Store. La mayoría de estos requisitos están relacionados con el uso de APIs privadas. Para hacer sandbox Electron de tal manera que cumpla con los requisitos dos módulos necesarios para ser removidos:

- `reportador-fallido`
- `actualizador automático`

Además, algunos comportamientos han cambiado con respecto a la detección de cambios de DNS, captura de vídeo y características de accesibilidad. Puedes leer más sobre los cambios y [enviar tu aplicación a la tienda de aplicaciones de Mac](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) en la documentación. Las distribuciones se pueden encontrar en la página de [lanzamientos de Electron](https://github.com/electron/electron/releases), con prefijo `mas-`.

Pull Requests: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Actualizador automático de Windows

En Electron `v0.34.1` se mejoró el módulo `auto-updater` para trabajar con [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Esto significa que Electron viene con maneras fáciles de actualizar automáticamente su aplicación tanto en OS X como en Windows. Puede leer más sobre [configurar su aplicación para la actualización automática en Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) en la documentación.

Pull Request: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

