---
title: Corregir vulnerabilidad SQLite
author: ckerr
date: '18-12-2018'
---

Se ha descubierto una vulnerabilidad de ejecución de código remoto, "[Magellan](https://blade.tencent.com/magellan/index_en.html)," que afecta al software basado en SQLite o Chromium, incluyendo todas las versiones de Electron.

---

## Alcance

Las aplicaciones Electron que utilizan Web SQL se ven afectadas.


## Modificación

Las aplicaciones afectos deben dejar de usar SQL Web o actualizar a una versión parcheada de Electron.

Hemos publicado nuevas versiones de Electron que incluyen correcciones para esta vulnerabilidad:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

No hay informes al respecto en el desierto; sin embargo, se insta a las solicitudes afectadas a mitigar.

## Más información

Esta vulnerabilidad fue descubierta por el equipo de Tencent Blade, que ha publicado [una publicación de blog que discute la vulnerabilidad](https://blade.tencent.com/magellan/index_en.html).

Para aprender más sobre las buenas prácticas para mantener tus aplicaciones Electron seguras, ve nuestro [tutorial de seguridad][].

Si desea reportar una vulnerabilidad en Electron, envíe un correo electrónico a security@electronjs.org.

[tutorial de seguridad]: https://electronjs.org/docs/tutorial/security
