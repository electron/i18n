---
title: Sitio web Hiccups
author: zeke
date: '12-02-2018'
---

La semana pasada el sitio [electronjs.org](https://electronjs.org) tuvo unos minutos de inactividad. Si te han afectado estas breves interrupciones, sentimos las molestias. Después de un poco de investigación de hoy, hemos diagnosticado la causa raíz y hemos desplegado una [solución](https://github.com/electron/electronjs.org/pull/1076).

---

Para evitar este tipo de inactividad en el futuro, hemos activado [alertas de umbral de Heroku](https://devcenter.heroku.com/articles/metrics#threshold-alerting) en nuestra aplicación. En cualquier momento nuestro servidor web acumula peticiones fallidas o respuestas lentas más allá de un cierto umbral, nuestro equipo será notificado para que podamos resolver el problema rápidamente.

## Documentos sin conexión en cada idioma

La próxima vez que desarrolles una aplicación Electron en un avión o en una cafetería uganea tal vez desee tener una copia de los documentos para una referencia fuera de línea. Afortunadamente, los documentos de Electron están disponibles como archivos Markdown en más de 20 idiomas.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Documentos sin conexión con un GUI

[devdocs. o/electron](https://devdocs.io/electron/) es un sitio web práctico que almacena documentos para uso fuera de línea no sólo para Electron sino muchos otros proyectos como JavaScript, TypeScript, Node. s, React, Angular, y muchos otros. Y, por supuesto, también hay una aplicación Electron para eso. Revisa [devdocs-app](https://electronjs.org/apps/devdocs-app) en el sitio Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Si te gusta instalar aplicaciones sin usar el ratón o trackpad, da el comando [Electron Forge](https://electronforge.io/)'s `de` de instalar </code> un intento:

```sh
npx electron-forge install egoist/devdocs-app
```