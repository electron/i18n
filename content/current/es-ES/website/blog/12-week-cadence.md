---
title: Nueva adencia de lanzamiento de Electron
author: sofianguía
date: '13-05-2019'
---

🎉 ¡Electron se está moviendo para lanzar una nueva versión estable cada 12 semanas! 🎉

---

## ⚡ ¡Wow es rápido! Pero, ¿por qué?

En pocas palabras, Chromium no detiene el envío, por lo que Electron tampoco va a desacelerarse.

El cromo se libera en un consistente programa [de 6 semanas](https://www.chromium.org/developers/calendar). Para entregar las versiones más actualizadas de Chromium en Electron, nuestro programa necesita seguir el suyo. Puede encontrar más información sobre el ciclo de lanzamiento de Chromium [aquí](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md).

## 🚀 ¿Por qué cada 12 semanas?

Cada 6 semanas, una nueva versión de Chromium viene con nuevas características, correcciones de errores / correcciones de seguridad y mejoras de V8. Los usuarios de Electron han sido fuertes y claros a la hora de desear estos cambios de manera oportuna, así que hemos ajustado nuestras fechas de liberación estable para que coincida con todas las demás versiones estables de Chromium. Primero Electron v6.0. incluirá M76 y está programada para su versión estable el [30 de julio, 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), el mismo día de lanzamiento que [Chromium M76](https://www.chromestatus.com/features/schedule).

## 🚧 ¿Qué significa esto para mí y mi aplicación Electron?

Tendrás acceso a nuevas características y correcciones de Chromium y V8 antes que antes. Importantemente, también sabrás _cuando_ se avecinen esos nuevos cambios, así que podrás planificar con mejor información que antes.

El equipo de Electron [continuará soportando](https://electronjs.org/docs/tutorial/support#supported-versions) las últimas tres versiones importantes. Por ejemplo, cuando [v6.0.0 sea estable el 30 de julio de 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), soportaremos v6.x, v5.x, y v4.x, mientras que v3.x llegará al final de la vida.

## 💬 Programa de retroalimentación

Por favor, considera unirte a nuestro [Programa de Comentarios de la App](https://electronjs.org/blog/app-feedback-program) para ayudarnos a probar nuestras versiones beta y estabilización. Proyectos que participan en este programa prueban betas Electron en sus aplicaciones; y a cambio, los nuevos errores que encuentran están priorizados para la versión estable.

## 📝 Una breve historia de lanzamientos de Electron

Las decisiones acerca de las versiones estables antes de la v3.0.0 no seguían un programa. Añadimos programas internos al proyecto con v3.0.0 y v4.0.0. A principios de este año, decidimos publicar nuestra fecha de lanzamiento estable por primera vez para [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline). Anunciar nuestras fechas de lanzamiento estables fue recibido positivamente en general y estamos encantados de seguir haciéndolo para futuras versiones.

Con el fin de mejorar estos esfuerzos relacionados con la mejora, nuestras [Mejoras](https://github.com/electron/governance/tree/master/wg-upgrades) y [Liberan](https://github.com/electron/governance/tree/master/wg-releases) Grupos de Trabajo fueron creados dentro de nuestro sistema [de gobernanza](https://electronjs.org/blog/governance). Nos han permitido priorizar y delegar mejor esta labor, que esperamos se haga más evidente con cada posterior liberación.

Aquí es donde nuestra nueva cadencia nos pondrá en comparación con la cadencia de Chromium:
<img alt="gráfica de línea que compara Electron versus Chromium" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨 Si tienes alguna pregunta, por favor envíanos un correo electrónico a [info@electronjs.org](mailto:info@electronjs.org).
