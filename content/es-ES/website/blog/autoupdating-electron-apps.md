---
title: Actualización automática más fácil para aplicaciones de código abierto
author: zeke
date: '2018-05-01'
---

Hoy estamos lanzando un código abierto gratis, alojado [webservice de actualizaciones](https://github.com/electron/update.electronjs.org) y compañero [paquete npm](https://github.com/electron/update-electron-app) para habilitar actualizaciones automáticas fáciles para aplicaciones de código abierto de Electron. Este es un paso hacia empoderar a los desarrolladores de aplicaciones para pensar menos sobre despliegue y más sobre el desarrollo de experiencias de alta calidad para sus usuarios.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Captura de pantalla del actualizador">
    <figcaption>El nuevo módulo de actualización en acción</figcaption>
  </a>
</figure>

## Facilitar la vida

Electron tiene una API de [autoUpdater](https://electronjs.org/docs/tutorial/updates) que le da a las aplicaciones la capacidad de consumir metadatos desde un endpoint remoto para comprobar actualizaciones, descargarlos en segundo plano e instalarlos automáticamente.

Habilitar estas actualizaciones ha sido un paso engorroso en el proceso de despliegue para muchos desarrolladores de aplicaciones Electron porque requiere que un servidor web sea desplegado y mantenido sólo para servir metadatos del historial de versiones de aplicaciones.

Hoy estamos anunciando una nueva solución para actualizaciones automáticas de aplicaciones. Si su aplicación Electron está en un repositorio público de GitHub y está usando GitHub Releases para publicar compilaciones, puedes usar este servicio para entregar actualizaciones continuas de aplicaciones a tus usuarios.

## Usando el nuevo módulo

Para minimizar la configuración de tu parte, hemos creado [update-electron-app](https://github.com/electron/update-electron-app), un módulo npm que se integra con el nuevo webservice [update.electronjs.org](https://github.com/electron/update.electronjs.org).

Instala el módulo:

```sh
npm install update-electron-app
```

Llámala desde cualquier lugar en el [proceso principal](https://electronjs.org/docs/glossary#main-process) de tu aplicación:

```js
require('update-electron-app')()
```

¡Eso es todo! El módulo comprobará si hay actualizaciones al iniciar la aplicación, luego cada diez minutos. Cuando se encuentra una actualización, se descargará automáticamente en segundo plano, y se mostrará un diálogo cuando la actualización esté lista.

## Migrando aplicaciones existentes

Las aplicaciones que ya usan la API autoUpdater de Electron también pueden usar este servicio. Si estás usando [electron-builder](https://github.com/electron-userland/electron-builder) para empaquetar tu aplicación, puedes usar su actualizador integrado.

## Alternativos

Las aplicaciones que ya usan la API autoUpdater de Electron también pueden usar este servicio. Para más detalles, vea [electron.build/auto-update](https://www.electron.build/auto-update).

Si tu aplicación es privada, puede que necesites ejecutar tu propio servidor de actualizaciones. Hay un número de herramientas de código abierto para esto, incluyendo Zeit's [Hazel](https://github.com/zeit/hazel) y Atlassian [Nucleus](https://github.com/atlassian/nucleus). Vea el tutorial [Desplegando un servidor de actualización](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) para más información .

## Gracias

Gracias a [Julian Gruber](http://juliangruber.com/) por ayudar a diseñar y construir este servicio web simple y escalable. Gracias a la gente de [Zeit](https://zeit.co) por su servicio de código abierto [Hazel](https://github.com/zeit/hazel) , de la que dibujamos inspiración en el diseño. Gracias a [Samuel Attard](https://www.samuelattard.com/) por las opiniones del código. Gracias a la comunidad Electron por ayudar a probar este servicio .

🌲 ¡Aquí hay un futuro perenne para las aplicaciones de Electrón!